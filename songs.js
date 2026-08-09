// Song library. Each entry: { title, artist, language, audioSrc, imageSrc }
// language must be one of: hindi, english, punjabi, bhojpuri, maithili
//
// To add more songs:
// 1. Drop the mp3 in media/ (or a media/<language>/ subfolder) and a cover image alongside it.
// 2. Add an entry below with the correct language tag.
// See README.md for the full guide.

const SONGS = [
  { title: "Duniya", artist: "Akhil, Dhvani Bhanushali", language: "hindi", audioSrc: "media/10.mp3", imageSrc: "media/10.jpg" },
  { title: "Lagdi Lahore Di", artist: "Guru Randhawa, Tulsi Kumar", language: "punjabi", audioSrc: "media/11.mp3", imageSrc: "media/11.jpg" },
  { title: "Putt Jatt Da", artist: "Diljit Dosanjh", language: "punjabi", audioSrc: "media/12.mp3", imageSrc: "media/12.jpg" },
  { title: "Baarishein", artist: "Atif Aslam", language: "hindi", audioSrc: "media/13.mp3", imageSrc: "media/13.jpg" },
  { title: "Vaaste", artist: "Dhvani Bhanushali, Nikhil D'Souza", language: "hindi", audioSrc: "media/14.mp3", imageSrc: "media/14.jpg" },
  { title: "Lut Gaye", artist: "Jubin Nautiyal", language: "hindi", audioSrc: "media/15.mp3", imageSrc: "media/15.jpg" },
  { title: "Meri Zindagi Hai Tu", artist: "Jubin Nautiyal", language: "hindi", audioSrc: "media/16.mp3", imageSrc: "media/16.jpg" },
  { title: "Batao Yaad Hai Tumko", artist: "Stebin Ben", language: "hindi", audioSrc: "media/17.mp3", imageSrc: "media/17.jpg" },
  { title: "Pasoori", artist: "Ali Sethi, Shae Gill", language: "punjabi", audioSrc: "media/18.mp3", imageSrc: "media/18.jpg" },
  { title: "Insane", artist: "Karan Aujla", language: "punjabi", audioSrc: "media/19.mp3", imageSrc: "media/19.jpg" },
  { title: "On My Way", artist: "Alan Walker, Sabrina Carpenter, Farruko", language: "english", audioSrc: "media/1.mp3", imageSrc: "media/1.jpg" },
  { title: "Faded", artist: "Alan Walker", language: "english", audioSrc: "media/2.mp3", imageSrc: "media/2.jpg" },
  { title: "Cartoon", artist: "Jass Manak", language: "punjabi", audioSrc: "media/3.mp3", imageSrc: "media/3.jpg" },
  { title: "Warriko", artist: "Various", language: "punjabi", audioSrc: "media/4.mp3", imageSrc: "media/4.jpg" },
  { title: "Looking For Me", artist: "Paul Woolford, Diplo, Kareen Lomax", language: "english", audioSrc: "media/5.mp3", imageSrc: "media/5.jpg" },
  { title: "Chocolate", artist: "Jubin Nautiyal", language: "hindi", audioSrc: "media/6.mp3", imageSrc: "media/6.jpg" },
  { title: "Tamasha", artist: "Various", language: "hindi", audioSrc: "media/7.mp3", imageSrc: "media/7.jpg" },
  { title: "Sanak", artist: "Various", language: "hindi", audioSrc: "media/8.mp3", imageSrc: "media/8.jpg" },
  { title: "Dilbar", artist: "Neha Kakkar, Ikka", language: "hindi", audioSrc: "media/9.mp3", imageSrc: "media/9.jpg" },
  { title: "Maan Meri Jaan", artist: "King", language: "hindi", audioSrc: "media/20.mp3", imageSrc: "media/20.jpeg" },
  { title: "Tu Hai To Mujhe Fir Aur Kya Chahiye", artist: "Various", language: "hindi", audioSrc: "media/21.mp3", imageSrc: "media/21.jpeg" },
  { title: "Hanuman Chalisa", artist: "Devotional", language: "hindi", audioSrc: "media/22.mp3", imageSrc: "media/22.jpg" },

  // Royalty-free instrumentals — Kevin MacLeod (incompetech.com), CC BY 4.0.
  { title: "Carefree", artist: "Kevin MacLeod", language: "english", audioSrc: "media/free/carefree.mp3", imageSrc: "media/free/carefree.svg" },
  { title: "Wallpaper", artist: "Kevin MacLeod", language: "english", audioSrc: "media/free/wallpaper.mp3", imageSrc: "media/free/wallpaper.svg" },
  { title: "Life of Riley", artist: "Kevin MacLeod", language: "english", audioSrc: "media/free/life-of-riley.mp3", imageSrc: "media/free/life-of-riley.svg" },
  { title: "Monkeys Spinning Monkeys", artist: "Kevin MacLeod", language: "english", audioSrc: "media/free/monkeys-spinning-monkeys.mp3", imageSrc: "media/free/monkeys-spinning-monkeys.svg" },
  { title: "Bass Walker", artist: "Kevin MacLeod", language: "english", audioSrc: "media/free/bass-walker.mp3", imageSrc: "media/free/bass-walker.svg" },
  { title: "Local Forecast - Elevator", artist: "Kevin MacLeod", language: "english", audioSrc: "media/free/local-forecast-elevator.mp3", imageSrc: "media/free/local-forecast-elevator.svg" },
  { title: "Gymnopedie No. 1", artist: "Kevin MacLeod", language: "english", audioSrc: "media/free/gymnopedie-no-1.mp3", imageSrc: "media/free/gymnopedie-no-1.svg" },
  { title: "Deliberate Thought", artist: "Kevin MacLeod", language: "english", audioSrc: "media/free/deliberate-thought.mp3", imageSrc: "media/free/deliberate-thought.svg" },
  { title: "Ossuary 6 - Air", artist: "Kevin MacLeod", language: "english", audioSrc: "media/free/ossuary-6-air.mp3", imageSrc: "media/free/ossuary-6-air.svg" },
  { title: "News Theme", artist: "Kevin MacLeod", language: "english", audioSrc: "media/free/news-theme.mp3", imageSrc: "media/free/news-theme.svg" },
  { title: "Sneaky Snitch", artist: "Kevin MacLeod", language: "english", audioSrc: "media/free/sneaky-snitch.mp3", imageSrc: "media/free/sneaky-snitch.svg" },
  { title: "Fluffing a Duck", artist: "Kevin MacLeod", language: "english", audioSrc: "media/free/fluffing-a-duck.mp3", imageSrc: "media/free/fluffing-a-duck.svg" },
];

const LANGUAGE_LABELS = {
  all: "All",
  hindi: "Hindi",
  english: "English",
  punjabi: "Punjabi",
  bhojpuri: "Bhojpuri",
  maithili: "Maithili",
};
