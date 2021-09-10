import React, {useState, useEffect} from 'react';
import {View, RefreshControl} from 'react-native';
import {Container, Content} from 'native-base';
import AppFooter from '../components/AppFooter';
import Profile from '../components/Profile';
import AppStorage from '../helpers/AppStorage';
import {
  fetchFollowerCheck,
  followUser,
  unfollowUser,
  fetchFollowings,
  fetchUserProfile,
} from '../api/user';
import {fetchUserPosts} from '../api/post';
import Loader from '../components/Loader';

const UserProfile = (props) => {
  const user = props.route.params?.user;
  const [loggedInUser, setLoggedInUser] = useState({});
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [followerCheck, setFollowerCheck] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUser();
    getUserProfile();
    getFollowings();
    getUserPosts();
  }, []);

  const getUserProfile = async () => {
    const response = await fetchUserProfile(user?.id);

    if (response.status === 200) {
      setProfile(response?.data?.user);
    }
  };

  const getFollowings = async () => {
    const response = await fetchFollowings(user?.id);
    if (response.status === 200) {
      const {followers: allFollowers, following: allFollowings} = response.data;
      setFollowerCount(allFollowers.count);
      setFollowingCount(allFollowings.count);
      setFollowers(allFollowers.rows);
      setFollowings(allFollowings.rows);
    }
  };

  const getUserPosts = async () => {
    const response = await fetchUserPosts(user?.id);

    if (response.status === 200) {
      const {posts: allPosts, postsGrandTotal} = response.data;
      setPosts(allPosts);
      setPostCount(postsGrandTotal);
    }
  };

  const reloadPost = async () => {
    await getUserPosts();
    await getUserProfile();
  };

  const fetchUser = async () => {
    const data = await AppStorage.getUserData();
    setLoggedInUser(data);
    setProfile(data);
    setLoadingStatus(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await reloadPost();
    setRefreshing(false);
  };

  const userFollow = async () => {
    await followUser(profile?.id);
    checkFollow();
    getFollowings();
  };

  const userUnfollow = async () => {
    await unfollowUser(profile?.id);
    checkFollow();
    getFollowings();
  };

  const checkFollow = async () => {
    const response = await fetchFollowerCheck(profile?.id);
    if (response.status === 200) {
      const {followerCheck: followerCheckStatus} = response.data;
      setFollowerCheck(followerCheckStatus);
    }
    setFollowerCheck(false);
  };

  return (
    <Container>
      <Content
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          {loadingStatus ? (
            <Loader />
          ) : (
            <Profile
              navigation={props.navigation}
              user={profile || user}
              followers={followers}
              followings={followings}
              followerCount={followerCount}
              followingCount={followingCount}
              followerCheck={followerCheck}
              userFollow={userFollow}
              userUnfollow={userUnfollow}
              posts={posts}
              postCount={postCount}
              loggedInProfile={profile?.id === loggedInUser?.id}
              reloadPost={reloadPost}
            />
          )}
        </View>
      </Content>
      <AppFooter navigation={props.navigation} page="UserProfile" />
    </Container>
  );
};

export default UserProfile;
