class ToolbarScene extends Phaser.Scene {
    //phaser 3 toolbar example scene
    private toolbarContainer: Phaser.GameObjects.Container;
    private rotateCcw: Phaser.GameObjects.Image;
    private rotateCw: Phaser.GameObjects.Image;
    private windmill: Phaser.GameObjects.Image;
    private windmill2: Phaser.GameObjects.Image;
    constructor() {
        super({
            key: 'ToolbarScene'
        });
    }
    preload() {
        console.log('Toolbar scene preload');

        //made by me just a simple rectangle - CC0
        this.load.image('toolbar', '/assets/toolbar.png');
        //rotate-cw and rotate-ccw from https://feathericons.com/
        this.load.image('rotate-cw', '/assets/rotate-cw.png');//rotate clockwise
        this.load.image('rotate-ccw', '/assets/rotate-ccw.png');//rotate counter clockwise
        //picture of windmill near Vantage Washington taken by me sometime in August 2019 - CC0
        this.load.image('windmill', '/assets/windmill.jpg');
    }
    create() {
        let menuItem: Phaser.GameObjects.Text = this.add.text(15, 10, "Home", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: 25, color: '#3333ff' });
        menuItem.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
            window.history.replaceState({}, 'Phaser 3 Examples', './');
            this.scene.start('MenuScene');
        });
        menuItem.setScrollFactor(0)
        let toolbar = this.add.image(0, 0, 'toolbar').setOrigin(0);
        this.rotateCcw = this.add.image(25, 10, 'rotate-ccw').setOrigin(0).setInteractive({ cursor: 'pointer' });
        this.rotateCw = this.add.image(25, 50, 'rotate-cw').setOrigin(0).setInteractive({ cursor: 'pointer' });
        //https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Container.html
        this.toolbarContainer = this.add.container(15, 50, [toolbar, this.rotateCw, this.rotateCcw]);
        this.toolbarContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, toolbar.width, toolbar.height), Phaser.Geom.Rectangle.Contains);
        this.input.setDraggable(this.toolbarContainer);
        this.windmill = this.add.image(screen.width / 2, screen.height / 2, 'windmill');
        this.windmill.setInteractive();
        this.input.setDraggable(this.windmill);
        //pointer isn't used but in testing it is required or things go wrong. using _pointer to avoid the warning of unused parameter.
        this.toolbarContainer.on('drag', function (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) {
            this.x = dragX;
            this.y = dragY;
        });//not binding to this as the this we want is toolbarContainer. If I bound to this then we'd need this.toolbarContainer.x ...

        this.windmill.on('drag', function (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) {
            this.x = dragX;
            this.y = dragY;
        });
        this.windmill2 = this.add.image(screen.width / 2, screen.height / 2, 'windmill');
        this.windmill2.setInteractive();
        this.input.setDraggable(this.windmill2);
        //pointer isn't used but in testing it is required or things go wrong. using _pointer to avoid the warning of unused parameter.
        
        this.windmill2.on('drag', function (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) {
            this.x = dragX;
            this.y = dragY;
        });
        this.rotateCcw.on('pointerdown', function () {
            this.windmill.angle -= 1;
        }, this); //binding to this as we need to access outside of rotateCcw

        this.rotateCw.on('pointerdown', function () {
            this.windmill.angle += 1;
        }, this); // could use () => {} and not bind, but following https://stackoverflow.com/a/28135120
    }
}

export default ToolbarScene;