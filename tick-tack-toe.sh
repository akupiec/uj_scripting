#!/bin/bash
source src/board_ui.sh
source src/check_win.sh
source src/validators.sh
source src/save-load.sh
source src/hex.sh

boardArray=""

BOARD_SIZE=3
PC_MODE=1
WINING_LENGTH=3
EMPTY_CHAR='_'
SAVE_FILE='autosave.txt'

make_move() {
  local who=$1   #X or O
  local where=$2 #cords in XX format

  assert "$([[ $who == 'X' || $who == 'O' ]] && echo 1)" "Invalid player!"
  validate_cords "$where"

  local x=$(hex_to_num ${where:0:1})
  local y=$(hex_to_num ${where:1:1})
  local idx=$(((y + (x * $BOARD_SIZE)) * 2))
  boardArray="${boardArray:0:idx}$who${boardArray:idx+1}"
}

pc_move() {
  local who=$1 #X or O
  assert "$([[ $who == 'X' || $who == 'O' ]] && echo 1)" "Invalid player!"

  local bord_len=${#boardArray}
  possible_moves=()
  for ((i = 0; i < $bord_len; i++)); do
    local char=${boardArray:i:1}
    if [[ $char == $EMPTY_CHAR ]]; then
      possible_moves+=("$i")
    fi
  done

  local len=${#possible_moves[@]}
  local rand_idx=$((RANDOM % len))
  local idx=${possible_moves[rand_idx]}
  boardArray="${boardArray:0:idx}$who${boardArray:idx+1}"
}

check_next_move() {
  local xx=$(echo $boardArray | tr -cd 'X')
  local oo=$(echo $boardArray | tr -cd 'O')
  if ((${#xx} <= ${#oo})); then
    echo "X"
  else
    echo "O"
  fi
  return 0
}

main() {
  new_game

  next_move=$(check_next_move)
  while true; do
    local end=$(check_win)$?
    if ((end > 0)); then
      clear_board
      remove_board
      show_win "$end"
      break
    fi

    if [[ $PC_MODE -eq 1 && $next_move == "X" ]]; then
      pc_move "$next_move"
    else
      input=$(player_input "$next_move")
      if (($? != 0)); then
        echo $input
        draw_board
        continue
      fi
      make_move "$next_move" "$input"
    fi

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
