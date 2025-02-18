'use client';
import {
  darkwebFacebook,
  darkwebStealer,
  darkwebXss,
  facebook,
  instagram,
  telegram,
  twitter,
} from '@/components/blogr/enum';
import RenderPosts from '@/components/blogr/RenderPosts';
import { useEffect, useState } from 'react';

export default function test({ domain }) {
  const [globalLoading, setGlobalLoading] = useState(true);
  const [loaders, setLoaders] = useState({
    l1: true,
    l2: true,
    l3: true,
    l4: true,
    l5: true,
    l6: true,
    l7: true,
  });

  useEffect(() => {
    // if true then stop the loader
    let flag = false;
    for (let key in loaders) {
      const value = loaders[key];
      if (value == false) {
        flag = true;
      } else {
        flag = false;
      }
    }
    if (flag) {
      setGlobalLoading(false);
    }
  }, [loaders]);

  useEffect(() => {}, [globalLoading]);

  return (
    <>
      {globalLoading && <>Loading</>}
      <RenderPosts
        domain={domain}
        source={instagram}
        setLoaders={setLoaders}
        globalLoading={globalLoading}
      />
      <RenderPosts
        domain={domain}
        source={facebook}
        setLoaders={setLoaders}
        globalLoading={globalLoading}
      />
      <RenderPosts
        domain={domain}
        source={twitter}
        setLoaders={setLoaders}
        globalLoading={globalLoading}
      />
      <RenderPosts
        domain={domain}
        source={telegram}
        setLoaders={setLoaders}
        globalLoading={globalLoading}
      />
      <RenderPosts
        domain={domain}
        source={darkwebFacebook}
        setLoaders={setLoaders}
      />
      <RenderPosts
        domain={domain}
        source={darkwebStealer}
        setLoaders={setLoaders}
      />
      <RenderPosts
        domain={domain}
        source={darkwebXss}
        setLoaders={setLoaders}
      />
    </>
  );
}
