num_to_hex() {
  echo "obase=16; $1" | bc
}

hex_to_num() {
  local num=$(echo "$1" | tr '[:lower:]' '[:upper:]')
  echo "ibase=16; ${num:0:8}" | bc
}
