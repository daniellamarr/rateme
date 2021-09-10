import axios from 'axios';

const preset = 'rateme_preset';

const imageUpload = async (image) => {
  var form = new FormData();
  form.append('upload_preset', preset);
  form.append('file', image);
  const upload = await axios.post(
    'https://api.cloudinary.com/v1_1/daniel-lamarr/image/upload',
    form,
  );

  return upload;
};

export default imageUpload;
