import Phaser from 'phaser';

export default class extends Phaser.State {
    init() {}

    preload() {}

    create() {
        // for skip main menu, uncomment next line
//        this.state.start('Game');
        
        this.game.difficulty = 1;
        
        this.bg = this.game.add.image(0, 0, 'bg');
        
        this.gameName  = this.game.add.text(this.game.width / 2, 70, 'Last survivor', {fill: '#a30000', font: '72px Consolas, Arial'});
        this.gameName.anchor.setTo(0.5);
        this.gameName.stroke = "#4f0000";
        this.gameName.strokeThickness = 5;

        
        this.credits = this.game.add.text(this.game.width / 2, this.game.height - 15, 'Developed for Ludum Dare 39 by Vladimír Novák', {fill: '#ffcc86', font: '20px Consolas, Arial'});
        this.credits.anchor.setTo(0.5);

        this.buttonNormal = this.game.add.button(this.game.width / 2 - 80, this.game.height / 2 - 100, 'buttons', function(){
            this.game.difficulty = 1;
            this.start();
        }, this, 3, 2, 2);
        this.buttonNormal.anchor.setTo(0.5);
        
        
        this.buttonHard = this.game.add.button(this.game.width / 2 + 80, this.game.height / 2 - 100, 'buttons', function(){
            this.game.difficulty = 1.2;
            this.start();
        }, this, 5, 4, 4);
        this.buttonHard.anchor.setTo(0.5);
        
//        this.buttonTutorial = this.game.add.button(this.game.width / 2 , this.game.height / 2, 'buttons', this.start, this, 7, 6, 6);
//        this.buttonTutorial.anchor.setTo(0.5);
    }
    
    start(){
        this.buttonNormal.destroy();
        this.buttonHard.destroy();
//        this.buttonTutorial.destroy();
        this.credits.destroy();
        this.gameName.destroy();
        this.bg.destroy();
        this.state.start('Game');
        
    }
}
