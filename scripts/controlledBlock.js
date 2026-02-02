import { Block } from './blocks.js';

export class ControlledBlock extends Block {
    constructor(canvasId, width, height, x, y, color, number, game) {
        super(canvasId, width, height, x, y, color, number);
        this.game = game;
        this.fallSpeed = 2;
        this.active = true;
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    handleKeyDown(event) {
        if (!this.active) {
            return;
        }
        switch (event.key) {
            case 'ArrowLeft':
               
                this.posX = Math.max(0, this.posX - this.width);
                break;
            case 'ArrowRight':
               
                this.posX = Math.min(this.canvas.width - this.width, this.posX + this.width);
                break;
        }
    }

    fall(blocks) {
        if (this.active) {
            
            const blocksBelow = blocks.filter(block =>
                block !== this && 
                block.posY > this.posY && 
                this.isColliding(block) 
            );

            if (blocksBelow.length === 0) {
                
                this.posY += this.fallSpeed;
            } else {
                
                const lowestBlock = blocksBelow.reduce((lowest, current) =>
                    current.posY < lowest.posY ? current : lowest
                );
                this.posY = lowestBlock.posY - this.height;
                this.active = false; 
                this.game.mergeRectangles(); 
            }

           
            if (this.posY + this.height >= this.canvas.height) {
                this.posY = this.canvas.height - this.height;
                this.active = false; 
                this.game.mergeRectangles(); 
            }
        }
    }
}
