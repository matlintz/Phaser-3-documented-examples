class MenuScene extends Phaser.Scene {
    private menuItems: Phaser.GameObjects.Text[];

    constructor() {
        super({
            key: 'MenuScene'
        });
    }


    create(): void {
        console.log('menu scene create');
        this.menuItems = new Array<Phaser.GameObjects.Text>();
        let center = this.game.scale.parentSize.width / 2 - 275; //https://photonstorm.github.io/phaser3-docs/Phaser.Scale.ScaleManager.html#parentSize__anchor
        this.add.text(center, 25, "Phaser Examples", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: 64, color: '#ffffff' })
            .setTintFill(0xff0000,0x00ff00,0x0000ff,0xffffff);
        let items = Array(
            { text: "Sprite movement control (mouse / keyboard)", scene: "SpriteSpaceShipScene" },
            { text: 'Back Ground Scene', scene: 'BackGroundScene' },
            {text: 'Bullets Scene', scene: 'BulletsScene'}
            );
        items.forEach(item => {
            this.addMenuItem(item);
        });

    }

    addMenuItem(menuItem: { text: string, scene: string }): void {

        let y: number = 100;
        y += (this.menuItems.length * 50);
        let item: Phaser.GameObjects.Text = this.add.text(this.game.scale.parentSize.width / 2 - 275, y, menuItem.text, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: 32, color: '#ffffff' });
        item.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => { this.scene.start(menuItem.scene); });

        this.menuItems.push(item);

    }


}


export default MenuScene