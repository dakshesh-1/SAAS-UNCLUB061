import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Image from "@/components/ui/image";
import {
  Calendar,
  MapPin,
  Users,
  Star,
  Clock,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Play,
  Bookmark,
  MessageCircle,
  User,
  Shield,
  ArrowRight,
  Camera,
  Music,
  Coffee,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Enhanced event data with all events from the Events page
const eventData = {
  1: {
    id: 1,
    title: "Summer Music Festival 2024",
    location: "Central Park, NYC",
    fullAddress: "Central Park West & 72nd St, New York, NY 10023",
    date: "Jul 15, 2024",
    time: "6:00 PM - 11:00 PM",
    price: 89,
    originalPrice: 120,
    images: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    ],
    attendees: 2500,
    maxCapacity: 3000,
    rating: 4.8,
    totalReviews: 847,
    category: "Music",
    tags: ["Outdoor", "Live Music", "Food & Drinks", "All Ages"],
    description: `Experience the ultimate summer music festival in the heart of New York City! Join thousands of music lovers for an unforgettable night featuring top artists, amazing food, and incredible vibes.

This year's lineup includes Grammy-winning artists and rising stars across multiple genres. From indie rock to electronic beats, there's something for everyone.

The festival grounds will feature:
    • 3 main stages with non-stop performances
    • Gourmet food trucks and craft beverage stations
    • Interactive art installations
    • VIP lounge areas with exclusive perks
    • Professional photography opportunities`,

    lineup: [
      { name: "Arctic Monkeys", time: "9:30 PM", stage: "Main Stage" },
      { name: "Billie Eilish", time: "8:00 PM", stage: "Main Stage" },
      { name: "The Chainsmokers", time: "10:30 PM", stage: "Electronic Stage" },
      { name: "Lorde", time: "7:00 PM", stage: "Indie Stage" },
    ],

    host: {
      name: "NYC Events Co.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      verified: true,
      rating: 4.9,
      eventsHosted: 156,
      bio: "Premium event organizers bringing world-class experiences to NYC for over 10 years.",
      followers: 25400,
    },

    reviews: [
      {
        id: 1,
        name: "Sarah Chen",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b9e2b36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "Last month",
        comment:
          "Absolutely incredible event! The organization was flawless and the artists were amazing. Already bought tickets for next year! 🎵✨",
        helpful: 42,
        images: [
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        ],
      },
      {
        id: 2,
        name: "Marcus Johnson",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Best festival experience I've ever had! The sound quality was perfect, crowd was amazing, and the food was actually good (rare for festivals lol). 10/10 would recommend!",
        helpful: 38,
      },
      {
        id: 3,
        name: "Emma Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 4,
        date: "1 week ago",
        comment:
          "Great event overall! Only minor complaint was the long lines for drinks, but the music more than made up for it. The sunset set was magical! 🌅",
        helpful: 29,
      },
    ],

    ticketTypes: [
      {
        id: 1,
        name: "General Admission",
        price: 89,
        originalPrice: 120,
        features: ["Festival Access", "Food Court Access", "Basic Parking"],
        available: 127,
        popular: false,
      },
      {
        id: 2,
        name: "VIP Experience",
        price: 199,
        originalPrice: 250,
        features: [
          "Festival Access",
          "VIP Lounge",
          "Premium Bar",
          "Express Entry",
          "VIP Parking",
          "Welcome Gift Bag",
        ],
        available: 23,
        popular: true,
      },
      {
        id: 3,
        name: "Premium VIP",
        price: 349,
        originalPrice: 450,
        features: [
          "All VIP Benefits",
          "Meet & Greet",
          "Backstage Access",
          "Professional Photos",
          "Exclusive Merch",
          "Private Transport",
        ],
        available: 8,
        popular: false,
      },
    ],
  },
  2: {
    id: 2,
    title: "Tech Innovation Summit",
    location: "Silicon Valley, CA",
    fullAddress: "1600 Amphitheatre Parkway, Mountain View, CA 94043",
    date: "Aug 22, 2024",
    time: "9:00 AM - 6:00 PM",
    price: 299,
    originalPrice: 399,
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    ],
    attendees: 800,
    maxCapacity: 1000,
    rating: 4.9,
    totalReviews: 234,
    category: "Technology",
    tags: ["Networking", "AI", "Innovation", "Professional"],
    description: `Join Silicon Valley's most exclusive tech innovation summit! Connect with industry leaders, discover cutting-edge technologies, and shape the future of tech.

This premier event brings together:
    • Fortune 500 CTOs and tech executives
    • Rising startups with breakthrough innovations
    • Venture capitalists and angel investors
    • Industry analysts and thought leaders

Key highlights:
    • Keynote presentations from tech giants
    • Interactive product demonstrations
    • 1-on-1 networking sessions
    • Investment pitch competitions
    • Exclusive startup showcases`,

    lineup: [
      { name: "Satya Nadella", time: "10:00 AM", stage: "Main Stage" },
      { name: "Jensen Huang", time: "11:30 AM", stage: "Main Stage" },
      { name: "AI Panel Discussion", time: "2:00 PM", stage: "Tech Stage" },
      {
        name: "Startup Pitch Finals",
        time: "4:00 PM",
        stage: "Innovation Stage",
      },
    ],

    host: {
      name: "TechVenture Events",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      verified: true,
      rating: 4.9,
      eventsHosted: 89,
      bio: "Connecting innovators and investors in Silicon Valley's premier tech events.",
      followers: 15200,
    },

    reviews: [
      {
        id: 1,
        name: "David Kim",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "2 months ago",
        comment:
          "Incredible networking opportunities! Met my co-founder at this event and we just closed our Series A. The quality of attendees is unmatched.",
        helpful: 67,
      },
    ],

    ticketTypes: [
      {
        id: 1,
        name: "Professional Pass",
        price: 299,
        originalPrice: 399,
        features: ["All Sessions", "Networking Lunch", "Welcome Kit"],
        available: 45,
        popular: true,
      },
      {
        id: 2,
        name: "Executive Pass",
        price: 599,
        originalPrice: 799,
        features: [
          "All Professional Benefits",
          "VIP Networking Dinner",
          "Private Executive Lounge",
          "1-on-1 Meetings",
          "Premium Swag",
        ],
        available: 12,
        popular: false,
      },
    ],
  },
  3: {
    id: 3,
    title: "Food & Wine Experience",
    location: "Napa Valley, CA",
    fullAddress: "1234 Vineyard Lane, Napa, CA 94558",
    date: "Sep 10, 2024",
    time: "12:00 PM - 8:00 PM",
    price: 149,
    originalPrice: 199,
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1528823872057-9c018a7a7553?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    ],
    attendees: 300,
    maxCapacity: 350,
    rating: 4.7,
    totalReviews: 156,
    category: "Food & Drink",
    tags: ["Wine Tasting", "Gourmet", "Outdoor", "Luxury"],
    description: `Indulge in Napa Valley's finest wines and culinary masterpieces in this exclusive food & wine experience. Set among rolling vineyards with breathtaking views.

What awaits you:
    • Premium wine tastings from 12 renowned wineries
    • Gourmet food pairings by Michelin-starred chefs
    • Live cooking demonstrations
    • Vineyard tours with winemakers
    • Artisanal cheese and charcuterie stations

Special features:
    • Sunset terrace dining
    • Exclusive vintage wine releases
    • Meet-the-winemaker sessions
    • Take-home wine packages available
    • Professional food photography`,

    lineup: [
      { name: "Wine Master Class", time: "1:00 PM", stage: "Tasting Room" },
      {
        name: "Chef Demo: Perfect Pairings",
        time: "3:00 PM",
        stage: "Culinary Stage",
      },
      { name: "Sunset Wine Tasting", time: "6:00 PM", stage: "Terrace" },
      { name: "Vineyard Tour", time: "4:00 PM", stage: "Outdoor" },
    ],

    host: {
      name: "Napa Culinary Events",
      avatar:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      verified: true,
      rating: 4.8,
      eventsHosted: 67,
      bio: "Curating exceptional culinary experiences in California's wine country.",
      followers: 8900,
    },

    reviews: [
      {
        id: 1,
        name: "Isabella Martinez",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b9e2b36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "1 month ago",
        comment:
          "Pure perfection! The wine selection was incredible and the food pairings were spot-on. The sunset dinner was the highlight of our anniversary weekend!",
        helpful: 34,
      },
    ],

    ticketTypes: [
      {
        id: 1,
        name: "Wine Explorer",
        price: 149,
        originalPrice: 199,
        features: ["Wine Tastings", "Food Pairings", "Vineyard Tour"],
        available: 28,
        popular: true,
      },
      {
        id: 2,
        name: "Connoisseur Experience",
        price: 299,
        originalPrice: 399,
        features: [
          "All Explorer Benefits",
          "Private Winemaker Dinner",
          "Exclusive Vintage Tastings",
          "Wine Take-Home Package",
          "Personalized Sommelier",
        ],
        available: 8,
        popular: false,
      },
    ],
  },
  4: {
    id: 4,
    title: "Digital Marketing Masterclass",
    location: "Chicago, IL",
    fullAddress: "123 Business District, Chicago, IL 60601",
    date: "Jul 28, 2024",
    time: "9:00 AM - 5:00 PM",
    price: 199,
    originalPrice: 299,
    images: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    ],
    attendees: 500,
    maxCapacity: 600,
    rating: 4.6,
    totalReviews: 89,
    category: "Business",
    tags: ["Marketing", "Digital", "Professional", "Certification"],
    description: `Master the latest digital marketing strategies from industry experts. Get hands-on training, actionable insights, and networking opportunities that will transform your marketing game.

What you'll learn:
    • Advanced social media marketing strategies
    • Data-driven campaign optimization
    • Content marketing that converts
    • Email marketing automation
    • SEO and SEM best practices

Bonus features:
    • Interactive workshops
    • Real campaign case studies
    • Certification upon completion
    • Access to exclusive tools
    • 90-day follow-up support`,

    lineup: [
      { name: "Social Media Strategy", time: "10:00 AM", stage: "Main Hall" },
      { name: "Data Analytics Workshop", time: "1:00 PM", stage: "Lab A" },
      {
        name: "Content Creation Masterclass",
        time: "3:00 PM",
        stage: "Studio",
      },
    ],

    host: {
      name: "Digital Marketing Institute",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      verified: true,
      rating: 4.7,
      eventsHosted: 234,
      bio: "Leading digital marketing education and certification programs worldwide.",
      followers: 45600,
    },

    reviews: [
      {
        id: 1,
        name: "Jennifer Walsh",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "Incredibly practical and up-to-date content! I immediately implemented what I learned and saw a 40% increase in our campaign performance.",
        helpful: 23,
      },
    ],

    ticketTypes: [
      {
        id: 1,
        name: "Standard Access",
        price: 199,
        originalPrice: 299,
        features: ["All Sessions", "Materials", "Lunch", "Certificate"],
        available: 67,
        popular: true,
      },
    ],
  },
  5: {
    id: 5,
    title: "Classical Music Evening",
    location: "Carnegie Hall, NYC",
    fullAddress: "881 7th Avenue, New York, NY 10019",
    date: "Aug 5, 2024",
    time: "7:30 PM - 10:00 PM",
    price: 75,
    originalPrice: 95,
    images: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    attendees: 1200,
    maxCapacity: 1400,
    rating: 4.9,
    totalReviews: 342,
    category: "Music",
    tags: ["Classical", "Elegant", "Historic Venue", "Cultural"],
    description: `Experience the magic of classical music in the world's most prestigious concert hall. An evening of timeless compositions performed by world-renowned musicians.

Program highlights:
    • Beethoven Symphony No. 9
    • Mozart Piano Concerto No. 21
    • Vivaldi's Four Seasons
    • Special guest solo performances

Venue features:
    • Historic Carnegie Hall acoustics
    • Pre-concert wine reception
    • Program notes and insights
    • Meet-the-artist opportunity
    • Commemorative program booklet`,

    lineup: [
      {
        name: "NY Philharmonic Orchestra",
        time: "8:00 PM",
        stage: "Main Stage",
      },
      { name: "Piano Solo - Maria Chen", time: "8:45 PM", stage: "Main Stage" },
      { name: "Symphony Finale", time: "9:30 PM", stage: "Main Stage" },
    ],

    host: {
      name: "Carnegie Hall",
      avatar:
        "https://images.unsplash.com/photo-1514533212735-5df27644bf04?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      verified: true,
      rating: 4.9,
      eventsHosted: 1200,
      bio: "America's most prestigious concert hall, hosting the world's finest artists since 1891.",
      followers: 89000,
    },

    reviews: [
      {
        id: 1,
        name: "Robert Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Absolutely transcendent performance! The acoustics at Carnegie Hall are unmatched. This was a once-in-a-lifetime musical experience.",
        helpful: 89,
      },
    ],

    ticketTypes: [
      {
        id: 1,
        name: "Orchestra Seating",
        price: 75,
        originalPrice: 95,
        features: ["Premium Orchestra View", "Program", "Wine Reception"],
        available: 156,
        popular: true,
      },
      {
        id: 2,
        name: "Box Seats",
        price: 150,
        originalPrice: 200,
        features: [
          "Private Box for 4",
          "Champagne Service",
          "Meet & Greet",
          "Exclusive Lounge Access",
        ],
        available: 8,
        popular: false,
      },
    ],
  },
  6: {
    id: 6,
    title: "Startup Pitch Competition",
    location: "Austin, TX",
    fullAddress: "500 Innovation Blvd, Austin, TX 78701",
    date: "Sep 18, 2024",
    time: "6:00 PM - 10:00 PM",
    price: 35,
    originalPrice: 50,
    images: [
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    attendees: 300,
    maxCapacity: 400,
    rating: 4.5,
    totalReviews: 78,
    category: "Business",
    tags: ["Startups", "Networking", "Investment", "Innovation"],
    description: `Watch the next generation of entrepreneurs pitch their game-changing ideas to top investors. Network with founders, VCs, and innovation enthusiasts in Austin's thriving startup ecosystem.

Event highlights:
    • 20 pre-selected startup pitches
    • $100K investment prize pool
    • Panel of renowned investors
    • Networking reception
    • Live audience voting

Why attend:
    • Scout emerging investment opportunities
    • Connect with innovative founders
    • Learn from successful entrepreneurs
    �� Experience Austin's startup culture
    • Exclusive investor meetups`,

    lineup: [
      { name: "Pitch Round 1", time: "6:30 PM", stage: "Main Stage" },
      { name: "Investor Panel", time: "8:00 PM", stage: "Main Stage" },
      { name: "Finals & Awards", time: "9:00 PM", stage: "Main Stage" },
    ],

    host: {
      name: "Austin Startup Week",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      verified: true,
      rating: 4.6,
      eventsHosted: 45,
      bio: "Connecting Austin's entrepreneurial ecosystem through premier startup events.",
      followers: 12300,
    },

    reviews: [
      {
        id: 1,
        name: "Mike Johnson",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 4,
        date: "1 month ago",
        comment:
          "Great energy and some really innovative startups! The networking was fantastic and I made several valuable connections.",
        helpful: 15,
      },
    ],

    ticketTypes: [
      {
        id: 1,
        name: "General Admission",
        price: 35,
        originalPrice: 50,
        features: ["Event Access", "Networking Reception", "Voting Rights"],
        available: 89,
        popular: true,
      },
    ],
  },
  7: {
    id: 7,
    title: "Art Gallery Opening",
    location: "SoHo, NYC",
    fullAddress: "456 Art Street, New York, NY 10013",
    date: "Oct 5, 2024",
    time: "6:00 PM - 10:00 PM",
    price: 45,
    originalPrice: 60,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    attendees: 150,
    maxCapacity: 200,
    rating: 4.6,
    totalReviews: 45,
    category: "Art",
    tags: ["Contemporary Art", "Gallery", "Cultural", "Exclusive"],
    description: `Discover emerging contemporary artists in SoHo's newest gallery space. An exclusive opening showcasing revolutionary artworks that challenge conventional boundaries.

Featured exhibitions:
    • "Digital Dreams" - AI-generated art collection
    • "Urban Landscapes" - Street photography series
    • "Abstract Emotions" - Mixed media installations
    • Live painting demonstrations
    • Artist meet-and-greet sessions

Gallery experience:
    • Curated wine and cheese selection
    • Artist talks and insights
    • First purchase opportunities
    • Professional art photography
    • Collector networking lounge`,

    lineup: [
      { name: "Gallery Tour", time: "6:30 PM", stage: "Main Gallery" },
      { name: "Artist Panel", time: "7:30 PM", stage: "Discussion Area" },
      { name: "Live Painting Demo", time: "8:30 PM", stage: "Studio Space" },
    ],

    host: {
      name: "SoHo Contemporary Gallery",
      avatar:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      verified: true,
      rating: 4.7,
      eventsHosted: 23,
      bio: "Showcasing cutting-edge contemporary art in the heart of NYC's art district.",
      followers: 5600,
    },

    reviews: [
      {
        id: 1,
        name: "Anna Williams",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b9e2b36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Absolutely stunning collection! The artists were so approachable and the gallery space is beautifully curated. A must-visit for art lovers!",
        helpful: 12,
      },
    ],

    ticketTypes: [
      {
        id: 1,
        name: "Art Enthusiast",
        price: 45,
        originalPrice: 60,
        features: ["Gallery Access", "Wine & Cheese", "Artist Meet & Greet"],
        available: 34,
        popular: true,
      },
    ],
  },
  8: {
    id: 8,
    title: "Yoga & Meditation Retreat",
    location: "Sedona, AZ",
    fullAddress: "789 Red Rock Road, Sedona, AZ 86336",
    date: "Oct 15, 2024",
    time: "8:00 AM - 6:00 PM",
    price: 299,
    originalPrice: 399,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    attendees: 50,
    maxCapacity: 60,
    rating: 4.8,
    totalReviews: 67,
    category: "Wellness",
    tags: ["Wellness", "Meditation", "Nature", "Spiritual"],
    description: `Find inner peace and rejuvenation in Sedona's mystical red rock landscape. A transformative day-long retreat combining yoga, meditation, and spiritual healing practices.

Retreat schedule:
    • Morning sunrise yoga session
    • Guided meditation in nature
    • Healing crystal workshops
    • Healthy gourmet lunch
    • Sound bath healing session

What's included:
    • All yoga equipment provided
    • Organic vegetarian meals
    • Crystal healing kit take-home
    • Professional wellness photography
    • Access to sacred vortex sites`,

    lineup: [
      { name: "Sunrise Yoga", time: "8:00 AM", stage: "Red Rock Vista" },
      { name: "Meditation Circle", time: "10:00 AM", stage: "Sacred Grove" },
      { name: "Crystal Healing", time: "2:00 PM", stage: "Energy Center" },
      { name: "Sound Bath", time: "4:00 PM", stage: "Healing Dome" },
    ],

    host: {
      name: "Sedona Wellness Center",
      avatar:
        "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      verified: true,
      rating: 4.9,
      eventsHosted: 156,
      bio: "Guiding souls to inner peace through transformative wellness experiences in Sedona.",
      followers: 18900,
    },

    reviews: [
      {
        id: 1,
        name: "Sarah Patel",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "1 week ago",
        comment:
          "Life-changing experience! The combination of Sedona's energy and expert guidance created the perfect healing environment. I left feeling completely renewed.",
        helpful: 28,
      },
    ],

    ticketTypes: [
      {
        id: 1,
        name: "Full Retreat",
        price: 299,
        originalPrice: 399,
        features: ["All Sessions", "Meals", "Materials", "Crystal Kit"],
        available: 8,
        popular: true,
      },
    ],
  },
};

const BookingModal = ({
  isOpen,
  onClose,
  event,
}: {
  isOpen: boolean;
  onClose: () => void;
  event: any;
}) => {
  const [selectedTicket, setSelectedTicket] = useState(event.ticketTypes[0]);
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState(1); // 1: ticket selection, 2: details, 3: payment

  const total = selectedTicket.price * quantity;
  const savings =
    (selectedTicket.originalPrice - selectedTicket.price) * quantity;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-0 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-orange bg-clip-text text-transparent">
            Book Your Spot! 🎟️
          </DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="p-6"
        >
          {/* Step Progress */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((stepNum) => (
                <motion.div
                  key={stepNum}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= stepNum
                      ? "bg-gradient-to-r from-instagram-pink to-instagram-purple text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {stepNum}
                </motion.div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Choose Your Experience
              </h3>
              {event.ticketTypes.map((ticket: any) => (
                <motion.div
                  key={ticket.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedTicket.id === ticket.id
                      ? "border-instagram-pink bg-gradient-to-r from-instagram-pink/10 to-instagram-purple/10"
                      : "border-gray-200 hover:border-instagram-purple/50"
                  }`}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  {ticket.popular && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2"
                    >
                      <Badge className="bg-gradient-to-r from-genz-sunset to-instagram-yellow text-white px-3 py-1 rounded-full">
                        <Crown className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </motion.div>
                  )}

                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                        {ticket.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {ticket.available} left
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          ${ticket.price}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          ${ticket.originalPrice}
                        </span>
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400 font-semibold">
                        Save ${ticket.originalPrice - ticket.price}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {ticket.features.map((feature: string, index: number) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="w-1.5 h-1.5 bg-gradient-to-r from-instagram-pink to-instagram-purple rounded-full"
                        />
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Quantity Selector */}
              <div className="flex items-center justify-between p-4 bg-white/80 dark:bg-gray-700/60 rounded-2xl">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Quantity:
                </span>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-instagram-pink to-instagram-purple text-white flex items-center justify-center font-bold"
                  >
                    -
                  </motion.button>
                  <span className="text-xl font-bold w-8 text-center text-gray-900 dark:text-gray-100">
                    {quantity}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-instagram-pink to-instagram-purple text-white flex items-center justify-center font-bold"
                  >
                    +
                  </motion.button>
                </div>
              </div>

              {/* Total */}
              <motion.div
                className="p-4 bg-gradient-to-r from-instagram-pink/10 to-instagram-purple/10 dark:from-instagram-pink/20 dark:to-instagram-purple/20 rounded-2xl"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    ${total}
                  </span>
                </div>
                {savings > 0 && (
                  <div className="text-sm text-green-600 dark:text-green-400 text-center">
                    🎉 You're saving ${savings} with this deal!
                  </div>
                )}
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => setStep(2)}
                  className="w-full bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-orange hover:from-instagram-purple hover:to-instagram-pink text-white rounded-2xl py-6 text-lg font-bold shadow-2xl"
                >
                  Continue to Details
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Your Details
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="First Name" className="rounded-xl" />
                <Input placeholder="Last Name" className="rounded-xl" />
              </div>

              <Input
                placeholder="Email Address"
                type="email"
                className="rounded-xl"
              />
              <Input
                placeholder="Phone Number"
                type="tel"
                className="rounded-xl"
              />

              <Textarea
                placeholder="Any special requirements or questions?"
                className="rounded-xl min-h-[100px]"
              />

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-xl"
                >
                  Back
                </Button>
                <motion.div
                  className="flex-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => setStep(3)}
                    className="w-full bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-orange text-white rounded-xl"
                  >
                    Continue to Payment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Payment & Confirmation
              </h3>

              {/* Order Summary */}
              <div className="p-4 bg-white/80 dark:bg-gray-700/60 rounded-2xl space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-900 dark:text-gray-100">
                    {selectedTicket.name} × {quantity}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    ${total}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Processing Fee</span>
                  <span>$5.99</span>
                </div>
                <hr className="border-gray-300 dark:border-gray-600" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900 dark:text-gray-100">
                    Total
                  </span>
                  <span className="text-gray-900 dark:text-gray-100">
                    ${total + 5.99}
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  Payment Method
                </h4>
                {[
                  "💳 Credit Card",
                  "📱 Apple Pay",
                  "🔵 PayPal",
                  "💰 Google Pay",
                ].map((method) => (
                  <motion.div
                    key={method}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="p-3 border border-gray-200 dark:border-gray-600 rounded-xl cursor-pointer hover:border-instagram-purple/50 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    {method}
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1 rounded-xl"
                >
                  Back
                </Button>
                <motion.div
                  className="flex-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => {
                      // Simulate booking success
                      setTimeout(() => {
                        alert(
                          "🎉 AMAZING! Your booking is confirmed! 🎟️\n\n✅ Tickets sent to your email\n🎁 You've saved $" +
                            (event.originalPrice - event.price) +
                            "!\n📱 Add to calendar reminder sent\n🔥 Get ready for an EPIC experience!\n\nSee you there! 🚀",
                        );
                        onClose();
                      }, 1000);
                    }}
                    className="w-full bg-gradient-to-r from-genz-mint via-instagram-blue to-genz-cyber text-white rounded-xl font-bold py-3"
                  >
                    Complete Booking 🎟️
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default function EventDetail() {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const heroRef = useRef(null);
  const event = id
    ? eventData[id as unknown as keyof typeof eventData]
    : undefined;

  const { scrollYProgress } = useScroll({
    target: event ? heroRef : undefined,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-instagram-pink/20 to-instagram-purple/20 dark:from-gray-900 dark:via-purple-900/10 dark:to-pink-900/10">
        <motion.div
          className="text-center max-w-md mx-auto px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-24 h-24 bg-gradient-to-r from-instagram-pink to-instagram-purple rounded-full flex items-center justify-center mx-auto mb-6"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <span className="text-4xl">🎭</span>
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Oops! Event Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The event you're looking for might have been moved, deleted, or the
            link might be incorrect. Let's get you back to discovering amazing
            events!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r from-instagram-pink to-instagram-purple text-white rounded-2xl px-8 py-3 font-bold">
                  🎉 Browse All Events
                </Button>
              </motion.div>
            </Link>
            <Link to="/dashboard">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="rounded-2xl px-8 py-3 font-bold border-2 border-instagram-purple text-instagram-purple hover:bg-instagram-purple hover:text-white"
                >
                  🚀 Create Event
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/30 dark:to-pink-900/25">
      {/* Hero Section with Parallax */}
      <motion.section
        ref={heroRef}
        className="relative h-[70vh] overflow-hidden"
        style={{ y, opacity }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src={event.images[currentImageIndex]}
            alt={`${event.title} - Event image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Back Button */}
        <motion.div
          className="absolute top-24 left-6 z-20"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/events">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 rounded-2xl"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          </Link>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="absolute top-24 right-6 z-20 flex gap-2"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={`bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 rounded-2xl ${
                isLiked ? "text-red-400" : "text-white"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSaved(!isSaved)}
              className={`bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 rounded-2xl ${
                isSaved ? "text-yellow-400" : "text-white"
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`}
              />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 rounded-2xl"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Image Navigation */}
        {event.images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            {event.images.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        )}

        {/* Hero Content */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-6 text-white"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Badge className="mb-4 bg-gradient-to-r from-instagram-pink to-instagram-orange text-white rounded-full px-4 py-2">
                {event.category}
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-black mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {event.title}
            </motion.h1>

            <motion.div
              className="flex flex-wrap items-center gap-6 text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {event.date} • {event.time}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {event.location}
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {event.attendees.toLocaleString()} going
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2"
            >
              {event.tags.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Badge
                    variant="outline"
                    className="rounded-full px-4 py-2 bg-white/80 backdrop-blur-sm"
                  >
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            {/* Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm rounded-2xl p-1">
                <TabsTrigger
                  value="details"
                  className="rounded-xl font-semibold"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="lineup"
                  className="rounded-xl font-semibold"
                >
                  Lineup
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-xl font-semibold"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <Card className="bg-white/80 backdrop-blur-sm rounded-2xl border-0 shadow-xl">
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-instagram-pink to-instagram-purple bg-clip-text text-transparent">
                        About This Event
                      </h3>
                      <div className="prose prose-gray max-w-none">
                        {event.description
                          .split("\n")
                          .map((paragraph, index) => (
                            <motion.p
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="mb-4 text-gray-700 leading-relaxed"
                            >
                              {paragraph}
                            </motion.p>
                          ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Location Details */}
                  <Card className="bg-white/80 backdrop-blur-sm rounded-2xl border-0 shadow-xl">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-instagram-pink" />
                        Location & Venue
                      </h3>
                      <div className="space-y-3">
                        <p className="text-lg font-semibold">
                          {event.location}
                        </p>
                        <p className="text-gray-600">{event.fullAddress}</p>
                        <motion.div
                          className="h-48 bg-gray-200 rounded-xl overflow-hidden"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="w-full h-full bg-gradient-to-br from-instagram-pink/20 to-instagram-purple/20 flex items-center justify-center">
                            <p className="text-gray-600">
                              🗺️ Interactive Map Coming Soon
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="lineup" className="mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {event.lineup.map((artist, index) => (
                    <motion.div
                      key={artist.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                    >
                      <Card className="bg-white/80 backdrop-blur-sm rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <motion.div
                                className="w-16 h-16 bg-gradient-to-br from-instagram-pink to-instagram-purple rounded-2xl flex items-center justify-center"
                                whileHover={{ rotate: 5, scale: 1.1 }}
                              >
                                <Music className="w-8 h-8 text-white" />
                              </motion.div>
                              <div>
                                <h4 className="text-xl font-bold">
                                  {artist.name}
                                </h4>
                                <p className="text-gray-600">{artist.stage}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-gradient-to-r from-genz-cyber to-instagram-blue text-white rounded-full px-4 py-2">
                                {artist.time}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Rating Summary */}
                  <Card className="bg-white/80 backdrop-blur-sm rounded-2xl border-0 shadow-xl">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-center">
                          <div className="text-5xl font-black text-instagram-purple mb-2">
                            {event.rating}
                          </div>
                          <div className="flex justify-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-6 h-6 ${
                                  i < Math.floor(event.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600">
                            {event.totalReviews} reviews
                          </p>
                        </div>
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((stars) => (
                            <div
                              key={stars}
                              className="flex items-center gap-3"
                            >
                              <span className="text-sm font-medium w-8">
                                {stars}���
                              </span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-instagram-pink to-instagram-purple"
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: `${stars === 5 ? 75 : stars === 4 ? 20 : 5}%`,
                                  }}
                                  transition={{
                                    delay: stars * 0.1,
                                    duration: 0.5,
                                  }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 w-8">
                                {stars === 5
                                  ? "75%"
                                  : stars === 4
                                    ? "20%"
                                    : "5%"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Individual Reviews */}
                  <div className="space-y-4">
                    {event.reviews.map((review, index) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="bg-white/80 backdrop-blur-sm rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <Avatar className="w-12 h-12">
                                <AvatarImage
                                  src={review.avatar}
                                  alt={review.name}
                                />
                                <AvatarFallback>
                                  {review.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold">
                                    {review.name}
                                  </h4>
                                  <span className="text-sm text-gray-500">
                                    {review.date}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <p className="text-gray-700 mb-3">
                                  {review.comment}
                                </p>
                                {review.images && (
                                  <div className="flex gap-2 mb-3">
                                    {review.images.map((image, imgIndex) => (
                                      <Image
                                        key={imgIndex}
                                        src={image}
                                        alt={`Review photo by ${review.name}`}
                                        className="w-20 h-20 object-cover rounded-xl"
                                        animated={true}
                                        whileHover={{ scale: 1.1 }}
                                      />
                                    ))}
                                  </div>
                                )}
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-1 hover:text-instagram-pink"
                                  >
                                    👍 Helpful ({review.helpful})
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-1 hover:text-instagram-pink"
                                  >
                                    💬 Reply
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking & Host Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl border-0 shadow-2xl sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-4xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                        ${event.price}
                      </span>
                      <span className="text-xl text-gray-500 line-through">
                        ${event.originalPrice}
                      </span>
                    </div>
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    >
                      <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full px-6 py-2 text-lg font-black">
                        🔥 LIMITED TIME:{" "}
                        {Math.round(
                          ((event.originalPrice - event.price) /
                            event.originalPrice) *
                            100,
                        )}
                        % OFF!
                      </Badge>
                    </motion.div>
                    <p className="text-sm text-red-600 font-bold mt-2 animate-pulse">
                      ⚠️ Only {event.maxCapacity - event.attendees} spots left!
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Availability:
                      </span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {event.maxCapacity - event.attendees} spots left
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-instagram-pink to-instagram-orange h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(event.attendees / event.maxCapacity) * 100}%`,
                        }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                      {event.attendees.toLocaleString()} of{" "}
                      {event.maxCapacity.toLocaleString()} spots taken
                    </p>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => setIsBookingOpen(true)}
                      className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white rounded-2xl py-6 text-xl font-black shadow-2xl transform transition-all duration-300 hover:scale-105"
                    >
                      🎟️ SECURE MY SPOT NOW!
                    </Button>
                  </motion.div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                    ✅ Free cancellation until 24h before event
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Host Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border-0 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                    Event Host
                  </h3>
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={event.host.avatar}
                          alt={event.host.name}
                        />
                        <AvatarFallback>{event.host.name[0]}</AvatarFallback>
                      </Avatar>
                      {event.host.verified && (
                        <motion.div
                          className="absolute -top-1 -right-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <Shield className="w-3 h-3 text-white" />
                          </div>
                        </motion.div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{event.host.name}</h4>
                        {event.host.verified && (
                          <Badge
                            variant="outline"
                            className="text-xs px-2 py-0"
                          >
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        {event.host.rating} • {event.host.eventsHosted} events
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {event.host.bio}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">
                          {event.host.followers.toLocaleString()} followers
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="text-instagram-purple font-semibold"
                        >
                          Follow
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Share & Save */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm rounded-2xl border-0 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Share This Event</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        name: "Instagram",
                        icon: "📸",
                        gradient: "from-instagram-pink to-instagram-purple",
                      },
                      {
                        name: "TikTok",
                        icon: "🎵",
                        gradient: "from-gray-900 to-red-600",
                      },
                      {
                        name: "Snapchat",
                        icon: "👻",
                        gradient: "from-yellow-400 to-yellow-500",
                      },
                      {
                        name: "WhatsApp",
                        icon: "💬",
                        gradient: "from-green-500 to-green-600",
                      },
                    ].map((platform) => (
                      <motion.button
                        key={platform.name}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 rounded-xl bg-gradient-to-r ${platform.gradient} text-white text-center font-semibold shadow-lg`}
                      >
                        <div className="text-2xl mb-1">{platform.icon}</div>
                        <div className="text-xs">{platform.name}</div>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        event={event}
      />
    </div>
  );
}
