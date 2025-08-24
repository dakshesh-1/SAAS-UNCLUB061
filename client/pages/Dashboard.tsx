import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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

// Mock data for dashboard
const dashboardStats = [
  {
    title: "Total Events",
    value: "47",
    change: "+12%",
    trend: "up",
    icon: Calendar,
    gradient: "from-instagram-pink to-instagram-purple",
  },
  {
    title: "Total Attendees",
    value: "15.2K",
    change: "+23%",
    trend: "up",
    icon: Users,
    gradient: "from-instagram-purple to-instagram-blue",
  },
  {
    title: "Revenue",
    value: "$89.5K",
    change: "+18%",
    trend: "up",
    icon: DollarSign,
    gradient: "from-instagram-orange to-instagram-yellow",
  },
  {
    title: "Avg Rating",
    value: "4.8",
    change: "+0.2",
    trend: "up",
    icon: Star,
    gradient: "from-genz-mint to-genz-cyber",
  },
];

const recentEvents = [
  {
    id: 1,
    title: "Summer Music Festival 2024",
    date: "Jul 15, 2024",
    attendees: 2500,
    revenue: "$12,450",
    status: "live",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    category: "Music",
  },
  {
    id: 2,
    title: "Tech Innovation Summit",
    date: "Aug 22, 2024",
    attendees: 800,
    revenue: "$8,900",
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    category: "Technology",
  },
  {
    id: 3,
    title: "Food & Wine Experience",
    date: "Sep 10, 2024",
    attendees: 300,
    revenue: "$4,200",
    status: "draft",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    category: "Food & Drink",
  },
];

const notifications = [
  {
    id: 1,
    type: "booking",
    message: "New booking for Summer Music Festival",
    time: "2 minutes ago",
    icon: "🎟️",
  },
  {
    id: 2,
    type: "review",
    message: "New 5-star review received",
    time: "1 hour ago",
    icon: "⭐",
  },
  {
    id: 3,
    type: "revenue",
    message: "Payment processed: $450",
    time: "3 hours ago",
    icon: "💰",
  },
];

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
    "Music",
    "Technology",
    "Food & Drink",
    "Art",
    "Business",
    "Wellness",
    "Sports",
  ];
  const popularTags = [
    "Outdoor",
    "Live Music",
    "Food & Drinks",
    "All Ages",
    "VIP Available",
    "Photography",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-purple-50 to-pink-50 border-0 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-orange bg-clip-text text-transparent">
            Create Epic Event ✨
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6"
        >
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2, 3].map((stepNum) => (
              <motion.div
                key={stepNum}
                className={`flex items-center gap-2 ${stepNum <= step ? "text-instagram-purple" : "text-gray-400"}`}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    stepNum <= step
                      ? "bg-gradient-to-r from-instagram-pink to-instagram-purple text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepNum}
                </div>
                <span className="font-semibold text-sm">
                  {stepNum === 1
                    ? "Basic Info"
                    : stepNum === 2
                      ? "Details"
                      : "Preview"}
                </span>
                {stepNum < 3 && <div className="w-12 h-px bg-gray-300" />}
              </motion.div>
            ))}
          </div>

          {step === 1 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Event Title *
                  </label>
                  <Input
                    placeholder="e.g., Summer Music Festival 2024"
                    value={eventData.title}
                    onChange={(e) =>
                      setEventData({ ...eventData, title: e.target.value })
                    }
                    className="rounded-2xl h-12 border-2 border-gray-200 focus:border-instagram-purple"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <Select
                    value={eventData.category}
                    onValueChange={(value) =>
                      setEventData({ ...eventData, category: value })
                    }
                  >
                    <SelectTrigger className="rounded-2xl h-12 border-2 border-gray-200">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date *
                  </label>
                  <Input
                    type="date"
                    value={eventData.date}
                    onChange={(e) =>
                      setEventData({ ...eventData, date: e.target.value })
                    }
                    className="rounded-2xl h-12 border-2 border-gray-200 focus:border-instagram-purple"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Time *
                  </label>
                  <Input
                    type="time"
                    value={eventData.time}
                    onChange={(e) =>
                      setEventData({ ...eventData, time: e.target.value })
                    }
                    className="rounded-2xl h-12 border-2 border-gray-200 focus:border-instagram-purple"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location *
                  </label>
                  <Input
                    placeholder="e.g., Central Park, NYC"
                    value={eventData.location}
                    onChange={(e) =>
                      setEventData({ ...eventData, location: e.target.value })
                    }
                    className="rounded-2xl h-12 border-2 border-gray-200 focus:border-instagram-purple"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ticket Price ($) *
                  </label>
                  <Input
                    type="number"
                    placeholder="89"
                    value={eventData.price}
                    onChange={(e) =>
                      setEventData({ ...eventData, price: e.target.value })
                    }
                    className="rounded-2xl h-12 border-2 border-gray-200 focus:border-instagram-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Capacity *
                  </label>
                  <Input
                    type="number"
                    placeholder="500"
                    value={eventData.capacity}
                    onChange={(e) =>
                      setEventData({ ...eventData, capacity: e.target.value })
                    }
                    className="rounded-2xl h-12 border-2 border-gray-200 focus:border-instagram-purple"
                  />
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => setStep(2)}
                  disabled={
                    !eventData.title || !eventData.category || !eventData.date
                  }
                  className="w-full bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-orange text-white rounded-2xl h-12 font-bold"
                >
                  Next: Add Details →
                </Button>
              </motion.div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Description *
                </label>
                <Textarea
                  placeholder="Tell people what makes your event special..."
                  value={eventData.description}
                  onChange={(e) =>
                    setEventData({ ...eventData, description: e.target.value })
                  }
                  className="rounded-2xl min-h-[120px] border-2 border-gray-200 focus:border-instagram-purple"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Images
                </label>
                <motion.div
                  className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-instagram-purple transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drag & drop images or click to browse
                  </p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  <Button variant="outline" className="mt-4 rounded-xl">
                    Choose Files
                  </Button>
                </motion.div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tags (Help people find your event)
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {popularTags.map((tag) => (
                    <motion.div
                      key={tag}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge
                        variant={
                          eventData.tags.includes(tag) ? "default" : "outline"
                        }
                        className={`cursor-pointer rounded-full px-4 py-2 ${
                          eventData.tags.includes(tag)
                            ? "bg-gradient-to-r from-instagram-pink to-instagram-purple text-white"
                            : "hover:bg-gray-100"
                        }`}
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
                      >
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-2xl h-12"
                >
                  �� Back
                </Button>
                <motion.div
                  className="flex-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => setStep(3)}
                    className="w-full bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-orange text-white rounded-2xl h-12 font-bold"
                  >
                    Preview Event →
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  🎉 Event Preview
                </h3>
                <p className="text-gray-600">
                  Here's how your event will look to attendees
                </p>
              </div>

              <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-0 shadow-xl overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-instagram-pink/20 to-instagram-purple/20 flex items-center justify-center">
                  <Camera className="w-16 h-16 text-gray-400" />
                  <span className="ml-3 text-gray-600">
                    Event Image Preview
                  </span>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge className="mb-2 bg-gradient-to-r from-instagram-pink to-instagram-purple text-white">
                        {eventData.category}
                      </Badge>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {eventData.title}
                      </h2>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ${eventData.price}
                      </div>
                      <div className="text-sm text-gray-600">
                        {eventData.capacity} spots
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {eventData.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {eventData.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {eventData.location}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{eventData.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {eventData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="rounded-full"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1 rounded-2xl h-12"
                >
                  ← Edit Details
                </Button>
                <motion.div
                  className="flex-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => {
                      // Handle event creation
                      setTimeout(() => {
                        alert("🎉 Event created successfully!");
                        onClose();
                      }, 1000);
                    }}
                    className="w-full bg-gradient-to-r from-genz-mint via-instagram-blue to-genz-cyber text-white rounded-2xl h-12 font-bold"
                  >
                    🚀 Publish Event
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

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50">
      {/* Header */}
      <motion.div
        className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-20 z-30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                className="text-4xl font-black bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-orange bg-clip-text text-transparent"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                Host Dashboard
              </motion.h1>
              <motion.p
                className="text-gray-600 mt-1"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Manage your events and grow your community 🚀
              </motion.p>
            </div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-orange hover:from-instagram-purple hover:to-instagram-pink text-white rounded-2xl px-6 py-3 font-bold shadow-xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Event
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {dashboardStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-0 shadow-xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <Badge
                      className={`bg-gradient-to-r ${stat.gradient} text-white rounded-full px-3 py-1`}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Events & Analytics */}
          <div className="lg:col-span-2 space-y-8">
            {/* Events Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      Your Events
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                      >
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        whileHover={{ x: 5, scale: 1.01 }}
                        className="p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <motion.img
                            src={event.image}
                            alt={event.title}
                            className="w-20 h-20 object-cover rounded-2xl"
                            whileHover={{ scale: 1.1 }}
                          />

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-bold text-lg text-gray-900">
                                  {event.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                  {event.date} • {event.category}
                                </p>
                              </div>
                              <Badge
                                className={`rounded-full px-3 py-1 ${
                                  event.status === "live"
                                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                                    : event.status === "upcoming"
                                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                                      : "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
                                }`}
                              >
                                {event.status}
                              </Badge>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {event.attendees}
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4" />
                                  {event.revenue}
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-xl"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </motion.div>
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-xl"
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
                                    className="rounded-xl text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Analytics Chart Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-instagram-purple" />
                    Analytics Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-instagram-pink/10 to-instagram-purple/10 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 text-instagram-purple mx-auto mb-4" />
                      <p className="text-gray-600 font-semibold">
                        📊 Interactive Charts Coming Soon!
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Track your event performance with detailed analytics
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Notifications & Quick Actions */}
          <div className="space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-0 shadow-xl">
                <CardContent className="p-6 text-center">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="relative mb-4"
                  >
                    <Avatar className="w-20 h-20 mx-auto border-4 border-white shadow-xl">
                      <AvatarImage
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                        alt="John Doe"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <motion.div
                      className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-instagram-yellow to-instagram-orange rounded-full flex items-center justify-center"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <Crown className="w-4 h-4 text-white" />
                    </motion.div>
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    John Doe
                  </h3>
                  <Badge className="mb-3 bg-gradient-to-r from-instagram-pink to-instagram-purple text-white rounded-full px-4 py-1">
                    ⭐ Pro Host
                  </Badge>

                  <div className="grid grid-cols-2 gap-4 text-center mb-4">
                    <div>
                      <div className="text-2xl font-bold text-instagram-purple">
                        47
                      </div>
                      <div className="text-xs text-gray-600">Events</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-instagram-orange">
                        4.8
                      </div>
                      <div className="text-xs text-gray-600">Rating</div>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="outline" className="w-full rounded-2xl">
                      <Settings className="w-4 h-4 mr-2" />
                      Profile Settings
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-instagram-purple" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                        className="flex items-start gap-3 p-3 rounded-2xl bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-all duration-300"
                      >
                        <motion.div
                          className="w-10 h-10 bg-gradient-to-br from-instagram-pink/20 to-instagram-purple/20 rounded-full flex items-center justify-center"
                          whileHover={{ rotate: 10, scale: 1.1 }}
                        >
                          <span className="text-xl">{notification.icon}</span>
                        </motion.div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500">
                            {notification.time}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="mt-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="outline" className="w-full rounded-2xl">
                      View All Notifications
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-instagram-yellow" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        name: "Share Event",
                        icon: Share2,
                        gradient: "from-instagram-pink to-instagram-purple",
                      },
                      {
                        name: "Check Analytics",
                        icon: BarChart3,
                        gradient: "from-instagram-purple to-instagram-blue",
                      },
                      {
                        name: "Edit Profile",
                        icon: Settings,
                        gradient: "from-instagram-orange to-instagram-yellow",
                      },
                      {
                        name: "Support",
                        icon: Heart,
                        gradient: "from-genz-mint to-genz-cyber",
                      },
                    ].map((action) => (
                      <motion.div
                        key={action.name}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          className={`w-full h-20 rounded-2xl bg-gradient-to-br ${action.gradient} text-white border-0 hover:opacity-90 transition-all duration-300 shadow-lg`}
                        >
                          <div className="text-center">
                            <action.icon className="w-6 h-6 mx-auto mb-1" />
                            <div className="text-xs font-semibold">
                              {action.name}
                            </div>
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
