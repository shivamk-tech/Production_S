// Central API configuration
// Change the IP to match your machine's local network IP when testing on phone
const currentHost = window.location.hostname;
const BASE_URL = currentHost === 'localhost' || currentHost === '127.0.0.1'
  ? `http://${currentHost}:3003`
  : `http://${currentHost}:3003`;

export default BASE_URL;
