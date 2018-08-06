import axios from 'axios';

function createUserLocal(userInfo) {
  console.log('hey', userInfo);
  return axios('http://localhost:8080/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(userInfo)
  })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    })
}

function loginLocal(userInfo) {
  console.log('hey', userInfo);
  return axios('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    data: JSON.stringify(userInfo)
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
}

function getSession() {
  return axios('http://localhost:8080/session', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
  })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
}

export default {
  createUserLocal,
  loginLocal,
  getSession
};