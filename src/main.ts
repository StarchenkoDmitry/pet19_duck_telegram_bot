import { Config, LANGUAGE_CODE_DEFAULT } from "./config";

import { Bot, session } from "grammy";
import { run, sequentialize } from "@grammyjs/runner";

import { DuckContext } from "./types/DuckContext";

import { getSessionKey, initial, sessionExist } from "./db/sessionUtils";
import { SessionStorage } from "./db/SessionStorage";
import { createDataSource } from "./db/createDataSource";

import { createTranslator } from "./i18n/translater";
import { logger } from "./shared/logger/logger";

import { ControllerState } from "./controllers/ControllerState";
import { ChangeController, controllers } from "./controllers/ControllerList";


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

    bot.use(createTranslator());


    bot.command("restart", async (ctx)=>{
        if(!ctx.from){ return; }
        
        ctx.session.firstName = ctx.from.first_name;
        ctx.session.id = ctx.from.id;
        ctx.session.languageCode = ctx.from.language_code ?? LANGUAGE_CODE_DEFAULT;
        ctx.i18n.useLocale(ctx.session.languageCode);
        
        console.log("event reset from:",ctx.from);
        await ctx.reply(ctx.t("restart"));

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
            await ctx.reply(ctx.t("start-registered"));
            return;
        }

        ctx.session.firstName = ctx.from.first_name;
        ctx.session.id = ctx.from.id;
        ctx.session.languageCode = ctx.from.language_code ?? LANGUAGE_CODE_DEFAULT;
        ctx.i18n.useLocale(ctx.session.languageCode);

        await ctx.reply(ctx.t("start-welcome"));

        await ChangeController(ctx,ControllerState.menu);
    });


    bot.on("message", async (ctx)=>{
        const state = ctx.session.state;

        if(state === ControllerState.none){
            await ctx.reply(ctx.t("auth-error-unregistered"));
            return;
        }

        const controller = controllers.find((c)=>c.state === state);

        if(!controller){
            await ChangeController(ctx,ControllerState.menu);
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
