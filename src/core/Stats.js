import Phaser from 'phaser';

export default class {
    constructor (game, player, world, resources) {
        this.game = game;
        this.player = player;
        this.world = world;
        this.resources = resources;
        
        this.health = {
            current: 50,
            max: 100,
        };
        
        this.hunger = {
            current: 0,
            max: 100,
        };
        
        this.cold = {
            current: 50,
            max: 100,
        };
        
        this.statsLooper = this.game.time.events.loop(50, this.update, this);
        
        this.onChangeHealth = new Phaser.Signal();
        this.onChangeCold = new Phaser.Signal();
        this.onChangeHunger = new Phaser.Signal();
        
        this.onDead = new Phaser.Signal();
        
        this.soundEat = this.game.add.audio('eat');
    }

    // called every 50ms
    update () {    
        this.handleCold();
        this.handleHunger();
        this.handleHealth();
        
        this.handleZeroStats();
        
        if(this.getHealth() <= 0){
            this.onDead.dispatch();
        }
    }
    
    handleCold(){
        var cold = 0;
        if(this.world.dayCycle.isNight()){
            cold += 0.05;
        } else if(this.world.dayCycle.isDay()){
            cold += -0.05;
        }
        
        if(this.world.isNearCampFire()){
            cold += -0.2;
        }        
        this.increaseCold(cold);
    }
    
    handleHunger(){
        var hunger = 0.02;
        if(this.player.isMoving()){
            hunger += 0.05;
        }
        
        this.increaseHunger(hunger);
    }
    
    handleHealth(){
        if(this.getHealth() >= this.health.max) return;
        
        var heal = 0.05;
        if(this.player.isMoving()){
            heal = 0;
        }
        
        if(this.world.isNearCampFire()){
            heal += 0.04;
        }  
        
        this.increaseHealth(heal);
    }
    
    handleZeroStats(){
        var damage = 0;
        if(this.getCold() >= this.cold.max){
            damage += 0.10;
        }
        
        if(this.getHunger() >= this.hunger.max){
            damage += 0.10;
        }
        
        this.increaseHealth(-damage);
    }
    
    getHealth(){
        return this.health.current;
    }
    
    getHunger(){
        return this.hunger.current;
    }
    
    getCold(){
        return this.cold.current;
    }
    
    increaseHealth(value){
        this.health.current += value;
        if(this.health.current >= this.health.max){
           this.health.current = this.health.max;
        }
        if(this.health.current < 0){
           this.health.current = 0;
        }

        this.health.change = value;
        this.onChangeHealth.dispatch(this.health);
    }
    
    increaseHunger(value){
        this.hunger.current += value;
        if(this.hunger.current >= this.hunger.max){
           this.hunger.current = this.hunger.max;
        }
        if(this.hunger.current < 0){
           this.hunger.current = 0;
        }
        this.onChangeHunger.dispatch(this.hunger);
    }
    
    increaseCold(value){
        this.cold.current += value;
        if(this.cold.current >= this.cold.max){
           this.cold.current = this.cold.max;
        }
        if(this.cold.current < 0){
           this.cold.current = 0;
        }
        this.onChangeCold.dispatch(this.cold);
    }
    
    eat(){
        if(this.resources.getFood() > 0){
            this.soundEat.play();
            this.increaseHunger(-20);
            this.increaseHealth(5);
            this.resources.takeFood(1);
        }
    }
}
