import React, {useState, useEffect} from 'react';
import {Container, Content} from 'native-base';
import Post from '../components/Post';
import Loader from '../components/Loader';
import AppFooter from '../components/AppFooter';
import {fetchSinglePost} from '../api/post';
import colors from '../styles/colors';

const SinglePost = (props) => {
  const {postId} = props.route.params;
  const [post, setPost] = useState({});
  const [postLoaded, setPostLoaded] = useState(false);

  useEffect(() => {
    handleFetchSinglePost();
  });

  const handleFetchSinglePost = async () => {
    const response = await fetchSinglePost(postId);

    if (response.status === 200) {
      const {post: singlePost} = response.data;

      setPost(singlePost);
      setPostLoaded(true);
    }
  };

  const reloadPost = () => {
    handleFetchSinglePost();
  };

  return (
    <Container>
      <Content>
        {postLoaded ? (
          <Post
            key={post.id}
            postId={post.id}
            id={post.user_id}
            firstname={post.user.first_name}
            surname={post.user.last_name}
            username={post.user.username}
            profile_img={post.user.profile_img}
            title={post.title}
            image_url={post.image_url}
            location={post.location}
            date={post.createdAt}
            userLike={post.liked}
            userDislike={post.disliked}
            likesCount={post.LikesCount}
            average_rating={post.average_rating}
            textColor="black"
            reloadPost={reloadPost}
            page="single"
            navigation={props.navigation}
          />
        ) : (
          <Loader color={colors.grayAA} />
        )}
      </Content>
      <AppFooter page="Search" navigation={props.navigation} />
    </Container>
  );
};

export default SinglePost;
