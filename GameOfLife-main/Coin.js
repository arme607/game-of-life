module.exports = class Coin {

    constructor() {

        this.energy = 1000;
        
    }


    findYourPlace() {

        for (var q = 0; q < 6; q++) {
            let x = Math.floor(Math.random() * matrix.length);
            let y = Math.floor(Math.random() * matrix.length);
            matrix[x][y] = 4;

        }
    }



}
