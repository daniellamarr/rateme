/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image} from 'react-native';
import {Icon} from 'native-base';
import {mainStyle, profileStyle} from '../styles';
import colors from '../styles/colors';
import Text from './Text';
import Button from './Button';
import Post from './Post';

const Profile = ({
  navigation,
  user,
  followers,
  followings,
  followerCount,
  followingCount,
  followerCheck,
  userFollow,
  userUnfollow,
  posts,
  postCount,
  loggedInProfile,
  reloadPost,
}) => {
  const renderRank = () => (
    <View style={mainStyle.row}>
      <View style={profileStyle.rankTabs}>
        <Text color="#d20000" fontSize={20}>
          #{user?.rank}
        </Text>
        <Text>Rank</Text>
      </View>
      <View style={profileStyle.rankTabs}>
        <Text color={colors.primary} fontSize={20}>
          {user?.user_rating}
        </Text>
        <Text>Profile Value</Text>
      </View>
    </View>
  );

  const renderFollowButton = () => {
    if (loggedInProfile) {
      return (
        <Button
          fontSize={13}
          onPress={() => navigation.navigate('EditProfile')}>
          <Text color={colors.white}>Edit Profile</Text>
        </Button>
      );
    } else {
      if (!followerCheck) {
        return (
          <Button small fontSize={13} onPress={userFollow}>
            <Text color={colors.white}>Follow</Text>
          </Button>
        );
      } else {
        return (
          <Button small fontSize={13} onPress={userUnfollow}>
            <Text color={colors.white}>Unfollow</Text>
          </Button>
        );
      }
    }
  };

  const renderPhoto = () => {
    if (!user.profile_img) {
      return (
        <Image
          source={require('../assets/images/dummy-user.png')}
          style={profileStyle.profileImage}
        />
      );
    } else {
      return (
        <Image
          source={{uri: user.profile_img, cache: 'force-cache'}}
          style={profileStyle.profileImage}
        />
      );
    }
  };

  return (
    <View>
      <View style={profileStyle.profileCircle}>
        <View style={profileStyle.backIcon}>
          <Icon
            name="arrowleft"
            type="AntDesign"
            style={{color: colors.white}}
            onPress={() => navigation.goBack()}
          />
        </View>
        {loggedInProfile && (
          <View style={profileStyle.settingsIconView}>
            <Icon
              name="settings"
              style={profileStyle.settingsIcon}
              onPress={() => navigation.navigate('Settings')}
            />
          </View>
        )}
      </View>
      <View style={profileStyle.profilePhotoHolder}>
        {renderPhoto()}
        <Text color={colors.black} fontSize={17}>
          {user?.username}
        </Text>
        <Text color="#aaaaaa" fontSize={12}>
          {user?.bio}
        </Text>
        <View style={{marginTop: 10}}>{renderFollowButton()}</View>
      </View>
      {renderRank()}
      <View style={{flexDirection: 'row'}}>
        <View style={profileStyle.secondRankTabs}>
          <Text color={colors.primary} fontSize={14}>
            {postCount}
          </Text>
          <Text fontSize={12}>Posts</Text>
        </View>
        <View style={profileStyle.secondRankTabs}>
          <Text color={colors.primary} fontSize={14}>
            {followerCount}
          </Text>
          <Text
            fontSize={12}
            onPress={() =>
              navigation.push('UserFollows', {
                segmentData: {
                  type: 1,
                  followers,
                  followings,
                },
              })
            }>
            Followers
          </Text>
        </View>
        <View style={profileStyle.secondRankTabs}>
          <Text color={colors.primary} fontSize={14}>
            {followingCount}
          </Text>
          <Text
            fontSize={12}
            onPress={() =>
              navigation.push('UserFollows', {
                segmentData: {
                  type: 2,
                  followers,
                  followings,
                },
              })
            }>
            Following
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
        }}>
        {posts?.length === 0 ? (
          <View style={{alignItems: 'center', marginTop: 15}}>
            <Text fontSize={15} color="#aaaaaa">
              There are no posts yet
            </Text>
          </View>
        ) : (
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
                likesCount={post.LikesCount}
                average_rating={post.average_rating}
                textColor="black"
                reloadPost={reloadPost}
                page="all"
                navigation={navigation}
              />
            );
          })
        )}
      </View>
    </View>
  );
};

export default Profile;
