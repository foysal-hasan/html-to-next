'use client';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const dummyPosts = [
  {
    id: 1,
    title: 'Top 5 Travel Tips for 2025',
    source: 'facebook',
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 2,
    title: 'Behind the scenes at Paris Fashion Week',
    source: 'instagram',
    lat: 48.8566,
    lng: 2.3522,
  },
  {
    id: 3,
    title: 'X launches new creator monetization tools',
    source: 'x',
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: 4,
    title: 'Telegram channel hits 100k subscribers!',
    source: 'telegram',
    lat: 55.7558,
    lng: 37.6173,
  },
  {
    id: 5,
    title: "5-Minute Healthy Recipes You'll Love",
    source: 'facebook',
    lat: 34.0522,
    lng: -118.2437,
  },
  {
    id: 6,
    title: 'My Daily Skincare Routine – Morning Edition',
    source: 'instagram',
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    id: 7,
    title: "X Trends: What's Going Viral This Week",
    source: 'x',
    lat: 28.6139,
    lng: 77.209,
  },
  {
    id: 8,
    title: 'How to stay focused while studying',
    source: 'telegram',
    lat: 52.52,
    lng: 13.405,
  },
  {
    id: 9,
    title: 'Live Concert in Rome Tonight 🎶',
    source: 'facebook',
    lat: 41.9028,
    lng: 12.4964,
  },
  {
    id: 10,
    title: 'Weekend Outfit Ideas 🌸',
    source: 'instagram',
    lat: 35.6895,
    lng: 139.6917,
  },
  {
    id: 11,
    title: 'X Spaces Now Supports Video!',
    source: 'x',
    lat: 45.4215,
    lng: -75.6972,
  },
  {
    id: 12,
    title: 'Daily Productivity Hacks 🧠',
    source: 'telegram',
    lat: -33.8688,
    lng: 151.2093,
  },
  {
    id: 13,
    title: '10 Books to Read Before You Turn 30',
    source: 'facebook',
    lat: 19.4326,
    lng: -99.1332,
  },
  {
    id: 14,
    title: 'Sunset Beach Shots from Bali 🌅',
    source: 'instagram',
    lat: -8.3405,
    lng: 115.092,
  },
  {
    id: 15,
    title: 'Breaking: AI Regulation Updates on X',
    source: 'x',
    lat: 59.3293,
    lng: 18.0686,
  },
  {
    id: 16,
    title: 'Top Tech Deals – Telegram Exclusive',
    source: 'telegram',
    lat: 6.5244,
    lng: 3.3792,
  },
  {
    id: 17,
    title: 'How I Grew My Facebook Page to 1M Followers',
    source: 'facebook',
    lat: 31.2304,
    lng: 121.4737,
  },
  {
    id: 18,
    title: 'Aesthetic Café Corners You Must Visit ☕️',
    source: 'instagram',
    lat: 1.3521,
    lng: 103.8198,
  },
  {
    id: 19,
    title: 'What People Are Talking About This Week #XNews',
    source: 'x',
    lat: 50.1109,
    lng: 8.6821,
  },
  {
    id: 20,
    title: 'Telegram Tips for Private Channel Management',
    source: 'telegram',
    lat: -23.5505,
    lng: -46.6333,
  },
];

const icons = {
  darkweb: '/assets/dark-web.png',
  facebook: '/assets/fb.png',
  instagram: '/assets/instagram.png',
  twitter: '/assets/x.png',
  telegram: '/assets/telegram.png',
  threads: '/assets/threads.png',
  default: '/assets/post.png',
};

function getIcon(source) {
  let icon = icons.default;
  switch (source) {
    case 'facebook':
      icon = icons.facebook;
      break;

    case 'x':
      icon = icons.twitter;
      break;

    case 'instagram':
      icon = icons.instagram;
      break;

    case 'telegram':
      icon = icons.telegram;
      break;

    default:
      icon = icons.default;
      break;
  }

  return icon;
}

export default function MapPage() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [dummyPosts[0].lng, dummyPosts[0].lat],
      zoom: 2,
    });

    dummyPosts.forEach((post) => {
      const el = document.createElement('img');
      el.src = getIcon(post.source);
      el.alt = post.source;
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.cursor = 'pointer';

      el.addEventListener('click', () => {
        setSelectedPostId(post.id);
      });

      new mapboxgl.Marker(el)
        .setLngLat([post.lng, post.lat])
        .addTo(map.current);
    });
  }, []);

  const handlePostClick = (post) => {
    setSelectedPostId(post.id);
    map.current?.flyTo({ center: [post.lng, post.lat], zoom: 5 });
  };

  return (
    <main className="w-full min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-800/50 p-4 rounded-lg">
            <h1 className="text-white text-2xl sm:text-3xl font-bold">
              Social Media Map
            </h1>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Map Container */}
            <div className="lg:col-span-2 h-[calc(100vh-12rem)] rounded-md overflow-hidden bg-gray-800">
              <div ref={mapContainer} className="w-full h-full" />
            </div>

            {/* Posts List */}
            <div
              className="lg:col-span-1 max-h-[calc(100vh-12rem)] overflow-y-auto overflow-x-hidden pr-2 rounded-lg scrollbar-track-red-900 scrollbar-thumb-red-500"
              style={{
                scrollbarColor: '#2dd4bf #1f2937',
              }}
            >
              <div className="bg-gray-800 rounded-lg p-4">
                {/* <h2 className="text-white text-xl font-bold mb-4">Posts</h2> */}

                <div className="space-y-4 ">
                  <h2 className="text-white text-xl font-bold mb-4">Posts</h2>
                  {dummyPosts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => handlePostClick(post)}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        selectedPostId === post.id
                          ? 'bg-teal-500/20 border border-teal-500'
                          : 'bg-gray-700/50 hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={getIcon(post.source)}
                          alt={post.source}
                          className="w-6 h-6"
                        />
                        <span className="text-gray-400 text-sm capitalize">
                          {post.source}
                        </span>
                      </div>
                      <h3 className="text-white font-medium">{post.title}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
