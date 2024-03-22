export interface CanvasProps {
    draw: (context: CanvasRenderingContext2D) => void;
    height: number;
    width: number;
}