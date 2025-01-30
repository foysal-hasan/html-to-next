import Header from "@/components/acme/Header";

export const metadata = {
  title: "Galileo Design",
  description: "Galileo Design",
};

export default function Layout({ children }) {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#111a22] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
}
