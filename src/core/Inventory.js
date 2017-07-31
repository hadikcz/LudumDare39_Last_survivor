import Phaser from 'phaser';
import Items from './../json/Items';

export default class {
    constructor (game, player, resources, gameWorld) {
        this.game = game;
        this.player = player;
        this.resources = resources;   
        this.gameWorld = gameWorld;   
        
        this.selectedItem = null;
        this.items = Items;
        
        this.onChangeInventory = new Phaser.Signal();
    }
    
    
    upgrade(itemId){
        var item = this.findItemById(itemId);
        if(typeof item === 'undefined') return false;
        
        if(!this.isNextLevelExist(item)) return false;
        
        var nextLevelPrice = this.getNextLevelPrice(item);
        
        if(this.resources.canBuy(nextLevelPrice.wood, nextLevelPrice.stone)){
            if(typeof item.consume === 'undefined'){
                item.level++;    
            } else if(item.id === 5){
                this.gameWorld.spawnCampfireUnderPlayer();
            }
            
            this.resources.takeWood(nextLevelPrice.wood);
            this.resources.takeStone(nextLevelPrice.stone);
            this.onChangeInventory.dispatch();
        }
    }
    
    switchTo(itemId){
        var item = this.findItemById(itemId);
        if(typeof item === 'undefined') return false;
        
        if(this.isItemUnlocked(item)){
            this.selectedItem = item;
            this.onChangeInventory.dispatch();
        }
    }
    
    findItemById(itemId){
        for(var key in this.items){
            var item = this.items[key];
            if(item.id === itemId){
                return item;
            }
        }
    }
    
    getNextLevelPrice(item){
        if(this.isNextLevelExist(item)){
            return item.levels[item.level + 1];
        }
    }
    
    isNextLevelExist(item){
        return (typeof item.levels[item.level + 1] !== 'undefined');
    }
    
    isItemUnlocked(item){
        return (item.level !== -1 || item.consume === true);
    }
    
    getActualLevel(item){
        if(!this.isItemUnlocked(item)) return null;
        
        return item.levels[item.level];
    }
    
}
