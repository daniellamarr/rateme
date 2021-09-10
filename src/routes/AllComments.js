/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  Text as NBText,
  Input,
  Icon,
} from 'native-base';
import Text from '../components/Text';
import {mainStyle, postStyle} from '../styles';
import Loader from '../components/Loader';
import colors from '../styles/colors';
import {fetchComments, createComment} from '../api/comment';

const AllComments = (props) => {
  const {postId} = props.route.params;
  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [numberOfComments, setNumberOfComments] = useState(0);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    handleFetchComments();
  }, []);

  const handleCreateComment = async () => {
    try {
      const response = await createComment(
        {
          body: newComment,
        },
        postId,
      );
      setNewComment('');
      handleFetchComments();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFetchComments = async () => {
    try {
      let limit = 1000,
        lastId = 1000;
      const response = await fetchComments(postId, lastId, limit);
      setComments(response.data?.getComments);
      setCommentsLoaded(true);
      setNumberOfComments(response.data?.commentsGrandTotal);
    } catch (err) {
      console.log(err);
    }
  };

  const navigateToProfile = async (user) => {
    props.navigation.navigate('UserProfile', {
      user,
    });
  };

  return (
    <Container>
      <Content>
        <View style={[postStyle.viewHeight]}>
          {comments?.length > 0 && (
            <Text color={colors.grayAA} style={{marginLeft: 15, marginTop: 10}}>
              {numberOfComments} Comments
            </Text>
          )}
          <List>
            {commentsLoaded ? (
              comments?.length > 0 ? (
                comments.map((comment) => {
                  return (
                    <ListItem key={comment.id} avatar>
                      <Left>
                        <TouchableOpacity
                          onPress={() => navigateToProfile(comment.user)}>
                          {comment.user.profile_img ? (
                            <Thumbnail
                              circular
                              small
                              source={{
                                uri: comment.user.profile_img,
                                cache: 'force-cache',
                              }}
                            />
                          ) : (
                            <Thumbnail
                              circular
                              small
                              source={require('../assets/images/dummy-user.png')}
                            />
                          )}
                        </TouchableOpacity>
                      </Left>
                      <Body style={{borderBottomColor: 'transparent'}}>
                        <Text
                          fontSize={14}
                          style={{fontWeight: 'bold'}}
                          onPress={() => navigateToProfile(comment.user)}>
                          {comment.user.username}
                        </Text>
                        <NBText note style={{fontSize: 13}}>
                          {comment.body}
                        </NBText>
                      </Body>
                      <Right style={{borderBottomColor: 'transparent'}}>
                        <NBText note>
                          {moment(comment.createdAt).fromNow()}
                        </NBText>
                      </Right>
                    </ListItem>
                  );
                })
              ) : (
                <View style={{alignItems: 'center', marginTop: 10}}>
                  <Text color={colors.grayAA}>No comments yet</Text>
                </View>
              )
            ) : (
              <Loader color={colors.primary} />
            )}
          </List>
        </View>
      </Content>
      <View style={postStyle.commentInputView}>
        <Input
          style={[postStyle.postInput, postStyle.commentInput]}
          placeholder="Add a comment"
          autoCorrect={false}
          defaultValue={newComment}
          onChangeText={(value) => setNewComment(value)}
          returnKeyLabel="Send"
          returnKeyType="send"
          onSubmitEditing={handleCreateComment}
        />
        <Icon
          name="send"
          android="md-send"
          ios="ios-send"
          style={{
            left: -50,
            zIndex: 100000,
          }}
          onPress={handleCreateComment}
        />
      </View>
    </Container>
  );
};

export default AllComments;
