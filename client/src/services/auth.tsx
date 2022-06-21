import http from '../http-common';

class AuthService {
  login(user: any) {
    return http.post('/user/login', user);
  }

  register(user: any) {
    return http.post('/user/register', user);
  }
}

export default new AuthService();
