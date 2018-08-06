import { sha3_256 } from 'js-sha3';

const captureFile = (convertToBuffer, event) => {
  event.stopPropagation();
  event.preventDefault();
  const file = event.target.files[0];
  console.log('here', file);
  let reader = new window.FileReader();
  reader.readAsArrayBuffer(file);
  reader.onloadend = () => convertToBuffer(reader, file);
};

const convertBufferToHash = (buffer) => {
  return sha3_256(buffer);
};

export {
  captureFile,
  convertBufferToHash
}
