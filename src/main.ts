/// <reference path="../node_modules/phaser/types/phaser.d.ts"/>
import 'phaser';
import MenuScene from './scenes/MenuScene';
import SpriteSpaceShipScene from './scenes/SpriteSpaceShipScene';
import BackGroundScene from './scenes/BackGroundScene';
import BulletsScene from './scenes/BulletsScene';
import CollisionScene from './scenes/CollisionScene';
import ToolbarScene from './scenes/ToolbarScene';
import HexGridScene from './scenes/HexGridScene';
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
  scene: [MenuScene, SpriteSpaceShipScene,BackGroundScene,BulletsScene,CollisionScene,ToolbarScene,HexGridScene]
};

let game: Phaser.Game = new Phaser.Game(config);
