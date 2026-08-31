import "./ui/globals.css";
import ClientLayout from "./client-layout";
import { ThemeProvider } from "next-themes";
import NavBar from "./components/NavigationBar";

export const metadata = {
  metadataBase: new URL("https://ricethoughts.com"),
  title: {
    default: "Rice Thoughts Blog",
    template: "%s — Rice Thoughts Blog",
  },
  description: "A guy who likes rice and thinks. An essay on food, society and politics.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/Kengdoru.png", sizes: "48x48", type: "image/png" },
    ]
  },
    twitter: {
    card: "summary_large_image",
    title: "Rice Thoughts Blog",
    description:
      "A guy who likes rice and thinks. An essay on food, society and politics.",
    images: ["https://ricethoughts.com/Kengdoru.png"],
    creator: "@YourHandle",
  },
  openGraph: {
    title: "Rice Thoughts Blog",
    description:
      "A guy who likes rice and thinks. An essay on food, society and politics.",
    url: "https://ricethoughts.com",
    siteName: "Rice Thoughts Blog",
    images: [
      {
        url: "https://ricethoughts.com/Kengdoru.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-canvas text-ink antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavBar />
          <main className="flex-1">
            <ClientLayout>{children}</ClientLayout>
          </main>
          <footer className="mx-auto w-full max-w-page px-4 sm:px-6 md:px-8">
            <div className="mt-12 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line-soft py-6 text-sm text-faint md:mt-14">
              <span>© {new Date().getFullYear()} Rice Thoughts Blog</span>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}