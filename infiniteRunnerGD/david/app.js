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


if (!localStorage.pastHighScore) {
    localStorage.setItem("pastHighScore", 0)
}

scene("game", () => {
setGravity(2000);
var MOVE_SPEED = 500;
const JUMP_FORCE = 900;

var moveObstacles = true;

// localStorage

// Load Sprites
loadSprite("player", "sprites/player.png");
loadSprite("spike", "sprites/spike.png");

// Player Object
const player = add([
    rect(50, 50),
    color(0,0,0),
    pos(100, 100),
    area(),
    body(),
    z(2),
    scale(2),
"player",
    {
        dead: false,
    },
])

// movement
onKeyPress("up", () => {
    if (player.isGrounded() && player.dead === false) {
    player.jump(JUMP_FORCE, 0)
    }
})

// Floor
const floor = add([
    rect(window.innerWidth, 300),
    color(100,100,100),
    pos(0, window.innerHeight*.77),
    area(),
    z(0),
    scale(2),
    "floor",
    body({ isStatic: true })
])

// obstacles
function spawnObstacles() {
    if (moveObstacles === true) {
        add([
            rect(45, 45),
            color(255, 255, 255),
            pos(window.innerWidth, window.innerHeight*.70),
            area(),
            body({ isStatic: false }),
            offscreen({ destroy: true }),
            scale(1.5),
            "obstacle"
        ]);
    }
    
        wait(rand(.75, 1.75), spawnObstacles);
}

spawnObstacles();


onUpdate("obstacle", (obstacle) => {
    if (moveObstacles === true)
    obstacle.move(-MOVE_SPEED, 0)
})


player.onCollide("obstacle", () => {
    MOVE_SPEED = 0; 
    player.dead = true;
    shake(2)
    add([
        text("Press space to restart"),
        pos(window.innerWidth*.40, window.innerHeight*.40),
    ])
    onKeyPress("space", () => go("game"));

});

let score = 0;
let pastHighScore = localStorage.getItem("pastHighScore");

const scoreLabel = add([
    text(score),
    pos(24, 24)
]);

const pastHighScoreLabel = add([
    text(pastHighScore),
    pos(24, 100)
]);

onUpdate(() => {
    if (player.dead === false) {
        score++;
    } else if (score > pastHighScore) {
        localStorage.setItem("pastHighScore", score)
    }
    scoreLabel.text = "Score: " + score;
    pastHighScoreLabel.text = "Past high score: " + pastHighScore;
});

});

// game over
scene("lose", () => {

});

go("game");
