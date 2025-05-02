/**
 * Represents a player character in a 2D game.
 * 
 * This class handles the player's position, dimensions, movement physics, and rendering.
 * It includes functionality for jumping, horizontal movement, and collision with ground.
 */
export class Player {
    /** Horizontal position of the player on the canvas */
    private x: number;
    
    /** Vertical position of the player on the canvas */
    private y: number;
    
    /** Width of the player in pixels */
    private width: number;
    
    /** Height of the player in pixels */
    private height: number;
    
    /** Current vertical velocity of the player, affected by gravity and jumps */
    private velocityY: number = 0;
    
    /** Current horizontal velocity of the player, modified by moveLeft and moveRight */
    private velocityX: number = 0;
    
    /** Indicates whether the player is currently in the air */
    private isJumping: boolean = false;
    
    /** Gravity force applied to the player on each update */
    private gravity: number = 0.5;
    
    /** Jump power - negative value because Y-axis is oriented downward */
    private jumpStrength: number = -12;
    
    /** Horizontal movement speed of the player */
    private speed: number = 5;
    
    /**
     * Creates a player instance
     * @param x - Initial horizontal position
     * @param y - Initial vertical position
     * @param width - Width of the player
     * @param height - Height of the player
     */
    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    
    /**
     * Draws the player on the canvas
     * @param ctx - Canvas rendering context
     */
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    /**
     * Updates the player's position based on velocity and gravity
     * Also handles collision with the ground
     * @param ground - Y position of the ground
     */
    update(ground: number): void {
        // Apply gravity
        this.velocityY += this.gravity;
        this.y += this.velocityY;
        this.x += this.velocityX;
        
        // Check if player is on the ground
        if (this.y + this.height > ground) {
            this.y = ground - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        }
    }
    
    /**
     * Makes the player jump if not already in the air
     */
    jump(): void {
        if (!this.isJumping) {
            this.velocityY = this.jumpStrength;
            this.isJumping = true;
        }
    }
    
    /**
     * Moves the player to the left
     */
    moveLeft(): void {
        this.velocityX = -this.speed;
    }
    
    /**
     * Moves the player to the right
     */
    moveRight(): void {
        this.velocityX = this.speed;
    }
    
    /**
     * Stops horizontal movement of the player
     */
    stopMoving(): void {
        this.velocityX = 0;
    }
    
    /**
     * Returns the current position of the player
     * @returns Object containing x and y coordinates
     */
    getPosition(): { x: number, y: number } {
        return { x: this.x, y: this.y };
    }
    
    /**
     * Returns the dimensions of the player
     * @returns Object containing width and height
     */
    getDimensions(): { width: number, height: number } {
        return { width: this.width, height: this.height };
    }
}