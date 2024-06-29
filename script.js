console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio(); // Audio element without source initially

// Select elements from the DOM
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItemContainers = document.querySelector('.songItemContainer');

// Define the songs array
let songs = [
    { songName: "Dil Ibadat - K.K.", filePath: "songs/song1.mp3", coverPath: "cover1.jpg" },
    { songName: "Tum Kya Mile", filePath: "songs/song2.mp3", coverPath: "cover2.jpg" },
    { songName: "Perfect - Ed Sheeran", filePath: "songs/song3.mp3", coverPath: "cover3.jpg" },
    { songName: "Jadui - Jubin Nautiyal", filePath: "songs/song4.mp3", coverPath: "cover4.jpg" },
    { songName: "Zara Sa - K.K.", filePath: "songs/song5.mp3", coverPath: "cover5.jpg" },
    { songName: "Khali Salam Dua - Mohit Chauhan", filePath: "songs/song6.mp3", coverPath: "cover6.jpg" }
];

// Dynamically create song items
songs.forEach((song, index) => {
    let songItem = document.createElement('div');
    songItem.classList.add('songItem');
    songItem.innerHTML = `
        <img src="${song.coverPath}" alt="${index + 1}">
        <span class="songName">${song.songName}</span>
        <span class="songlistplay"><span class="timestamp">05:34 <i id="${index}" class="far songItemPlay fa-play-circle"></i></span></span>
    `;
    songItemContainers.appendChild(songItem);
});

// Function to handle play/pause
function togglePlayPause() {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
}

// Event listener for masterPlay button
masterPlay.addEventListener('click', togglePlayPause);

// Event listener for timeupdate to update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
});

// Event listener for myProgressBar to seek through the song
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});

// Function to reset play icons for song items
function resetSongItems() {
    let songItemPlays = document.querySelectorAll('.songItemPlay');
    songItemPlays.forEach(play => {
        play.classList.remove('fa-pause-circle');
        play.classList.add('fa-play-circle');
    });
}

// Event listeners for each song item play button
document.querySelectorAll('.songItemPlay').forEach(item => {
    item.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id);
        resetSongItems();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        songIndex = clickedIndex;
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        togglePlayPause();
    });
});

// Event listener for next button
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    togglePlayPause();
});

// Event listener for previous button
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    togglePlayPause();
});