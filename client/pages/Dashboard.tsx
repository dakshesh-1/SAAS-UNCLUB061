import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Plus,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Star,
  Edit,
  Trash2,
  Eye,
  Settings,
  BarChart3,
  MapPin,
  Clock,
  Image,
  Music,
  Coffee,
  Camera,
  Heart,
  Share2,
  Filter,
  ChevronDown,
  Download,
  Upload,
  Bell,
  Crown,
  Zap,
  Sparkles,
  Rocket,
  PartyPopper,
  Gift,
  Target,
  Trophy,
  Flame,
  Magic,
  Megaphone,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Send,
  Gauge,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

// Enhanced stats with more compelling data
const dashboardStats = [
  {
    title: "Events Created",
    value: "47",
    change: "+12%",
    trend: "up",
    icon: PartyPopper,
    gradient: "from-pink-500 via-purple-500 to-indigo-500",
    description: "Your parties are legendary!",
  },
  {
    title: "Happy Attendees",
    value: "15.2K",
    change: "+23%",
    trend: "up",
    icon: Heart,
    gradient: "from-red-500 via-pink-500 to-rose-500",
    description: "People love your events!",
  },
  {
    title: "Total Earnings",
    value: "$89.5K",
    change: "+18%",
    trend: "up",
    icon: Trophy,
    gradient: "from-yellow-400 via-orange-500 to-red-500",
    description: "Money & memories made!",
  },
  {
    title: "Success Rate",
    value: "98%",
    change: "+0.2",
    trend: "up",
    icon: Target,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    description: "Nearly perfect events!",
  },
];

// Enhanced event data with more interactive details
const recentEvents = [
  {
    id: 1,
    title: "Epic Summer Music Festival 🎵",
    date: "Jul 15, 2024",
    attendees: 2500,
    capacity: 3000,
    revenue: "$12,450",
    profit: "$8,200",
    status: "sold-out",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    category: "Music",
    rating: 4.9,
    reviews: 247,
    highlights: [
      "Sold Out in 2 Hours",
      "500+ Photos Shared",
      "3 Media Features",
    ],
    socialShares: 1250,
    viewsToday: 89,
    daysUntil: -5, // Past event
    ticketsSold: 2500,
    engagementRate: 94,
  },
  {
    id: 2,
    title: "Exclusive Tech Innovation Summit 🚀",
    date: "Aug 22, 2024",
    attendees: 800,
    capacity: 1000,
    revenue: "$8,900",
    profit: "$6,100",
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    category: "Technology",
    rating: 4.8,
    reviews: 134,
    highlights: ["VIP Networking", "Industry Leaders", "Premium Location"],
    socialShares: 892,
    viewsToday: 156,
    daysUntil: 28,
    ticketsSold: 800,
    engagementRate: 87,
  },
  {
    id: 3,
    title: "Luxury Food & Wine Experience 🍷",
    date: "Sep 10, 2024",
    attendees: 300,
    capacity: 350,
    revenue: "$4,200",
    profit: "$2,800",
    status: "filling-fast",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    category: "Food & Drink",
    rating: 4.7,
    reviews: 89,
    highlights: ["5-Star Catering", "Wine Tastings", "Celebrity Chef"],
    socialShares: 445,
    viewsToday: 67,
    daysUntil: 47,
    ticketsSold: 300,
    engagementRate: 91,
  },
];

// Success stories and achievements
const achievements = [
  {
    icon: "🏆",
    title: "Host of the Month",
    description: "Recognized for outstanding events",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: "💎",
    title: "Premium Host",
    description: "Top 1% of event creators",
    color: "from-blue-400 to-purple-500",
  },
  {
    icon: "🌟",
    title: "5-Star Rating",
    description: "Consistently amazing feedback",
    color: "from-pink-400 to-red-500",
  },
  {
    icon: "🚀",
    title: "Viral Event",
    description: "Last event shared 10K+ times",
    color: "from-green-400 to-teal-500",
  },
];

// Enhanced Create Event Modal with better UX
const CreateEventModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = useState(1);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    location: "",
    price: "",
    capacity: "",
    tags: [] as string[],
  });

  const categories = [
    {
      name: "Music & Concerts",
      icon: "🎵",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Tech & Innovation",
      icon: "💻",
      color: "from-blue-500 to-cyan-500",
    },
    { name: "Food & Drink", icon: "🍽️", color: "from-orange-500 to-red-500" },
    { name: "Art & Culture", icon: "🎨", color: "from-pink-500 to-purple-500" },
    {
      name: "Business & Networking",
      icon: "💼",
      color: "from-gray-600 to-gray-800",
    },
    {
      name: "Health & Wellness",
      icon: "🧘",
      color: "from-green-500 to-teal-500",
    },
    {
      name: "Sports & Fitness",
      icon: "⚽",
      color: "from-blue-500 to-green-500",
    },
    { name: "Parties & Social", icon: "🎉", color: "from-pink-500 to-red-500" },
  ];

  const popularTags = [
    "🌟 Premium",
    "🔥 Hot Event",
    "📸 Instagram-worthy",
    "🎁 Exclusive Access",
    "🍷 VIP Experience",
    "🎵 Live Music",
    "🍕 Food Included",
    "🎪 All Ages",
    "💃 Dancing",
    "🎨 Creative",
    "🏆 Competition",
    "🎯 Networking",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-white via-purple-50/50 to-pink-50/50 border-0 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent text-center">
            ✨ Create Your Epic Event ✨
          </DialogTitle>
          <p className="text-center text-gray-600 text-lg">
            Turn your vision into an unforgettable experience!
          </p>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8"
        >
          {/* Enhanced Progress Steps */}
          <div className="flex items-center justify-center gap-6 mb-10">
            {[
              { num: 1, label: "🎯 Concept", desc: "What's your vision?" },
              { num: 2, label: "📝 Details", desc: "Fill in the magic" },
              { num: 3, label: "🚀 Launch", desc: "Share with the world" },
            ].map((stepInfo) => (
              <motion.div
                key={stepInfo.num}
                className={`flex flex-col items-center gap-2 ${stepInfo.num <= step ? "text-purple-600" : "text-gray-400"}`}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg ${
                    stepInfo.num <= step
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepInfo.num}
                </div>
                <div className="text-center">
                  <div className="font-bold text-sm">{stepInfo.label}</div>
                  <div className="text-xs opacity-70">{stepInfo.desc}</div>
                </div>
                {stepInfo.num < 3 && (
                  <div className="w-20 h-px bg-gradient-to-r from-purple-300 to-pink-300" />
                )}
              </motion.div>
            ))}
          </div>

          {step === 1 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  🌟 What Amazing Event Will You Create?
                </h3>
                <p className="text-gray-600">
                  Choose your category and let's build something incredible
                  together!
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {categories.map((cat, index) => (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      setEventData({ ...eventData, category: cat.name })
                    }
                    className={`cursor-pointer p-6 rounded-2xl text-center border-2 transition-all duration-300 ${
                      eventData.category === cat.name
                        ? "border-purple-500 bg-gradient-to-br from-purple-100 to-pink-100 shadow-xl"
                        : "border-gray-200 hover:border-purple-300 hover:shadow-lg bg-white"
                    }`}
                  >
                    <div className="text-3xl mb-3">{cat.icon}</div>
                    <h4 className="font-bold text-sm text-gray-900">
                      {cat.name}
                    </h4>
                    {eventData.category === cat.name && (
                      <motion.div
                        className="mt-3"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Badge
                          className={`bg-gradient-to-r ${cat.color} text-white rounded-full`}
                        >
                          Selected ✨
                        </Badge>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="space-y-6 bg-white/70 backdrop-blur-sm rounded-2xl p-6">
                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-3">
                    ✨ Give your event a catchy name
                  </label>
                  <Input
                    placeholder="e.g., 'Epic Summer Rooftop Bash' or 'Exclusive VIP Wine Tasting'"
                    value={eventData.title}
                    onChange={(e) =>
                      setEventData({ ...eventData, title: e.target.value })
                    }
                    className="rounded-2xl h-14 text-lg border-2 border-gray-200 focus:border-purple-500 bg-white/80"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    💡 Tip: Use exciting words that make people want to attend!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-lg font-bold text-gray-700 mb-2">
                      📅 When's the party?
                    </label>
                    <Input
                      type="date"
                      value={eventData.date}
                      onChange={(e) =>
                        setEventData({ ...eventData, date: e.target.value })
                      }
                      className="rounded-2xl h-12 border-2 border-gray-200 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-700 mb-2">
                      ⏰ What time?
                    </label>
                    <Input
                      type="time"
                      value={eventData.time}
                      onChange={(e) =>
                        setEventData({ ...eventData, time: e.target.value })
                      }
                      className="rounded-2xl h-12 border-2 border-gray-200 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-700 mb-2">
                      💰 Ticket price
                    </label>
                    <Input
                      type="number"
                      placeholder="0 for free!"
                      value={eventData.price}
                      onChange={(e) =>
                        setEventData({ ...eventData, price: e.target.value })
                      }
                      className="rounded-2xl h-12 border-2 border-gray-200 focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  🎨 Let's Add the Details That Matter
                </h3>
                <p className="text-gray-600">
                  The magic is in the details - make your event irresistible!
                </p>
              </div>

              <div className="space-y-6 bg-white/70 backdrop-blur-sm rounded-2xl p-6">
                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-3">
                    📍 Where's this amazing event happening?
                  </label>
                  <Input
                    placeholder="e.g., 'Rooftop Terrace at The Grand Hotel' or 'My Backyard Paradise'"
                    value={eventData.location}
                    onChange={(e) =>
                      setEventData({ ...eventData, location: e.target.value })
                    }
                    className="rounded-2xl h-14 text-lg border-2 border-gray-200 focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-bold text-gray-700 mb-3">
                      👥 How many lucky people can attend?
                    </label>
                    <Input
                      type="number"
                      placeholder="e.g., 50, 100, 500"
                      value={eventData.capacity}
                      onChange={(e) =>
                        setEventData({ ...eventData, capacity: e.target.value })
                      }
                      className="rounded-2xl h-12 border-2 border-gray-200 focus:border-purple-500"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      💡 Scarcity creates demand!
                    </p>
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-700 mb-3">
                      🏷️ Add some exciting tags
                    </label>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {popularTags.map((tag) => (
                        <motion.button
                          key={tag}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (eventData.tags.includes(tag)) {
                              setEventData({
                                ...eventData,
                                tags: eventData.tags.filter((t) => t !== tag),
                              });
                            } else {
                              setEventData({
                                ...eventData,
                                tags: [...eventData.tags, tag],
                              });
                            }
                          }}
                          className={`px-3 py-1 rounded-full text-xs border-2 transition-all ${
                            eventData.tags.includes(tag)
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-500"
                              : "bg-white text-gray-700 border-gray-300 hover:border-purple-400"
                          }`}
                        >
                          {tag}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-3">
                    📖 Tell an amazing story about your event
                  </label>
                  <Textarea
                    placeholder="Paint a picture with words! What will people experience? What makes this special? Why should they be excited? Include details about food, music, activities, dress code, what to bring, parking info, etc."
                    value={eventData.description}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        description: e.target.value,
                      })
                    }
                    className="rounded-2xl min-h-[150px] border-2 border-gray-200 focus:border-purple-500 text-lg"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    💡 Great descriptions get 3x more attendees!
                  </p>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-3">
                    ���� Upload some stunning photos
                  </label>
                  <motion.div
                    className="border-2 border-dashed border-purple-300 rounded-2xl p-8 text-center hover:border-purple-500 transition-colors cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <p className="text-purple-600 font-semibold mb-2">
                      📷 Drop your amazing photos here!
                    </p>
                    <p className="text-sm text-gray-600">
                      Show off the venue, food, vibes - make them want to be
                      there!
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 rounded-xl border-purple-300 text-purple-600"
                    >
                      Choose Photos
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  🚀 Ready to Launch Your Epic Event?
                </h3>
                <p className="text-gray-600 text-lg">
                  You're about to create something amazing! Here's how it'll
                  look:
                </p>
              </div>

              {/* Event Preview Card */}
              <Card className="bg-gradient-to-br from-white to-purple-50/50 backdrop-blur-sm rounded-3xl border-0 shadow-2xl overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center relative overflow-hidden">
                  <Camera className="w-20 h-20 text-white/50" />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-purple-600 rounded-full px-4 py-2 font-bold">
                      🔥 {eventData.category || "Your Category"}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full px-4 py-2 font-bold">
                      ⭐ Featured Event
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h2 className="text-3xl font-black text-gray-900 mb-2">
                        {eventData.title || "Your Amazing Event Title"}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {eventData.description ||
                          "Your compelling event description will appear here..."}
                      </p>
                    </div>
                    <div className="text-right ml-6">
                      <div className="text-4xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                        ${eventData.price || "0"}
                      </div>
                      <div className="text-sm text-gray-600 font-semibold">
                        {eventData.capacity || "∞"} spots available
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="font-bold text-blue-600">
                        {eventData.date || "Date TBD"}
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                      <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <div className="font-bold text-purple-600">
                        {eventData.time || "Time TBD"}
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl">
                      <MapPin className="w-6 h-6 text-pink-600 mx-auto mb-2" />
                      <div className="font-bold text-pink-600">
                        {eventData.location || "Location TBD"}
                      </div>
                    </div>
                  </div>

                  {eventData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {eventData.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full px-3 py-1"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold py-4"
                    >
                      🎟️ Get Tickets Now
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-purple-300 text-purple-600 rounded-2xl font-bold py-4"
                    >
                      ❤️ Save Event
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Launch Button */}
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => {
                      setTimeout(() => {
                        alert(
                          "🎉 Congratulations! Your event is now LIVE and ready to take bookings! 🚀\n\nPeople can now discover and book your amazing event. Get ready for an incredible response!",
                        );
                        onClose();
                      }, 1000);
                    }}
                    className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white px-16 py-6 rounded-3xl text-2xl font-black shadow-2xl"
                  >
                    🚀 LAUNCH MY EPIC EVENT! 🎉
                  </Button>
                </motion.div>
                <p className="text-gray-600 mt-4 text-lg">
                  Your event will be live instantly and people can start
                  booking!
                </p>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
            <Button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              variant="outline"
              className="px-8 py-4 rounded-2xl font-bold disabled:opacity-50 text-lg"
            >
              ← Back
            </Button>

            {step < 3 && (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && (!eventData.category || !eventData.title)) ||
                  (step === 2 &&
                    (!eventData.location || !eventData.description))
                }
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold disabled:opacity-50 text-lg"
              >
                Next Step →
              </Button>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [copiedText, setCopiedText] = useState("");
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const safeTheme = mounted ? theme : "dark";

  const handleShare = (event: any) => {
    setSelectedEvent(event);
    setIsShareModalOpen(true);
  };

  const handleEdit = (event: any) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(type);
      toast({
        title: "Copied to clipboard!",
        description: "Link copied successfully.",
      });
      setTimeout(() => setCopiedText(""), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      {/* Mega Hero Section */}
      <motion.div
        className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 60}px`,
                height: `${20 + Math.random() * 60}px`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className="text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(255,255,255,0.5)",
                    "0 0 40px rgba(255,255,255,0.8)",
                    "0 0 20px rgba(255,255,255,0.5)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                CREATE
                <br />
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  EPIC
                </span>
                <br />
                EVENTS! 🚀
              </motion.h1>

              <p className="text-2xl text-white/90 mb-8 leading-relaxed">
                Turn your ideas into{" "}
                <span className="font-bold text-yellow-300">
                  unforgettable experiences
                </span>{" "}
                that people will talk about forever!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-12 py-6 rounded-3xl text-xl font-black shadow-2xl"
                  >
                    🎉 CREATE MY EVENT NOW!
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="border-3 border-white/50 text-white hover:bg-white/10 px-8 py-6 rounded-3xl text-lg font-bold backdrop-blur-sm"
                  >
                    📊 View My Stats
                  </Button>
                </motion.div>
              </div>

              <div className="flex items-center gap-8 mt-8 text-white/80">
                <div className="text-center">
                  <div className="text-3xl font-black text-yellow-300">
                    15.2K
                  </div>
                  <div className="text-sm">Happy Attendees</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-yellow-300">98%</div>
                  <div className="text-sm">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-yellow-300">
                    $89K
                  </div>
                  <div className="text-sm">Earned</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              {/* Achievement Cards */}
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl"
                  >
                    <div className="text-3xl mb-3">{achievement.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {achievement.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Your Event Empire 👑
          </h2>
          <p className="text-xl text-gray-600">
            Look how amazing you're doing! Every number tells a success story.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {dashboardStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group cursor-pointer"
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border-0 shadow-xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl">
                <CardContent className="p-8 text-center">
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${stat.gradient} rounded-3xl flex items-center justify-center shadow-lg mx-auto mb-6`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  <div className="space-y-2">
                    <h3 className="text-4xl font-black text-gray-900 dark:text-white">
                      {stat.value}
                    </h3>
                    <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
                      {stat.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.description}
                    </p>
                    <Badge
                      className={`bg-gradient-to-r ${stat.gradient} text-white rounded-full px-4 py-2 font-bold`}
                    >
                      {stat.change} ↗️
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Events Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border-0 shadow-2xl">
            <CardHeader className="pb-8">
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-purple-500" />
                  Your Epic Events
                </CardTitle>
                <div className="flex items-center gap-3">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full px-4 py-2 font-bold">
                    🔥 {recentEvents.length} Active Events
                  </Badge>
                  <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold px-6 py-3"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create New
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                {recentEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="group p-6 rounded-3xl bg-gradient-to-r from-white to-purple-50/50 border-2 border-transparent hover:border-purple-200 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-center gap-6">
                      <motion.div
                        className="relative overflow-hidden rounded-2xl"
                        whileHover={{ scale: 1.1 }}
                      >
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-24 h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
                      </motion.div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                              {event.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {event.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                {event.rating}
                              </span>
                            </div>
                          </div>

                          <Badge
                            className={`rounded-full px-4 py-2 font-bold ${
                              event.status === "sold-out"
                                ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                                : event.status === "upcoming"
                                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                                  : "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                            }`}
                          >
                            {event.status === "sold-out"
                              ? "🔥 SOLD OUT"
                              : event.status === "upcoming"
                                ? "📅 UPCOMING"
                                : "⚡ FILLING FAST"}
                          </Badge>
                        </div>

                        {/* Enhanced Event Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
                            <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400 mb-1">
                              <Gauge className="w-4 h-4" />
                              <span className="text-xs font-semibold">
                                Capacity
                              </span>
                            </div>
                            <div className="font-bold text-lg text-blue-700 dark:text-blue-300">
                              {Math.round(
                                (event.ticketsSold / event.capacity) * 100,
                              )}
                              %
                            </div>
                            <Progress
                              value={(event.ticketsSold / event.capacity) * 100}
                              className="h-2 mt-1"
                            />
                          </div>
                          <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
                            <div className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400 mb-1">
                              <Activity className="w-4 h-4" />
                              <span className="text-xs font-semibold">
                                Engagement
                              </span>
                            </div>
                            <div className="font-bold text-lg text-green-700 dark:text-green-300">
                              {event.engagementRate}%
                            </div>
                            <div className="text-xs text-green-600 dark:text-green-400">
                              +{event.viewsToday} today
                            </div>
                          </div>
                          <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
                            <div className="flex items-center justify-center gap-1 text-purple-600 dark:text-purple-400 mb-1">
                              <Share2 className="w-4 h-4" />
                              <span className="text-xs font-semibold">
                                Shares
                              </span>
                            </div>
                            <div className="font-bold text-lg text-purple-700 dark:text-purple-300">
                              {event.socialShares}
                            </div>
                            <div className="text-xs text-purple-600 dark:text-purple-400">
                              ⭐ {event.reviews} reviews
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-1 font-semibold">
                              <Users className="w-4 h-4 text-purple-500" />
                              <span className="text-purple-600 dark:text-purple-400">
                                {event.attendees.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 font-semibold">
                              <DollarSign className="w-4 h-4 text-green-500" />
                              <span className="text-green-600 dark:text-green-400">
                                {event.revenue}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 font-semibold">
                              <TrendingUp className="w-4 h-4 text-blue-500" />
                              <span className="text-blue-600 dark:text-blue-400">
                                {event.profit} profit
                              </span>
                            </div>
                            {event.daysUntil > 0 && (
                              <div className="flex items-center gap-1 font-semibold">
                                <Clock className="w-4 h-4 text-orange-500" />
                                <span className="text-orange-600 dark:text-orange-400">
                                  {event.daysUntil}d left
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Link to={`/event/${event.id}`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-xl border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-purple-900/20"
                                  title="View Event Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </Link>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(event)}
                                className="rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20"
                                title="Edit Event"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleShare(event)}
                                className="rounded-xl border-pink-200 text-pink-600 hover:bg-pink-50 dark:border-pink-700 dark:text-pink-400 dark:hover:bg-pink-900/20"
                                title="Share Event"
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Link to={`/event/${event.id}#analytics`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-xl border-green-200 text-green-600 hover:bg-green-50 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900/20"
                                  title="View Analytics"
                                >
                                  <BarChart3 className="w-4 h-4" />
                                </Button>
                              </Link>
                            </motion.div>
                          </div>
                        </div>

                        {event.highlights && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {event.highlights.map((highlight, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs rounded-full bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-purple-200"
                              >
                                ✨ {highlight}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white px-12 py-6 rounded-3xl text-xl font-black shadow-2xl"
                  >
                    <Rocket className="w-6 h-6 mr-3" />
                    CREATE ANOTHER EPIC EVENT! 🎉
                  </Button>
                </motion.div>
                <p className="text-gray-600 mt-4 text-lg">
                  Ready to create more unforgettable memories?
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Edit Event Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-0 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ✏️ Edit Event: {selectedEvent?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Event Title
                </label>
                <Input
                  defaultValue={selectedEvent?.title}
                  className="rounded-xl border-2"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <Input
                  type="date"
                  defaultValue={selectedEvent?.date}
                  className="rounded-xl border-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Capacity
                </label>
                <Input
                  type="number"
                  defaultValue={selectedEvent?.capacity}
                  className="rounded-xl border-2"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <Select defaultValue={selectedEvent?.category}>
                  <SelectTrigger className="rounded-xl border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Music">🎵 Music</SelectItem>
                    <SelectItem value="Technology">💻 Technology</SelectItem>
                    <SelectItem value="Food & Drink">
                      🍷 Food & Drink
                    </SelectItem>
                    <SelectItem value="Business">💼 Business</SelectItem>
                    <SelectItem value="Art">🎨 Art</SelectItem>
                    <SelectItem value="Wellness">🧘 Wellness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <Button
                onClick={() => {
                  toast({
                    title: "Event Updated! 🎉",
                    description: "Your event has been successfully updated.",
                  });
                  setIsEditModalOpen(false);
                }}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold py-3"
              >
                💾 Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                className="px-8 rounded-xl"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Event Modal */}
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="max-w-lg bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-0 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🚀 Share Your Event
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-6">
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                {selectedEvent?.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedEvent?.attendees} people going • {selectedEvent?.date}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                Share Link
              </h4>
              <div className="flex gap-2">
                <Input
                  value={`https://unclub.events/event/${selectedEvent?.id}`}
                  readOnly
                  className="rounded-xl bg-gray-50 dark:bg-gray-800"
                />
                <Button
                  onClick={() =>
                    copyToClipboard(
                      `https://unclub.events/event/${selectedEvent?.id}`,
                      "link",
                    )
                  }
                  className="px-4 rounded-xl"
                >
                  {copiedText === "link" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                Share on Social
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    name: "Instagram",
                    icon: "📸",
                    color: "from-pink-500 to-purple-500",
                    share: `Check out this amazing event: ${selectedEvent?.title}! 🎉`,
                  },
                  {
                    name: "Twitter",
                    icon: "🐦",
                    color: "from-blue-400 to-blue-600",
                    share: `🎉 Just discovered: ${selectedEvent?.title}! Can't wait to attend. Join me?`,
                  },
                  {
                    name: "LinkedIn",
                    icon: "💼",
                    color: "from-blue-600 to-blue-800",
                    share: `Excited to attend ${selectedEvent?.title} - great networking opportunity!`,
                  },
                ].map((platform) => (
                  <motion.button
                    key={platform.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      copyToClipboard(
                        platform.share,
                        platform.name.toLowerCase(),
                      )
                    }
                    className={`p-4 rounded-xl bg-gradient-to-r ${platform.color} text-white text-center font-semibold shadow-lg`}
                  >
                    <div className="text-2xl mb-1">{platform.icon}</div>
                    <div className="text-xs">{platform.name}</div>
                    {copiedText === platform.name.toLowerCase() && (
                      <div className="text-xs mt-1">✅ Copied!</div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="font-semibold text-green-700 dark:text-green-300">
                  Sharing Impact
                </span>
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                • {selectedEvent?.socialShares} total shares
                <br />
                • Events with high social shares sell 3x faster
                <br />• Share to unlock audience insights
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
