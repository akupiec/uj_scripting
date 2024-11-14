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
