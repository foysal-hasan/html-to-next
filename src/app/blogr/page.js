'use client'
import { useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '@/components/brandsense/DarkWebAndSocialMediaMentionsCard';
import { useAppSelector } from '@/lib/hooks';
import filterPosts from '@/utils/filterPosts';

export default function Blogr() {
  const { posts } = useAppSelector(state => state.posts);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    riskLevel: ''
  });

  const filteredPosts = filterPosts(posts, filters);

  return (
    <div className="gap-1 px-6 flex flex-1 justify-center items-start py-5">
      <div className='max-w-4xl flex flex-col gap-10'>
        <div className="flex gap-4 mb-4 justify-end flex-1">
          <input
            type="date"
            placeholder="Start Date"
            className="border p-2 rounded"
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          />
          <input
            type="date"
            placeholder="End Date"
            className="border p-2 rounded"
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          />
          <select
            className="border p-2 rounded"
            onChange={(e) => setFilters({ ...filters, riskLevel: e.target.value })}
          >
            <option value="">All Risks</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        {filteredPosts?.map((post, index) => (
          <DarkWebAndSocialMediaMentionsCard
            key={index}
            url={post.link}
            date={post.date}
            content={post.content}
            risk={post.risk}
          />
        ))}
      </div>
    </div>
  );
}
