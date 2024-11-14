function shallowCopy(original)
  local copy = {}
  for key, value in pairs(original) do
    copy[key] = value
  end
  return copy
end

return { shallowCopy }
