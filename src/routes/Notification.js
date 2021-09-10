/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Platform, RefreshControl} from 'react-native';
import {Container, Content, List, Icon} from 'native-base';
import AppStorage from '../helpers/AppStorage';
import AppFooter from '../components/AppFooter';
import Notify from '../components/Notify';
import Text from '../components/Text';
import Loader from '../components/Loader';
import {dashboardStyle, notificationStyle} from '../styles';
import {isIphoneX} from '../helpers/isIphoneX';
import {getNotifications} from '../api/notification';
import {fetchUserProfile} from '../api/user';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const Notification = (props) => {
  const [profile, setProfile] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoaded, setNotificationsLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getUser();
    handleGetNotifications();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    handleGetNotifications();
  };

  const handleGetNotifications = async () => {
    try {
      const response = await getNotifications();
      if (response.status === 200) {
        setNotifications(response.data);
        setNotificationsLoaded(true);
        setRefreshing(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFetchUserProfile = async (id) => {
    try {
      const response = await fetchUserProfile(id);
      if (response.status === 200) {
        setProfile(response.data?.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async () => {
    const data = await AppStorage.getUserData();
    handleFetchUserProfile(data.id);
  };

  const paddingTop = Platform.OS === 'ios' && isIphoneX() ? 40 : 20;
  return (
    <Container style={dashboardStyle.defaultContainer}>
      <View
        style={{
          position: 'absolute',
          left: 20,
          paddingTop,
          zIndex: 1000000,
        }}>
        <Icon
          name="arrowleft"
          type="AntDesign"
          style={{color: colors.white}}
          onPress={() => props.navigation.goBack()}
        />
      </View>
      <View style={{alignItems: 'center', marginTop: 50, marginBottom: 50}}>
        <View style={notificationStyle.rankCircle}>
          <Text
            fontFamily={fonts.secondary}
            fontSize={30}
            color={colors.primary}>
            #{profile?.rank}
          </Text>
        </View>
        <Text color={colors.white} style={{marginBottom: 20}}>
          Profile Rank
        </Text>
        <Text style={{marginBottom: 10}}>
          <Icon name="star" style={{color: colors.secondary}} />
          &nbsp;
          <Text fontType="font3" fontSize={20} color={colors.white}>
            {profile?.user_rating}
          </Text>
        </Text>
        <Text color={colors.white}>Your Profile Value</Text>
      </View>
      <Content
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            enabled={true}
            colors={[colors.primary]}
            tintColor={colors.white}
          />
        }>
        <View style={{padding: 30, paddingBottom: 80}}>
          <Text
            fontFamily={fonts.secondary}
            color={colors.black}
            style={{marginBottom: 20}}>
            LATEST ACTIVITY
          </Text>
          <List>
            {notificationsLoaded ? (
              notifications?.length > 0 ? (
                notifications.map((notify, index) => {
                  return (
                    <Notify
                      key={index}
                      notify={notify}
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
                    name="notifications"
                    android="md-notifications"
                    ios="ios-notifications"
                    style={{
                      color: colors.white,
                      fontSize: 50,
                    }}
                  />
                  <Text color={colors.white}>You have no notifications</Text>
                </View>
              )
            ) : (
              <Loader color={colors.white} />
            )}
          </List>
        </View>
      </Content>
      <AppFooter page="Notifications" navigation={props.navigation} />
    </Container>
  );
};

export default Notification;
