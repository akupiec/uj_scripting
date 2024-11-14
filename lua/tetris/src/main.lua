local Menu = unpack(require("menu/menu"))
local MenuActions = require("menu/menuActions")
local Board = require("board/board")
local State = require("state")
local GameMode = require("gameMode")

local state

function love.load()
  state = State.new()

  love.window.setMode(state.window.w, state.window.h, { resizable = false, vsync = state.window.vsync })
  love.window.setTitle(state.name)

  local menuActions = MenuActions.new(state)
  menu = Menu.new(state, menuActions)
  board = Board.new(state)

  io.stdout:setvbuf("no")
end

function love.update(dt)
  if state.mode == GameMode.Running then
    board:update(dt)
  elseif state.mode == GameMode.Menu or state.mode == GameMode.Pause then
    menu:update(dt)
  end
end

function love.draw()
  if state.mode == GameMode.Running then
    board:draw()
  elseif state.mode == GameMode.Menu or state.mode == GameMode.Pause then
    menu:draw()
  end
end

function love.keypressed(key)
  if state.mode == GameMode.Running then
    board:action(key)
  elseif state.mode == GameMode.Menu or state.mode == GameMode.Pause then
    menu:action(key)
  end
end
