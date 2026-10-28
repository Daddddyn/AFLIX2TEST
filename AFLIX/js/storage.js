// Local storage handling for recently watched items
class StorageManager {
    constructor() {
        this.storageKey = 'recentlyWatched';
    }

    // Load recently watched items from localStorage
    loadRecentlyWatched() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading recently watched:', error);
            return [];
        }
    }

    // Save recently watched items to localStorage
    saveRecentlyWatched(items) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(items));
        } catch (error) {
            console.error('Error saving recently watched:', error);
        }
    }

    // Add item to recently watched
    addToRecentlyWatched(item) {
        let items = this.loadRecentlyWatched();
        
        // Remove if already exists
        items = items.filter(existingItem => existingItem.id !== item.id);
        
        // Add to beginning of array
        items.unshift(item);
        
        // Keep only last 10 items
        if (items.length > 10) {
            items = items.slice(0, 10);
        }
        
        this.saveRecentlyWatched(items);
        return items;
    }

    // Clear recently watched history
    clearRecentlyWatched() {
        this.saveRecentlyWatched([]);
    }

    // Check if item exists in recently watched
    hasItem(itemId) {
        const items = this.loadRecentlyWatched();
        return items.some(item => item.id === itemId);
    }
}

// Create global storage manager instance
const storageManager = new StorageManager();

// Extend app.js functionality to use storage manager
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

function saveToRecentlyWatched(content) {
    storageManager.addToRecentlyWatched(content);
    loadRecentlyWatched();
}