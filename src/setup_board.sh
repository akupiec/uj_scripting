welcome_info() {
  cat <<EOF
-----------------------------
       TIC-TAC-TOE
-----------------------------

EOF
}

clear_console() {
  tput reset
}

show_win() {
  cat <<EOF
--------------------------

        GAME END

--------------------------

EOF
}
