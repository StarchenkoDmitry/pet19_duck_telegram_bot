import { randomInt } from "crypto";
import { IController } from "../../types/Controller";
import { ControllerState } from "../ControllerState";
import { Keyboard } from "grammy";
import { ChangeController } from "../ControllerList";
import { DuckContext } from "../../types/DuckContext";


const MAX_TIME = 3000;
const MIN_TIME = 1000;

const KeyActionPing = "Ping 🏓";
const KeyActionPong = "Pong 🦆";

type KeyKey = typeof KeyActionPing | typeof KeyActionPong;
const KeyActions = [KeyActionPing,KeyActionPong] as const;

interface PingPingGameData{
    isReacted: boolean;
    userKey?: KeyKey;
    timeKey?: number;
    timerHandle?: NodeJS.Timeout;
};

const GameStates = new Map<number,PingPingGameData>();


function createPingPongMenu(ctx: DuckContext){
    const pingpongKeyboard = new Keyboard();
    KeyActions.forEach((m)=>{
        pingpongKeyboard.text(m).row()
    });
    pingpongKeyboard.row();
    pingpongKeyboard.text(ctx.t("btn_to-menu"));
    return pingpongKeyboard;
}

export const PingPong:IController = {
    state: ControllerState.pingpong,
    enter: async (ctx)=>{
        const game = GameStates.get(ctx.session.id);
        if(game){
            if(game.timerHandle){
                clearTimeout(game.timerHandle);
            }
        }

        const newGame: PingPingGameData = {
            isReacted: false,
            timerHandle: setTimeout(async () => {
                const key = KeyActions[randomInt(KeyActions.length)];
                await ctx.reply(ctx.t("ping-pong_key",{key}));
                newGame.userKey = key;
            }, randomInt(MIN_TIME,MAX_TIME))
        }
        GameStates.set(ctx.session.id,newGame);


        await ctx.reply(ctx.t("ping-pong_wait"),{
            reply_markup: createPingPongMenu(ctx)
        });
    },
    exit: async (ctx)=>{
        const game = GameStates.get(ctx.session.id);
        if(game){
            clearTimeout(game.timerHandle);
            GameStates.delete(ctx.session.id);
        }
        await ctx.reply(ctx.t("ping-pong_close"));
    },
    controller: async (ctx)=>{
        const text = ctx.message?.text;

        if(text === ctx.t("btn_to-menu")){
            const game = GameStates.get(ctx.session.id);
            if(game){
                clearTimeout(game.timerHandle);
                GameStates.delete(ctx.session.id);
            }
            await ChangeController(ctx,ControllerState.menu);
        }

        if(text !== KeyActionPing && text !== KeyActionPong) return;


        const game = GameStates.get(ctx.session.id);
        if(!game) return;

        if(game.isReacted && !game.userKey){
            await ctx.reply(ctx.t("ping-pong_fast"));
            return;
        }

        const correctKey = game.userKey !== text;
        if(correctKey){
            const smile = ["😉","😜"][randomInt(2)];
            await ctx.reply(ctx.t("ping-pong_win",{smile}));
        }else{
            const smile = ["😭","😥"][randomInt(2)];
            await ctx.reply(ctx.t("ping-pong_loss",{smile}));
        }

        const newTimer = setTimeout(async () => {
            const key = KeyActions[randomInt(KeyActions.length)]
            await ctx.reply(ctx.t("ping-pong_key",{key}));
            game.userKey = key;
        }, randomInt(MIN_TIME,MAX_TIME));

        game.timerHandle = newTimer;
    }
}
