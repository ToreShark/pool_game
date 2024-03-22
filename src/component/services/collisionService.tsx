// collisionService.ts
import { Ball } from "../interface/Ball";

interface CollisionServiceParams {
    balls: Ball[];
    canvasWidth: number;
    canvasHeight: number;
}

const collisionService = ({ balls, canvasWidth, canvasHeight }: CollisionServiceParams) => {
    const updateBallPosition = () => {
        balls.forEach(ball => {
            // Wall collision and position correction
            if (ball.x + ball.radius > canvasWidth) {
                ball.vx *= -0.9;
                ball.x = canvasWidth - ball.radius;
            } else if (ball.x - ball.radius < 0) {
                ball.vx *= -0.9;
                ball.x = ball.radius;
            }

            if (ball.y + ball.radius > canvasHeight) {
                ball.vy *= -0.9;
                ball.y = canvasHeight - ball.radius;
            } else if (ball.y - ball.radius < 0) {
                ball.vy *= -0.9;
                ball.y = ball.radius;
            }

            // Update position
            ball.x += ball.vx;
            ball.y += ball.vy;
        });
    };

    const checkBallCollisions = () => {
        for (let i = 0; i < balls.length; i++) {
            for (let j = i + 1; j < balls.length; j++) {
                const dx = balls[i].x - balls[j].x;
                const dy = balls[i].y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < balls[i].radius + balls[j].radius) {
                    // Calculate new velocities after collision
                    const nx = dx / distance;
                    const ny = dy / distance;
                    const p = 2 * (balls[i].vx * nx + balls[i].vy * ny - balls[j].vx * nx - balls[j].vy * ny) /
                        (balls[i].radius + balls[j].radius); // Using radius to simulate mass

                    balls[i].vx = balls[i].vx - p * balls[j].radius * nx;
                    balls[i].vy = balls[i].vy - p * balls[j].radius * ny;
                    balls[j].vx = balls[j].vx + p * balls[i].radius * nx;
                    balls[j].vy = balls[j].vy + p * balls[i].radius * ny;

                    // Move balls apart to prevent sticking
                    const overlap = (balls[i].radius + balls[j].radius - distance) / 2;
                    balls[i].x += overlap * nx;
                    balls[i].y += overlap * ny;
                    balls[j].x -= overlap * nx;
                    balls[j].y -= overlap * ny;
                }
            }
        }
    };

    return {
        updateBallPosition,
        checkBallCollisions,
    };
};

export default collisionService;