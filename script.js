const canvasElem = document.getElementById('stage');
const ctx = canvasElem.getContext('2d');
const Colors = ["AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "WhiteSmoke", "Yellow", "YellowGreen"];
let objectsToDraw = [];
let meteorsGame = [];
let levels = 0;
let meteors = 1;
let addMove = 0.5;
let effectsPlay = false;

let speedDiv = document.getElementById("speed");
let levelDiv = document.getElementById("level");
let joystickHeadDiv = document.getElementById("joystickHead");
let musicOn = document.getElementById("musicon");
let musicOff = document.getElementById("musicoff");
let effectsOn = document.getElementById("effectson");
let effectsOff = document.getElementById("effectsoff");

const errorSound = new sound("Error.mp3");
const bgSound = new sound("CrazyCountdown.mp3");
const winnerSound = new sound("Winner.mp3");

canvasElem.width = window.innerWidth * 0.5;
canvasElem.height = canvasElem.width / 2;

window.addEventListener("resize", function () {
    canvasElem.width = window.innerWidth * 0.5;
    canvasElem.height = canvasElem.width / 2;
    levels = 0;
    meteors = 1;
    addMove = 0.5;
    addMeteor()
})

class space {
    constructor(color, positionX, positionY) {
        this.width = 40;
        this.height = 30;
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

let playerspace = new space("black", 0, 50);

function addMeteor() {
    if (meteors == 1) {
        addMove = addMove + 0.5;
    }
    objectsToDraw = [];
    meteorsGame = [];
    for (let i = 0; i < meteors; i++) {
        let j = Math.floor(Math.random() * canvasElem.height) - 100;
        let k = Math.floor(Math.random() * 5) + 4;
        let l = Math.floor(Math.random() * Colors.length);
        let l1 = Math.floor(Math.random() * Colors.length);
        let nextMeteor = new Meteor(canvasElem.width * 0.03, canvasElem.height * 0.1 * k, Colors[l], canvasElem.width * 0.15 * (i + 1.5), j);
        let nextMeteor1 = new Meteor(canvasElem.width * 0.03, canvasElem.height * 0.1 * k, Colors[l1], canvasElem.width * 0.15 * (i + 1.5), j - canvasElem.height);
        objectsToDraw.push(playerspace, nextMeteor, nextMeteor1);
        meteorsGame.push(nextMeteor, nextMeteor1);
    }
    meteors = meteors + 1;
    if (meteors == 6) {
        meteors = 1
    }
    speedDiv.innerText = "Speed: " + addMove;
    levelDiv.innerText = "Level: " + levels;
}

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
        that.positionY = that.positionY - 20;
        if (that.positionY < 0) {
            that.positionY = 0;
        } else {}
    }
    if (right === true) {
        that.positionX = that.positionX + 20;
        if (that.positionX > canvasElem.width - playerspace.width) {
            that.positionX = canvasElem.width - playerspace.width;
        } else {}
    }
    if (down === true) {
        that.positionY = that.positionY + 20;
        if (that.positionY > canvasElem.height - playerspace.height) {
            that.positionY = canvasElem.height - playerspace.height;
        } else {}
    }
    if (left === true) {
        that.positionX = that.positionX - 20;
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

let isDown = false;
let pointerPosition;
let offset = [0, 0];
let moveEvent

joystickHeadDiv.addEventListener("pointerdown", function (e) {
    isDown = true;
    offset = [
        joystickHeadDiv.offsetLeft - e.clientX,
        joystickHeadDiv.offsetTop - e.clientY
    ];
}, true);

/*
document.addEventListener("click", function (event) {
    
console.log("document.addEventListener(pointerdown")
moveOb(event)
})
*/
let distance;

document.addEventListener('pointermove', function (e) {
    event.preventDefault();
    moveEvent = e
    if (isDown == true) {
        joystickHeadDiv.style.left = (e.clientX + offset[0]) + 'px';
        joystickHeadDiv.style.top = (e.clientY + offset[1]) + 'px';


        distance = Math.sqrt(
            Math.pow((joystickHeadDiv.offsetLeft - 25), 2) + Math.pow((joystickHeadDiv.offsetTop - 25), 2)
        );
        let angle = Math.atan2((joystickHeadDiv.offsetLeft - 25), (joystickHeadDiv.offsetTop - 25));
        if (distance > 55) {
            joystickHeadDiv.style.left = 25 + (55 * Math.sin(angle)) + "px"
            joystickHeadDiv.style.top = 25 + (55 * Math.cos(angle)) + "px"
        }
        moveOb(moveEvent);
    }
}, true);

function moveOb(moveEvent) {
    let speed = 0;
    if (distance < 10) {
        speed = 1;
    }
    if (distance < 20 && distance > 10) {
        speed = 2;
    }
    if (distance < 30 && distance > 20) {
        speed = 3;
    }
    if (distance < 40 && distance > 30) {
        speed = 4;
    }
    if (distance > 40) {
        speed = 5;
    }
    
    if (moveEvent.clientY + offset[1] < 20) {
        that.positionY = that.positionY - speed;
        if (that.positionY < 0) {
            that.positionY = 0;
        } else {}
    }
    if (moveEvent.clientX + offset[0] > 30) {
        that.positionX = that.positionX + speed;
        if (that.positionX > canvasElem.width - playerspace.width) {
            that.positionX = canvasElem.width - playerspace.width;
        } else {}
    }
    if (moveEvent.clientY + offset[1] > 30) {
        that.positionY = that.positionY + speed;
        if (that.positionY > canvasElem.height - playerspace.height) {
            that.positionY = canvasElem.height - playerspace.height;
        } else {}
    }
    if (moveEvent.clientX + offset[0] < 20) {
        that.positionX = that.positionX - speed;
        if (that.positionX < 0) {
            that.positionX = 0;
        } else {}
    }
}

document.addEventListener('pointerup', function () {
    isDown = false;
    joystickHeadDiv.style.left = 25 + 'px';
    joystickHeadDiv.style.top = 25 + 'px';
}, true);

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

            if (effectsPlay) {
                errorSound.play()
            };
            that.positionX = 0;
            that.positionY = 50;
            left = false;
            right = false;
            up = false;
            down = false;
            meteors = 1;
            addMove = 0.5;
            levels = 0;

            addMeteor();
        }
    }
    if (spaceRight == canvasElem.width) {
        if (effectsPlay) {
            winnerSound.play()
        };
        that.positionX = 0;
        that.positionY = 50;
        levels = levels + 1;
        left = false;
        right = false;
        up = false;
        down = false;
        addMeteor();
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

musicOn.addEventListener('pointerdown', function () {
    musicOff.style.display = 'block';
    musicOn.style.display = 'none';
    bgSound.play();
}, false);

musicOff.addEventListener('pointerdown', function () {
    musicOn.style.display = 'block';
    musicOff.style.display = 'none';
    bgSound.stop();
}, false);

effectsOn.addEventListener('pointerdown', function () {
    effectsOff.style.display = 'block';
    effectsOn.style.display = 'none';
    effectsPlay = true;
}, false);

effectsOff.addEventListener('pointerdown', function () {
    effectsOn.style.display = 'block';
    effectsOff.style.display = 'none';
    effectsPlay = false;
}, false);

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

const run = () => {
    ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
    drawObjects(objectsToDraw, ctx);
    moveObj(meteorsGame);
    checkCollision(meteorsGame);

}

function timer() {
    setInterval(run, 1000 / 60);
}
addMeteor()
timer()