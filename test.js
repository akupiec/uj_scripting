if (test.length > 2) {
  console.log("error")
  exit;
}

var test = "alaMaKota"
var row = test[0]
var col = test[1]

var idx = row * (col + 1)


if (x > boardSize || y > boardSize) {
  exit
}


assert(x > 2, "invalid cords")
