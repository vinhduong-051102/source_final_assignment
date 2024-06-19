import axios from 'axios';

const instance = axios.create({
  baseURL: `localhost:6868/`,
});

instance.defaults.timeout = 25000;

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if (response.response.status === 405) {
    return response.response;
  }
  throw new Error(response.statusText);
}

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const responseError = {
      ...error,
      response: {
        ...error.response,
      },
    };

    if (error.response) {
    }

    return responseError;
  }
);

export async function axiosGet(path) {
  return await instance
    .get(path)
    .then(checkStatus)
    .catch((error) => {
      if (!JSON.parse(JSON.stringify(error)).response) throw error;
    });
}

export async function axiosPost(path, body) {
  return await instance
    .post(path, body)
    .then(checkStatus)
    .catch((error) => {
      if (!JSON.parse(JSON.stringify(error)).response) throw error;
    });
}

export async function axiosDelete(path) {
  return await instance
    .delete(path)
    .then(checkStatus)
    .catch((error) => {
      throw error;
    });
}

export async function axiosPut(path, body) {
  return await instance
    .put(path, body)
    .then(checkStatus)
    .catch((error) => {
      if (!JSON.parse(JSON.stringify(error)).response) throw error;
    });
}
