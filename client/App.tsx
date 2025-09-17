import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PlaceholderPage from "@/components/PlaceholderPage";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {});
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<PlaceholderPage title="Login / Signup" description="Student, Company and Admin authentication with email/phone and OTP/Aadhaar options will be implemented here." />} />
              <Route path="/apply" element={<PlaceholderPage title="Application Portal" description="Start your application for the PM Internship Scheme. We will build this flow next." />} />
              <Route path="/student" element={<PlaceholderPage title="Student Dashboard" />} />
              <Route path="/company" element={<PlaceholderPage title="Company Dashboard" />} />
              <Route path="/admin" element={<PlaceholderPage title="Admin Dashboard" />} />
              <Route path="/help" element={<PlaceholderPage title="Help & Support" />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
