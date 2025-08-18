// import { subscriber } from "../config/messageClient.js";

// export const subscribeToChannel = () => {
//     subscriber.subscribe('employee:operations', (err, count) => {
//     if (err) {
//       console.error('Failed to subscribe', err);
//       return;
//     }
//     console.log(`Subscribed to ${count} channel(s). Waiting for operations...`);
//   })
// }

// export const logMessages = () => {
//   subscriber.on('message', (channel, message) => {
//   try {
//     console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
//   } catch (e) {
//     console.log('[Analytics Error] Invalid JSON message:', message);
//   }
// });
// }

import { subscriber } from "../config/messageClient.js";
import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

export const subscribeToChannel = () => {
  subscriber.subscribe('employee:operations', (err, count) => {
    if (err) return console.error('Subscribe failed:', err);
    console.log(`Subscribed to ${count} channel(s). Waiting for operations...`);
  });
}

export const logMessages = () => {
  subscriber.on('message', (channel, message) => {
    // const payload = `[${new Date().toLocaleTimeString()}] ${message}`;
    const payload = `[${new Date().toLocaleTimeString('en-US', { hour12: true })}] ${message}`;
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  });
}
