# Infinity Tic Tac Toe - CS50x Final Project 2024

## Table Of Content

1. [TL;DR](#tldr)
1. [Introduction](#introduction)
1. [Differences from Traditional Tic Tac Toe](#differences-from-traditional-tic-tac-toe)
1. [File Descriptions](#file-descriptions)
    1. [ai.ts](#aits)
    1. [click.ts](#clickts)
    1. [environment.ts](#environmentts)
    1. [index.ts](#indexts)
    1. [settings.ts](#settingsts)
    1. [util.ts](#utilts)
    1. [won.ts](#wonts)
1. [Challenges and Issues](#challenges-and-issues)
1. [Technology Choices](#technology-choices)
    1. [Why TypeScript](#why-typescript)
    1. [Why JS Canvas](#why-js-canvas)
    1. [Why JSDocs](#why-jsdocs)
1. [Code Structure](#code-structure)
    1. [Naming Conventions](#naming-conventions)
        1. [Functions and classes](#functions-and-classes)
        1. [Variables](#variables)
    1. [Commenting and Documentation](#commenting-and-documentation)
        1. [Comments](#comments)
        1. [Documentation](#documentation)
    1. [Code styling](#code-styling)
    1. [File and Directory Structure](#file-and-directory-structure)
    1. [Avoiding Magic Numbers and Strings](#avoiding-magic-numbers-and-strings)
    1. [Code Reusability](#code-reusability)
1. [Tools](#tools)
    1. [Necessary Tools](#necessary-tools)
    1. [Recommended Tools](#recommended-tools)

## TL;DR

Infinity Tic Tac Toe is an modified version of Tic Tac Toe that can be played by 2 or more players, where the board size determines the number of pieces each player has. For example, on a 3x3 board, each player has 3 pieces.

## Introduction

Infinity Tic Tac Toe is a new take on the classic game, adding strategic depth and complexity. Players need to think ahead not just about placing their pieces but also about managing those already on the board. This version offers a more challenging and engaging experience compared to the traditional game.

## Differences from Traditional Tic Tac Toe

Unlike traditional Tic Tac Toe, Infinity Tic Tac Toe offers:

-   A variable number of pieces based on board size. For example, a 3x3 board allows for 3 pieces per player, while a 4x4 board allows for 4 pieces per player.
-   Enhanced strategic planning and resource management. When all pieces are placed, players must move the piece that has been on the board the longest.

## File Descriptions

### [ai.ts](./src/ai.ts)

Handles the ai logic for the game, including move generation and strategy.

### [click.ts](./src/click.ts)

Handles click events, cursor changes and mouse movements within the game.

### [environment.ts](./src/environment.ts)

Contains environment variables that is used throughout the project.

### [index.ts](./src/index.ts)

Serves as the entry point of the application, initializing the game and rendering the main components.

### [settings.ts](./src/setting.ts)

Stores game settings and configurations, allowing customization of game parameters.

### [util.ts](./src/util.ts)

Provides utility functions that are used by multiple parts of the application to avoid code duplication.

### [won.ts](./src/won.ts)

Determines the winning conditions and checks if a player has won the game.

## Challenges and Issues

When I tried to develop the AI for my game, I initially attempted to utilize the [minimax](https://en.wikipedia.org/wiki/Minimax) algorithm. However, it didn't work well with the unique rules of my version of Tic Tac Toe. After extensive research, I discovered [heuristic](https://en.wikipedia.org/wiki/Heuristic) algorithms, which proved to be highly effective in this scenario. This approach allowed the AI to handle the game's complexity and provide a challenging opponent.

## Technology Choices

### Why TypeScript

TypeScript was chosen for its strong typing capabilities, which enhance code reliability and maintainability. By catching potential errors at compile-time rather than at runtime.

### Why JS Canvas

The JS Canvas API was chosen for rendering the game due to its performance and flexibility. The familiarity and ease of use from previous projects also contributed to its selection.

### Why JSDocs

JSDocs provides comprehensive documentation, making the codebase easier to understand and contribute to.

## Code Structure

### Naming Conventions

#### Functions and classes

Use `PascalCase` for both classes and functions.

#### Variables

Use `camelCase` for variables

### Commenting and Documentation

#### Comments

Use comments to explain the "why" and not the "what". Comments should be used sparingly to avoid cluttering the code, focusing on explaining complex or non-obvious parts of the implementation.

#### Documentation

Maintain up-to-date JSDocs for all functions and classes.

### Code styling

Install the Prettier extension so everyone can utilize the same code styling settings (.prettierrc). Prettier automatically formats the code according to predefined rules, ensuring that all developers follow the same style guidelines.

### File and Directory Structure

Place code in the "src" directory and place images, SVGs, and other assets in the "assets" directory. This separation ensures a well-structured project that is easy to navigate.

### Avoiding Magic Numbers and Strings

Avoid using magic numbers and strings directly in the code. Instead, define them as constants with meaningful names. This practice enhances code readability and makes it easier to update.

### Code Reusability

Strive for DRY (Don't Repeat Yourself) principles by abstracting reusable code into classes, functions, or variables.

## Tools

### Necessary Tools

-   [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) - Helps in identifying and correcting spelling errors in the code.
-   [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) - Provides a local development server with live reload capability.
-   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Ensures consistent code formatting across the project.

### Recommended Tools

-   [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) - Automatically renames paired HTML tags.
-   [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) - Enhances comment readability with color-coded annotations.
-   [Class Collapse](https://marketplace.visualstudio.com/items?itemName=Etsi0.class-collapse) - Allows for easy navigation and collapsing of class definitions.
-   [CSS Peek](https://marketplace.visualstudio.com/items?itemName=pranaygp.vscode-css-peek) - Provides quick access to CSS definitions directly from HTML files.
-   [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) - Enhances the Git capabilities within VSCode, making it easier to manage version control.
