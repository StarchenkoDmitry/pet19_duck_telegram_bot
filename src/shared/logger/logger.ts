import { MiddlewareFn } from "grammy";
import { DuckContext } from "../../types/DuckContext";

export function logger():MiddlewareFn<DuckContext>{
    return async (ctx,next)=>{
        console.log(`name:${ctx.from?.first_name}|text:${ctx.msg?.text}`);
        await next();
    }
}
