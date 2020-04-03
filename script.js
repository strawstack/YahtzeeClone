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
            }
        }
    });
}
window.onload = main;
