import { Context, SessionFlavor } from "grammy";
import { UserSession } from "../db/entities/User.entity";
import { I18nFlavor } from "@grammyjs/i18n";


export type DuckContext = Context & I18nFlavor & SessionFlavor<UserSession>;
