import styled, { css } from 'styled-components/native';

interface BallsProps {
  background: string;
  borderColor: string;
}

interface BallTextProps {
  textColor: string;
}

export const Ball = styled.TouchableOpacity<BallsProps>`
width: 45px;
height: 45px;
border-width: 2px;
border-radius: 50px;
align-items: center;
justify-content: center;
margin: 5px;
background-color: ${props => props.background};
border-color: ${props => props.borderColor};

${props => props.borderColor === '#fff' &&
  css`
    elevation: 1;
  `
}

`;

export const BallText = styled.Text<BallTextProps>`
  font-family: 'Arciform';
  color: ${props => props.textColor};
`;
