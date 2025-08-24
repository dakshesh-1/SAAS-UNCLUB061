import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, User, Shield, Menu, X, Search, Bell, Plus, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { 
    name: "Discover", 
    path: "/", 
    icon: Home,
    gradient: "from-instagram-pink via-instagram-purple to-instagram-orange"
  },
  { 
    name: "Events", 
    path: "/events", 
    icon: Calendar,
    gradient: "from-genz-electric via-genz-cyber to-instagram-blue"
  },
  { 
    name: "Create", 
    path: "/dashboard", 
    icon: Plus,
    gradient: "from-genz-sunset via-instagram-yellow to-genz-mint"
  },
  { 
    name: "Profile", 
    path: "/admin", 
    icon: User,
    gradient: "from-genz-neon via-genz-lavender to-instagram-purple"
  }
];

const floatingIcons = [
  { icon: Heart, delay: 0, duration: 3, range: 20 },
  { icon: MessageCircle, delay: 1, duration: 4, range: 25 },
  { icon: Plus, delay: 2, duration: 3.5, range: 30 },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();
  const { scrollY } = useScroll();
  
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
  const blurAmount = useTransform(scrollY, [0, 100], [8, 20]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
              left: `${20 + index * 30}%`,
              top: `${10 + index * 20}%`,
            }}
            animate={{
              y: [-item.range, item.range, -item.range],
              x: [-item.range/2, item.range/2, -item.range/2],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-instagram-pink/20 to-instagram-purple/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <item.icon className="w-4 h-4 text-instagram-purple/60" />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, 
            hsl(var(--instagram-pink) / ${backgroundOpacity}), 
            hsl(var(--instagram-purple) / ${backgroundOpacity}), 
            hsl(var(--instagram-orange) / ${backgroundOpacity}))`,
          backdropFilter: `blur(${blurAmount}px)`,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring", damping: 20 }}
      >
        {/* Animated background gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-instagram-pink/30 via-instagram-purple/30 to-instagram-orange/30"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link to="/" className="flex items-center space-x-3">
                <motion.div
                  className="relative w-12 h-12 bg-gradient-to-br from-instagram-pink via-instagram-purple to-instagram-orange rounded-3xl flex items-center justify-center shadow-2xl"
                  whileHover={{ 
                    rotate: [0, -5, 5, 0],
                    scale: 1.1 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-3xl"
                  />
                  <Calendar className="w-7 h-7 text-white relative z-10" />
                </motion.div>
                <div className="hidden sm:block">
                  <motion.span 
                    className="text-3xl font-black bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent"
                    whileHover={{
                      backgroundImage: "linear-gradient(45deg, #fff, #fef7cd, #fff)",
                    }}
                  >
                    EventVibe
                  </motion.span>
                  <motion.div
                    className="text-xs font-semibold text-white/80 tracking-wider uppercase"
                    animate={{
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    Gen Z Events
                  </motion.div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
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
                    <Link
                      to={item.path}
                      className="relative group"
                    >
                      <motion.div
                        className={`relative px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                          isActive
                            ? "text-white shadow-2xl"
                            : "text-white/80 hover:text-white"
                        }`}
                        whileHover={{
                          backgroundImage: `linear-gradient(135deg, 
                            hsl(var(--instagram-pink)), 
                            hsl(var(--instagram-purple)), 
                            hsl(var(--instagram-orange)))`,
                        }}
                      >
                        {(isActive || hoveredItem === item.path) && (
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-90`}
                            layoutId="activeBackground"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.9, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ 
                              type: "spring", 
                              damping: 20, 
                              stiffness: 300 
                            }}
                          />
                        )}
                        
                        <div className="relative z-10 flex items-center space-x-2">
                          <motion.div
                            animate={isActive ? {
                              rotate: [0, 10, -10, 0],
                              scale: [1, 1.1, 1],
                            } : {}}
                            transition={{
                              duration: 2,
                              repeat: isActive ? Infinity : 0,
                            }}
                          >
                            <item.icon className="w-5 h-5" />
                          </motion.div>
                          <span className="font-bold">{item.name}</span>
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
            <div className="hidden md:flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-2xl text-white hover:bg-white/20 transition-all duration-300"
                >
                  <Search className="w-5 h-5" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-2xl text-white hover:bg-white/20 transition-all duration-300"
                >
                  <Bell className="w-5 h-5" />
                </Button>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1"
                >
                  <Badge className="w-6 h-6 p-0 text-xs bg-gradient-to-r from-instagram-red to-instagram-pink text-white border-2 border-white rounded-full shadow-lg">
                    <motion.span
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      9+
                    </motion.span>
                  </Badge>
                </motion.div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/auth">
                  <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-2xl shadow-xl border border-white/30 font-bold px-6 transition-all duration-300">
                    <motion.span
                      whileHover={{
                        backgroundImage: "linear-gradient(45deg, #fff, #fef7cd, #fff)",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      Join Vibe
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
                className="rounded-2xl text-white hover:bg-white/20"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
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
              className="fixed top-20 left-0 right-0 bg-gradient-to-br from-instagram-pink via-instagram-purple to-instagram-orange backdrop-blur-2xl z-50 md:hidden rounded-b-3xl"
              initial={{ y: -400, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -400, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <div className="px-6 py-6 space-y-1">
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
                        className={`flex items-center space-x-4 px-4 py-4 rounded-2xl font-bold transition-all duration-300 ${
                          isActive
                            ? "bg-white/20 text-white shadow-lg"
                            : "text-white/80 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                        >
                          <item.icon className="w-6 h-6" />
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
                  <Link
                    to="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-2xl shadow-xl border border-white/30 font-bold py-4 text-lg">
                      Join the Vibe ✨
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
