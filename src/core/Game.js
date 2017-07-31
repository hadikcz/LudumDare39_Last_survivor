/* globals __DEV__, window */
import Phaser from 'phaser';
import Player from './../core/Player';
import World from './../core/World';
import Stats from './../core/Stats';
import Inventory from './../core/Inventory';
import Resources from './../core/Resources';
import ZombieSpawner from './../core/ZombieSpawner';
import UI from './../ui/UI';

export default class extends Phaser.State {
    preload () {}
    init () {}

    create () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.world = new World(this.game);
        this.game.gameWorld = this.world;
        
        this.resources = new Resources();
        
        this.shadow = this.game.add.image(0, 0, 'player_shadow');
        this.shadow.anchor.setTo(0.5, 0);
        this.shadow.alpha = 0.25;
        this.world.shadowsGroup.add(this.shadow);
        
        this.player = new Player(this.game, this.world.worldSize.x / 2, this.world.worldSize.y / 2, this.world, this.resources);
        this.game.camera.follow(this.player);
        this.world.player = this.player;
        
        this.stats = new Stats(this.game, this.player, this.world, this.resources);
        this.player.setStats(this.stats);
        this.inventory = new Inventory(this.game, this.player, this.resources, this.world);
        this.player.setInventory(this.inventory);
        
        this.zombieSpawner = new ZombieSpawner(this.game, this.player, this.world);
        this.player.zombieSpawner = this.zombieSpawner;
        
        // UI
        this.createNightScreen();
        this.ui = new UI(this.game, this.stats, this.world, this.resources, this.inventory);
        this.game.ui = this.ui;
        
        
        if (__DEV__) {
            window.all = this;
        }
    }
    
    update(){
        try{
        this.shadow.x = this.player.x;
        this.shadow.y = this.player.y;
        
        this.zombieSpawner.update();
            
        }catch(e){};
    }

    render () {
        if (__DEV__) {
            // this.game.debug.text('render FPS: ' + (this.game.time.fps || '--') , 2, 14, "#00ff00");
        }
        
//        this.world.
        return;
        this.world.resourceSpawnHandler.stones.children.forEach(function(child){
            this.game.debug.body(child);
        }, this);
        
        this.world.resourceSpawnHandler.trees.children.forEach(function(child){
            this.game.debug.body(child);
        }, this);
        this.world.resourceSpawnHandler.bushes.children.forEach(function(child){
            this.game.debug.body(child);
        }, this);
            this.game.debug.body(this.player);
        
    }
    
    createNightScreen(){
        // testing night
        var width = this.game.width;
        var height = this.game.height;
        var bmd = this.game.add.bitmapData(width, height);
        bmd.ctx.fillStyle = 0x000000;
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, width, height);
        bmd.ctx.fill();
        bmd.update();
        
        this.nightScreen = this.game.add.sprite(0, 0, bmd);
        this.nightScreen.alpha = 0;
        this.nightScreen.fixedToCamera = true;
        
        this.world.dayCycle.onNightCome.add(function(){
            this.game.add.tween(this.nightScreen).to( { alpha: 0.6 }, 1000, "Linear", true);
        }, this);
        
        this.world.dayCycle.onDayCome.add(function(){
            this.game.add.tween(this.nightScreen).to( { alpha: 0 }, 1000, "Linear", true);
        }, this);
    }
    
}
