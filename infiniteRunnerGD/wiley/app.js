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

// background

loadSprite("background", "sprites/background.png")

const background = add([
    sprite("background"),
    pos(0,0),
    scale(4)
])

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

loadSprite("flooranim", "sprites/floorsheet.png", {
    sliceX: 9.25,
    sliceY: 2,
    anims: {
        left: { from: 0, to: 1, to: 2, to: 3, to: 4, to: 5, to: 6, to: 7, to: 8, to: 9, to: 10, to: 11, to: 12, to: 13, to: 14, to: 15, to: 16, to: 17, to: 18, to: 19, to: 20, to: 21, to: 22, to: 23, to: 24, to: 25, to: 26, to: 27, to: 28, to: 29, to: 30, to: 31, to: 32},
        playerDead: { from: 0, to: 0}
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

    const floor = add([
        sprite('flooranim', {
            animSpeed: .75,
            frame: 0
        }),
        pos(0, window.innerHeight*.70),
        area(),
        body({ isStatic: true }),
        scale(10),
        z(1),
        "floor"
    ])

    setInterval(function () {
        floor.play("left");
    }, 1000)



    const shadowFloor = add([
        rect(100,100),
        color( 0, 0, 0, 0 ),
        pos(100, window.innerHeight*.77),
        area(),
        body({ isStatic: true}),
        z(-9)
    ])

// obstacles
setInterval(function () {
    const fish = add([
        sprite("fish", {
            animSpeed: .5,
            frame: 0
        }),
        pos(window.innerWidth, window.innerHeight*.5),
        area(),
        body({ isStatic: false }),
        offscreen({ destroy: true }),
        scale(1.5),
        z(1),
        "obstacle"
    ]);

    setInterval(function () {
        fish.play("left");
    }, 1000)
}, 5000);

setInterval(function () {
    const cancer = add([
        sprite("cancer", {
            animSpeed: 1,
            frame: 0
        }),
        pos(window.innerWidth, window.innerHeight*.50),
        area(),
        body({ isStatic: false }),
        offscreen({ destroy: true }),
        scale(1.5),
        z(1),
        "obstacle"
    ]);

    setInterval(function () {
        cancer.play("left");
    }, 750)
}, 1750);

setInterval(function () {
    const poison = add([
        sprite("poison", {
            animSpeed: .5,
            frame: 0
        }),
        pos(window.innerWidth, window.innerHeight*.50),
        area(),
        body({ isStatic: false }),
        offscreen({ destroy: true }),
        scale(1.5),
        z(1),
        "obstacle"
    ]);

    setInterval(function () {
        poison.play("left");
    }, 1000)
}, 3500);


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
