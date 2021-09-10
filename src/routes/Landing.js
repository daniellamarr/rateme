import React from 'react';
import {View} from 'react-native';
import {Container, Icon, Toast} from 'native-base';
import {landingStyle, mainStyle, splashScreenStyle} from '../styles';
import Button from '../components/Button';
// import {facebookSignIn, googleSignIn} from '../helpers/socialAuthentication';
import Logo from '../components/Logo';
import Text from '../components/Text';
import colors from '../styles/colors';

const Landing = (props) => {
  const socialAuth = async (type) => {
    let currentUser;
    if (type === 'facebook') {
      // currentUser = await SocialAuthentication.facebookSignIn();
    } else if (type === 'google') {
      // currentUser = await SocialAuthentication.googleSignIn();
    }

    if (currentUser) {
      return Toast.show({
        text: 'Logged in successfully',
        type: 'success',
        duration: 5000,
        onClose: (reason = 'functionCall') => {
          props.navigation.navigate('Dashboard');
        },
      });
    }
  };

  return (
    <Container style={landingStyle.container}>
      <View style={splashScreenStyle.splashBox}>
        <Logo size={50} type="green" />
      </View>
      <View style={landingStyle.inner}>
        <Button
          bgColor={colors.white}
          style={landingStyle.button}
          onPress={() => props.navigation.navigate('Login')}>
          <Text color={colors.primary}>Login</Text>
        </Button>
        <View style={landingStyle.smallHeight} />
        <Button
          style={landingStyle.button}
          onPress={() => props.navigation.navigate('Signup')}>
          <Text color={colors.white}>Signup</Text>
        </Button>
        <View style={landingStyle.signupOptions}>
          <Text style={landingStyle.signupOptionsText}>or sign up with</Text>
          <View style={mainStyle.row}>
            <Icon
              name="logo-facebook"
              style={landingStyle.fbSocialIcon}
              onPress={() => socialAuth('facebook')}
            />
            <Icon
              name="logo-google"
              style={landingStyle.googleSocialIcon}
              onPress={() => socialAuth('google')}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Landing;
