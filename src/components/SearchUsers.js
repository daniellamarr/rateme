/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {List, ListItem, Left, Thumbnail, Body} from 'native-base';
import Text from '../components/Text';

const SearchUsers = ({result, tagUsers, taggedUsers}) => {
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
      thumbnail = <Thumbnail small circular source={{uri: profile_img}} />;
    }

    return thumbnail;
  };

  const renderSearchUser = () => {
    const {id, first_name, last_name, username, profile_img} = result;
    const findUser = taggedUsers.find((item) => item.id === result.id);
    const listColor = findUser ? '#eeeeee' : '#ffffff';
    return (
      <List>
        <ListItem
          thumbnail
          onPress={() =>
            handleTagUsers({id, first_name, last_name, username, profile_img})
          }
          style={{backgroundColor: listColor, marginLeft: -5, paddingLeft: 30}}>
          <Left>{renderProfileImage()}</Left>
          <Body>
            <Text fontSize={13}>
              {first_name} {last_name}
            </Text>
            <Text fontSize={11} note numberOfLines={1}>
              {username}
            </Text>
          </Body>
        </ListItem>
      </List>
    );
  };

  const handleTagUsers = (user) => {
    tagUsers(user);
  };

  return <View>{renderSearchUser()}</View>;
};

export default SearchUsers;
