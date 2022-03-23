# Alma frontend tech test

## Starting the project

```
npm i
npm run start
```

- It opens on `http://localhost:3000`
- Click on an Idle robot (blinking in red)
- Click on the action `Mine Bar` in the tool bar
- The robot will move to the Bar mining station
- Click on the second robot
- Click on the action `Mine Foo` in the tool bar
- The robot will move to the Foo mining station
- Keep adding Foo and Bar action to each robot queue
- When enough resources produce FooBar and Robots until you have 20 robots

## Description

This project is based on a standard `create-react-app` with a typescript template. `Redux` and `react-redux` are also used. `styled-components` are also used.

Unit tests are performed, mostly on the store and reducer part.

ℹ️ Graphics are extracted from the wiki of the game [Total Domination](https://plarium.com/en/game/total-domination/).

### Choices

- The set of rules made me think of a RTS (Real Time Strategy) game. I decided to go this way.
- Since the target of this app is to demonstrate code abilities and not have a 100% code coverage, I decided to limit their usage and focus on the variety of things to demonstrate with this bit.
- I used only `Redux` here, `Redux-saga` and/or `Redux-RX` could also have been great.
- I wen't with the bare minimum, only a few external libs and no graphical components.
- Functional components and hooks all the way.

## To enhance

- Replace the emojis with actual graphics.
- Show the selected robot.
- Use the action `duration` property to display a loader.
- Add animations on the robots (when idle, working or moving to on other station).
- Replace the copper style with a texture.
- More tests, mostly to check every game rules.
- Show the cost of each action in a tooltip.
- Rethink the UI to be responsive.
- Some of the styled components can be shared.
- Add a full coverage of the store.
- Add economic stats for each robots (eg: "during it's life, this robot mined 200 Foo ! That's impressive").
- Add random event/disasters (thunder as destroyed 50% of the robots, loosing all the FooBar at the casino...).
- Add a timer, and a scoreboard with the fastest players.
- Add a paid DLC option to X5 each action click.
- Add a paid DLC option to auto queue idle robots to previous task.
- Add keyboard shortcuts to switch robots and trigger actions.
    - Select robots from 1 - 20
    - Select next idle robot
- Translate to many languages.
- How-to page at the start of a game.

## Timeline

- (~15 minutes) Building the data types
- (~40 minutes) Building the reducer
- (~20 minutes) Testing the reducer
- (~1 hour) Building the UI elements
- (~20 minutes) Searching for texture ressources and using them
- (~1 hour) Creating the business logic arround the store
- (~30 minutes) Plugin the UI with the store and playing with the game to see if everything works
- (~1 hour) Adding a few unit tests
- (~15 minutes)Documenting

*Total* : ~5h20