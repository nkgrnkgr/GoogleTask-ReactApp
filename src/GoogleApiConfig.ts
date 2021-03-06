const config = {
  CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
  API_KEY: process.env.REACT_APP_API_KEY,
  DISCOVERY_DOCS: [
    'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest',
  ],
  SCOPES: 'https://www.googleapis.com/auth/tasks',
};
export default config;
