local Button = require("menu/button")
local ButtonConfig = require("menu/buttonConfig")

local MenuMode = {
  Pause = 1,
  New = 2,
}

local Menu = {}
Menu.__index = Menu
Menu.title = "GameName"

function Menu.new(screenWidth, onGameExitFn)
  local self = setmetatable({}, Menu)
  self.onGameExitFn = onGameExitFn
  self.mode = MenuMode.New
  self.startBtn = Button.new(screenWidth, 100, "Start New", true, self._startGame)
  self.resumeBtn = Button.new(screenWidth, 100, "Resume", false, self._resumeGame)
  self.loadBtn = Button.new(screenWidth, 200, "Load", false, self._loadGame)
  self.saveBtn = Button.new(screenWidth, 200, "Save", false, self._saveGame)
  self.mainManuBtn = Button.new(screenWidth, 300, "Main Menu", false, self._mainMenuGame(self))
  self.exitBtn = Button.new(screenWidth, 400, "Exit", false, onGameExitFn)
  self._displayButtons = { self.startBtn, self.loadBtn, self.exitBtn }
  return self
end

function Menu:setMode(mode)
  self.mode = mode
  for _, btn in pairs(self._displayButtons) do
    btn.isHovered = false
  end

  if mode == MenuMode.Pause then
    self._displayButtons = { self.resumeBtn, self.saveBtn, self.mainManuBtn, self.exitBtn }
    self.resumeBtn.isHovered = true
  else
    self._displayButtons = { self.startBtn, self.loadBtn, self.exitBtn }
    self.startBtn.isHovered = true
  end
end

function Menu:_startGame()
  print('START')
end

function Menu:_loadGame()
  print('LOAD')
end

function Menu:_saveGame()
  print('SAVE')
end

function Menu:_resumeGame()
  print('Resume')
end

function Menu:_close()
  if self.mode == MenuMode.New then
    self.onGameExitFn()
  else
    self._resumeGame()
  end
end

function Menu._mainMenuGame(self)
  return function()
    self:setMode(MenuMode.New)
  end
end

function Menu:update(dt)
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

function Menu:action(key)
  local selectedIdx = 1
  for i, b in ipairs(self._displayButtons) do
    if b.isHovered then
      selectedIdx = i
      b.isHovered = false
    end
  end

  if key == "up" and selectedIdx > 1 then
    selectedIdx = selectedIdx - 1
    self._displayButtons[selectedIdx].isHovered = true
  elseif key == "down" and selectedIdx < #self._displayButtons then
    selectedIdx = selectedIdx + 1
    self._displayButtons[selectedIdx].isHovered = true
  elseif key == "return" then
    self._displayButtons[selectedIdx].click()
  elseif key == "escape" then
    self:_close()
  end
end

return { Menu, MenuMode }
