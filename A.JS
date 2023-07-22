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
        audioSrc: "media/10.mp3",
        imageSrc: "media/10.jpg"
      },
      {
        title: "Lagdi Lahore Di",
        audioSrc: "media/11.mp3",
        imageSrc: "media/11.jpg"
      },
      {
        title: "Putt Jatt Da",
        audioSrc: "media/12.mp3",
        imageSrc: "media/12.jpg"
      },
      {
        title: "Baaeishein",
        audioSrc: "media/13.mp3",
        imageSrc: "media/13.jpg"
      },
      {
        title: "Vaaste",
        audioSrc: "media/14.mp3",
        imageSrc: "media/14.jpg"
      },
      {
        title: "Lut Gaye",
        audioSrc: "media/15.mp3",
        imageSrc: "media/15.jpg"
      },
      {
        title: "Meri Jindagi Hai Tu",
        audioSrc: "media/16.mp3",
        imageSrc: "media/16.jpg"
      },
      {
        title: "Batao Yaad Hai Tumko Wo Jab Dil Ko Churaya Tha",
        audioSrc: "media/17.mp3",
        imageSrc: "media/17.jpg"
      },
      {
        title: "Pasoori",
        audioSrc: "media/18.mp3",
        imageSrc: "media/18.jpg"
      },
      {
        title: "Insane",
        audioSrc: "media/19.mp3",
        imageSrc: "media/19.jpg"
      },
      {
        title: "On my way",
        audioSrc: "media/1.mp3",
        imageSrc: "media/1.jpg"
      },
      {
        title: "Faded",
        audioSrc: "media/2.mp3",
        imageSrc: "media/2.jpg"
      },
      {
        title: "Cartoon",
        audioSrc: "media/3.mp3",
        imageSrc: "media/3.jpg"
      },
      {
        title: "Warriko",
        audioSrc: "media/4.mp3",
        imageSrc: "media/4.jpg"
      },
      {
        title: "Looking For Me",
        audioSrc: "media/5.mp3",
        imageSrc: "media/5.jpg"
      },
      {
        title: "Chocolate",
        audioSrc: "media/6.mp3",
        imageSrc: "media/6.jpg"
      },
      {
        title: "Tamasha",
        audioSrc: "media/7.mp3",
        imageSrc: "media/7.jpg"
      },
      {
        title: "Sanak",
        audioSrc: "media/8.mp3",
        imageSrc: "media/8.jpg"
      },
      {
        title: "Dilbar",
        audioSrc: "media/9.mp3",
        imageSrc: "media/9.jpg"
      },
      {
        title: "Maan Meri Jaan",
        audioSrc: "media/20.mp3",
        imageSrc: "media/20.jpeg"
      },
      {
        title: "Tu Hai To Mujhe Fir Or Kya Chahiye",
        audioSrc: "media/21.mp3",
        imageSrc: "media/21.jpeg"
      },
      {
        title: "Hanuman Chalisa",
        audioSrc: "media/22.mp3",
        imageSrc: "media/22.jpg"
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
  
