import {Platform} from 'react-native';

const fonts = {
  primary: Platform.select({
    ios: 'Rimouski',
    android: 'rimouski-sb',
  }),
  primaryBold: Platform.select({
    ios: 'Rimouski',
    android: 'rimouski-sb',
  }),
  secondary: Platform.select({
    ios: 'Sofia Pro',
    android: 'Sofia',
  }),
};

export default fonts;
