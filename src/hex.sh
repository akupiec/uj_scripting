#TODO fix lower characters
num_to_hex() {
  echo "obase=16; $1" | bc
}

hex_to_num() {
  echo "ibase=16; ${1:0:8}" | bc
}
