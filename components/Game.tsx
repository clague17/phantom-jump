import React, { Component, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Matter, { World } from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Ghost from "./Ghost";
import Floor from "./Floor";
import Physics, { resetPipes } from "./Physics";
import { Constants } from "../util/utils";
import { Images } from "../assets/Images";

export default function Game() {
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [score, setScore] = useState(0);
  const gameEngine = useRef<GameEngine>(null);

  let engine: Matter.Engine = Matter.Engine.create();
  let world: World = engine.world;
  engine.gravity.y = 0.0;

  let ghost: Matter.Body = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH / 2,
    Constants.MAX_HEIGHT / 2,
    Constants.GHOST_WIDTH,
    Constants.GHOST_HEIGHT
  );

  let floor1: Matter.Body = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH / 2,
    Constants.MAX_HEIGHT - 25,
    Constants.MAX_WIDTH + 4,
    50,
    { isStatic: true }
  );

  let floor2: Matter.Body = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH + Constants.MAX_WIDTH / 2,
    Constants.MAX_HEIGHT - 25,
    Constants.MAX_WIDTH + 4,
    50,
    { isStatic: true }
  );

  Matter.World.add(world, [ghost, floor1, floor2]);
  const ogEntities = {
    physics: { engine: engine, world: world },
    floor1: { body: floor1, renderer: Floor },
    floor2: { body: floor2, renderer: Floor },
    ghost: { body: ghost, pose: 1, renderer: Ghost },
  };

  const setupWorld = () => {
    let engine: Matter.Engine = Matter.Engine.create();
    let world: World = engine.world;
    engine.gravity.y = 0.0;

    let ghost: Matter.Body = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT / 2,
      Constants.GHOST_WIDTH,
      Constants.GHOST_HEIGHT
    );

    let floor1: Matter.Body = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH + 4,
      50,
      { isStatic: true }
    );

    let floor2: Matter.Body = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH + Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH + 4,
      50,
      { isStatic: true }
    );

    Matter.World.add(world, [ghost, floor1, floor2]);

    return {
      physics: { engine: engine, world: world },
      floor1: { body: floor1, renderer: Floor },
      floor2: { body: floor2, renderer: Floor },
      ghost: { body: ghost, pose: 1, renderer: Ghost },
    };
  };

  const onEvent = (e) => {
    if (e.type === "game-over") {
      //Alert.alert("Game Over");
      setIsGameRunning(false);
    } else if (e.type === "score") {
      setScore(score + 1);
    }
  };

  const reset = () => {
    // @ts-ignore (we need this because the actual package doesn't have the typing necessary. This fxn exists here: https://github.com/bberak/react-native-game-engine/blob/01d0827b5d5989cc559dec07d8fdad580bece494/src/GameEngine.js#L88)
    gameEngine.current.swap(setupWorld());
    resetPipes();
    setScore(0);
    setIsGameRunning(true);
  };

  return (
    <View style={styles.container}>
      <Image
        source={Images.background}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <GameEngine
        ref={(ref) => {
          gameEngine.current = ref;
        }}
        style={styles.gameContainer}
        systems={[Physics]}
        running={isGameRunning}
        onEvent={onEvent}
        entities={ogEntities}
      />
      <Text style={styles.score}>{score}</Text>
      {!isGameRunning && (
        <TouchableOpacity style={styles.fullScreenButton} onPress={reset}>
          <View style={styles.fullScreen}>
            <Text style={styles.gameOverText}>Game Over</Text>
            <Text style={styles.gameOverSubText}>Try Again</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
  },
  gameContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  gameOverText: {
    color: "white",
    fontSize: 48,
  },
  gameOverSubText: {
    color: "white",
    fontSize: 24,
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    position: "absolute",
    color: "white",
    fontSize: 72,
    top: 50,
    left: Constants.MAX_WIDTH / 2 - 20,
    textShadowColor: "#444444",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  fullScreenButton: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
});
