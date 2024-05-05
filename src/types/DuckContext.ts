import { Context, SessionFlavor } from "grammy";
import { GameState } from "../controllers/Game";
import { ControllerState } from "../controllers/ControllerState";
import { UserSession } from "../db/entities/User.entity";

// export interface SessionData {
//     id: number;
//     firstName: string;

//     state: ControllerState;

//     // gameState?: GameState;
// }

export type DuckContext = Context & SessionFlavor<UserSession>;
