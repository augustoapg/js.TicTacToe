/*
 Name:  Augusto Araujo Peres Goncalez
 Date:  May 23 - 2017
 
 Page Description: this is the page that contains all the functionality for the
 game, due to the Javascript functions and constants contained on it
 Files: index.html - the page that contains the board for the game
 main.css - the page that contains the styles for the index.html
 
 */

/* Creates an array containing all the td tags on the page (in this case, all 
 * the cells on the game board)
 */
var board = document.getElementsByTagName("td");

// assuming we index the 9 tic tac toe cells from left to right, top to
// bottom, as 0-8, these would be all of the winning combinations:
var winSets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

// X always gets to go first
var player = "X";

// keep track of how many cells are empty at any time
var empty = 9;

// keep track of game status - false if still playing
var gameOver = false;

// keeps the last cell clicked to help on changing the color of the cells
var lastClicked = "";

// variables to keep track of the statistics of the game
var playerX = 0;
var playerO = 0;

// Hides message "Player X/O goes"
document.getElementById("goMessage").style.display = "none";

/* Function resetGame() is called when user clicks on the "game reset" button
 1. sets content of all 9 cells to nothing
 2. sets the starting player (this version, X always starts the game)
 3. updates the message to the current player
 4. resets the number of empty cells to 9
 5. sets the game over flag to false to indicate that the game is in progress
 */
function resetGame() {

    // unhide the message "Player X/O goes"
    document.getElementById("goMessage").style.display = "block";

    /* Loop that looks over every td element contained in the board array (the 
     * entire game board) and empties it (replace content for a empty string) */
    for (i = 0; i < board.length; i++) {
        board[i].innerHTML = "";
    }

    // Sets a random player (if random num is 0, player "X", otherwise "O"
    player = (Math.floor(Math.random() * 2) === 0) ? "X" : "O";

    // Update the player in the page
    document.getElementById("player").innerHTML = player;

    // Reset gameOver and # of empty cells
    gameOver = false;
    empty = 9;

    // Changes the color of the last cell clicked and resets it
    if (lastClicked !== "") {
        lastClicked.style.backgroundColor = "white";
        lastClicked = "";
    }

    // Changes the color back to black to all the cells
    for (i = 0; i < 9; i++)
        board[i].style.color = "black";
}

/* Function cellClicked() is called
 when the event listeners for the "td" cells fire which occurs
 when the user clicks on one of the nine cells of the board
 1. decreases # of empty cells by 1
 2. sets the content of the clicked cell to the current player's mark
 3. checks whether or not there is a winner
 4. flips (changes) the current player
 5. updates the message to the current player
 */
function cellClicked(cell) {

    // Checks if it is valid for the player to click in that cell
    if (!gameOver && cell.innerHTML === "") {

        // Decrease # of empty cells by 1
        empty--;

        // Change the content of the cell clicked from "" to the player symbol
        cell.innerHTML = player;

        // Change colour of the cell to indicate last move made
        cell.style.backgroundColor = "#ccccff";

        // Changes the color of the last cell clicked, if there is one
        if (lastClicked !== "")
            lastClicked.style.backgroundColor = "white";

        // The cell just clicked becomes the last cell clicked
        lastClicked = cell;

        // Check if the player that just clicked meets the criteria for winning
        checkWin();

        // Check and changes the element on the page that shows player's turn
        if (!gameOver) {
            player = (player === "X") ? "O" : "X";
            document.getElementById("player").innerHTML = player;
        }

    }
}

/* Function checkWin() is called to check all winning combinations 
 * and display results */
function checkWin() {

    /* Goes through the array to check if any of the winning conditions are met 
     * (compares if the cell's numbers of any of the winSets array "row" number 
     * contains, on the board, the same symbol and are not empty cells) */
    for (i = 0; i < winSets.length; i++) {
        if (board[winSets[i][0]].innerHTML == board[winSets[i][1]].innerHTML
                && board[winSets[i][1]].innerHTML ==
                board[winSets[i][2]].innerHTML
                && board[winSets[i][0]].innerHTML != "") {

            //  Set gameOver variable: game is now over  
            gameOver = true;

            // Increase the number of wins for the winning player
            if (player === "X")
                playerX++;
            else
                playerO++;

            // Changes the colour of the winning combination
            board[winSets[i][0]].style.color = "red";
            board[winSets[i][1]].style.color = "red";
            board[winSets[i][2]].style.color = "red";

            // hides the message "Player X/O goes"
            document.getElementById("goMessage").style.display = "none";

            //  Display "X Wins!" or "O Wins!" in the winner H3
            document.getElementById("winner").innerHTML = player + " Wins!" +
                    showStatistics(playerX, playerO);

            //  Call displayWin(true) function
            displayWin(true);
            break;
        }
    }

    // Check if there was a tie (no winner and no more empty cells)
    if (empty === 0 && !gameOver) {

        // Ends the game and display tie message
        gameOver = true;
        document.getElementById("winner").innerHTML = "No one wins! =(" +
                showStatistics(playerX, playerO);
        displayWin(true);
    }
}

function showStatistics(playerX, playerO) {
    return "<br><br>Number of victories:<br>Player X: " + playerX +
            "<br>Player O: " + playerO;
}

// add click event to reset button, calling resetGame method
document.getElementById("reset").addEventListener("click", resetGame);

// add click event to the message div, which passes the false att to the
// displayWin method
document.getElementById("message").addEventListener("click", function () {
    displayWin(false);
});

// add click event to each cell
for (i = 0; i < board.length; i++) {
    document.getElementsByTagName("td")[i].addEventListener("click",
            function () {
                cellClicked(this);
            });
}
// displays the results window with the winner inside it: the method will
// either show the results or hide them (displayWin(true) shows and 
// displayWin(false) hides)
function displayWin(show) {
    if (show) {
        document.getElementById("message").style.display = "block";
        document.getElementById("overlay").style.display = "block";
    } else {
        document.getElementById("message").style.display = "none";
        document.getElementById("overlay").style.display = "none";
    }
}

// ===============================================================