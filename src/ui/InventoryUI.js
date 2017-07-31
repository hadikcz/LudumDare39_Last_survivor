'use strict'
import BasicUIElement from './BasicUIElement';
import InventorySlotUI from './InventorySlotUI';

export default class extends BasicUIElement {
    constructor(game, inventory){
        super(game);
        this.game = game;
        this.inventory = inventory;
        
        this.setOrigin(this.game.width / 2, this.game.height - 60);
        
        this.settings = {
            stepX: 65,
            startX: -100,
        };
        
        this.enableFixedToCamera();
        
        this.slots = [];
        
        this.inventory.onChangeInventory.add((value) => this.redraw(value));
        
        this.create();
    }
    
    create(){
        var i = 0;
        for(var key in this.inventory.items){
            var item = this.inventory.items[key];
            
            var slot = new InventorySlotUI(
                this.game, 
                this.getOrigin().x + i * this.settings.stepX + this.settings.startX,
                this.getOrigin().y,
                this.inventory,
                item
            );
            this.add(slot);
            this.slots.push(slot);
            i++;
        }
    }
    
    redraw(){
        this.slots.forEach(function(slot){
            slot.destroy();
        }, this);
        this.create();
    }
    
    
}