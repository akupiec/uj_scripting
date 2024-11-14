local GameMode = require("gameMode")

local BoardActions = {}
BoardActions.__index = BoardActions

function BoardActions.new(state)
  local self = setmetatable({}, BoardActions)
  self.state = state
  self.gameOver = function()
    self.state.mode = GameMode.GameOver
  end
  self.updateNextShape = function()
    self.state:updateNextShape()
  end
  self.pause = function()
    self.state.mode = GameMode.Pause
  end
  self.linesClear = function(numberOfLines)
    self.state:linesClear(numberOfLines)
  end
  return self
end

return BoardActions
