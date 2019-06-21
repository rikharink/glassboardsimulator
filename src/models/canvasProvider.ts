export class CanvasProvider {
    public canvas?: HTMLCanvasElement;
    public context?: CanvasRenderingContext2D | null;

    public update(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }
}
