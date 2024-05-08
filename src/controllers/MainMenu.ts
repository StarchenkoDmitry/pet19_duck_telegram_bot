import { IController } from "../types/Controller";
import { ControllerState } from "./ControllerState";
import { Keyboard } from "grammy";
import { randomInt } from "crypto";
import { ChangeController } from "./ControllerList";
import { DuckContext } from "../types/DuckContext";



const weapones = [ "🦆Лапка", "🕸СеткаҐАН" ] as const;


function createMenu(ctx: DuckContext){
    const menu = new Keyboard()
    .text(ctx.t("main-menu_btn_choose-game")).row()
    .text(ctx.t("main-menu_btn_random-weapon")).row()
    .text(ctx.t("main-menu_btn_whoami"))
    .text(ctx.t("main-menu_btn_lang-settings")).row()
    .resized();
    return menu;
}
    
export const MainMenuController:IController = {
    state: ControllerState.menu,
    controller: async (ctx)=>{
        const text = ctx.message?.text;
        
        if(!text)return;

        switch(text){
            case ctx.t("main-menu_btn_choose-game"):
                await ChangeController(ctx,ControllerState.game);
            break;
            case ctx.t("main-menu_btn_lang-settings"):
                await ChangeController(ctx,ControllerState.languageSettings);
            break;
            case ctx.t("main-menu_btn_random-weapon"):                
                const weapone = weapones[randomInt(weapones.length)];
                await ctx.reply(ctx.t("main-menu_random-weapone",{ weapone }));
            break;
            case ctx.t("main-menu_btn_whoami"):
                await ctx.reply(ctx.t("main-menu_whoami"));
            break;
        }
    },
    enter: async (ctx)=>{
        await ctx.reply(ctx.t("title-menu"),{
            reply_markup: createMenu(ctx)
        });
    }
}
