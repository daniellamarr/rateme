import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import Slider from '@react-native-community/slider';
import {Container, Content, Input, Toast} from 'native-base';
import {authStyle} from '../styles';
import Text from '../components/Text';
import Button from '../components/Button';
import Backdrop from '../components/Backdrop';
import Validation from '../helpers/Validation';
import AuthContext from '../components/AuthContext';
import {signup} from '../api/auth';
import colors from '../styles/colors';

const CreatePassword = (props) => {
  const {registration} = props.route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);

  const {signIn} = useContext(AuthContext);

  const createPassword = async () => {
    try {
      const passwordCheck = Validation.passwordCheck(
        password,
        confirmPassword,
        6,
      );

      if (!passwordCheck.status) {
        return Toast.show({
          text: passwordCheck.error,
          type: 'warning',
        });
      }

      setLoadingStatus(true);
      const response = await signup({
        ...registration,
        password: password,
      });

      if (response.status !== 201) {
        const {message} = response.data;
        setLoadingStatus(false);
        return Toast.show({
          text: message,
          type: 'danger',
        });
      }

      await signIn({
        token: response.data.token,
        user: response.data.userDetails,
      });
      return Toast.show({
        text: `Hi ${registration.first_name}, please create a profile to continue`,
        type: 'success',
        duration: 5000,
        onClose: (reason = 'functionCall') => {
          props.navigation.navigate('CreateProfile');
        },
      });
    } catch (err) {
      Toast.show({
        text: 'There was a problem with this request, please try again',
        type: 'danger',
        duration: 5000,
      });
    }
  };

  return (
    <Container style={authStyle.container}>
      <Content>
        <View style={authStyle.authHeader}>
          <Text color={colors.white} fontSize={40} fontType="font3">
            CREATE PASSWORD
          </Text>
          <Text color={colors.white} fontSize={15} fontType="font2">
            Create your password below
          </Text>
        </View>
        <Slider
          minimumValue={0}
          maximumValue={100}
          value={75}
          step={25}
          minimumTrackTintColor={colors.secondary}
          maximumTrackTintColor={colors.white}
          thumbTintColor={colors.secondary}
        />
        <View style={authStyle.formField}>
          <Input
            style={authStyle.input}
            placeholder="Enter Password*"
            placeholderTextColor={colors.white}
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
          />
          <Input
            style={authStyle.input}
            placeholder="Re-enter Password*"
            placeholderTextColor={colors.white}
            secureTextEntry={true}
            onChangeText={(value) => setConfirmPassword(value)}
          />
        </View>
      </Content>
      <Button bgColor={colors.white} onPress={createPassword}>
        <Text color={colors.primary}>Next</Text>
      </Button>
      {loadingStatus && (
        <Backdrop loader={true} loadingText="setting up account..." />
      )}
    </Container>
  );
};

export default CreatePassword;
