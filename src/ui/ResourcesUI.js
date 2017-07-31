'use strict'
import BasicUIElement from './BasicUIElement';

export default class extends BasicUIElement {
    constructor(game, resources, stats){
        super(game);
        this.game = game;
        this.resources = resources;
        this.stats = stats;
                
        this.setOrigin(25, 80);
        this.enableFixedToCamera();
        
        this.woodText = this.game.add.text(0, 0, '0', {fill: 'white', font: '15px Arial', boundsAlignH: 'left'});
        this.woodText.stroke = '#000000';
        this.woodText.strokeThickness = 3;
        this.woodText.anchor.setTo(0.5);
        this.woodText.setTextBounds(this.getOrigin().x + 35, this.getOrigin().y, 50, 15);
        this.add(this.woodText);
        
        this.woodIcon = this.game.add.sprite(this.getOrigin().x, this.getOrigin().y, 'resources_icons', 0);
        this.woodIcon.scale.setTo(2);
        this.woodIcon.anchor.setTo(0.5);
        this.add(this.woodIcon);
        /////
        
        this.stoneText = this.game.add.text(0, 0, ' 0', {fill: 'white', font: '15px Arial', boundsAlignH: 'left'});
        this.stoneText.anchor.setTo(0.5);
        this.stoneText.stroke = '#000000';
        this.stoneText.strokeThickness = 3;
        this.stoneText.setTextBounds(this.getOrigin().x + 35, this.getOrigin().y + 30, 50, 15);
        this.add(this.stoneText);
        
        this.stoneIcon = this.game.add.sprite(this.getOrigin().x, this.getOrigin().y + 30, 'resources_icons', 1);
        this.stoneIcon.scale.setTo(2);
        this.stoneIcon.anchor.setTo(0.5);
        this.add(this.stoneIcon);
        /////
        
        this.foodText = this.game.add.text(0, 0, '0', {fill: 'white', font: '15px Arial', boundsAlignH: 'left'});
        this.foodText.anchor.setTo(0.5);
        this.foodText.stroke = '#000000';
        this.foodText.strokeThickness = 3;
        this.foodText.setTextBounds(this.getOrigin().x + 35, this.getOrigin().y + 60, 50, 15);
        this.add(this.foodText);
        
        this.foodIcon = this.game.add.sprite(this.getOrigin().x, this.getOrigin().y + 60, 'resources_icons', 2);
        this.foodIcon.scale.setTo(2);
        this.foodIcon.anchor.setTo(0.5);
        this.add(this.foodIcon);
        
        /////
        
        this.resources.onChangeResources.add(() => this.redraw());
        this.redraw();
    }
    
    
    redraw(){
        this.woodText.setText(Math.round(this.resources.getWood()));
        this.stoneText.setText(Math.round(this.resources.getStone()));
        this.foodText.setText(Math.round(this.resources.getFood()));
    }
    
}