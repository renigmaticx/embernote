import http from '../http-common';

class NoteDataService {
  getAll() {
    return http.get('');
  }
}

export default new NoteDataService();
