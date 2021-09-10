/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image} from 'react-native';
import Text from './Text';

const ImageTextButton = ({image, text}) => {
  const renderImage = () => {
    if (image) {
      return (
        <Image
          source={{uri: this.props.image}}
          style={{height: 30, width: 30, borderRadius: 15, marginRight: 10}}
        />
      );
    } else {
      return (
        <Image
          source={require('../assets/images/dummy-user.png')}
          style={{height: 30, width: 30, borderRadius: 15, marginRight: 10}}
        />
      );
    };
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#eeeeee',
        borderRadius: 30,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 15,
        alignSelf: 'flex-start',
        marginRight: 10,
      }}>
      {renderImage()}
      <Text style={{marginTop: 3}}>{text}</Text>
    </View>
  );
};

export default ImageTextButton;
