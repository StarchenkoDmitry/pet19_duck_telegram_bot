import 'dotenv/config'
import { IsNullOrUndefined, IsString } from './utils/check';

export class Config{

    static get TELEGRAM_TOKEN():string {
        const data = process.env.TELEGRAM_TOKEN;
    
        if(data === null || data === undefined){
            throw new Error("TELEGRAM_TOKEN is undefined.");
        }
    
        if(!IsString(data)){
            throw new Error("TELEGRAM_TOKEN is not string type.");
        }
    
        return data;
    }

    static get DB_HOST():string {
        const data = process.env.DB_HOST;

        if(data === null || data === undefined){
            throw new Error("DB_HOST is undefined.");
        }
    
        if(!IsString(data)){
            throw new Error("DB_HOST is not string type.");
        }
    
        return data;
    }
    
    static get DB_PORT():number {
        const data = process.env.DB_PORT;

        if(data === null || data === undefined){
            throw new Error("DB_PORT is undefined.");
        }
    
        if(!IsString(data)){
            throw new Error("DB_PORT is not string type.");
        }
    
        return parseInt(data);
    }

    static get DB_DATABASE():string {
        const data = process.env.DB_DATABASE;

        if(data === null || data === undefined){
            throw new Error("DB_DATABASE is undefined.");
        }
    
        if(!IsString(data)){
            throw new Error("DB_DATABASE is not string type.");
        }
    
        return data;
    }
    
    static get DB_USER():string {
        const data = process.env.DB_USER;

        if(data === null || data === undefined){
            throw new Error("DB_USER is undefined.");
        }
    
        if(!IsString(data)){
            throw new Error("DB_USER is not string type.");
        }
    
        return data;
    }
    
    static get DB_PASSWORD():string {
        const data = process.env.DB_PASSWORD;

        if(data === null || data === undefined){
            throw new Error("DB_PASSWORD is undefined.");
        }
    
        if(!IsString(data)){
            throw new Error("DB_PASSWORD is not string type.");
        }
    
        return data;
    }
}
