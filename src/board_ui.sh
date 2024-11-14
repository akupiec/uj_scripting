welcome_info() {
  cat <<EOF
-----------------------------------------
               TIC-TAC-TOE

Game support auto-saving functionality
There is option to continue old game if found

-----------------------------------------

EOF
}

clear_console() {
  tput reset
}

show_win() {
  cat <<EOF
-----------------------------------------

                 GAME END

EOF

  if [[ $1 == 3 ]]; then
    echo -e "                  Draw!"
  elif [[ $1 == 1 ]]; then
    echo -e "              Player X wins!"
  elif [[ $1 == 2 ]]; then
    echo -e "              Player O wins!"
  fi
  echo -----------------------------------------
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
    return 0
  fi
  echo "New Board size: $BOARD_SIZE"

  read -p "Enter win length condition size from 3 to $BOARD_SIZE [$WINING_LENGTH]: " win
  WINING_LENGTH=${win:-$WINING_LENGTH}
  if (($WINING_LENGTH < 3 || $WINING_LENGTH > $BOARD_SIZE)); then
    echo "Invalid win size"
    new_board
    return 0
  fi
  echo "New win condition size: $WINING_LENGTH"
  echo "-----------------------------"
  echo

  clear_board
}

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

new_game() {
  clear_console
  welcome_info

  while true; do
    if [[ -f "$SAVE_FILE" ]]; then
      read -p "Found saved game load it? [Yn]: " resp
      resp=${resp:-'Y'}
      resp=$(echo "$resp" | tr '[:lower:]' '[:upper:]')
      if [[ $resp == 'Y' ]]; then
        read_board
        break
      elif [ $resp == 'N' ]; then
        new_board
        break
      fi
    else
      new_board
      break
    fi
  done

  draw_board
}
