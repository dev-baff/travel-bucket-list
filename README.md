# 🗺️ Travel Bucket List and Expense Tracker

A responsive web application that allows users to search for countries, view detailed destination information, and manage a personal travel bucket list with expense tracking.

## 🌐 Live Demo
Coming soon...

## 🛠️ Tech Stack
- React JS
- Tailwind CSS
- React Router DOM
- REST Countries API
- Unsplash API

## ✨ Features (In Progress)
- [x] Search for countries by name
- [x] View country details (capital, population, currency, languages)
- [x] View destination photos via Unsplash
- [x] Add destinations to bucket list
- [ ] Track expenses per destination (flight, accommodation, activities)
- [ ] Mark destinations as visited/not visited
- [ ] Persist data with localStorage

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
│   ├── HomePage.jsx
│   ├── CountryCard.jsx
│   ├── DestinationDetails.jsx
│   └── BucketList.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## 👤 Author
Baffour Amanfo