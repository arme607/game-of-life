var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

weather = "summer";

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
matrix = [];
function generator(matLen, gr, grEat, pr, c, toxic, water,stone) {


    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < c; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < toxic; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    for (let i = 0; i < water; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 6;
        }
    }

    for (let i = 0; i < stone; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 7;
        }
    }

    io.sockets.emit('send matrix', matrix)
    return matrix;
}

//___________________________
grassArr = [];
grassEaterArr = [];
predatorArr = [];
coinArr = [];
toxicArr = [];
waterArr = [];//___________________________________
stoneArr = [];


Grass = require("./Grass")
GrassEater = require("./GrassEater");
Coin = require("./Coin");
LivingCreature = require("./LivingCreature");
Coin = require("./Coin");
Predator = require("./Predator");
Toxic = require("./Toxic");
Water = require("./Water");
Stone = require("./Stone")



side = 40;

function createObject(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {

            if (matrix[i][j] == 1) {
                var gr = new Grass(j, i);
                grassArr.push(gr);

            }

            if (matrix[i][j] == 2) {
                var grEr = new GrassEater(j, i);
                grassEaterArr.push(grEr);

            }

            if (matrix[i][j] == 3) {
                var predator = new Predator(j, i);
                predatorArr.push(predator);

            }
            if (matrix[i][j] == 4) {
                var c = new Coin(j, i);
                coinArr.push(c);

            }
            if (matrix[i][j] == 5) {
                var toxic = new Toxic(j, i);
                toxicArr.push(toxic);
            }
            if (matrix[i][j] == 6) {
                var w = new Water(j, i);
                waterArr.push(w);
            }

            if (matrix[i][j] == 7) {
                var st = new Stone(j, i);
                stoneArr.push(st);
            }

        }

    }





    io.sockets.emit('send matrix', matrix)


}

matrix = generator(20, 40, 20, 5, 10, 10, 10,10);


function game() {

    for (var i in grassArr) {
        grassArr[i].mul();
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].mul();
        grassEaterArr[i].eat();
    }


    for (var i in predatorArr) {
        predatorArr[i].eat();
    }

    for (var i in waterArr) {
        waterArr[i].mul();
    }
    io.sockets.emit("send matrix", matrix);

    io.sockets.emit('send arr', grassEaterArr);


}
setInterval(game, 1000);


io.on('connection', function (socket) {
    createObject(matrix)

    socket.on("send addGrass",addGrass)
    socket.on("send addGrassEater",addGrassEater)
    socket.on("send killAll",killAll)

})


var statistics = {
};

setInterval(function(){
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.Predator = predatorArr.length;
    statistics.Toxic = toxicArr.length;
    statistics.Water = waterArr.length;
    statistics.Coin = coinArr.length;
    statistics.Stone = stoneArr.length;

    fs.writeFileSync("statistics.json",JSON.stringify(statistics))
},1000)

weather = "summer";
function chWeather() {
    if (weather == "summer"){
        weather = "autumn"
    }else if (weather == "autumn"){
        weather = "winter"
    }else if (weather == "winter"){
        weather = "spring"
    }
    if (weather == "spring"){
        weather = "summer"
    }
    console.log(weather)

    io.sockets.emit("send weather", weather);
}

// io.sockets.emit('send chWeather()', chWeather)


setInterval(chWeather, 4000);


// socket.on('send addGrass', addGrass())


function addGrass(){
    
        let x = Math.floor(Math.random() * 20);
        let y = Math.floor(Math.random() * 20);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }


    
    console.log("adding grass")
}

function addGrassEater(){
    
    let x = Math.floor(Math.random() * 20);
    let y = Math.floor(Math.random() * 20);
    if (matrix[x][y] == 0) {
        matrix[x][y] = 2;
    }



console.log("adding grassEater")
}


function killAll(){

    grassArr=[];
    grassEaterArr = [];
    PredatorArr = [];
    waterArr = [];
    
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[j][i]=0;
            
        }
    }

    io.sockets.emit("send matrix",matrix)
}

