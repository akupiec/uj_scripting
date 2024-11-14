local Shape = require("board/shape")

local TileArea = {}
TileArea.__index = TileArea

TileArea.width = 10
TileArea.height = 18
TileArea.tile_size = 30

function TileArea.new(actions)
  local self = setmetatable({}, TileArea)
  self.actions = actions
  self.grid = {}
  for y = 1, TileArea.height do
    self.grid[y] = {}
    for x = 1, TileArea.width do
      self.grid[y][x] = 0
    end
  end
  self.shape = Shape.new(TileArea.width / 2)
  return self
end

function TileArea:isValidMove(shape, offset_x, offset_y)
  for y, row in ipairs(shape.matrix) do
    for x, cell in ipairs(row) do
      if cell ~= 0 then
        local new_x = shape.x + x + offset_x - 1
        local new_y = shape.y + y + offset_y
        if new_x < 1 or new_x > TileArea.width or new_y > TileArea.height then
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

function TileArea:placeShape(shape)
  for y, row in ipairs(shape.matrix) do
    for x, cell in ipairs(row) do
      if cell ~= 0 then
        self.grid[shape.y + y][shape.x + x - 1] = cell
      end
    end
  end
end

function TileArea:clearLines()
  for y = TileArea.height, 1, -1 do
    local full_line = true
    for x = 1, TileArea.width do
      if self.grid[y][x] == 0 then
        full_line = false
        break
      end
    end
    if full_line then
      table.remove(self.grid, y)
      table.insert(self.grid, 1, {})
      for x = 1, TileArea.width do
        self.grid[1][x] = 0
      end
    end
  end
end

local drop_timer = 0
local drop_interval = 0.5

function TileArea:update(dt)
  drop_timer = drop_timer + dt
  if drop_timer >= drop_interval then
    drop_timer = 0
    if self:isValidMove(self.shape, 0, 1) then
      self.shape.y = self.shape.y + 1
    else
      self:placeShape(self.shape)
      self:clearLines()
      self.shape = Shape.new(TileArea.width / 2)
      if not self:isValidMove(self.shape, 0 ,0) then
        self.actions.gameOver()
      end
    end
  end
end

function TileArea:action(key)
  if key == "left" and self:isValidMove(self.shape, -1, 0) then
    self.shape.x = self.shape.x - 1
  elseif key == "right" and self:isValidMove(self.shape, 1, 0) then
    self.shape.x = self.shape.x + 1
  elseif key == "down" and self:isValidMove(self.shape, 0, 1) then
    self.shape.y = self.shape.y + 1
  elseif key == "up" then
    self.shape:rotate()
    if not self:isValidMove(self.shape, 0, 0) then
      self.shape:rotate(true)
    end
  elseif key == "space" then
    while self:isValidMove(self.shape, 0, 1) do
      self.shape.y = self.shape.y + 1
    end
    self:placeShape(self.shape)
  end
end

function TileArea:draw(dX, dY)
  self:_drawGrid(dX, dY)
  self:_drawShape(dX, dY)
end

function TileArea:_drawGrid(dX, dY)
  love.graphics.setColor(1, 0.5, 0)
  --love.graphics.rectangle("fill", dX,dY, TileArea.width * TileArea.tile_size, TileArea.height * TileArea.tile_size)
  for y = 1, TileArea.height do
    for x = 1, TileArea.width do
      if self.grid[y][x] ~= 0 then
        love.graphics.rectangle("fill", ((x - 1) * TileArea.tile_size) + dX, ((y - 1) * TileArea.tile_size) + dY, TileArea.tile_size, TileArea.tile_size)
      end
    end
  end
end

function TileArea:_drawShape(dX, dY)
  love.graphics.setColor(0.5, 1, 0)
  for y, row in ipairs(self.shape.matrix) do
    for x, cell in ipairs(row) do
      if cell ~= 0 then
        love.graphics.rectangle("fill", ((self.shape.x + x - 2) * TileArea.tile_size) + dX, ((self.shape.y + y - 1) * TileArea.tile_size) + dY, TileArea.tile_size, TileArea.tile_size)
      end
    end
  end
end

return TileArea
