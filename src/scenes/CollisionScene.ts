import Bullet from '../classes/Bullet';
class CollisionScene extends Phaser.Scene {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private spaceship: Phaser.Physics.Arcade.Sprite;
    private pointer: Phaser.Input.Pointer;
    private touch: Phaser.Input.Pointer;
    private playerBullets: any;
    private shipSpeed: number;

    constructor() {
        super({
            key: 'CollisionScene'
        });
    }

    preload() {
        this.load.image('ship', 'assets/sh2.png');
        this.load.image('bullet', 'assets/bullet6.png');
        //reduced quality and size of original from https://www.jpl.nasa.gov/spaceimages/images/largesize/PIA13452_hires.jpg
        this.load.image('piaback', 'assets/PIA13452_lores.jpg');
    }
    create() {

        console.log('CollisionScene create');
        this.shipSpeed = 400;
     
        this.cameras.main.setBounds(0, 0, 4000, 4000);
        this.physics.world.setBounds(0, 0, 4000, 4000);
        this.add.image(0, 0, 'piaback').setOrigin(0).setScale(4);
        this.spaceship = this.physics.add.sprite(this.game.scale.parentSize.width / 2, this.game.scale.parentSize.height / 2, 'ship');
        this.spaceship.setDrag(35);//https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Components.Drag.html#setDrag
        let menuItem: Phaser.GameObjects.Text = this.add.text(15, 15, "Home", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: 25, color: '#3333ff' });
        menuItem.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {  menuItem.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => 
        { window.history.replaceState({},'Phaser 3 Examples','./');
        this.scene.start('MenuScene'); }); });
        menuItem.setScrollFactor(0)
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceship.setCollideWorldBounds(true);
        this.pointer = this.input.activePointer;//https://photonstorm.github.io/phaser3-docs/Phaser.Input.Pointer.html
        this.touch = this.input.pointer1;
        this.cameras.main.startFollow(this.spaceship, true, 0.05, 0.05);
        this.playerBullets = this.physics.add.group({ classType: Bullet, maxSize: 50, runChildUpdate: true });

        this.input.keyboard.on('keydown_F', function () {
            let bullet = this.playerBullets.get();
            if (bullet) {
                bullet.setActive(true).setVisible(true);
                let velocity: Phaser.Math.Vector2 = new Phaser.Math.Vector2()
                this.physics.velocityFromRotation(this.spaceship.rotation, this.shipSpeed, velocity);

                bullet.fire(this.spaceship, { x: velocity.x * 180 / Math.PI, y: velocity.y * 180 / Math.PI });
            }
        }, this);
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
            this.physics.velocityFromRotation(this.spaceship.rotation, this.shipSpeed, velocity);
            this.spaceship.setVelocity(velocity.x, velocity.y);
        }
        if (this.cursors.down.isDown) {
            this.spaceship.setVelocity(0);
        }

    }

    SetVelocityAndRotation(pointer: Phaser.Input.Pointer) {
        let velocity: Phaser.Math.Vector2 = new Phaser.Math.Vector2();
        //when the world is larger than the screen we need worldX and worldY
        let pointerWorld: Phaser.Geom.Point = new Phaser.Geom.Point(pointer.worldX, pointer.worldY);
        this.spaceship.rotation = Phaser.Math.Angle.BetweenPoints(this.spaceship, pointerWorld);//https://photonstorm.github.io/phaser3-docs/Phaser.Math.Angle.html#.BetweenPoints__anchor
        this.physics.velocityFromRotation(this.spaceship.rotation, this.shipSpeed, velocity);//https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.ArcadePhysics.html#velocityFromRotation__anchor
        this.spaceship.setVelocity(velocity.x, velocity.y);//https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Components.Velocity.html#setVelocity__anchor
        let bullet = this.playerBullets.get();
        if (bullet) {
            bullet.setActive(true).setVisible(true);
            let pointerWorld: Phaser.Geom.Point = new Phaser.Geom.Point(this.pointer.worldX, this.pointer.worldY);
            bullet.fire(this.spaceship, pointerWorld);
        }
    }
}

export default CollisionScene