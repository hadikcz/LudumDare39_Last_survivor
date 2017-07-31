import Resource from './Resource';

export default class extends Resource{
    constructor (game, x, y, resourceCount, gameWorld) {
        super(game, x, y, 'bush', 0, gameWorld, {
            type: 'food',
            resourceCount: resourceCount,
        });
        
        
        this.alpha = 0;
        
        this.originalScale = 1;
        
        this.bush = this.game.add.image(x, y, 'bush', 0);
        this.bush.anchor.setTo(0.5);
        this.bush.scale.setTo(this.originalScale);
        this.scaleEffect = this.bush;
        
        this.body.setSize(45, 40, 15, 13);
        
        this.createShadow('bush', 1);
         this.gameWorld.backPlayerGroup.add(this.bush);
        
        var range = 3;
        var tweenX = this.game.rnd.realInRange(-range, range);
        var tweenY = this.game.rnd.realInRange(-range, range);
        var delay = this.game.rnd.integerInRange(1500, 2000);
        
        var tween = this.game.add.tween(this.bush).to( {x: this.x + tweenX, y: this.y + tweenY}, delay, "Linear", true, 0, -1);
        tween.yoyo(true, 0);
        
        var tween2 = this.game.add.tween(this.shadow).to( {x: this.x + tweenX, y: this.y + tweenY}, delay, "Linear", true, 0, -1);
        tween2.yoyo(true, 0);
    }
    
    resourceDeplated(){
        super.resourceDeplated();        
        this.game.add.tween(this.bush).to( {alpha: 0}, 500, "Linear", true, 0, -1);
        this.game.add.tween(this.shadow).to( {alpha: 0}, 500, "Linear", true, 0, -1);
        this.respawn();
    }
    
    destroy(){
        super.destroy();
        this.x = 0;
        this.y = 0;
        this.bush.destroy();
        this.shadow.destroy();
    }
    
    respawn(){
        this.gameWorld.resourceSpawnHandler.createBush();
    }
}
