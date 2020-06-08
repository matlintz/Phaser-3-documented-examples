class Scrollbar extends Phaser.Events.EventEmitter
{
    private trackWidth:number;
    private trackHeight:number;
    private trackPosition:number;
    private trackPadding:number;
    private trackRadius:number;
    private pointerOn:boolean;
    private pointerOver:boolean;
    private trackAlpha:number;
    private trackColor:any;
    private barAlpha:number;
    private barColor:any;
    private barDownColor:any;
    private barRadius:number;
    private barPosition:number;
    private barOffset:number;
    private barWidth:number;
    private barHeight:number;
    private trackBounds:Phaser.Geom.Rectangle;
    private scrollbar:Phaser.GameObjects.Graphics;
    constructor (private scene:Phaser.Scene, 
        private x:number, private y:number, private width:number,private height:number,
        private orientation:string = 'horizontal',
        trackAlpha = 0,
        trackColor = 0x14334f,
        alpha = 1,
        radius = 0,
        padding = 0,
        trackRadius = 0,
        barRadius =  0,
        barSize = 16,
        barThickness = 25,
        barAlpha = 0,
        barColor = 0x3c6992,
        barDownColor = 0xa6cff9,
        depth = null
    )
    {
        super();

        this.trackWidth = width;
        this.trackHeight = height;
        this.trackPosition = 0;
        this.trackPadding = padding;
        this.trackRadius = trackRadius || radius;

        this.pointerOn = false;
        this.pointerOver = false;

        this.trackAlpha = trackAlpha || alpha;
        this.trackColor = trackColor;

        this.barAlpha = barAlpha || alpha;
        this.barColor = barColor;
        this.barDownColor = barDownColor;
        this.barRadius = barRadius || radius;

        this.barPosition = 0;
        this.barOffset = 0;

        if (orientation === 'horizontal')
        {
            this.barWidth = Math.floor(width / barSize);
            this.barHeight = barThickness || width;
        }
        else
        {
            this.barWidth = barThickness || height;
            this.barHeight = Math.floor(height / barSize);
        }
        console.log(width);
        console.log(barSize);
        console.log(this.barWidth);
        console.log(this.barHeight);
        console.log(barThickness);
        console.log(height);
        this.trackBounds = new Phaser.Geom.Rectangle(x, y, width, height);
        console.log(this.trackBounds)
        this.scrollbar = new Phaser.GameObjects.Graphics(scene);

        this.scrollbar.setScrollFactor(0);

        this.scrollbar.setInteractive({
            hitArea: this.trackBounds,
            hitAreaCallback: Phaser.Geom.Rectangle.Contains,
            draggable: true
        });

        if (depth !== null)
        {
            this.scrollbar.setDepth(depth);
        }

        //  Events

        if (orientation === 'horizontal')
        {
            this.scrollbar.on('pointerdown', this.onDownH, this);
            this.scrollbar.on('drag', this.onDragH, this);
        }
        else
        {
            this.scrollbar.on('pointerdown', this.onDownV, this);
            this.scrollbar.on('drag', this.onDragV, this);
        }

        this.scrollbar.on('pointerover', this.onOver, this);
        this.scene.sys['input'].on('pointerup', this.onUp, this);

        this.scene.add.existing(this.scrollbar);

        this.drawTrack();
    }

    destroy ()
    {
        if (this.orientation === 'horizontal')
        {
            this.scrollbar.off('pointerdown', this.onDownH, this);
            this.scrollbar.off('drag', this.onDragH, this);
        }
        else
        {
            this.scrollbar.off('pointerdown', this.onDownV, this);
            this.scrollbar.off('drag', this.onDragV, this);
        }

        this.scrollbar.off('pointerover', this.onOver, this);
        this.scene.sys['input'].off('pointerup', this.onUp, this);

        this.scrollbar.destroy();
    }

    drawTrack ()
    {
        this.scrollbar.clear();

        this.scrollbar.translateCanvas(this.x, this.y);

        this.scrollbar.fillStyle(this.trackColor, this.trackAlpha);

        if (this.trackRadius)
        {
            this.scrollbar.fillRoundedRect(0, 0, this.trackWidth, this.trackHeight, this.trackRadius);
        }
        else
        {
            this.scrollbar.fillRect(0, 0, this.trackWidth, this.trackHeight);
        }

        if (this.pointerOn)
        {
            this.scrollbar.fillStyle(this.barDownColor, this.barAlpha);
        }
        else
        {
            this.scrollbar.fillStyle(this.barColor, this.barAlpha);
        }

        //  Adjust for padding (which is a display only change, it doesn't impact the trackPosition)
        let pos = this.barPosition;

        if (this.orientation === 'horizontal')
        {
            if (pos < this.trackPadding)
            {
                pos = this.trackPadding;
            }
            else if (pos > (this.trackBounds.width - this.trackPadding - this.barWidth))
            {
                pos = (this.trackBounds.width - this.trackPadding - this.barWidth);
            }

            if (this.barRadius)
            {
                console.log('has border radius');
                this.scrollbar.fillRoundedRect(pos, (this.trackHeight - this.barHeight) / 2, this.barWidth, this.barHeight, this.barRadius);
            }
            else
            {
                console.log('has no border radius');
                this.scrollbar.fillRect(pos, (this.trackHeight - this.barHeight) / 2, this.barWidth, this.barHeight);
            }
        }
        else
        {
            if (pos < this.trackPadding)
            {
                pos = this.trackPadding;
            }
            else if (pos > (this.trackBounds.height - this.trackPadding - this.barHeight))
            {
                pos = (this.trackBounds.height - this.trackPadding - this.barHeight);
            }

            if (this.barRadius)
            {
                console.log('has border radius');
                console.log(this.trackWidth);
                this.scrollbar.fillRoundedRect((this.trackWidth - this.barWidth) / 2, pos, this.barWidth, this.barHeight, this.barRadius);
            }
            else
            {
                
                this.scrollbar.fillRect((this.trackWidth - this.barWidth) / 2, pos, this.barWidth, this.barHeight);
            }
        }
    }

    onUp ()
    {
        if (this.pointerOn)
        {
            this.pointerOn = false;
            this.pointerOver = false;

            this.drawTrack();
        }
    }

    onOver ()
    {
        this.pointerOver = true;
    }

    onDownH (pointer)
    {
        const left = this.barPosition + this.x;
        const right = (this.barPosition + this.barWidth) + this.x;

        if (pointer.x >= left && pointer.x <= right)
        {
            this.pointerOn = true;

            this.barOffset = (pointer.x - this.barPosition - this.x);

            this.drawTrack();
        }
    }

    onDragH (pointer)
    {
        let x = pointer.x;

        if (this.pointerOn && this.trackBounds.contains(x, this.trackBounds.y))
        {
            this.barPosition = x - this.barOffset - this.x;

            const trackRight = this.trackBounds.width - this.barWidth;

            if (this.barPosition < 0)
            {
                this.barPosition = 0;
            }
            else if (this.barPosition > trackRight)
            {
                this.barPosition = trackRight;
            }

            this.trackPosition = Phaser.Math.Percent(this.barPosition, 0, trackRight);

            this.drawTrack();

            this.emit('move', this.trackPosition);
        }
    }

    onDownV (pointer)
    {
        console.log(pointer);
        const top = this.barPosition + this.y;
        const bottom = (this.barPosition + this.barHeight) + this.y;

        if (pointer.y >= top && pointer.y <= bottom)
        {
            console.log('this.pointerOn true');
            this.pointerOn = true;

            this.barOffset = (pointer.y - this.barPosition - this.y);

            this.drawTrack();
        }else{
            const trackBottom = this.trackBounds.height - this.barHeight;
            this.barPosition = pointer.y - this.barOffset - this.y;
            this.trackPosition = Phaser.Math.Percent(this.barPosition, 0, trackBottom);

            this.drawTrack();

            this.emit('move', this.trackPosition);
          
        }
    }

    onDragV (pointer)
    {
        let y = pointer.y;

        if (this.pointerOn && this.trackBounds.contains(this.trackBounds.x, y))
        {
            this.barPosition = y - this.barOffset - this.y;

            const trackBottom = this.trackBounds.height - this.barHeight;

            if (this.barPosition < 0)
            {
                this.barPosition = 0;
            }
            else if (this.barPosition > trackBottom)
            {
                this.barPosition = trackBottom;
            }

            this.trackPosition = Phaser.Math.Percent(this.barPosition, 0, trackBottom);

            this.drawTrack();

            this.emit('move', this.trackPosition);
        }
    }
}

export default Scrollbar