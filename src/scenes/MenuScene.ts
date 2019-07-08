

class MenuScene extends Phaser.Scene {
    private menuItems: Phaser.GameObjects.Text[];
    constructor() {
        super({
            key: 'MenuScene'
        }); 
    } 

    preload() {
        
    }
    create() {
        console.log('menu scene create');
        this.menuItems = new Array<Phaser.GameObjects.Text>();
        let center = this.game.scale.parentSize.width/2-275; //https://photonstorm.github.io/phaser3-docs/Phaser.Scale.ScaleManager.html#parentSize__anchor
        this.add.text(center,25,"Phaser Examples",{ fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: 64, color: '#ffffff' });
        let menuItem:Phaser.GameObjects.Text = this.add.text(center,100,"Sprite movement control (mouse / keyboard)",{ fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: 32, color: '#ffffff' });
        //https://photonstorm.github.io/phaser3-docs/Phaser.Types.Input.html#.InteractiveObject
        menuItem.setInteractive().on('pointerdown',()=>{ this.scene.start('SpriteSpaceShipScene');});
        //mouse - touch events https://rexrainbow.github.io/phaser3-rex-notes/docs/site/touchevents/
        menuItem.on('pointerover',() => {this.menuItems[0].setTint(0x0000FF)});
        menuItem.on('pointerout',() => {this.menuItems[0].clearTint()});
        this.menuItems.push(menuItem);
    }
}

export default MenuScene