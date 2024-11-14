local scoreBox, levelBox, shapeBox

local font

local tetrisShape = { {1, 1}, {2, 1}, {3, 1} } -- A simple vertical line block

function love.load()
  font = love.graphics.newFont(30)

  scoreBox = { x = 20, y = 20, width = 300, height = 60, content = "9999999999999" }
  levelBox = { x = 20, y = 100, width = 300, height = 60, content = "999" }
  shapeBox = { x = 20, y = 180, width = 300, height = 60, content = tetrisShape }
end

function love.draw()
  love.graphics.setColor(0.2, 0.2, 0.2)  -- Dark grey background
  drawBox(scoreBox)
  drawBox(levelBox)
  drawBox(shapeBox)

  -- Draw the text inside the boxes (right-aligned, centered)
  love.graphics.setFont(font)
  love.graphics.setColor(1, 1, 1)  -- White text color
  love.graphics.printf(scoreBox.content, scoreBox.x, scoreBox.y + scoreBox.height / 2 - font:getHeight() / 2, scoreBox.width, "right")
  love.graphics.printf(levelBox.content, levelBox.x, levelBox.y + levelBox.height / 2 - font:getHeight() / 2, levelBox.width, "right")

  -- Draw the Tetris shape (represented as simple blocks)
  for i, block in ipairs(shapeBox.content) do
    love.graphics.rectangle("fill", shapeBox.x + block[1] * 20, shapeBox.y + block[2] * 20, 20, 20)
  end
end

-- Function to draw a box with border
function drawBox(box)
  love.graphics.setColor(0.3, 0.3, 0.3)  -- Slightly lighter grey for border
  love.graphics.rectangle("line", box.x, box.y, box.width, box.height)  -- Draw the border
  love.graphics.setColor(0.1, 0.1, 0.1)  -- Darker background color inside box
  love.graphics.rectangle("fill", box.x + 2, box.y + 2, box.width - 4, box.height - 4)  -- Fill the box
end
