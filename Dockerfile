FROM alpine

RUN apk add bash
COPY . /app
WORKDIR /app
RUN chmod +x ./tick-tack-toe.sh

CMD ./tick-tack-toe.sh
