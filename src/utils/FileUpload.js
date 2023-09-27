import axios from 'axios';

export const LocalFileUpload = async (e, size, width, height) => {
  const formData = new FormData();
  formData.append('file', e.target.files[0]);

  return new Promise((resolve, reject) => {
    if (size) {
      const fileSize = e.target.files[0]?.size;

      const mb = (fileSize / 1024 ** 2).toFixed(2);

      if (mb > 2) {
        reject('Image size should be under 5mb');
      }
    }
    let url = URL.createObjectURL(e.target.files[0]);
    if (width && height) {
      let image = new Image();
      image.src = url;

      image.onload = function () {
        let h = this.height;
        let w = this.width;
        resolve({ location: url });
        /*  if (h !== height || w !== width) {
          console.log('error');
          reject(`image shold be ${width}w x ${height}h dimensions`);
        } else {
          resolve({ location: url });
        } */
      };

      image.onerror = err => {
        reject(err);
      };
    }
  });
};
export const LocalFileUpload2 = (e, size, width, height) => {
  const formData = new FormData();
  formData.append('file', e.target.files[0]);

  if (size) {
    const fileSize = e.target.files[0]?.size;

    const mb = (fileSize / 1024 ** 2).toFixed(2);

    if (mb > 2) {
      throw new Error('Image size should be under 5mb ');
    }
  }
  let url = URL.createObjectURL(e.target.files[0]);
  if (width && height) {
    let image = new Image();
    image.src = url;

    image.onload = function () {
      let h = this.height;
      let w = this.width;

      resolve({ location: url });
      if (h !== height || w !== width) {
        throw new Error(`image shold be ${width}w x ${height}h dimensions`);
        reject(`image shold be ${width}w x ${height}h dimensions`);
      } else {
        return { location: url };
      }
    };

    image.onerror = err => {
      throw new Error(`image shold be ${width}w x ${height}h dimensions`);
    };
  }
};
export const FileUpload = async (e, size, width, height) => {
  const formData = new FormData();
  formData.append('file', e.target.files[0]);

  try {
    const response = await axios.post(
      'https://api.jadzzo.com/v1/aws/upload',
      formData
    );
    return Promise.resolve(response?.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const FileUpload2 = async (file, size, width, height) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(
      'https://api.jadzzo.com/v1/aws/upload',
      formData
    );
    return Promise.resolve(response?.data);
  } catch (err) {
    return Promise.reject(err);
  }
};