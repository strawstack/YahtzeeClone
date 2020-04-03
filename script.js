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

    let termToFuntName = (term) => {
        let termFunctionLookup = {
            fh: 'fullHouse',
            smll: 'small',
            lrg: 'large',
            yhtz: 'yahtzee',
            q: 'diceTotal'
        };
        if (term in termFunctionLookup) {
            return termFunctionLookup[term];
        } else {
            return term;
        }
    };

    let terms = ['one', 'two', 'three', 'four', 'five', 'six', 'pair3', 'pair4', 'fh', 'smll', 'lrg', 'yhtz', 'q'];

    let p1Score = {};
    let p2Score = {};
    for (let term of terms) {
        p1Score[term] = {
            "selected": false,
            "score": 0,
            "bonus": false
        };
        p2Score[term] = {
            "selected": false,
            "score": 0,
            "bonus": false
        };
    }

    app = new Vue({
        el: '#app',
        data: {
            turn: true,
            dice: [0, 0, 0, 0, 0],
            rollsLeft: 3,
            p1s: p1Score,
            p2s: p2Score,
            tempSelect: ''
        },
        methods: {
            flipTurn: function (event) {
                // Lock in points for selection
                let pointElem;
                if (this.turn) {
                    pointElem = this.p1s[this.tempSelect];
                } else {
                    pointElem = this.p2s[this.tempSelect];
                }

                pointElem.selected = true;
                let score = this[termToFuntName(this.tempSelect)];
                pointElem.score = score;

                this.tempSelect = '';
                this.turn = !this.turn;
                this.rollsLeft = 3;
                this.dice = [0, 0, 0, 0, 0];
            },
            rollDice: function (event) {
                let newList = [];
                for (let i = 0; i < this.dice.length; i++) {
                    newList.push(Math.floor(Math.random() * 6) + 1);
                }
                this.rollsLeft -= 1;
                this.dice = newList;
            },
            select: function (term) {
                if (this.rollsLeft < 3) {
                    this.tempSelect = term;
                }
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
                    if (value == 3 || value == 4 || value == 5) {
                        return k * 3 + (sum(this.dice) - k * 3);
                    }
                }
                return 0;
            },
            pair4: function () {
                let f = fz(this.dice);
                for (let k in f) {
                    let value = f[k];
                    if (value == 4 || value == 5) {
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
                let sortDice = this.dice.slice().sort((a,b) => a - b);
                let a = true;
                for (let i = 0; i < 3; i++) {
                    if (sortDice[i] + 1 !== sortDice[i + 1]) {
                        a = false;
                        break;
                    }
                }
                let b = true;
                for (let i = 1; i < 4; i++) {
                    if (sortDice[i] + 1 !== sortDice[i + 1]) {
                        b = false;
                        break;
                    }
                }
                if (a || b) {
                    return 30;
                } else {
                    return 0;
                }
            },
            large: function () {
                let sortDice = this.dice.slice().sort((a,b) => a - b);
                let a = true;
                for (let i = 0; i < 4; i++) {
                    if (sortDice[i] + 1 != sortDice[i + 1]) {
                        a = false;
                        break;
                    }
                }
                let b = true;
                for (let i = 1; i < 5; i++) {
                    if (sortDice[i] + 1 != sortDice[i + 1]) {
                        b = false;
                        break;
                    }
                }
                if (a || b) {
                    return 40;
                } else {
                    return 0;
                }
            },
            yahtzee: function () {
                let f = fz(this.dice);
                let keys = Object.keys(f);
                if (keys.length == 1 && keys[0] != 0) {
                    return 50;
                } else {
                    return 0;
                }
            },
            diceTotal: function () {
                return sum(this.dice);
            },
            p1Bonus: function () {
                let terms = ['one', 'two', 'three', 'four', 'five', 'six'];
                let total = 0;
                for (let term of terms) {
                    let item = this.p1s[term];
                    if (item.selected) {
                        total += item.score;
                    }
                }
                return Math.min(63, total);
            },
            p2Bonus: function () {
                let terms = ['one', 'two', 'three', 'four', 'five', 'six'];
                let total = 0;
                for (let term of terms) {
                    let item = this.p2s[term];
                    if (item.selected) {
                        total += item.score;
                    }
                }
                return Math.min(63, total);
            },
            p1TotalScore: function () {
                let total = 0;
                for (let key in this.p1s) {
                    let obj = this.p1s[key];
                    if (obj.selected) {
                        total += obj.score;
                    }
                }
                return total;
            },
            p2TotalScore: function () {
                let total = 0;
                for (let key in this.p2s) {
                    let obj = this.p2s[key];
                    if (obj.selected) {
                        total += obj.score;
                    }
                }
                return total;
            }
        }
    });
}
window.onload = main;
