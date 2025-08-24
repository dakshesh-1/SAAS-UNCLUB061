import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Calendar,
  User,
  Plus,
  Menu,
  X,
  Search,
  Bell,
  Zap,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useTheme } from "next-themes";

const navItems = [
  {
    name: "Events",
    path: "/",
    icon: Calendar,
    gradient: "from-party-blue via-unclub-electric to-party-neon",
  },
  {
    name: "Discover",
    path: "/discover",
    icon: Home,
    gradient: "from-unclub-blue via-unclub-pink to-unclub-red",
  },
  {
    name: "Create",
    path: "/dashboard",
    icon: Plus,
    gradient: "from-unclub-pink via-party-red to-unclub-coral",
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
    gradient: "from-party-electric via-unclub-hotpink to-party-pink",
  },
];

const floatingIcons = [
  { icon: Sparkles, delay: 0, duration: 3, range: 20 },
  { icon: Zap, delay: 1, duration: 4, range: 25 },
  { icon: Plus, delay: 2, duration: 3.5, range: 30 },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { scrollY } = useScroll();
  const { theme } = useTheme();

  const backgroundOpacity = useTransform(scrollY, [0, 100], [0.85, 0.95]);
  const blurAmount = useTransform(scrollY, [0, 100], [12, 24]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${15 + index * 25}%`,
              top: `${8 + index * 18}%`,
            }}
            animate={{
              y: [-item.range, item.range, -item.range],
              x: [-item.range / 2, item.range / 2, -item.range / 2],
              rotate: [0, 180, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-unclub-blue/25 to-unclub-pink/25 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
              <item.icon className="w-5 h-5 text-unclub-blue/70" />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, 
            hsl(var(--unclub-blue) / ${backgroundOpacity}), 
            hsl(var(--unclub-pink) / ${backgroundOpacity}), 
            hsl(var(--unclub-red) / ${backgroundOpacity}))`,
          backdropFilter: `blur(${blurAmount}px)`,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring", damping: 20 }}
      >
        {/* Animated background gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-unclub-blue/30 via-unclub-pink/30 to-unclub-red/30"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
                <motion.div
                  className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-unclub-blue via-unclub-pink to-unclub-red rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl"
                  whileHover={{
                    rotate: [0, -8, 8, 0],
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl sm:rounded-3xl"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <Zap className="w-5 h-5 sm:w-7 sm:h-7 text-white relative z-10" />
                  </motion.div>
                </motion.div>
                <div className="hidden sm:block">
                  <motion.span
                    className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent"
                    whileHover={{
                      backgroundImage:
                        "linear-gradient(45deg, #fff, #e0f7ff, #fff)",
                    }}
                  >
                    UnClub
                  </motion.span>
                  <motion.div
                    className="text-xs font-bold text-white/90 tracking-wider uppercase"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                  >
                    Party Ready
                  </motion.div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    className="relative"
                    onHoverStart={() => setHoveredItem(item.path)}
                    onHoverEnd={() => setHoveredItem(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to={item.path} className="relative group">
                      <motion.div
                        className={`relative px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 ${
                          isActive
                            ? "text-white shadow-2xl bg-white/20 backdrop-blur-sm border border-white/30"
                            : "text-white/90 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm hover:border hover:border-white/20"
                        }`}
                        whileHover={{
                          backgroundImage: isActive ? undefined : `linear-gradient(135deg,
                            hsl(var(--unclub-blue) / 0.3),
                            hsl(var(--unclub-pink) / 0.3),
                            hsl(var(--unclub-red) / 0.3))`,
                        }}
                      >
                        {(isActive || hoveredItem === item.path) && (
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-xl sm:rounded-2xl opacity-90`}
                            layoutId="activeBackground"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.9, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{
                              type: "spring",
                              damping: 25,
                              stiffness: 400,
                            }}
                          />
                        )}

                        <div className="relative z-10 flex items-center space-x-2">
                          <motion.div
                            animate={
                              isActive
                                ? {
                                    rotate: [0, 15, -15, 0],
                                    scale: [1, 1.15, 1],
                                  }
                                : {}
                            }
                            transition={{
                              duration: 1.8,
                              repeat: isActive ? Infinity : 0,
                            }}
                          >
                            <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </motion.div>
                          <span className="font-bold text-sm sm:text-base">
                            {item.name}
                          </span>
                        </div>

                        {isActive && (
                          <motion.div
                            className="absolute -bottom-1 left-1/2 w-2 h-2 bg-white rounded-full"
                            initial={{ scale: 0, x: "-50%" }}
                            animate={{ scale: 1, x: "-50%" }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />

              {/* Search Dialog */}
              <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <DialogTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 8 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-xl sm:rounded-2xl text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 px-3 py-2"
                    >
                      <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-0 rounded-3xl">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      🔍 Search Events
                    </h3>
                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Search for events, locations, or categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 rounded-2xl h-14 text-lg border-2 border-gray-200 dark:border-gray-700"
                        autoFocus
                      />
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300">Popular Searches</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Music Festivals", "Tech Events", "Food & Wine", "Art Shows", "Networking"].map((term) => (
                          <Button
                            key={term}
                            variant="outline"
                            size="sm"
                            onClick={() => setSearchQuery(term)}
                            className="rounded-full text-sm"
                          >
                            {term}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Notifications Dialog */}
              <Dialog open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
                <DialogTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -8 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-xl sm:rounded-2xl text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 px-3 py-2"
                    >
                      <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1"
                    >
                      <Badge className="w-5 h-5 sm:w-6 sm:h-6 p-0 text-xs bg-gradient-to-r from-unclub-red to-party-red text-white border-2 border-white rounded-full shadow-lg">
                        <motion.span
                          animate={{
                            scale: [1, 1.3, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        >
                          3
                        </motion.span>
                      </Badge>
                    </motion.div>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-0 rounded-3xl">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      🔔 Notifications
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl">
                        <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">🎉 Event Reminder</h4>
                        <p className="text-sm text-blue-600 dark:text-blue-400">Summer Music Festival starts in 2 hours!</p>
                        <span className="text-xs text-gray-500">10 min ago</span>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl">
                        <h4 className="font-semibold text-green-700 dark:text-green-300 mb-1">💰 Payment Received</h4>
                        <p className="text-sm text-green-600 dark:text-green-400">You earned $125 from ticket sales</p>
                        <span className="text-xs text-gray-500">1 hour ago</span>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl">
                        <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-1">⭐ New Review</h4>
                        <p className="text-sm text-orange-600 dark:text-orange-400">Someone left a 5-star review for your event!</p>
                        <span className="text-xs text-gray-500">3 hours ago</span>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/auth">
                  <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-xl sm:rounded-2xl shadow-xl border border-white/30 font-bold px-4 sm:px-6 py-2 transition-all duration-300">
                    <motion.span
                      className="text-sm sm:text-base"
                      whileHover={{
                        backgroundImage:
                          "linear-gradient(45deg, #fff, #e0f7ff, #fff)",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      Join Party
                    </motion.span>
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.div
              className="md:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-xl text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 px-3 py-2"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-16 left-0 right-0 bg-gradient-to-br from-unclub-blue via-unclub-pink to-unclub-red backdrop-blur-2xl z-50 md:hidden rounded-b-3xl mx-2 shadow-2xl"
              initial={{ y: -400, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -400, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <div className="px-4 py-6 space-y-3">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-4 px-4 py-3 rounded-2xl font-bold transition-all duration-300 ${
                          isActive
                            ? "bg-white/30 text-white shadow-lg border border-white/40"
                            : "text-white/90 hover:bg-white/20 hover:text-white hover:border hover:border-white/30"
                        }`}
                      >
                        <motion.div whileHover={{ rotate: 15, scale: 1.1 }}>
                          <item.icon className="w-5 h-5" />
                        </motion.div>
                        <span className="text-lg">{item.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
                  className="pt-4"
                >
                  <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-2xl shadow-xl border border-white/30 font-bold py-4 text-lg">
                      Join the Party 🎉
                    </Button>
                  </Link>

                  {/* Mobile Search and Notifications */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsSearchOpen(true);
                      }}
                      className="flex-1 bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white rounded-2xl border border-white/30 font-bold py-3"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                    <Button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsNotificationOpen(true);
                      }}
                      className="flex-1 bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white rounded-2xl border border-white/30 font-bold py-3 relative"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Alerts
                      <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-red-500 text-white border border-white rounded-full">
                        3
                      </Badge>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
