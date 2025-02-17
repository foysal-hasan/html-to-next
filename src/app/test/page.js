'use client'
import React, { useState, useRef, useCallback } from "react";

const SectionsWithPreview = ({ apiResponses }) => {
  const [selectedPosts, setSelectedPosts] = useState({});
  const observers = useRef([]);

  // Load more posts when scrolling
  const loadMorePosts = (sectionIndex) => {
    const newPosts = [
      { id: `post-${Math.random()}`, content: `New post ${Math.random()}` },
      { id: `post-${Math.random()}`, content: `Another post ${Math.random()}` },
    ];
    setSections((prev) =>
      prev.map((section, idx) =>
        idx === sectionIndex ? { ...section, posts: [...section.posts, ...newPosts] } : section
      )
    );
  };

  // Infinite Scroll Hook
  const observeLastPost = useCallback((node, sectionIndex) => {
    if (observers.current[sectionIndex]) observers.current[sectionIndex].disconnect();
    
    observers.current[sectionIndex] = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMorePosts(sectionIndex);
      }
    });

    if (node) observers.current[sectionIndex].observe(node);
  }, []);

  return (
    <div className="container mx-auto">
      {apiResponses.map((section, sectionIndex) => (
        <div key={sectionIndex} className="flex border rounded-lg shadow-lg min-h-screen">
          {/* Left Side: Scrollable List of Posts */}
          <div className="w-1/2 p-4 overflow-auto max-h-screen border-r">
            <h2 className="text-lg font-bold mb-3">Section {sectionIndex + 1}</h2>
            {section.posts.map((post, index) => (
              <div
                key={post.id}
                ref={index === section.posts.length - 1 ? (el) => observeLastPost(el, sectionIndex) : null}
                className={`p-3 border-b cursor-pointer hover:bg-gray-100 ${
                  selectedPosts[sectionIndex]?.id === post.id ? "bg-gray-200" : ""
                }`}
                onClick={() => setSelectedPosts((prev) => ({ ...prev, [sectionIndex]: post }))}
              >
                {post.content}
              </div>
            ))}
          </div>

          {/* Right Side: Preview */}
          <div className="w-1/2 p-4 flex items-center justify-center">
            {selectedPosts[sectionIndex] ? (
              <div className="p-5 border rounded-lg shadow">
                <h2 className="text-xl font-semibold">Preview</h2>
                <p className="mt-3">{selectedPosts[sectionIndex].content}</p>
              </div>
            ) : (
              <p className="text-gray-500">Click a post to preview</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Example API Response Data
const dummyApiResponses = [
  { posts: [{ id: "1a", content: "Post 1A" }, { id: "1b", content: "Post 1B" }, { id: "1c", content: "Post 1C" }, { id: "1d", content: "Post 1D" }, { id: "1e", content: "Post 1E" }] },
  { posts: [{ id: "2a", content: "Post 2A" }, { id: "2b", content: "Post 2B" }, { id: "2c", content: "Post 2C" }, { id: "2d", content: "Post 2D" }, { id: "2e", content: "Post 2E" }] },
  { posts: [{ id: "3a", content: "Post 3A" }, { id: "3b", content: "Post 3B" }, { id: "3c", content: "Post 3C" }, { id: "3d", content: "Post 3D" }, { id: "3e", content: "Post 3E" }] },
  { posts: [{ id: "4a", content: "Post 4A" }, { id: "4b", content: "Post 4B" }, { id: "4c", content: "Post 4C" }, { id: "4d", content: "Post 4D" }, { id: "4e", content: "Post 4E" }] },
  { posts: [{ id: "5a", content: "Post 5A" }, { id: "5b", content: "Post 5B" }, { id: "5c", content: "Post 5C" }, { id: "5d", content: "Post 5D" }, { id: "5e", content: "Post 5E" }] },
];

export default function App() {
  return <SectionsWithPreview apiResponses={dummyApiResponses} />;
}

