import BlogrHeader from '@/components/blogr/header';

export const metadata = {
  title: 'Galileo Design',
  description: 'Galileo Design',
};

export default function Layout({ children }) {
  return (
    <div
        className="relative flex size-full min-h-screen flex-col bg-gray-900 dark group/design-root overflow-x-hidden"
        style={{ fontFamily: '"Work Sans", "Noto Sans", "sans-serif;"' }}
      >
        <div className="layout-container flex h-full grow flex-col">
        <BlogrHeader />
        {/* <Header/> */}
        {children}
      </div>
    </div>
  );
}
