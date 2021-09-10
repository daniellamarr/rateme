/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {
  Container,
  Content,
  Input,
  Item,
  Icon,
  Button,
  Header,
  Tabs,
  Tab,
} from 'native-base';
import Text from '../components/Text';
import {topRatedStyle, searchStyle} from '../styles';
import colors from '../styles/colors';
import AppFooter from '../components/AppFooter';
import SearchResult from '../components/SearchResult';
import Loader from '../components/Loader';
import {search} from '../api/search';
import {fetchAllUsers, followUser, unfollowUser} from '../api/user';
import {fetchAllPosts} from '../api/post';
import fonts from '../styles/fonts';

const TopRated = (props) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [postLoaded, setPostLoaded] = useState(false);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchType, setSearchType] = useState('user');
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [postResults, setPostResults] = useState([]);
  const [message, setMessage] = useState('Enter a keyword to search');
  const [refreshing, setRefreshing] = useState(false);
  const [postPage, setPostPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    handleFetchAllPosts();
    handleFetchAllUsers();
  }, []);

  const handleSearch = async () => {
    try {
      if (!keyword) {
        return false;
      }

      if (!isFocused && keyword !== '') {
        setIsFocused(true);
      }
      setLoadingStatus(true);

      const response = await search({
        keyword,
        type: searchType,
      });

      const {uniqueSearch} = response.data;

      if (!uniqueSearch) {
        setMessage('There are no results for this search');
      }

      if (searchType === 'user') {
        setResults(uniqueSearch);
      } else if (searchType === 'post') {
        setPostResults(uniqueSearch);
      }
      setLoadingStatus(false);
    } catch (err) {
      setMessage('Oops, something went wrong');
    }
  };

  const userFollow = async (id) => {
    try {
      await followUser(id);
    } catch (err) {}
  };

  const userUnfollow = async (id) => {
    try {
      await unfollowUser(id);
    } catch (err) {}
  };

  const renderProfiles = ({item, index}) => (
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
      <Text
        fontFamily={fonts.secondary}
        fontSize={20}
        color={colors.primary}
        style={{marginBottom: 10}}>
        #{index + 1}
      </Text>
      {renderImage(item.profile_img)}
      <Text fontSize={13} color={colors.black} style={{marginTop: 10}}>
        {item.username}
      </Text>
    </TouchableOpacity>
  );

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

  const renderPosts = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('SinglePost', {postId: item.id})
        }>
        <ImageBackground
          source={{uri: item.image_url, cache: 'force-cache'}}
          style={topRatedStyle.updateImage}
          imageStyle={{borderRadius: 5}}>
          <View style={searchStyle.postRating}>
            <Text color={colors.white} fontSize={25}>
              #{index + 1}
            </Text>
          </View>
          <TouchableOpacity
            style={searchStyle.userDetails}
            onPress={() => navigateToProfile(item.user)}>
            {renderImage(item.user.profile_img, 30)}
            <Text color={colors.white} style={searchStyle.userFullname}>
              {item.user.first_name} {item.user.last_name}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const handleFetchAllPosts = async (newPostPage = postPage) => {
    const response = await fetchAllPosts(newPostPage);

    if (response.status === 200) {
      const {posts: allPosts} = response.data;
      const previousPosts = posts;
      setPosts([...previousPosts, ...allPosts]);
      setHasMore(response.data.page <= response.data.pages);
      setPostLoaded(true);
      setRefreshing(false);
    }
  };

  const handleFetchAllUsers = async () => {
    const response = await fetchAllUsers();

    if (response.status === 200) {
      const {users: allUsers} = response.data;
      setUsers(allUsers);
      setUsersLoaded(true);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    handleFetchAllPosts();
    handleFetchAllUsers();
  };

  const navigateToProfile = async (user) => {
    props.navigation.navigate('UserProfile', {
      user,
    });
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleScroll = ({nativeEvent}) => {
    const scrollHeight =
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
      nativeEvent.contentSize.height - 50;

    if (scrollHeight && hasMore) {
      setPostPage(postPage + 1);
      handleFetchAllPosts(postPage + 1);
    }
  };

  return (
    <Container>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Header
        searchBar
        rounded
        hasTabs
        style={{
          backgroundColor: colors.primary,
        }}
        androidStatusBarColor={colors.primary}>
        <Item style={{backgroundColor: colors.white}}>
          <Icon name="search" android="md-search" ios="ios-search" />
          <Input
            placeholder="Search"
            placeholderTextColor={colors.black}
            style={searchStyle.searchInput}
            onChangeText={(value) => {
              setKeyword(value);
              setIsFocused(value !== '');
              handleSearch();
            }}
            autoCapitalize="none"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            returnKeyType="search"
            returnKeyLabel="Search"
            onEndEditing={handleSearch}
          />
          <Icon name="people" android="md-people" ios="ios-people" />
        </Item>
        <Button transparent>
          <Text color={colors.white} onPress={handleSearch}>
            Search
          </Text>
        </Button>
      </Header>
      <Content
        contentContainerStyle={{padding: 30}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        onScroll={handleScroll}
        scrollEventThrottle={0}>
        <View style={{marginBottom: 20}}>
          <Text fontFamily={fonts.secondary} fontSize={25}>
            Top Profiles
          </Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 30}}>
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
        <View>
          <View>
            <Text
              fontFamily={fonts.secondary}
              fontSize={25}
              color={colors.black}>
              Top Posts
            </Text>
            <Text />
          </View>
          <View>
            {postLoaded ? (
              <SafeAreaView>
                <FlatList
                  data={posts}
                  keyExtractor={(item) => String(item.id)}
                  renderItem={renderPosts}
                  numColumns={2}
                />
              </SafeAreaView>
            ) : (
              <Loader color={colors.primary} />
            )}
          </View>
        </View>
      </Content>
      {isFocused && (
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={searchStyle.searchView}>
          <Tabs
            onChangeTab={({i, ref}) => {
              setSearchType(i === 0 ? 'user' : 'post');
            }}>
            <Tab heading="Users">
              {loadingStatus ? (
                <Loader color={colors.primary} />
              ) : results?.length > 0 ? (
                results.map((result) => {
                  return (
                    <SearchResult
                      key={result.id}
                      result={result}
                      type={searchType}
                      showFollow={false}
                      followerCheck={result.checkFollow}
                      followUser={userFollow}
                      unfollowUser={userUnfollow}
                      navigation={props.navigation}
                    />
                  );
                })
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: 80,
                  }}>
                  <Icon
                    name="search"
                    android="md-search"
                    ios="ios-search"
                    style={{
                      color: '#aaaaaa',
                      fontSize: 50,
                    }}
                  />
                  <Text color="#aaaaaa">{message}</Text>
                </View>
              )}
            </Tab>
            <Tab heading="Posts">
              {loadingStatus ? (
                <Loader color={colors.primary} />
              ) : postResults?.length > 0 ? (
                postResults.map((result) => {
                  return (
                    <SearchResult
                      key={result.id}
                      result={result}
                      type={searchType}
                      navigation={props.navigation}
                    />
                  );
                })
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: 80,
                  }}>
                  <Icon
                    name="search"
                    android="md-search"
                    ios="ios-search"
                    style={{
                      color: '#aaaaaa',
                      fontSize: 50,
                    }}
                  />
                  <Text color="#aaaaaa">{message}</Text>
                </View>
              )}
            </Tab>
          </Tabs>
        </ScrollView>
      )}
      <AppFooter page="TopRated" navigation={props.navigation} />
    </Container>
  );
};

export default TopRated;
