import React from 'react';
import {Body, Left, ListItem, Thumbnail} from 'native-base';
import Text from './Text';
import colors from '../styles/colors';
import {markAsRead} from '../api/notification';
import {notificationStyle} from '../styles';

const Notify = ({notify, navigation}) => {
  const renderPhoto = () => {
    let photo;
    const {item, results} = notify;
    if (
      item?.type === 'comment' ||
      item?.type === 'newPost' ||
      item?.type === 'rating'
    ) {
      photo = (
        <Thumbnail
          circular
          small
          source={{uri: results?.image_url, cache: 'force-cache'}}
        />
      );
    } else if (item?.type === 'newFollower') {
      if (results?.profile_img) {
        photo = (
          <Thumbnail
            circular
            small
            source={{uri: results?.profile_img, cache: 'force-cache'}}
          />
        );
      } else {
        photo = (
          <Thumbnail
            circular
            small
            source={require('../assets/images/dummy-user.png')}
          />
        );
      }
    }

    return photo;
  };

  const renderText = () => {
    let text;
    const {item} = notify;
    if (
      item?.type === 'comment' ||
      item?.type === 'newPost' ||
      item?.type === 'rating'
    ) {
      text = (
        <Body>
          <Text fontSize={16}>New activity on your post</Text>
          <Text color={colors.grayAA} fontSize={13} note numberOfLines={1}>
            {item.body}
          </Text>
        </Body>
      );
    } else if (item.type === 'newFollower') {
      text = (
        <Body>
          <Text fontSize={13}>{item.body}</Text>
        </Body>
      );
    }

    return text;
  };

  const clickAction = () => {
    const {item, results} = notify;
    handleMarkAsRead(item?.id);
    if (
      item?.type === 'comment' ||
      item?.type === 'newPost' ||
      item?.type === 'rating'
    ) {
      navigation.navigate('SinglePost', {postId: results?.id});
    } else if (item.type === 'newFollower') {
      navigation.navigate('UserProfile', {user: results});
    }
  };

  const handleMarkAsRead = async (id) => {
    await markAsRead(id);
  };

  return (
    <ListItem
      thumbnail
      style={[
        notificationStyle.listItem,
        {
          backgroundColor:
            notify?.item?.status === 'unread' ? colors.white : colors.grayFA,
        },
      ]}
      onPress={clickAction}>
      <Left>{renderPhoto()}</Left>
      {renderText()}
    </ListItem>
  );
};

export default Notify;
