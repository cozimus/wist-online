import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://wist-online-server.glitch.me"
    : // : "http://localhost:4000";
      "https://wist-online-server.glitch.me";

export const socket = io(URL);
