import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GenZFloatingElements } from "@/components/GenZFloatingElements";
import { FunctionalSearch } from "@/components/FunctionalSearch";
import { useTheme } from "next-themes";

// Mock event data
const featuredEvents = [
  {
    id: 1,
    title: "Summer Music Festival 2024",
    location: "Central Park, NYC",
    date: "Jul 15, 2024",
    price: "$89",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    attendees: 2500,
    rating: 4.8,
    category: "Music",
  },
  {
    id: 2,
    title: "Tech Innovation Summit",
    location: "Silicon Valley, CA",
    date: "Aug 22, 2024",
    price: "$299",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    attendees: 800,
    rating: 4.9,
    category: "Technology",
  },
  {
    id: 3,
    title: "Food & Wine Experience",
    location: "Napa Valley, CA",
    date: "Sep 10, 2024",
    price: "$149",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    attendees: 300,
    rating: 4.7,
    category: "Food & Drink",
  },
  {
    id: 4,
    title: "Art Gallery Opening",
    location: "SoHo, NYC",
    date: "Oct 5, 2024",
    price: "$45",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    attendees: 150,
    rating: 4.6,
    category: "Art",
  },
  {
    id: 5,
    title: "Startup Networking Night",
    location: "Austin, TX",
    date: "Nov 12, 2024",
    price: "$25",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    attendees: 200,
    rating: 4.5,
    category: "Business",
  },
  {
    id: 6,
    title: "Wellness Retreat Weekend",
    location: "Big Sur, CA",
    date: "Dec 3, 2024",
    price: "$399",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    attendees: 50,
    rating: 4.9,
    category: "Wellness",
  },
];

const EventCard = ({
  event,
  index,
}: {
  event: (typeof featuredEvents)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group"
    >
      <Card className="overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="relative overflow-hidden">
          <motion.img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800">
              {event.category}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <motion.div
              className="bg-white/90 dark:bg-gray-800/90 rounded-full p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
            </motion.div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
            <Calendar className="w-4 h-4" />
            {event.date}
          </div>

          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {event.title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <MapPin className="w-4 h-4" />
            {event.location}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-bold text-xl text-gray-900 dark:text-gray-100">
                {event.price}
              </span>
              <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4" />
                {event.attendees}
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
              <Link to={`/event/${event.id}`}>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white rounded-xl shadow-lg font-bold transition-all duration-200 whitespace-nowrap"
                >
                  🎟️ Get Tickets
                </Button>
              </Link>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Index() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-unclub-blue/15 via-unclub-pink/15 to-unclub-red/15 dark:from-gray-900 dark:via-unclub-blue/20 dark:to-unclub-pink/15">
      {/* GenZ Floating Elements */}
      <GenZFloatingElements />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-unclub-blue/40 to-unclub-pink/40 dark:from-unclub-blue/30 dark:to-unclub-pink/30 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-unclub-red/40 to-party-pink/40 dark:from-unclub-red/30 dark:to-party-pink/30 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative px-6 pt-24 sm:pt-28 pb-16">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="display-text text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent mb-6">
              Discover Epic
              <br />
              <span className="relative">
                <motion.span
                  className="display-text"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(168, 85, 247, 0.4)",
                      "0 0 40px rgba(236, 72, 153, 0.6)",
                      "0 0 20px rgba(239, 68, 68, 0.4)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Events! 🎉
                </motion.span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="body-text text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Join thousands discovering{" "}
            <span className="font-bold text-purple-600">amazing events</span>{" "}
            and creating
            <span className="font-bold text-pink-600">
              {" "}
              unforgettable memories
            </span>{" "}
            every day! Whether you want to{" "}
            <span className="font-bold text-red-600">attend</span> or{" "}
            <span className="font-bold text-green-600">host</span> - we've got
            you covered! ✨
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/events">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white px-12 py-6 text-xl font-black rounded-3xl shadow-2xl"
                >
                  🎟️ FIND EVENTS
                </Button>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-12 py-6 text-xl font-black rounded-3xl shadow-2xl"
                >
                  🚀 HOST EVENT
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <FunctionalSearch />
        </div>
      </section>

      {/* Discover Epic Events Section */}
      <section className="relative px-6 py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="display-text text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4 leading-tight">
              🎉 Discover Epic Events 🎉
            </h2>
            <p className="accent-text text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From intimate gatherings to massive festivals - find your next unforgettable experience in both light and dark modes! Join thousands discovering amazing events every day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="relative px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="display-text text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              ���� Trending Events Right Now
            </h2>
            <p className="accent-text text-lg text-gray-600 dark:text-gray-400">
              These events are selling out fast - grab your spot before it's too
              late!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/events">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-unclub-blue via-unclub-pink to-unclub-red hover:from-unclub-pink hover:to-unclub-blue text-white px-8 py-3 rounded-2xl font-semibold shadow-xl"
                >
                  Find More Parties
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative px-6 py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Events Listed", icon: Calendar },
              { number: "1M+", label: "Happy Attendees", icon: Users },
              { number: "500+", label: "Cities Covered", icon: MapPin },
              { number: "4.9", label: "Average Rating", icon: Star },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-unclub-blue via-unclub-pink to-unclub-red text-white rounded-2xl mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <stat.icon className="w-8 h-8" />
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
