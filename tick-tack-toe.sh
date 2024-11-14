#!/bin/bash
source src/setup_board.sh
source src/check_win.sh
source src/validators.sh
source src/save-load.sh
source src/hex.sh

boardArray=""

BOARD_SIZE=4
WINING_LENGTH=3
EMPTY_CHAR='_'
SAVE_FILE='autosave.txt'

draw_board() {
  to_print=${1-$boardArray}
  rows=(${to_print//./ })

  for ((i = 0; i < $BOARD_SIZE; i++)); do
    (($i == 0)) && echo -en "\t"
    echo -n "$i "
  done
  echo

  for i in "${!rows[@]}"; do
    echo -e $(num_to_hex $i)\\t${rows[i]}
  done
}

takePlayerInput() {
  who=$1 #X or O
  assert "$([[ $who == 'X' || $who == 'O' ]] && echo 1)" "Invalid player!"

  read -p "Enter move for player $who: " where
  echo $where
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

#welcome_info
#wait_for_any_key
read_board
save_board
#clear_console

draw_board
echo
#draw_board "$(generate_reverted_board)"
#draw_board "$(generate_diagonal_board)"

#input=$(takePlayerInput "X")
#make_move "X" "$input"
end=$(check_win)$?
echo $end
#check_win
#draw_board
