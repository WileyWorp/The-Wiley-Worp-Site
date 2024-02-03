import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";


// Initialize Game

kaboom();

kaboom({
    maxFPS: 60,
    width: window.innerWidth,
    height: window.innerHeight,
    font: "sans-serif",
    canvas: document.querySelector("#mycanvas"),
    background: [200,200,200],
})

scene("game", () => {
setGravity(500);

var moveObstacles = false;

setTimeout(function () {
    moveObstacles = true;
}, 2000)

const MOVE_SPEED = 250;
const JUMP_FORCE = 275;

// Load Sprites
loadSprite("player", "sprites/player.png");
loadSprite("spike", "sprites/spike.png");

// Player Object
const player = add([
    rect(40, 40),
    color(0,0,0),
    pos(100, 100),
    area(),
    body(),
    z(2),
"player",
    {
        dead: false,
        speed: 100,
    },
])

// movement
onKeyPress("up", () => {
    if (player.isGrounded()) {
    player.jump(JUMP_FORCE, 0)
    }
})

// Floor
const floor = add([
    rect(1280, 300),
    color(100,100,100),
    pos(0, 420),
    area(),
    z(0),
    "floor",
    body({ isStatic: true })
])

player.onCollide("floor", () => {
    console.log("Collided!")
})

// obstacles
function spawnObstacles() {
    add([
        rect(45, 50),
        color(255, 255, 255),
        pos(1000, 370),
        area(),
        body({ isStatic: true }),
        offscreen({ destroy: true }),
        "obstacle"
    ]);

    wait(rand(1.5, 2), spawnObstacles);
}

spawnObstacles();


onUpdate("obstacle", (obstacle) => {
    if (moveObstacles === true)
    obstacle.move(-MOVE_SPEED, 0)
})


player.onCollide("obstacle", () => {
    addKaboom(player.pos);
    shake();
    setTimeout(function () {
        go("lose")
    }, 1000)
});

});

// game over
scene("lose", () => {
    add([
        text("Game Over"),
        text("Press space to restart"),
        pos(center()),
        anchor("center"),
    ])
    onKeyPress("space", () => go("game"));
});

go("game");