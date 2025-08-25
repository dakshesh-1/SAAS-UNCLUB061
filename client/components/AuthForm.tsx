import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Heart,
  Star,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const socialProviders = [
  {
    name: "Google",
    icon: "🔥",
    gradient: "from-red-500 to-orange-500",
    hoverGradient: "from-red-600 to-orange-600",
  },
  {
    name: "Instagram",
    icon: "📸",
    gradient: "from-pink-500 via-purple-500 to-orange-500",
    hoverGradient: "from-pink-600 via-purple-600 to-orange-600",
  },
];

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const { login, register } = useAuth();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Password Mismatch",
            description: "Passwords do not match. Please try again.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        success = await register({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
        });
      }

      if (success) {
        toast({
          title: isLogin ? "Welcome back!" : "Account created!",
          description: isLogin 
            ? "You've successfully logged in. Welcome to the party! 🎉"
            : "Your account has been created. Let's start exploring! 🚀",
        });
      } else {
        toast({
          title: "Authentication Failed",
          description: isLogin 
            ? "Invalid email or password. Please try again."
            : "Failed to create account. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Login`,
      description: `${provider} authentication would be implemented here in a real app.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-unclub-blue/20 via-unclub-pink/20 to-unclub-red/20 dark:from-gray-900/40 dark:via-gray-800/40 dark:to-gray-900/40 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[Heart, Star, Sparkles].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${10 + index * 25}%`,
              top: `${15 + index * 20}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-20, 20, -20],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut",
            }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-unclub-blue/30 to-unclub-pink/30 dark:from-gray-700/30 dark:to-gray-600/30 rounded-3xl flex items-center justify-center backdrop-blur-sm">
              <Icon className="w-8 h-8 text-unclub-blue dark:text-gray-400" />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        key={isLogin ? "login" : "signup"}
        initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md mx-auto relative z-10"
      >
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl border-0 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-unclub-blue/10 via-unclub-pink/10 to-unclub-red/10 dark:from-gray-700/10 dark:via-gray-600/10 dark:to-gray-700/10" />

          <CardContent className="relative p-8">
            {/* Header */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-unclub-pink via-unclub-purple to-unclub-red rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl"
                whileHover={{
                  rotate: [0, -5, 5, 0],
                  scale: 1.05,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  className="text-3xl"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  ✨
                </motion.span>
              </motion.div>

              <h1 className="text-3xl font-black bg-gradient-to-r from-unclub-pink via-unclub-purple to-unclub-red bg-clip-text text-transparent mb-2">
                {isLogin ? "Welcome Back!" : "Join the Party"}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {isLogin
                  ? "Ready to discover amazing events? 🎉"
                  : "Create your account and start exploring! 🚀"}
              </p>
            </motion.div>

            {/* Social Login */}
            <motion.div
              className="space-y-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {socialProviders.map((provider, index) => (
                <motion.div
                  key={provider.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="button"
                    onClick={() => handleSocialLogin(provider.name)}
                    className={`w-full h-12 bg-gradient-to-r ${provider.gradient} hover:${provider.hoverGradient} text-white border-0 rounded-2xl font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}
                  >
                    <span className="text-xl mr-3">{provider.icon}</span>
                    Continue with {provider.name}
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            {/* Divider */}
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Separator className="flex-1" />
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                or continue with email
              </span>
              <Separator className="flex-1" />
            </motion.div>

            {/* Form */}
            <motion.form
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              onSubmit={handleSubmit}
            >
              {!isLogin && (
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="pl-10 border-0 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 transition-colors rounded-2xl h-12"
                        required={!isLogin}
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="pl-10 border-0 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 transition-colors rounded-2xl h-12"
                        required={!isLogin}
                      />
                    </div>
                  </motion.div>
                </div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isLogin ? 0.8 : 1.0 }}
              >
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 border-0 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 transition-colors rounded-2xl h-12"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isLogin ? 0.9 : 1.1 }}
              >
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="pl-10 pr-10 border-0 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 transition-colors rounded-2xl h-12"
                    required
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className="pl-10 border-0 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 transition-colors rounded-2xl h-12"
                      required={!isLogin}
                    />
                  </div>
                </motion.div>
              )}

              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      handleInputChange("agreeToTerms", checked as boolean)
                    }
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                    I agree to the{" "}
                    <span className="text-unclub-purple font-semibold cursor-pointer hover:underline">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="text-unclub-purple font-semibold cursor-pointer hover:underline">
                      Privacy Policy
                    </span>
                  </label>
                </motion.div>
              )}

              {isLogin && (
                <motion.div
                  className="flex items-center justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400">
                      Remember me
                    </label>
                  </div>
                  <motion.button
                    type="button"
                    className="text-sm text-unclub-purple font-semibold hover:underline"
                    whileHover={{ scale: 1.05 }}
                  >
                    Forgot password?
                  </motion.button>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isLogin ? 1.1 : 1.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-unclub-pink via-unclub-purple to-unclub-red hover:from-unclub-purple hover:to-unclub-pink text-white rounded-2xl font-bold text-lg shadow-2xl disabled:opacity-50"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <motion.span
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {isLogin ? "Sign In & Explore 🚀" : "Create Account 🎉"}
                    </motion.span>
                  )}
                </Button>
              </motion.div>
            </motion.form>

            {/* Toggle */}
            <motion.div
              className="text-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: isLogin ? 1.2 : 1.5 }}
            >
              <span className="text-gray-600 dark:text-gray-400">
                {isLogin ? "New to UnClub?" : "Already have an account?"}
              </span>{" "}
              <motion.button
                onClick={() => setIsLogin(!isLogin)}
                className="text-unclub-purple font-bold hover:underline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLogin ? "Join the community" : "Sign in"}
              </motion.button>
            </motion.div>

            {/* Quick Demo Login */}
            <motion.div
              className="text-center mt-4 p-3 bg-gradient-to-r from-unclub-blue/10 to-unclub-pink/10 dark:from-gray-700/20 dark:to-gray-600/20 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: isLogin ? 1.3 : 1.6 }}
            >
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                Quick Demo Login:
              </p>
              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, email: "alex@example.com", password: "demo" }));
                    setIsLogin(true);
                  }}
                  className="px-3 py-1 bg-unclub-blue/20 text-unclub-blue rounded-lg hover:bg-unclub-blue/30 transition-colors"
                >
                  Alex Chen
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, email: "maya@example.com", password: "demo" }));
                    setIsLogin(true);
                  }}
                  className="px-3 py-1 bg-unclub-pink/20 text-unclub-pink rounded-lg hover:bg-unclub-pink/30 transition-colors"
                >
                  Maya Rodriguez
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, email: "jake@example.com", password: "demo" }));
                    setIsLogin(true);
                  }}
                  className="px-3 py-1 bg-unclub-red/20 text-unclub-red rounded-lg hover:bg-unclub-red/30 transition-colors"
                >
                  Jake Williams
                </button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
