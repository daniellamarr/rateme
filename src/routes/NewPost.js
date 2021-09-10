/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Icon} from 'native-base';
import CameraRoll from '@react-native-community/cameraroll';
import Modal from 'react-native-modal';
import {RNCamera} from 'react-native-camera';
import * as mime from 'react-native-mime-types';
import {checkMultiple, request, PERMISSIONS} from 'react-native-permissions';
import Feather from 'react-native-vector-icons/Feather';
import Button from '../components/Button';
import Text from '../components/Text';
import {galleryPicker} from '../helpers/imagePicker';
import {postStyle} from '../styles';
import colors from '../styles/colors';

const NewPost = (props) => {
  const [isCameraVisible, setIsCameraVisible] = useState(true);
  const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const [imagePicker, setImagePicker] = useState(null);
  const [image, setImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [lastPhoto, setLastPhoto] = useState(null);

  useEffect(() => {
    _requestIOSCameraPermission();
    getCameraRollPhotos();
  }, []);

  const cameraRef = useRef(null);

  const _requestAndroidCameraPermission = async () => {
    try {
      const isCameraPermissionGranted = await checkMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ]);
      if (isCameraPermissionGranted[PERMISSIONS.ANDROID.CAMERA] === 'denied') {
        await request(PERMISSIONS.ANDROID.CAMERA);
      }
      if (
        isCameraPermissionGranted[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
        'denied'
      ) {
        await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      }
      if (
        isCameraPermissionGranted[
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
        ] === 'denied'
      ) {
        await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const _requestIOSCameraPermission = async () => {
    try {
      const isCameraPermissionGranted = await checkMultiple([
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.MEDIA_LIBRARY,
        PERMISSIONS.IOS.PHOTO_LIBRARY,
      ]);
      if (isCameraPermissionGranted[PERMISSIONS.IOS.CAMERA] === 'denied') {
        await request(PERMISSIONS.IOS.CAMERA);
      }
      if (
        isCameraPermissionGranted[PERMISSIONS.IOS.MEDIA_LIBRARY] === 'denied'
      ) {
        await request(PERMISSIONS.IOS.MEDIA_LIBRARY);
      }
      if (
        isCameraPermissionGranted[PERMISSIONS.IOS.PHOTO_LIBRARY] === 'denied'
      ) {
        await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // const _alertForIOSCameraPermission = () => {
  //   Alert.alert(
  //     'Access to use the camera?',
  //     'Access to the camera is required to add posts',
  //     [
  //       {
  //         text: 'No',
  //         onPress: () => {},
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Settings',
  //         onPress: Permissions.openSettings,
  //       },
  //     ],
  //     {cancelable: false},
  //   );
  // };

  const _switchFlashMode = () => {
    if (flashMode === RNCamera.Constants.FlashMode.off) {
      setFlashMode(RNCamera.Constants.FlashMode.on);
    } else if (flashMode === RNCamera.Constants.FlashMode.on) {
      setFlashMode(RNCamera.Constants.FlashMode.off);
    }
  };

  const _switchCameraType = () => {
    if (cameraType === RNCamera.Constants.Type.back) {
      setCameraType(RNCamera.Constants.Type.front);
    } else if (cameraType === RNCamera.Constants.Type.front) {
      setCameraType(RNCamera.Constants.Type.back);
    }
  };

  const _takePictureAsync = async () => {
    const options = {quality: 0.5, base64: true};
    const picture = await cameraRef.current.takePictureAsync(options);
    if (picture) {
      const mimeType = mime.lookup(picture.uri);
      const imagePickerRender = renderImage(picture);
      picture.type = mimeType;
      // picture.uri = picture.uri.replace('file:///', '/'); 
      picture.name = picture.uri;
      setImagePicker(imagePickerRender);
      setImage(picture);
      setIsCameraVisible(false);
      setModalVisible(true);
    }
  };

  const selectImage = async () => {
    const pickedImage = await galleryPicker();

    if (pickedImage) {
      const imagePickerRender = renderImage(pickedImage);
      setImagePicker(imagePickerRender);
      setImage(pickedImage);
      setIsCameraVisible(false);
      setModalVisible(true);
    }
  };

  const renderImage = (pickedImage) => {
    return (
      <View>
        <View
          style={{
            position: 'absolute',
            marginTop: 10,
            right: 10,
            zIndex: 10000000,
          }}>
          <Button backgroundColor="rgba(0,0,0,0.8)" onPress={editCancelPreview}>
            <Icon
              name="edit"
              type="MaterialIcons"
              style={{color: colors.white}}
            />
          </Button>
        </View>
        <Image style={postStyle.previewImage} source={pickedImage} />
      </View>
    );
  };

  const editCancelPreview = () => {
    setIsCameraVisible(true);
    setModalVisible(false);
  };

  const getCameraRollPhotos = async () => {
    await _requestAndroidCameraPermission();
    const photos = await CameraRoll.getPhotos({first: 1, assetType: 'Photos'});
    setLastPhoto(photos?.edges[0]?.node?.image?.uri);
  };

  const flashIconName =
    flashMode === RNCamera.Constants.FlashMode.off
      ? 'ios-flash-off'
      : 'ios-flash';
  const cameraTypeIconName =
    cameraType === RNCamera.Constants.Type.back ? 'refresh-ccw' : 'refresh-cw';
  return (
    <View>
      <View style={{width: '100%', height: '80%', backgroundColor: 'black'}}>
        {isCameraVisible && (
          <View style={{flex: 1, position: 'relative'}}>
            <RNCamera
              ref={cameraRef}
              // onCameraReady={() => setIsCameraReady(true)}
              type={cameraType}
              flashMode={flashMode}
              captureAudio={false}
              style={{flex: 1, overflow: 'hidden'}}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 30,
                left: 20,
                zIndex: 100000000,
              }}
              onPress={() => props.navigation.goBack()}>
              <Text fontSize={18} color={colors.white}>
                Cancel
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                minHeight: '10%',
                bottom: 0,
                position: 'absolute',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Button onPress={_switchCameraType} bgColor="transparent">
                <Feather
                  name={cameraTypeIconName}
                  size={25}
                  color={colors.white}
                />
              </Button>

              <Button onPress={_switchFlashMode} bgColor="transparent">
                <Icon
                  name={flashIconName}
                  type="Ionicons"
                  style={{fontSize: 25, color: colors.white}}
                />
              </Button>
            </View>
          </View>
        )}
      </View>
      <View style={{flex: 1}}>
        {lastPhoto && (
          <TouchableOpacity style={postStyle.cameraRoll} onPress={selectImage}>
            <Image source={{uri: lastPhoto}} style={{width: 70, height: 70}} />
          </TouchableOpacity>
        )}
        <View style={postStyle.cameraButtonView}>
          <View style={postStyle.uploadOuterCircle}>
            <TouchableOpacity
              onPress={_takePictureAsync}
              style={postStyle.uploadInnerCircle}>
              <View style={postStyle.smallUploadCircle} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        style={{
          padding: 0,
          margin: 0,
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.8)',
        }}
        isVisible={modalVisible}
        avoidKeyboard={false}
        swipeDirection="up"
        onSwipeComplete={editCancelPreview}>
        <View style={postStyle.cancelDone}>
          <Text
            fontSize={18}
            color={colors.white}
            style={{width: '50%'}}
            onPress={editCancelPreview}>
            Cancel
          </Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              setIsCameraVisible(true);
              props.navigation.navigate('CompletePost', {
                image,
              });
            }}>
            <Text fontSize={18} color={colors.white}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <View>{imagePicker && imagePicker}</View>
        </View>
      </Modal>
    </View>
  );
};

export default NewPost;
