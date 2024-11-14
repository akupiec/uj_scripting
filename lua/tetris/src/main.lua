local board = {}
local board_width, board_height = 10, 20
local tile_size = 30
local shapes = {
  {{1,1,1,1}},  -- I
  {{1,1},{1,1}},  -- O
  {{0,1,1},{1,1,0}},  -- S
  {{1,1,0},{0,1,1}},  -- Z
  {{1,0,0},{1,1,1}},  -- L
  {{0,0,1},{1,1,1}},  -- J
  {{0,1,0},{1,1,1}},  -- T
}
local current_shape
local shape_x, shape_y
local game_over = false
local drop_timer = 0
local drop_interval = 0.5

function love.load()
  love.window.setTitle("Simple Tetris")
  love.window.setMode(board_width * tile_size, board_height * tile_size)
  resetBoard()
  spawnShape()
end

function resetBoard()
  board = {}
  for y = 1, board_height do
    board[y] = {}
    for x = 1, board_width do
      board[y][x] = 0
    end
  end
end

function spawnShape()
  current_shape = shapes[math.random(#shapes)]
  shape_x = math.floor(board_width / 2) - math.floor(#current_shape[1] / 2)
  shape_y = 0
  if not isValidMove(0, 0) then
    game_over = true
  end
end

function isValidMove(offset_x, offset_y)
  for y, row in ipairs(current_shape) do
    for x, cell in ipairs(row) do
      if cell ~= 0 then
        local new_x = shape_x + x + offset_x - 1
        local new_y = shape_y + y + offset_y - 1
        if new_x < 1 or new_x > board_width or new_y > board_height then
          return false
        end
        if new_y > 0 and board[new_y][new_x] ~= 0 then
          return false
        end
      end
    end
  end
  return true
end

function placeShape()
  for y, row in ipairs(current_shape) do
    for x, cell in ipairs(row) do
      if cell ~= 0 then
        board[shape_y + y - 1][shape_x + x - 1] = cell
      end
    end
  end
  clearLines()
  spawnShape()
end

function clearLines()
  for y = board_height, 1, -1 do
    local full_line = true
    for x = 1, board_width do
      if board[y][x] == 0 then
        full_line = false
        break
      end
    end
    if full_line then
      table.remove(board, y)
      table.insert(board, 1, {})
      for x = 1, board_width do
        board[1][x] = 0
      end
    end
  end
end

function rotateShape()
  local new_shape = {}
  for x = 1, #current_shape[1] do
    new_shape[x] = {}
    for y = 1, #current_shape do
      new_shape[x][y] = current_shape[#current_shape - y + 1][x]
    end
  end
  local old_shape = current_shape
  current_shape = new_shape
  if not isValidMove(0, 0) then
    current_shape = old_shape
  end
end

function love.update(dt)
  if game_over then return end
  drop_timer = drop_timer + dt
  if drop_timer >= drop_interval then
    drop_timer = 0
    if isValidMove(0, 1) then
      shape_y = shape_y + 1
    else
      placeShape()
    end
  end
end

function love.draw()
  -- Draw the board
  for y = 1, board_height do
    for x = 1, board_width do
      if board[y][x] ~= 0 then
        love.graphics.setColor(1, 0.5, 0)
        love.graphics.rectangle("fill", (x - 1) * tile_size, (y - 1) * tile_size, tile_size, tile_size)
      end
    end
  end
  -- Draw the current shape
  love.graphics.setColor(0, 0.5, 1)
  for y, row in ipairs(current_shape) do
    for x, cell in ipairs(row) do
      if cell ~= 0 then
        love.graphics.rectangle("fill", (shape_x + x - 2) * tile_size, (shape_y + y - 1) * tile_size, tile_size, tile_size)
      end
    end
  end
  -- Draw game over message
  if game_over then
    love.graphics.setColor(1, 0, 0)
    love.graphics.printf("Game Over", 0, board_height * tile_size / 2 - 10, board_width * tile_size, "center")
  end
end

function love.keypressed(key)
  if game_over then return end
  if key == "left" and isValidMove(-1, 0) then
    shape_x = shape_x - 1
  elseif key == "right" and isValidMove(1, 0) then
    shape_x = shape_x + 1
  elseif key == "down" and isValidMove(0, 1) then
    shape_y = shape_y + 1
  elseif key == "up" then
    rotateShape()
  elseif key == "space" then
    while isValidMove(0, 1) do
      shape_y = shape_y + 1
    end
    placeShape()
  end
end
