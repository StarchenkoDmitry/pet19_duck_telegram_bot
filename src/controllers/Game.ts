import { randomInt } from "crypto";
import { IController } from "../types/Controller";
import { ControllerState } from "./ControllerState";
import { Keyboard } from "grammy";
import { ChangeController } from "./ControllerList";


// export const KeyActionFire = "Сделать пиу💥";
export const KeyActionExit = "Выход/Выйти🔙 в меню";


export const Maps = {
    OnePixel: "Один пиксилёк",
    Pong: "Ping 🏓 Pong"
} as const;

export const Weapones = {
    Lapka: "Лапка",
    NewGun: "СеткаҐАН"
} as const; 

export const Steps = {
    ChooseGun: "Выбирите пуську(не пisьку)",
    Fight: "Бой"
} as const;


export type MapsType = (typeof Maps)[keyof typeof Maps];
export type WeaponesType = (typeof Weapones)[keyof typeof Weapones];


export interface GameState{
    map: MapsType;
    weapone: WeaponesType;
}


export function GetRandomMap(){
    const keys = Object.keys(Maps) as [keyof typeof Maps];
    return Maps[keys[randomInt(keys.length)]];
}

export function CreateGame():GameState {
    return {
        map: GetRandomMap(),
        weapone: Weapones.Lapka
    };
}


const gamesKeyboard = new Keyboard();
Object.values(Maps).forEach((m)=>{
    gamesKeyboard.text(m).row()
});
gamesKeyboard.text(KeyActionExit);


export const GameController:IController = {
    state: ControllerState.game,
    controller: async (ctx)=>{
        const text = ctx.message?.text;
        if(!text)return;

        switch(text){
            case KeyActionExit:
                await ChangeController(ctx,ControllerState.menu);
            break;
            case Maps.Pong:
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
        await ctx.reply("Choose a game.",{
            reply_markup: gamesKeyboard
        });
    }
}