// pushBallService.ts
import { Ball } from "../interface/Ball";

interface PushBallParams {
    canvas: HTMLCanvasElement;
    balls: Ball[];
    onBallPushed?: (ball: Ball) => void; // Callback function when a ball is pushed
}

const pushBallService = ({ canvas, balls, onBallPushed }: PushBallParams) => {
    let isMouseDown = false;
    let selectedBall: Ball | null = null;

    const handleMouseDown = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        isMouseDown = true;

        selectedBall = balls.find(ball => {
            const distance = Math.sqrt(Math.pow(ball.x - mouseX, 2) + Math.pow(ball.y - mouseY, 2));
            return distance < ball.radius;
        }) ?? null;
    };

    const handleMouseUp = () => {
        isMouseDown = false;
        selectedBall = null;
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isMouseDown || !selectedBall) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Apply a simple force based on mouse movement
        const forceX = (mouseX - selectedBall.x) * 0.1;
        const forceY = (mouseY - selectedBall.y) * 0.1;

        selectedBall.vx += forceX;
        selectedBall.vy += forceY;

        if (onBallPushed) {
            onBallPushed(selectedBall);
        }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);

    // Cleanup function to remove event listeners
    return () => {
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('mousemove', handleMouseMove);
    };
};

export default pushBallService;
