import {Ball} from "./Ball";

export interface CollisionServiceParams {
    balls: Ball[];
    canvasWidth: number;
    canvasHeight: number;
}