import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Plus,
  Upload,
  MapPin,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Camera,
  Music,
  Sparkles,
  Zap,
  Heart,
  Crown,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { GenZParticles } from "@/components/GenZParticles";

const partyTypes = [
  {
    id: "house-party",
    name: "House Party",
    emoji: "🏠",
    gradient: "from-unclub-blue to-party-blue",
    description: "Intimate vibes at your place",
  },
  {
    id: "pool-party",
    name: "Pool Party",
    emoji: "🏊‍♀️",
    gradient: "from-unclub-pink to-party-pink",
    description: "Make a splash this summer",
  },
  {
    id: "rooftop",
    name: "Rooftop Vibes",
    emoji: "🌆",
    gradient: "from-unclub-red to-party-red",
    description: "Sky-high party energy",
  },
  {
    id: "beach-party",
    name: "Beach Party",
    emoji: "🏖️",
    gradient: "from-party-electric to-unclub-hotpink",
    description: "Sand, sun, and good times",
  },
  {
    id: "birthday",
    name: "Birthday Bash",
    emoji: "🎂",
    gradient: "from-unclub-blue to-unclub-pink",
    description: "Celebrate another year of awesome",
  },
  {
    id: "game-night",
    name: "Game Night",
    emoji: "🎮",
    gradient: "from-party-red to-unclub-coral",
    description: "Level up your social game",
  },
];

const vibeOptions = [
  { id: "chill", name: "Chill & Cozy", emoji: "😌" },
  { id: "party", name: "Party Hard", emoji: "🎉" },
  { id: "classy", name: "Classy & Elegant", emoji: "🥂" },
  { id: "wild", name: "Wild & Crazy", emoji: "🤪" },
  { id: "intimate", name: "Intimate & Close", emoji: "💝" },
  { id: "energetic", name: "High Energy", emoji: "⚡" },
];

const musicGenres = [
  "Pop",
  "Hip-Hop",
  "EDM",
  "Rock",
  "R&B",
  "Latin",
  "Indie",
  "Jazz",
  "Country",
  "Alternative",
];

export default function CreateParty() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPartyType, setSelectedPartyType] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    address: "",
    capacity: "",
    price: "",
    vibe: "",
    musicGenre: "",
    dresscode: "",
    ageRange: "",
    bringYourOwn: false,
    photosAllowed: true,
    parking: false,
    accessibility: false,
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const createParty = () => {
    // Here you would submit the form data
    console.log("Creating party:", formData);
    alert("🎉 Party created! Your guests are gonna love this!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-aesthetic-sage/20 via-aesthetic-stone/20 to-aesthetic-plum/20 pt-20">
      <GenZParticles />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.h1
            className="text-5xl font-black bg-gradient-to-r from-aesthetic-slate via-aesthetic-sage to-aesthetic-amber bg-clip-text text-transparent mb-4"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            Create Epic Party! 🎉
          </motion.h1>
          <p className="text-xl text-gray-600">
            Let's make some unforgettable memories together!
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          className="flex justify-center items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {[1, 2, 3, 4].map((step) => (
            <motion.div
              key={step}
              className={`flex items-center gap-2 ${step <= currentStep ? "text-unclub-blue" : "text-gray-400"}`}
              whileHover={{ scale: 1.05 }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  step <= currentStep
                    ? "bg-gradient-to-r from-unclub-blue to-unclub-pink text-white shadow-lg"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
              <span className="font-semibold text-sm hidden sm:block">
                {step === 1
                  ? "Party Type"
                  : step === 2
                    ? "Details"
                    : step === 3
                      ? "Vibe"
                      : "Finish"}
              </span>
              {step < 4 && <div className="w-8 h-px bg-gray-300" />}
            </motion.div>
          ))}
        </motion.div>

        {/* Step Content */}
        <Card className="bg-white/95 backdrop-blur-xl rounded-3xl border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Party Type */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    What kind of party are you throwing? 🤔
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {partyTypes.map((type, index) => (
                      <motion.div
                        key={type.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPartyType(type.id)}
                        className={`relative cursor-pointer rounded-3xl p-6 text-center border-2 transition-all duration-300 ${
                          selectedPartyType === type.id
                            ? "border-unclub-blue bg-gradient-to-br from-unclub-blue/10 to-unclub-pink/10 shadow-xl"
                            : "border-gray-200 hover:border-unclub-pink/50 hover:shadow-lg"
                        }`}
                      >
                        <div className="text-4xl mb-3">{type.emoji}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {type.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {type.description}
                        </p>

                        {selectedPartyType === type.id && (
                          <motion.div
                            className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-unclub-blue to-unclub-pink rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <Star className="w-4 h-4 text-white fill-current" />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Party Details */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Tell us the deets! 📝
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-bold text-gray-700 mb-2">
                        Party Name *
                      </label>
                      <Input
                        placeholder="e.g., Epic Summer Pool Bash ��‍♀️"
                        value={formData.title}
                        onChange={(e) =>
                          updateFormData("title", e.target.value)
                        }
                        className="rounded-2xl h-14 text-lg border-2 border-gray-200 focus:border-unclub-blue"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-lg font-bold text-gray-700 mb-2">
                          Date *
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
                          <Input
                            type="date"
                            value={formData.date}
                            onChange={(e) =>
                              updateFormData("date", e.target.value)
                            }
                            className="pl-14 rounded-2xl h-14 border-2 border-gray-200 focus:border-unclub-pink"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-lg font-bold text-gray-700 mb-2">
                          Time *
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
                          <Input
                            type="time"
                            value={formData.time}
                            onChange={(e) =>
                              updateFormData("time", e.target.value)
                            }
                            className="pl-14 rounded-2xl h-14 border-2 border-gray-200 focus:border-unclub-red"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-lg font-bold text-gray-700 mb-2">
                        Location *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
                        <Input
                          placeholder="Where's the party at?"
                          value={formData.location}
                          onChange={(e) =>
                            updateFormData("location", e.target.value)
                          }
                          className="pl-14 rounded-2xl h-14 border-2 border-gray-200 focus:border-unclub-blue"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-lg font-bold text-gray-700 mb-2">
                          How many people? *
                        </label>
                        <div className="relative">
                          <Users className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
                          <Input
                            type="number"
                            placeholder="50"
                            value={formData.capacity}
                            onChange={(e) =>
                              updateFormData("capacity", e.target.value)
                            }
                            className="pl-14 rounded-2xl h-14 border-2 border-gray-200 focus:border-unclub-pink"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-lg font-bold text-gray-700 mb-2">
                          Entry Price ($)
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
                          <Input
                            type="number"
                            placeholder="0 (Free!)"
                            value={formData.price}
                            onChange={(e) =>
                              updateFormData("price", e.target.value)
                            }
                            className="pl-14 rounded-2xl h-14 border-2 border-gray-200 focus:border-unclub-red"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-lg font-bold text-gray-700 mb-2">
                        Tell people what to expect! ✨
                      </label>
                      <Textarea
                        placeholder="Describe the vibe, what you'll have, who should come, etc..."
                        value={formData.description}
                        onChange={(e) =>
                          updateFormData("description", e.target.value)
                        }
                        className="rounded-2xl min-h-[120px] border-2 border-gray-200 focus:border-unclub-blue"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Vibe & Preferences */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Set the vibe! 🎵✨
                  </h2>

                  <div className="space-y-8">
                    {/* Vibe Selection */}
                    <div>
                      <label className="block text-lg font-bold text-gray-700 mb-4">
                        What's the vibe?
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {vibeOptions.map((vibe) => (
                          <motion.div
                            key={vibe.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => updateFormData("vibe", vibe.id)}
                            className={`cursor-pointer p-4 rounded-2xl border-2 text-center transition-all ${
                              formData.vibe === vibe.id
                                ? "border-unclub-blue bg-unclub-blue/10"
                                : "border-gray-200 hover:border-unclub-pink/50"
                            }`}
                          >
                            <div className="text-2xl mb-2">{vibe.emoji}</div>
                            <div className="font-semibold text-sm">
                              {vibe.name}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Music Genre */}
                    <div>
                      <label className="block text-lg font-bold text-gray-700 mb-2">
                        Music Genre
                      </label>
                      <Select
                        value={formData.musicGenre}
                        onValueChange={(value) =>
                          updateFormData("musicGenre", value)
                        }
                      >
                        <SelectTrigger className="rounded-2xl h-14 border-2 border-gray-200">
                          <SelectValue placeholder="What music will be playing?" />
                        </SelectTrigger>
                        <SelectContent>
                          {musicGenres.map((genre) => (
                            <SelectItem key={genre} value={genre.toLowerCase()}>
                              {genre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Party Settings */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-700">
                        Party Settings
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                          <div>
                            <div className="font-semibold">
                              Photos Allowed 📸
                            </div>
                            <div className="text-sm text-gray-600">
                              Let people take pics?
                            </div>
                          </div>
                          <Switch
                            checked={formData.photosAllowed}
                            onCheckedChange={(checked) =>
                              updateFormData("photosAllowed", checked)
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                          <div>
                            <div className="font-semibold">BYOB 🍺</div>
                            <div className="text-sm text-gray-600">
                              Bring your own drinks?
                            </div>
                          </div>
                          <Switch
                            checked={formData.bringYourOwn}
                            onCheckedChange={(checked) =>
                              updateFormData("bringYourOwn", checked)
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                          <div>
                            <div className="font-semibold">
                              Parking Available 🚗
                            </div>
                            <div className="text-sm text-gray-600">
                              Is there parking?
                            </div>
                          </div>
                          <Switch
                            checked={formData.parking}
                            onCheckedChange={(checked) =>
                              updateFormData("parking", checked)
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                          <div>
                            <div className="font-semibold">Accessible ♿</div>
                            <div className="text-sm text-gray-600">
                              Wheelchair accessible?
                            </div>
                          </div>
                          <Switch
                            checked={formData.accessibility}
                            onCheckedChange={(checked) =>
                              updateFormData("accessibility", checked)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Preview & Publish */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Ready to party? 🚀
                  </h2>

                  <div className="bg-gradient-to-br from-unclub-blue/10 to-unclub-pink/10 rounded-3xl p-8 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {formData.title || "Your Epic Party"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                      <div>
                        📅 {formData.date} at {formData.time}
                      </div>
                      <div>📍 {formData.location}</div>
                      <div>👥 {formData.capacity} people max</div>
                      <div>
                        💰 {formData.price ? `$${formData.price}` : "Free!"}
                      </div>
                    </div>
                    <p className="mt-4 text-gray-600">{formData.description}</p>
                  </div>

                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={createParty}
                        className="bg-gradient-to-r from-unclub-blue via-unclub-pink to-unclub-red hover:from-unclub-pink hover:to-unclub-blue text-white px-12 py-4 rounded-3xl text-xl font-bold shadow-2xl"
                      >
                        🎉 Create Party & Invite Friends!
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="px-8 py-3 rounded-2xl font-bold disabled:opacity-50"
              >
                Back
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={nextStep}
                  disabled={currentStep === 1 && !selectedPartyType}
                  className="bg-gradient-to-r from-unclub-blue to-unclub-pink text-white px-8 py-3 rounded-2xl font-bold disabled:opacity-50"
                >
                  Next Step
                </Button>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
