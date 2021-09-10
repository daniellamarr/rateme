/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import colors from '../styles/colors';
import Text from './Text';

const Logo = ({type, size}) => {
  return (
    <Text>
      <Text
        style={{fontStyle: 'italic'}}
        fontSize={size}
        color={type === 'green' ? colors.primary : colors.white}>
        rate
      </Text>
      <Text
        fontSize={size}
        color={colors.secondary}
        style={{fontStyle: 'italic'}}>
        me
      </Text>
    </Text>
  );
};

Logo.defaultProps = {
  type: 'green',
  size: 40,
};

export default Logo;
