// Player functionality for video streaming
class VideoPlayer {
    constructor() {
        this.videoElement = document.getElementById('playerVideo');
        this.servers = [
            { id: 'vidlink', name: 'Vidlink.pro', url: 'https://vidlink.pro' },
            { id: 'vidsrc', name: 'Vidsrc.to', url: 'https://vidsrc.to' },
            { id: 'stream', name: 'StreamTape', url: 'https://streamtape.com' },
            { id: 'mixdrop', name: 'MixDrop', url: 'https://mixdrop.co' },
            { id: 'dood', name: 'Dood', url: 'https://dood.watch' }
        ];
        this.setupEventListeners();
    }

    // Setup event listeners
    setupEventListeners() {
        // Close button
        document.getElementById('closePlayer').addEventListener('click', () => {
            this.closePlayer();
        });
        
        // Close when clicking outside modal
        document.getElementById('playerModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('playerModal')) {
                this.closePlayer();
            }
        });
    }

    // Show player modal with content
    showPlayer(content) {
        const modal = document.getElementById('playerModal');
        const titleElement = document.getElementById('playerTitle');
        
        titleElement.textContent = content.title;
        
        // Clear previous servers
        const serversContainer = document.getElementById('serversContainer');
        serversContainer.innerHTML = '';
        
        // Add server buttons
        this.servers.forEach(server => {
            const button = document.createElement('button');
            button.className = 'server-btn';
            button.textContent = server.name;
            button.addEventListener('click', () => {
                this.playFromServer(content, server);
            });
            serversContainer.appendChild(button);
        });
        
        // Show modal
        modal.classList.add('active');
        
        // Simulate loading video (in real app, this would load actual video)
        this.simulateVideoLoad();
    }

    // Play content from a specific server
    playFromServer(content, server) {
        console.log(`Playing ${content.title} from ${server.name}`);
        
        // In a real implementation, this would:
        // 1. Fetch the actual streaming URL from the server
        // 2. Set the video source
        // 3. Start playback
        
        // For now, we'll simulate it with a placeholder
        const videoElement = document.getElementById('playerVideo');
        videoElement.src = `https://placehold.co/800x450/141414/FFFFFF?text=Playing+${content.title}+via+${server.name}`;
        videoElement.load();
        
        // Hide servers and show video
        document.querySelector('.server-selection').style.display = 'none';
        document.querySelector('.player-container video').style.display = 'block';
    }

    // Simulate video loading
    simulateVideoLoad() {
        const videoElement = document.getElementById('playerVideo');
        videoElement.src = '';
        videoElement.load();
        
        // Show loading state for a moment
        setTimeout(() => {
            // In real app, this would be replaced with actual video source
            videoElement.style.display = 'none';
        }, 1000);
    }

    // Close player modal
    closePlayer() {
        const modal = document.getElementById('playerModal');
        modal.classList.remove('active');
        
        // Reset video element
        const videoElement = document.getElementById('playerVideo');
        videoElement.src = '';
        videoElement.load();
        
        // Show servers again
        document.querySelector('.server-selection').style.display = 'block';
        document.querySelector('.player-container video').style.display = 'none';
    }
}

// Create global player instance
const videoPlayer = new VideoPlayer();

// Extend app.js functionality to use the player
function showPlayerModal(content) {
    // Save to recently watched
    saveToRecentlyWatched(content);
    
    // Show player modal with servers
    videoPlayer.showPlayer(content);
}