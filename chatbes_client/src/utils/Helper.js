import { io } from 'socket.io-client';

export const socket = io("http://192.168.175.248:3000/");