'use strict'
import BasicUIElement from './BasicUIElement';
import HealthBarSprite from './../../libs/HealthBarSprite';

export default class extends BasicUIElement {
    constructor(game, dayCycle){
        super(game);
        this.game = game;
        this.dayCycle = dayCycle;
                
        this.setOrigin(10, 10);
        this.enableFixedToCamera();
        
        this.createHourClock();
        
        this.dayText = this.game.add.text(this.getOrigin().x + 250, this.getOrigin().y + 10, 'Day 1', {fill: 'white', font: '15px Arial'});
        this.dayText.stroke = '#000000';
        this.dayText.strokeThickness = 3;
        this.add(this.dayText);
        
        this.dayCycle.onChangeTime.add((value) => this.redrawClock(value));
    }
    
    createHourClock(){
        
        this.hourClock = new HealthBarSprite(this.game, {
            x: this.getOrigin().x,
            y: this.getOrigin().y, fixedToCamera: false, vertical: false, barSprite: 'hpBar', bgSprite: 'bar', barOffesetX: 34, barOffesetY: -4, delay: 50});
        this.hourClock.setPercent(0);
        this.hourClock.addToGroup(this.uiGroup);
        this.hourClock.barSprite.tint = 0xFFFFFF;
        this.hourClock.bgSprite.tint = 0xFFFFFF;
        
        var icon = this.game.add.image(this.getOrigin().x + 17 , this.getOrigin().y + 20, 'barIcons', 3);
        icon.anchor.setTo(0.5);
        icon.scale.setTo(0.75);
        icon.bringToTop();
        this.add(icon);
        
        
        var icon2 = this.game.add.image(this.getOrigin().x + 135 , this.getOrigin().y + 45, 'barIcons', 4);
        icon2.anchor.setTo(0.5);
        icon2.scale.setTo(0.75);
        icon2.bringToTop();
        this.add(icon2);
    }
    
    redrawClock(values){
        var percent = this.calcPercent(values.current, values.max);
        this.hourClock.setPercent(percent);
        
        this.dayText.setText("Day " + this.dayCycle.getDay());
    }
    
}