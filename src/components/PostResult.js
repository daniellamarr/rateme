import React from 'react';
import {View, ImageBackground, Image, TouchableOpacity} from 'react-native';
import Text from './Text';
import {searchStyle} from '../styles';
import colors from '../styles/colors';

const PostResult = ({
  postId,
  image_url,
  id,
  first_name,
  last_name,
  username,
  profile_img,
  navigation,
}) => {
  const navigateToProfile = () => {
    navigation.navigate('UserProfile', {
      user: {
        id,
        firstname: first_name,
        surname: last_name,
        username,
      },
    });
  };

  const renderProfileImage = () => {
    let thumbnail;
    if (!profile_img) {
      thumbnail = (
        <Image
          source={require('../assets/images/dummy-user.png')}
          style={searchStyle.userPhoto}
        />
      );
    } else {
      thumbnail = (
        <Image
          source={{uri: profile_img, cache: 'force-cache'}}
          style={searchStyle.userPhoto}
        />
      );
    }

    return thumbnail;
  };

  return (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate('SinglePost', {postId})}>
      <ImageBackground
        source={{
          uri: image_url,
        }}
        style={searchStyle.imageBackground}>
        <View style={searchStyle.backgroundInner}>
          <TouchableOpacity
            style={searchStyle.userDetails}
            onPress={navigateToProfile}>
            {renderProfileImage()}
            <Text
              color={colors.white}
              style={searchStyle.userFullname}
              onPress={navigateToProfile}>
              {first_name} {last_name}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default PostResult;
