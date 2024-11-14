local Grid = require('grid')
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
  self.totalLinesCleared = 0;

  self.grid = Grid.init(self.tileWidth, self.tileHeight)
  self.currentShape = Shape.new(State.tileWidth / 2)
  self.nextShape = Shape.new(State.tileWidth / 2)
end

function State:updateNextShape()
  self.currentShape = self.nextShape
  self.nextShape = Shape.new(State.tileWidth / 2)
end

function State:linesClear(numberOfLines)
  local multiplier = numberOfLines > 1 and numberOfLines * 0.1 + 1 or 1
  self.score = self.score + self.lvl * 10 * multiplier
  self.totalLinesCleared = self.totalLinesCleared + numberOfLines
  self.lvl = math.floor(self.totalLinesCleared / 10) + 1
end

return State
