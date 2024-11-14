local Board = {}
Board.__index = Board

Board.width = 10
Board.height = 20
Board.tile_size = 35

function Board.new()
  local self = setmetatable({}, Board)
  self.grid = {}
  for y = 1, Board.height do
    self.grid[y] = {}
    for x = 1, Board.width do
      self.grid[y][x] = 0
    end
  end
  return self
end

function Board:spawnShape(shape)
  shape.x = math.floor(Board.width / 2) - math.floor(#shape.matrix[1] / 2)
  shape.y = 0
  return self:isValidMove(shape, 0, 0)
end

function Board:isValidMove(shape, offset_x, offset_y)
  for y, row in ipairs(shape.matrix) do
    for x, cell in ipairs(row) do
      if cell ~= 0 then
        local new_x = shape.x + x + offset_x - 1
        local new_y = shape.y + y + offset_y
        if new_x < 1 or new_x > Board.width or new_y > Board.height then
          return false
        end
        if new_y > 0 and self.grid[new_y][new_x] ~= 0 then
          return false
        end
      end
    end
  end
  return true
end

function Board:placeShape(shape)
  for y, row in ipairs(shape.matrix) do
    for x, cell in ipairs(row) do
      if cell ~= 0 then
        self.grid[shape.y + y][shape.x + x - 1] = cell
      end
    end
  end
end

function Board:clearLines()
  for y = Board.height, 1, -1 do
    local full_line = true
    for x = 1, Board.width do
      if self.grid[y][x] == 0 then
        full_line = false
        break
      end
    end
    if full_line then
      table.remove(self.grid, y)
      table.insert(self.grid, 1, {})
      for x = 1, Board.width do
        self.grid[1][x] = 0
      end
    end
  end
end

function Board:draw()
  love.graphics.setColor(1, 0.5, 0)
  for y = 1, Board.height do
    for x = 1, Board.width do
      if self.grid[y][x] ~= 0 then
        love.graphics.rectangle("fill", (x - 1) * Board.tile_size, (y - 1) * Board.tile_size, Board.tile_size, Board.tile_size)
      end
    end
  end
end

return Board
