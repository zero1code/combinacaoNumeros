import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Ball, BallText } from './styles';

interface BallsProps extends TouchableOpacityProps {
  children: string;
  background: string;
  borderColor: string;
  textColor: string;
}

const Balls: React.FC<BallsProps> = ({ background, borderColor, children, textColor, ...rest }) => (
  <Ball
    {...rest}
    activeOpacity={0.5}
    background={background}
    borderColor={borderColor}
  >
    <BallText textColor={textColor}>{children}</BallText>
  </Ball>
);

export default Balls;
