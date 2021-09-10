import React, {useState, useEffect, createRef} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AppStorage from './src/helpers/AppStorage';
import AuthContext from './src/components/AuthContext';
import SplashScreen from './src/routes/SplashScreen';
import colors from './src/styles/colors';
import Landing from './src/routes/Landing';
import Login from './src/routes/Login';
import Signup from './src/routes/Signup';
import CreatePassword from './src/routes/CreatePassword';
import Dashbooard from './src/routes/Dashboard';
import UserProfile from './src/routes/UserProfile';
import TopRated from './src/routes/TopRated';
import Notification from './src/routes/Notification';
import Settings from './src/routes/Settings';
import EditProfile from './src/routes/EditProfile';
import NewPost from './src/routes/NewPost';
import CompletePost from './src/routes/CompletePost';
import AllComments from './src/routes/AllComments';
import SinglePost from './src/routes/SinglePost';
import UserFollows from './src/routes/UserFollows';

const Stack = createStackNavigator();

const Router = () => {
  const [isLoading, setIsLoading] = useState(true);

  const navigatorRef = createRef();

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            loggedIn: action.loggedIn,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            loggedIn: action.loggedIn,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            loggedIn: false,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      loggedIn: false,
    },
  );

  const checkLoggedIn = async () => {
    const loggedIn = await AppStorage.checkIfSignedIn();
    dispatch({type: 'RESTORE_TOKEN', loggedIn});
    setTimeout(() => setIsLoading(false), 3000);
  };

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        await AppStorage.signIn(data);
        dispatch({type: 'SIGN_IN', loggedIn: true});
      },
      signOut: async () => {
        await AppStorage.signOut();
        dispatch({type: 'SIGN_OUT'});
      },
    }),
    [],
  );

  useEffect(() => {
    checkLoggedIn();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer ref={navigatorRef}>
        <StatusBar backgroundColor={colors.primary} />
        <Stack.Navigator headerMode="none">
          {!state.loggedIn ? (
            <>
              <Stack.Screen name="Landing" component={Landing} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="CreatePassword" component={CreatePassword} />
            </>
          ) : (
            <>
              <Stack.Screen name="Dashboard" component={Dashbooard} />
              <Stack.Screen name="UserProfile" component={UserProfile} />
              <Stack.Screen name="TopRated" component={TopRated} />
              <Stack.Screen name="Notifications" component={Notification} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="NewPost" component={NewPost} />
              <Stack.Screen name="CompletePost" component={CompletePost} />
              <Stack.Screen name="AllComments" component={AllComments} />
              <Stack.Screen name="SinglePost" component={SinglePost} />
              <Stack.Screen name="UserFollows" component={UserFollows} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Router;
