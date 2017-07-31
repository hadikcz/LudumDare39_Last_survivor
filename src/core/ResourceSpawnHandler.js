import Phaser from 'phaser';
import Tree from './../entity/Tree';
import Stone from './../entity/Stone';
import Bush from './../entity/Bush';

export default class {
    constructor (game, worldSize, gameWorld) {
        this.game = game;
        this.worldSize = worldSize;
        
        this.gameWorld = gameWorld;
        
        this.stones = this.game.add.group();
        this.bushes = this.game.add.group();
        this.trees = this.game.add.group();
        
        this.generateBushes();
        this.generateTrees();
        this.generateStones();
    }
    
    generateTrees(){
        var count = 150;
        for(var i = 0; i < count; i++){
           this.createTree();
        }
    }
    
    generateStones(){
        var count = 90;
        for(var i = 0; i < count; i++){
           this.createStone();
        }
    }
    
    generateBushes(){
        var count = 25;
        for(var i = 0; i < count; i++){
           this.createBush();
        }
    }
    
    createTree(){
        var tries = 0;
        var spawn = this._getRandomSpawn();
        while(!this._canSpawnOnPos(this.trees, spawn, 250) && tries < 10){
            tries++;
            spawn = this._getRandomSpawn();
        }
        if(tries < 10){
            var resourceCount = this.game.rnd.integerInRange(20, 50);
            var resource = new Tree(this.game, spawn.x, spawn.y, resourceCount, this.gameWorld);
            this.trees.add(resource); 
        }
    }
    
    createStone(){
        var tries = 0;
        var spawn = this._getRandomSpawn();
        while(!this._canSpawnOnPos(this.stones, spawn, 250) && tries < 10){
            tries++;
            spawn = this._getRandomSpawn();
        }
        if(tries < 10){
            var resourceCount = this.game.rnd.integerInRange(10, 30);
            var resource = new Stone(this.game, spawn.x, spawn.y, resourceCount, this.gameWorld);
            this.stones.add(resource); 
        }
    }
    
    createBush(){
        var tries = 0;
        var spawn = this._getRandomSpawn();
        while(!this._canSpawnOnPos(this.bushes, spawn, 250) && tries < 10){
            tries++;
            spawn = this._getRandomSpawn();
        }
        if(tries < 10){
            var resourceCount = this.game.rnd.integerInRange(2, 4);
            var resource = new Bush(this.game, spawn.x, spawn.y, resourceCount, this.gameWorld);
            this.bushes.add(resource); 
        }
    }
    
    _getRandomSpawn(){
        return new Phaser.Point(
        this.game.rnd.integerInRange(0, this.worldSize.x),
        this.game.rnd.integerInRange(0, this.worldSize.y));
    }
    
    _canSpawnOnPos(group, pos, range){
        var closest = group.getClosestTo(pos);
        if(!closest){
            return true;
        }
        return (closest.position.distance(pos) > range);
    }
    
    
    
    getNereastResource(pos, range){
        var founded = [];
        
        var resource = this._getNereastResourceByGroup(this.trees, pos, range);
        if(resource){
            founded.push(resource);
        }
        
        resource = this._getNereastResourceByGroup(this.stones, pos, range);
        if(resource){
            founded.push(resource);
        }
        
        resource = this._getNereastResourceByGroup(this.bushes, pos, range);
        if(resource){
            founded.push(resource);
        }
        
        var lowest = {distance: 999999};
        founded.forEach(function(found){
            if(found.distance < lowest.distance){
                lowest = found;
            }
        });
        
        if(typeof lowest.resource !== 'undefined'){
            return lowest.resource;
        } else {
            return null;
        }
            
    }
    
    _getNereastResourceByGroup(group, pos, range){
        var closest = group.getClosestTo(pos);
        if(!closest){
            return null;
        }
        
        var distance = closest.position.distance(pos);
        if(distance <= range){
            return {
                resource: closest,
                distance: distance
            };
        }
        return null;
    }
    
    
    
}
