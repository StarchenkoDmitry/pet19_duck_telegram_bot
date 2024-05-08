import { KeyboardButton } from "grammy/types";
import { IController } from "../types/Controller";
import { CreateGame } from "./Game";
import { ControllerState } from "./ControllerState";
import { Keyboard } from "grammy";
import { randomInt } from "crypto";
import { ChangeController } from "./ControllerList";


// export const KeyStartPlay = "Start play";

export const KeyChooseGame = "🎮Choose a game";
export const KeyRandomWeapone = "🎲Random Weapone";
export const KeyWhoAmI = "🤪Who am I";
export const KeySettings = "👅Language Settings";

const weapones = [ "🦆Лапка", "🕸СеткаҐАН" ] as const;

const menu = new Keyboard()
    .text(KeyChooseGame).row()
    .text(KeyRandomWeapone).row()
    .text(KeyWhoAmI).text(KeySettings).row()
    .resized();

export const MainMenuController:IController = {
    state: ControllerState.menu,
    controller: async (ctx)=>{
        const text = ctx.message?.text;
        
        if(!text)return;

        switch(text){
            case KeyChooseGame:
                await ChangeController(ctx,ControllerState.game);
            break;
            case KeySettings:
                await ChangeController(ctx,ControllerState.languageSettings);
            break;
            case KeyRandomWeapone:                
                const weapone = weapones[randomInt(weapones.length)];
                await ctx.reply(ctx.t("main-menu_random-weapone",{ weapone }));
            break;
            case KeyWhoAmI:
                await ctx.reply(ctx.t("main-menu_whoami"));
            break;
        }
    },
    enter: async (ctx)=>{
        await ctx.reply(ctx.t("title-menu"),{
            reply_markup: menu
        });
    }
}
