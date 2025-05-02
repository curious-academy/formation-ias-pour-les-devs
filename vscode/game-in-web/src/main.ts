import './style.css'
import { Player } from './player'

// Configuration du canvas
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas id="gameCanvas" width="800" height="600"></canvas>
  </div>
`

// Initialisation du jeu
const canvas = document.querySelector<HTMLCanvasElement>('#gameCanvas')!
const ctx = canvas.getContext('2d')!

// Configuration du jeu
const GROUND_LEVEL = 500
const player = new Player(100, 400, 40, 60)

// Gestion des contrôles clavier
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case ' ':
    case 'ArrowUp':
      player.jump()
      break
    case 'ArrowLeft':
      player.moveLeft()
      break
    case 'ArrowRight':
      player.moveRight()
      break
  }
})

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    player.stopMoving()
  }
})

// Fonction de mise à jour et d'affichage du jeu
function gameLoop() {
  // Effacer le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // Dessiner le sol
  ctx.fillStyle = '#333'
  ctx.fillRect(0, GROUND_LEVEL, canvas.width, canvas.height - GROUND_LEVEL)
  
  // Mettre à jour et dessiner le joueur
  player.update(GROUND_LEVEL)
  player.draw(ctx)
  
  // Continuer la boucle
  requestAnimationFrame(gameLoop)
}

// Démarrer le jeu
gameLoop()

