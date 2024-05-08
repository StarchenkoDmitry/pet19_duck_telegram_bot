import { IController } from "../types/Controller";
import { ControllerState } from "./ControllerState";
import { Keyboard } from "grammy";
import { ChangeController } from "./ControllerList";
import { DuckContext } from "../types/DuckContext";


type LanguageAndCode = { name: string, code:string };

export const LanguagesList: LanguageAndCode[] = [
    {code:"en",name:"English"},
    {code:"ua",name:"Українська"},
    {code:"ru",name:"Руский"},
    {code:"zh",name:"Chinese"},
]  as const;


const numberOfLanguage = LanguagesList.length;
const numberOfLanguageOnPage = 3;
const numberOfLanguageOnRow = 3;
const maxPageNumber = Math.ceil(numberOfLanguage / numberOfLanguageOnPage) - 1;

const userPageList = new Map<number,number>();

function createKeyborad(
    ctx: DuckContext,
    page:number
){
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
    .text(ctx.t("lang-settings_btn_to-menu"))
    .text(ctx.t("lang-settings_btn_back"))
    .text(ctx.t("lang-settings_btn_next"))
    .resized();
    return keys;
}

async function setUserKeyboard(
    ctx: DuckContext,
    page: number,
){
    const sendPage = page > maxPageNumber ? maxPageNumber : page < 0 ? 0 : page;
    userPageList.set(ctx.session.id, sendPage);
    await ctx.reply(ctx.t("lang-settings_page",{
        page: sendPage + 1,
        lastPage: maxPageNumber + 1
    }),{
        reply_markup: createKeyborad(ctx,sendPage)
    });
}

async function pageShift(
    ctx: DuckContext,
    offsetPage: number,
){
    const currentPage = userPageList.get(ctx.session.id) ?? 0;
    return await setUserKeyboard(ctx,currentPage + offsetPage);
}

export const LanguageSettingsController:IController = {
    state: ControllerState.languageSettings,
    controller: async (ctx)=>{
        const text = ctx.message?.text;
        if(!text) return;

        if(text === ctx.t("lang-settings_btn_next")){
            await pageShift(ctx,1);
        }
        else if(text === ctx.t("lang-settings_btn_back")){
            await pageShift(ctx,-1);
        }
        else if(text === ctx.t("lang-settings_btn_to-menu")){
            await ChangeController(ctx,ControllerState.menu);
        }
        else{
            const lang = LanguagesList.find(l=>l.name === text);
            if(lang){
                ctx.session.languageCode = lang.code;
                ctx.i18n.useLocale(lang.code);
                await ChangeController(ctx,ControllerState.menu);
            }
            else{
                await setUserKeyboard(ctx,0);
            }
        }
    },
    enter: async (ctx)=>{
        await ctx.reply(ctx.t("lang-settings_choose-lang"));
        await setUserKeyboard(ctx,0);
    },
}
