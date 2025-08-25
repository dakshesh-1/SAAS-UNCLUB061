import { motion } from "framer-motion";
import { useState } from "react";
import {
  User,
  Camera,
  Edit,
  Settings,
  Calendar,
  Users,
  Heart,
  MapPin,
  Star,
  Trophy,
  Zap,
  Share2,
  Crown,
  Medal,
  LogOut,
  UserPlus,
  ChevronDown,
  Music,
  Laptop,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GenZParticles } from "@/components/GenZParticles";
import { useAuth } from "@/contexts/AuthContext";
import { AuthForm } from "@/components/AuthForm";
import { useToast } from "@/hooks/use-toast";

// Icon mapping for badge icons
const iconMap = {
  Crown,
  Users,
  Trophy,
  Medal,
  Music,
  Star,
  Laptop,
  Zap,
};

// Mock activity data

const recentActivity = [
  {
    id: 1,
    type: "attended",
    event: "Summer Pool Party",
    date: "2 days ago",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    type: "hosted",
    event: "Rooftop Sunset Vibes",
    date: "1 week ago",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 3,
    type: "attended",
    event: "Electronic Music Festival",
    date: "2 weeks ago",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Birthday Bash Extravaganza",
    date: "Saturday, Aug 24",
    type: "hosting",
    attendees: 85,
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    title: "Beach House Weekend",
    date: "Friday, Sep 1",
    type: "attending",
    attendees: 25,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
];

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const { isAuthenticated, currentUser, users, logout, switchAccount } =
    useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out. See you next time! 👋",
    });
  };

  const handleSwitchAccount = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      switchAccount(userId);
      toast({
        title: "Account switched",
        description: `Switched to ${user.name}'s account! 🔄`,
      });
    }
  };

  // If not authenticated, show the auth form
  if (!isAuthenticated) {
    return <AuthForm />;
  }

  // If no user data, show a loading state
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-aesthetic-sage/20 via-aesthetic-stone/20 to-aesthetic-plum/20 dark:from-gray-900/40 dark:via-gray-800/40 dark:to-gray-900/40 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-aesthetic-slate border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-aesthetic-sage/20 via-aesthetic-stone/20 to-aesthetic-plum/20 dark:from-gray-900/40 dark:via-gray-800/40 dark:to-gray-900/40">
      <GenZParticles />

      {/* Cover Image & Profile Header */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <motion.img
          src={currentUser.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Edit Cover Button */}
        <motion.div
          className="absolute top-6 right-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            size="sm"
            className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 rounded-lg"
          >
            <Camera className="w-4 h-4 mr-2" />
            Edit Cover
          </Button>
        </motion.div>

        {/* Profile Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-6">
              <motion.div
                className="relative"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", damping: 15 }}
              >
                <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white shadow-2xl">
                  <AvatarImage
                    src={currentUser.avatar}
                    alt={currentUser.name}
                  />
                  <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                </Avatar>

                {currentUser.isVerified && (
                  <motion.div
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-aesthetic-slate to-aesthetic-sage rounded-full flex items-center justify-center border-2 border-white shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Zap className="w-4 h-4 text-white" />
                  </motion.div>
                )}

                <motion.button
                  className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-r from-aesthetic-amber to-aesthetic-stone rounded-full flex items-center justify-center border-2 border-white shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Edit className="w-4 h-4 text-white" />
                </motion.button>
              </motion.div>

              <div className="flex-1 pb-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl sm:text-4xl font-black text-white">
                      {currentUser.name}
                    </h1>
                    {currentUser.isVerified && (
                      <Badge className="bg-gradient-to-r from-aesthetic-slate to-aesthetic-sage text-white rounded-full px-3 py-1">
                        <Zap className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-white/90 font-medium text-lg mb-1">
                    {currentUser.username}
                  </p>
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin className="w-4 h-4" />
                    <span>{currentUser.location}</span>
                    <span>•</span>
                    <span>Joined {currentUser.joinDate}</span>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  variant="outline"
                  className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 rounded-lg"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>

                {/* Account Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-gradient-to-r from-aesthetic-amber via-aesthetic-stone to-aesthetic-plum text-white rounded-lg font-bold shadow-xl">
                      <Settings className="w-4 h-4 mr-2" />
                      Account
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-0 shadow-2xl rounded-lg"
                  >
                    <DropdownMenuLabel className="text-center py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src={currentUser.avatar}
                            alt={currentUser.name}
                          />
                          <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <div className="font-bold text-gray-900 dark:text-gray-100">
                            {currentUser.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {currentUser.email}
                          </div>
                        </div>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl mx-1">
                      <Settings className="w-4 h-4 mr-3" />
                      <span>Edit Profile</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs text-gray-500 dark:text-gray-400 py-2">
                      Switch Account
                    </DropdownMenuLabel>

                    {users
                      .filter((user) => user.id !== currentUser.id)
                      .map((user) => (
                        <DropdownMenuItem
                          key={user.id}
                          className="py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl mx-1"
                          onClick={() => handleSwitchAccount(user.id)}
                        >
                          <Avatar className="w-6 h-6 mr-3">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {user.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {user.email}
                            </div>
                          </div>
                          {user.isVerified && (
                            <Zap className="w-3 h-3 text-blue-500" />
                          )}
                        </DropdownMenuItem>
                      ))}

                    <DropdownMenuItem
                      className="py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl mx-1"
                      onClick={() => {
                        toast({
                          title: "Add Account",
                          description:
                            "Multiple account creation would be implemented here in a real app.",
                        });
                      }}
                    >
                      <UserPlus className="w-4 h-4 mr-3" />
                      <span>Add Another Account</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="py-3 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl mx-1"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Bio & Stats */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg border-0 shadow-xl">
            <CardContent className="p-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
                {currentUser.bio}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  {
                    label: "Events Attended",
                    value: currentUser.stats.eventsAttended,
                    icon: Calendar,
                  },
                  {
                    label: "Events Hosted",
                    value: currentUser.stats.eventsHosted,
                    icon: Users,
                  },
                  {
                    label: "Party Friends",
                    value: currentUser.stats.friends.toLocaleString(),
                    icon: Heart,
                  },
                  {
                    label: "Rating",
                    value: currentUser.stats.rating,
                    icon: Star,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-aesthetic-slate to-aesthetic-sage rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg"
                      whileHover={{ rotate: 5 }}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="text-2xl font-black text-gray-900 dark:text-gray-100">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Badges */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-unclub-blue" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {currentUser.badges.map((badge, index) => {
                  const IconComponent = iconMap[badge.icon as keyof typeof iconMap];
                  return (
                    <motion.div
                      key={badge.id}
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.05 }}
                    >
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-br ${badge.color} rounded-3xl flex items-center justify-center mx-auto mb-3 shadow-lg`}
                        whileHover={{ rotate: 10 }}
                      >
                        {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                      </motion.div>
                      <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
                        {badge.name}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-1 mb-6">
              <TabsTrigger
                value="overview"
                className="rounded-xl font-semibold"
              >
                Activity
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                className="rounded-xl font-semibold"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="photos" className="rounded-xl font-semibold">
                Photos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.01 }}
                >
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <motion.img
                          src={activity.image}
                          alt={activity.event}
                          className="w-16 h-16 object-cover rounded-2xl"
                          whileHover={{ scale: 1.1 }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-gray-900 dark:text-gray-100">
                              {activity.type === "hosted"
                                ? "Hosted"
                                : "Attended"}
                            </span>
                            <Badge
                              className={`rounded-full px-3 py-1 ${
                                activity.type === "hosted"
                                  ? "bg-gradient-to-r from-unclub-pink to-party-pink text-white"
                                  : "bg-gradient-to-r from-unclub-blue to-party-blue text-white"
                              }`}
                            >
                              {activity.type === "hosted" ? "🎉" : "✨"}
                            </Badge>
                          </div>
                          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                            {activity.event}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {activity.date}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <motion.img
                          src={event.image}
                          alt={event.title}
                          className="w-20 h-20 object-cover rounded-2xl"
                          whileHover={{ scale: 1.1 }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              className={`rounded-full px-3 py-1 ${
                                event.type === "hosting"
                                  ? "bg-gradient-to-r from-unclub-red to-party-red text-white"
                                  : "bg-gradient-to-r from-unclub-blue to-party-blue text-white"
                              }`}
                            >
                              {event.type === "hosting"
                                ? "🎯 Hosting"
                                : "✨ Attending"}
                            </Badge>
                          </div>
                          <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-1">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-2">
                            {event.date}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Users className="w-4 h-4" />
                            {event.attendees} going
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-2 border-unclub-pink text-unclub-pink hover:bg-unclub-pink hover:text-white dark:border-unclub-pink dark:text-unclub-pink dark:hover:bg-unclub-pink dark:hover:text-white"
                        >
                          View Event
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="photos" className="space-y-4">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border-0 shadow-xl">
                <CardContent className="p-8 text-center">
                  <Camera className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Party Photo Gallery
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Your best party moments will appear here!
                  </p>
                  <Button className="bg-gradient-to-r from-unclub-blue to-unclub-pink text-white rounded-2xl font-bold">
                    Upload Photos
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
