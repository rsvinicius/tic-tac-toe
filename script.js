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

    return { getBoard, resetBoard, setCell };
})();

const Player = (name, symbol) => {
    return { name, symbol };
};

const GameController = (() => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = player1;
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
            console.log("Game is over. Reset to play again.");
            return;
        }

        if (Gameboard.setCell(index, currentPlayer.symbol)) {
            const winner = checkWinner();
            if (winner) {
                console.log(winner === "Tie" ? "It's a tie!" : `${winner.name} wins!`);
            } else {
                switchPlayer();
            }
        } else {
            console.log("Cell is already taken. Try another one.");
        }
    };

    const resetGame = () => {
        Gameboard.resetBoard();
        currentPlayer = player1;
        isGameOver = false;
        console.log("Game reset. Player 1 starts.");
    };

    return { playTurn, resetGame };
})();

// Example Gameplay in Console
// GameController.playTurn(0); 
// GameController.playTurn(1); 
// GameController.playTurn(3); 
// GameController.playTurn(4); 
// GameController.playTurn(6); 
