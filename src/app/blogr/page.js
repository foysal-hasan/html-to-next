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

const isValidDomain = (domain) => {
  const domainRegex =
    /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
};

export default async function Blogr({ searchParams }) {
  const search = await searchParams;
  const domain = search?.domain ?? '';

  if (!domain) {
    return (
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <h1 className="text-white text-2xl mb-4">Enter a domain to search</h1>
        <p className="text-gray-400">Example: example.com</p>
      </div>
    );
  }

  if (!isValidDomain(domain)) {
    return (
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <h1 className="text-white text-2xl mb-4">Invalid domain format</h1>
        <p className="text-gray-400">
          Please enter a valid domain (e.g., example.com)
        </p>
      </div>
    );
  }

  return (
    <>
      <RenderPosts domain={domain} source={instagram} />
      <RenderPosts domain={domain} source={facebook} />
      <RenderPosts domain={domain} source={twitter} />
      <RenderPosts domain={domain} source={telegram} />
      <RenderPosts domain={domain} source={darkwebFacebook} />
      <RenderPosts domain={domain} source={darkwebStealer} />
      <RenderPosts domain={domain} source={darkwebXss} />
    </>
  );
}
