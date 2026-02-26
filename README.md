# 🗺️ Travel Bucket List and Expense Tracker

A responsive web application that allows users to search for countries, view detailed destination information, and manage a personal travel bucket list with expense tracking.

## 🌐 Live Demo
[https://travel-bucket-list-baff.netlify.app](https://travel-bucket-list-baff.netlify.app)

## 🛠️ Tech Stack
- React JS
- Tailwind CSS
- React Router DOM
- REST Countries API
- Unsplash API

## ✨ Features
- [x] Search for countries by name
- [x] Popular destinations shown on home page
- [x] View country details (capital, population, currency, languages)
- [x] View destination photos via Unsplash
- [x] Click photos to view in fullscreen lightbox
- [x] Add destinations to bucket list
- [x] Track expenses per destination (flight, accommodation, activities)
- [x] Mark destinations as visited/not visited
- [x] View total budget across all destinations
- [x] Persist data with localStorage
- [x] Fully responsive on mobile and desktop

## 🚀 Getting Started

### Prerequisites
- Node.js
- npm

### Installation
1. Clone the repository
```bash
   git clone https://github.com/dev-baff/travel-bucket-list.git
```
2. Navigate to the project directory
```bash
   cd travel-bucket-list
```
3. Install dependencies
```bash
   npm install
```
4. Create a `.env` file in the root directory and add your Unsplash API key
```
   VITE_UNSPLASH_KEY=your_unsplash_access_key
```
5. Start the development server
```bash
   npm run dev
```

## 📁 Project Structure
```
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── HomePage.jsx
│   ├── CountryCard.jsx
│   ├── DestinationDetails.jsx
│   ├── BucketList.jsx
│   └── BucketListItem.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## 👤 Author
Baffour Amanfo