import Resource from './Resource';
import Phaser from 'phaser';

export default class extends Resource {
    constructor (game, x, y, resourceCount, gameWorld) {
        super(game, x, y, '', 1, gameWorld, {
            type: 'wood',
            resourceCount: resourceCount,
        });
        
        this.originalScale = 1;
        this.scale.setTo(this.originalScale);
        
        
        this.trunk = this.game.add.sprite(x, y, 'tree', 1);
        this.trunk.anchor.setTo(0.5);
        
        this.tree = this.game.add.image(x, y, 'tree', 0);
        this.tree.anchor.setTo(0.5);
        
        this.gameWorld.backPlayerGroup.add(this.trunk);
        this.gameWorld.frontPlayerGroup.add(this.tree);
        
        this.originalPos = new Phaser.Point(x, y);
        
        this.scaleEffect = this.tree;
        
        this.body.setSize(40, 70, -5, 40);
        
        this.createShadow('tree', 2);
        var range = 4;
        var tweenX = this.game.rnd.realInRange(-range, range);
        var tweenY = this.game.rnd.realInRange(-range, range);
        var delay = this.game.rnd.integerInRange(1500, 2000);
        
        var tween = this.game.add.tween(this.tree).to( {x: this.x + tweenX, y: this.y + tweenY}, delay, "Linear", true, 0, -1);
        tween.yoyo(true, 0);
        
        var tween2 = this.game.add.tween(this.shadow).to( {x: this.x + tweenX, y: this.y + tweenY}, delay, "Linear", true, 0, -1);
        tween2.yoyo(true, 0);
    }
    
    resourceDeplated(){
        super.resourceDeplated();   
        this.respawn();     
        this.game.add.tween(this.tree).to( {alpha: 0}, 500, "Linear", true, 0, -1);
        this.game.add.tween(this.trunk).to( {alpha: 0}, 500, "Linear", true, 0, -1);
        this.game.add.tween(this.shadow).to( {alpha: 0}, 500, "Linear", true, 0, -1);
    }
    
    destroy(){
        super.destroy();
        this.x = 0;
        this.y = 0;
        this.tree.destroy();
        this.trunk.destroy();
        this.shadow.destroy();
    }
    
    respawn(){
        this.game.gameWorld.resourceSpawnHandler.createTree();
    }
    
}
