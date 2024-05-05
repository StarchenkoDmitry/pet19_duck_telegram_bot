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

const weapones = [ "🦆Лапка", "🕸СеткаҐАН" ] as const;

const menu = new Keyboard()
    .text(KeyChooseGame).row()
    .text(KeyRandomWeapone).row()
    .text(KeyWhoAmI).row()
    .resized();

export const MainMenuController:IController = {
    state: ControllerState.menu,
    controller: async (ctx)=>{
        const text = ctx.message?.text;
        
        if(!text)return;

        const user = ctx.session;

        switch(text){
            case KeyChooseGame:
                await ChangeController(ctx,ControllerState.game);
            break;
            case KeyRandomWeapone:
                
                const weapone = weapones[randomInt(weapones.length)];

                await ctx.reply(`You have been given ${weapone}`);
            break;
            case KeyWhoAmI:
                await ctx.reply(`First name: ${ctx.session.firstName}`);
            break;
        }
    },
    enter:  async (ctx)=>{
        await ctx.reply("Меню",{
            reply_markup: menu
        });
    }
}
