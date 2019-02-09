const canvasElem = document.getElementById('stage');
const ctx = canvasElem.getContext('2d');

canvasElem.width = innerWidth*0.8;
canvasElem.height = canvasElem.width/2;


const meteorMove = meteorsGame => {
    meteorsGame.forEach(meteorGame => {
        meteorGame.move(collisionObjects)
    })
};

class space {
    constructor(width, height, color, positionX, positionY) {
        this.width = width;
        this.height = height;
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

const drawObject = (collisionObjects, context) => {
    collisionObjects.forEach(collisionObject => {
        context.fillStyle = collisionObject.color;
        context.fillRect(collisionObject.positionX, collisionObject.positionY, collisionObject.width, collisionObject.height)
    });
}

const collisionObjects = [];
const meteorsGame = [];

const playerspace = new space(30, 20, "pink", 50, 50);
const Meteor1 = new Meteor(20, canvasElem.height*0.5, "black", 110, 50);
const Meteor11 = new Meteor(20, canvasElem.height*0.5, "black", 110, 50-canvasElem.height);

collisionObjects.push(playerspace, Meteor1, Meteor11);
meteorsGame.push(Meteor1,Meteor11);

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


let points = 0;
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
            alert("Collision!!")
            that.positionX = 50;
            that.positionY = 50;
        } 
    }
    if (spaceRight==canvasElem.width){
        console.log("Winner!!")
        that.positionX = 50;
        that.positionY = 50;
        points=points+1;
        console.log(points)
    }
}

function moveObj(meteorsGame) {
    for (let i = 0; i < meteorsGame.length; i++) {
        let addMove = 4;
        meteorsGame[i].positionY = meteorsGame[i].positionY + addMove;
        if(meteorsGame[i].positionY>canvasElem.height){
            meteorsGame[i].positionY=-canvasElem.height}
    }
}


const run = () => {
    ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
    drawObject(collisionObjects, ctx);
    checkCollision(meteorsGame);
    moveObj(meteorsGame)
}

function timer (){
let timer = setInterval(run, 1000 / 60);
}

timer()