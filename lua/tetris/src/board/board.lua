local TileArea = require("board/tileArea")
local Board = {}
Board.__index = Board

function Board.new(state, actions)
  local self = setmetatable({}, Board)
  self.state = state
  local margin = 20
  self.tileArea = TileArea.new(actions)

  self.scoreBox = { x = margin, y = margin, width = 300, height = 60, label = "Score" }
  self.levelBox = { x = margin, y = 100, width = 300, height = 60, label = "Level" }
  local tileBoxSize = { w = TileArea.width * TileArea.tile_size + 10, h = TileArea.height * TileArea.tile_size + 10}
  self.tilesBox = { x = state.window.w - tileBoxSize.w - margin, y = margin, width = tileBoxSize.w, height = tileBoxSize.h }

  return self
end

function Board:update(dt)
  self.tileArea:update(dt)
end

function Board:draw()
  self:_drawBoxes()
  self:_drawTexts()
  self.tileArea:draw(self.tilesBox.x + 5, self.tilesBox.y + 5)
end

function Board:action(key)
  self.tileArea:action(key)
end

function Board:_drawTexts()
  love.graphics.setFont(self.state.font)
  love.graphics.setColor(1, 1, 1)
  self:_drawText(self.scoreBox, self.state.score)
  self:_drawText(self.levelBox, self.state.lvl)
end

function Board:_drawBoxes()
  self:_drawBox(self.scoreBox)
  self:_drawBox(self.levelBox)
  self:_drawBox(self.tilesBox)
end

function Board:_drawText(box, value)
  local fontHH = love.graphics.getFont():getHeight() / 2
  local margin = 10
  local scoreBoxHH = box.y + box.height / 2 - fontHH
  love.graphics.printf(box.label, box.x + margin, scoreBoxHH, box.width, "left")
  love.graphics.printf(value, box.x - margin, scoreBoxHH, box.width, "right")
end

function Board:_drawBox(box)
  love.graphics.setColor(0.3, 0.3, 0.3)
  love.graphics.rectangle("line", box.x, box.y, box.width, box.height)
  love.graphics.setColor(0.1, 0.1, 0.1)
  love.graphics.rectangle("fill", box.x + 2, box.y + 2, box.width - 4, box.height - 4)
end

return Board
