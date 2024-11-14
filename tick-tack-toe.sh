#!/bin/bash
source setup_board.sh

boardArray=""

BOARD_SIZE=4
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

generate_win_board() {
  ret=(${to_print//|/})
  echo $ret
}

generate_reverted_win_board() {
  ret=""
  for ((i = 0; i < $BOARD_SIZE; i++)); do
    for ((j = 0; j < $BOARD_SIZE; j++)); do
      idx=$(((i + (j * $BOARD_SIZE)) * 2))
      ret+=${boardArray:idx:1}
    done
    ret+="."
  done

  echo $ret
}

generate_diagonal_win_board() {
  ret=""
  for ((i = 0; i < $BOARD_SIZE; i++)); do
    x=$i
    r0=""
    r1=""
    for ((j = 0; j < $BOARD_SIZE; j++)); do
      idx0=$(((x + (j * $BOARD_SIZE)) * 2))
      idx1=$(((j + (x * $BOARD_SIZE)) * 2))
      r0=$r0${boardArray:idx0:1}
      r1=$r1${boardArray:idx1:1}
      ((x++))
      if (($x == $BOARD_SIZE)); then
        break
      fi
    done
    ret+=$r0"."$r1"."
  done
  echo $ret
}

generate_anti_diagonal_win_board() {
  ret=""
  len=$((BOARD_SIZE - 1))
  for ((i = $len; i >= 0; i--)); do
    x=$i
    r0=""
    r1=""
    for ((j = 0; j < $BOARD_SIZE; j++)); do
      idx0=$(((x + (j * $BOARD_SIZE)) * 2))
      idx1=$((($len - x + ((($len - j)) * $BOARD_SIZE)) * 2))
      r0=$r0${boardArray:idx0:1}
      r1=$r1${boardArray:idx1:1}
      ((x--))
      if (($x < 0)); then
        break
      fi
    done
    ret+=$r0"."$r1"."
  done
  echo $ret
}

assert() {
  if [[ $1 -ne 1 ]]; then
    echo "$2"
    exit 1
  fi
}

validate_cords() {
  where=$1 #cords in XX format
  assert "((${#where} == 2))" "invalid cords!"

  x=$(hex_to_num ${where:0:1})
  y=$(hex_to_num ${where:1:1})
  assert "(($x < $BOARD_SIZE && $y < $BOARD_SIZE))" "cords out of bonds!"

  idx=$(((y + (x * $BOARD_SIZE)) * 2))
  at_index=${boardArray:idx:1}
  assert "$([[ $at_index == $EMPTY_CHAR ]] && echo 1)" "Invalid move!"
  return 0
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

#return 0 for game in progress
#return 1 for mage won by X
#return 2 for game won by O
#return 3 for game draw
check_win() {
  reverted=$(generate_reverted_board)
  if [[ $boardArray != *"_"* ]]; then
    return 3
  fi
  if [[ $boardArray =~ "X|X|X" || $reverted =~ "X|X|X" ]]; then
    return 1
  fi
  if [[ $boardArray =~ "O|O|O" || $reverted =~ "O|O|O" ]]; then
    return 2
  fi

  return 0
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

generate_win_board
generate_reverted_win_board
generate_diagonal_win_board
generate_anti_diagonal_win_board
#input=$(takePlayerInput "X")
#make_move "X" "$input"
#check_win
#end=$(check_win)$?
#echo $end

#draw_board
