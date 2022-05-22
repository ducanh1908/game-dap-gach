let canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;

let c = canvas.getContext('2d');
let ball= {
 x :20,
 y : 20,
 dx :3,
 dy :5,
radius : 10
}

var paddle = {
    width:100,
    height: 20,
    x : 0,
    y : canvas.height -10,
    speed : 15,
    isMovingLeft: false,
    isMovingRight: false

}
let BrickConfig = {
    offsetX: 25,
    offsetY: 25,
    margin: 25,
    width: 70,
    height: 15,
    totalRow: 5,
    totalCol: 8
}
var  gameOver = false;
var isGameWin = false;
var userScore = 0;
var maxScore = BrickConfig.totalCol* BrickConfig.totalRow;
// xử lý sự kiện thanh chắn
document.addEventListener('keyup',function(event) {
    if(event.keyCode == 37) {
        paddle.isMovingLeft = false;
    }
    else if(event.keyCode == 39){
        paddle.isMovingRight = false;
    }
})
document.addEventListener('keydown',function(event) {
    if(event.keyCode == 37) {
        paddle.isMovingLeft = true;
    }
    else if(event.keyCode == 39){
        paddle.isMovingRight = true
    }
})

function drawBall(){
    c.beginPath();
    c.arc(ball.x,ball.y,ball.radius, 0,Math.PI*2);
    c.fillStyle = "red";
    c.fill();
    c.closePath();
}
function drawPaddle() {
   c.beginPath();
   c.rect(paddle.x, paddle.y, paddle.width, paddle.height);
   c.fillStyle = 'blue'
   c.fill();
   c.closePath();
}
//xây dựng gạch

let brickList = [];
for(let i = 0; i < BrickConfig.totalRow; i++) {
    for(let j = 0; j < BrickConfig.totalCol; j++){
        brickList.push({
            x: BrickConfig.offsetX+j*(BrickConfig.width + BrickConfig.margin),         
            y: BrickConfig.offsetY+i*(BrickConfig.height + BrickConfig.margin),
            isBrock: false
        });
    }
}
function drawBricks() {
    brickList.forEach(function(b) {
        if(!b.isBrock) {
            c.beginPath();
            c.rect(b.x, b.y, BrickConfig.width, BrickConfig.height);
            c.fill();
            c.closePath();

        }
    });
}


function handlePaddle(){
    // xử lý chuyển động của thanh chắn
    if(paddle.isMovingLeft) {
        paddle.x -= paddle.speed
    }
    else if(paddle.isMovingRight){
        paddle.x += paddle.speed
    }
    // xử lý va chạm
    if(paddle.x < 0) {
        paddle.x = 0;
    }
    else if(paddle.x > canvas.width - paddle.width) {
        paddle.x = canvas.width - paddle.width;
    }
}

function handleBall() {
// xử lý va chạm
    if(ball.x < ball.radius || ball.x >canvas.width -ball.radius) {
        ball.dx = -ball.dx;
    } 
    if(ball.y < ball.radius) {
        ball.dy =-ball.dy;
    }
}

function handleCollidePaddle() {
    if(ball.x + ball.radius >= paddle.x && ball.x + ball.radius <= paddle.x + paddle.width &&
        ball.y + ball.radius >=canvas.height - paddle.height) {
            ball.dy = -ball.dy;
        }
}

//xử lý va chạm bóng và viên gạch
function handleBallBricks() {
    brickList.forEach(function(b) {
        if(!b.isBrock) {
            if(ball.x >= b.x && ball.x<= b.x + BrickConfig.width && 
                ball.y + ball.radius >= b.y && ball.y -ball.radius <= b.y + BrickConfig.height){
                ball.dy = -ball.dy;
                b.isBrock = true;
                userScore +=1;
                if(userScore > maxScore) {
                    isGameWin = true;
                    gameOver = true;
                }
            }
        }
    });
}
// Cập nhật lại vị trí
function updatePosition() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}
function checkGameOver(){
    if ( ball.y > canvas.height -ball.radius)
    {
        gameOver = true;
    }
}
function handleGameOver() {
    if(isGameWin) {
        alert(" Winnnnnnn")

    }
    else {
        alert("Game OOO VERRR")

    }
}
function draw() {
    if (!gameOver) {
        // xóa phần khung đi sau mỗi lần vẽ
        c.clearRect(0,0,canvas.width, canvas.height);
        drawBall();
        drawPaddle(); 
        drawBricks();       
        handleBall();
        handlePaddle();
        handleCollidePaddle();
        handleBallBricks();
        updatePosition();
        checkGameOver()
        requestAnimationFrame(draw,200)
    }
    else {
        handleGameOver();
    }
    
}
draw();
