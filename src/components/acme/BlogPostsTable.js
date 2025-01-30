export default function PostTable() {
  const posts = [
    {
      name: "The ultimate guide to...",
      author: "Jane Smith",
      preview: "Here's a preview of the post...",
      date: "Jan 1, 2023",
    },
    {
      name: "5 things you didn't know about...",
      author: "John Doe",
      preview: "Here's a preview of the post...",
      date: "Dec 31, 2022",
    },
    {
      name: "How to grow your business with...",
      author: "Alice Johnson",
      preview: "Here's a preview of the post...",
      date: "Dec 30, 2022",
    },
    {
      name: "The future of...",
      author: "Bob Anderson",
      preview: "Here's a preview of the post...",
      date: "Dec 29, 2022",
    },
    {
      name: "A beginner's guide to...",
      author: "Emily Davis",
      preview: "Here's a preview of the post...",
      date: "Dec 28, 2022",
    },
    {
      name: "10 tips for...",
      author: "Sam Wilson",
      preview: "Here's a preview of the post...",
      date: "Dec 27, 2022",
    },
    {
      name: "Why you should...",
      author: "Olivia Thompson",
      preview: "Here's a preview of the post...",
      date: "Dec 26, 2022",
    },
    {
      name: "The history of...",
      author: "Michael Garcia",
      preview: "Here's a preview of the post...",
      date: "Dec 25, 2022",
    },
    {
      name: "The science behind...",
      author: "Sophia Martinez",
      preview: "Here's a preview of the post...",
      date: "Dec 24, 2022",
    },
    {
      name: "An in-depth analysis of...",
      author: "Liam Rodriguez",
      preview: "Here's a preview of the post...",
      date: "Dec 23, 2022",
    },
  ];

  return (
    <table className="flex-1">
      <thead>
        <tr className="bg-[#1a2632]">
          <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal w-[400px]">
            Post name
          </th>
          <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal w-[400px]">
            Author
          </th>
          <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal w-[400px]">
            Body preview
          </th>
          <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal w-[400px]">
            Date
          </th>
          <th className="px-4 py-3 text-left text-[#93adc8] text-sm font-medium leading-normal w-60"></th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, index) => (
          <tr
            key={index}
            className="border-t border-[#344d65] hover:bg-[#2a3a4d] transition-colors"
          >
            <td className="h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal">
              {post.name}
            </td>
            <td className="h-[72px] px-4 py-2 text-[#93adc8] text-sm font-normal leading-normal">
              {post.author}
            </td>
            <td className="h-[72px] px-4 py-2 text-[#93adc8] text-sm font-normal leading-normal">
              {post.preview}
            </td>
            <td className="h-[72px] px-4 py-2 text-[#93adc8] text-sm font-normal leading-normal">
              {post.date}
            </td>
            <td className="h-[72px] px-4 py-2 w-60 text-[#93adc8] text-sm font-bold leading-normal tracking-[0.015em]">
              <button>View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
