// 1 == coin; 2 == brick; 0 == empty
var world = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,1,1,1,1,1,2,1,1,1,2,1,0,0,1,1,1,1,1,1,2],
    [2,1,1,1,1,1,1,2,1,1,1,2,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,1,1,1,1,2,1,1,1,2,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
]

var coords = {
    x: 1,
    y: 1,
    xPos: 22,
    yPos: 22,
    lookDirection: "right",
}

var totalCoins = 0;
for (var i = 1; i < world.length; i++) {
    for (var j = 1; j < world[i].length; j++) {
        if (world[i][j] === 1) {
            totalCoins++;
        }
    }
}

function showWorld() {
    var htmlString = "";
    for (var i = 0; i < world.length; i++) {
        htmlString += "<div class='row'>";
        for (var j = 0; j < world[i].length; j++) {
            if (world[i][j] === 2) {
                htmlString += "<div class='brick'></div>";
            } else if (world[i][j] === 1) {
                htmlString += "<div class='coin'></div>";
            } else if (world[i][j] === 0) {
                htmlString += "<div class='empty'></div>";
            }
        }
        htmlString += "</div>";
    }

    return htmlString;
}

$(document).ready(function() {
    $('#wrapper').html(showWorld() + "<img id='pacman' src='pacman.gif'>");
    $('#pacman').css('top', '22px');
    $('#pacman').css('left', '22px');
    gameLoop();
})

document.onkeydown = function(event) {
    if (event.keyCode === 38) { // up
        coords.lookDirection = "up";
    }
    if (event.keyCode === 39) { // right
        coords.lookDirection = "right";
    }
    if (event.keyCode === 40) { // down
        coords.lookDirection = "down";
    }
    if (event.keyCode === 37) { // left
        coords.lookDirection = "left";
    }
}

function move(direction) {
    var xNext = coords.x;
    var yNext = coords.y;
    if (direction === "up") {
        look("up");
        yNext -= 1;
    } else if (direction === "down") {
        look("down");
        yNext += 1;
    } else if (direction === "left") {
        look("left");
        xNext -= 1;
    } else {
        look("right");
        xNext += 1;
    }
    var nextCoordVal = world[yNext][xNext];
    if (nextCoordVal !== 2) {
        if (nextCoordVal === 1) {
            totalCoins--;
            world[yNext][xNext] = 0;
        }
        coords.x = xNext;
        coords.y = yNext;
        reloadWorld(xNext, yNext);
    }
}

function reloadWorld(x, y) {
    document.getElementById('wrapper').innerHTML = showWorld() + "<img id='pacman' src='pacman.gif'>";
    look(lookDirection);
    $('#pacman').css('left', x*22);
    $('#pacman').css('top', y*22);
}

function look(direction) {
    var rotation;
    if (direction === "up") {
        lookDirection = "up";
        rotation = 270;
    } else if (direction === "down") {
        lookDirection = "down";
        rotation = 90;
    } else if (direction === "left") {
        lookDirection = "left";
        rotation = 180;
    } else {
        lookDirection = "right";
        rotation = 0;
    }
    $('#pacman').css('transform', "rotate(" + rotation + "deg)");
}

function gameLoop() {
    if (checkWon() === false) {
        move(coords.lookDirection)
        setTimeout(gameLoop, 150);
    } else {
        document.getElementById('wrapper').innerHTML = "<h1>You won</h1>";
    }
}

function checkWon() {
    if (totalCoins !== 0) {
        console.log(totalCoins);
        return false;
    } else {
        return true;
    }
}
