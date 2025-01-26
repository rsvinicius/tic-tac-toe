# Tic Tac Toe Documentation

The project is a browser-based implementation of the classic Tic Tac Toe game, emphasizing modular design, object-oriented programming, and DOM manipulation.

## Live Demo

A live demo of the project is available at: [Library App Demo](https://rsvinicius.github.io/tic-tac-toe)

## Features

- 🎮 **Interactive Gameplay**: Players can take turns to place their marks ("X" or "O") on the gameboard.
- 🧠 **Game Logic**: Checks for winning combinations (horizontal, vertical, diagonal) and detects ties.
- 🔄 **Dynamic Rendering**: Updates the gameboard dynamically based on player actions.
- ✏️ **Player Names**: Allows players to input their names for a personalized experience.
- 🔁 **Restart Button**: Includes a button to restart the game and clear the board.
- 🏆 **Results Display**: Shows the game results (winner or tie) at the end of each match.

## Project Structure

The project follows a modular architecture to minimize global variables and organize code logically:

- 🎲 **Gameboard Module**: Stores the gameboard as an array and provides methods for updating and retrieving board data.
- 👤 **Player Factory**: Creates player objects with names and marks ("X" or "O").
- 🕹️ **Game Controller Module**: Manages game flow, including turn alternation, input validation, and game-over checks.
- 💻 **Display Controller Module**: Handles all DOM interactions, including rendering the gameboard, taking player input, and displaying results.

## Future Enhancements

- 🤖 **AI Opponent**: Implement an AI player with difficulty levels.
- 📱 **Responsive Design**: Improve the layout for better usability on different devices.
- 💾 **Persistent Scores**: Store player scores across sessions using localStorage.
- ✨ **Animations**: Add visual effects for moves and game results to enhance user experience.