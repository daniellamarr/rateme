import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import colors from '../styles/colors';

const Loader = ({color, size}) => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

Loader.defaultProps = {
  size: 'large',
  color: colors.white,
};

export default Loader;
