/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {List, ListItem, Left, Thumbnail, Body, Right} from 'native-base';
import Text from './Text';
import PostResult from './PostResult';
import Button from './Button';
import colors from '../styles/colors';
import AppStorage from '../helpers/AppStorage';

const SearchResult = ({
  result,
  type,
  showFollow,
  followerCheck,
  followUser,
  unfollowUser,
  navigation,
}) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    initUserId();
  }, []);

  const initUserId = async () => {
    const data = await AppStorage.getUserData();
    setUserId(data?.id);
  };

  const renderProfileImage = () => {
    let thumbnail;
    const {profile_img} = result;
    if (!profile_img) {
      thumbnail = (
        <Thumbnail
          small
          circular
          source={require('../assets/images/dummy-user.png')}
        />
      );
    } else {
      thumbnail = (
        <Thumbnail
          small
          circular
          source={{uri: profile_img, cache: 'force-cache'}}
        />
      );
    }

    return thumbnail;
  };

  const renderSearchUser = () => {
    const {id, first_name, last_name, username} = result;
    return (
      <List>
        <ListItem
          thumbnail
          onPress={() =>
            navigateToProfile({
              id,
              first_name,
              last_name,
            })
          }>
          <Left>{renderProfileImage()}</Left>
          <Body>
            <Text fontSize={13}>
              {first_name} {last_name}
            </Text>
            <Text color={colors.gray33} fontSize={11} note numberOfLines={1}>
              {username}
            </Text>
          </Body>
          {showFollow && (
            <Right>
              {userId !== id && (
                <Button
                  style={{paddingTop: 10, paddingBottom: 10}}
                  small
                  fontSize={14}
                  backgroundColor={followerCheck ? '#AAAAAA' : colors.primary}
                  onPress={() => {
                    followerCheck
                      ? handleUnfollowUser(id)
                      : handleFollowUser(id);
                  }}>
                  <Text color={colors.white}>
                    {followerCheck ? 'Following' : 'Follow'}
                  </Text>
                </Button>
              )}
            </Right>
          )}
        </ListItem>
      </List>
    );
  };

  const renderSearchPost = () => {
    const {
      id,
      image_url,
      user_id,
      title,
      average_rating,
      user,
      createdAt,
    } = result;
    return (
      <PostResult
        key={id}
        postId={id}
        id={user_id}
        title={title}
        image_url={image_url}
        average_rating={average_rating}
        user={user}
        first_name={user.first_name}
        last_name={user.last_name}
        username={user.username}
        profile_img={user.profile_img}
        date={createdAt}
        navigation={navigation}
      />
    );
  };

  const navigateToProfile = (user) => {
    navigation.push('UserProfile', {
      user,
    });
  };

  const handleFollowUser = (id) => {
    followUser(id);
    // this.setState({ followerCheck: !this.state.followerCheck });
  };

  const handleUnfollowUser = (id) => {
    unfollowUser(id);
    // this.setState({ followerCheck: !this.state.followerCheck });
  };

  return (
    <View>{type === 'user' ? renderSearchUser() : renderSearchPost()}</View>
  );
};

export default SearchResult;
