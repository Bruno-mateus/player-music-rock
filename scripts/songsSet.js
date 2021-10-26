import {secondsToMinutes} from './utils.js'

export default {
    set(){
        this.cover= document.querySelector(".card-image");
        this.title= document.querySelector(".title");
        this.artist= document.querySelector(".artist");
        this.playPause=document.querySelector("#play-pause")
        this.mute=document.querySelector("#mute")
        this.volume=document.querySelector("#vol-control")
        this.seekbar=document.querySelector("#seekbar")
        this.totalDuration=document.querySelector("#total-duration")
        this.currentDuration=document.querySelector("#current-duration")
        this.nextMusic=document.querySelector("#next")
        this.previousMusic=document.querySelector("#previous")
    },
    songElement(song){
        this.song= new Audio(song)
    },
    actions(){
        
        this.song.ontimeupdate=()=> this.timeUpdate();
        this.song.onended = ()=>this.next();
        this.playPause.onclick=()=> this.togglePlayPause();
        this.nextMusic.onclick=()=>this.NextMusic();
        this.previousMusic.onclick=()=>this.PreviousMusic();
        this.mute.onclick=()=> this.toggleMute();
        this.volume.oninput=()=> this.setVolume(this.volume.value);
        this.volume.onchange=()=> this.setVolume(this.volume.value);
        this.seekbar.oninput=()=> this.setSeek(this.seekbar.value);
        this.seekbar.onchange=()=> this.setSeek(this.seekbar.value);
        this.seekbar.max = this.song.duration;
        this.totalDuration.innerText= secondsToMinutes(this.song.duration);

    }
}