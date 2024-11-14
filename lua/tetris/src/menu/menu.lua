local Button = require("menu/button")
local ButtonConfig = require("menu/buttonConfig")
local GameMode = require('gameMode')

local Menu = {}
Menu.__index = Menu

function Menu.new(state, actions)
  local self = setmetatable({}, Menu)
  self.state = state
  self.lastStateMode = nil
  self.onGameExitFn = actions.exitGame
  self.onResumeFn = actions.resumeGame
  self.isVisible = true
  self.startBtn = Button.new(state.window.w, 150, "Start New", true, actions.startGame)
  self.resumeBtn = Button.new(state.window.w, 150, "Resume", false, actions.resumeGame)
  self.loadBtn = Button.new(state.window.w, 220, "Load", false, actions.loadGame)
  self.saveBtn = Button.new(state.window.w, 220, "Save", false, actions.saveGame)
  self.mainManuBtn = Button.new(state.window.w, 340, "Main Menu", false, actions.mainMenu)
  self.exitBtn = Button.new(state.window.w, 460, "Exit", false, actions.exitGame)
  self._displayButtons = { self.startBtn, self.loadBtn, self.exitBtn }
  return self
end

function Menu:_modeUpdate()
  self:_deselectAllButtons()
  self.lastStateMode = self.state.mode

  if self.state.mode == GameMode.Pause then
    self._displayButtons = { self.resumeBtn, self.saveBtn, self.mainManuBtn, self.exitBtn }
    self.resumeBtn.isHovered = true
  else
    self._displayButtons = { self.startBtn, self.loadBtn, self.exitBtn }
    self.startBtn.isHovered = true
  end
end

function Menu:_close()
  if self.state == GameMode.Menu then
    self.onGameExitFn()
  else
    self.onResumeFn()
  end
end

function Menu:update(dt)
  if self.lastStateMode ~= self.state.mode then
    self:_modeUpdate()
  end

  for _, button in ipairs(self._displayButtons) do
    local nextColor
    if button.isHovered then
      nextColor = shallowCopy(ButtonConfig.hoverColor)
      button.scale = math.min(button.scale + dt * ButtonConfig.scaleSpeed, ButtonConfig.hoverScale)
    else
      nextColor = shallowCopy(ButtonConfig.normalColor)
      button.scale = math.max(button.scale - dt * ButtonConfig.scaleSpeed, ButtonConfig.normalScale)
    end

    for i = 1, 3 do
      button.currentColor[i] = button.currentColor[i] + (nextColor[i] - button.currentColor[i]) * ButtonConfig.colorSpeed * dt
    end
  end
end

function Menu:draw()
  love.graphics.setFont(self.state.font44)
  love.graphics.setColor(ButtonConfig.hoverColor)
  love.graphics.printf(
    self.state.name,
    0,
    70,
    self.state.window.w,
    "center"
  )

  love.graphics.setFont(self.state.font)
  for _, button in ipairs(self._displayButtons) do

    love.graphics.setColor(button.currentColor)
    love.graphics.rectangle(
      "fill",
      button.x - (button.width * (button.scale - 1) / 2),
      button.y - (button.height * (button.scale - 1) / 2),
      button.width * button.scale,
      button.height * button.scale
    )

    love.graphics.setColor(ButtonConfig.textColor)
    love.graphics.printf(
      button.text,
      button.x - (button.width * (button.scale - 1) / 2),
      button.y + (button.height * button.scale) / 4 - (button.height * (button.scale - 1) / 2),
      button.width * button.scale,
      "center"
    )
  end
end

function Menu:_findSelectedBtnIndex()
  for i, b in ipairs(self._displayButtons) do
    if b.isHovered then
      return i
    end
  end
end

function Menu:_deselectAllButtons()
  for _, b in ipairs(self._displayButtons) do
    b.isHovered = false
  end
end

function Menu:action(key)
  local selectedIdx = self:_findSelectedBtnIndex()
  if key == "up" and selectedIdx > 1 then
    self:_deselectAllButtons()
    self._displayButtons[selectedIdx - 1].isHovered = true
  elseif key == "down" and selectedIdx < #self._displayButtons then
    self:_deselectAllButtons()
    self._displayButtons[selectedIdx + 1].isHovered = true
  elseif key == "return" then
    self._displayButtons[selectedIdx].click()
  elseif key == "escape" then
    self:_close()
  end
end

return { Menu, MenuMode }
