const dirs = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 }
];

const SCREEN_WIDTH = 30
const SCREEN_HEIGHT = 17
const BLOCK_SIZE = 8

const state = {
    snake: [
        { x: 15, y: 8 },
        { x: 14, y: 8 },
        { x: 13, y: 8 }
    ]
    ,
    t: 0,
    score: 0,
    food: { x: 0, y: 0 },
    dir: dirs[0],
}


function pointsEqual(p, q) {
    return p.x === q.x && p.y === q.y
}

function draw({ snake, food }) {
    cls(1);
    snake.forEach(v => rect(v.x * BLOCK_SIZE, v.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, 15))
    // snake.forEach(v => circ(v.x * BLOCK_SIZE + BLOCK_SIZE / 2, v.y * BLOCK_SIZE + BLOCK_SIZE / 2, BLOCK_SIZE / 2, 15))
    rect(food.x * BLOCK_SIZE, food.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, 6)
    // circ(food.x * BLOCK_SIZE + BLOCK_SIZE / 2, food.y * BLOCK_SIZE + BLOCK_SIZE / 2, BLOCK_SIZE / 2, 6)
}

function update({ t }, onUpdate) {
    if (t % 5 == 0) {
        onUpdate()
    }
}

function getDir(lastDir) {
    for (let i = 0; i < 4; i++) {
        if (btn(i)) {
            return dirs[i]
        }
    }
    return lastDir
}


function gotFood({ head, food }) {
    return pointsEqual(head, food)
}

function setFood({ food, snake }) {
    food.x = Math.ceil(Math.random() * SCREEN_WIDTH - 1)
    food.y = Math.ceil(Math.random() * SCREEN_HEIGHT - 1)

    if (snake.filter(v => pointsEqual(v, food)).length) {
        setFood({ food, snake })
    }

}
function isDead({ snake, head }, onDead) {
    for (var i = 0; i < snake.length - 1; i++) {
        var v = snake[i];
        if (pointsEqual(head, v)) {
            return onDead();
        }
    }
}



////////////////////////////////////////////////////////////////////////

setFood(state)
function TIC() {
    state.t += 1
    state.tail = state.snake[0];
    state.neck = state.snake[state.snake.length - 2];
    state.head = state.snake[state.snake.length - 1];

    update(state, () => {

        isDead(state, () => {
            trace("Game OVER!");
            trace("Score: " + state.score);
            exit();
        });

        state.snake.push({
            x: (state.head.x + state.dir.x) % SCREEN_WIDTH,
            y: (state.head.y + state.dir.y) % SCREEN_HEIGHT
        });

        state.snake.forEach(v => {
            v.x = v.x >= 0 ? v.x : SCREEN_WIDTH
            v.y = v.y >= 0 ? v.y : SCREEN_HEIGHT
        })


        if (!gotFood(state)) {
            state.snake.shift()
        } else {
            setFood(state)
            state.score += 1
        }

    })

    const lastDir = state.dir

    state.dir = getDir(lastDir)
    if ((state.head.x + state.dir.x) === state.neck.x && (state.head.y + state.dir.y) === state.neck.y) {
        state.dir = lastDir
    }

    draw(state)

}


