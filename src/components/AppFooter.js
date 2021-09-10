import React, {useState, useEffect} from 'react';
import {Footer, FooterTab, Button, Icon} from 'native-base';
import colors from '../styles/colors';
import AppStorage from '../helpers/AppStorage';

const AppFooter = ({navigation, page}) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    const data = await AppStorage.getUserData();
    setUser(data);
  };

  const footerTabs = [
    {
      nav: 'Dashboard',
      icon: 'compass',
      android: 'md-compass',
      ios: 'ios-compass',
      params: {},
    },
    {
      nav: 'TopRated',
      icon: 'search',
      android: 'md-search',
      ios: 'ios-search',
      params: {},
    },
    {
      nav: 'NewPost',
      icon: 'add',
      android: 'md-add-circle',
      ios: 'ios-add-circle',
      params: {},
    },
    {
      nav: 'Notifications',
      icon: 'notifications',
      android: 'md-notifications',
      ios: 'ios-notifications',
      params: {},
    },
    {
      nav: 'UserProfile',
      icon: 'person',
      android: 'md-person',
      ios: 'ios-person',
      params: {
        user,
      },
    },
  ];

  let color,
    fontSize = 20;
  return (
    <Footer>
      <FooterTab style={{backgroundColor: colors.white}}>
        {footerTabs.map((x) => {
          if (x.nav === 'Camera') {
            color = colors.primary;
            fontSize = 40;
          } else if (x.nav === page) {
            color = colors.primary;
            fontSize = 20;
          } else {
            color = colors.black;
            fontSize = 20;
          }

          return (
            <Button key={x.nav} onPress={() => navigation.navigate(x.nav, x.params)}>
              <Icon
                name={x.icon}
                android={x.android}
                ios={x.ios}
                style={{
                  color,
                  fontSize,
                }}
              />
            </Button>
          );
        })}
      </FooterTab>
    </Footer>
  );
};

export default AppFooter;
