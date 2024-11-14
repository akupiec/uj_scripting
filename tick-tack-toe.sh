#!/bin/bash
source setup_board.sh

boardArray=""

BOARD_SIZE=3
#WINING_LENGTH=3
EMPTY_CHAR='_'
SAVE_FILE='autosave.txt'

read_board() {
  if [[ -f "$SAVE_FILE" ]]; then
    boardArray=$(cat $SAVE_FILE | tr '\n' '.')
    echo 'Loaded last game'
  else
    for ((i = 0; i < $BOARD_SIZE; i++)); do
      for ((j = 0; j < $BOARD_SIZE; j++)); do
        boardArray+=$EMPTY_CHAR
        [[ $j < $((BOARD_SIZE - 1)) ]] && boardArray+="|"
      done
      [[ $i < $((BOARD_SIZE - 1)) ]] && boardArray+="."
    done
    echo 'Generated new board'
  fi
}

save_board() {
  raw=(${boardArray//./\\n})
  echo -en $raw >$SAVE_FILE
}

num_to_hex() {
  echo "obase=16; $1" | bc
}

hex_to_num() {
  echo "ibase=16; ${1:0:8}" | bc
}

draw_board() {
  rows=(${boardArray//./ })

  for ((i = 0; i < $BOARD_SIZE; i++)); do
    (($i == 0)) && echo -en "\t"
    echo -n "$i "
  done
  echo

  for i in "${!rows[@]}"; do
    echo -e $(num_to_hex $i)\\t${rows[i]}
  done
}

assert() {
  if [[ $1 -ne 1 ]]; then
    echo "$2" # Print the error message
    exit 1    # Exit with a non-zero status to indicate an error
  fi
}

validate_cords() {
  where=$1 #cords in XX format

  x=$(hex_to_num ${where:0:1})
  y=$(hex_to_num ${where:1:1})

}

#TODO make me repeat prompt on error instead crash program!
#TODO check prompt to be upper case!
takePlayerInput() {
  who=$1 #X or O
  assert "$([[ $who == 'X' || $who == 'O' ]] && echo 1)" "Invalid player!"

  read -p "Enter move for player $who: " where
  assert "((${#where} == 2))" "invalid cords!"
  x=$(hex_to_num ${where:0:1})
  y=$(hex_to_num ${where:1:1})
  assert "(($x < $BOARD_SIZE && $y < $BOARD_SIZE))" "cords out of bonds!"
  echo $where
}

make_move() {
  who=$1   #X or O
  where=$2 #cords in XX format

  assert "$([[ $who == 'X' || $who == 'O' ]] && echo 1)" "Invalid player!"
  assert "((${#where} == 2))" "invalid cords!"

  x=$(hex_to_num ${where:0:1})
  y=$(hex_to_num ${where:1:1})
  assert "(($x < $BOARD_SIZE && $y < $BOARD_SIZE))" "cords out of bonds!"

  idx=$(((x + (y * $BOARD_SIZE)) * 2))
  at_index=${boardArray:idx:1}
  assert "$([[ $at_index == $EMPTY_CHAR ]] && echo 1)" "Invalid move!"

  boardArray="${boardArray:0:idx}$who${boardArray:idx+1}"
}

#welcome_info
#wait_for_any_key
read_board
save_board
clear_console
draw_board
input=$(takePlayerInput "X")
make_move "X" "$input"
save_board
draw_board
