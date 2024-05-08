import { I18n } from "@grammyjs/i18n";
import { DuckContext } from "../types/DuckContext";
import { LANGUAGE_CODE_DEFAULT } from "../config";


export function createTranslator(){
    const i18n = new I18n<DuckContext>({
        defaultLocale: LANGUAGE_CODE_DEFAULT,
        directory:"src/i18n/locales/",
        localeNegotiator: (ctx) =>{
            return ctx.session.languageCode ?? LANGUAGE_CODE_DEFAULT;
        },
        globalTranslationContext(ctx) {
            return { name: ctx.from?.first_name ?? "" };
        },
    });
    return i18n;
}
