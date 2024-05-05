import { DuckContext } from "./DuckContext";
import { ControllerState } from "../controllers/ControllerState";


export type ControllerHandlerResponse = boolean | void | undefined;

export type ControllerHandler = (ctx: DuckContext) => Promise<ControllerHandlerResponse> | ControllerHandlerResponse;

export type EntryHandler = (ctx: DuckContext) => Promise<void> | void;

export type ExitHandler = (ctx: DuckContext) => Promise<void> | void;

export interface IController{
    readonly state: ControllerState;
    controller: ControllerHandler;

    enter?: EntryHandler;
    exit?: ExitHandler;
}
