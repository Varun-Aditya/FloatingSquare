function startGame(){
  //we craete a new canvas square
  myGameArea.start()
  //we also create a new component, a floating square
  myGamePiece = new component(10, 10, "red", 10, 120);
  //we also create a green obstacle component
  myObstacle  = new component(10, 200, "orange", 300, 120);

  myScore = new component("30px", "Consolas", "black", 280, 40, "text");
}

var myGamePiece , myObstacle , myScore;
var myObstacles = [];//the array that we use to store the obstacoles objects
//====================================================================================================
//====================================================================================================
//====================================================================================================
var myGameArea = {
//======================  HERE WE CREATE THE CANVAS RECTANGLE ========================================
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width  = 1380;
    this.canvas.height = 870;
    this.context = this.canvas.getContext("2d");
//====================================================================================================

//======================  HERE WE INSERT THE CANVAS IN THE DOM =======================================
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//====================================================================================================
    this.frameNo = 0;

//======================  HERE WE UPDATE THE CANVAS 50 TIMES FOR SECOND ==============================
    this.interval = setInterval(updateGameArea, 20);
//====================================================================================================

//======================  HERE WE ASSIGN A KEY TO A MOVEMENT =========================================
    window.addEventListener('keydown', function (e) {
      myGameArea.key = e.keyCode;
    })
    window.addEventListener('keyup', function (e) {
      myGameArea.key = false;
    })
//====================================================================================================
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
    clearInterval(this.interval);
  }
}
//====================================================================================================
//====================================================================================================
//====================================================================================================
function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}
//====================================================================================================
//====================================================================================================
//====================================================================================================
function component(width, height, color, x, y, type) {
//======================  HERE WE CREATE A NEW COMPONENT =============================================
  this.type = type;
  this.width  = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
//====================================================================================================
  this.update = function() {
    ctx = myGameArea.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    // ctx.fillStyle = color;
    // ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  this.crashWith = function(otherobj) {
    //console.log(this.x,this.y)
//======================  HERE WE ASSIGN THE SQUARE POSITION TO VARIABLES ============================
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
//====================================================================================================
//======================  HERE WE ASSIGN THE OBSTACLE POSITION TO VARIABLES ==========================
    var otherleft   = otherobj.x;
    var otherright  = otherobj.x + (otherobj.width);
    var othertop    = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
//====================================================================================================
    var crash = true;
//======================  HERE WE CHECK IF THE SQUARE TOUCH THE OBSTACLES ============================
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    //console.log(crash)
    return crash;
  }
//====================================================================================================
}
//====================================================================================================
//====================================================================================================
//====================================================================================================
function updateGameArea() {
  var x, height, gap, minHeight, maxHeight, minGap, maxGap;
  for (i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      myGameArea.stop();
      return;
    }
  }
  myGameArea.clear();
  myGameArea.frameNo += 1;
  if (myGameArea.frameNo == 1 || everyinterval(150)) {
    x = myGameArea.canvas.width;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
    minGap = 50;
    maxGap = 200;
    gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
    myObstacles.push(new component(10, height, "green", x, 0));
    myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].speedX = -1;
    myObstacles[i].newPos();
    myObstacles[i].update();
  }
  myScore.text = "SCORE: " + myGameArea.frameNo;
  myScore.update();
  myGamePiece.newPos();
  myGamePiece.update();
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; }
}
