'use strict'
import Phaser from 'phaser';
import Phasetips from './../../libs/Phasetips';

export default class extends Phaser.Sprite{
    constructor(game, x, y, inventory, item){
        super(game, x, y, 'inventory', item.spriteIndex);
        
        this.game = game;
        this.inventory = inventory;
        this.item = item;
        
        this.anchor.setTo(0.5);
        
          if(this.item.level === -1 && typeof this.item.consume === 'undefined'){
//              this.alpha = 0.5;

        }

        if(this.item.level === -1 && typeof this.item.consume === 'undefined'){
            var lock = this.game.add.sprite(-2, -2, 'barIcons', 5);
            lock.anchor.setTo(0.5);
            lock.scale.setTo(1.5);
            this.addChild(lock);
        }
        
        if(typeof this.item.consume === 'undefined'){
            var levelText = this.game.add.text(-18, -20, this.item.level + 1, {fill: 'white', font: '12px Arial'});
            levelText.stroke = '#000000';
            levelText.strokeThickness = 3;
            this.addChild(levelText);
        }
        
        
        this.createTooltip();
        if(typeof this.item.consume === 'undefined'){
            var plusButton = this.game.add.button(12, 12, 'plus', function(){
                this.inventory.upgrade(this.item.id);
            }, this, 0, 0, 0);
            plusButton.anchor.setTo(0.5);
            plusButton.scale.setTo(0.75);
            this.addChild(plusButton);
        }
    }
    
    createTooltip(){
        var actualLevel = this.item.levels[this.item.level];
        var nextLevel = this.item.levels[this.item.level + 1];
        
        var width = 64;
        var height = 64;
        var bmd = this.game.add.bitmapData(width, height);
        bmd.ctx.fillStyle = 0x00aa00;
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, width, height);
        bmd.ctx.fill();
        bmd.update();
        
        
        if(typeof this.item.consume === 'undefined'){
            this.cover = this.game.add.button(0, 0, bmd, function(){
                this.inventory.switchTo(this.item.id);
            }, this);
        } else {
            this.cover = this.game.add.button(0, 0, bmd, function(){
                this.inventory.upgrade(this.item.id);
            }, this);
        }
        
        this.cover.anchor.setTo(0.5);
        if(this.inventory.selectedItem &&
           this.item.id === this.inventory.selectedItem.id){
            this.loadTexture('inventory', this.item.spriteIndex + 1);
        } else {
            this.loadTexture('inventory', this.item.spriteIndex);
        }
        
        this.cover.alpha = 0;
        this.addChild(this.cover);
        
        var tooltipBlock = this.game.add.group();
        
        var title = this.game.add.text(0, 0, this.item.name, {
            fontSize: 15,
            fill: "#ffffff",
            stroke: "#1e1e1e",
            strokeThickness: 1,
            wordWrap: true,
            wordWrapWidth: 200,
            boundsAlignH: 'center',
          });
        title.setTextBounds(0, 0, 100, 18);
        
        var levelTxt = this.game.add.text(0, 0, "Level: " + (this.item.level + 1), {
            fontSize: 8,
            fill: "#ffffff",
            stroke: "#1e1e1e",
            strokeThickness: 1,
            wordWrap: true,
            wordWrapWidth: 200,
            boundsAlignH: 'center',
          });
        levelTxt.setTextBounds(0, 19, 100, 8);
        
        if(typeof nextLevel !== 'undefined'){
            var woodImg = this.game.add.image(10, 30, 'resources_icons', 0);
            var woodPrice = this.game.add.text(30, 30, nextLevel.wood, {
                fontSize: 12,
                fill: "#ffffff",
                stroke: "#1e1e1e",
                strokeThickness: 1,
                wordWrap: true,
                wordWrapWidth: 200
            });

            var stoneImg = this.game.add.image(50, 30, 'resources_icons', 1);
            var stonePrice = this.game.add.text(70, 30, nextLevel.stone, {
                fontSize: 12,
                fill: "#ffffff",
                stroke: "#1e1e1e",
                strokeThickness: 1,
                wordWrap: true,
                wordWrapWidth: 200
            });
            
            tooltipBlock.add(woodImg);
            tooltipBlock.add(woodPrice);
            tooltipBlock.add(stoneImg);
            tooltipBlock.add(stonePrice);
        } else {
            var maximalLevel = this.game.add.text(0, 0, "You've reach\nmaximal level", {
                fontSize: 12,
                fill: "#FF0000",
                stroke: "#ff0000",
                strokeThickness: 1,
                wordWrap: true,
                wordWrapWidth: 200,
                boundsAlignH: 'center',
            });
            maximalLevel.lineSpacing = -10;
            maximalLevel.setTextBounds(0, 30, 100, 8);
            tooltipBlock.add(maximalLevel);
        }
        if(this.item.weapon || this.item.tool){
            if(typeof actualLevel !== 'undefined'){
                var dmgText = this.game.add.text(0, 0, "DMG now: " + actualLevel.damage, {
                    fontSize: 10,
                    fill: "#ffffff",
                    stroke: "#1e1e1e",
                    strokeThickness: 1,
                    wordWrap: true,
                    wordWrapWidth: 200,
                    boundsAlignH: 'center',
                });
                dmgText.setTextBounds(0, 60, 100, 8);
                tooltipBlock.add(dmgText);
            } else {
                var notOpenedYet = this.game.add.text(0, 0, "Locked", {
                    fontSize: 10,
                    fill: "#ff0000",
                    stroke: "#ff0000",
                    strokeThickness: 1,
                    wordWrap: true,
                    wordWrapWidth: 200,
                    boundsAlignH: 'center',
                });
                notOpenedYet.setTextBounds(0, 60, 100, 8);
                tooltipBlock.add(notOpenedYet);
            }
            
            if(typeof nextLevel !== 'undefined'){
                var dmgText2 = this.game.add.text(0, 0, "DMG next: " + nextLevel.damage, {
                    fontSize: 10,
                    fill: "#ffffff",
                    stroke: "#1e1e1e",
                    strokeThickness: 1,
                    wordWrap: true,
                    wordWrapWidth: 200,
                    boundsAlignH: 'center',
                });
                dmgText2.setTextBounds(0, 45, 100, 8);
                tooltipBlock.add(dmgText2);
            }
        }
        
        tooltipBlock.add(title);
        tooltipBlock.add(levelTxt);
        
        this.tooltip = new Phasetips(this.game, {
            targetObject: this.cover,
            context: tooltipBlock,
            strokeColor: 0x333333,
            width: 100,
            height: 150,
            position: "top",
            positionOffset: 120,
            animationDelay: 1,
            x: this.x - 45,
            y: this.y - 140,
            fixedToCamera: true
        });
    }
    
    destroy(){
        super.destroy();
        this.tooltip.destroy();
    }
       
    
    
    
}