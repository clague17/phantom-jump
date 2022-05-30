import React from "react";
import { StyleSheet, Button, View, Text, Image, TouchableOpacity } from "react-native";
import { Images } from "../assets/Images";

interface GameOverProps {
  resetFunction: any;
  score: number;
}

const GameOver: React.FC<GameOverProps> = ({ resetFunction, score }) => {
  return (
    <View style={styles.fullScreen}>
      <View style={styles.outermost}>
        <View style={styles.outerModal}>
          <View style={styles.modal}>
            <View style={styles.hero}>
              <View style={styles.phantomContainer}>
                <Image style={styles.phantom} source={Images.phantom1} />
              </View>
              <Text style={styles.gameOverText}>Game Over</Text>
              <Text style={styles.score}>{score}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.tryAgainContainer} onPress={resetFunction}>
          <Text style={styles.tryAgainText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 32,
    backgroundColor: "#474747",
    borderRadius: 12,
  },
  outerModal: {
    backgroundColor: "#2A2A2A",
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    height: "55%",
  },
  outermost: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 32,
    minHeight: "60%",
  },
  hero: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  phantomContainer: { height: "60%", flex: 1 },
  phantom: { flex: 1 },
  score: { color: "#35E884", fontSize: 56 },
  gameOverText: {
    color: "white",
    fontSize: 36,
  },
  tryAgainText: {
    color: "white",
    textAlignVertical: "center",
    fontSize: 24,
  },
  tryAgainContainer: {
    flex: 1,
    display: "flex",
    maxHeight: 48,
    backgroundColor: "#8A81f8",
    minWidth: "100%",
    marginHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
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
});

export default GameOver;
