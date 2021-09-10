import React from 'react';
import {View, Image} from 'react-native';
import {Container} from 'native-base';

import {splashScreenStyle} from '../styles';
import Logo from '../components/Logo';
import Text from '../components/Text';

const SplashScreen = () => {
  return (
    <Container style={splashScreenStyle.container}>
      <View style={splashScreenStyle.splashBox}>
        <Logo size={50} type="white" />
      </View>
      <View style={splashScreenStyle.sgkAd}>
        <Text>Supported by</Text>
        <Image
          source={require('../assets/images/SGK_Large.png')}
          style={splashScreenStyle.sgkAdImage}
        />
      </View>
    </Container>
  );
};

export default SplashScreen;
