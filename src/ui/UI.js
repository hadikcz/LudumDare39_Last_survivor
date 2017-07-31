'use strict'
/* global module */
import BarsUI from './BarsUI';
import ClockUI from './ClockUI';
import ResourcesUI from './ResourcesUI';
import InventoryUI from './InventoryUI';

export default class {
    constructor(game, stats, world, resources, inventory){
        this.game = game;
        
        this.barsUI = new BarsUI(this.game, stats);
        this.clockUI = new ClockUI(this.game, world.dayCycle);
        this.resourcesUI = new ResourcesUI(this.game, resources, stats);
        this.inventoryUI = new InventoryUI(this.game, inventory);
        
        this.customUIGroup = this.game.add.group();
        
        this.status = this.game.add.text(this.game.width / 2, 150, '', {fill: '#ffcc86', font: '32px Consolas, Arial'});
        this.status.anchor.setTo(0.5);
        this.status.stroke = "#000000";
        this.status.strokeThickness = 3;
        this.status.fixedToCamera = true;
        this.status.alpha = 0;
        this.customUIGroup.add(this.status);
    }
    
    update(){
        this.barsUI.update();
    }
    
    render(){
    }
    
    setStatus(text){
        var tween = this.game.add.tween(this.status).to( {alpha: 0}, 50, "Linear", true, 0, -1);
         tween.onComplete.add(function(){
            var tween2 = this.game.add.tween(this.status).to( {alpha: 0}, 50, "Linear", true, 0, -1);
            tween2.onComplete.add(function(){
                this.status.setText(text);
            }, this);
        }, this);
    }
}
