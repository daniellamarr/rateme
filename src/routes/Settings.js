import React, {useContext, useState} from 'react';
import {Alert} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Body,
  Right,
  Switch,
} from 'native-base';
import Text from '../components/Text';
import colors from '../styles/colors';
import AuthContext from '../components/AuthContext';

const Settings = (props) => {
  const [allowNotifications, setAllowNotifications] = useState(false);

  const {signOut} = useContext(AuthContext);

  const confirmLogout = () => {
    Alert.alert('Logout', 'Do you really want to logout?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => logout(),
      },
    ]);
  };

  const logout = async () => {
    await signOut();
    props.navigation.navigate('Landing');
  };

  return (
    <Container>
      <Content>
        <List>
          <ListItem itemDivider>
            <Text letterSpacing={0.5} fontType="font1">
              Privacy
            </Text>
          </ListItem>
          <ListItem>
            <Body>
              <Text
                letterSpacing={0.5}
                fontSize={15}
                fontType="font1"
                color={colors.black}>
                Allow Notifications
              </Text>
              <Text color={colors.grayAA} note>
                Toggle Notifications On and Off
              </Text>
            </Body>
            <Right>
              <Switch
                value={allowNotifications}
                onValueChange={(value) => setAllowNotifications(value)}
              />
            </Right>
          </ListItem>
          <ListItem>
            <Body>
              <Text fontSize={15}>Account Privacy</Text>
              <Text color={colors.grayAA} note>
                Change your account privacy
              </Text>
            </Body>
            <Right>
              <Text color={colors.grayAA} fontSize={15} fontType="font1">
                Private
              </Text>
            </Right>
          </ListItem>
          <ListItem>
            <Body>
              <Text fontSize={15}>Change Password</Text>
              <Text color={colors.grayAA} note>
                Change your account password
              </Text>
            </Body>
          </ListItem>
          <ListItem itemDivider>
            <Text letterSpacing={0.5} fontType="font1">
              Account Settings
            </Text>
          </ListItem>
          <ListItem onPress={confirmLogout}>
            <Body>
              <Text fontSize={15}>Logout</Text>
              <Text color={colors.grayAA} note>
                You will have to login again to access Rateme
              </Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text fontSize={15}>Deactivate Account</Text>
              <Text color={colors.grayAA} note>
                Temporarily deactivate your account
              </Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text fontSize={15} color={colors.red}>
                Delete your Account
              </Text>
              <Text color={colors.grayAA} note>
                Permanently close your account
              </Text>
            </Body>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

export default Settings;
