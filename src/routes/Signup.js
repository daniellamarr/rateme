import React, {useState} from 'react';
import {Platform, View, TouchableOpacity} from 'react-native';
import {Container, Content, Input, Toast} from 'native-base';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {authStyle} from '../styles';
import Text from '../components/Text';
import Button from '../components/Button';
import Validation from '../helpers/Validation';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const Signup = (props) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState(moment().subtract(18, 'years').toDate());
  const [dobOpen, setDobOpen] = useState(false);

  const handleSignup = async () => {
    const fields = [
      {name: 'firstname', value: first_name},
      {name: 'surname', value: last_name},
      {name: 'username', value: username},
      {name: 'email address', value: email},
      {name: 'phone number', value: phone},
      {name: 'date of birth', value: dob},
    ];

    const validation = Validation.checkEmptyFields(fields);
    if (validation.status === false) {
      return Toast.show({
        text: `Please enter your ${validation.errors.field}`,
        type: 'warning',
      });
    }

    const validateEmail = Validation.validateEmail(email);
    if (validateEmail === false) {
      return Toast.show({
        text: 'Your email address is invalid',
        type: 'warning',
      });
    }

    if (phone?.length < 8 || isNaN(phone)) {
      return Toast.show({
        text: 'Your phone number is invalid',
        type: 'warning',
      });
    }

    props.navigation.navigate('CreatePassword', {
      registration: {
        first_name,
        last_name,
        username,
        email,
        phone,
        dob: moment(dob).format('DD/MMM/YYYY'),
      },
    });
  };

  return (
    <Container style={authStyle.container}>
      <Content showsVerticalScrollIndicator={false}>
        <View style={authStyle.authHeader}>
          <Text color={colors.white} fontSize={40} fontType="font3">
            SIGN UP
          </Text>
          <Text color={colors.white} fontSize={15} fontType="font2">
            Enter your details to get started
          </Text>
        </View>
        <Slider
          minimumValue={0}
          maximumValue={100}
          value={25}
          step={25}
          minimumTrackTintColor={colors.secondary}
          maximumTrackTintColor={colors.white}
          thumbTintColor={colors.secondary}
        />
        <View style={authStyle.formField}>
          <Input
            style={authStyle.input}
            placeholder="Firstname*"
            placeholderTextColor={colors.white}
            onChangeText={(value) => setFirstName(value)}
            autoCompleteType="off"
            autoCorrect={false}
          />
          <Input
            style={authStyle.input}
            placeholder="Surname*"
            placeholderTextColor={colors.white}
            onChangeText={(value) => setLastName(value)}
            autoCompleteType="off"
            autoCorrect={false}
          />
          <Input
            style={authStyle.input}
            placeholder="Username*"
            placeholderTextColor={colors.white}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            onChangeText={(value) => setUsername(value)}
          />
          <Input
            style={authStyle.input}
            placeholder="Email*"
            placeholderTextColor={colors.white}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            onChangeText={(value) => setEmail(value)}
          />
          <Input
            style={authStyle.input}
            placeholder="Phone Number*"
            placeholderTextColor={colors.white}
            keyboardType="phone-pad"
            onChangeText={(value) => setPhone(value)}
          />
          <TouchableOpacity
            style={[authStyle.input, authStyle.dobButton]}
            onPress={() => setDobOpen(!dobOpen)}>
            <Text
              color={colors.white}
              fontFamily={fonts.secondary}
              fontSize={14}>
              {moment(dob).format('DD/MMM/YYYY')}
            </Text>
          </TouchableOpacity>
          {dobOpen && (
            <DateTimePicker
              value={dob}
              mode="date"
              maximumDate={moment().subtract(18, 'years').toDate()}
              display="default"
              onChange={(e, d) => {
                setDobOpen(Platform.OS === 'ios');
                d && setDob(d);
              }}
            />
          )}
        </View>
      </Content>
      <Button bgColor={colors.white} onPress={handleSignup}>
        <Text color={colors.primary}>Next</Text>
      </Button>
    </Container>
  );
};

export default Signup;
