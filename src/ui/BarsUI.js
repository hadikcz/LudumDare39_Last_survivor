'use strict'
import BasicUIElement from './BasicUIElement';
import HealthBarSprite from './../../libs/HealthBarSprite';

export default class extends BasicUIElement {
    constructor(game, stats){
        super(game);
        this.game = game;
        this.stats = stats;
                
        this.setOrigin(45, this.game.height - 160);
        this.enableFixedToCamera();
        
        this.settings = {
            width: 195,
            height: 20,
            skip: 50,
        };
        
        this.createHealthBar(0);
        this.createColdBar(1);
        this.createHungerBar(2);
        
        this.stats.onChangeHealth.add((value) => this.redrawHealth(value));
        this.stats.onChangeCold.add((value) => this.redrawCold(value));
        this.stats.onChangeHunger.add((value) => this.redrawHunger(value));
    }
    
    createHealthBar(pos){
        this.healthBar = new HealthBarSprite(this.game, {x: this.getOrigin().x - 37, y: this.getOrigin().y + (this.settings.height + this.settings.skip * pos) - 15, fixedToCamera: false, vertical: false, barSprite: 'hpBar', bgSprite: 'bar', barOffesetX: 34, barOffesetY: -4, delay: 50});
        this.healthBar.setPercent(50);
        this.healthBar.addToGroup(this.uiGroup);
        this.healthBar.barSprite.tint = 0xff4545;
        this.healthBar.bgSprite.tint = 0xff4545;

        
        var icon = this.game.add.image(this.getOrigin().x - 20, this.getOrigin().y + (this.settings.height + this.settings.skip * pos) + 8, 'barIcons', 0);
        icon.anchor.setTo(0.5);
        icon.scale.setTo(0.75);
        this.add(icon);
    }
    
    createColdBar(pos){
        this.coldBar = new HealthBarSprite(this.game, {x: this.getOrigin().x - 37, y: this.getOrigin().y + (this.settings.height + this.settings.skip * pos) - 15, fixedToCamera: false, vertical: false, barSprite: 'hpBar', bgSprite: 'bar', barOffesetX: 34, barOffesetY: -4, delay: 50});
        this.coldBar.setPercent(75);
        this.coldBar.addToGroup(this.uiGroup);
        this.coldBar.barSprite.tint = 0x7cd8eb;
        this.coldBar.bgSprite.tint = 0x7cd8eb;
        
        var icon = this.game.add.image(this.getOrigin().x - 20, this.getOrigin().y + (this.settings.height + this.settings.skip * pos) + 8, 'barIcons', 2);
        icon.anchor.setTo(0.5);
        icon.scale.setTo(0.75);
        icon.bringToTop();
        this.uiGroup.bringToTop(icon);
        this.add(icon);
    }
    
    createHungerBar(pos){
        this.hungerBar = new HealthBarSprite(this.game, {x: this.getOrigin().x - 37, y: this.getOrigin().y + (this.settings.height + this.settings.skip * pos) - 15, fixedToCamera: false, vertical: false, barSprite: 'hpBar', bgSprite: 'bar', barOffesetX: 34, barOffesetY: -4, delay: 50});
        this.hungerBar.setPercent(75);
        this.hungerBar.addToGroup(this.uiGroup);
        this.hungerBar.barSprite.tint = 0xfef990;
        this.hungerBar.bgSprite.tint = 0xfbef01;
        
        var icon = this.game.add.image(this.getOrigin().x - 20, this.getOrigin().y + (this.settings.height + this.settings.skip * pos) + 8, 'barIcons', 1);
        icon.anchor.setTo(0.5);
        icon.scale.setTo(0.75);
        this.add(icon);
        
        
        this.eatButton = this.game.add.button(this.getOrigin().x + 250, this.getOrigin().y + (this.settings.height + this.settings.skip * pos) + 10, 'eat_button', function(){
            if(this.stats.resources.getFood() > 0){
                this.stats.eat();
            } else {
                this.game.ui.setStatus('No food');
            }
        }, this, 1, 0, 0);
        this.eatButton.anchor.setTo(0.5);
        this.eatButton.scale.setTo(0.5);
        this.add(this.eatButton);
    }
    
    redrawHealth(values){
        var percent = this.calcPercent(values.current, values.max);
        this.healthBar.setPercent(percent);
    }
    
    redrawCold(values){
        var percent = 100 - this.calcPercent(values.current, values.max);
        this.coldBar.setPercent(percent);
    }
    
    redrawHunger(values){
        var percent = 100 - this.calcPercent(values.current, values.max);
        this.hungerBar.setPercent(percent);
    }
    
}