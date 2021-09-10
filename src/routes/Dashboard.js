/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  RefreshControl,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Container, Content, Icon} from 'native-base';
// import Logo from '../components/Logo';
import Post from '../components/Post';
import AppFooter from '../components/AppFooter';
import {dashboardStyle} from '../styles';
import Loader from '../components/Loader';
import Text from '../components/Text';
import Button from '../components/Button';
import colors from '../styles/colors';
import {fetchAllFollowingPosts} from '../api/post';
import {fetchAllUsers} from '../api/user';

const Dashbooard = (props) => {
  // const {newPost} = props.route.params;
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [postLoaded, setPostLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAllFollowingPosts();
    getAllUsers();
  }, []);

  // useEffect(() => {
  //   if (newPost) {
  //     setPosts([...posts, newPost]);
  //   }
  // }, [newPost, posts]);

  const onRefresh = () => {
    setRefreshing(true);
    getAllFollowingPosts();
  };

  const reloadPost = async () => {
    await getAllFollowingPosts();
  };

  const navigateToProfile = async (user) => {
    props.navigation.navigate('UserProfile', {
      user,
    });
  };

  const renderProfiles = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{alignItems: 'center', marginRight: 20}}
        onPress={() =>
          navigateToProfile({
            id: item.id,
            firstname: item.first_name,
            surname: item.last_name,
            username: item.username,
          })
        }>
        {renderImage(item.profile_img)}
        <Text fontSize={13} color={colors.white} style={{marginTop: 10}}>
          {item.username}
        </Text>
      </TouchableOpacity>
    );
  };

  const getAllFollowingPosts = async () => {
    const response = await fetchAllFollowingPosts();
    // console.log(response);

    if (response.status === 200) {
      setPostLoaded(true);
      setRefreshing(false);
      setPosts(response.data.posts);
      // console.log(response.data.posts);
    }
  };

  const getAllUsers = async () => {
    const response = await fetchAllUsers();

    if (response.status === 200) {
      setUsers(response.data.users);
      setUsersLoaded(true);
      setRefreshing(false);
    }
  };

  const renderImage = (profile_img, size = 80) => {
    return profile_img ? (
      <Image
        source={{uri: profile_img, cache: 'force-cache'}}
        style={{width: size, height: size, borderRadius: size / 2}}
      />
    ) : (
      <Image
        source={require('../assets/images/dummy-user.png')}
        style={{width: size, height: size, borderRadius: size / 2}}
      />
    );
  };

  return (
    <Container style={dashboardStyle.defaultContainer}>
      <Content
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh.bind(this)}
            enabled={true}
            colors={[colors.primary]}
            tintColor={colors.white}
          />
        }>
        <View style={dashboardStyle.innerContainer}>
          {postLoaded ? (
            posts.length > 0 ? (
              posts.map((post) => {
                return (
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
                    likesCount={post.sCount}
                    average_rating={post.average_rating}
                    reloadPost={reloadPost}
                    page="all"
                    navigation={props.navigation}
                  />
                );
              })
            ) : (
              <View style={{padding: 20}}>
                <View
                  style={{
                    backgroundColor: colors.white,
                    height: 250,
                    borderRadius: 5,
                    alignItems: 'center',
                    paddingTop: 50,
                  }}>
                  <Icon
                    name="home"
                    type="AntDesign"
                    style={{marginBottom: 20}}
                  />
                  <Text
                    color={colors.primary}
                    fontSize={18}
                    style={{marginBottom: 5}}>
                    Welcome to Rateme
                  </Text>
                  <Text
                    color={colors.grayAA}
                    fontSize={14}
                    style={{marginBottom: 15}}>
                    Posts of users you follow would appear here
                  </Text>
                  <Button onPress={() => props.navigation.navigate('TopRated')}>
                    <Text color={colors.white} fontSize={14}>
                      See Top Rated
                    </Text>
                  </Button>
                </View>
                <View style={{marginTop: 20}}>
                  <Text color={colors.white} fontSize={16}>
                    Top Profiles
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginBottom: 30,
                      marginTop: 20,
                    }}>
                    {usersLoaded ? (
                      <SafeAreaView>
                        <FlatList
                          showsHorizontalScrollIndicator={false}
                          horizontal={true}
                          data={users}
                          keyExtractor={(item) => item.username}
                          renderItem={renderProfiles}
                        />
                      </SafeAreaView>
                    ) : (
                      <Loader color={colors.primary} />
                    )}
                  </View>
                </View>
              </View>
            )
          ) : (
            <Loader />
          )}
        </View>
      </Content>
      <AppFooter navigation={props.navigation} page="Dashboard" />
    </Container>
  );
};

export default Dashbooard;
