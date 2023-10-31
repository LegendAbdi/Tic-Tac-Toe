class TicTacToeGame {
        // Initializes the TicTacToeGame object.
        // Parameters: None
        constructor() {
                this.cells = document.querySelectorAll('.cell');
                this.outputText = document.getElementById('GameText');
                this.resetButton = document.getElementById('Restart');
                this.boardSize = 3;
                this.board = ["", "", "", "", "", "", "", "", ""];
                this.player = "X";
                this.xOrY = true;
                this.inProgress = false;
                this.resetGameHandler = () => this.resetGame();
        }
        // Switches the current player between "X" and "O".
        // Parameters: None
        switchXToY() {
                this.player = this.xOrY ? "X" : "O";
                this.xOrY = !this.xOrY;
                this.updatePlayerTurn();
        }
        // Starts a new game by setting the initial player and setting up event listeners.
        // Parameters: None
        startGame() {
                this.switchXToY();
                this.inProgress = true;
                this.setupEventListeners();
        }
        // Updates the displayed text indicating the current player's turn.
        // Parameters: None
        updatePlayerTurn() {
                this.outputText.textContent = `Player's ${this.player} Turn`;
        }
       // Checks if a cell is a valid move and modifies the game state accordingly.
        // Parameters:
        //   - cell: The HTML element representing the clicked cell.
        checkValidCell(cell) {
                let get_index = cell.getAttribute("Index_cell");
                if (this.board[get_index] !== "" || !this.inProgress) {
                        return;
                }
                this.modifyCell(cell, get_index);
                this.checkYouWon();
        }
        // Modifies the game state and updates the displayed cell with the current player's mark.
        // Parameters:
        //   - cell: The HTML element representing the clicked cell.
        //   - index: The index of the cell in the game board.
        modifyCell(cell, index) {
                this.board[index] = this.player;
                cell.textContent = this.player;
        }
        // Checks if any row has the same player's mark in all cells.
        // Parameters: None
        checkRows() {
                for (let i = 0; i < this.board.length; i += this.boardSize) {
                        if (this.checkArray([i, i + 1, i + 2])) {
                                return true;
                        }
                }
                return false;
        }
        // Checks if any column has the same player's mark in all cells.
        // Parameters: None
        checkColumns() {
                for (let i = 0; i < this.boardSize; i++) {
                        if (this.checkArray([i, i + this.boardSize, i + this.boardSize * 2])) {
                                return true;
                        }
                }
                return false;
        }
        // Checks if any diagonal has the same player's mark in all cells.
        // Parameters: None
        checkDiagonals() {
                const diagonal1 = [0, 4, 8];
                const diagonal2 = [2, 4, 6];
                return this.checkArray(diagonal1) || this.checkArray(diagonal2);
        }
        // Checks if all elements in a given array have the same player's mark.
        // Parameters:
        //   - array: An array of indices representing cells in the game board.
        checkArray(array) {
                const [cell1, cell2, cell3] = array;
                return this.board[cell1] !== "" && 
                this.board[cell1] === this.board[cell2] && 
                this.board[cell2] === this.board[cell3];
        }
        // Checks if a player has won the game or if it's a draw, 
        // updating the display accordingly.If neither happen switch player
        // Parameters: None
        checkYouWon() {
                if (this.checkRows() || this.checkColumns() || this.checkDiagonals()) {
                        this.outputText.textContent = `Player ${this.player}'s won`;
                        this.inProgress = false;
                }
                else if (!this.board.includes("")) {
                this.outputText.textContent = "Game is a Draw";
                this.inProgress = false;
                } else {
                this.switchXToY();
                }
        }
        // Resets the game state, clearing the board and setting up 
        // event listeners for a new game.
        // Parameters: None
        resetGame() {
                for (let i = 0; i < this.board.length; i++) {
                this.board[i] = "";
                this.cells[i].textContent = "";
                }
                this.setupEventListeners();
                this.startGame();
        }
        // Sets up event listeners for the game cells and reset button.
        // Parameters: None
        setupEventListeners() {
                this.cleanupEventListeners();
                this.cells.forEach((cell) => cell.addEventListener("click", () => this.checkValidCell(cell)));
                this.resetButton.addEventListener("click", this.resetGameHandler);
        }
        // Removes event listeners from the game cells and reset button.
        // Parameters: None
        cleanupEventListeners() {
                this.cells.forEach((cell) => cell.removeEventListener("click", () => this.checkValidCell(cell)));
                this.resetButton.removeEventListener("click", this.resetGameHandler);
        }
}
      
      // Create an instance of the TicTacToeGame class
      const ticTacToeGame = new TicTacToeGame();
      
      // Start the game
      ticTacToeGame.startGame();
      