import { motion } from "framer-motion";

export function GenZParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Subtle floating particles */}
      {[...Array(15)].map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1 h-1 bg-gradient-to-r from-instagram-pink/40 to-instagram-purple/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 6 + index,
            repeat: Infinity,
            delay: index * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient orbs */}
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={`orb-${index}`}
          className="absolute w-32 h-32 bg-gradient-to-br from-instagram-pink/10 to-instagram-purple/10 rounded-full blur-2xl"
          style={{
            left: `${10 + index * 20}%`,
            top: `${15 + index * 15}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12 + index * 2,
            repeat: Infinity,
            delay: index * 1.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
