import {FC, useEffect, useRef, useState} from "react";
import { CanvasProps } from "../inteface/CanvasProps";
import PropTypes from "prop-types";
import {Ball} from "./interface/Ball";
import createBall from "./services/createBall";
import updateAndDrawBalls from "./services/updateAndDrawBalls";
import pushBallService from "./services/pushBallService";
import collisionService from "./services/collisionService";

const Canvas: FC<CanvasProps> = ({ draw, height, width }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ballsRef = useRef<Ball[]>([]);
    const [selectedBall, setSelectedBall] = useState<Ball | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) { 
            const context = canvas.getContext('2d');
            if (context) {
                for (let i = 0; i < 4; i++) { 
                    ballsRef.current.push(createBall(context));
                }

                const collision = collisionService({
                    balls: ballsRef.current,
                    canvasWidth: width,
                    canvasHeight: height
                });

                const animate = () => {
                    context.clearRect(0, 0, width, height);
                    draw(context);
                    collision.updateBallPosition();
                    collision.checkBallCollisions();
                    ballsRef.current.forEach(ball => ball.draw(context));
                    requestAnimationFrame(animate);
                };

                animate();

                const cleanupPushService = pushBallService({
                    canvas: canvas,
                    balls: ballsRef.current,
                    onBallPushed: (ball) => {
                        console.log('Ball pushed with velocity:', ball.vx, ball.vy);
                    }
                });

                return () => {
                    cleanupPushService(); 
                };
            }
        }
    }, [draw, height, width]);

    const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        const x = event.clientX - rect!.left;
        const y = event.clientY - rect!.top;

        const clickedBall = ballsRef.current.find(ball =>
            Math.sqrt((ball.x - x) ** 2 + (ball.y - y) ** 2) < ball.radius
        );

        setSelectedBall(clickedBall || null);
    };

    return (
        <>
            <canvas ref={canvasRef} height={height} width={width} onClick={handleCanvasClick} />
            {selectedBall && (
                <div style={{ position: 'absolute', left: selectedBall.x, top: selectedBall.y }}>
                    <input
                        type="color"
                        value={selectedBall.color}
                        onChange={(e) => {
                            const newColor = e.target.value;
                            selectedBall.color = newColor;
                            setSelectedBall({ ...selectedBall, color: newColor });
                        }}
                    />
                </div>
            )}
        </>
    );
};

Canvas.propTypes = {
    draw: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
};

export default Canvas;