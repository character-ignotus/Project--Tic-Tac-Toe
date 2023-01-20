# Project: "Tic-Tac-Toe"

## Description of project: 
A game of Tic-Tac-Toe armed with two playable modes. The first game mode lets two users play against each other, while the second game mode lets one user play against an unbeatable AI (You won't be able to win against it. You can only get a draw at most if you play optimally). The AI implemented in this app is based on the MiniMax algorithm. The app itself is built using HTML, CSS & JavaScript with the main focus being the utilization of the Factory Functions pattern & The Module Pattern which enable us to write OOP JavaScript. Play a round or two with a friend or against the AI [here](https://character-ignotus.github.io/Project--Tic-Tac-Toe/).

## App Elements:

- Announcement section for announcing the winner
- Main section for:
    - The gameboard itself
    - The user avatars & their names located on the left and right side of the gameboard
- Button Section
- Initial Section

## Features: 

- 'Reset' button lets user(s) reset the gameboard
- 'PvP','PvC' buttons let user(s) change the game mode
- Initial Section wich:
    - Shows the user(s) two modals for choosing the desired game mode
    - Let user(s) input their usernames beofre choosing the desired game mode

## MiniMax algorithm: 
The MiniMax algorithm is a recursive or backtracking algorithm used in decision-making. It provides an optimal move for the player assuming that the opponent is also playing optimally. The algorithm uses recursion to search through something called a game-tree & computes the minimax decision for the current state. In this algorithm two players play the game & one of them is the Maximizer while the other is the Minimizer. Both players play against each other & the opponent player gets the minimum benefit while the other gets the maximum benefit. Both players of the game are opponents of each other & the Maximizer will select the maximized value while the Minimizer will select the minimized value. The MiniMax algorithm performs a depth-first search algorithm for the exploration of the complete game tree, proceeding all the way down to the terminal node of the tree, then backtracks the tree which provides the optimal move.

## Credit: 

- First avatar icon from [Flaticon](https://www.flaticon.com/free-icon/human_1184993?term=ai+avatar&page=1&position=24&origin=search&related_id=1184993)
- Second avatar icon from [Flaticon](https://www.flaticon.com/free-icon/ai_2694990?related_id=2694990)
- AI icon from [Flaticon](https://www.flaticon.com/free-icon/ai_1184978?related_id=1184978)

## Acknowledgement:

Project inspiration from [The Odin Project](https://www.theodinproject.com/)