import { Bot } from "grammy";
import { getToken } from "./config";


const TOKEN = getToken();

const bot = new Bot(TOKEN);


bot.on("message", async (ctx) =>{
    console.log("new message, text:",ctx.message.text);
    await ctx.reply(`return: ${ctx.message.text}`);
});


bot.start({
    onStart: (botInfo) => {
        console.log("Bot is started!");
    }
});
