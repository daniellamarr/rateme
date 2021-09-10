import ImagePicker from 'react-native-image-crop-picker';

export const galleryPicker = async (
  mediaType = 'photo',
  cropping = true,
  multiple = false,
) => {
  try {
    const pickMedia = await ImagePicker.openPicker({
      width: 500,
      height: 400,
      mediaType,
      cropping,
      multiple,
    });

    return {
      uri: pickMedia.path,
      name: pickMedia.path,
      type: pickMedia.mime,
    };
  } catch (err) {
    err;
  }
};

export const cameraPicker = () => {
  ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
    useFrontCamera: false,
  }).then((image) => {
    console.log(image);
  });
};
