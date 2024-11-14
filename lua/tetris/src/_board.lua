local Board = require("tilesArea")
local Shape = require("shape")

local game_over = false
local drop_timer = 0
local drop_interval = 0.5
local board
local current_shape

function love.load()
  love.window.setTitle("ArtNotATetris")
  love.window.setMode(Board.width * Board.tile_size, Board.height * Board.tile_size)
  board = Board.new()
  current_shape = Shape.new()
  board:spawnShape(current_shape)
end

function love.update(dt)
  if game_over then
    return
  end
  drop_timer = drop_timer + dt
  if drop_timer >= drop_interval then
    drop_timer = 0
    if board:isValidMove(current_shape, 0, 1) then
      current_shape.y = current_shape.y + 1
    else
      board:placeShape(current_shape)
      board:clearLines()
      current_shape = Shape.new()
      if not board:spawnShape(current_shape) then
        game_over = true
      end
    end
  end
end

function love.draw()
  if game_over then
    love.graphics.setColor(1, 0, 0)
    love.graphics.printf("Game Over", 0, Board.height * Board.tile_size / 2 - 10, Board.width * Board.tile_size, "center")
  else
    board:draw()
    current_shape:draw(board.tile_size)
  end
end

function love.keypressed(key)
  if game_over then
    return
  end

  if key == "left" and board:isValidMove(current_shape, -1, 0) then
    current_shape.x = current_shape.x - 1
  elseif key == "right" and board:isValidMove(current_shape, 1, 0) then
    current_shape.x = current_shape.x + 1
  elseif key == "down" and board:isValidMove(current_shape, 0, 1) then
    current_shape.y = current_shape.y + 1
  elseif key == "up" then
    current_shape:rotate()
    if not board:isValidMove(current_shape, 0, 0) then
      current_shape:rotate(true)
    end
  elseif key == "space" then
    while board:isValidMove(current_shape, 0, 1) do
      current_shape.y = current_shape.y + 1
    end
    board:placeShape(current_shape)
  end
end
