'use client';

import { ApifyClient } from 'apify-client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [telegramPosts, setTelegramPosts] = useState([]);

  useEffect(() => {
    // const fetchTelegramPosts = async () => {
    //   try {
    //     const posts = await fetch(
    //       'https://api.tgstat.ru/posts/search?token=5bb277405e76a628a0547cacf7279e37&q=coinbase&startDate=Today&limit=50&offset=100&peerType=all&hideForwards=0&hideDeleted=0&strongSearch=0&extended=1',
    //       {
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Access-Control-Allow-Origin': '*',
    //         },
    //       },
    //     );
    //     const data = await posts.json();
    //     console.log(data);
    //     setTelegramPosts(data?.response?.items);
    //   } catch (error) {
    //     //
    //   }
    // };
    // fetchTelegramPosts();
    // axios
    //   .post('http://172.86.116.124:5003/search', { keyword: 'Stealer' })
    //   .then((response) => {
    //     console.log(response.data);
    //     setPosts(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Dark Web API Error:', error);
    //   });

    // Initialize the ApifyClient with your Apify API token
    // Replace the '<YOUR_API_TOKEN>' with your token
    const fetchApifyPosts = async () => {
      try {
        const client = new ApifyClient({
          token: 'apify_api_Fg3EwbIxRvoUMvKQp2YORhaoypUoc007jmoa',
        });

        // Prepare Actor input
        const input = {
          search: 'restaurant',
          searchType: 'hashtag',
          searchLimit: 1,
        };

        // Run the Actor and wait for it to finish
        const run = await client
          .actor('apify/instagram-search-scraper')
          .call(input);

        // Fetch and print Actor results from the run's dataset (if any)
        // console.log('Results from dataset');
        // console.log(
        //   `💾 Check your data here: https://console.apify.com/storage/datasets/${run.defaultDatasetId}`,
        // );
        const { items } = await client
          .dataset(run.defaultDatasetId)
          .listItems();
        // console.log(items);
      } catch (error) {
        // console.error(`Apify API Error:`, error);
      }
    };
    fetchApifyPosts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Dark Web & Social Media Monitoring</h1>
      {telegramPosts?.map((post) => (
        <div key={post.id} className="post">
          <p>
            <strong>{post.date}</strong>
          </p>
          <p>{post.content.substring(0, 100)}...</p>
          <a href={post.link} target="_blank">
            Read More
          </a>
          <Link href={`/post/${post.id}`}>View More</Link>
        </div>
      ))}
    </div>
  );
}
