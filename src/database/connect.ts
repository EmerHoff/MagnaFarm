import { createConnection } from 'typeorm';

createConnection().then(() => console.log('Connection successfully with database!'));