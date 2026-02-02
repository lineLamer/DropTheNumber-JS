export class Block {
    constructor(canvasId, width, height, x, y, color, number) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.posX = x;
        this.posY = y;
        this.color = color;
        this.number = number;
        this.active = true; 
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);

        this.ctx.fillStyle = 'black';
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'center'; 
        this.ctx.textBaseline = 'middle'; 

        
        const textX = this.posX + this.width / 2;
        const textY = this.posY + this.height / 2;

        this.ctx.fillText(this.number, textX, textY);
    }

    isColliding(otherBlock) {
        return this.posX === otherBlock.posX && this.posY + this.height === otherBlock.posY ||
               this.posX + this.width === otherBlock.posX && this.posY === otherBlock.posY ||
               this.posX === otherBlock.posX && this.posY === otherBlock.posY + otherBlock.height ||
               this.posX === otherBlock.posX + otherBlock.width && this.posY === otherBlock.posY;
    }
}
