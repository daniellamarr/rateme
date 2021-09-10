import React from 'react';
import {View} from 'react-native';
import {mainStyle} from '../styles';
import colors from '../styles/colors';
import Loader from './Loader';
import Text from './Text';

const Backdrop = (props) => {
  return (
    <View style={mainStyle.backdrop}>
      <View style={mainStyle.backdropLoader}>
        {props.loader && <Loader />}
        {props.loadingText && (
          <View>
            <Text color={colors.white}>{props.loadingText}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Backdrop;
