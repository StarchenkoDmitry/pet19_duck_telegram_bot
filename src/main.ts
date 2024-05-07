import { Bot, session } from "grammy";
import { ChangeController, controllers } from "./controllers/ControllerList";

import { DuckContext } from "./types/DuckContext";
import { getSessionKey, initial, sessionExist } from "./db/sessionUtils";
import { ControllerState } from "./controllers/ControllerState";

import { run, sequentialize } from "@grammyjs/runner";
import { logger } from "./shared/logger/logger";
import { Config } from "./config";
import { createDataSource } from "./db/createDataSource";
import { SessionStorage } from "./db/SessionStorage";


async function bootstrap() {

    const db = await (await createDataSource()).initialize();
    const storage = new SessionStorage(db);

    const bot = new Bot<DuckContext>(Config.TELEGRAM_TOKEN);

    bot.use(
        sequentialize((ctx) => {
            return ctx.from?.id.toString();
        }),
    );

    bot.use(logger());

    bot.use(session({ 
        initial,
        getSessionKey,
        storage,
    }));

    bot.use(sessionExist());


    // bot.api.setMyCommands([
    //     {
    //         command:"start",
    //         description:"Start the bot"
    //     },
    //     {
    //         command:"restart",
    //         description:"Restart the bot"
    //     }
    // ])


    // bot.command("delete", async (ctx)=>{
    //     (ctx.session as any) = undefined;
    //     await ctx.reply(`current state:${ctx.session}`);
    // });


    bot.command("restart", async (ctx)=>{
        if(!ctx.from){ return; }
        console.log("event reset from:",ctx.from);
        await ctx.reply(`You are done reset.`);
        
        ctx.session.firstName = ctx.from.first_name;
        ctx.session.id = ctx.from.id;

        await ChangeController(ctx,ControllerState.menu);
    });

    bot.hears(["ping"], async (ctx) => {
        await ctx.reply("pong", {
            reply_parameters: { message_id: ctx.msg.message_id },
        });
    });

    bot.command("start", async (ctx)=>{
        if(!ctx.from){ return; }
        
        if(ctx.session.state !== ControllerState.none){
            await ctx.reply(`You are already registered.`);
            return;
        }

        ctx.session.firstName = ctx.from.first_name;
        ctx.session.id = ctx.from.id;
        // ctx.session.state = ControllerState.menu;

        await ctx.reply(`Congratulations you're a new user.`);

        await ChangeController(ctx,ControllerState.menu);
    });


    bot.on("message", async (ctx)=>{
        const state = ctx.session.state;

        if(state === ControllerState.none){
            await ctx.reply("You is not registered! Please type a message /start to chat.");
            return;
        }

        const controller = controllers.find((c)=>c.state === state);

        if(!controller){
            throw new Error("Controller is not found");
            return;
        }

        await controller.controller(ctx);
    });

    const handle = run(bot, {
        runner:{
            fetch:{
                // allowed_updates:[
                //     "message_reaction",
                //     "message",
                //     "business_connection",
                //     "callback_query",
                //     "deleted_business_messages"
                // ]
            },
        }
    });

    return handle;
}

console.log("Bot is going run.");
bootstrap().then((handler)=>{
    console.log("Bot is started!");
});
