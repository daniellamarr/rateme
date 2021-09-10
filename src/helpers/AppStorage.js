import AsyncStorage from '@react-native-community/async-storage';

export default class AppStorage {
  static async signIn({user, token}) {
    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (err) {}
  }

  static async checkIfSignedIn() {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      return userToken ? true : false;
    } catch (err) {}
  }

  static async getUserData() {
    try {
      const data = await AsyncStorage.getItem('user');
      return JSON.parse(data);
    } catch (err) {}
  }

  static async updateUserData(user) {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (err) {}
  }

  static async getToken() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return token;
    } catch (err) {}
  }

  static async signOut() {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('userToken');
    } catch (err) {}
  }
}
