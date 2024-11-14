clear_board() {
  boardArray=""
  for ((i = 0; i < $BOARD_SIZE; i++)); do
    for ((j = 0; j < $BOARD_SIZE; j++)); do
      boardArray+=$EMPTY_CHAR
      (( $j < $((BOARD_SIZE - 1)) )) && boardArray+="|"
    done
    (( $i < $((BOARD_SIZE - 1)) )) && boardArray+="."
  done
  echo 'Generated new board'
}

read_board() {
  if [[ -f "$SAVE_FILE" ]]; then
    BOARD_SIZE=$(sed -n '1p' "$SAVE_FILE")
    BOARD_SIZE=(${BOARD_SIZE//BOARD_SIZE=/})
    WINING_LENGTH=$(sed -n '2p' "$SAVE_FILE")
    WINING_LENGTH=(${WINING_LENGTH//WINING_LENGTH=/})
    PC_MODE=$(sed -n '3p' "$SAVE_FILE")
    PC_MODE=(${PC_MODE//PC_MODE=/})
    boardArray=$(sed '1,3d' "$SAVE_FILE" | tr '\n' '.')
    echo 'Loaded last game'
  else
    clear_board
  fi
}

save_board() {
  mkdir -p "out"
  raw=(${boardArray//./\\n})
  echo "BOARD_SIZE=$BOARD_SIZE" > $SAVE_FILE
  echo "WINING_LENGTH=$WINING_LENGTH" >> $SAVE_FILE
  echo "PC_MODE=$PC_MODE" >> $SAVE_FILE
  echo -en $raw >> $SAVE_FILE
}

remove_board() {
  rm $SAVE_FILE
}
