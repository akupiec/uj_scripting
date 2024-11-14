welcome_info() {
  tput reset
  cat <<EOF
===============================
       TIC-TAC-TOE GAME
===============================
 How to Play:
 - This is a two-player game.
 - The game board is a grid, example grid of 3, contains cells 0 to 8.

      0 | 1 | 2
     ---+---+---
      3 | 4 | 5
     ---+---+---
      6 | 7 | 8

 - Players take turns entering a coordinates of cell ex: '21' equals to cell 2
 - The goal is to get three of your symbols in a row, column, or diagonal.
 - The first player to get three in a row wins!
 - If all spots are filled without a winner, it's a draw.

===============================
        Let's Play!
===============================
EOF
  echo
}

wait_for_any_key() {
  read -n 1 -s -r -p "Press any key to continue"
}

clear_console() {
  tput reset
}
