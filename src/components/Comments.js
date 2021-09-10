/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import Text from './Text';

const Comments = ({comment, navigation}) => {
  const navigateToProfile = async (user) => {
    navigation.navigate('UserProfile', {
      user,
    });
  };

  return (
    <View>
      <View
        key={comment.id}
        style={{
          marginTop: 5,
        }}>
        <Text>
          <Text fontSize={13} onPress={() => navigateToProfile(comment.user)}>
            {comment.user.username}
          </Text>
          &nbsp;&nbsp;
          <Text fontSize={11} color="#333333">
            {comment.body}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Comments;
