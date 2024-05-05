import { randomInt } from "crypto";
import { IController } from "../../types/Controller";
import { ControllerState } from "../ControllerState";
import { Keyboard } from "grammy";
import { ChangeController } from "../ControllerList";


const MAX_TIME = 3000;
const MIN_TIME = 1000;


const KeyActionPing = "Ping 🏓";
const KeyActionPong = "Pong 🦆";

const KeyActionExit = "Выход/Выйти🔙 в меню";


type KeyKey = typeof KeyActionPing | typeof KeyActionPong;
const KeyActions = [KeyActionPing,KeyActionPong] as const;

interface PingPingGameData{
    isReacted: boolean;
    userKey?: KeyKey;
    timeKey?: number;
    timerHandle?: NodeJS.Timeout;
};

const gameSessions = new Map<number,PingPingGameData>();


const pingpongKeyboard = new Keyboard();
KeyActions.forEach((m)=>{
    pingpongKeyboard.text(m).row()
});
pingpongKeyboard.row();
pingpongKeyboard.text(KeyActionExit);

export const PingPong:IController = {
    state: ControllerState.pingpong,   

    enter: async (ctx)=>{
        const game = gameSessions.get(ctx.session.id);
        if(game){
            if(game.timerHandle){
                clearTimeout(game.timerHandle);
            }
        }

        const newGame: PingPingGameData = {
            isReacted: false,
            timerHandle: setTimeout(async () => {
                const randKey = KeyActions[randomInt(KeyActions.length)]
                await ctx.reply(`Current key: ${randKey}`);
                newGame.userKey = randKey;
            }, randomInt(MIN_TIME,MAX_TIME))
        }
        gameSessions.set(ctx.session.id,newGame);

        
        await ctx.reply("Wait ping or ping...",{
            reply_markup: pingpongKeyboard
        });
    },
    exit: async (ctx)=>{
        const game = gameSessions.get(ctx.session.id);
        if(game){
            clearTimeout(game.timerHandle);
            gameSessions.delete(ctx.session.id);
        }
        await ctx.reply(`Game is closed`);
    },
    controller: async (ctx)=>{
        const text = ctx.message?.text;

        if(text === KeyActionExit){
            const game = gameSessions.get(ctx.session.id);
            if(game){
                clearTimeout(game.timerHandle);
                gameSessions.delete(ctx.session.id);
            }
            await ChangeController(ctx,ControllerState.menu);
        }

        if(text !== KeyActionPing && text !== KeyActionPong) return;


        const game = gameSessions.get(ctx.session.id);
        if(!game) return;

        if(game.isReacted && !game.userKey){
            await ctx.reply("you is fastes, please wait..");
            return;
        }

        const correctKey = game.userKey !== text;
        if(correctKey){
            const randSmile = ["😉","😜"][randomInt(2)];
            await ctx.reply(`Cool ${randSmile}`);
        }else{
            const randSmile = ["😭","😥"][randomInt(2)];
            await ctx.reply(`Loser ${randSmile}`);
        }

        const newTimer = setTimeout(async () => {
            const randKey = KeyActions[randomInt(KeyActions.length)]
            await ctx.reply(`Current key: ${randKey}`);
            game.userKey = randKey;
        }, randomInt(MIN_TIME,MAX_TIME));

        game.timerHandle = newTimer;
    }
}
