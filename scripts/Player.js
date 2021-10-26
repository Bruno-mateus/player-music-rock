
import songs from "./data.js"
import {path,secondsToMinutes} from "./utils.js"
import songsSet from "./songsSet.js"  

export default {
    song__data:songs,
    currentSongs:{},
    currentPlaying:0,
    isPlaying:false,
    start(){
        songsSet.set.call(this);
        
         this.update();
   
    },
    play(){
        
        this.isPlaying = true;
        this.song.play();
        this.playPause.src = "./img/pause_black_24dp.svg"
       
        
    },
    next(){
        this.seekbar.value=0;
        this.currentPlaying++;
        
        if(this.currentPlaying === this.song__data.length) this.restart();
        this.update();
    
        this.play()
        
    },
    pause(){
        this.isPlaying=false;
        this.song.pause();
        this.playPause.src = "./img/play_arrow_black_24dp.svg"
    },
    NextMusic(){
        this.song.pause();
        this.song.currentTime = 0;
        this.seekbar.value=0;
        this.currentPlaying++;
        if(this.currentPlaying === this.song__data.length) this.restart();
        this.update();
        this.play();
    },
    PreviousMusic(){
        this.currentPlaying--; 
        if(this.currentPlaying < 0){this.currentPlaying=this.song__data.length-1};
        this.song.pause();
        this.song.currentTime = 0;
        this.seekbar.value=0;
        this.update();
        this.play()
    },
    togglePlayPause(){
        this.isPlaying?this.pause():this.play();
    },
    toggleMute(){
        this.song.muted = !this.song.muted;
        //muda o estado, se tiver true fica falsee vice-versa
        this.mute.innerText = this.song.muted?"volume_mute":"volume_up";
    },
    setVolume(value){
        this.song.volume = value/100;
        this.song.volume===0?this.mute.innerText="volume_mute":'';
        this.song.volume>0?this.mute.innerText="volume_down":'';
        this.song.volume>=0.5?this.mute.innerText="volume_up":'';
    },
    setSeek(value){
        this.song.currentTime=value;
    },
    timeUpdate(){
        this.seekbar.value=this.song.currentTime;
        this.currentDuration.innerText=secondsToMinutes(this.song.currentTime);
        
    },

    update(){
        this.currentSongs= this.song__data[this.currentPlaying];
        this.cover.style.background=`url('${path(this.currentSongs.cover)}') no-repeat center center/cover`;
        this.title.innerText = this.currentSongs.title;
        this.artist.innerText=this.currentSongs.artist;
        songsSet.songElement.call(this, path(this.currentSongs.file))
       
        this.song.onloadeddata=()=>{
            songsSet.actions.call(this)
        }

    },
    restart(){
        this.currentPlaying=0;
        this.update()
    }
};

