import Phaser from 'phaser';

export default class extends Phaser.State {
    init() {}

    preload() {}

    create() {
        var bmd = this.game.add.bitmapData(window.innerWidth, window.innerHeight);
        bmd.fill(0, 0, 0, 255);
        var blackScreen = this.game.add.sprite(0, 0, bmd);
        
        
        var bmd = this.game.add.bitmapData(window.innerWidth, window.innerHeight);
        bmd.fill(65, 0, 0, 255);
        var redScreen = this.game.add.sprite(0, 0, bmd);
        redScreen.alpha = 0.0;
        this.game.add.tween(redScreen).to({alpha: 1}, 3000, Phaser.Easing.Linear.None, true);
        
        this.game.time.events.add(3000, function(){
            var endText = 'You your DEAD!';
            var restartButtonText = this.game.add.text(this.game.width / 2, this.game.height / 2 - 150, endText, {fill: '#ffcc86', font: '72px Consolas, Arial'});
            restartButtonText.anchor.setTo(0.5);
            restartButtonText.alpha = 0;
            
            var restartButton = this.game.add.button(this.game.width / 2, this.game.height / 2, 'buttons', function(){
                this.game.state.start("Game");
            }, this, 0, 0, 1);
            restartButton.anchor.setTo(0.5);
            restartButton.alpha = 0;
            
//            
            var creditText = this.game.add.text(this.game.width / 2, this.game.height - 15, 'Developed for Ludum Dare 39 by Vladimír Novák', {fill: '#ffcc86', font: '20px Consolas, Arial'});
            creditText.anchor.setTo(0.5);
            creditText.alpha = 0;
            
            this.game.add.tween(restartButton).to({alpha: 1}, 1500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(restartButtonText).to({alpha: 1}, 1500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(creditText).to({alpha: 1}, 1500, Phaser.Easing.Linear.None, true);
        }, this); 
    }
}
