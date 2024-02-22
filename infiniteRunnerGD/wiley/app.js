import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";


// Initialize Game

kaboom();

kaboom({
    maxFPS: 60,
    width: window.innerWidth,
    height: window.innerHeight,
    font: "sans-serif",
    canvas: document.querySelector("#mycanvas"),
    background: [125, 250, 250],
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
loadSprite("player", "sprites/player.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
      run: { from: 0, to: 1, to: 2, to: 3},
    },
  });

loadSprite("fish", "sprites/fish.png", {
    sliceX: 2,
    sliceY: 1,
    anims: {
        left: { from: 0, to: 1}
    }
});

loadSprite("cancer", "sprites/cancer.png", {
    sliceX: 3,
    sliceY: 1,
    anims: {
        left: { from: 0, to: 1, to: 2}
    }
});

loadSprite("poison", "sprites/poison.png", {
    sliceX: 8,
    sliceY: 1,
    anims: {
        left: { from: 0, to: 1, to: 2, to: 3, to: 4, to:5, to:6, to:7}
    }
});

loadSprite("floor", "sprites/floor.png", {
    sliceX: 1,
    sliceY: 1,
    anims: {
        idle: { from: 0, to: 0}
    }
});

// Player Object
const player = add([
    sprite("player", {
        animSpeed: .6,
      }),
    
    pos(100, 100),
    area(),
    body({ isStatic: false }),
    z(4),
    scale(2),
"player",
    {
        dead: false,
    },
])
setInterval(() => {
    player.play("run");
  }, 600);

// movement
onKeyPress("up", () => {
    if (player.isGrounded() && player.dead === false) {
    player.jump(JUMP_FORCE, 0)
    }
})

// Floor

const baseFLoor = add([
    sprite("floor"),
    pos(0, window.innerHeight*.77),
    area(),
    z(-5),
    scale(.75),
    body({ isStatic: true }),
    "floor"
])

const baseFLoor2 = add([
    sprite("floor"),
    pos(810, window.innerHeight*.77),
    area(),
    z(0),
    scale(.75),
    body({ isStatic: true }),
    "floor"
])

const baseFLoor3 = add([
    sprite("floor"),
    pos(1600, window.innerHeight*.77),
    area(),
    z(0),
    scale(.75),
    body({ isStatic: true }),
    "floor"
])
const baseFLoor4 = add([
    sprite("floor"),
    pos(2400, window.innerHeight*.77),
    area(),
    z(0),
    scale(.75),
    body({ isStatic: true }),
    "floor"
])

const baseFLoor5 = add([
    sprite("floor"),
    pos(3200, window.innerHeight*.77),
    area(),
    z(0),
    scale(.75),
    body({ isStatic: true }),
    "floor"
])


    setInterval(function () {
        const floor = add([
            sprite("floor"),
            pos(window.innerWidth, window.innerHeight*.77),
            area(),
            z(0),
            scale(.75),
            "floor",
            body({ isStatic: true })
        ])
    
        setInterval(function () {
            floor.play("idle");
        }, 1000)
    }, 1000);

    const shadowFloor = add([
        rect(100,100),
        color( 0, 0, 0, 0 ),
        pos(100, window.innerHeight*.77),
        area(),
        body({ isStatic: true}),
        z(-9)
    ])


onUpdate("floor", (floor) => {
    if (moveObstacles === true)
    floor.move(-MOVE_SPEED, 0)
})

// obstacles
setInterval(function () {
    const fish = add([
        sprite("fish", {
            animSpeed: .5,
            frame: 0
        }),
        pos(window.innerWidth, window.innerHeight*.70),
        area(),
        body({ isStatic: false }),
        offscreen({ destroy: true }),
        scale(1.5),
        "obstacle"
    ]);

    setInterval(function () {
        fish.play("left");
    }, 1000)
}, 4000);

setInterval(function () {
    const cancer = add([
        sprite("cancer", {
            animSpeed: 1,
            frame: 0
        }),
        pos(window.innerWidth, window.innerHeight*.70),
        area(),
        body({ isStatic: false }),
        offscreen({ destroy: true }),
        scale(1.5),
        "obstacle"
    ]);

    setInterval(function () {
        cancer.play("left");
    }, 750)
}, 2000);

setInterval(function () {
    const poison = add([
        sprite("poison", {
            animSpeed: .5,
            frame: 0
        }),
        pos(window.innerWidth, window.innerHeight*.70),
        area(),
        body({ isStatic: false }),
        offscreen({ destroy: true }),
        scale(1.5),
        "obstacle"
    ]);

    setInterval(function () {
        poison.play("left");
    }, 1000)
}, 3000);


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
    window.clearInterval()
    onKeyPress("space", () => location.reload());
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

go("game");
