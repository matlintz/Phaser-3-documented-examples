class MenuScene extends Phaser.Scene {
    private menuItems: Phaser.GameObjects.Text[];
    private items: { text: string, scene: string }[];
    private textDescription: string;
    constructor() {
        super({
            key: 'MenuScene'
        });
    }

    create(): void {
        console.log('menu scene create');
        let htmlElOut = document.getElementById("linkOut");
        htmlElOut.innerHTML = "";
        this.menuItems = new Array<Phaser.GameObjects.Text>();
        let center = this.game.scale.parentSize.width / 2 - 275; //https://photonstorm.github.io/phaser3-docs/Phaser.Scale.ScaleManager.html#parentSize__anchor
        this.add.text(center, 25, "Phaser Examples", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: 64, color: '#ffffff' })
            .setTintFill(0xff0000, 0x00ff00, 0x0000ff, 0xffffff);
        this.items = Array(
            { text: "Sprite movement control (mouse / keyboard)", scene: "SpriteSpaceShipScene" },
            { text: 'Back Ground Scene', scene: 'BackGroundScene' },
            { text: 'Bullets Scene', scene: 'BulletsScene' },
            { text: 'Collision Scene', scene: 'CollisionScene' }
        );
        this.items.forEach(item => {
            this.addMenuItem(item);
        });
        let urlParts = window.location.href.split('#');
        if (urlParts[1] && urlParts[1].length > 0) {
            this.loadSceneFromUrl(urlParts[1])
        }
    }
    loadSceneFromUrl(part: string) {
        this.items.forEach((item) => {
            if (item.scene.toLowerCase() === part.toLowerCase()) {
                this.scene.start(item.scene);
            }
        });
    }
    addMenuItem(menuItem: { text: string, scene: string }): void {

        let y: number = 100;
        y += (this.menuItems.length * 50);
        let item: Phaser.GameObjects.Text = this.add.text(this.game.scale.parentSize.width / 2 - 275, y, menuItem.text, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: 32, color: '#ffffff' });
        item.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
            window.history.replaceState({}, 'Phaser 3 Examples ' + menuItem.text, '/' + '#' + menuItem.scene);
            this.scene.start(menuItem.scene);
        });
        this.menuItems.push(item);
    }
}

export default MenuScene