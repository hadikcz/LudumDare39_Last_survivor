import Phaser from 'phaser';

export default class extends Phaser.Sprite {
    constructor (game, x, y, player, world, zombieSpawner) {
        super(game, x, y, 'player_person', 0);
        
        this.gameWorld = world;
        this.player = player;
        this.zombieSpawner = zombieSpawner;
        
        this.game.add.existing(this);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.scale.setTo(1.2);
        
        this.anchor.setTo(0.5);
        
        this.body.setSize(25, 25, 40, 80);
        
        this.movementVelocity = 80;
        
        this.canAttack = true;
        this.isAttacking = false;
        
        this.gameWorld.playerGroup.add(this);
        
        this.tint = 0x00FF00;
        
        this.prepareAnimations();
        
        this.hp = 100;
        
        this.isDead = false;
    }

    update () {
        if(this.isDead){
            return;
        }
        var distance = this.game.physics.arcade.distanceBetween(this, this.player);
        if(distance > 90){
            this.handleMoveAnimation();
            this.game.physics.arcade.moveToObject(this, this.player, this.movementVelocity);
        } else {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.animations.stop('runDown');
            this.animations.stop('runTop');
            this.animations.stop('runRight');
            this.animations.stop('runLeft');
        }

        if(distance <= 130){
            if(this.canAttack){
                this.player.hit(this.game.rnd.integerInRange(1, 2));
                this.handleAttackAnimation();
                this.canAttack = false;
                this.game.time.events.add(1000, function(){this.canAttack = true;}, this);
            }
        }
    }
    
    isMoving(){
        return (this.body.velocity.x !== 0 ||
          this.body.velocity.y !== 0);
    }
    
    hit(damage){
        this.hp -= damage;
        if(this.hp <= 0){
            this.die();
        }
    }
    
    prepareAnimations(){
        var speed = 15;
        this.animations.add('runDown', this.getRange(41, 50), speed, true);
        this.animations.add('runLeft', this.getRange(51, 60), speed, true);
        this.animations.add('runRight', this.getRange(61, 70), speed, true);
        this.animations.add('runTop', this.getRange(71, 80), speed, true);
        this.animations.add('idle', this.getRange(81, 90), speed, true);
        
        speed = 15;        
        this.animations.add('attackDown', this.getRange(1, 10), speed, true);
        this.animations.add('attackLeft', this.getRange(11, 20), speed, true);
        this.animations.add('attackRight', this.getRange(21, 30), speed, true);
        this.animations.add('attackTop', this.getRange(31, 40), speed, true);        
    }
    
    handleAttackAnimation(){
        var angle = this.game.physics.arcade.angleBetween(this, this.player);
        var degree = (angle * 180 / Math.PI) + 180;

        if(degree >= 45 && degree < 135){
            this.animations.play('attackTop');
        } else if(degree >= 135 && degree < 225){
            this.animations.play('attackRight');
        } else if(degree >= 225 && degree < 315){    
            this.animations.play('attackDown');
        } else{
            this.animations.play('attackLeft');
        }  
    }
    
    handleMoveAnimation(){
        var angle = this.game.physics.arcade.angleBetween(this, this.player);
        var degree = (angle * 180 / Math.PI) + 180;

        if(degree >= 45 && degree < 135){
            this.animations.play('runTop');
        } else if(degree >= 135 && degree < 225){
            this.animations.play('runRight');
        } else if(degree >= 225 && degree < 315){    
            this.animations.play('runDown');
        } else{
            this.animations.play('runLeft');
        }
    }
    
    
    getRange(start, end){
        var numbers = [];
        for(var i = start; i <= end; i++){
            numbers.push(i - 1);
        }
        return numbers;
    }
    
    die(){
        this.isDead = true;
        var delay = 500;
        this.game.add.tween(this).to( {alpha: 0}, delay, "Linear", true, 0, -1);
        
        this.game.time.events.add(delay, function(){
        this.zombieSpawner.killedZombies++;
        this.destroy();
        }, this);
    }
    
}
