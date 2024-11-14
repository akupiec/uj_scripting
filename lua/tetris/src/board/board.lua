local scoreBox, levelBox

local Board = {}
Board.__index = Board

function Board.new(state)
  local self = setmetatable({}, Board)
  self.state = state

  scoreBox = { x = 20, y = 20, width = 300, height = 60 }
  levelBox = { x = 20, y = 100, width = 300, height = 60 }
  return self
end

function Board:update(dt)

end

function Board:draw()
  self:drawBox(scoreBox)
  self:drawBox(levelBox)

  self:drawText()
end

function Board:action()

end

function Board:drawText()
  local font = self.state.font
  love.graphics.setFont(font)
  love.graphics.setColor(1, 1, 1)
  local fontHH = font:getHeight() / 2
  local margin = 10
  local scoreBoxHH = scoreBox.y + scoreBox.height / 2 - fontHH
  local levelBoxHH = levelBox.y + levelBox.height / 2 - fontHH
  love.graphics.printf("Score", scoreBox.x + margin, scoreBoxHH, scoreBox.width, "left")
  love.graphics.printf(self.state.score, scoreBox.x - margin, scoreBoxHH, scoreBox.width, "right")
  love.graphics.printf("Level", levelBox.x + margin, levelBoxHH, levelBox.width, "left")
  love.graphics.printf(self.state.lvl, levelBox.x - margin, levelBoxHH, levelBox.width, "right")
end

function Board:drawBox(box)
  love.graphics.setColor(0.3, 0.3, 0.3)
  love.graphics.rectangle("line", box.x, box.y, box.width, box.height)
  love.graphics.setColor(0.1, 0.1, 0.1)
  love.graphics.rectangle("fill", box.x + 2, box.y + 2, box.width - 4, box.height - 4)
end

return Board
