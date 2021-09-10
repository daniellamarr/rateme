/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {
  Container,
  Content,
  Textarea,
  Toast,
  Icon,
  Input,
  Header,
  Item,
  List,
  ListItem,
  Button as NBButton,
} from 'native-base';
import Modal from 'react-native-modal';
import {completePostStyle, searchStyle, authStyle, postStyle} from '../styles';
import Button from '../components/Button';
import Text from '../components/Text';
import imageUpload from '../helpers/imageUpload';
import Backdrop from '../components/Backdrop';
import Loader from '../components/Loader';
import SearchUsers from '../components/SearchUsers';
import ImageTextButton from '../components/ImageTextButton';
import AppStorage from '../helpers/AppStorage';
import colors from '../styles/colors';
import {createPost} from '../api/post';
import {search} from '../api/search';

const {height, width} = Dimensions.get('window');

const CompletePost = (props) => {
  const {image} = props.route.params;
  // const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState('');
  const [message, setMessage] = useState('');
  const [profile_img, setProfileImage] = useState('');
  const [taggedUsers, setTaggedUsers] = useState([]);
  const [resultLoadingStatus, setResultLoadingStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleCreatePost = async () => {
    Keyboard.dismiss();
    let image_url;
    if (image) {
      setLoadingStatus(true);
      const upload = await imageUpload(image);
      if (upload.status !== 400) {
        image_url = upload.data.secure_url;
      } else {
        setLoadingStatus(false);
        return Toast.show({
          text: 'There was an error uploading your image',
          type: 'danger',
          duration: 5000,
        });
      }
    } else {
      return Toast.show({
        text: 'Please upload an image',
        type: 'warning',
        duration: 5000,
      });
    }

    const post = {
      title,
      image_url,
      location,
      tags: () => {
        return taggedUsers.map((user) => {
          return user.id;
        });
      },
    };

    const response = await createPost(post);

    if (response.status !== 201) {
      setLoadingStatus(false);
      return Toast.show({
        text: response.data?.message,
        type: 'danger',
      });
    }

    return Toast.show({
      text: 'Your post has been added',
      type: 'success',
      duration: 5000,
      onClose: (reason = 'functionCall') => {
        setLoadingStatus(false);
        props.navigation.navigate('Dashboard');
      },
    });
  };

  const handleSearch = async () => {
    if (!keyword) {
      return false;
    }

    setResultLoadingStatus(true);
    const response = await search({
      keyword,
      type: 'user',
    });

    const {uniqueSearch} = response.data;

    if (!uniqueSearch) {
      setMessage('There are no results for this search');
      setLoadingStatus(false);
    }

    setResultLoadingStatus(false);
    setResults(uniqueSearch);
  };

  const listTaggedUsers = ({item}) => {
    return (
      <ImageTextButton
        key={item.id}
        text={item.username}
        image={item.profile_img}
      />
    );
  };

  const tagUsers = (user) => {
    const newTaggedUsers = taggedUsers;
    const value = newTaggedUsers.findIndex(
      ({username}) => username === user.username,
    );
    if (value > 0) {
      newTaggedUsers.splice(value, 1);
    } else {
      newTaggedUsers.push(user);
    }
    setTaggedUsers([...newTaggedUsers]);
  };

  const renderPhoto = () => {
    if (!profile_img) {
      return (
        <Image
          source={require('../assets/images/dummy-user.png')}
          style={{
            width: 80,
            height: 80,
          }}
        />
      );
    } else {
      return (
        <Image
          source={{uri: profile_img}}
          style={{
            width: 80,
            height: 80,
          }}
        />
      );
    }
  };

  const getUserProfile = async () => {
    const data = await AppStorage.getUserData();
    setProfileImage(data?.profile_img);
  };

  const renderImage = () => {
    return (
      <Image
        source={image}
        style={{
          width: 80,
          height: 80,
        }}
      />
    );
  };

  return (
    <Container>
      <Modal
        style={{padding: 0, margin: 0}}
        isVisible={modalVisible}
        avoidKeyboard={false}
        swipeDirection="up">
        <View style={{flex: 1, backgroundColor: colors.white, height, width}}>
          <Header
            searchBar
            rounded
            style={{backgroundColor: colors.primary}}>
            <Item style={{backgroundColor: colors.white}}>
              <Icon name="ios-search" />
              <Input
                placeholder="Search"
                placeholderTextColor={colors.black}
                style={searchStyle.searchInput}
                onChangeText={(value) => setKeyword(value)}
              />
              <Icon name="people" android="md-people" ios="ios-people" />
            </Item>
            <NBButton transparent>
              <Text color={colors.white} onPress={() => setModalVisible(false)}>
                Cancel
              </Text>
            </NBButton>
          </Header>
          <View>
            <List>
              <ListItem onPress={handleSearch}>
                <Text>Click here to get search results for {keyword}</Text>
              </ListItem>
            </List>
            {resultLoadingStatus ? (
              <Loader color={colors.primary} />
            ) : results?.length > 0 ? (
              results.map((result) => {
                return (
                  <SearchUsers
                    key={result.id}
                    result={result}
                    tagUsers={tagUsers}
                    taggedUsers={taggedUsers}
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
                  name="search"
                  android="md-search"
                  ios="ios-search"
                  style={{
                    color: '#aaaaaa',
                    fontSize: 50,
                  }}
                />
                <Text color="#aaaaaa">{message}</Text>
              </View>
            )}
          </View>
          {taggedUsers?.length > 0 && (
            <TouchableOpacity
              style={[
                postStyle.selectSmallCircle,
                {position: 'absolute', right: 20, bottom: 30},
              ]}
              onPress={() => setModalVisible(false)}>
              <Icon
                name="send"
                android="md-send"
                ios="ios-send"
                style={{
                  fontSize: 30,
                  color: colors.white,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </Modal>
      <Content>
        <View style={completePostStyle.container}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            {renderImage()}
            <Textarea
              style={completePostStyle.postText}
              placeholder="Write a caption"
              placeholderTextColor="#333333"
              onChangeText={(value) => setTitle(value)}
            />
          </View>
          <View>
            <Input
              placeholder="Where are you?"
              placeholderTextColor={'#AAAAAA'}
              style={[
                authStyle.input,
                {
                  borderBottomColor: '#eeeeee',
                  fontSize: 14,
                  color: colors.black,
                },
              ]}
              onChangeText={(value) => setLocation(value)}
            />
            <Button
              buttonType="green"
              small
              fontSize={14}
              onPress={() => setModalVisible(true)}>
              <Text>Tag People</Text>
            </Button>
            <SafeAreaView showsHorizontalScrollIndicator={false}>
              <FlatList
                horizontal={true}
                data={taggedUsers}
                keyExtractor={(item) => item.username}
                style={{marginTop: 20, flex: 1, flexDirection: 'row'}}
                renderItem={listTaggedUsers}
              />
            </SafeAreaView>
          </View>
        </View>
      </Content>
      <Text
        fontSize={13}
        color="#aaaaaa"
        style={{
          textAlign: 'center',
          marginBottom: 10,
        }}>
        Ready to get rated?
      </Text>
      <Button buttonType="green" block onPress={handleCreatePost}>
        <Text>Post</Text>
      </Button>
      {loadingStatus && <Backdrop loader={true} />}
    </Container>
  );
};

export default CompletePost;
