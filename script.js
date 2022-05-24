// select all elements in HTML page and assigning them
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// global variables
let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
    {
        name: "Cuteeee",
        artist: "Qt",
        image: "wallpaperflare.com_owl_wallpaper1.jpg",
        path: "Cuteeeeeeeeeeee_WhatsApp2022-04-29 at 11.18.11 PM.ogg",
    },
];

// -------------------------------Loading new track from the trackList----------------------------

function loadTrack(track_index){
    // clears the previous seek timer
    clearInterval(updateTimer);
    resetValues();

    // load new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();

//    update details of the track
    track_art.style.backgroundImage = "url("+ track_list[track_index].image +")";
    track_name.textContent = track_list[track_index].name != null ? track_list[track_index].name : "Unknown";
    track_artist.textContent = track_list[track_index].artist != null ? track_list[track_index].artist : "Unknown";
    now_playing.textContent = "PLAYING " + (track_index+1) + " OF " + track_list.length;

    // Setting interval of 1000ms for updating seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    // play next track if the curr finishes using 'ended' event
    curr_track.addEventListener("ended", nextTrack);

    // applying random background color for each song
    random_bg_color();
}

function random_bg_color(){
    let red = Math.floor(Math.random()*256)+64;
    let green = Math.floor(Math.random()*256)+64;
    let blue = Math.floor(Math.random()*256)+64;

    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

    document.body.style.background = bgColor;
}

function resetValues(){
    curr_time.textContent = "00.00";
    total_duration.textContent = "00.00";
    seek_slider.value = 0;
}
// ----------------------------Configuring the player buttons --------------------------------------

function playpauseTrack(){
    if(! isPlaying)
        playTrack();
    else
        pauseTrack();
}

function playTrack(){
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack(){
    if(track_index < track_list.length-1)
        track_index += 1;
    else
        track_index = 0;

    loadTrack(track_index);
    playTrack();
}

function prevTrack(){
    if(track_index > 0)
        track_index -=1;
    else
        track_index = track_list.length-1;

    loadTrack(track_index);
    playTrack();
}

// --------------------------------Controlling the Sliders portion------------------------------

function seekTo(){
    let seekto = curr_track.duration * seek_slider.value / 100;
    curr_track.currentTime = seekto;
}

function setVolume(){
    curr_track.volume = volume_slider.value/100;
}

function seekUpdate(){
    let seekPosition = 0;

    if(! isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * 100/curr_track.duration;
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime/60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes*60);
        let durationMinutes = Math.floor(curr_track.duration/60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes*60);

        // Adding zero at first in case time is less than 10
        if(currentSeconds < 10)
            currentSeconds = "0" + currentSeconds;
        if(currentMinutes < 10)
            currentMinutes = "0" + currentMinutes;
        durationSeconds = durationSeconds < 10 ? "0" + durationSeconds : durationSeconds;
        durationMinutes = durationMinutes < 10 ? "0" + durationMinutes : durationMinutes;

        // Displaying the updated duration
        curr_time.textContent = currentMinutes +":"+ currentSeconds;
        total_duration.textContent = durationMinutes +":"+ durationSeconds;
    }
}

// load the first track of the track list
loadTrack(track_index);