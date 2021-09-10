/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text as RNText} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const Text = (props) => {
  return (
    <RNText
      {...props}
      style={{
        ...props.style,
        color: props.color,
        fontSize: props.fontSize,
        fontFamily: props.fontFamily,
        fontWeight: props.fontWeight,
        textAlign: props.center ? 'center' : 'left',
      }}>
      {props.children}
    </RNText>
  );
};

Text.defaultProps = {
  color: colors.black,
  fontSize: 15,
  fontFamily: fonts.primary,
  fontWeight: '300',
  center: false,
};

export default Text;
