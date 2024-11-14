#!/bin/bash
source src/setup_board.sh
source src/check_win.sh
source src/validators.sh
source src/save-load.sh
source src/hex.sh

boardArray=""

BOARD_SIZE=3
WINING_LENGTH=3
EMPTY_CHAR='_'
SAVE_FILE='autosave.txt'

draw_board() {
  to_print=${1-$boardArray}
  rows=(${to_print//./ })

  for ((i = 0; i < $BOARD_SIZE; i++)); do
    (($i == 0)) && echo -en "\t"
    echo -n $(num_to_hex $i)" "
  done
  echo

  for i in "${!rows[@]}"; do
    echo -e $(num_to_hex $i)\\t${rows[i]}
  done
}

make_move() {
  who=$1   #X or O
  where=$2 #cords in XX format

  assert "$([[ $who == 'X' || $who == 'O' ]] && echo 1)" "Invalid player!"
  validate_cords "$where"

  x=$(hex_to_num ${where:0:1})
  y=$(hex_to_num ${where:1:1})
  idx=$(((y + (x * $BOARD_SIZE)) * 2))
  boardArray="${boardArray:0:idx}$who${boardArray:idx+1}"
}

player_input() {
  local who=$1 #X or O
  assert "$([[ $who == 'X' || $who == 'O' ]] && echo 1)" "Invalid player!"

  read -p "Enter cords for player $who: " where

  if ((${#where} != 2)); then
    echo "invalid cords length!"
    return 1
  fi
  local x=$(hex_to_num ${where:0:1})
  local y=$(hex_to_num ${where:1:1})
  if (($x >= $BOARD_SIZE || $y >= $BOARD_SIZE)); then
    echo "cords out of bonds!"
    return 1
  fi

  local idx=$(((y + (x * $BOARD_SIZE)) * 2))
  local at_index=${boardArray:idx:1}

  if [[ $at_index != $EMPTY_CHAR ]]; then
    echo "Invalid move! already taken"
    return 1
  fi

  echo $where
  return 0
}

new_board() {
  read -p "Enter board size from 3 to 16 [$BOARD_SIZE]: " size
  BOARD_SIZE=${size:-$BOARD_SIZE}
  if (($BOARD_SIZE < 3 || $BOARD_SIZE > 16)); then
    echo "Invalid board size"
    new_board
    return 0;
  fi
  echo "New Board size: $BOARD_SIZE"

  read -p "Enter win length condition size from 3 to $BOARD_SIZE [$WINING_LENGTH]: " win
  WINING_LENGTH=${win:-$WINING_LENGTH}
  if (($WINING_LENGTH < 3 || $WINING_LENGTH > $BOARD_SIZE)); then
    echo "Invalid win size"
    new_board
    return 0;
  fi
  echo "New win condition size: $WINING_LENGTH"
  echo "-----------------------------"
  echo

  clear_board
}

main() {
  clear_console
  welcome_info
#  read_board
  new_board
  draw_board

  local next_move="X"
  while true; do
    local end=$(check_win)$?
    if ((end > 0)); then
      clear_board
      save_board
      show_win "$end"
      break
    fi
    input=$(player_input "$next_move")
    if (($? != 0)); then
      echo $input
      draw_board
      continue;
    fi

    make_move "$next_move" "$input"
    save_board
    draw_board
    if [[ $next_move = "X" ]]; then
      next_move="O"
    else
      next_move="X"
    fi
  done
}

main
