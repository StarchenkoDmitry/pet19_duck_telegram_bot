import { IController } from "../types/Controller";
import { ControllerState } from "./ControllerState";
import { Keyboard } from "grammy";
import { ChangeController } from "./ControllerList";


type LanguageAndCode = { name: string, code:string };

export const LanguagesList: LanguageAndCode[] = [
    {code:"en",name:"English"},
    {code:"ua",name:"Українська"},
    {code:"ru",name:"Руский"},
    {code:"zh",name:"Chinese"},
]  as const;

export const KeyToMenu = "Menu";
export const KeyBack = "🔙Back";
export const KeyNext = "⏭Next";

const numberOfLanguage = LanguagesList.length;
const numberOfLanguageOnPage = 6;
const numberOfLanguageOnRow = 3;
const maxPageNumber = Math.ceil(numberOfLanguage / numberOfLanguageOnPage) - 1;

type KeyboradState = { currentPage: number };

const states = new Map<number,KeyboradState>();

function createKeyborad(page:number){
    const keys = new Keyboard();

    let i = page * numberOfLanguageOnPage;
    let k = 0;
    for(; i < LanguagesList.length && k < numberOfLanguageOnPage; i++, k++){
        if(k % numberOfLanguageOnRow === 0){
            keys.row();
        }
        keys.text(LanguagesList[i].name);
    }

    keys.row()
    .text(KeyToMenu)
    .text(KeyBack)
    .text(KeyNext)
    .resized();
    return keys;
}

export const LanguageSettingsController:IController = {
    state: ControllerState.languageSettings,
    controller: async (ctx)=>{
        const text = ctx.message?.text;
        if(!text) return;

        const state = states.get(ctx.session.id);
        if(!state){
            states.set(ctx.session.id,{
                currentPage: 0
            });
            await ctx.reply("Choose a language lol",{
                reply_markup: createKeyborad(0)
            });
            return;
        }

        if(text === KeyNext){
            const nextPage = state.currentPage + 1 > maxPageNumber ? maxPageNumber : state.currentPage + 1;

            states.set(ctx.session.id,{
                currentPage: nextPage
            });
            await ctx.reply(`Next page number ${nextPage+1}`,{
                reply_markup: createKeyborad(nextPage)
            });
            return;
        }else if(text === KeyBack){
            const backPage = state.currentPage - 1 < 0 ? 0 : state.currentPage - 1;

            states.set(ctx.session.id,{
                currentPage: backPage
            });
            await ctx.reply(`Next page number ${backPage+1}`,{
                reply_markup: createKeyborad(backPage)
            });
            return;
        }else if(text === KeyToMenu){
            await ChangeController(ctx,ControllerState.menu);
            return;
        }

        const lang = LanguagesList.find(l=>l.name === text);
        if(lang){
            ctx.session.languageCode = lang.code;
            await ChangeController(ctx,ControllerState.menu);
        }else{
            states.set(ctx.session.id,{
                currentPage: 0
            });
            await ctx.reply(`Next page number of ${0+1}`,{
                reply_markup: createKeyborad(0)
            });
        }
    },
    enter: async (ctx)=>{
        states.set(ctx.session.id,{
            currentPage: 0
        });
        await ctx.reply("Choose a language",{
            reply_markup: createKeyborad(0)
        });
    }
}
