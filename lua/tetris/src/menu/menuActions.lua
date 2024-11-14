local GameMode = require("gameMode")

local MenuActions = {}
MenuActions.__index = MenuActions

function MenuActions.new(state)
  local self = setmetatable({}, MenuActions)
  self.state = state
  self.exitGame = function()
    love.event.quit()
  end
  self.startGame = function()
    self.state:startNewGame()
  end
  self.resumeGame = function()
    self.state.mode = GameMode.Running
  end
  self.mainMenu = function()
    self.state.mode = GameMode.Menu
  end
  self.loadGame = function()
    print("LOAD")
  end
  self.saveGame = function()
    print("SAVE")
  end
  return self
end

return MenuActions
