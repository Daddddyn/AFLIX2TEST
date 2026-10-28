// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and tabs
            navLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}Tab`).classList.add('active');
        });
    });
    
    // Initialize the app
    initializeApp();
});

// Initialize the application
function initializeApp() {
    // Load recently watched items
    loadRecentlyWatched();
    
    // Load featured content
    loadFeaturedContent();
    
    // Set up search functionality
    setupSearch();
    
    // Set up filter buttons
    setupFilters();
}

// Load recently watched items from localStorage
function loadRecentlyWatched() {
    const recentlyWatched = storageManager.loadRecentlyWatched();
    const container = document.getElementById('recentlyWatchedContainer');
    
    if (recentlyWatched.length === 0) {
        document.getElementById('recentlyWatchedSection').style.display = 'none';
        return;
    }
    
    container.innerHTML = '';
    
    recentlyWatched.slice(0, 10).forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'recently-watched-item';
        itemElement.innerHTML = `
            <img src="${item.poster}" alt="${item.title}">
            <div class="item-title">${item.title}</div>
        `;
        
        itemElement.addEventListener('click', () => {
            // Play the movie/show
            playContent(item);
        });
        
        container.appendChild(itemElement);
    });
}

// Load featured content
function loadFeaturedContent() {
    // In a real app, this would fetch from TMDB API
    // For now, we'll just show placeholder content
    
    const featuredMoviesRow = document.getElementById('featuredMoviesRow');
    const popularMoviesRow = document.getElementById('popularMoviesRow');
    const popularTVRow = document.getElementById('popularTVRow');
    
    // Generate placeholder content for demonstration
    generatePlaceholderContent(featuredMoviesRow, 5);
    generatePlaceholderContent(popularMoviesRow, 10);
    generatePlaceholderContent(popularTVRow, 10);
}

// Generate placeholder content for demonstration
function generatePlaceholderContent(container, count) {
    container.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const card = document.createElement('div');
        card.className = 'content-card';
        card.innerHTML = `
            <img src="https://placehold.co/180x270/1f1f1f/FFFFFF?text=Movie+${i+1}" alt="Movie ${i+1}">
            <div class="card-info">
                <div class="card-title">Movie Title ${i+1}</div>
                <div class="card-year">2024</div>
                <div class="card-rating">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <span>8.5</span>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            // In a real app, this would fetch movie details and play it
            const content = {
                id: i + 1,
                title: `Movie Title ${i+1}`,
                type: 'movie',
                poster: `https://placehold.co/180x270/1f1f1f/FFFFFF?text=Movie+${i+1}`
            };
            playContent(content);
        });
        
        container.appendChild(card);
    }
}

// Set up search functionality
function setupSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const searchSubmitBtn = document.getElementById('searchSubmitBtn');
    
    searchBtn.addEventListener('click', function() {
        document.getElementById('searchTab').classList.add('active');
        document.getElementById('homeTab').classList.remove('active');
        document.querySelector('.nav-link[data-tab="search"]').classList.add('active');
        searchInput.focus();
    });
    
    searchSubmitBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Perform search
function performSearch() {
    const query = document.getElementById('searchInput').value.trim();
    
    if (!query) return;
    
    // In a real app, this would fetch from TMDB API
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '<p>Searching for "' + query + '"...</p>';
    
    // Simulate search results
    setTimeout(() => {
        resultsContainer.innerHTML = '';
        
        // Generate mock search results
        for (let i = 0; i < 8; i++) {
            const result = document.createElement('div');
            result.className = 'content-card';
            result.innerHTML = `
                <img src="https://placehold.co/180x270/1f1f1f/FFFFFF?text=Result+${i+1}" alt="Search Result ${i+1}">
                <div class="card-info">
                    <div class="card-title">Search Result ${i+1}</div>
                    <div class="card-year">2024</div>
                </div>
            `;
            
            result.addEventListener('click', () => {
                const content = {
                    id: i + 1,
                    title: `Search Result ${i+1}`,
                    type: 'movie',
                    poster: `https://placehold.co/180x270/1f1f1f/FFFFFF?text=Result+${i+1}`
                };
                playContent(content);
            });
            
            resultsContainer.appendChild(result);
        }
    }, 1000);
}

// Set up filter buttons
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons in this group
            const parent = this.parentElement;
            parent.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // In a real app, this would filter content based on the selected category
        });
    });
}

// Play content function (placeholder)
function playContent(content) {
    // Save to recently watched
    saveToRecentlyWatched(content);
    
    // Show player modal
    showPlayerModal(content);
}

// Save content to recently watched
function saveToRecentlyWatched(content) {
    storageManager.addToRecentlyWatched(content);
    loadRecentlyWatched();
}

// Show player modal
function showPlayerModal(content) {
    const modal = document.getElementById('playerModal');
    const titleElement = document.getElementById('playerTitle');
    
    titleElement.textContent = content.title;
    
    // In a real app, this would load the video player with servers
    modal.classList.add('active');
    
    // Close button event
    document.getElementById('closePlayer').addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // Close when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Initialize service worker for PWA support
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('SW registered: ', registration);
                })
                .catch(function(error) {
                    console.log('SW registration failed: ', error);
                });
        });
    }
}

// Initialize PWA features
initServiceWorker();