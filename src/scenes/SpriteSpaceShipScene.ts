class SpriteSpaceShipScene extends Phaser.Scene {

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private spaceship: Phaser.Physics.Arcade.Sprite;
    private pointer: Phaser.Input.Pointer;
    private touch: Phaser.Input.Pointer;
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
        let menuItem: Phaser.GameObjects.Text = this.add.text(15, 15, "Home", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: 25, color: '#3333ff' });
        menuItem.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
            window.history.replaceState({}, 'Phaser 3 Examples', './');
            this.scene.start('MenuScene');
        });
        menuItem.setScrollFactor(0) //I believe in Phaser 2 you could lock things to camera with fixedToCamera, https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.ScrollFactor.html#setScrollFactor

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceship.setCollideWorldBounds(true);
        this.pointer = this.input.activePointer;//https://photonstorm.github.io/phaser3-docs/Phaser.Input.Pointer.html
        this.touch = this.input.pointer1;
    }

    update() {
        if (this.pointer.isDown) {
            this.SetVelocityAndRotation(this.pointer);
        } else if (this.touch.isDown) {
            this.SetVelocityAndRotation(this.touch);
        }

        if (this.cursors.left.isDown) {
            this.spaceship.angle -= 1;
        }
        if (this.cursors.right.isDown) {
            this.spaceship.angle += 1
        }
        if (this.cursors.up.isDown) {
            let velocity: Phaser.Math.Vector2 = new Phaser.Math.Vector2()
            this.physics.velocityFromRotation(this.spaceship.rotation, 150, velocity);
            this.spaceship.setVelocity(velocity.x, velocity.y);
        }
        if (this.cursors.down.isDown) {
            this.spaceship.setVelocity(0);
        }
    }

    SetVelocityAndRotation(pointer: Phaser.Input.Pointer) {
        let velocity: Phaser.Math.Vector2 = new Phaser.Math.Vector2()
        this.spaceship.rotation = Phaser.Math.Angle.BetweenPoints(this.spaceship, pointer);//https://photonstorm.github.io/phaser3-docs/Phaser.Math.Angle.html#.BetweenPoints__anchor
        this.physics.velocityFromRotation(this.spaceship.rotation, 150, velocity);//https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.ArcadePhysics.html#velocityFromRotation__anchor
        this.spaceship.setVelocity(velocity.x, velocity.y);//https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Components.Velocity.html#setVelocity__anchor

    }
}

export default SpriteSpaceShipScene