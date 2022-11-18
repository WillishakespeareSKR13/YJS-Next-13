const config = {
  URL: process.env.URL ?? "http://localhost:3000/api/socketio",
  WS_URL: process.env.WS_URL ?? "ws://localhost:3000",
};

export default config;
