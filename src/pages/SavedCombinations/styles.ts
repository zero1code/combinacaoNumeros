import styled, { css } from 'styled-components/native';
import { FlatList, Animated } from 'react-native';

import { SavedCombinationProps } from './index';
import { RectButton } from 'react-native-gesture-handler';

interface BallsProps {
  background: string;
  borderColor: string;
}

interface ContainerProps {
  background: string;
}

interface ContentProps {
  background: string;
}

export const Container = styled.View``;

export const Title = styled.Text`
  font-size: 40px;
  color: #444;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 15px;
  margin-bottom: 10px;
  font-family: 'Arciform';
`;

export const SavedCombinationsList = styled(FlatList as new () => FlatList<SavedCombinationProps>)``;

export const CombinationContainer = styled.TouchableOpacity<ContainerProps>`
  background: ${props => props.background};
  margin: 0 5px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const Balls = styled.Text<BallsProps>`
  width: 45px;
  height: 45px;
  border-width: 2px;
  border-radius: 50px;
  text-align: center;
  text-align-vertical: center;
  margin: 10px 5px 10px;
  font-family: 'Arciform';
  background-color: ${props => props.background};
  border-color: ${props => props.borderColor};

`;

export const Content = styled.View<ContentProps>`

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.background};
  padding-right: 10px;
  margin: 0 5px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const CombinationContainerText = styled.Text`
  color: #fff;
  font-size: 18px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  margin-right: auto;
  font-family: 'Arciform';
  text-align: left;
`;

export const DeleteButton = styled(RectButton)`
border-radius: 50px;
`;
