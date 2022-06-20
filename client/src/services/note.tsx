import http from '../http-common';

class NoteDataService {
  getAll() {
    return http.get('/api/v1/notes');
  }
}

export default new NoteDataService();
