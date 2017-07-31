import Phaser from 'phaser';

export default class extends Phaser.Sprite {
    constructor (game, x, y, sprite, index, gameWorld, settings) {
        super(game, x, y, sprite, index);
        
        this.shadowGroup = gameWorld.shadowsGroup;
        this.gameWorld = gameWorld;
        
        this.game.add.existing(this);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.originalScale = 1;
        this.anchor.setTo(0.5);

        this.type = settings.type;
        this.originalCount = settings.resourceCount;
        this.resourceCount = settings.resourceCount;
        this.body.immovable = true;
        
    }
    
    hit(attacker, damage){
        var tween = this.game.add.tween(this.scaleEffect.scale).to( { x: this.originalScale+0.2, y: this.originalScale+0.2 }, 25, "Linear", true);
        tween.onComplete.add(function(){
            if(typeof this !== 'undefined'){
                this.game.add.tween(this.scaleEffect.scale).to( { x: this.originalScale, y: this.originalScale }, 25, "Linear", true);
            }
        }, this);
        
        if(this.resourceCount > 0){
            if(this.resourceCount - damage <= 0){
                this.resourceDeplated();
                return Math.abs(this.resourceCount);
            }
            this.resourceCount -= damage;
            if(this.resourceCount <= 0){
                this.resourceDeplated();
                return Math.abs(this.resourceCount);
            }
            return damage;   
        } else {
            this.resourceDeplated();
            return damage;
        }
    }
    
    resourceDeplated(){
        this.game.time.events.add(500, function(){
            this.destroy();
        }, this);
    }
    
    createShadow(key, index){        
        this.shadow = this.game.add.image(this.x, this.y, key, index);
        this.shadow.anchor.setTo(0.5);
        this.shadow.alpha = 0.5;
    
        this.shadowGroup.add(this.shadow);
    }
    
    destroy(){
        if(typeof this.shadow !== 'undefined'){
            this.shadow.destroy();   
        }
    }
}
