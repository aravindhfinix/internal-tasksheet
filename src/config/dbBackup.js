import BaseConfig from "./base";
const path = require('path');
const cron = require('node-cron');
const fs = require("fs");
const fsPromises = require("fs").promises;
const {
  spawn
} = require("child_process");

export default class dbBackup extends BaseConfig {
    constructor() {
        super();
    }
    async dataBackup() {
        const dbName = this.ENV.MONGODB_DB_NAME ;
        const archivePath = path.join(process.cwd(), 'dbBackUp', `${dbName}.gzip`);

        // if Directory Not exist make Directory 
        if (!fs.existsSync(path.join(process.cwd(), "backup"))) {
            await fsPromises.mkdir(path.join(process.cwd(), "backup"));
          }

        // Scheduling the backup every 5 seconds (using node-cron)
        cron.schedule('0 0 * * *', () => {
            console.log("enter")
            const child = spawn('mongodump', [
                `--db=${dbName}`,
                `--archive=${archivePath}`,
                '--gzip',
            ]);
            console.log(dbName,archivePath)
            
            child.stdout.on('data', (data) => {
                console.log('stdout:\n', data);
            });
            child.stderr.on('data', (data) => {
                console.log('stderr:\n', Buffer.from(data).toString());
            });
            child.on('error', (error) => {
                console.log('error:\n', error);
            });
            child.on('exit', (code, signal) => {
                if (code) console.log('Process exit with code:', code);
                else if (signal) console.log('Process killed with signal:', signal);
                else console.log('Database Backup successfully...');
            });
        });
    }
}
