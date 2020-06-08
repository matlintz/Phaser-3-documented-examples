import Scrollbar from '../classes/Scrollbar';
class MenuScene extends Phaser.Scene {
    private menuItems: Phaser.GameObjects.Text[];
    private headerText: Phaser.GameObjects.Text;
    private items: { text: string, scene: string, description: string }[];
    private textDescription: HTMLElement;

    private menuContainer: Phaser.GameObjects.Container;
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
        this.headerText = this.add.text(5, 5, "Phaser Examples", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: 64, color: '#ffffff' })
            .setTintFill(0xff0000, 0x00ff00, 0x0000ff, 0xffffff);
        this.menuContainer = this.add.container(30, 0, [this.headerText]);//create container with headerText. Menu items will be pushed on as they are created;
        this.items = Array(
            { text: "Sprite movement control", scene: "SpriteSpaceShipScene", description: 'Phaser 3 Sprite Space Ship. <a href="https://mobsor.com/blog/2019/07/phase-3-examples-project-sprite-control-example/">Blog: Phaser 3 Examples Project – Sprite Control Example</a>' },
            { text: 'Back Ground Scene', scene: 'BackGroundScene', description: 'Phaser 3 Adding a Background Image Scene. <a href="https://mobsor.com/blog/2019/07/phaser-3-adding-a-back-ground-image-scene/">Blog: Phaser 3 Adding a Background Image Scene</a>' },
            { text: 'Bullets Scene', scene: 'BulletsScene', description: 'Phaser 3 Sprite with Shooting Bullets Example. <a href="https://mobsor.com/blog/2019/08/phaser-3-sprite-with-shooting-bullets-example/">Blog: Sprite with Shooting Bullets </a>' },
            { text: 'Toolbar Scene', scene: 'ToolbarScene', description: 'Phaser 3 Toolbar Controls. <a href="https://mobsor.com/blog/2019/09/phaser-3-toolbar-scene-example/">Blog: Phaser 3 Toolbar Scene Example</a>' },
            { text: 'Hex Grid', scene: 'HexGridScene', description: 'Hex Grid. <a href="https://mobsor.com/blog/2019/09/phaser-3-toolbar-scene-example/">Blog: Phaser 3 Toolbar Scene Example</a>' }
        );

        this.items.forEach(item => {
            this.addMenuItem(item);
        });

        let urlParts = window.location.href.split('#');
        if (urlParts[1] && urlParts[1].length > 0) {
            this.loadSceneFromUrl(urlParts[1])
        }
        
        this.doResize();
        this.scale.on('resize', this.doResize, this);
       
    }

    doResize(): void {
        /*
         * making headerText the widest item at 95% of screen width
         */
        let resize = this.scale.width * .95 / this.headerText.width;
        this.menuContainer.setScale(resize);
    }

    loadSceneFromUrl(part: string) {
        console.log('load scene '+part);
        this.items.forEach((item: { text: string, scene: string, description: string }) => {
            if (item.scene.toLowerCase() === part.toLowerCase()) {
                this.textDescription.innerHTML = item.description;
                this.scene.start(item.scene);
            }
        });
    }

    addMenuItem(menuItem: { text: string, scene: string, description: string }): void {
        let y: number = 80;
        y += (this.menuItems.length * 41);
        let item: Phaser.GameObjects.Text = this.add.text(5, y, menuItem.text, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: 32, color: '#ffffff' });
        item.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
            window.history.replaceState({}, 'Phaser 3 Examples ' + menuItem.text, './' + '#' + menuItem.scene);
            this.textDescription.innerHTML = menuItem.description;
            this.scene.start(menuItem.scene);
        });

        this.menuItems.push(item);
        this.menuContainer.add(item);
    }
}

export default MenuScene