import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {Toast} from 'native-base';
import axios from 'axios';
import {url} from './api';

export const facebookSignIn = async () => {
  try {
    const result = await LoginManager.logInWithReadPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      Toast.show({
        text: 'You cancelled your sign in',
        type: 'warning',
      });
    }

    // get the access token
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      Toast.show({
        text: 'Something went wrong obtaining the users access token',
        type: 'danger',
      });
    }
    return {
      token: data.accessToken.toString(),
    };
  } catch (err) {
    Toast.show({
      text: 'There was an error connecting to Facebook API',
      type: 'danger',
    });
  }
};

export const googleSignIn = async () => {
  try {
    await GoogleSignin.configure();

    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();
    const currentUser = await GoogleSignin.getCurrentUser();

    return currentUser;
  } catch (err) {
    let error;
    if (err.code === statusCodes.SIGN_IN_CANCELLED) {
      error = 'You cancelled the sign in';
    } else if (err.code === statusCodes.IN_PROGRESS) {
      error = 'Your sign in is already in progress';
    } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      error = 'Your play services is unavailable';
    } else {
      error = 'There was an error connecting to Google API';
    }
    Toast.show({
      text: error,
      type: 'danger',
    });
  }
};

export const saveCredentials = async (body, type) => {
  try {
    const response = await axios.post(`${url}auth/signup/social`, body);

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    return {
      status: err.response.status,
      data: err.response.data,
    };
  }
};
