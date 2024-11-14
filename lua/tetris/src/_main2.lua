local boxShader
local sparkleShader
local sparkleTime = 0  -- Tracks sparkle animation over time

function love.load()
    love.window.setTitle("Box with Shadow and Sparkling Effect")
    love.window.setMode(800, 600)

    -- Shadow Shader (same as before)
    boxShader = love.graphics.newShader[[
        extern number shadowOffset;
        extern vec4 shadowColor;
        extern number boxWidth;
        extern number boxHeight;

        vec4 effect(vec4 color, Image texture, vec2 texture_coords, vec2 screen_coords) {
            vec2 shadowCenter = vec2(boxWidth / 2, boxHeight / 2) + vec2(shadowOffset, shadowOffset);
            float distance = length(screen_coords - shadowCenter);
            float alpha = 1.0 - smoothstep(0.0, shadowOffset, distance);
            vec4 boxColor = Texel(texture, texture_coords) * color;
            return mix(shadowColor * alpha, boxColor, boxColor.a);
        }
    ]]

    -- Sparkling Shader
    sparkleShader = love.graphics.newShader[[
        extern number time;  // Elapsed time for sparkle animation
        extern vec2 resolution;  // Screen resolution

        vec4 effect(vec4 color, Image texture, vec2 texture_coords, vec2 screen_coords) {
            vec4 baseColor = Texel(texture, texture_coords) * color;

            // Calculate sparkle positions based on screen coordinates
            float sparkleFrequency = 20.0;  // Controls sparkle density
            float sparkleSize = 2.0;        // Size of each sparkle
            float intensity = 0.5 + 0.5 * sin(time * 3.0 + screen_coords.x * 0.2 + screen_coords.y * 0.3);

            // Randomly positioned sparkles
            float sparkleX = mod(screen_coords.x + sin(time * sparkleFrequency) * 50.0, resolution.x) / sparkleSize;
            float sparkleY = mod(screen_coords.y + cos(time * sparkleFrequency) * 50.0, resolution.y) / sparkleSize;
            float sparkle = abs(sin(sparkleX + sparkleY + time * 10.0)) * intensity;

            // Apply sparkle effect: add yellowish glow
            vec4 sparkleColor = vec4(1.0, 1.0, 0.2, sparkle);  // Yellow sparkle with varying alpha
            return baseColor + sparkleColor * sparkle;  // Additive blend for sparkle effect
        }
    ]]

    -- Set shader parameters
    boxShader:send("shadowOffset", 10)
    boxShader:send("shadowColor", {0, 0, 0, 0.5})
    sparkleShader:send("resolution", {love.graphics.getWidth(), love.graphics.getHeight()})
end

function love.update(dt)
    sparkleTime = sparkleTime + dt  -- Update sparkle time
    sparkleShader:send("time", sparkleTime)
end

function love.draw()
    local x, y = 300, 200          -- Position of the box
    local width, height = 200, 150 -- Size of the box

    -- Shadow Shader
    boxShader:send("boxWidth", width)
    boxShader:send("boxHeight", height)
    love.graphics.setShader(boxShader)

    -- Draw the box
    love.graphics.setColor(1, 1, 1)
    love.graphics.rectangle("fill", x, y, width, height)

    -- Sparkle Shader
    love.graphics.setShader(sparkleShader)
    love.graphics.rectangle("fill", x, y, width, height)

    -- Reset shader for the border
    love.graphics.setShader()
    love.graphics.setColor(0.5, 0.5, 0.5)
    love.graphics.setLineWidth(3)
    love.graphics.rectangle("line", x, y, width, height)
end
