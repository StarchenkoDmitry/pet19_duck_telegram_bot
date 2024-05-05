import { IController } from "../types/Controller";
import { DuckContext } from "../types/DuckContext";
import { ControllerState } from "./ControllerState";
import { GameController } from "./Game";
import { MainMenuController } from "./MainMenu";
import { PingPong } from "./games/PingPong";


export const controllers: IController[] = [
    MainMenuController,
    GameController,
    PingPong,
];


export async function ChangeController(ctx: DuckContext,name:ControllerState){
    const currentState = ctx.session.state;

    const currentController = controllers.find(c=>c.state === currentState);

    if(currentController && currentController.exit){
        await currentController.exit(ctx);
    }

    ctx.session.state = ControllerState.none;

    const nextController = controllers.find(c=>c.state === name);

    if(nextController && nextController.enter){
        await nextController.enter(ctx);
        ctx.session.state = name;
    }
}
