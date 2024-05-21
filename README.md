# Infinity Tic Tac Toe - CS50x Final Project 2024

## Table Of Content

1. [TLDR](#tldr)
1. [What is the difference between infinity tic tac toe and normal tic tac toe](#what-is-the-difference-between-infinity-tic-tac-toe-and-normal-tic-tac-toe)
1. [What does all file do?](#what-does-all-file-do)
    1. [ai.ts](#aits)
    1. [click.ts](#clickts)
    1. [environment.ts](#environmentts)
    1. [index.ts](#indexts)
    1. [settings.ts](#settingsts)
    1. [util.ts](#utilts)
    1. [won.ts](#wonts)
1. [Struggles and Issues](#struggles-and-issues)
1. [Why did you `x` thing](#why-did-you-x-thing)
    1. [Why TypeScript](#why-typescript)
    1. [Why JS Canvas](#why-js-canvas)
    1. [Why JSDocs](#why-jsdocs)
1. [Code Structure](#code-structure)
    1. [Naming](#)
    1. [Functions and classes](#functions-and-classes)
    1. [Variables](#variables)
    1. [Commenting and Documentation](#commenting-and-documentation)
    1. [Comments](#comments)
    1. [Documentation](#documentation)
    1. [Code Structure and Organization](#code-structure-and-organization)
    1. [Code styling](#code-styling)
    1. [File and Directory Structure](#file-and-directory-structure)
    1. [Avoiding Magic Numbers and Strings](#avoiding-magic-numbers-and-strings)
    1. [Code Reusability](#code-reusability)
1. [Tools](#tools)
    1. [Necessary Tools](#necessary-tools)
    1. [Recommended Tools](#recommended-tools)

## TLDR

Infinity Tic Tac Toe is a modified version of Tic Tac Toe that can be played by a minimum of 2 players.

## What is the difference between Infinity Tic Tac Toe and normal Tic Tac Toe

-   In infinity tic tac you only have has many pieces as the board is in size; for example, you have 3 pieces if the board is 3x3 and you have 4 pieces if the board is 4x4
-   When all pieces are placed down you will have to move the piece that has been placed down the longest (The piece that is highlighted)

## What does all file do?

### [ai.ts](./src/ai.ts)

This file does all the calculations for the ai so it knows where to place it's piece

### [click.ts](./src/click.ts)

This file does all the click and mouse movement checks

### [environment.ts](./src/environment.ts)

This file contains the variables that is necessary to use js canvas (canvas and ctx)

### [index.ts](./src/index.ts)

This file draws everything to the screen and calls all the other files and tells them what to do

### [settings.ts](./src/setting.ts)

This file contains all the settings for the game, so if you want to change how big the board is or how many players it is, you will do it here

### [util.ts](./src/util.ts)

This file contains functions and types that can be necessary in other files

### [won.ts](./src/won.ts)

This file checks if someone has won or not

## Struggles and Issues

When I tried to make the AI for my game, I initially attempted to utilize the [minimax](https://en.wikipedia.org/wiki/Minimax) algorithm, but it didn't work. So, I searched for a new algorithm that could work with the rules of my version of Tic Tac Toe. Eventually, I found [heuristic](https://en.wikipedia.org/wiki/Heuristic) algorithms, and it worked great in this scenario.

## Why did you use `x` thing

### Why TypeScript

I want to be sure that all types are of the right type and by using typescript i have a higher insurance that is the case

### Why JS Canvas

Because i have already made games in JS Canvas in the past and making games in HTML is kind of a pain

### Why JSDocs

It was boring to type out all the docs but it makes it more clear for people that want to read the code and it makes it also makes it easier for myself if i decide to look back on this project

## Code Structure

### Naming

#### Functions and classes

Use `PascalCase`

#### Variables

Use `camelCase`

### Commenting and Documentation

#### Comments

Use comments to explain the "why" and not the "what".

#### Documentation

Use JSDoc to document classes and functions

### Code Structure and Organization

#### Code styling

Install the Prettier extension so everyone can utilize the same code styling settings (.prettierrc).

### File and Directory Structure

Code in "src" and images, svg and other files in "assets".

### Avoiding Magic Numbers and Strings

### Code Reusability

Strive for DRY (Don't Repeat Yourself) principles by abstracting reusable code into classes, functions or variables.

## Tools

### Necessary Tools

-   [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
-   [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
-   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Recommended Tools

-   [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
-   [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
-   [Class Collapse](https://marketplace.visualstudio.com/items?itemName=Etsi0.class-collapse)
-   [CSS Peek](https://marketplace.visualstudio.com/items?itemName=pranaygp.vscode-css-peek)
-   [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
