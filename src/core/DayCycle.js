import Phaser from 'phaser';

export default class {
    constructor (game) {
        this.game = game;
        
        this.dayLength = 120;
        this.nightLength = this.dayLength / 2;
        
        this.currentTime = 0;
        this.day = 1;
        
        
        this.onNextDay = new Phaser.Signal();
        this.onNightCome = new Phaser.Signal();
        this.onDayCome = new Phaser.Signal();
        this.onChangeTime = new Phaser.Signal();
        
        this._isDayCome = false;
        this._isNightCome = false;
        
        this._tickTack();
        this.mainTimer = this.game.time.events.loop(Phaser.Timer.SECOND, this._tickTack, this);
    }
    
    _tickTack(){
        this.currentTime++;
        
        this.onChangeTime.dispatch({
            current: this.getTime(),
            max: this.dayLength,
        });
        
        if(this.currentTime >= this.dayLength){
            this._nextDayCome();
        }
        
        if(this.isNight()){
            this._nightCome();
        } else {
            this._dayCome();
        }
    }
    
    getTime(){
        return this.currentTime;
    }
        
    getDay(){
        return this.day;
    }
           
    isNight(){
        return (this.getTime() >= this.nightLength);
    }
    
    isDay(){
        return (this.getTime() < this.nightLength);
    }
    
    _nextDayCome(){
        this.onNextDay.dispatch();
        this.day++;
        this.currentTime = 0;
        this._isDayCome = false;
        this._isNightCome = false;
        console.log('Next day come');
    }
    
    _nightCome(){
        if(!this._isNightCome){
            this.onNightCome.dispatch();
            this._isNightCome = true;
            console.log('Night come');
            try{
                this.game.ui.setStatus('Night come');
            }catch(e){};
        }
    }
    
    _dayCome(){
        if(!this._isDayCome){
            this.onDayCome.dispatch();
            this._isDayCome = true;
            console.log('Day come');
            try{
                this.game.ui.setStatus('Day come');
            }catch(e){};
        }
    }
}
