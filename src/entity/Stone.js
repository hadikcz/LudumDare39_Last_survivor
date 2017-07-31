import Resource from './Resource';

export default class extends Resource {
    constructor (game, x, y, resourceCount, gameWorld) {
        super(game, x, y, 'stone', 0,  gameWorld, {
            type: 'stone',
            resourceCount: resourceCount,
        });
        this.originalScale = this.game.rnd.realInRange(0.5, 0.7);
        this.scale.setTo(this.originalScale);
        
        this.body.setSize(100, 80, 10, 20);
        
        this.alpha = 0;
        
        this.stone = this.game.add.image(x, y, 'stone', 0);
        this.stone.anchor.setTo(0.5);
        this.stone.scale.setTo(this.originalScale);
        this.scaleEffect = this.stone;
        
        gameWorld.backPlayerGroup.add(this.stone);
        
        this.createShadow('stone', 1);
        this.shadow.scale.setTo(this.originalScale);
    }
    
    resourceDeplated(){
        super.resourceDeplated();      
        this.respawn();
        this.game.add.tween(this.stone).to( {alpha: 0}, 500, "Linear", true, 0, -1);
        this.game.add.tween(this.shadow).to( {alpha: 0}, 500, "Linear", true, 0, -1);
    }
    
    destroy(){
        super.destroy();  
        this.x = 0;
        this.y = 0;
        this.stone.destroy();
        this.shadow.destroy();
    }
    
    respawn(){
        this.gameWorld.resourceSpawnHandler.createStone();
    }
}
