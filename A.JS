document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById("audio-player");
    const playBtn = document.getElementById("play-btn");
    const pauseBtn = document.getElementById("pause-btn");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const loopBtn = document.getElementById("loop-btn");
    const playlist = document.querySelectorAll(".playlist li");
    const songImage = document.getElementById("song-image");
    const songTitle = document.getElementById("song-title");
    const progressBar = document.getElementById("progress-bar");
  
    let currentSongIndex = 0;
    let isPlaying = false;
  
    const songs = [
      {
        title: "Duniya",
        audioSrc: "10.mp3",
        imageSrc: "10.jpg"
      },
      {
        title: "Lagdi Lahore Di",
        audioSrc: "11.mp3",
        imageSrc: "11.jpg"
      },
      {
        title: "Putt Jatt Da",
        audioSrc: "12.mp3",
        imageSrc: "12.jpg"
      },
      {
        title: "Baaeishein",
        audioSrc: "13.mp3",
        imageSrc: "13.jpg"
      },
      {
        title: "Vaaste",
        audioSrc: "14.mp3",
        imageSrc: "14.jpg"
      },
      {
        title: "Lut Gaye",
        audioSrc: "15.mp3",
        imageSrc: "15.jpg"
      },
      {
        title: "Meri Jindagi Hai Tu",
        audioSrc: "16.mp3",
        imageSrc: "16.jpg"
      },
      {
        title: "Batao Yaad Hai Tumko Wo Jab Dil Ko Churaya Tha",
        audioSrc: "17.mp3",
        imageSrc: "17.jpg"
      },
      {
        title: "Pasoori",
        audioSrc: "18.mp3",
        imageSrc: "18.jpg"
      },
      {
        title: "Insane",
        audioSrc: "19.mp3",
        imageSrc: "19.jpg"
      },
      {
        title: "On my way",
        audioSrc: "1.mp3",
        imageSrc: "1.jpg"
      },
      {
        title: "Faded",
        audioSrc: "2.mp3",
        imageSrc: "2.jpg"
      },
      {
        title: "Cartoon",
        audioSrc: "3.mp3",
        imageSrc: "3.jpg"
      },
      {
        title: "Warriko",
        audioSrc: "4.mp3",
        imageSrc: "4.jpg"
      },
      {
        title: "Looking For Me",
        audioSrc: "5.mp3",
        imageSrc: "5.jpg"
      },
      {
        title: "Chocolate",
        audioSrc: "6.mp3",
        imageSrc: "6.jpg"
      },
      {
        title: "Tamasha",
        audioSrc: "7.mp3",
        imageSrc: "7.jpg"
      },
      {
        title: "Sanak",
        audioSrc: "8.mp3",
        imageSrc: "8.jpg"
      },
      {
        title: "Dilbar",
        audioSrc: "9.mp3",
        imageSrc: "9.jpg"
      },
      {
        title: "Maan Meri Jaan",
        audioSrc: "20.mp3",
        imageSrc: "20.jpeg"
      },
      {
        title: "Tu Hai To Mujhe Fir Or Kya Chahiye",
        audioSrc: "21.mp3",
        imageSrc: "21.jpeg"
      },
      {
        title: "Hanuman Chalisa",
        audioSrc: "22.mp3",
        imageSrc: "22.jpg"
      }
    ];
  
    function playSong(index) {
      if (isPlaying) {
        audioPlayer.pause();
      }
  
      audioPlayer.src = songs[index].audioSrc;
      songImage.src = songs[index].imageSrc;
      songTitle.textContent = songs[index].title;
      playlist.forEach(item => item.classList.remove("active"));
      playlist[index].classList.add("active");
      audioPlayer.play();
      isPlaying = true;
    }
  
    function playNextSong() {
      currentSongIndex = (currentSongIndex + 1) % songs.length;
      playSong(currentSongIndex);
    }
  
    function playPrevSong() {
      currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      playSong(currentSongIndex);
    }
  
    function toggleLoop() {
      audioPlayer.loop = !audioPlayer.loop;
      loopBtn.classList.toggle("active", audioPlayer.loop);
    }
const songProgress = document.querySelector(".song-progress");
songProgress.addEventListener("click", function (e) {
  const seekTime = (e.offsetX / this.clientWidth) * audioPlayer.duration;
  audioPlayer.currentTime = seekTime;
});

audioPlayer.addEventListener("timeupdate", function () {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    songProgress.value = progress;
  });
  
    playBtn.addEventListener("click", () => {
      audioPlayer.play();
      isPlaying = true;
    });
  
    pauseBtn.addEventListener("click", () => {
      audioPlayer.pause();
      isPlaying = false;
    });
  
    nextBtn.addEventListener("click", () => playNextSong());
  
    prevBtn.addEventListener("click", () => playPrevSong());
  
    loopBtn.addEventListener("click", () => toggleLoop());
  
    playlist.forEach((item, index) => {
      item.addEventListener("click", () => playSong(index));
    });
  
    // Play the first song by default
    //playSong(currentSongIndex);
  });
  