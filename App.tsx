import React, { Component, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import Matter, { Engine, World } from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Ghost from "./components/Ghost";
import Floor from "./components/Floor";
import Physics, { resetPipes } from "./components/Physics";
import { Constants } from "./util/utils";
import Images from "./assets/Images";

export default function App() {
  console.log("render 1");
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [score, setScore] = useState(0);

  const gameEngine = useRef(Matter.Engine.create());

  let ghost = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH / 2,
    Constants.MAX_HEIGHT / 2,
    Constants.GHOST_WIDTH,
    Constants.GHOST_HEIGHT
  );

  let floor1 = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH / 2,
    Constants.MAX_HEIGHT - 25,
    Constants.MAX_WIDTH + 4,
    50,
    { isStatic: true }
  );

  let floor2 = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH + Constants.MAX_WIDTH / 2,
    Constants.MAX_HEIGHT - 25,
    Constants.MAX_WIDTH + 4,
    50,
    { isStatic: true }
  );
  // useEffect(() => {
  //   entities = setupWorld();
  // }, []);

  const onEvent = (e) => {
    if (e.type === "game-over") {
      //Alert.alert("Game Over");
      setIsGameRunning(false);
    } else if (e.type === "score") {
      setScore(score + 1);
    }
  };

  const reset = () => {
    console.log("now we're resetting");
    resetPipes();
    setScore(0);
    setIsGameRunning(true);
  };

  useEffect(() => {
    let world: World = gameEngine.current.world;
    gameEngine.current.gravity.y = 0.0;

    Matter.World.add(world, [ghost, floor1, floor2]);

    Matter.Runner.run(gameEngine.current);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={Images.background}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <GameEngine
        style={styles.gameContainer}
        systems={[Physics]}
        running={isGameRunning}
        onEvent={onEvent}
        entities={{
          physics: { engine: gameEngine.current, world: gameEngine.current.world },
          floor1: { body: floor1, renderer: Floor },
          floor2: { body: floor2, renderer: Floor },
          ghost: { body: ghost, pose: 1, renderer: Ghost },
        }}
      >
        <StatusBar hidden={false} />
      </GameEngine>
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
