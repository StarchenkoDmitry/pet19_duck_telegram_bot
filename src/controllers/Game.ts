import { randomInt } from "crypto";
import { IController } from "../types/Controller";
import { ControllerState } from "./ControllerState";
import { Keyboard } from "grammy";
import { ChangeController } from "./ControllerList";
import { DuckContext } from "../types/DuckContext";


export const Games = {
    OnePixel: "Один пиксилёк",
    Pong: "Ping 🏓 Pong"
} as const;

export const Weapones = {
    Lapka: "Лапка",
    NewGun: "СеткаҐАН"
} as const; 


export type MapsType = (typeof Games)[keyof typeof Games];
export type WeaponesType = (typeof Weapones)[keyof typeof Weapones];


export interface GameState{
    map: MapsType;
    weapone: WeaponesType;
}


export function GetRandomMap(){
    const keys = Object.keys(Games) as [keyof typeof Games];
    return Games[keys[randomInt(keys.length)]];
}

export function CreateGame():GameState {
    return {
        map: GetRandomMap(),
        weapone: Weapones.Lapka
    };
}


function createGameMenu(ctx: DuckContext){
    const gamesKeyboard = new Keyboard();
    Object.values(Games).forEach((g)=>{
        gamesKeyboard.text(g).row()
    });
    gamesKeyboard.text(ctx.t("game_to-menu"));
    return gamesKeyboard;
}

export const GameController:IController = {
    state: ControllerState.game,
    controller: async (ctx)=>{
        const text = ctx.message?.text;
        if(!text)return;

        switch(text){
            case ctx.t("game_to-menu"):
                await ChangeController(ctx,ControllerState.menu);
            break;
            case Games.Pong:
                await ChangeController(ctx,ControllerState.pingpong);
            break;
            // case Maps.OnePixel:
            //     await ChangeController(ctx,ControllerState.pingpong);
            // break;
            default:
                //todo:
                await ChangeController(ctx,ControllerState.menu);
            break;
        }
    },
    enter: async (ctx) =>{
        await ctx.reply(ctx.t("game_choose"),{
            reply_markup: createGameMenu(ctx)
        });
    }
}
