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
