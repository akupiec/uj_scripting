local GameMode = require("gameMode")

local BoardActions = {}
BoardActions.__index = BoardActions

function BoardActions.new(state)
  local self = setmetatable({}, BoardActions)
  self.state = state
  self.gameOver = function()
    self.state.mode = GameMode.GameOver
  end
  return self
end

return BoardActions
