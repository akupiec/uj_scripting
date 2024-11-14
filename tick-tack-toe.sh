#!/bin/bash
source src/board_ui.sh
source src/check_win.sh
source src/validators.sh
source src/save-load.sh
source src/hex.sh

boardArray=""

BOARD_SIZE=3
WINING_LENGTH=3
EMPTY_CHAR='_'
SAVE_FILE='autosave.txt'

make_move() {
  local who=$1   #X or O
  local where=$2 #cords in XX format

  assert "$([[ $who == 'X' || $who == 'O' ]] && echo 1)" "Invalid player!"
  validate_cords "$where"

  x=$(hex_to_num ${where:0:1})
  y=$(hex_to_num ${where:1:1})
  idx=$(((y + (x * $BOARD_SIZE)) * 2))
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
