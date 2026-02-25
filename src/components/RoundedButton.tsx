import React from 'react';
import {
  TouchableOpacity,
  Text, ViewStyle, TextStyle
} from 'react-native';
import { colors } from '../utils/colors';


type RoundedButtonProps = {
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: number;
  title: string;
  onPress: () => void;
}

const getStyles = (size: number) => ({
  radius: {
    borderRadius: size / 2,
    width: size,
    height: size,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderColor: colors.white,
    borderWidth: 2
  },
  text: {
    color: colors.white,
    fontSize: size / 3.5,
    fontWeight: '700' as const
  },
});


export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 100,
  title,
  onPress
}: RoundedButtonProps) => {
  return (
    <TouchableOpacity
      style={[getStyles(size).radius, style]}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <Text style={[getStyles(size).text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
