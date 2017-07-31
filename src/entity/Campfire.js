import Phaser from 'phaser';

export default class extends Phaser.Sprite {
    constructor (game, x, y) {
        super(game, x, y, '', 0);
        
        this.game.add.existing(this);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.anchor.setTo(0.5);
        
        this.body.setSize(100, 80, 10, 20);
        
        
        this.campfire = this.game.add.sprite(x, y, 'campfire', 0);
        this.campfire.anchor.setTo(0.5);
        this.campfire.alpha = 1;
        
        this.fire = this.game.add.sprite(0, 0, 'fire');
        this.fire.anchor.setTo(0.5);
        this.fire.alpha = 0.3;
        
        this.fireAnim = this.game.add.image(0, 0, 'fire_animation', 0);
        this.fireAnim.anchor.setTo(0.5);
        this.fireAnim.animations.add('fire', [0,1,2,3,4,5,6,7], 20, true);  
        this.fireAnim.animations.play('fire');      
        
        this.game.time.events.loop(1000, function(){
            try{
                var scale = this.game.rnd.realInRange(0.9, 1.1);
                this.game.add.tween(this.fire.scale).to( { x: scale, y: scale }, 1000, "Linear", true);
            }catch(e){};

        }, this);
        
        
        this.shadow = this.game.add.image(this.x, this.y, 'campfire', 1);
        this.shadow.anchor.setTo(0.5);
        this.shadow.alpha = 0.5;
        
        
        this.game.time.events.add( this.game.rnd.integerInRange(25, 35) * 1000, function(){this.destroy();}, this);
    }

    update () {
        this.fire.x = this.x;  
        this.fire.y = this.y;
        this.fireAnim.x = this.x;  
        this.fireAnim.y = this.y -30;
    }
    
    destroy(){
        super.destroy();
        this.campfire.destroy();
        this.fire.destroy();
        this.fireAnim.destroy();
        this.shadow.destroy();
    }
}
