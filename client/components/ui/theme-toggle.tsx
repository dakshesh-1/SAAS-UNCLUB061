import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="relative rounded-xl backdrop-blur-sm border transition-all duration-300 overflow-hidden"
        style={{
          background: theme === "dark"
            ? "linear-gradient(135deg, hsl(210 40% 98% / 0.1), hsl(210 40% 98% / 0.2))"
            : "linear-gradient(135deg, hsl(222.2 84% 4.9% / 0.1), hsl(222.2 84% 4.9% / 0.2))",
          borderColor: theme === "dark" ? "hsl(210 40% 98% / 0.2)" : "hsl(222.2 84% 4.9% / 0.2)",
          color: theme === "dark" ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)"
        }}
      >
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: theme === "dark"
              ? "linear-gradient(135deg, #f59e0b, #fbbf24, #d97706)"
              : "linear-gradient(135deg, #1e1b4b, #312e81, #1e3a8a)",
          }}
          transition={{ duration: 0.4 }}
          style={{ borderRadius: "0.75rem" }}
        />
        <div className="relative z-10 flex items-center justify-center w-6 h-6">
          <motion.div
            animate={{
              rotate: theme === "dark" ? 0 : 180,
              scale: theme === "dark" ? 1 : 0,
              opacity: theme === "dark" ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="absolute"
          >
            <Moon className="h-4 w-4" />
          </motion.div>
          <motion.div
            animate={{
              rotate: theme === "light" ? 0 : 180,
              scale: theme === "light" ? 1 : 0,
              opacity: theme === "light" ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="absolute"
          >
            <Sun className="h-4 w-4" />
          </motion.div>
        </div>
      </Button>
    </motion.div>
  );
}
