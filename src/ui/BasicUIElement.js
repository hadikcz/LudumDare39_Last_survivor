'use strict'
/* global module */
export default class {
    constructor(game){
        this.game = game;
        
        this.uiGroup = this.game.add.group();
        
        this.originPosition = {
            x: 0,
            y: 0
        };
    }
    
    show(){
        this.uiGroup.visible = true; 
    }
    
    hide(){
        this.uiGroup.visible = false; 
    }
    
    toggle(){
        this.uiGroup.visible = !this.uiGroup.visible;
    }
    
    destroy(){
        this.uiGroup.destroy();
    }
    
    setOrigin(x, y){
        this.originPosition.x = x;
        this.originPosition.y = y;
    }
    
    getOrigin(){
        return this.originPosition;
    }
    
    add(element){
        this.uiGroup.add(element);
    }
    
    enableFixedToCamera(){
        this.uiGroup.fixedToCamera = true;
    }
    
    disableFixedToCamera(){
        this.uiGroup.fixedToCamera = false;
    }
    
    update(){
        this.uiGroup.children.forEach(function(child){
            child.update();
        }, this);
    }
    
    calcPercent(current, max){
        return (current / max) * 100;
    }
}
