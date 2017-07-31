import Phaser from 'phaser';
export default class extends Phaser.Image{
    constructor (game, x, y, text, color, strokeColor) {
        super(game, x, y, '');
        this.game = game;
        
        this.flyText = this.game.add.text(x, y, text, {fill: color, font: '15px Arial', boundsAlignH: 'left'});
        this.flyText.anchor.setTo(0.5);
        this.flyText.stroke = strokeColor;
        this.flyText.strokeThickness = 3;
        
        this.game.ui.customUIGroup.add(this);
        this.game.ui.customUIGroup.add(this.flyText);
        
        
        
        var range = 20;
        var tweenX = this.game.rnd.realInRange(-range, range);
        var tweenY = -100;
        var delay = this.game.rnd.integerInRange(2000, 2500);
        
        var tween = this.game.add.tween(this.flyText).to( {x: this.flyText.x + tweenX, y: this.flyText.y + tweenY, alpha: 0}, delay, "Linear", true, 0, -1);
        
        this.game.time.events.add(delay, function(){
            this.destroy();
        }, this);
    }
    
    destroy(){
        super.destroy();
        this.flyText.destroy();
    }
}
