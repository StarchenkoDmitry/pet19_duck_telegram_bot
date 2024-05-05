import { Context, MiddlewareFn } from "grammy";
import { DuckContext } from "../types/DuckContext";
import { ControllerState } from "../controllers/ControllerState";
import { UserSession } from "./entities/User.entity";


export function initial(): UserSession {
    console.log("init sessionData");
    return {
        id: -1,
        firstName: "",
        state: ControllerState.none,
    };
}

export function getSessionKey(ctx: Context): string | undefined {
    return ctx.from?.id.toString();
}


export function sessionExist():MiddlewareFn<DuckContext>{
    return async (ctx,next)=>{
        // console.log("sessionExist: ",ctx.from);
        
        if(ctx.from && ctx.from.id >= 0){
            await next();
        }
        else{
            await ctx.reply("your id is not exit")
        }
    }
}
