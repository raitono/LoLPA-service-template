import app from './app';
import * as http from 'http';
import { AddressInfo } from 'net';

const debug: any = require('debug')('service:server');

const server = app.listen(0);
const port = (<AddressInfo>server.address()).port;

const register = () => {
  http.request({
    host: process.env.REGISTRY_URL,
    port: process.env.REGISTRY_PORT,
    path: `/register/${process.env.SERVICE_NAME}/${process.env.SERVICE_VERSION}/${port}`,
    method: 'PUT',
  });
};

register();

const interval = setInterval(register, 20 * 1000);

debug(`Service listening on port ${port}...`);

export default server;
