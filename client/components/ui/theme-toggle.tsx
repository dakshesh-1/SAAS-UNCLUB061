import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="relative rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white hover:text-white transition-all duration-300"
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            background: theme === "dark" 
              ? "linear-gradient(135deg, #1a1a2e, #16213e, #0f0f23)"
              : "linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)"
          }}
          transition={{ duration: 0.3 }}
          style={{ borderRadius: "0.75rem" }}
        />
        <div className="relative z-10 flex items-center">
          <motion.div
            animate={{ 
              rotate: theme === "dark" ? 0 : 180,
              scale: theme === "dark" ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="absolute"
          >
            <Moon className="h-4 w-4" />
          </motion.div>
          <motion.div
            animate={{ 
              rotate: theme === "light" ? 0 : 180,
              scale: theme === "light" ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="absolute"
          >
            <Sun className="h-4 w-4" />
          </motion.div>
          <div className="w-4 h-4" /> {/* Spacer */}
        </div>
      </Button>
    </motion.div>
  )
}
