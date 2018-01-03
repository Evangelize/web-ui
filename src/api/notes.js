export default class {
  request;

  constructor(request) {
    this.request = request;
  }

  get(key, filter) {
    return this.request.get('/api/people/search/'+key+'/'+filter)
    .then((response) => {
      console.log(response);
      return Promise.resolve({
        key: key,
        filter: filter,
        data: response.data
      });
    })
    .catch((response) => {
      return Promise.reject({
        key: key,
        filter: filter,
        data: response.data
      });
    });
  }

  add(note) {
    return this.request.post(
      '/api/notes',
      note
    )
    .then((response) => {
      return Promise.resolve({
        data: response.data
      });
    })
    .catch((response) => {
      return Promise.reject({
        data: response.data
      });
    });

  }

  update(note, changes) {
    return this.request.put(
      '/api/notes/'+note.id,
      changes
    )
    .then((response) => {
      return Promise.resolve({
        id: note.id,
        data: response.data
      });
    })
    .catch((response) => {
      return Promise.reject({
        id: note.id,
        data: response.data
      });
    });

  }
}
