class MenuScene extends Phaser.Scene {
    private menuItems: Phaser.GameObjects.Text[];
    private items: { text: string, scene: string, description: string }[];
    private textDescription: HTMLElement;
    constructor() {
        super({
            key: 'MenuScene'
        });
    }

    create(): void {
        console.log('menu scene create');
        this.textDescription = document.getElementById("linkOut");
        this.textDescription.innerHTML = "Phaser 3 examples";
        this.menuItems = new Array<Phaser.GameObjects.Text>();
        let center = this.game.scale.parentSize.width / 2 - 275; //https://photonstorm.github.io/phaser3-docs/Phaser.Scale.ScaleManager.html#parentSize__anchor
        this.add.text(center, 25, "Phaser Examples", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: 64, color: '#ffffff' })
            .setTintFill(0xff0000, 0x00ff00, 0x0000ff, 0xffffff);
        this.items = Array(
            { text: "Sprite movement control (mouse / keyboard)", scene: "SpriteSpaceShipScene", description: 'Phaser 3 Sprite Space Ship. <a href="https://mobsor.com/blog/2019/07/phase-3-examples-project-sprite-control-example/">Phase 3 Examples Project – Sprite Control Example</a>' },
            { text: 'Back Ground Scene', scene: 'BackGroundScene', description: 'Phaser 3 Adding a Background Image Scene. <a href="https://mobsor.com/blog/2019/07/phaser-3-adding-a-back-ground-image-scene/">Blog: Phaser 3 Adding a Background Image Scene</a>' },
            { text: 'Bullets Scene', scene: 'BulletsScene', description: 'Phaser 3 Sprite with Shooting Bullets Example. <a href="https://mobsor.com/blog/2019/08/phaser-3-sprite-with-shooting-bullets-example/">Blog: Sprite with Shooting Bullets </a>' },
            { text: 'Toolbar Scene', scene: 'ToolbarScene', description: 'Phaser 3 Toolbar Controls. <a href="https://mobsor.com/blog/2019/09/phaser-3-toolbar-scene-example/">Blog: Phaser 3 Toolbar Scene Example</a>' }
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
        this.items.forEach((item:{ text: string, scene: string, description: string }) => {
            if (item.scene.toLowerCase() === part.toLowerCase()) {
                this.textDescription.innerHTML = item.description;
                this.scene.start(item.scene);
            }
        });
    }

    addMenuItem(menuItem: { text: string, scene: string, description:string }): void {
        let y: number = 100;
        y += (this.menuItems.length * 50);
        let item: Phaser.GameObjects.Text = this.add.text(this.game.scale.parentSize.width / 2 - 275, y, menuItem.text, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: 32, color: '#ffffff' });
        item.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
            window.history.replaceState({}, 'Phaser 3 Examples ' + menuItem.text, './' + '#' + menuItem.scene);
            this.textDescription.innerHTML = menuItem.description;
            this.scene.start(menuItem.scene); 
        });

        this.menuItems.push(item);
    }
}

export default MenuScene