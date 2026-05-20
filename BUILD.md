# SCRIPTORIUM Build & Scripts

## Development
```bash
# No build step required - runs directly from static files
# Serve with any static server:
python -m http.server 8000
# or
npx serve .
```

## Structure
- `scriptorium.html` - Main app (5400+ lines)
- `scribe-store.js` - State manager (220 lines)
- `sw.js` - Service worker
- `data/logia.json` - Verse data (50 verses)
- `scriptorium-base.css` - Shared styles
- `- `styles.css` - Additional styles

## Key Features
- localStorage persistence with migration
- Offline-first via Service Worker
- Typology overlay with 14+ messianic types
- Interlinear/Greek/Hebrew/English viewers
- Typology badges on gallery cards

## To Build (Future)
```bash
# Minify CSS
npx postcss styles.css -o styles.min.css

# Bundle JS (future)
# npx esbuild scriptorium.js --bundle --outfile=app.js
```

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+