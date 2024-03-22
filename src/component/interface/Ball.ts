export interface Ball {
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
    color: string;
    draw: (ctx: CanvasRenderingContext2D) => void;
}
