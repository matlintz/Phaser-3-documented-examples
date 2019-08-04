//https://www.phaser.io/examples/v3/view/games/topdownshooter/topdowncombatmechanics
class Bullet extends Phaser.GameObjects.Image {
    speed: number;
    born: number;
    direction: number;
    xSpeed: number;
    ySpeed: number;

    constructor(scene: any, x: number, y: number) {
        super(scene, x, y, 'bullet');
        this.speed = 1;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(12, 12);

    }
    fire(shooter: Phaser.GameObjects.Sprite, target: { x: number, y: number }) {

        this.setPosition(shooter.x, shooter.y); // Initial position
        this.direction = Math.atan((target.x - this.x) / (target.y - this.y));
        //some light randomness to the bullet angle
        this.direction += ((Math.random() / 10) + (-(Math.random() / 10)));

        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (target.y >= this.y) {
            this.xSpeed = this.speed * Math.sin(this.direction);
            this.ySpeed = this.speed * Math.cos(this.direction);
        }
        else {
            this.xSpeed = -this.speed * Math.sin(this.direction);
            this.ySpeed = -this.speed * Math.cos(this.direction);
        }

        this.rotation = shooter.rotation; // angle bullet with shooters rotation
        this.born = 0;
    }

    update(time: any, delta: number) {
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        this.born += delta;

        if (this.born > 1500) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
export default Bullet