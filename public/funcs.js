'use strict';

let playa = function( trackid ){
	let track = document.getElementById(trackid);
	track.play();
}

function pause( trackid ){
	let track = document.getElementById(trackid);
	track.pause();
}

function stop( trackid ){
	let track = document.getElementById(trackid);
	track.pause();
	track.remove();
}

function setTime( trackid, time ){
	let track = document.getElementById(trackid);
	track.currentTime = time;
}

function setVolume( trackid, volume ){
	if(volume>1){
		volume = 1
	}
	let track = document.getElementById(trackid);
	track.volume = volume;
}

function mute( trackid ){
	let track = document.getElementById(trackid);
	if( track.muted )
		track.muted = false;
	else track.muted = true;
}

function tooglePlayRate( trackid ){
	let track = document.getElementById(trackid);
	if(track.playbackRate === 1 )
		track.playbackRate = 2;
	else track.playbackRate = 1;
}