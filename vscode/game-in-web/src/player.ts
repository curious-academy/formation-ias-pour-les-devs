/**
 * Représente un personnage joueur dans un jeu 2D.
 * 
 * Cette classe gère la position du joueur, ses dimensions, sa physique de mouvement et son rendu.
 * Elle inclut des fonctionnalités pour sauter, se déplacer horizontalement et gérer les collisions avec le sol.
 */
export class Player {
    /** Position horizontale du joueur sur le canvas */
    private x: number;
    
    /** Position verticale du joueur sur le canvas */
    private y: number;
    
    /** Largeur du joueur en pixels */
    private width: number;
    
    /** Hauteur du joueur en pixels */
    private height: number;
    
    /** Vitesse verticale actuelle du joueur, affectée par la gravité et les sauts */
    private velocityY: number = 0;
    
    /** Vitesse horizontale actuelle du joueur, modifiée par moveLeft et moveRight */
    private velocityX: number = 0;
    
    /** Indique si le joueur est actuellement en l'air */
    private isJumping: boolean = false;
    
    /** Force de gravité appliquée au joueur à chaque mise à jour */
    private gravity: number = 0.5;
    
    /** Puissance de saut - valeur négative car l'axe Y est orienté vers le bas */
    private jumpStrength: number = -12;
    
    /** Vitesse de déplacement horizontal du joueur */
    private speed: number = 5;
    
    /**
     * Crée une instance de joueur
     * @param x - Position horizontale initiale
     * @param y - Position verticale initiale
     * @param width - Largeur du joueur
     * @param height - Hauteur du joueur
     */
    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    
    /**
     * Dessine le joueur sur le canvas
     * @param ctx - Contexte de rendu du canvas
     */
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    /**
     * Met à jour la position du joueur en fonction de sa vitesse et de la gravité
     * Gère également la collision avec le sol
     * @param ground - Position Y du sol
     */
    update(ground: number): void {
        // Appliquer la gravité
        this.velocityY += this.gravity;
        this.y += this.velocityY;
        this.x += this.velocityX;
        
        // Vérifier si le joueur est sur le sol
        if (this.y + this.height > ground) {
            this.y = ground - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        }
    }
    
    /**
     * Fait sauter le joueur s'il n'est pas déjà en l'air
     */
    jump(): void {
        if (!this.isJumping) {
            this.velocityY = this.jumpStrength;
            this.isJumping = true;
        }
    }
    
    /**
     * Déplace le joueur vers la gauche
     */
    moveLeft(): void {
        this.velocityX = -this.speed;
    }
    
    /**
     * Déplace le joueur vers la droite
     */
    moveRight(): void {
        this.velocityX = this.speed;
    }
    
    /**
     * Arrête le mouvement horizontal du joueur
     */
    stopMoving(): void {
        this.velocityX = 0;
    }
    
    /**
     * Renvoie la position actuelle du joueur
     * @returns Objet contenant les coordonnées x et y
     */
    getPosition(): { x: number, y: number } {
        return { x: this.x, y: this.y };
    }
    
    /**
     * Renvoie les dimensions du joueur
     * @returns Objet contenant la largeur et la hauteur
     */
    getDimensions(): { width: number, height: number } {
        return { width: this.width, height: this.height };
    }
}