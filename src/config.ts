import 'dotenv/config'


export function getToken():string {
    const token = process.env.TELEGRAM_TOKEN;

    if(token === null || token === undefined){
        throw new Error("TELEGRAM_TOKEN is undefined.")
    }

    if(typeof token !== "string"){
        throw new Error("TELEGRAM_TOKEN is not string type.")
    }

    return token;
}
