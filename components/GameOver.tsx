import React from "react";
import styled from "styled-components/native";
import { Images } from "../assets/Images";

interface GameOverProps {
  resetFunction: any;
  score: number;
}

const Fullscreen = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  opacity: 0.8;
  justify-content: center;
  align-items: center;
`;
const Outermost = styled.View`
  width: 340px;
  height: 65%;
`;
const OuterModal = styled.View`
  background-color: #2a2a2a;
  border-top-start-radius: 12px;
  border-top-end-radius: 12px;
  width: 100%;
  opacity: 1;
`;
const Modal = styled.View`
  display: flex;
  align-items: center;
  background-color: #474747;
  border-radius: 12;
  margin: 36px;
`;
const TryAgainButton = styled.TouchableOpacity`
  background-color: #8a81f8;
  width: 100%;
  align-items: center;
  border-bottom-start-radius: 12px;
  border-bottom-end-radius: 12px;
  padding: 12px 24px;
`;

const TryAgainText = styled.Text`
  color: white;
  font-size: 24px;
`;

const ScoreText = styled.Text`
  color: #35e884;
  font-size: 58px;
`;

const PhantomImage = styled.Image`
  height: 128px;
  width: 150px;
`;

const GameOverText = styled.Text`
  color: white;
  font-size: 36px;
  padding-top: 12px;
`;

const GameOver: React.FC<GameOverProps> = ({ resetFunction, score }) => {
  return (
    <Fullscreen>
      <Outermost>
        <OuterModal>
          <Modal>
            <PhantomImage source={Images.phantom1} />
            <GameOverText>Game Over</GameOverText>
            <ScoreText>{score}</ScoreText>
          </Modal>
        </OuterModal>
        <TryAgainButton onPress={resetFunction}>
          <TryAgainText>Try Again</TryAgainText>
        </TryAgainButton>
      </Outermost>
    </Fullscreen>
  );
};

export default GameOver;
