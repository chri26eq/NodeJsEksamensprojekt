import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const connection = await open({
    filename: "car-cards.db",
    driver: sqlite3.Database
});


export default connection;
