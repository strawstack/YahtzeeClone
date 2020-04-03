let app;
function main() {

    // Helper functions
    let calculate = (dice, value) => {
        let score = 0;
        for (let d of dice) {
            if (d == value) {
                score += value;
            }
        }
        return score;
    };

    let fz = dice => {
        let f = {};
        for (let d of dice) {
            if (!(d in f)) f[d] = 0;
            f[d] += 1;
        }
        return f;
    };

    let sum = dice => {
        let sum = 0;
        for (let d of dice) {
            sum += d;
        }
        return sum;
    };

    app = new Vue({
        el: '#app',
        data: {
            turn: true,
            dice: [1, 2, 3, 4, 5]
        },
        methods: {
            flipTurn: function (event) {
                this.turn = !this.turn;
            },
            rollDice: function (event) {
                let newList = [];
                for (let i = 0; i < this.dice.length; i++) {
                    newList.push(Math.floor(Math.random() * 6) + 1);
                }
                this.dice = newList;
            }
        },
        computed: {
            one: function () {
                return calculate(this.dice, 1);
            },
            two: function () {
                return calculate(this.dice, 2);
            },
            three: function () {
                return calculate(this.dice, 3);
            },
            four: function () {
                return calculate(this.dice, 4);
            },
            five: function () {
                return calculate(this.dice, 5);
            },
            six: function () {
                return calculate(this.dice, 6);
            },
            pair3: function () {
                let f = fz(this.dice);
                for (let k in f) {
                    let value = f[k];
                    if (value == 3) {
                        return k * 3 + (sum(this.dice) - k * 3);
                    }
                }
                return 0;
            },
            pair4: function () {
                let f = fz(this.dice);
                for (let k in f) {
                    let value = f[k];
                    if (value == 4) {
                        return k * 4 + (sum(this.dice) - k * 4);
                    }
                }
                return 0;
            },
            fullHouse: function () {
                let f = fz(this.dice);
                let keys = Object.keys(f);
                let a = keys.length == 2;
                let b = f[keys[0]] == 3 || f[keys[0]] == 2;
                let c = f[keys[1]] == 3 || f[keys[1]] == 2;
                if (a && b && c) {
                    return 25;
                } else {
                    return 0;
                }
            },
            small: function () {
                let sortDice = this.dice.sort((a,b) => a - b);
                
            },
            large: function () {

            }
        }
    });
}
window.onload = main;
