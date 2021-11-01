const actions = [
  {
    title: 'From Camera',
    type: 'capture',
    options: {
      saveToPhotos: false,
      mediaType: 'photo',
      includeBase64: false,
    },
  },
  {
    title: 'From Photos',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    },
  },
];

export default actions;
