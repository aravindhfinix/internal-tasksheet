// package imports 
import https from 'https';
import http from 'http';
import chalk from 'chalk';

// local imports
import { config, mongoose , backup} from './config/index';
import RouteServiceProvider from './providers/route-service-provider';
import SocketConfig from './config/socket';
//route service provider
const routeServiceProvider = new RouteServiceProvider();

//mongoDB connection
mongoose.connectDB();
backup.dataBackup();

// serve http request
const server = http.createServer(routeServiceProvider.app);

//init socket connection
const socketConnecton = new SocketConfig(server);
//on connection function
socketConnecton.socket.on('connection', socketConnecton.onConnection)

// Enable to serve https server
// const options = {
//     key: fs.readFileSync(config.HTTPS_KEY_PATH),
//     cert: fs.readFileSync(config.HTTPS_CERT_PATH)
// }
// const server = https.createServer(options, app);

// start http server
server.listen(config.ENV.PORT, () => { console.log(chalk.green.bold.italic(`app running on port ${config.ENV.PORT}`)); });

