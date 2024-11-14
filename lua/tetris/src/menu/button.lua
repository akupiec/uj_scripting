local ButtonConfig = require("menu/buttonConfig")
local shallowCopy = unpack(require("utils/copy"))

local Button = {
  x,
  y,
  text,
  isHovered,
  currentColor,
  scale,
  width = 200,
  height = 50,
}
Button.__index = Button

function Button.new(screenWidth, y, text, selected, callbackFn)
  local self = setmetatable({}, Button)
  self.x = (screenWidth / 2) - (Button.width / 2)
  self.y = y
  self.text = text
  self.isHovered = selected
  self.click = callbackFn
  self.scale = ButtonConfig.normalScale
  self.currentColor = shallowCopy(ButtonConfig.normalColor)
  return self
end

return Button
