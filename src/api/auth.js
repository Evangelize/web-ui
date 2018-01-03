export default class {
  request;

  constructor(request) {
    this.request = request;
  }

  login(email, password) {
    return this.request.post(
      '/api/auth/login',
      {
        email,
        password,
      }
    )
    .then((response) => Promise.resolve(response.data))
    .catch((response) => Promise.reject(response.data));
  }

  thirdPartyLogin(type, token) {
    return this.request.post(
      '/api/auth/thirdPartyLogin',
      {
        type,
        token,
      }
    )
    .then((response) => Promise.resolve(response.data))
    .catch((response) => Promise.reject(response.data));
  }
}
