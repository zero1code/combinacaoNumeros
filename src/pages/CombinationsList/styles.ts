import styled from 'styled-components/native'

interface HeaderProps {
  background: string;
}

export const Header = styled.View<HeaderProps>`
  height: 60px;
  background: ${props => props.background};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  elevation: 1;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
`;

export const SaveButton = styled.TouchableOpacity`
`;

export const ShareButton = styled.TouchableOpacity`
  margin: 0 20px;
`;

export const SeeSavedCombinationsButton = styled.TouchableOpacity``;

export const TotalCombinationsText = styled.Text`
font-family: 'Arciform';
font-size: 16px;
color: #F0F0F7;

`;

export const CombinationsListText = styled.Text`
  font-family: 'Arciform';
  font-size: 16px;
  color: #666;
  margin-left: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
