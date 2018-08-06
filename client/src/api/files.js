import 'whatwg-fetch';

function createLink(fileHash, fileName) {
  return fetch('http://localhost:8080/files', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    withCredentials: true,
    body: JSON.stringify({
      fileHash,
      fileName
    })
  });
}

async function verifyFile(fileHash, email) {
  console.log(fileHash);
  console.log(email);
  return fetch('http://localhost:8080/files/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    withCredentials: true,
    body: JSON.stringify({
      fileHash,
      email
    })
  });
}

function getUserFiles() {
  return fetch('http://localhost:8080/files', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
    .then((res) => res.json());
}

export default {
  createLink,
  verifyFile,
  getUserFiles
};