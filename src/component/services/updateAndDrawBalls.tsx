import {Ball} from "../interface/Ball";

function updateAndDrawBalls(ctx: CanvasRenderingContext2D, balls: Ball[]) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas

    balls.forEach(ball => {
        // Update position
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Collision detection with walls
        if (ball.x + ball.radius > ctx.canvas.width || ball.x - ball.radius < 0) {
            ball.vx *= -1;
        }
        if (ball.y + ball.radius > ctx.canvas.height || ball.y - ball.radius < 0) {
            ball.vy *= -1;
        }

        ball.draw(ctx); // Draw the ball in new position
    });
}
export default updateAndDrawBalls;