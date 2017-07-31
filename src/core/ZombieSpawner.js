import Phaser from 'phaser';
import Zombie from './../entity/Zombie';

export default class {
    constructor (game, player, gameWorld) {
        this.game = game;
        this.player = player;
        this.gameWorld = gameWorld;
        
        this.dayCycle = this.gameWorld.dayCycle;
        
        this.zombies = this.gameWorld.zombieGroup;
        
        this.zombieLimit = 2; // 2    
        this.killedZombies = 0;
        
        this.round = this.dayCycle.getDay();

        this.isWaitingToNextRound = true;

        this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.spawnZombies, this);
        this.dayCycle.onNightCome.add(() => this.startNextRound(), this);
        this.dayCycle.onDayCome.add(() => this.killAll(), this);
    }

    update () {        
        if(this.zombieLimit == this.killedZombies && this.isWaitingToNextRound === false){
          this.roundFinished();
        }
    }
    
    spawnZombies(override){
        if(typeof override === 'undefined' && this.isWaitingToNextRound === true) {
            console.log('waiting for next round');
            return;
        }
        
        var count = this.game.rnd.integerInRange(4, 50);
        for(var i = 0; i < count; i++){
            if(this.canCreateAnotherZombie()){
                var spawn = this.getSpawn();
                var zombie = new Zombie(this.game, spawn.x, spawn.y , this.player, this.gameWorld, this);
                this.zombies.add(zombie);
                console.log('spawned zombie on ' + spawn.x + " " + spawn.y);
            }
        }
    }
    
    startNextRound(){
        this.round++;
            this.killedZombies = 0;
            this.zombieLimit += Math.round(this.zombieLimit * 0.25);
//            gameInterface.roundCounter.setText("Round: " + this.round);
            console.log("Round: " + this.round);
            this.isWaitingToNextRound = false;
            
            console.log("Next round " + this.round + " started");
            // gameInterface.showCenterText("Next round " + zombieSpawner.round + " started");
            // player.restart();
    }
    
    roundFinished(){  
        this.isWaitingToNextRound = true;
        console.log("Finished round");
    }
    
    canCreateAnotherZombie(){
        if(this.zombies.children.length < this.zombieLimit - this.killedZombies){
            return true;
        }
        return false;
    } 
    
    getSpawn(){
        var spawn = new Phaser.Point();
        spawn.x = this.game.rnd.integerInRange(0, this.gameWorld.worldSize.x);
        spawn.y = this.game.rnd.integerInRange(0, this.gameWorld.worldSize.x);
        return spawn;
    }
    
    killAll(){
        this.zombies.children.forEach(function(zombie){
            zombie.die();
        }, this);
        this.zombies.children.forEach(function(zombie){
            zombie.die();
        }, this);
        this.zombies.children.forEach(function(zombie){
            zombie.die();
        }, this);
        this.zombies.children.forEach(function(zombie){
            zombie.die();
        }, this);
        console.log(this.zombies.children.length);
        console.log(this.killedZombies);
    }
    
    getNearZombies(limit){
        var founded = [];
        this.zombies.children.forEach(function(zombie){
            var distance = this.game.physics.arcade.distanceBetween(zombie, this.player);
            if(distance <= limit){
                founded.push(zombie);
            }
        }, this);
        return founded;
    }
}
