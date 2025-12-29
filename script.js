console.log("Welcome to Tic Tac Toe");
// Tip: Ensure these audio files exist in your folder, otherwise comment them out to prevent errors
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");

let turn = "X";
let isgameover = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
};

// Function to check for a win
const checkWin = () => {
    let boxtexts = document.getElementsByClassName("boxtext");
    let boxes = document.getElementsByClassName("box");
    
    // Winning combinations (Indices of the boxes)
    let wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    wins.forEach(e => {
        // e[0], e[1], e[2] are the indices
        if (
            (boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) &&
            (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) &&
            (boxtexts[e[0]].innerText !== "")
        ) {
            document.querySelector(".info").innerText = boxtexts[e[0]].innerText + " Won!";
            isgameover = true;
            
            // Show the excited gif
            document.querySelector(".imgbox").classList.add("show");
            
            // Play gameover sound
            gameover.play().catch(e => console.log("Audio play failed")); 

            // Highlight the winning cells
            boxes[e[0]].classList.add("win-highlight");
            boxes[e[1]].classList.add("win-highlight");
            boxes[e[2]].classList.add("win-highlight");
        }
    });
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (boxtext.innerText === "" && !isgameover) {
            boxtext.innerText = turn;
            
            // Add class for color styling (X gets one color, 0 gets another)
            boxtext.classList.add(turn); 

            turn = changeTurn();
            audioTurn.play().catch(e => console.log("Audio play failed"));
            checkWin();
            
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

// Reset Logic
document.getElementById("reset").addEventListener("click", () => {
    let boxtexts = document.querySelectorAll(".boxtext");
    let boxes = document.querySelectorAll(".box");

    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
        element.classList.remove("X", "0"); // Remove color classes
    });

    // Remove highlight from boxes
    boxes.forEach(box => {
        box.classList.remove("win-highlight");
    });

    turn = "X";
    isgameover = false;
    document.querySelector(".imgbox").classList.remove("show");
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
});