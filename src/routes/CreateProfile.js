/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import {Container, Content, Input, Icon, Toast} from 'native-base';
import {authStyle} from '../styles';
import Text from '../components/Text';
import Button from '../components/Button';
import AppStorage from '../helpers/AppStorage';
import imageUpload from '../helpers/imageUpload';
import Backdrop from '../components/Backdrop';
import {updateUserProfile} from '../api/user';
import {galleryPicker} from '../helpers/imagePicker';
import colors from '../styles/colors';

const CreateProfile = (props) => {
  const [profile_img, setProfileImage] = useState('');
  const [bio, setBio] = useState('');
  const [imagePicker, setImagePicker] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const completeSignup = async () => {
    try {
      setLoadingStatus(true);
      const userDetails = await AppStorage.checkIfLoggedIn();

      let secureUrl;
      if (profile_img) {
        const upload = await imageUpload(profile_img);
        if (upload.status !== 400) {
          secureUrl = upload.data.secure_url;
        } else {
          return Toast.show({
            text: 'There was an error uploading your image',
            type: 'danger',
            duration: 5000,
          });
        }
      }

      const {data} = userDetails;
      const update = {
        bio,
        profile_img: secureUrl,
      };

      const response = await updateUserProfile(update, data.token);

      if (response.status !== 201) {
        const {message} = response.data;
        setLoadingStatus(false);
        return Toast.show({
          text: message,
          type: 'danger',
        });
      }

      return Toast.show({
        text: 'Thank you, your profile details have been saved',
        type: 'success',
        duration: 5000,
        onClose: (reason = 'functionCall') => {
          props.navigation.navigate('Dashboard');
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

  const selectImage = async () => {
    const image = await galleryPicker();

    if (image) {
      const imagePickerRender = renderImage(image);
      setProfileImage(image);
      setImagePicker(imagePickerRender);
    }
  };

  const renderImage = (image) => {
    return (
      <TouchableOpacity onPress={selectImage}>
        <Image style={authStyle.imageCircle} source={image} />
      </TouchableOpacity>
    );
  };

  return (
    <Container style={authStyle.container}>
      <Content>
        <View style={authStyle.authHeader}>
          <Text color={colors.white} fontSize={40} fontType="font3">
            CREATE PROFILE
          </Text>
          <Text color={colors.white} fontSize={15} fontType="font2">
            One last step. . .
          </Text>
        </View>
        <Slider
          minimumValue={0}
          maximumValue={100}
          value={100}
          step={25}
          minimumTrackTintColor={colors.secondary}
          maximumTrackTintColor={colors.white}
          thumbTintColor={colors.secondary}
        />
        <View style={authStyle.uploadBox}>
          {imagePicker ? (
            imagePicker
          ) : (
            <TouchableOpacity
              style={authStyle.uploadCircle}
              onPress={selectImage}>
              <Icon
                name="camera"
                android="md-camera"
                ios="ios-camera"
                style={{
                  fontSize: 50,
                }}
              />
              <Text fontSize={13} color={colors.grayAA}>
                Upload Profile Picture
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={authStyle.formField}>
          <Input
            style={authStyle.input}
            placeholder="Add Bio"
            placeholderTextColor={colors.white}
            onChangeText={(value) => setBio(value)}
          />
        </View>
      </Content>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '48%', marginRight: '2%'}}>
          <Button
            buttonType="white"
            block
            rounded
            onPress={() => props.navigation.navigate('Dashboard')}>
            Skip
          </Button>
        </View>
        <View style={{width: '50%'}}>
          <Button bgColor={colors.white} onPress={completeSignup}>
            <Text color={colors.primary}>Finish</Text>
          </Button>
        </View>
      </View>
      {loadingStatus && (
        <Backdrop loader={true} loadingText="creating user profile" />
      )}
    </Container>
  );
};

export default CreateProfile;
