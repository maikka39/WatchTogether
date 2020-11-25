import io from "socket.io-client";
import { SEVER_ENDPOINT } from "../config";

export let socket;

if (socket === undefined) {
  socket = io(SEVER_ENDPOINT);
}



// export function intializeSocket() {
//   socket = io(SEVER_ENDPOINT);
// }
