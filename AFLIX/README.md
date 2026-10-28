# AFLIX - Movie Streaming Platform

A Netflix-style movie and TV show streaming platform with a red and black theme, PWA support, and multiple server integration.

## Features

- **Netflix-style UI** with red and black color scheme
- **PWA Support** - Installable on mobile devices and desktops
- **Recently Watched** section that saves viewing history to localStorage
- **Multiple Streaming Servers** - Integration with popular servers like vidlink.pro, vidsrc.to, etc.
- **TMDB API Integration** - For movie and TV show data
- **Responsive Design** - Perfectly optimized for iPhone screens and all devices
- **Search Functionality** - Find movies and shows quickly

## Project Structure

```
AFLIX/
├── index.html          # Main HTML file
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker for PWA
├── css/
│   └── style.css       # Stylesheet with Netflix-style design
├── js/
│   ├── app.js          # Main application logic
│   ├── api.js          # TMDB API integration
│   ├── player.js       # Video player and server handling
│   └── storage.js      # LocalStorage management
└── README.md           # This file
```

## How to Use

1. Open `index.html` in a web browser
2. Browse movies and TV shows
3. Click on any item to view details and play it
4. Select from multiple streaming servers
5. Your recently watched items are automatically saved to localStorage

## PWA Features

- Installable on mobile devices (iOS/Android)
- Works offline with service worker caching
- Native app-like experience
- Responsive design for all screen sizes

## API Integration

To enable full functionality, you'll need to:

1. Get a free API key from [TMDB](https://www.themoviedb.org/settings/api)
2. Replace `YOUR_TMDB_API_KEY` in `js/api.js` with your actual API key

## Streaming Servers

The application is designed to work with multiple streaming servers:
- Vidlink.pro
- Vidsrc.to
- StreamTape
- MixDrop
- Dood

In a production environment, these would be integrated with actual server endpoints.

## Responsive Design

The site is fully responsive and optimized for:
- iPhone screens (perfect fit with no black bars)
- Tablets
- Desktop computers
- All screen sizes and orientations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (iOS 14+)
- Edge (latest)

## Development Notes

This is a frontend-only implementation. For full functionality, you would need to:
1. Implement actual server integration
2. Add authentication system
3. Connect to real streaming endpoints
4. Add user accounts and profiles
5. Implement payment systems

## License

This project is created for demonstration purposes only.