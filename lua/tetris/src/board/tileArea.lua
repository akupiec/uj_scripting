local TileArea = {}
TileArea.__index = TileArea

function TileArea.new(state, actions)
  local self = setmetatable({}, TileArea)
  self.actions = actions
  self.state = state

  return self
end

function TileArea:isValidMove(shape, offset_x, offset_y)
  for y, row in ipairs(shape.matrix) do
    for x, cell in ipairs(row) do
      if cell ~= 0 then
        local new_x = shape.x + x + offset_x - 1
        local new_y = shape.y + y + offset_y
        if new_x < 1 or new_x > self.state.tileWidth or new_y > self.state.tileHeight then
          return false
        end
        if new_y > 0 and self.state.grid[new_y][new_x] ~= 0 then
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
        self.state.grid[shape.y + y][shape.x + x - 1] = cell
      end
    end
  end
end

function TileArea:clearLines()
  for y = self.state.tileHeight, 1, -1 do
    local full_line = true
    for x = 1, self.state.tileWidth do
      if self.state.grid[y][x] == 0 then
        full_line = false
        break
      end
    end
    if full_line then
      table.remove(self.state.grid, y)
      table.insert(self.state.grid, 1, {})
      for x = 1, self.state.tileWidth do
        self.state.grid[1][x] = 0
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
    if self:isValidMove(self.state.currentShape, 0, 1) then
      self.state.currentShape.y = self.state.currentShape.y + 1
    else
      self:placeShape(self.state.currentShape)
      self:clearLines()
      self.actions:updateNextShape()
      self.state.currentShape = self.state.currentShape
      if not self:isValidMove(self.state.currentShape, 0 ,0) then
        self.actions.gameOver()
      end
    end
  end
end

function TileArea:action(key)
  if key == "left" and self:isValidMove(self.state.currentShape, -1, 0) then
    self.state.currentShape.x = self.state.currentShape.x - 1
  elseif key == "right" and self:isValidMove(self.state.currentShape, 1, 0) then
    self.state.currentShape.x = self.state.currentShape.x + 1
  elseif key == "down" and self:isValidMove(self.state.currentShape, 0, 1) then
    self.state.currentShape.y = self.state.currentShape.y + 1
  elseif key == "up" then
    self.state.currentShape:rotate()
    if not self:isValidMove(self.state.currentShape, 0, 0) then
      self.state.currentShape:rotate(true)
    end
  elseif key == "space" then
    while self:isValidMove(self.state.currentShape, 0, 1) do
      self.state.currentShape.y = self.state.currentShape.y + 1
    end
    self:placeShape(self.state.currentShape)
  end
end

function TileArea:draw(dX, dY)
  self:_drawGrid(dX, dY)
  self:_drawShape(dX, dY)
end

function TileArea:_drawGrid(dX, dY)
  love.graphics.setColor(1, 0.5, 0)
  --love.graphics.rectangle("fill", dX,dY, self.state.tileWidth * self.state.tileSize, self.state.tileHeight * self.state.tileSize)
  for y = 1, self.state.tileHeight do
    for x = 1, self.state.tileWidth do
      if self.state.grid[y][x] ~= 0 then
        love.graphics.rectangle("fill", ((x - 1) * self.state.tileSize) + dX, ((y - 1) * self.state.tileSize) + dY, self.state.tileSize, self.state.tileSize)
      end
    end
  end
end

function TileArea:_drawShape(dX, dY)
  love.graphics.setColor(0.5, 1, 0)
  for y, row in ipairs(self.state.currentShape.matrix) do
    for x, cell in ipairs(row) do
      if cell ~= 0 then
        love.graphics.rectangle("fill", ((self.state.currentShape.x + x - 2) * self.state.tileSize) + dX, ((self.state.currentShape.y + y - 1) * self.state.tileSize) + dY, self.state.tileSize, self.state.tileSize)
      end
    end
  end
end

return TileArea
