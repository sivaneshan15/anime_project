const arrows= document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".main-list");

arrows.forEach((arrow,i)=>{
    const itemnumber= movieLists[i].querySelectorAll("img").length;
    const itemsPerClick=4;
    let clickcounter = 0;
arrow.addEventListener("click",()=>{
    clickcounter++;
     const maxClicks = Math.ceil(itemnumber / itemsPerClick) - 1;
   if (clickcounter <= maxClicks) {
      movieLists[i].style.transform = `translateX(${
        -350 * clickcounter
      }px)`;  
    }

else{
    movieLists[i].style.transform="translateX(0)"
    clickcounter=0;
}
    
})
})

// toggle logic
const ball = document.querySelector(".toggle-ball");
const toggle = document.querySelector(".toggle");
const icon = document.querySelector(".toggle-icon");

const items = document.querySelectorAll(
  ".container, .movie-list-item-desc, .movie-list-title, .navbar-container, .search-link i"
);

ball.addEventListener("click", () => {
  items.forEach(item => item.classList.toggle("active"));

  // Toggle ball and toggle
  ball.classList.toggle("active");
  toggle.classList.toggle("active");

  // Toggle icon if it exists
  if (icon) icon.classList.toggle("active");
});


// profilePopup
const profilePic = document.querySelector(".profile-pic");
const profilePopup = document.querySelector(".profile-popup");

profilePic.addEventListener("click", () => {
  profilePopup.classList.toggle("show");
});

// Optional: Hide popup when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".profile-container")) {
    profilePopup.classList.remove("show");
  }
});



const animePopup = document.getElementById("animePopup");
const popupImage = document.getElementById("popupImage");
const popupTitle = document.getElementById("popupTitle");
const popupGenreYear = document.getElementById("popupGenreYear");
const popupDescription = document.getElementById("popupDescription");
const seasonBox = document.getElementById("seasonBox");
const episodeBox = document.getElementById("episodeBox");
const closePopup = document.getElementById("closePopup");

let animeList=[];

fetch("briefanime.json")
 .then(res => res.json())
 .then(data =>{
  animeList=data;
  setupClickEvents();
  setupFeaturedButtons();
 });

 function setupClickEvents(){
  const items=document.querySelectorAll(".movie-list-item");
  items.forEach(item=>{
    item.addEventListener("click",()=>{
      const id=item.getAttribute("data-id");
      const anime=animeList.find(a => a.id == id);
      if(anime)openPopup(anime);
      
    });
  });
 }

 function setupFeaturedButtons() {
  const featuredButton = document.querySelector(".featured-button");
  if (featuredButton) {
    featuredButton.addEventListener("click", () => {
      const anime = animeList.find((a) => a.id == 1);
      if (anime) openPopup(anime);
    });
  }

  const featuredButtontwo = document.querySelector(".featured-button-two");
  if (featuredButtontwo) {
    featuredButtontwo.addEventListener("click", () => {
      const anime = animeList.find((a) => a.id == 8);
      if (anime) openPopup(anime);
    });
  }

  const featuredButtonthree = document.querySelector(".featured-button-three");
  if (featuredButtonthree) {
    featuredButtonthree.addEventListener("click", () => {
      const anime = animeList.find((a) => a.id == 2);
      if (anime) openPopup(anime);
    });
  }
}
// Function to open popup with anime data
function openPopup(anime) {
  popupImage.src = anime.image;
  popupTitle.textContent = anime.name || anime.title;  // ✅ this was missing before
  popupGenreYear.textContent = `${anime.genre} • ${anime.year}`;
  popupDescription.textContent = anime.description;

  // Clear old season + episode buttons
  seasonBox.innerHTML = "";
  episodeBox.innerHTML = "";

  if (anime.seasons && anime.seasons.length > 0) {
    anime.seasons.forEach((seasonObj, index) => {
      const seasonBtn = document.createElement("button");
      seasonBtn.textContent = `Season ${seasonObj.season}`;
      seasonBtn.classList.add("season-btn");

      // Default active season
      if (index === 0) {
        seasonBtn.classList.add("active");
        loadEpisodes(seasonObj.episodes);
      }

      seasonBtn.addEventListener("click", () => {
        seasonBox.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
        seasonBtn.classList.add("active");
        loadEpisodes(seasonObj.episodes);
      });

      seasonBox.appendChild(seasonBtn);
    });
  }

  animePopup.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function loadEpisodes(count) {
  episodeBox.innerHTML = "";
  for (let i = 1; i <= count; i++) {
    const epBtn = document.createElement("button");
    epBtn.textContent = `Ep ${i}`;
    episodeBox.appendChild(epBtn);
  }
}

// Close popup
closePopup.addEventListener("click", () => {
  animePopup.style.display = "none";
  document.body.style.overflow = "auto";
});