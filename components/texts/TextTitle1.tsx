import React from 'react';
import { View, Text, StyleProp, TextStyle, ViewStyle } from 'react-native';

interface Props {
  label: string;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const TextTitle1: React.FC<Props> = ({ label, textStyle, containerStyle }) => {
  return (
    <View style={containerStyle}>
      <Text
        style={[
          {
            fontFamily: "poppinsSemiBold",
            fontSize: 24,
            color: "black",
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

export default TextTitle1;
