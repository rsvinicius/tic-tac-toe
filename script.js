const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;
    const resetBoard = () => board.fill("");
    const setCell = (index, symbol) => {
        if (board[index] === "") {
            board[index] = symbol;
            return true;
        }
        return false;
    };

    const printBoard = () => {
        console.log(`\n${board.slice(0, 3).join(" | ")}`);
        console.log(`---------`);
        console.log(`${board.slice(3, 6).join(" | ")}`);
        console.log(`---------`);
        console.log(`${board.slice(6, 9).join(" | ")}`);
    };

    return { getBoard, resetBoard, setCell, printBoard };
})();

const Player = (name, symbol) => {
    return { name, symbol };
};

const GameController = (() => {
    let player1 = null;
    let player2 = null;
    let currentPlayer = null;
    let isGameOver = false;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWinner = () => {
        const board = Gameboard.getBoard();
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                isGameOver = true;
                return currentPlayer;
            }
        }

        if (!board.includes("")) {
            isGameOver = true;
            return "Tie";
        }

        return null;
    };

    const playTurn = (index) => {
        if (isGameOver) {
            DisplayController.showMessage("Game is over. Restart to play again.");
            return;
        }

        if (Gameboard.setCell(index, currentPlayer.symbol)) {
            DisplayController.render();
            const winner = checkWinner();
            if (winner) {
                DisplayController.showMessage(
                    winner === "Tie" ? "It's a tie!" : `${winner.name} wins!`
                );
            } else {
                switchPlayer();
                DisplayController.showMessage(`${currentPlayer.name}'s turn (${currentPlayer.symbol}).`);
            }
        } else {
            DisplayController.showMessage("Cell is already taken. Try another one.");
        }
    };

    const startGame = (name1, name2) => {
        player1 = Player(name1, "X");
        player2 = Player(name2, "O");
        currentPlayer = player1;
        isGameOver = false;
        Gameboard.resetBoard();
        DisplayController.removePlayerInputs();
        DisplayController.render();
        DisplayController.showMessage(`${currentPlayer.name}'s turn (${currentPlayer.symbol}).`);
    };

    return { playTurn, startGame };
})();

const DisplayController = (() => {
    const render = () => {
        const board = Gameboard.getBoard();
        const boardContainer = document.querySelector(".gameboard");
        boardContainer.innerHTML = "";
        board.forEach((cell, index) => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.textContent = cell;
            cellDiv.addEventListener("click", () => GameController.playTurn(index));
            boardContainer.appendChild(cellDiv);
        });
    };

    const showMessage = (message) => {
        const messageContainer = document.querySelector(".message");
        if (messageContainer) {
            messageContainer.textContent = message;
        }
    };

    const removePlayerInputs = () => {
        const playerInputs = document.querySelector('.player-inputs');
        if (playerInputs) {
            playerInputs.style.display = 'none';
          }
    };

    return { render, showMessage, removePlayerInputs };
})();

const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", () => {
    const player1Name = document.querySelector("#player1").value || "Player 1";
    const player2Name = document.querySelector("#player2").value || "Player 2";
    GameController.startGame(player1Name, player2Name);
});
