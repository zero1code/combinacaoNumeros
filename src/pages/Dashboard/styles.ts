import styled, { css } from 'styled-components/native';
import { FlatList, Animated } from 'react-native';
import BtnScale from 'react-native-touchable-scale';
import { RectButton } from 'react-native-gesture-handler';

interface BtnScaleOptionListProps {
  background: string;
  borderColor: string;
  selectedOption: number;
}

interface BtnCombineProps {
  background: string;
}

interface ViewQuantityErrorProps {
  error: boolean;
}

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const BodyApp = styled(Animated.View)`
  width: 100%;
  height: 92%;
`;

export const BodyAppList = styled(FlatList)`

`;

export const Title = styled.Text`
  font-size: 40px;
  color: #444;
  margin-left: 10px;
  margin-right: 20px;
  margin-top: 15px;
  margin-bottom: 10px;
  font-family: 'Arciform';
`;

export const OptionList = styled(FlatList)`

`;

export const BtnOptionList = styled(BtnScale)<BtnScaleOptionListProps>`
  background-color: ${props => props.background};
  border-width: 2px;
  height: 120px;
  width: 160px;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 16px;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 20px;
  justify-content: space-between;

  border-color: ${props => props.selectedOption};
`;

export const BtnOptionListText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-family: 'Arciform';
`;

export const BallsList = styled(FlatList)`
  flex: 1;
  align-content: center;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  padding-top: 30px;
`;

export const BtnCombine = styled(RectButton)<BtnCombineProps>`
  width: 180px;
  height: 50px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.background};
`;

export const LoadingBtnCombine = styled.View<BtnCombineProps>`
  width: 180px;
  height: 50px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.background};
`;

export const BtnCombineText = styled.Text`
  font-family: 'Arciform';
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const PlusButton = styled.TouchableOpacity`
  margin-left: 20px;
  justify-content: center;
`;

export const ViewQuantity = styled.View<ViewQuantityErrorProps>`
  width: 50px;
  height: 50px;
  font-family: 'Arciform';
  background-color: #fff;
  border-width: 2px;
  border-color: #fff;
  border-radius: 10px;
  margin-left: 10px;
  justify-content: center;
  font-size: 16px;

  ${props => props.error === true &&
    css`
      border-color: #c53030;
    `
  }
`;

export const ViewQuantityText = styled.Text`
  text-align: center;
  font-size: 18px;
  font-family: 'Arciform';
  color: #666;
`;

export const LessButton = styled.TouchableOpacity`
  margin-left: 10px;
`;

export const CombinationsContainer = styled(Animated.View)`
  background-color: #f2f2f2;
  elevation: 1;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;

export const TotalCombinationsText = styled.Text`
  width: 65%;
  font-family: 'Arciform';
  font-size: 16px;
  color: #F0F0F7;
  margin-left: 15px;
  text-align: left;
`;

export const ShareButton = styled.TouchableOpacity`
`;

export const SaveButton = styled.TouchableOpacity`
`;

export const SeeSavedCombinationsButton = styled.TouchableOpacity`
`;

export const CombinationsList = styled(FlatList)`

`;

export const CombinationsListText = styled.Text`
  font-family: 'Arciform';
  font-size: 16px;
  color: #666;
  margin-left: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
`;


