document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audio-player");
  const playBtn = document.getElementById("play-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const loopBtn = document.getElementById("loop-btn");
  const shuffleBtn = document.getElementById("shuffle-btn");
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const playIcon = document.getElementById("play-icon");
  const playlistEl = document.getElementById("playlist");
  const searchInput = document.getElementById("search-input");
  const filtersEl = document.getElementById("filters");
  const songImage = document.getElementById("song-image");
  const songTitle = document.getElementById("song-title");
  const songArtist = document.getElementById("song-artist");
  const artWrap = document.getElementById("art-wrap");
  const progressBar = document.getElementById("progress-bar");
  const timeCurrent = document.getElementById("time-current");
  const timeDuration = document.getElementById("time-duration");
  const volumeSlider = document.getElementById("volume-slider");

  let filteredSongs = SONGS.slice();
  let currentLanguage = "all";
  let currentSearch = "";
  let currentSongIndex = -1;
  let isPlaying = false;
  let isShuffled = false;

  // ---------- Theme ----------
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeIcon.className = theme === "light" ? "bi bi-moon-stars" : "bi bi-sun";
    localStorage.setItem("songify-theme", theme);
  }

  const savedTheme = localStorage.getItem("songify-theme") ||
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
  });

  // ---------- Filters ----------
  function renderFilters() {
    const languages = ["all", ...Object.keys(LANGUAGE_LABELS).filter((l) => l !== "all")];
    filtersEl.innerHTML = "";
    languages.forEach((lang) => {
      const btn = document.createElement("button");
      btn.className = "filter-chip" + (lang === currentLanguage ? " active" : "");
      btn.type = "button";
      btn.textContent = LANGUAGE_LABELS[lang];
      btn.addEventListener("click", () => {
        currentLanguage = lang;
        renderFilters();
        applyFilters();
      });
      filtersEl.appendChild(btn);
    });
  }

  function applyFilters() {
    const query = currentSearch.trim().toLowerCase();
    filteredSongs = SONGS.filter((song) => {
      const matchesLang = currentLanguage === "all" || song.language === currentLanguage;
      const matchesQuery =
        !query ||
        song.title.toLowerCase().includes(query) ||
        (song.artist || "").toLowerCase().includes(query);
      return matchesLang && matchesQuery;
    });
    renderPlaylist();
  }

  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    applyFilters();
  });

  // ---------- Playlist rendering ----------
  function renderPlaylist() {
    playlistEl.innerHTML = "";

    if (filteredSongs.length === 0) {
      const empty = document.createElement("li");
      empty.className = "empty-state";
      empty.textContent = "No songs match your search.";
      playlistEl.appendChild(empty);
      return;
    }

    filteredSongs.forEach((song) => {
      const globalIndex = SONGS.indexOf(song);
      const li = document.createElement("li");
      li.className = "playlist-item" + (globalIndex === currentSongIndex ? " active" : "");
      li.setAttribute("role", "button");
      li.setAttribute("tabindex", "0");

      const img = document.createElement("img");
      img.src = song.imageSrc;
      img.alt = "";

      const info = document.createElement("div");
      info.className = "track-info";
      const title = document.createElement("span");
      title.className = "track-title";
      title.textContent = song.title;
      const artist = document.createElement("span");
      artist.className = "track-artist";
      artist.textContent = song.artist || "";
      info.appendChild(title);
      info.appendChild(artist);

      const eq = document.createElement("span");
      eq.className = "track-eq";
      eq.innerHTML = "<span></span><span></span><span></span>";

      const lang = document.createElement("span");
      lang.className = "track-lang";
      lang.textContent = LANGUAGE_LABELS[song.language] || song.language;

      li.appendChild(img);
      li.appendChild(info);
      li.appendChild(eq);

      if (song.audioSrc.startsWith("media/free/")) {
        const cc = document.createElement("span");
        cc.className = "track-cc";
        cc.title = "Royalty-free (CC BY 4.0)";
        cc.innerHTML = '<i class="bi bi-creative-commons"></i>';
        li.appendChild(cc);
      }

      li.appendChild(lang);

      const play = () => playSong(globalIndex);
      li.addEventListener("click", play);
      li.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          play();
        }
      });

      playlistEl.appendChild(li);
    });
  }

  // ---------- Playback ----------
  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  function updatePlayButton() {
    playIcon.className = isPlaying ? "bi bi-pause-fill" : "bi bi-play-fill";
    playBtn.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
    artWrap.classList.toggle("playing", isPlaying);
  }

  function playSong(index) {
    const song = SONGS[index];
    if (!song) return;

    currentSongIndex = index;
    audioPlayer.src = song.audioSrc;
    songImage.src = song.imageSrc;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist || "";

    audioPlayer
      .play()
      .then(() => {
        isPlaying = true;
        updatePlayButton();
      })
      .catch(() => {
        isPlaying = false;
        updatePlayButton();
      });

    renderPlaylist();
    updateMediaSession(song);
  }

  function togglePlay() {
    if (currentSongIndex === -1) {
      if (filteredSongs.length > 0) playSong(SONGS.indexOf(filteredSongs[0]));
      return;
    }
    if (isPlaying) {
      audioPlayer.pause();
      isPlaying = false;
    } else {
      audioPlayer.play();
      isPlaying = true;
    }
    updatePlayButton();
  }

  function playNextSong() {
    if (filteredSongs.length === 0) return;
    if (isShuffled) {
      const randomSong = filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
      playSong(SONGS.indexOf(randomSong));
      return;
    }
    const currentFilteredIdx = filteredSongs.indexOf(SONGS[currentSongIndex]);
    const nextIdx = currentFilteredIdx === -1 ? 0 : (currentFilteredIdx + 1) % filteredSongs.length;
    playSong(SONGS.indexOf(filteredSongs[nextIdx]));
  }

  function playPrevSong() {
    if (filteredSongs.length === 0) return;
    const currentFilteredIdx = filteredSongs.indexOf(SONGS[currentSongIndex]);
    const prevIdx = currentFilteredIdx <= 0 ? filteredSongs.length - 1 : currentFilteredIdx - 1;
    playSong(SONGS.indexOf(filteredSongs[prevIdx]));
  }

  function toggleLoop() {
    audioPlayer.loop = !audioPlayer.loop;
    loopBtn.classList.toggle("active", audioPlayer.loop);
  }

  function toggleShuffle() {
    isShuffled = !isShuffled;
    shuffleBtn.classList.toggle("active", isShuffled);
  }

  // ---------- Progress & time ----------
  progressBar.addEventListener("input", () => {
    if (!audioPlayer.duration) return;
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
  });

  audioPlayer.addEventListener("timeupdate", () => {
    if (!audioPlayer.duration) return;
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    timeCurrent.textContent = formatTime(audioPlayer.currentTime);
  });

  audioPlayer.addEventListener("loadedmetadata", () => {
    timeDuration.textContent = formatTime(audioPlayer.duration);
  });

  audioPlayer.addEventListener("ended", () => {
    if (!audioPlayer.loop) playNextSong();
  });

  // ---------- Volume ----------
  const savedVolume = parseFloat(localStorage.getItem("songify-volume"));
  audioPlayer.volume = isNaN(savedVolume) ? 0.8 : savedVolume;
  volumeSlider.value = audioPlayer.volume;

  volumeSlider.addEventListener("input", () => {
    audioPlayer.volume = parseFloat(volumeSlider.value);
    localStorage.setItem("songify-volume", audioPlayer.volume);
  });

  // ---------- Media Session (OS-level controls) ----------
  function updateMediaSession(song) {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: song.title,
      artist: song.artist || "Songify",
      artwork: [{ src: song.imageSrc, sizes: "300x300", type: "image/jpeg" }],
    });
    navigator.mediaSession.setActionHandler("play", togglePlay);
    navigator.mediaSession.setActionHandler("pause", togglePlay);
    navigator.mediaSession.setActionHandler("previoustrack", playPrevSong);
    navigator.mediaSession.setActionHandler("nexttrack", playNextSong);
  }

  // ---------- Keyboard shortcuts ----------
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT") return;
    if (e.code === "Space") {
      e.preventDefault();
      togglePlay();
    } else if (e.code === "ArrowRight") {
      playNextSong();
    } else if (e.code === "ArrowLeft") {
      playPrevSong();
    }
  });

  // ---------- Wire up controls ----------
  playBtn.addEventListener("click", togglePlay);
  nextBtn.addEventListener("click", playNextSong);
  prevBtn.addEventListener("click", playPrevSong);
  loopBtn.addEventListener("click", toggleLoop);
  shuffleBtn.addEventListener("click", toggleShuffle);

  // ---------- Init ----------
  renderFilters();
  applyFilters();
});
