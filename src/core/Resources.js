import Phaser from 'phaser';

export default class {
    constructor () {
        this.wood = 0;
        this.stone = 0;
        this.food = 0;
        
        this.onChangeResources = new Phaser.Signal();
    }

    update () {}
    
    getWood(){
        return this.wood;
    }
    
    getStone(){
        return this.stone;
    }
    
    getFood(){
        return this.food;
    }
    
    add(count, type){
        switch(type){
            case "wood":
                this.addWood(count);
                break;
            case "stone":
                this.addStone(count);
                break;
            case "food":
                this.addFood(count);
                break;
        }
    }
    
    addWood(count){
        if(typeof count === 'undefined') count = 1;
        this.wood += count;
        this.onChangeResources.dispatch();
    }
    
    addStone(count){
        if(typeof count === 'undefined') count = 1;
        this.stone += count;
        this.onChangeResources.dispatch();
    }
    
    addFood(count){
        if(typeof count === 'undefined') count = 1;
        this.food += count;
        this.onChangeResources.dispatch();
    }
    
    takeWood(count){
        if(typeof count === 'undefined') count = 1;
        if(this.wood - count >= 0){
            this.wood -= count;   
            this.onChangeResources.dispatch();
            return true;
        }
        return false;
    }
    
    takeStone(count){
        if(typeof count === 'undefined') count = 1;
        if(this.stone - count >= 0){
            this.stone -= count;   
            this.onChangeResources.dispatch();
            return true;
        }
        return false;
    }
    
    takeFood(count){
        if(typeof count === 'undefined') count = 1;
        if(this.food - count >= 0){
            this.food -= count;   
            this.onChangeResources.dispatch();
            return true;
        }
        return false;
    }
    
    canBuy(woodPrice, stonePrice){
        return (woodPrice <= this.getWood() &&
        stonePrice <= this.getStone());
    }
}
