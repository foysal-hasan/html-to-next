'use client';
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAppSelector } from '@/lib/hooks';

const geocodeLocation = async (locationName) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        locationName,
      )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
    );

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      console.log('No coordinates found for location:', locationName);
      return null;
    }

    const coordinates = data.features[0].center; // [longitude, latitude]
    return coordinates;
  } catch (error) {
    console.error('Error geocoding location:', error);
    return null;
  }
};

// const analyzePost = async (postContent) => {
//   try {
//     const response = await fetch('https://api.openai.com/v1/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: 'text-davinci-003',
//         prompt: `Extract the location from the following text: "${postContent}"`,
//         max_tokens: 50,
//       }),
//     });
//     const data = await response.json();
//     return data.choices?.[0]?.text?.trim() || null; // Safely access nested properties
//   } catch (error) {
//     console.error('Error analyzing post:', error);
//     return null;
//   }
// };

const Heatmap = () => {
  const posts = useAppSelector((state) => state.posts.allPosts);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [geojson, setGeojson] = useState({
    type: 'FeatureCollection',
    features: [],
  });

  useEffect(() => {
    // Analyze posts and create GeoJSON
    const analyzePosts = async () => {
      const features = [];
      for (const post of posts) {
        // const locationName = await analyzePost(post.content);
        // if (!locationName) continue;

        const coordinates = await geocodeLocation(post.location);
        if (!coordinates) continue;

        features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates,
          },
          properties: {
            title: post.location,
            description: post.content,
          },
        });
      }
      console.log('Features', features);
      setGeojson({ type: 'FeatureCollection', features });
    };

    analyzePosts();
  }, [posts]);

  useEffect(() => {
    if (!mapRef.current) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-120, 50],
        zoom: 1.5,
      });

      mapRef.current.on('load', () => {
        mapRef.current.addSource('posts', {
          type: 'geojson',
          data: geojson,
        });

        // mapRef.current.addLayer({
        //   id: 'posts-points',
        //   type: 'circle',
        //   source: 'posts',
        //   paint: {
        //     'circle-radius': 5,
        //     'circle-color': '#FF0000',
        //     'circle-stroke-width': 1,
        //     'circle-stroke-color': '#FFFFFF',
        //   },
        // });

        // Add a layer to display the points
        // mapRef.current.addLayer({
        //   id: 'posts-points',
        //   type: 'circle',
        //   source: 'posts',
        //   paint: {
        //     'circle-radius': 5,
        //     'circle-color': '#FF0000',
        //     'circle-stroke-width': 1,
        //     'circle-stroke-color': '#FFFFFF',
        //   },
        // });

        mapRef.current.addLayer(
          {
            id: 'posts-heat',
            type: 'heatmap',
            source: 'posts',
            maxzoom: 9,
            paint: {
              // Increase the heatmap weight based on frequency and property magnitude
              'heatmap-weight': [
                'interpolate',
                ['linear'],
                ['get', 'mag'],
                0,
                0,
                6,
                1,
              ],
              // Increase the heatmap color weight weight by zoom level
              // heatmap-intensity is a multiplier on top of heatmap-weight
              'heatmap-intensity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0,
                1,
                9,
                3,
              ],
              // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
              // Begin color ramp at 0-stop with a 0-transparancy color
              // to create a blur-like effect.
              'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(33,102,172,0)',
                0.2,
                'rgb(103,169,207)',
                0.4,
                'rgb(209,229,240)',
                0.6,
                'rgb(253,219,199)',
                0.8,
                'rgb(239,138,98)',
                1,
                'rgb(178,24,43)',
              ],
              // Adjust the heatmap radius by zoom level
              'heatmap-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0,
                2,
                9,
                20,
              ],
              // Transition from heatmap to circle layer by zoom level
              'heatmap-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                7,
                1,
                9,
                0,
              ],
            },
          },
          'waterway-label',
        );

        mapRef.current.addLayer(
          {
            id: 'posts-point',
            type: 'circle',
            source: 'posts',
            minzoom: 7,
            paint: {
              // Size circle radius by earthquake magnitude and zoom level
              'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                7,
                ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
                16,
                ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50],
              ],
              // Color circle by earthquake magnitude
              'circle-color': [
                'interpolate',
                ['linear'],
                ['get', 'mag'],
                1,
                'rgba(33,102,172,0)',
                2,
                'rgb(103,169,207)',
                3,
                'rgb(209,229,240)',
                4,
                'rgb(253,219,199)',
                5,
                'rgb(239,138,98)',
                6,
                'rgb(178,24,43)',
              ],
              'circle-stroke-color': 'white',
              'circle-stroke-width': 1,
              // Transition from heatmap to circle layer by zoom level
              'circle-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                7,
                0,
                8,
                1,
              ],
            },
          },
          'waterway-label',
        );

        mapRef.current.on('click', 'posts-points', (e) => {
          if (!e.features || !e.features[0]) return;

          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.description;

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(mapRef.current);
        });
      });
    } else {
      // Update GeoJSON source when data changes
      const source = mapRef.current.getSource('posts');
      if (source) {
        console.log('Updating GeoJSON source', geojson);
        source.setData(geojson);
      }
    }
  }, [geojson]);

  if (!posts) return null;

  return <div id="map" ref={mapContainerRef} style={{ height: '100%' }}></div>;
};

export default Heatmap;
