let Boxes = document.querySelectorAll(".Box");
let Reset = document.querySelector("#rst-btn");
let gamebtn = document.querySelector("#btn");
let msgCon = document.querySelector(".MsgCon");
let msg = document.querySelector("#msg");

let Turn = true;   // true = X, false = O
let count = 0;     // number of moves played to detect a draw
const WinPattern = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

Boxes.forEach((Box) => {
    Box.addEventListener("click", () => {
        if (Turn) {
            Box.innerText = "X";
            Turn = false;
        } else {
            Box.innerText = "O";
            Turn = true;
        }
        Box.disabled = true;
        count++;

        let isWinner = Win();
        if (count === 9 && !isWinner) {
            showDraw();
        }
    });
});

const disableBoxes = () => {
    for (let Box of Boxes) {
        Box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let Box of Boxes) {
        Box.disabled = false;
        Box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congrats! Winner is ${winner}`;
    msgCon.classList.remove("Hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgCon.classList.remove("Hide");
};

const Win = () => {
    for (let pattern of WinPattern) {
        let pos1V = Boxes[pattern[0]].innerText;
        let pos2V = Boxes[pattern[1]].innerText;
        let pos3V = Boxes[pattern[2]].innerText;

        if (pos1V !== "" && pos1V === pos2V && pos2V === pos3V) {
            showWinner(pos1V);
            return true;
        }
    }
    return false;
};

const resetGame = () => {
    Turn = true;
    count = 0;
    enableBoxes();
    msgCon.classList.add("Hide");
};

gamebtn.addEventListener("click", resetGame);
Reset.addEventListener("click", resetGame);
