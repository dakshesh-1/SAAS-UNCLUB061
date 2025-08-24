import { motion } from "framer-motion";
import {
  Heart,
  Star,
  Sparkles,
  Camera,
  Music,
  Coffee,
  Zap,
  Crown,
} from "lucide-react";

const floatingElements = [
  {
    icon: Heart,
    delay: 0,
    emoji: "💖",
    gradient: "from-instagram-pink to-instagram-red",
    position: { top: "15%", left: "10%" },
  },
  {
    icon: Star,
    delay: 1,
    emoji: "⭐",
    gradient: "from-instagram-yellow to-instagram-orange",
    position: { top: "25%", right: "15%" },
  },
  {
    icon: Sparkles,
    delay: 2,
    emoji: "✨",
    gradient: "from-instagram-purple to-genz-cyber",
    position: { top: "60%", left: "5%" },
  },
  {
    icon: Camera,
    delay: 0.5,
    emoji: "📸",
    gradient: "from-genz-neon to-instagram-pink",
    position: { top: "70%", right: "10%" },
  },
  {
    icon: Music,
    delay: 1.5,
    emoji: "🎵",
    gradient: "from-genz-mint to-instagram-blue",
    position: { top: "40%", right: "5%" },
  },
  {
    icon: Coffee,
    delay: 2.5,
    emoji: "☕",
    gradient: "from-instagram-orange to-genz-sunset",
    position: { top: "80%", left: "15%" },
  },
  {
    icon: Zap,
    delay: 3,
    emoji: "⚡",
    gradient: "from-genz-electric to-instagram-yellow",
    position: { top: "30%", left: "20%" },
  },
  {
    icon: Crown,
    delay: 3.5,
    emoji: "👑",
    gradient: "from-instagram-yellow to-genz-sunset",
    position: { top: "50%", right: "20%" },
  },
];

export function GenZFloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={element.position}
          animate={{
            y: [-30, 30, -30],
            x: [-20, 20, -20],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className={`w-20 h-20 bg-gradient-to-br ${element.gradient}/30 rounded-3xl flex items-center justify-center backdrop-blur-sm`}
            whileHover={{ scale: 1.2, rotate: 45 }}
            animate={{
              boxShadow: [
                "0 0 30px rgba(255, 105, 180, 0.3)",
                "0 0 60px rgba(138, 43, 226, 0.2)",
                "0 0 30px rgba(255, 105, 180, 0.3)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: element.delay,
            }}
          >
            {/* Icon version */}
            <motion.div
              animate={{
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: element.delay,
              }}
            >
              <element.icon
                className={`w-10 h-10 text-transparent bg-gradient-to-br ${element.gradient} bg-clip-text`}
              />
            </motion.div>

            {/* Emoji version that alternates */}
            <motion.div
              className="absolute text-3xl"
              animate={{
                opacity: [0, 1, 0],
                rotate: [0, 360, 720],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: element.delay + 3,
              }}
            >
              {element.emoji}
            </motion.div>
          </motion.div>
        </motion.div>
      ))}

      {/* Floating text bubbles */}
      {[
        { text: "So lit! 🔥", delay: 0, side: "left" },
        { text: "No cap! 💯", delay: 2, side: "right" },
        { text: "It's giving vibes ✨", delay: 4, side: "left" },
        { text: "Periodt! 💅", delay: 6, side: "right" },
        { text: "Main character energy 👑", delay: 8, side: "left" },
        { text: "That's fire! 🚀", delay: 10, side: "right" },
      ].map((bubble, index) => (
        <motion.div
          key={index}
          className={`absolute ${bubble.side === "left" ? "left-4" : "right-4"} bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-md rounded-3xl p-4 shadow-xl max-w-xs border border-white/20`}
          style={{
            top: `${15 + index * 12}%`,
          }}
          initial={{
            opacity: 0,
            x: bubble.side === "left" ? -150 : 150,
            scale: 0.8,
            rotate: bubble.side === "left" ? -10 : 10,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: 0,
            scale: [0.8, 1, 1, 0.8],
            rotate: 0,
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "easeInOut",
          }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-instagram-pink to-instagram-purple rounded-full flex items-center justify-center"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span className="text-white text-sm font-bold">
                {String.fromCharCode(65 + index)}
              </span>
            </motion.div>
            <p className="text-sm font-bold text-gray-800 tracking-wide">
              {bubble.text}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Sparkle effects */}
      {[...Array(20)].map((_, index) => (
        <motion.div
          key={`sparkle-${index}`}
          className="absolute w-2 h-2 bg-gradient-to-r from-instagram-yellow to-instagram-orange rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
