'use client'
import DarkWebAndSocialMediaMentionsCard from '@/components/brandsense/DarkWebAndSocialMediaMentionsCard';
import { useAppSelector } from '@/lib/hooks';
import filterPosts from '@/utils/filterPosts';



export default function Blogr() {
    const { posts } = useAppSelector(state => state.posts)
  return (
    <div className="gap-1 px-6 flex flex-1 justify-center items-start py-5">
     <div className='max-w-4xl flex flex-col gap-10'>
     {filterPosts(posts)?.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard
          key={index}
          url={post.link}
          date={post.date}
          content={post.content}
          risk={post.risk}
        />

      ))
      }
      
     </div>
    </div>
  );
}
