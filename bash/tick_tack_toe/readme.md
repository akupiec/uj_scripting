# Run options

It should be safe to assume if there is bash on given OS it all should work...
n the other hand It was developed and tested on MacOS therefore I provide 2 options to execute script

## Unix with bash

Requirements:
 - bash ^_^

Run:
```shell
chmod +x tick-tack-toe.sh
./tick-tack-toe.sh
```

## Docker

Requirements:
  - docker

Run:
```shell
docker run -ti --init --rm -v ./out:/app/out $(docker build -q .)
```

