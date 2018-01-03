const prefix = '/api/family';
const TIMEOUT = 100;

export default class {
  request;

  constructor(request) {
    this.request = request;
  }

  get(key, filter) {
    return this.request.get(`${prefix}/search/${key}/${filter}`)
    .then((response) => {
      //console.log(response);
      return Promise.resolve({
        key: key,
        filter: filter,
        data: response.data
      });
    })
    .catch((response) => {
      return Promise.resolve({
        key: key,
        filter: filter,
        data: response.data
      });
    });
  }

  set(id, index, key, value) {
    if (value) {
      return this.request.post(
        '/api/'+key+'s',
        {
          peopleId: id
        }
      )
      .then((response) => {
        return Promise.resolve({
          id: id,
          index: index,
          key: key,
          value: value,
          data: response.data
        });
      })
      .catch((response) => {
        return Promise.resolve({
          key: key,
          filter: filter,
          data: response.data
        });
      });
    } else {
      return request.delete(
        '/api/'+key+'s/'+id
      )
      .then((response) => {
        return Promise.resolve({
          id: id,
          index: index,
          key: key,
          value: value,
          data: response.data
        });
      })
      .catch((response) => {
        return Promise.resolve({
          key: key,
          filter: filter,
          data: response.data
        });
      });
    }
  }

  uploadAvatar(id, type, file, fileName, mimeType, entityId) {
    return request.post(
      `${prefix}/${id}/avatar`,
      {
        file,
        type,
        fileName,
        mimeType,
        entityId,
      }
    );
  }
}
