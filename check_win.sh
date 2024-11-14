#!/bin/bash

_generate_win_board() {
  local ret=(${to_print//|/})
  echo $ret
}

_generate_reverted_win_board() {
  local ret=""
  for ((i = 0; i < $BOARD_SIZE; i++)); do
    for ((j = 0; j < $BOARD_SIZE; j++)); do
      local idx=$(((i + (j * $BOARD_SIZE)) * 2))
      ret+=${boardArray:idx:1}
    done
    ret+="."
  done

  echo $ret
}

_generate_diagonal_win_board() {
  local ret=""
  for ((i = 0; i < $BOARD_SIZE; i++)); do
    local x=$i
    local r0=""
    local r1=""
    for ((j = 0; j < $BOARD_SIZE; j++)); do
      local idx0=$(((x + (j * $BOARD_SIZE)) * 2))
      local idx1=$(((j + (x * $BOARD_SIZE)) * 2))
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

_generate_anti_diagonal_win_board() {
  local ret=""
  local len=$((BOARD_SIZE - 1))
  for ((i = $len; i >= 0; i--)); do
    local x=$i
    local r0=""
    local r1=""
    for ((j = 0; j < $BOARD_SIZE; j++)); do
      local idx0=$(((x + (j * $BOARD_SIZE)) * 2))
      local idx1=$((($len - x + ((($len - j)) * $BOARD_SIZE)) * 2))
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


#return 0 for game in progress
#return 1 for mage won by X
#return 2 for game won by O
#return 3 for game draw
check_win() {
  local win_board=""
  win_board+=$(_generate_win_board)
  win_board+=$(_generate_reverted_win_board)
  win_board+=$(_generate_diagonal_win_board)
  win_board+=$(_generate_anti_diagonal_win_board)
  local win_x=""
  local win_o=""
   for ((i = 0; i < $WINING_LENGTH; i++)); do
      win_x+="X"
      win_y+="O"
  done
  if [[ $win_board != *"_"* ]]; then
    return 3
  fi
  if [[ $win_board =~ $win_x ]]; then
    return 1
  fi
  if [[ $win_board =~ $win_y ]]; then
    return 2
  fi

  return 0
}
