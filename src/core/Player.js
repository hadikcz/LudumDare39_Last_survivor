import Phaser from 'phaser';
import Controlls from './Controlls';
import FlyTextUI from './../ui/FlyTextUI';

export default class extends Phaser.Sprite {
    constructor (game, x, y, world, resources) {
        super(game, x, y, 'player_person', 0);
        
        this.gameWorld = world;
        this.resources = resources;
        this.stats = null;
        this.inventory = null;
        this.zombieSpawner = null;
        
        this.game.add.existing(this);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        
        this.anchor.setTo(0.5);
        
        this.body.setSize(25, 25, 40, 80);
        
        this.movementVelocity = 100;
        this.body.drag.set(500);
        
        this.refireRate = 650; // ms
        this.isAttacking = false;
        
        this.calledDead = false;
        
        this._canShowHPChange = true;
        
        this.controlls = new Controlls(this.game, this);
        
        this.equipItem = this.game.add.image(0, 0, 'player_sword', 0);
        this.equipItem.anchor.setTo(0.5);
        this.equipItem.visible = false;
        this.addChild(this.equipItem);
        
        this.prepareAnimations();
        
        this.gameWorld.playerGroup.add(this);
        
        this.soundTree = this.game.add.audio('tree');
        this.soundStone = this.game.add.audio('stone');
        this.soundBush= this.game.add.audio('bush');
    }

    update () {
        this.game.physics.arcade.collide(this, this.gameWorld.resourceSpawnHandler.trees);
        this.game.physics.arcade.collide(this, this.gameWorld.resourceSpawnHandler.stones);
        this.game.physics.arcade.collide(this, this.gameWorld.resourceSpawnHandler.bushes);
        
        this.controlls.update();
        
        if(this.body.velocity.x > 0){
            this.animations.play('runRight');
            this.equipItem.animations.play('runRight');
        } else if(this.body.velocity.x < 0){
            this.animations.play('runLeft');
            this.equipItem.animations.play('runLeft');
        } else if(this.body.velocity.y > 0){
            this.animations.play('runDown');
            this.equipItem.animations.play('runDown');
        } else if(this.body.velocity.y < 0){
            this.animations.play('runTop');
            this.equipItem.animations.play('runTop');
        } else {
            this.animations.stop('runDown');
            this.animations.stop('runTop');
            this.animations.stop('runRight');
            this.animations.stop('runLeft');
            this.equipItem.animations.stop('runDown');
            this.equipItem.animations.stop('runTop');
            this.equipItem.animations.stop('runRight');
            this.equipItem.animations.stop('runLeft');
            if(!this.isAttacking){
                this.animations.play('idle');
                this.equipItem.animations.play('idle');
            }
        }
    }
    
    isMoving(){
        return (this.body.velocity.x !== 0 ||
          this.body.velocity.y !== 0);
    }
    
    attack(){
        this.isAttacking = true;
        var radius = 90;
        var target = null;
        
        var zombies = this.zombieSpawner.getNearZombies(radius);
        if(zombies.length > 0){
            zombies.forEach(function(zombie){
                var damage = this.getWeaponDamage(); 
                zombie.hit(damage);
                target = zombie;
                new FlyTextUI(this.game, zombie.x, zombie.y, Math.round(damage) , '#970000', '#4b0000');
            }, this);
        } else {
            var resource = this.gameWorld.resourceSpawnHandler.getNereastResource(this.position, radius);
            if(resource){
                var damage = this.getToolDamage();  
                
                var resourceCount = resource.hit(this, damage);
                this.resources.add(resourceCount, resource.type);
                target = resource;
                new FlyTextUI(this.game, this.x, this.y, "+"+Math.round(resourceCount)+" " +resource.type ,  '#039c1d', '#006412');
                if(resource.type == 'wood'){
                    this.soundTree.play();
                } else if(resource.type == 'stone'){
                    this.soundStone.play();
                } else if(resource.type == 'food'){
                    this.soundBush.play();
                }
            }
        }
        
        
            
        this.handleAttackAnimation(target);
        this.game.time.events.add(this.refireRate, function(){
            this.isAttacking = false;
            this.animations.stop('attackDown');
            this.animations.stop('attackLeft');
            this.animations.stop('attackRight');
            this.animations.stop('attackTop');
            
            this.equipItem.animations.stop('attackDown');
            this.equipItem.animations.stop('attackLeft');
            this.equipItem.animations.stop('attackRight');
            this.equipItem.animations.stop('attackTop');
            this.soundTree.stop();
            this.soundStone.stop();
        }, this);
    }
    
    getToolDamage(){
        if(this.inventory.selectedItem){
            if(typeof this.inventory.selectedItem.tool !== 'undefined' &&
              this.inventory.selectedItem.tool === true){
                var levelSettings = this.inventory.getActualLevel(this.inventory.selectedItem);
                if(levelSettings){
                    return levelSettings.damage / this.game.difficulty;
                }
            }
        return 1;
        }
        return 1;
    }
    
    getWeaponDamage(){
        if(this.inventory.selectedItem){
            if(typeof this.inventory.selectedItem.weapon !== 'undefined' &&
              this.inventory.selectedItem.weapon === true){
                var levelSettings = this.inventory.getActualLevel(this.inventory.selectedItem);
                if(levelSettings){
                    return levelSettings.damage / this.game.difficulty;
                }
            }
            return 10 / this.game.difficulty;
        } else {
            return 10 / this.game.difficulty;
        }
    }
    
    setInventory(inventory){
        this.inventory = inventory;
        this.inventory.onChangeInventory.add((input) => this.changeEquip(input));
    }
    
    changeEquip(){
        if(this.inventory.selectedItem &&
          (
            this.inventory.selectedItem.weapon === true ||
            this.inventory.selectedItem.tool === true )
          ){
            this.equipItem.visible = true;
            this.animations.play('idle');
            this.equipItem.animations.play('idle');
            this.equipItem.loadTexture(this.inventory.selectedItem.animSprite);
        }     
    }
    
    prepareAnimations(){
        var speed = 15;
        this.animations.add('runDown', this.getRange(41, 50), speed, true);
        this.animations.add('runLeft', this.getRange(51, 60), speed, true);
        this.animations.add('runRight', this.getRange(61, 70), speed, true);
        this.animations.add('runTop', this.getRange(71, 80), speed, true);
        this.animations.add('idle', this.getRange(81, 90), speed, true);
        
        this.equipItem.animations.add('runDown', this.getRange(41, 50), speed, true);
        this.equipItem.animations.add('runLeft', this.getRange(51, 60), speed, true);
        this.equipItem.animations.add('runRight', this.getRange(61, 70), speed, true);
        this.equipItem.animations.add('runTop', this.getRange(71, 80), speed, true);
        this.equipItem.animations.add('idle', this.getRange(81, 90), speed, true);
        
        speed = 15;        
        this.animations.add('attackDown', this.getRange(1, 10), speed, true);
        this.animations.add('attackLeft', this.getRange(11, 20), speed, true);
        this.animations.add('attackRight', this.getRange(21, 30), speed, true);
        this.animations.add('attackTop', this.getRange(31, 40), speed, true);        
        
        this.equipItem.animations.add('attackDown', this.getRange(1, 10), speed, true);
        this.equipItem.animations.add('attackLeft', this.getRange(11, 20), speed, true);
        this.equipItem.animations.add('attackRight', this.getRange(21, 30), speed, true);
        this.equipItem.animations.add('attackTop', this.getRange(31, 40), speed, true);
    }
    
    handleAttackAnimation(target){
        if(!target) {
            this.equipItem.animations.play('attackDown');
            this.animations.play('attackDown');
        } else {
            var angle = this.game.physics.arcade.angleBetween(this, target);
            var degree = (angle * 180 / Math.PI) + 180;


            if(degree >= 45 && degree < 135){
                this.animations.play('attackTop');
                this.equipItem.animations.play('attackTop');
            } else if(degree >= 135 && degree < 225){
                this.animations.play('attackRight');
                this.equipItem.animations.play('attackRight');
            } else if(degree >= 225 && degree < 315){    
                this.animations.play('attackDown');
                this.equipItem.animations.play('attackDown');
            } else{
                this.animations.play('attackLeft');
                this.equipItem.animations.play('attackLeft');
            }            
        }
    }
    
    getRange(start, end){
        var numbers = [];
        for(var i = start; i <= end; i++){
            numbers.push(i - 1);
        }
        return numbers;
    }
    
    hit(damage){
        this.stats.increaseHealth(-damage);
        new FlyTextUI(this.game, this.x, this.y, Math.round(damage) , '#c7d600', '#6e7600');
        if(this.stats.getHealth() <= 0){
            this.dead();
        }
    }
    
    dead(){
        if(!this.calledDead){
            this.calledDead = true;
            var bmd = this.game.add.bitmapData(window.innerWidth, window.innerHeight);
            bmd.fill(0, 0, 0, 255);
            var blackScreen = this.game.add.sprite(0, 0, bmd);
            blackScreen.alpha = 0.0;
            blackScreen.fixedToCamera = true;
            this.game.add.tween(blackScreen).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);   this.game.time.events.add(1000, function(){this.game.state.start("Dead");}, this);
        }
    }
    
    setStats(stats){
        this.stats = stats;
        this.stats.onChangeHealth.add((value) => this.changeHP(value), this);
    }
    
    changeHP(value){
        if(value.change < 0.09) return;
        if(this._canShowHPChange){
            this._canShowHPChange = false;
            new FlyTextUI(this.game, this.x, this.y, "+"+value.change ,  '#039c1d', '#006412');
            this.game.time.events.add(1000, function(){this._canShowHPChange = true;}, this);
        }                
    }
    
    
}
