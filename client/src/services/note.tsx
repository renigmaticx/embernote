import http from '../http-common';

class NoteDataService {
  readonly API_URI = '/api/v1/notes';

  getNotes(user: any) {
    return http.post(this.API_URI, user);
  }

  addNote(note: any) {
    return http.post(this.API_URI + '/add', note);
  }

  deleteNote() {
    return http.delete(this.API_URI + '/delete');
  }

  updateNote() {
    return http.patch(this.API_URI + '/update');
  }
}

export default new NoteDataService();
