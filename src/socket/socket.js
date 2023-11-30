import { io } from "socket.io-client";

const URL = "https://imaa-2585bbde653a.herokuapp.com/";
const socket = io.connect(URL);

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;