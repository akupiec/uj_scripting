local Menu, MenuMode = unpack(require("menu/menu"))

function exitGame()
  love.event.quit()
end

function love.load()
  love.window.setMode(800, 600, { resizable = false, vsync = 1 })
  menu = Menu.new(800, exitGame)

  --menu:setMode(MenuMode.Pause)
  io.stdout:setvbuf("no")
end

function love.update(dt)
  menu:update(dt)
end

function love.draw()
  menu:draw()
end

function love.keypressed(key)
  menu:action(key)
end
