import 'phaser';
import MenuScene from './scenes/MenuScene';
import SpriteSpaceShipScene from './scenes/SpriteSpaceShipScene';
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'content',
  width: window.innerWidth,
  height: window.innerHeight,
  resolution: 1,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  backgroundColor: "#000000",
  scene: [MenuScene, SpriteSpaceShipScene]
};

let game: Phaser.Game = new Phaser.Game(config);
