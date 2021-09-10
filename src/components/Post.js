/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {ListItem, Body, Left, Thumbnail, Icon, Input} from 'native-base';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
import Text from '../components/Text';
import {dashboardStyle, postStyle} from '../styles';
import colors from '../styles/colors';
import Comments from './Comments';
import {dislikePost, likePost} from '../api/post';
import {createComment, fetchComments} from '../api/comment';

const Post = ({
  navigation,
  id,
  firstname,
  surname,
  username,
  profile_img,
  image_url,
  title,
  postId,
  location,
  date,
  textColor,
  userLike,
  userDislike,
  reloadPost,
  average_rating,
  likesCount,
  page,
}) => {
  const [newComment, setNewComment] = useState('');
  const [likeColor, setLikeColor] = useState(colors.grayAA);
  const [dislikeColor, setDislikeColor] = useState(colors.grayAA);
  const [numberOfComments, setNumberOfComments] = useState('');
  const [comments, setComments] = useState([]);
  const [showIcons, setShowIcons] = useState(true);

  useEffect(() => {
    handleFetchComments();
  }, []);

  useEffect(() => {
    if (userLike === '0') {
      setLikeColor(colors.grayAA);
    } else if (userLike === '1') {
      setLikeColor(colors.primary);
    }

    if (userDislike === '0') {
      setDislikeColor(colors.grayAA);
    } else if (userDislike === '1') {
      setDislikeColor(colors.red);
    }
  }, [userDislike, userLike]);

  const handleFetchComments = async () => {
    try {
      let limit = 2,
        lastId = 10000000;
      const response = await fetchComments(postId, lastId, limit);
      setComments(response.data?.getComments);
      setNumberOfComments(response.data?.commentsGrandTotal);
    } catch (err) {
      console.log(err);
    }
  };

  const createCommentRequest = async () => {
    try {
      setNewComment('');
      const response = await createComment(
        {
          body: newComment,
        },
        postId,
      );
      handleFetchComments();
    } catch (err) {
      console.log(err);
    }
  };

  const navigateToProfile = async (user) => {
    navigation.navigate('UserProfile', {
      user,
    });
  };

  const likeUnlikePost = async () => {
    if (userLike === '0') {
      setLikeColor(colors.primary);
      setDislikeColor(colors.grayAA);
    } else if (userLike === '1') {
      setLikeColor(colors.grayAA);
      setDislikeColor(colors.grayAA);
    }
    const response = await likePost(postId);
    // if (response.status === 201) {
    reloadPost();
    // likeDislikeColor();
    // }
    // setTimeout(() => likeDislikeColor(), 1000);
  };

  const dislikeUnDislikePost = async () => {
    if (userDislike === '0') {
      setDislikeColor(colors.red);
      setLikeColor(colors.grayAA);
    } else if (userDislike === '1') {
      setDislikeColor(colors.grayAA);
      setLikeColor(colors.grayAA);
    }
    const response = await dislikePost(postId);
    // if (response.status === 201) {
    reloadPost();
    // }
    // setTimeout(() => likeDislikeColor(), 1000);
  };

  const likeDislikeColor = () => {
    // this.setState({
    //   likesCount: this.props.likesCount,
    //   average_rating: this.props.average_rating,
    // });
    if (userLike === '0') {
      setLikeColor(colors.grayAA);
    } else if (userLike === '1') {
      setLikeColor(colors.primary);
    }

    if (userDislike === '0') {
      setDislikeColor(colors.grayAA);
    } else if (userDislike === '1') {
      setDislikeColor(colors.red);
    }
  };

  const handleViewRef = useRef(null);

  const toggleShowIcon = async () => {
    showIcons && handleViewRef.current?.fadeOut(300);
    setShowIcons(!showIcons);
    setTimeout(
      async () => showIcons && (await handleViewRef.current?.tada(800)),
      100,
    );
  };

  const color = textColor || 'white';

  return (
    <View style={dashboardStyle.postContainer}>
      <View>
        <ListItem
          thumbnail
          onPress={() =>
            navigateToProfile({
              id,
              first_name: firstname,
              last_name: surname,
              username,
              profile_img,
            })
          }>
          <Left>
            {profile_img ? (
              <Thumbnail
                circular
                source={{uri: profile_img, cache: 'force-cache'}}
              />
            ) : (
              <Thumbnail
                circular
                source={require('../assets/images/dummy-user.png')}
              />
            )}
          </Left>
          <Body>
            <Text color={color}>{username}</Text>
            <Text note numberOfLines={1} color={color}>
              {location}
            </Text>
          </Body>
        </ListItem>
      </View>
      <TouchableWithoutFeedback onPress={toggleShowIcon}>
        <ImageBackground
          source={{uri: image_url, cache: 'force-cache'}}
          style={postStyle.postImage}
          imageStyle={postStyle.postImage}>
          {showIcons && (
            <Animatable.View
              ref={handleViewRef}
              style={postStyle.postButtonsView}
              iterationCount={1}
              direction="alternate">
              <TouchableOpacity
                style={[postStyle.postButton, {backgroundColor: colors.white}]}
                onPress={likeUnlikePost}>
                <Icon
                  name="thumbs-up"
                  android="md-thumbs-up"
                  ios="ios-thumbs-up"
                  style={{
                    color: likeColor,
                  }}
                  onPress={likeUnlikePost}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  postStyle.postButton,
                  {backgroundColor: colors.white, marginRight: 0},
                ]}
                onPress={dislikeUnDislikePost}>
                <Icon
                  name="thumbs-down"
                  android="md-thumbs-down"
                  ios="ios-thumbs-down"
                  style={{
                    color: dislikeColor,
                  }}
                  onPress={dislikeUnDislikePost}
                />
              </TouchableOpacity>
            </Animatable.View>
          )}
        </ImageBackground>
      </TouchableWithoutFeedback>
      <View style={postStyle.rateSection}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginRight: 10}}>
            <Icon name="star" style={{color: colors.grayAA, fontSize: 18}} />
            &nbsp;
            <Text style={{marginTop: -15}}>{parseInt(average_rating, 10)}</Text>
          </Text>
          <Text onPress={() => navigation.navigate('AllComments', {postId})}>
            <Icon
              name="comment"
              type="MaterialIcons"
              style={{
                color: colors.black,
                marginRight: 20,
                fontSize: 18,
              }}
            />
            &nbsp;&nbsp;
            <Text style={{marginTop: -15}}>{numberOfComments}</Text>
          </Text>
        </View>
        <View>
          <Text>
            <Text
              onPress={() =>
                navigateToProfile({
                  id,
                  first_name: firstname,
                  last_name: surname,
                  username,
                  profile_img,
                })
              }>
              {username}
            </Text>
            &nbsp;&nbsp;
            <Text color="#333333" fontSize={12}>
              {title}
            </Text>
          </Text>
          {comments?.length > 0 &&
            comments.map((comment, index) => (
              <Comments key={index} comment={comment} navigation={navigation} />
            ))}
          {numberOfComments > 0 && (
            <TouchableOpacity
              style={{marginTop: 10}}
              onPress={() => navigation.navigate('AllComments', {postId})}>
              <Text fontSize={11}>View all comments</Text>
            </TouchableOpacity>
          )}
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Input
              style={[postStyle.postInput, postStyle.commentInput]}
              placeholder="Add a comment"
              autoCorrect={false}
              defaultValue={newComment}
              onChangeText={(text) => setNewComment(text)}
              returnKeyLabel="Send"
              returnKeyType="send"
            />
            <Icon
              name="send"
              android="md-send"
              ios="ios-send"
              style={{
                left: -50,
              }}
              onPress={createCommentRequest}
            />
          </View>
          <Text
            color="#333333"
            fontSize={10}
            style={{
              marginTop: 10,
            }}>
            {moment(date).fromNow()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Post;
