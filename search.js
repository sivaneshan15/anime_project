// document.addEventListener("DOMContentLoaded", () => {
//   const searchInput = document.getElementById("searchInput");
//   const resultsDiv = document.getElementById("results");
//   let animeList = [];

//   // Fetch data from anime.json
//   fetch("anime.json")
//     .then(response => response.json())
//     .then(data => {
//       animeList = data;
//     })
//     .catch(error => {
//       console.error("Error loading anime data:", error);
//       resultsDiv.innerHTML = "<p style='color:red;'>Failed to load anime data.</p>";
//     });

  
//   searchInput.addEventListener("input", () => {
//     const query = searchInput.value.toLowerCase();
//     const filtered = animeList.filter(anime =>
//       anime.title.toLowerCase().includes(query)
//     );
//     showResults(filtered);
//   });

//   // Show anime results
//   function showResults(animeArray) {
//     resultsDiv.innerHTML = "";

//     if (animeArray.length === 0) {
//       resultsDiv.innerHTML = "<p>No results found.</p>";
//       return;
//     }

//     animeArray.forEach(anime => {
//       const card = document.createElement("div");
//       card.className = "anime-card";

//       card.innerHTML = `
//         <img src="${anime.image}" alt="${anime.title}" />
//         <h3>${anime.title}</h3>
//         <p><strong>Description:</strong> ${anime.description || "No description available."}</p>
//         <p><strong>Episodes:</strong> ${anime.episodes || "N/A"}</p>
//         <p><strong>Seasons:</strong> ${anime.seasons || "N/A"}</p>
//         <p><strong>Genre:</strong> ${anime.genre || "N/A"}</p>
//         <p><strong>Year:</strong> ${anime.year || "N/A"}</p>
//       `;

//       resultsDiv.appendChild(card);
//     });
//   }
// });




// const animePopup = document.getElementById("animePopup");
// const popupImage = document.getElementById("popupImage");
// const popupTitle = document.getElementById("popupTitle");
// const popupGenreYear = document.getElementById("popupGenreYear");
// const popupDescription = document.getElementById("popupDescription");
// const seasonBox = document.getElementById("seasonBox");
// const episodeBox = document.getElementById("episodeBox");
// const closePopup = document.getElementById("closePopup");

// let animeList=[];

// fetch("briefanime.json")
//  .then(res => res.json())
//  .then(data =>{
//   animeList=data;
//   setupClickEvents();
//   setupFeaturedButtons();
//  });
//  function openPopup(anime) {
//   popupImage.src = anime.image;
//   popupTitle.textContent = anime.name || anime.title;  // ✅ this was missing before
//   popupGenreYear.textContent = `${anime.genre} • ${anime.year}`;
//   popupDescription.textContent = anime.description;

//   // Clear old season + episode buttons
//   seasonBox.innerHTML = "";
//   episodeBox.innerHTML = "";

//   if (anime.seasons && anime.seasons.length > 0) {
//     anime.seasons.forEach((seasonObj, index) => {
//       const seasonBtn = document.createElement("button");
//       seasonBtn.textContent = `Season ${seasonObj.season}`;
//       seasonBtn.classList.add("season-btn");

//       // Default active season
//       if (index === 0) {
//         seasonBtn.classList.add("active");
//         loadEpisodes(seasonObj.episodes);
//       }

//       seasonBtn.addEventListener("click", () => {
//         seasonBox.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
//         seasonBtn.classList.add("active");
//         loadEpisodes(seasonObj.episodes);
//       });

//       seasonBox.appendChild(seasonBtn);
//     });
//   }

//   animePopup.style.display = "flex";
//   document.body.style.overflow = "hidden";
// }

// function loadEpisodes(count) {
//   episodeBox.innerHTML = "";
//   for (let i = 1; i <= count; i++) {
//     const epBtn = document.createElement("button");
//     epBtn.textContent = `Ep ${i}`;
//     episodeBox.appendChild(epBtn);
//   }
// }

// // Close popup
// closePopup.addEventListener("click", () => {
//   animePopup.style.display = "none";
//   document.body.style.overflow = "auto";
// });



document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const resultsDiv = document.getElementById("results");

  let animeList = [];
  let briefAnimeList = [];

  // 1. Load both anime.json and briefanime.json
  Promise.all([
    fetch("anime.json").then(res => res.json()),
    fetch("briefanime.json").then(res => res.json())
  ])
  .then(([animeData, briefData]) => {
    animeList = animeData;
    briefAnimeList = briefData;
  })
  .catch(err => {
    console.error("Error loading data:", err);
    resultsDiv.innerHTML = "<p style='color:red;'>Failed to load data.</p>";
  });

  // 2. Handle input typing
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = animeList.filter(anime =>
      anime.title.toLowerCase().includes(query)
    );
    showResults(filtered);
  });

  // 3. Show results using anime.json
  function showResults(animeArray) {
    resultsDiv.innerHTML = "";

    if (animeArray.length === 0) {
      resultsDiv.innerHTML = "<p>No results found.</p>";
      return;
    }

    animeArray.forEach(anime => {
      const card = document.createElement("div");
      card.className = "anime-card";
      card.setAttribute("data-id", anime.id); // So we can link to briefAnime

      card.innerHTML = `
        <img src="${anime.image}" alt="${anime.title}" />
        <h3>${anime.title}</h3>
        <p><strong>Description:</strong> ${anime.description || "No description available."}</p>
        <p><strong>Episodes:</strong> ${anime.episodes || "N/A"}</p>
        <p><strong>Seasons:</strong> ${anime.seasons || "N/A"}</p>
        <p><strong>Genre:</strong> ${anime.genre || "N/A"}</p>
        <p><strong>Year:</strong> ${anime.year || "N/A"}</p>
      `;

      // Popup event on click using briefanime.json
      card.addEventListener("click", () => {
        const briefAnime = briefAnimeList.find(a => a.id == anime.id);
        if (briefAnime) {
          openPopup(briefAnime);
        } else {
          alert("Details not available for this anime.");
        }
      });

      resultsDiv.appendChild(card);
    });
  }

  // 4. Popup Logic (same as header.html)
  const animePopup = document.getElementById("animePopup");
  const popupImage = document.getElementById("popupImage");
  const popupTitle = document.getElementById("popupTitle");
  const popupGenreYear = document.getElementById("popupGenreYear");
  const popupDescription = document.getElementById("popupDescription");
  const seasonBox = document.getElementById("seasonBox");
  const episodeBox = document.getElementById("episodeBox");
  const closePopup = document.getElementById("closePopup");

  function openPopup(anime) {
    popupImage.src = anime.image;
    popupTitle.textContent = anime.name || anime.title;
    popupGenreYear.textContent = `${anime.genre} • ${anime.year}`;
    popupDescription.textContent = anime.description || "No description available.";

    seasonBox.innerHTML = "";
    episodeBox.innerHTML = "";

    if (anime.seasons && anime.seasons.length > 0) {
      anime.seasons.forEach((seasonObj, index) => {
        const seasonBtn = document.createElement("button");
        seasonBtn.textContent = `Season ${seasonObj.season}`;
        seasonBtn.classList.add("season-btn");

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

  closePopup.addEventListener("click", () => {
    animePopup.style.display = "none";
    document.body.style.overflow = "auto";
  });
});