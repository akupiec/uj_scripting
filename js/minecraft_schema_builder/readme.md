# Info

Small typescript project that _generates_ script to build structures in minecraft education edition based on provided schema.

Idea was to build from any schema, but I found out in very painful way that are multiple versions of minecraft.
Each of them have different exporting way, with different schema syntax, with different block id's.

I’ve mapped over 200 block variants, including orientations and metadata, but many are still missing, and couple have some random substitutions, just to make example schemas look good

[Runtime presentation movie](https://ujchmura-my.sharepoint.com/:v:/g/personal/artur_kupiec_student_uj_edu_pl/EfwwX-TVCGxLjqgerQM_KmcBokxTo7b6al7ck0JzWfXX1g?e=ntRQ7I&nav=eyJwbGF5YmFja09wdGlvbnMiOnt9LCJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbE1vZGUiOiJtaXMiLCJyZWZlcnJhbFZpZXciOiJwb3N0cm9sbC1jb3B5bGluayIsInJlZmVycmFsUGxheWJhY2tTZXNzaW9uSWQiOiI1NWY2M2NjYy00ZDU2LTRjYWQtYTljOC04NjQyODdlN2RhYTgifX0%3D)

# Run Steps

Command `bun index.ts` will generate two files `darkest-castle.out` & `Zollburg_Niederbr.out` both of them contains `minecraft_scripts` which will build castles based on `*.schem` files.

## Requirements:

- [bun](https://bun.sh/)
- [pnpm](https://pnpm.io/)
- [Minecraft Education edition](https://education.minecraft.net/en-us/get-started/download)

## Run

1. run command `pnpm install`
2. run command `bun index.ts`
3. copy content one of the generated files `*.out`
4. paste content to minecraft scripting box and run it
5. enjoy building... it will take some time :D

## Bonus

Due to my struggles with minecraft scripts I started TDD, so there are some tests ^\_^

command to run: `bun test` or `pnpm test`

I found out that `minecraft_scripts` only looks like JavaScript/TypeScript, but it’s a highly restrictive TypeScript subset.
It lacks many basic ES5 functions, doesn’t support dynamic type conversion, and has strange memory limits that corrupt even moderately optimized compression.
