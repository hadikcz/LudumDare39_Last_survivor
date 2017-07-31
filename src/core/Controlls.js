import Phaser from 'phaser';

export default class {
    constructor (game, player) {
        this.game = game;
        this.player = player;
        
        this._canAttack = true;
    }

    update () {        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.W) ||
          this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            this.player.body.velocity.y = -this.player.movementVelocity;
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.S) ||
          this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            this.player.body.velocity.y = this.player.movementVelocity;
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.A) ||
          this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            this.player.body.velocity.x = -this.player.movementVelocity;
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.D) ||
          this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            this.player.body.velocity.x = this.player.movementVelocity;
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            this.attack();
        }
    }
    
    attack(){
        if(this._canAttack && !this.player.isMoving()){
            this._canAttack = false;
            this.player.attack();
            this.game.time.events.add(this.player.refireRate, function(){
                this._canAttack = true;
            }, this);
        }
        
    }
}
