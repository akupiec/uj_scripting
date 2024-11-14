
function love.update(dt)
  local mouseX, mouseY = love.mouse.getPosition()
  for i, button in ipairs(buttons) do
    -- Check if mouse is over button
    button.isHovered = mouseX > button.x and mouseX < button.x + button.width
            and mouseY > button.y and mouseY < button.y + button.height

  end
end

function love.mousepressed(x, y, button, istouch, presses)
  if button == 1 then  -- Left mouse button
    for btn in buttons do
      if btn.isHovered then
        btn.isPressed = true
      end
    end
  end
end

function love.mousereleased(x, y, button, istouch, presses)
  if button == 1 then  -- Left mouse button
    for i, btn in ipairs(buttons) do
      btn.isPressed = false
    end
  end
end
