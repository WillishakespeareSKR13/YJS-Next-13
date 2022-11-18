import { atom } from "jotai";
import { SocketIOProvider } from "y-socket.io";

export const socketAtom = atom(null as SocketIOProvider);
