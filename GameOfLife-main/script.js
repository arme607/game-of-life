var socket = io();
let side = 40;

function setup() {
    frameRate(5);
    createCanvas(20 * 40, 20 * 40);
    background('#acacac');



}

weather = "summer";

socket.on('send weather', function (data) {
    weather = data;
}
)


// socket.on("send chWeather()")




function nkarel(matrix) {
    // console.log(weather)
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {


            if (matrix[y][x] == 1) {
                if (weather == "summer") {
                    fill("#00ff53");
                }
                if (weather == "autumn") {
                    fill(" #b6f013");
                }
                if (weather == "winter") {
                    fill("#cdf7fe");
                } if (weather == "spring") {
                    fill("green");
                }
            } 
            else if (matrix[y][x] == 0) {
                    fill("#acacac");
            } else if (matrix[y][x] == 2) {
                    fill('yellow');
            } else if (matrix[y][x] == 3) {
                        fill('red');
            } else if (matrix[y][x] == 6) {
                        fill('blue');
            }else if (matrix[y][x] == 7) {
                fill('black');
            }
           

            rect(x * side, y * side, side, side);


        }
    }
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 4) {
                fill('orange');
                ellipse(x * side + side / 2, y * side + side / 2, side, side);
            }

        }
    }
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 5) {
                fill('purple');
                ellipse(x * side + side / 2, y * side + side / 2, side, side);
            }

        }
    }
   



}



socket.on('send matrix', nkarel)

socket.on('send arr', printt)

function printt(grassEaterArr) {
    console.log(grassEaterArr.length);
}

function addGrass() {
    socket.emit("send addGrass");
}

function addGrassEater() {
    socket.emit("send addGrassEater");
}

function killAll() {
    socket.emit("send killAll");
}