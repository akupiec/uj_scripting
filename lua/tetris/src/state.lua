local GameMode = require('gameMode')
local Shape = require("board/shape")


local State = {}
State.__index = State

State.tileWidth = 10
State.tileHeight = 18
State.tileSize = 30
State.name = "ArtNotTetris"

function State.new()
  local self = setmetatable({}, State)

  self.window = { w = 800, h = 600, vsync = 1 }
  self.font = love.graphics.newFont("assets/fonts/surrendere/surrendere.otf", 18)
  self.font44 = love.graphics.newFont("assets/fonts/surrendere/surrendere.otf", 44)
  self.mode = GameMode.Menu
  return self
end

function State:startNewGame()
  self.mode = GameMode.Running
  self.score = 0
  self.lvl = 1

  self.grid = {}
  for y = 1, State.tileHeight do
    self.grid[y] = {}
    for x = 1, State.tileWidth do
      self.grid[y][x] = 0
    end
  end
  self.currentShape = Shape.new(State.tileWidth / 2)
  self.nextShape = Shape.new(State.tileWidth / 2)
end

function State:updateNextShape()
  self.currentShape = self.nextShape
  self.nextShape = Shape.new(State.tileWidth / 2)
end

return State
