const apiKey = "440320fe1f97492ea6dfdbf3278492f2"; 
const searchInput = document.getElementById("searchInput");


function showSection(id) {
  document.querySelectorAll(".news-section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}


document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.getElementById("theme-toggle").textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});


async function fetchNews(topic, containerId) {
  try {
    const res = await fetch(`https://newsapi.org/v2/everything?q=${topic}&sortBy=publishedAt&apiKey=${apiKey}`);
    const data = await res.json();
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (data.articles && data.articles.length > 0) {
      data.articles.slice(0, 16).forEach(n => {
        container.innerHTML += `
          <div class="card">
            <img src="${n.urlToImage || 'https://via.placeholder.com/300'}" alt="news">
            <div class="card-content">
              <h3>${n.title}</h3>
              <p>${n.description || 'No description available.'}</p>
              <a href="${n.url}" target="_blank">Read More</a>
            </div>
          </div>
        `;
      });
    } else {
      container.innerHTML = "<p>No news found.</p>";
    }
  } catch (err) {
    console.error("Error fetching news:", err);
  }
}

// Load default news
function loadAllNews() {
  fetchNews("latest", "latest-news");
  fetchNews("today", "today-news");
  fetchNews("tomorrow", "tomorrow-news");
  fetchNews("yesterday", "yesterday-news");
}
loadAllNews();

// Search functionality
function searchNews() {
  const topic = searchInput.value.trim();
  if (topic) fetchNews(topic, "main");
}


function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}

