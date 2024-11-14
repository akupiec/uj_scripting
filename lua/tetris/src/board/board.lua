local Board = {}
Board.__index = Board

function Board.new()
  local self = setmetatable({}, Board)

  return self
end

function Board:update(dt)

end
function Board:draw()

end
function Board:action()

end

return Board
