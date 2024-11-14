# Run options

There should not be any exotic dependencies but to be sure I provide docker runner as a backup

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

