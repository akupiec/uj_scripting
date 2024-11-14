-- shape.lua
local Shape = {}
Shape.__index = Shape

local shapes = {
  {{1,1,1,1}},  -- I
  {{1,1},{1,1}},  -- O
  {{0,1,1},{1,1,0}},  -- S
  {{1,1,0},{0,1,1}},  -- Z
  {{1,0,0},{1,1,1}},  -- L
  {{0,0,1},{1,1,1}},  -- J
  {{0,1,0},{1,1,1}},  -- T
}

function Shape.new()
  local self = setmetatable({}, Shape)
  self.matrix = shapes[math.random(#shapes)]
  self.x = 0
  self.y = 0
  return self
end

function Shape:rotate(reverse)
  local new_matrix = {}
  for x = 1, #self.matrix[1] do
    new_matrix[x] = {}
    for y = 1, #self.matrix do
      if reverse then
        new_matrix[x][y] = self.matrix[y][#self.matrix[1] - x + 1]
      else
        new_matrix[x][y] = self.matrix[#self.matrix - y + 1][x]
      end
    end
  end
  self.matrix = new_matrix
end

function Shape:draw(tile_size)
  love.graphics.setColor(0, 0.5, 1)
  for y, row in ipairs(self.matrix) do
    for x, cell in ipairs(row) do
      if cell ~= 0 then
        love.graphics.rectangle("fill", (self.x + x - 2) * tile_size, (self.y + y - 1) * tile_size, tile_size, tile_size)
      end
    end
  end
end

return Shape
