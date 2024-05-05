import { DataSource } from "typeorm";
import { join } from "node:path";
import { Config } from "../config";

export async function createDataSource(){
    const db = new DataSource({
        type: "postgres",
        host: Config.DB_HOST,
        port: Config.DB_PORT,
        database: Config.DB_DATABASE,
        username: Config.DB_USER,
        password: Config.DB_PASSWORD,
        migrationsRun: true,
        entities: [join(__dirname, 'entities/*.ts').replace(/\\/g, '/')],
        migrations: [join(__dirname, 'migrations/*.ts').replace(/\\/g, '/')],
        // migrations: ["src/migrations/*.ts"]
    });
    return db;
}
