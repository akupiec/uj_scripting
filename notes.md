len of array:
```echo ${#files[@]}```

for over array values

```
for i in "${rows[@]}"; do
echo $i
done
```

for over arry keys
```shell
for key in "${!fruits[@]}"
do
  echo "Key is '$key'  => Value is '${fruits[$key]}'"
done
```

for loop
```shell
for ((i = 0 ; i <= 1000 ; i++)); do
  echo "Counter: $i"
done
```

split array by char (\n)
```rows=(${boardArray//\n/ })```
