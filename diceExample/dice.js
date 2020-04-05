function roll() {
    let cycle = ["one", "two", "three", "four", "five", "six"];
    let diceElem = document.querySelector(".dice");
    let number = 6;

    let nextPosition = () => {
        let index = Math.floor(Math.random() * cycle.length);
        diceElem.setAttribute("class", "dice " + cycle[index]);

        if (number > 0) {
            number -= 1;
            setTimeout(nextPosition, 200);
        }
    };

    nextPosition();
}

function main() {
    window.addEventListener('keyup', e => {
        if (e.code == "Space") {
            roll();
        }
    });
}
window.onload = main;
