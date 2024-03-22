import {Ball} from "../interface/Ball";

function createBall(ctx: CanvasRenderingContext2D): Ball {
    const radius = Math.random() * 20 + 10; // Random radius between 10 and 30
    return {
        x: Math.random() * (ctx.canvas.width - radius * 2) + radius,
        y: Math.random() * (ctx.canvas.height - radius * 2) + radius,
        radius,
        vx: 0, // Initially stopped
        vy: 0, // Initially stopped
        color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        },
    };
}
export default createBall;