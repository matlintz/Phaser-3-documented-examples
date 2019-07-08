class SpriteSpaceShipScene extends Phaser.Scene {

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private spaceship: Phaser.Physics.Arcade.Sprite;
    constructor() {
        super({
            key: 'SpriteSpaceShipScene'
        });
    }

    preload() {
        this.load.image('ship', 'assets/sh2.png');

    }
    create() {
        console.log('SpriteSpaceShip scene create');

        this.spaceship = this.physics.add.sprite(this.game.scale.parentSize.width / 2, this.game.scale.parentSize.height / 2, 'ship');
        this.spaceship.setDrag(35);//https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Components.Drag.html#setDrag
        let menuItem: Phaser.GameObjects.Text = this.add.text(15, 15, "Home", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: 22, color: '#0000ff' });
        menuItem.setInteractive().on('pointerdown', () => { this.scene.start('MenuScene'); });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceship.setCollideWorldBounds(true);
    }

    update() {
        
        let pointer: Phaser.Input.Pointer = this.input.activePointer; //https://photonstorm.github.io/phaser3-docs/Phaser.Input.Pointer.html
        let velocity: Phaser.Math.Vector2 = new Phaser.Math.Vector2();//https://photonstorm.github.io/phaser3-docs/Phaser.Math.Vector2.html
        if (pointer.isDown) {
            let angleTo: number = Phaser.Math.Angle.BetweenPoints(this.spaceship, pointer);//https://photonstorm.github.io/phaser3-docs/Phaser.Math.Angle.html#.BetweenPoints__anchor
            this.physics.velocityFromRotation(angleTo, 150, velocity);//https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.ArcadePhysics.html#velocityFromRotation__anchor
            this.spaceship.setVelocity(velocity.x, velocity.y);//https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Components.Velocity.html#setVelocity__anchor
            this.spaceship.rotation = angleTo;
        }
        if (this.cursors.left.isDown) {
            this.spaceship.angle -= 1;
        }
        if (this.cursors.right.isDown) {
            this.spaceship.angle += 1
        }
        if (this.cursors.up.isDown) {
            this.physics.velocityFromRotation(this.spaceship.rotation, 150, velocity);
            this.spaceship.setVelocity(velocity.x, velocity.y);
        }
        if (this.cursors.down.isDown){
            this.spaceship.setVelocity(0);
        }
    }
}

export default SpriteSpaceShipScene