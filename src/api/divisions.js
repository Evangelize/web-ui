import _ from 'lodash';

export default class {
  request;

  constructor(request) {
    this.request = request;
  }

  getConfigs() {
   return this.request.get('/api/divisions/configs')
    .then(function (response) {
      return Promise.resolve({
        divisionConfigs: response.data
      });
    })
    .catch(function (response) {
      return Promise.resolve({
        data: response.data
      });
    });
  }
}
