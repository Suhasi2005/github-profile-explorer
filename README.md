# GitHub Profile Explorer

A React Native app for searching any GitHub username and browsing their public profile and repositories, sorted by stars.

## Features
- Search any GitHub username, with friendly errors for a nonexistent user or a rate-limited request
- Profile view: avatar, bio, follower/following counts, public repo count
- Repository list sorted by star count (GitHub's API doesn't support sorting by stars server-side, so this is done client-side after fetching)
- Repository detail: stars, forks, open issues, license, last updated, with a link out to GitHub
- Recent searches persisted locally with AsyncStorage, so they survive an app restart

## Why this exists
Built as a focused, single-purpose companion to [OneStop Disposables](../) — where that project integrates with a backend I built myself, this one integrates with a real, unauthenticated third-party REST API (GitHub's), including its actual constraints: 404s, rate limits, and a sort option that doesn't exist so it has to be done client-side.

## Tech Stack
React Native, Expo, React Navigation, AsyncStorage, GitHub REST API (`api.github.com`, unauthenticated)

## Run
```bash
npm install
npx expo start
```
Press `a` for Android emulator, `i` for iOS simulator, or scan the QR code with Expo Go on a physical phone. No backend, no API key, and no `.env` needed — it talks straight to GitHub's public API.

## Screens
Search (with recent-search history) → Profile (bio, stats, repo list) → Repository Detail
