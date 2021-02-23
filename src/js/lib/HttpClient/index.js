const request = (type, url, options, onSuccess, onError) => {
  // XMLHttpRequest
  // axios.get(url).thsn()p

  fetch(url, {
    method: type,
    headers: {
      'content-type': 'application/json',
    },
    ...options,
  })
    .then((res) => res.json())
    .then((result) => {
      onSuccess(result);
    })
    .catch((err) => {
      console.log(err);
      onError(err);
    });
};

// function request (type) {
//     if (condition) {

//     }
// }

export default {
  get: (url, options, onSuccess, onFailure) => {
    request('get', url, options, onSuccess, onFailure);
    // request('get');
  },
  post: (url, options, onSuccess, onFailure) => {
    request('post', url, options, onSuccess, onFailure);
    // request('post');
  },
  put: (url, options, onSuccess, onFailure) => {
    request('put', url, options, onSuccess, onFailure);
    // request('put');
  },
  delete: (url, options, onSuccess, onFailure) => {
    request('delete', url, options, onSuccess, onFailure);
    // request('delete');
  },
};
