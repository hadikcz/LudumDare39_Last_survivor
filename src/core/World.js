import Phaser from 'phaser';
import Campfire from './../entity/Campfire';
import DayCycle from './DayCycle';
import ResourceSpawnHandler from './ResourceSpawnHandler';

export default class {
    constructor (game) {
        this.game = game;
        this.player = null;
        
        this.worldSize = {
            x: 4500,
            y: 4500
        };
        
        this.game.world.setBounds(0, 0, this.worldSize.x, this.worldSize.y);
        
        this.grassBg = this.game.add.group();
        this.createBg();

        this.shadowsGroup = this.game.add.group();
        this.backPlayerGroup = this.game.add.group();
        this.playerGroup = this.game.add.group();
        this.zombieGroup = this.game.add.group();
        this.preFrontPlayer = this.game.add.group();
        this.frontPlayerGroup = this.game.add.group();
        
        this.dayCycle = new DayCycle(this.game);
        
        this.resourceSpawnHandler = new ResourceSpawnHandler(this.game, this.worldSize, this);
        
        this.campfires = this.game.add.group();
        
        //this.createCampfires();
        
        this.dayCycle.onNightCome.add(function(){
            this.shadowsGroup.children.forEach(function(shadow){
                shadow.alpha = 0.15;
            }, this);
        }, this);
        
        this.dayCycle.onDayCome.add(function(){
            this.shadowsGroup.children.forEach(function(shadow){       
                shadow.alpha = 0.5;         
            }, this);
        }, this);
    }
    
    createBg(){
        for(var x = 0; x < 20; x++){
            for(var y = 0; y < 20; y++){
                var image = this.game.add.image(x * 256, y * 230, 'grass');
                this.grassBg.add(image);
            }
        }
    }
    
    createCampfires(){
        var count = this.game.rnd.integerInRange(1, 3);
        
        for(var i = 0; i < count; i++){
            var point = new Phaser.Point(this.game.rnd.integerInRange(1, 1000), this.game.rnd.integerInRange(1, 1000));
            this.createCampfire(point.x, point.y);
        }
    }

    createCampfire(x, y){
        var campfire = new Campfire(this.game, x,y);
        this.campfires.add(campfire);
        this.backPlayerGroup.add(campfire.campfire);
        this.shadowsGroup.add(campfire.shadow);
        this.backPlayerGroup.add(campfire.fire);
        this.backPlayerGroup.add(campfire.fireAnim);
    }
    
    spawnCampfireUnderPlayer(){
        var radians = this.player.angle * Math.PI;
        
        var length = 50;
        var x = (this.player.x + Math.cos(radians) * length);
        var y = (this.player.y + Math.sin(radians) * length);
        
        this.createCampfire(x, y);

    }
    
    isNearCampFire(){
        if(this.player === null) return false;
        
        var findedCampfire = this.campfires.getClosestTo(this.player);
        if(!findedCampfire) return false;
        return (typeof findedCampfire !== 'undefined' &&
                findedCampfire.position.distance(this.player) <= 200);
    }
}
