import Phaser from 'phaser';
import { centerGameObjects } from '../utils';

export default class extends Phaser.State {
    init() {}

    preload() {
        this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
        this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
        centerGameObjects([this.loaderBg, this.loaderBar]);

        this.load.setPreloadSprite(this.loaderBar);
        //
        // load your assets
        //
        
        // entity
        this.load.image('fire', 'assets/entity/fire.png');
        this.load.image('player_shadow', 'assets/entity/player_shadow.png');
        
        this.game.load.spritesheet('stone', 'assets/entity/stone.png', 128, 128);
        this.game.load.spritesheet('tree', 'assets/entity/tree.png', 192, 280);
        this.game.load.spritesheet('bush', 'assets/entity/bush.png', 76, 60);
        this.game.load.spritesheet('campfire', 'assets/entity/campfire.png', 128, 128);
        this.game.load.spritesheet('fire_animation', 'assets/anims/fire.png', 78, 156);

        
        
        // player animation
        this.game.load.spritesheet('player_person', 'assets/anims/player_person.png', 128, 128);
        this.game.load.spritesheet('player_sword', 'assets/anims/player_sword.png', 128, 128);
        this.game.load.spritesheet('player_wood_axe', 'assets/anims/player_wood_axe.png', 128, 128);
        this.game.load.spritesheet('player_battle_axe', 'assets/anims/player_battle_axe.png', 128, 128);
        this.game.load.spritesheet('player_knife', 'assets/anims/player_knife.png', 128, 128);
        
        // UI
        this.load.spritesheet('resources_icons', 'assets/ui/resources_icons.png', 16, 16);
        this.load.spritesheet('invetory_slot', 'assets/ui/invetory_slot.png', 40, 40);
        this.load.image('plus', 'assets/ui/plus.png');
        this.load.image('bg', 'assets/ui/bg.jpg');
        this.load.image('bar', 'assets/ui/bar.png');
        this.load.image('hpBar', 'assets/ui/hpBar.png');
        this.load.spritesheet('buttons', 'assets/ui/buttons.png', 151, 60);
        this.load.spritesheet('inventory', 'assets/ui/inventory.png', 75, 59);
        this.load.spritesheet('barIcons', 'assets/ui/barIcons.png', 32, 32);
        this.load.spritesheet('eat_button', 'assets/ui/eat_button.png', 151, 59);

        
        // textures
        this.load.image('grass', 'assets/textures/grass2.png');
        
        // audio
        
        this.game.load.audio('tree', 'assets/sounds/tree.wav');
        this.game.load.audio('stone', 'assets/sounds/stone.wav');
        this.game.load.audio('bush', 'assets/sounds/bush.wav');
        this.game.load.audio('eat', 'assets/sounds/eat.wav');
        
    }

    create () {
        this.state.start('MainMenu');
    }
}
