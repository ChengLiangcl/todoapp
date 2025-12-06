import bucket from './firebase';
const uploadFile = async (file, filePath) => {
  try {
    const { mimetype, buffer } = file;
    const fileRef = bucket.file(filePath);
    await fileRef.save(buffer, { contentType: mimetype, public: true });

    const url = `https://storage.googleapis.com/${bucket.name}/${fileRef.name}`;
    return url;
  } catch (err) {
    return err;
  }
};

export { uploadFile };
