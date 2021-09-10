/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Container,
  Content,
  Input,
  Item,
  Icon,
  Button,
  Header,
  Segment,
  Text as NBText,
} from 'native-base';
import {searchStyle} from '../styles';
import AppFooter from '../components/AppFooter';
import Text from '../components/Text';
import SearchResult from '../components/SearchResult';
import {followUser, unfollowUser} from '../api/user';
import colors from '../styles/colors';

const UserFollows = (props) => {
  const {segmentData} = props.route.params;
  const [segment, setSegment] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [resultsFollow, setResultsFollow] = useState([]);

  useEffect(() => {
    renderFollows();
  });

  const userFollow = async (id) => {
    await followUser(id);
  };

  const userUnfollow = async (id) => {
    await unfollowUser(id);
  };

  const renderFollows = (value) => {
    const segmentValue = value || segmentData.type;
    setSegment(segmentValue);
    if (segment === 1) {
      setResultsFollow(segmentData?.followers);
    } else if (segment === 2) {
      setResultsFollow(segmentData?.followings);
    }
  };

  return (
    <Container>
      <Header
        searchBar
        rounded
        hasSegment
        style={{
          backgroundColor: '#f2f2f2',
        }}
        androidStatusBarColor={colors.primary}>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            placeholderTextColor={colors.black}
            style={searchStyle.searchInput}
            value={keyword}
            onChangeText={(value) => setKeyword(value)}
          />
          <Icon name="ios-people" />
        </Item>
        <Button transparent>
          <Text
            color={colors.primary}
            onPress={() => props.navigation.goBack()}>
            Cancel
          </Text>
        </Button>
      </Header>
      <Segment style={{backgroundColor: '#f2f2f2'}}>
        <Button
          first
          active={segment === 1}
          onPress={() => {
            // setSegment(1);
            renderFollows(1);
          }}>
          <NBText>Followers</NBText>
        </Button>
        <Button
          last
          active={segment === 2}
          onPress={() => {
            // setSegment(2);
            renderFollows(2);
          }}>
          <NBText>Following</NBText>
        </Button>
      </Segment>
      <Content>
        {resultsFollow?.length > 0 &&
          resultsFollow.map((result) => {
            return (
              <SearchResult
                key={result.id}
                result={result.follower || result.user}
                showFollow={true}
                followerCheck={result.checkFollow}
                followUser={userFollow}
                unfollowUser={userUnfollow}
                type={'user'}
                navigation={props.navigation}
              />
            );
          })}
      </Content>
      <AppFooter page="Profile" navigation={props.navigation} />
    </Container>
  );
};

export default UserFollows;
