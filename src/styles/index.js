import {StyleSheet, Dimensions, Platform} from 'react-native';
import colors from './colors';
import fonts from './fonts';

const {width, height} = Dimensions.get('window');

export const mainStyle = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  content: {},
  button: {
    borderRadius: 40,
    padding: 15,
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    height,
    width,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
  },
  backdropLoader: {
    paddingTop: height / 2,
    alignItems: 'center',
  },
  height: {
    height,
  },
});

export const splashScreenStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingTop: height / 2 - 50,
  },
  splashBox: {
    textAlign: 'center',
    alignItems: 'center',
  },
  sgkAd: {
    position: 'absolute',
    width,
    bottom: 0,
    padding: 15,
    alignItems: 'center',
  },
  sgkAdImage: {
    width: width - 30,
    height: 250,
  },
});

export const landingStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: height / 2 - 200,
  },
  inner: {
    width,
    padding: 30,
    marginTop: 100,
  },
  smallHeight: {
    marginBottom: 30,
  },
  signupOptions: {
    marginTop: 30,
    alignItems: 'center',
  },
  signupOptionsText: {
    fontSize: 15,
    color: colors.primary,
    fontFamily: fonts.secondary,
    marginBottom: 50,
  },
  button: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 40,
  },
  fbSocialIcon: {
    color: '#3b5598',
    marginRight: 50,
  },
  googleSocialIcon: {
    color: '#db4437',
  },
});

export const authStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: 30,
    paddingTop: 50,
  },
  authHeader: {
    marginBottom: 30,
  },
  formField: {
    marginTop: 30,
    marginBottom: 30,
  },
  input: {
    color: colors.white,
    fontFamily: fonts.secondary,
    fontSize: 14,
    borderBottomColor: colors.white,
    borderBottomWidth: 2,
    paddingLeft: 0,
    marginBottom: 20,
  },
  uploadBox: {
    alignItems: 'center',
    padding: 0,
    marginTop: 20,
  },
  uploadCircle: {
    height: 200,
    width: 200,
    backgroundColor: colors.white,
    paddingTop: 60,
    borderRadius: 100,
    textAlign: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {width: 5, height: 5},
  },
  imageCircle: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 100,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {width: 5, height: 5},
  },
  loginHeader: {
    alignItems: 'center',
    marginTop: 20,
  },
  signupOptions: {
    alignItems: 'center',
  },
  dobButton: {
    paddingBottom: 10,
    marginTop: 10,
  },
});

export const dashboardStyle = StyleSheet.create({
  defaultContainer: {
    backgroundColor: colors.primary,
  },
});

export const profileStyle = StyleSheet.create({
  profileCircle: {
    backgroundColor: colors.primary,
    height: 150,
    borderBottomLeftRadius: width / 2 + 75,
    borderBottomRightRadius: width / 2 + 75,
  },
  profilePhotoHolder: {
    alignItems: 'center',
    top: -50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  rankTabs: {
    width: width / 2,
    alignItems: 'center',
    marginTop: -20,
  },
  singleRankTab: {
    width,
    alignItems: 'center',
    marginTop: -20,
  },
  secondRankTabs: {
    backgroundColor: '#eeeeee',
    width: width / 3,
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  backIcon: {
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingTop: 40,
  },
  settingsIconView: {
    position: 'absolute',
    right: 20,
    paddingTop: 40,
  },
  settingsIcon: {
    color: colors.white,
    textAlign: 'center',
  },
});

const top = Platform.OS === 'ios' ? 100 : 83;
export const searchStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  searchInput: {
    ...authStyle.input,
    color: colors.black,
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  imageBackground: {
    width,
    height: 400,
    marginBottom: 2,
  },
  backgroundInner: {
    width,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 400,
  },
  viewPost: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  userDetails: {
    width,
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userFullname: {
    marginTop: 5,
    marginLeft: 7,
  },
  postRating: {
    width,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  searchView: {
    position: 'absolute',
    backgroundColor: colors.white,
    height: height - top,
    width,
    zIndex: 1000,
    top,
  },
});

export const topRatedStyle = StyleSheet.create({
  updateImage: {
    height: 300,
    width: (width - 80) / 2,
    marginRight: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export const notificationStyle = StyleSheet.create({
  rankCircle: {
    backgroundColor: colors.white,
    height: 150,
    width: 150,
    borderRadius: 75,
    borderColor: colors.secondary,
    borderWidth: 5,
    alignItems: 'center',
    paddingTop: 50,
    marginBottom: 10,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 1.46,
    shadowOffset: {width: 5, height: 5},
    elevation: 5,
  },
  listItem: {
    marginLeft: -5,
    marginBottom: 10,
    paddingLeft: 30,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 1.46,
    elevation: 5,
  },
});

export const postStyle = StyleSheet.create({
  postImage: {
    width,
    height: 300,
  },
  rateSection: {
    backgroundColor: colors.white,
    width,
    bottom: 0,
    padding: 5,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  uploadImage: {
    width,
    height,
    alignItems: 'center',
    paddingTop: 120,
  },
  previewImage: {
    width,
    height: 400,
  },
  imageOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    width,
    height,
  },
  cameraRoll: {
    position: 'absolute',
    left: 20,
    bottom: 0,
    backgroundColor: colors.primary,
    borderRadius: 5,
    zIndex: 1000,
    borderWidth: 3,
    borderColor: colors.primary,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 1.46,
    shadowOffset: {width: 1, height: 3},
    elevation: 5,
  },
  circleView: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  cancelDone: {
    width,
    position: 'absolute',
    top: 0,
    padding: 15,
    paddingTop: 50,
    backgroundColor: colors.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cameraButtonView: {
    width,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  uploadOuterCircle: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadInnerCircle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  smallUploadCircle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: colors.secondary,
    borderColor: 'white',
    borderWidth: 3,
  },
  selectUploadCircle: {
    backgroundColor: colors.primary,
    height: 100,
    width: 100,
    borderRadius: 50,
    alignItems: 'center',
    paddingTop: 25,
    marginBottom: 10,
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 10,
  },
  postText: {
    height: 100,
    color: '#333333',
    fontFamily: fonts.secondary,
    fontSize: 15,
    paddingLeft: 5,
    paddingTop: 10,
    marginBottom: 30,
  },
  postInput: {
    backgroundColor: '#eeeeee',
    height: Platform.select({
      ios: 30,
      android: 40,
    }),
    width: width - 45,
    fontFamily: fonts.secondary,
    fontSize: 11,
  },
  nextPage: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    zIndex: 100,
  },
  selectSmallCircle: {
    backgroundColor: colors.primary,
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    paddingTop: 15,
  },
  postButtonsView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    width,
    display: 'flex',
    flexDirection: 'row',
  },
  postButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    marginRight: 20,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 1.46,
    shadowOffset: {width: 1, height: 3},
    elevation: 5,
  },
  viewHeight: {
    height,
  },
  commentInputView: {
    position: 'absolute',
    bottom: 30,
    left: 15,
    right: 0,
    width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    width,
    fontSize: 13,
    height: 50,
    paddingLeft: 15,
    borderRadius: 10,
  },
});

export const completePostStyle = StyleSheet.create({
  container: {
    padding: 20,
  },
  postText: {
    width,
    height: 100,
    color: '#333333',
    fontFamily: fonts.secondary,
    fontSize: 13,
    paddingLeft: 10,
    marginBottom: 10,
  },
});
