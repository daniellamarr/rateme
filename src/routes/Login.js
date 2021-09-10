/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import {
  Container,
  Content,
  Input,
  Button as NBButton,
  Icon,
  Toast,
} from 'native-base';
import {authStyle} from '../styles';
import Text from '../components/Text';
import Button from '../components/Button';
import Backdrop from '../components/Backdrop';
import Validation from '../helpers/Validation';
import {login} from '../api/auth';
// import {facebookSignIn, googleSignIn} from '../helpers/socialAuthentication';
import colors from '../styles/colors';
import AuthContext from '../components/AuthContext';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);

  const {signIn} = useContext(AuthContext);

  const socialAuth = async (type) => {
    let currentUser;
    if (type === 'facebook') {
      // currentUser = await facebookSignIn();
    } else if (type === 'google') {
      // currentUser = await googleSignIn();
    }
    console.log(JSON.stringify(currentUser));

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

  const handleLogin = async () => {
    try {
      const fields = [
        {name: 'email address', value: email},
        {name: 'password', value: password},
      ];

      const validation = Validation.checkEmptyFields(fields);
      if (validation.status === false) {
        return Toast.show({
          text: `Please enter your ${validation.errors.field}`,
          type: 'warning',
        });
      }

      setLoadingStatus(true);

      const response = await login({
        email,
        password,
      });
      if (response.status !== 200) {
        console.log(response.data)
        setLoadingStatus(false);
        return Toast.show({
          text: 'We could not sign you in at this time',
          type: 'danger',
        });
      }

      signIn({
        token: response.data.token,
        user: response.data.userDetails,
      });
      return Toast.show({
        text: 'Logged in successfully',
        type: 'success',
        duration: 5000,
        onClose: (reason = 'functionCall') => {
          // props.navigation.navigate('Dashboard');
        },
      });
    } catch (err) {
      setLoadingStatus(false);
      return Toast.show({
        text: 'We could not sign you in at this time',
        type: 'danger',
      });
    }
  };

  return (
    <Container style={authStyle.container}>
      <Content showsVerticalScrollIndicator={false}>
        <View style={authStyle.loginHeader}>
          <Text color="white" fontSize={40} fontType="font3" letterSpacing={2}>
            WELCOME
          </Text>
          <Text color="white" fontSize={15}>
            Sign in to get started
          </Text>
        </View>
        <View style={authStyle.formField}>
          <Input
            value={email}
            style={authStyle.input}
            placeholder="Email"
            placeholderTextColor={colors.white}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            onChangeText={(value) => setEmail(value)}
          />
          <Input
            value={password}
            style={authStyle.input}
            placeholder="Password"
            placeholderTextColor={colors.white}
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
          />
          <Button bgColor={colors.white} onPress={handleLogin}>
            <Text color={colors.primary}>Login</Text>
          </Button>
          <View style={{marginTop: 20}}>
            <Text
              color={colors.white}
              onPress={() => props.navigation.navigate('ForgotPassword')}>
              Forgot Password
            </Text>
          </View>
        </View>
        <View style={authStyle.signupOptions}>
          <Text color={colors.white} fontSize={15} style={{marginBottom: 25}}>
            Don't have an account?&nbsp;
            <Text onPress={() => props.navigation.navigate('Signup')}>
              Sign up
            </Text>
          </Text>
          <Text color={colors.white} fontSize={15} style={{marginBottom: 25}}>
            or
          </Text>
          <NBButton
            block
            rounded
            style={{
              backgroundColor: colors.white,
              marginBottom: 20,
            }}
            onPress={() => socialAuth('facebook')}>
            <Icon
              name="logo-facebook"
              style={{
                color: '#3b5598',
                marginRight: 30,
              }}
            />
            <Text color={colors.primary} fontSize={15}>
              Sign in using facebook
            </Text>
          </NBButton>
          <NBButton
            block
            rounded
            style={{
              backgroundColor: colors.white,
            }}
            onPress={() => socialAuth('google')}>
            <Icon
              name="logo-google"
              style={{
                color: '#db4437',
                marginRight: 40,
              }}
            />
            <Text color={colors.primary} fontSize={15}>
              Sign in using google
            </Text>
          </NBButton>
        </View>
      </Content>
      {loadingStatus && <Backdrop loader />}
    </Container>
  );
};

export default Login;
