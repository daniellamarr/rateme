/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Container, Content, Input, Icon, Toast, Textarea} from 'native-base';
import {authStyle} from '../styles';
import Text from '../components/Text';
import Button from '../components/Button';
import {galleryPicker} from '../helpers/imagePicker';
import AppStorage from '../helpers/AppStorage';
import imageUpload from '../helpers/imageUpload';
import Backdrop from '../components/Backdrop';
import {updateUserProfile} from '../api/user';
import colors from '../styles/colors';

const EditProfile = (props) => {
  const [profile_img, setProfileImage] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [bio, setBio] = useState('');
  const [user, setUser] = useState('');
  const [imagePicker, setImagePicker] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {
    currentUserDetails();
  }, []);

  const currentUserDetails = async () => {
    const userDetails = await AppStorage.getUserData();
    setUser(userDetails);
    setFirstname(userDetails?.first_name);
    setLastname(userDetails?.last_name);
    setBio(userDetails?.bio);
  };

  const updateProfile = async () => {
    try {
      setLoadingStatus(true);

      let imageUrl;
      if (profile_img) {
        const upload = await imageUpload(profile_img);
        if (upload.status !== 400) {
          imageUrl = upload.data.secure_url;
        } else {
          return Toast.show({
            text: 'There was an error uploading your image',
            type: 'danger',
            duration: 5000,
          });
        }
      }

      const response = await updateUserProfile({
        first_name,
        last_name,
        bio,
        profile_img: imageUrl,
      });

      if (response.status !== 201) {
        const {message} = response.data;
        setLoadingStatus(false);
        return Toast.show({
          text: message,
          type: 'danger',
        });
      }
      await AppStorage.updateUserData(response?.data.updatedDetail);
      setLoadingStatus(false);
      return Toast.show({
        text: 'Thank you, your profile details has been updated',
        type: 'success',
        duration: 1000,
        onClose: (reason = 'functionCall') => {
          props.navigation.navigate('UserProfile');
        },
      });
    } catch (err) {
      Toast.show({
        text: 'Oops, seems like something went wrong',
        type: 'danger',
      });
    }
  };

  const selectImage = async () => {
    const image = await galleryPicker('photo');

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
            Hey {user?.first_name}
          </Text>
          <Text color={colors.white} fontSize={15} fontType="font2">
            Please edit your profile below. . .
          </Text>
        </View>
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
              <Text fontSize={13} color="gray">
                Upload Profile Picture
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={authStyle.formField}>
          <Input
            style={authStyle.input}
            placeholder="Firstname"
            placeholderTextColor={colors.white}
            defaultValue={user?.first_name}
            onChangeText={(value) => setFirstname(value)}
          />
          <Input
            style={authStyle.input}
            placeholder="Surname"
            placeholderTextColor={colors.white}
            defaultValue={user?.last_name}
            onChangeText={(value) => setLastname(value)}
          />
          <Textarea
            style={authStyle.input}
            placeholder="Your Bio"
            placeholderTextColor={colors.white}
            defaultValue={user?.bio}
            onChangeText={(value) => setBio(value)}
          />
        </View>
      </Content>
      <Button bgColor={colors.white} onPress={updateProfile}>
        <Text color={colors.primary}>Update</Text>
      </Button>
      {loadingStatus && <Backdrop loader loadingText="updating user profile" />}
    </Container>
  );
};

export default EditProfile;
