'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAppSelector } from '@/lib/hooks';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const icons = {
  darkweb: '/assets/dark-web.png',
  facebook: '/assets/fb.png',
  Instagram: '/assets/instagram.png',
  twitter: '/assets/x.png',
  telegram: '/assets/telegram.png',
  bluesky: '/assets/bluesky-icon.png',
  vk: '/assets/vk.png',
  threads: '/assets/threads.png',
  default: '/assets/post.png',
};

function getIcon(source) {
  return icons[source] || icons.default;
}

async function geocodeLocation(locationName) {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationName)}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    );
    const data = await response.json();
    if (!data.features || data.features.length === 0) return null;
    return data.features[0].center; // [lng, lat]
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

export default function RenderPostAndMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const seenLocations = useRef(new Set());
  const sidebarRef = useRef(null); // Reference to the sidebar
  const posts = useAppSelector((state) => state.mapPagePosts.posts);
  const [geoPosts, setGeoPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 20],
        zoom: 2,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }
  }, []);

  useEffect(() => {
    const fetchAndAddMarker = async () => {

      for (const post of posts) {
        if (!post.location) continue;

        const locationKey = post.location.toLowerCase().trim();
        if (seenLocations.current.has(locationKey)) continue;
        seenLocations.current.add(locationKey);

        const coords = await geocodeLocation(post.location);
        if (!coords) continue;

        // Check if the post is already in the state
        if (geoPosts.some(p => p.id === post.id)) continue;

        const fullPost = {
          ...post,
          lng: coords[0],
          lat: coords[1],
        };



        setGeoPosts(prev => [...prev, fullPost]);

        const el = document.createElement('img');
        el.src = getIcon(post.source);
        el.alt = post.source;
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.cursor = 'pointer';

        el.addEventListener('click', () => {
          setSelectedPostId(post.id);
          map.current.flyTo({ center: [fullPost.lng, fullPost.lat], zoom: 5 });

          // Scroll to the selected post in the sidebar, centering it
          const selectedPostElement = document.getElementById(post.id);
          if (selectedPostElement && sidebarRef.current) {
            const sidebarHeight = sidebarRef.current.offsetHeight;
            const postTop = selectedPostElement.offsetTop;
            const postHeight = selectedPostElement.offsetHeight;
            const scrollTo = postTop - (sidebarHeight / 2) + (postHeight / 2);
            sidebarRef.current.scrollTop = scrollTo;
          }
        });

        const marker = new mapboxgl.Marker(el)
          .setLngLat([fullPost.lng, fullPost.lat])
          .addTo(map.current);

        markersRef.current.push(marker);
      }
    };

    fetchAndAddMarker();
  }, [posts]);

  return (
    <main className="w-full min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2 h-[80vh] bg-gray-800 rounded overflow-hidden">
            <div ref={mapContainer} className="w-full h-full" />
          </div>

          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className="lg:col-span-1 rounded overflow-y-auto h-[80vh]"
            style={{
              scrollbarColor: '#2dd4bf #1f2937',
            }}
          >
          <div className='bg-gray-800 p-4 mr-2 rounded'>

          <h2 className="text-white text-xl font-bold mb-4">Posts</h2>

          {geoPosts.map((post) => (
            <div
              key={post.id}
              id={post.id} // Added id to the post for easy selection
              onClick={() => {
                setSelectedPostId(post.id);
                map.current.flyTo({ center: [post.lng, post.lat], zoom: 5 });
                // Scroll to the selected post in the sidebar, centering it
                if (sidebarRef.current) {
                  const sidebarHeight = sidebarRef.current.offsetHeight;
                  const postTop = document.getElementById(post.id).offsetTop;
                  const postHeight = document.getElementById(post.id).offsetHeight;
                  const scrollTo = postTop - (sidebarHeight / 2) + (postHeight / 2);
                  sidebarRef.current.scrollTop = scrollTo;
                }
              }}
              className={`p-4 rounded-lg cursor-pointer transition-colors mb-3 ${
                selectedPostId === post.id
                  ? 'bg-teal-600/30 border border-teal-400'
                  : 'bg-gray-700 hover:bg-gray-600'
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
              <h3 className="text-white font-medium break-all" dangerouslySetInnerHTML={{ __html: post.title }} />
            </div>
          ))}

          {geoPosts.length === 0 && (
            <div className="text-gray-400 text-center">
              Loading map data...
            </div>
          )}
          </div>
          </div>
        </div>
      </div>
    </main>
  );
}
