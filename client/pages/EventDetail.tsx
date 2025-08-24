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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Mock event data with more details
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-purple-50 to-pink-50 border-0 rounded-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <motion.h2
              className="text-2xl font-bold bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-orange bg-clip-text text-transparent"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
            >
              Book Your Spot! 🎟️
            </motion.h2>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
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
                      <h4 className="font-bold text-lg">{ticket.name}</h4>
                      <p className="text-sm text-gray-600">
                        {ticket.available} left
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          ${ticket.price}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ${ticket.originalPrice}
                        </span>
                      </div>
                      <div className="text-xs text-green-600 font-semibold">
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
                        className="flex items-center gap-2 text-sm"
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
              <div className="flex items-center justify-between p-4 bg-white/80 rounded-2xl">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-instagram-pink to-instagram-purple text-white flex items-center justify-center font-bold"
                  >
                    -
                  </motion.button>
                  <span className="text-xl font-bold w-8 text-center">
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
                className="p-4 bg-gradient-to-r from-instagram-pink/10 to-instagram-purple/10 rounded-2xl"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Total:</span>
                  <span className="text-2xl font-bold">${total}</span>
                </div>
                {savings > 0 && (
                  <div className="text-sm text-green-600 text-center">
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Payment & Confirmation
              </h3>

              {/* Order Summary */}
              <div className="p-4 bg-white/80 rounded-2xl space-y-3">
                <div className="flex justify-between">
                  <span>
                    {selectedTicket.name} × {quantity}
                  </span>
                  <span className="font-semibold">${total}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Processing Fee</span>
                  <span>$5.99</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total + 5.99}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h4 className="font-semibold">Payment Method</h4>
                {[
                  "💳 Credit Card",
                  "📱 Apple Pay",
                  "🔵 PayPal",
                  "💰 Google Pay",
                ].map((method) => (
                  <motion.div
                    key={method}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-instagram-purple/50 transition-colors"
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
                          "🎉 AMAZING! Your booking is confirmed! 🎟️\n\n✅ Tickets sent to your email\n🎁 You've saved $" + (event.originalPrice - event.price) + "!\n📱 Add to calendar reminder sent\n🔥 Get ready for an EPIC experience!\n\nSee you there! 🚀"
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
  const event = id ? eventData[id as unknown as keyof typeof eventData] : undefined;

  const { scrollYProgress } = useScroll({
    target: event ? heroRef : undefined,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-instagram-pink/20 to-instagram-purple/20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Event Not Found
          </h1>
          <Link to="/events">
            <Button className="bg-gradient-to-r from-instagram-pink to-instagram-purple text-white rounded-2xl">
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50">
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
              <Card className="bg-white/90 backdrop-blur-sm rounded-3xl border-0 shadow-2xl sticky top-24">
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
                        🔥 LIMITED TIME: {" "}
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
                      <span className="text-gray-600">Availability:</span>
                      <span className="font-semibold text-green-600">
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

                    <p className="text-xs text-gray-600 text-center">
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

                  <p className="text-xs text-gray-500 text-center mt-3">
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
              <Card className="bg-white/80 backdrop-blur-sm rounded-2xl border-0 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Event Host</h3>
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
