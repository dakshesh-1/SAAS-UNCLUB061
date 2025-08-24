import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";
import { Navigation } from "./components/Navigation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route
            path="/auth"
            element={
              <Placeholder
                title="Authentication"
                description="Beautiful login and registration forms with smooth animations."
                features={[
                  "Glassmorphism login modal",
                  "Social authentication",
                  "Animated form validation",
                  "Password strength indicator",
                  "Smooth form transitions"
                ]}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <Placeholder
                title="Host Dashboard"
                description="Comprehensive dashboard for event hosts to manage their events and bookings."
                features={[
                  "Animated sidebar navigation",
                  "Event creation wizard",
                  "Booking management table",
                  "Revenue analytics charts",
                  "Real-time notifications",
                  "Performance metrics"
                ]}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <Placeholder
                title="Admin Dashboard"
                description="Advanced admin panel with analytics and user management."
                features={[
                  "KPI cards with counter animations",
                  "User management table",
                  "Event approval system",
                  "Revenue tracking charts",
                  "System health monitoring",
                  "Animated status indicators"
                ]}
              />
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
