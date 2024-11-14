local GameMode = require('gameMode')

local State = {}
State.__index = State

function State.new()
  local self = setmetatable({}, State)

  self.window = { w = 800, h = 600, vsync = 1 }
  self.name = "ArtNotTetris"
  self.mode = GameMode.Menu
  self.font = love.graphics.newFont("assets/fonts/surrendere/surrendere.otf", 18)
  self.font44 = love.graphics.newFont("assets/fonts/surrendere/surrendere.otf", 44)
  return self
end

return State
