# Terravia Constructions website

Static website for Terravia Constructions, including the interactive fleet viewer, all 14 3D machine models, and the company registration certificate linked in the footer.

## Run locally

Serve this directory with any static web server. For a quick preview, use Python:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Use a local server rather than opening `index.html` directly so the 3D assets load correctly.

## Deploy

Import this GitHub repository into Vercel. It is a static site and does not require a build command; the repository root is the output directory.

The AI chat preview is marked “Coming soon” and does not connect to a live AI service. Some fleet entries are representative visual models rather than verified factory CAD.
