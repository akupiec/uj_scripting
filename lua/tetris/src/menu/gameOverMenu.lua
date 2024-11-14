local Button = require("menu/button")
local ButtonConfig = require("menu/buttonConfig")

local GameOverMenu = {}
GameOverMenu.__index = GameOverMenu

function GameOverMenu.new(state, actions)
  local self = setmetatable({}, GameOverMenu)
  self.state = state
  self.lastStateMode = nil
  self.onGameExitFn = actions.exitGame
  self.startBtn = Button.new(state.window.w, 340, "Start New", true, actions.startGame)
  self.exitBtn = Button.new(state.window.w, 460, "Exit", false, actions.exitGame)
  self._displayButtons = { self.startBtn, self.exitBtn }
  return self
end

function GameOverMenu:update(dt)
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

function GameOverMenu:draw()
  love.graphics.setFont(self.state.font44)
  love.graphics.setColor(ButtonConfig.hoverColor)
  love.graphics.printf(
    "Game Over",
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

function GameOverMenu:_findSelectedBtnIndex()
  for i, b in ipairs(self._displayButtons) do
    if b.isHovered then
      return i
    end
  end
end

function GameOverMenu:_deselectAllButtons()
  for _, b in ipairs(self._displayButtons) do
    b.isHovered = false
  end
end

function GameOverMenu:action(key)
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

return GameOverMenu
