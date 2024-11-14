local Grid = {}

function Grid.init(w, h)
  local grid = {}
  for y = 1, h do
    grid[y] = {}
    for x = 1, w do
      grid[y][x] = 0
    end
  end
  return grid
end

function Grid.isLineFull(rowTable)
  for i = 1, #rowTable do
    if rowTable[i] == 0 then
      return false
    end
  end
  return true
end

function Grid.newRow(len)
  local row = {}
  for i = 1, len do
    row[i] = 0
  end
  return row
end

return Grid
