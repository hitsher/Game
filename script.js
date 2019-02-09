const canvasElem = document.getElementById('stage');
const ctx = canvasElem.getContext('2d');
let points = 0;
let addMove = 1;

canvasElem.width = innerWidth * 0.8;
canvasElem.height = canvasElem.width / 2;

class space {
    constructor(color, positionX, positionY) {
        this.width = canvasElem.width*0.06;
        this.height = this.width/2;
        this.color = color;
        this.positionX = positionX;
        this.positionY = positionY;
    }
};

class Meteor {
    constructor(width, height, color, positionX, positionY) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.positionX = positionX;
        this.positionY = positionY;
    }
};

function drawObjects(objectsToDraw, context) {
    for (let i = 0; i < objectsToDraw.length; i++) {
        context.fillStyle = objectsToDraw[i].color;
        context.fillRect(objectsToDraw[i].positionX, objectsToDraw[i].positionY, objectsToDraw[i].width, objectsToDraw[i].height)
    };
}

const objectsToDraw = [];
const meteorsGame = [];

const playerspace = new space("pink", 0, 50);
const Meteor1 = new Meteor(20, canvasElem.height * 0.6, "black", canvasElem.width * 0.2 + 30, 50 - canvasElem.height);
const Meteor2 = new Meteor(20, canvasElem.height * 0.5, "black", canvasElem.width * 0.2 + 30, 50);

const Meteor3 = new Meteor(20, canvasElem.height * 0.7, "black", canvasElem.width * 0.4 + 30, 150 - canvasElem.height);
const Meteor4 = new Meteor(20, canvasElem.height * 0.5, "black", canvasElem.width * 0.4 + 30, 150);

const Meteor5 = new Meteor(20, canvasElem.height * 0.5, "black", canvasElem.width * 0.6 + 30, 100 - canvasElem.height);
const Meteor6 = new Meteor(20, canvasElem.height * 0.8, "black", canvasElem.width * 0.6 + 30, 100);

const Meteor7 = new Meteor(20, canvasElem.height * 0.7, "black", canvasElem.width * 0.8 + 30, 200 - canvasElem.height);
const Meteor8 = new Meteor(20, canvasElem.height * 0.5, "black", canvasElem.width * 0.8 + 30, 200);


objectsToDraw.push(playerspace, Meteor1, Meteor2, Meteor3, Meteor4, Meteor5, Meteor6, Meteor7, Meteor8);
meteorsGame.push(Meteor1, Meteor2, Meteor3, Meteor4, Meteor5, Meteor6, Meteor7, Meteor8);

let up = false;
let right = false;
let down = false;
let left = false;
let x = playerspace.positionX;
let y = playerspace.positionY;
let that = playerspace;

document.addEventListener('keydown', function (e) {
    if (e.keyCode === 38) {
        up = true
    }
    if (e.keyCode === 39) {
        right = true
    }
    if (e.keyCode === 40) {
        down = true
    }
    if (e.keyCode === 37) {
        left = true
    }
    if (up === true) {
        that.positionY = that.positionY - 10;
        if (that.positionY < 0) {
            that.positionY = 0;
        } else {}
    }
    if (right === true) {
        that.positionX = that.positionX + 10;
        if (that.positionX > canvasElem.width - playerspace.width) {
            that.positionX = canvasElem.width - playerspace.width;
        } else {}
    }
    if (down === true) {
        that.positionY = that.positionY + 10;
        if (that.positionY > canvasElem.height - playerspace.height) {
            that.positionY = canvasElem.height - playerspace.height;
        } else {}
    }
    if (left === true) {
        that.positionX = that.positionX - 10;
        if (that.positionX < 0) {
            that.positionX = 0;
        } else {}
    }
});

document.addEventListener('keyup', function (e) {
    if (e.keyCode === 38) {
        up = false
    }
    if (e.keyCode === 39) {
        right = false
    }
    if (e.keyCode === 40) {
        down = false
    }
    if (e.keyCode === 37) {
        left = false
    }
});

function checkCollision(meteorsGame) {
    const spaceLeft = that.positionX;
    const spaceRight = that.positionX + that.width;
    const spaceBottom = that.positionY + that.height;
    const spaceTop = that.positionY;

    for (let i = 0; i < meteorsGame.length; i++) {
        let objectRight = meteorsGame[i].positionX + meteorsGame[i].width;
        let objectLeft = meteorsGame[i].positionX;
        let objectTop = meteorsGame[i].positionY;
        let objectBottom = meteorsGame[i].positionY + meteorsGame[i].height;
        if ((spaceRight > objectLeft) && (spaceTop < objectBottom) && (spaceBottom > objectTop) && (spaceLeft < objectRight)) {
            that.positionX = 0;
            that.positionY = 50;
            left = false;
            right = false;
            up = false;
            down = false;
            addMove = 1;
        }
    }
    if (spaceRight == canvasElem.width) {
        that.positionX = 0;
        that.positionY = 50;
        points = points + 1;
        left = false;
        right = false;
        up = false;
        down = false;
        addMove = addMove + 1;
    }
}

function moveObj(meteorsGame) {
    for (let i = 0; i < meteorsGame.length; i++) {
        meteorsGame[i].positionY = meteorsGame[i].positionY + addMove;
        if (meteorsGame[i].positionY > canvasElem.height) {
            meteorsGame[i].positionY = -canvasElem.height
        }
    }
}

const run = () => {
    ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
    drawObjects(objectsToDraw, ctx);
    moveObj(meteorsGame);
    checkCollision(meteorsGame);

}

function timer() {
    let timer = setInterval(run, 1000 / 60);
}

timer()