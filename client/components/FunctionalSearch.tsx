import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchProps {
  onSearch?: (params: SearchParams) => void;
  className?: string;
}

interface SearchParams {
  query: string;
  location: string;
  date: string;
  category: string;
}

const popularSearches = [
  "Pool Party",
  "Rooftop Vibes",
  "Birthday Bash",
  "Beach Party",
  "House Party",
  "Club Night",
  "BBQ Party",
  "Game Night",
];

const trendingLocations = [
  "Los Angeles",
  "New York",
  "Miami",
  "Las Vegas",
  "Austin",
  "Chicago",
  "San Francisco",
  "Denver",
];

const categories = [
  "All Events",
  "Parties",
  "Concerts",
  "Festivals",
  "Clubs",
  "Bars",
  "Outdoor",
  "Private Events",
];

export function FunctionalSearch({ onSearch, className = "" }: SearchProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    location: "",
    date: "",
    category: "",
  });
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = () => {
    onSearch?.(searchParams);
    setShowSuggestions(false);
    // You would typically navigate to /events with these params
    const urlParams = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) urlParams.set(key, value);
    });
    window.location.href = `/events?${urlParams.toString()}`;
  };

  const handleQuickSearch = (query: string) => {
    setSearchParams((prev) => ({ ...prev, query }));
    handleSearch();
  };

  const updateParam = (key: keyof SearchParams, value: string) => {
    setSearchParams((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div
      className={`w-full max-w-4xl mx-auto ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <motion.div
        className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/30 dark:border-gray-700/50"
        whileHover={{
          y: -4,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search Query */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <Input
              placeholder="What party are you looking for?"
              value={searchParams.query}
              onChange={(e) => updateParam("query", e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              className="pl-12 border-2 border-gray-200 dark:border-gray-600 focus:border-unclub-blue dark:focus:border-unclub-pink transition-colors rounded-2xl h-12 text-lg font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
          </div>

          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <Input
              placeholder="City"
              value={searchParams.location}
              onChange={(e) => updateParam("location", e.target.value)}
              className="pl-12 border-2 border-gray-200 dark:border-gray-600 focus:border-unclub-pink dark:focus:border-unclub-blue transition-colors rounded-2xl h-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
          </div>

          {/* Date */}
          <div className="relative">
            <Calendar className="absolute left-4 top-4 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <Input
              type="date"
              value={searchParams.date}
              onChange={(e) => updateParam("date", e.target.value)}
              className="pl-12 border-2 border-gray-200 dark:border-gray-600 focus:border-unclub-red dark:focus:border-unclub-coral transition-colors rounded-2xl h-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Category & Search Button */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="flex-1">
            <Select
              value={searchParams.category}
              onValueChange={(value) => updateParam("category", value)}
            >
              <SelectTrigger className="rounded-2xl h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-unclub-blue dark:focus:border-unclub-pink bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <SelectValue placeholder="Event type" />
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

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="sm:w-auto"
          >
            <Button
              onClick={handleSearch}
              className="w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-unclub-blue via-unclub-pink to-unclub-red hover:from-unclub-pink hover:to-unclub-blue text-white rounded-2xl font-bold shadow-xl transition-all duration-300"
            >
              <Search className="w-5 h-5 mr-2" />
              Find Parties
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-12 px-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 hover:border-unclub-blue dark:hover:border-unclub-pink bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <Filter className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>

        {/* Quick Search Suggestions */}
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-6"
            >
              <div className="border-t border-gray-200 pt-6">
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-gray-700 mb-3">
                    🔥 Trending Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search) => (
                      <motion.div
                        key={search}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge
                          variant="outline"
                          className="cursor-pointer hover:bg-unclub-blue hover:text-white hover:border-unclub-blue transition-all duration-200 rounded-full px-4 py-2"
                          onClick={() => handleQuickSearch(search)}
                        >
                          {search}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-3">
                    📍 Popular Cities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {trendingLocations.map((location) => (
                      <motion.div
                        key={location}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge
                          variant="outline"
                          className="cursor-pointer hover:bg-unclub-pink hover:text-white hover:border-unclub-pink transition-all duration-200 rounded-full px-4 py-2"
                          onClick={() => updateParam("location", location)}
                        >
                          {location}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.button
                  onClick={() => setShowSuggestions(false)}
                  className="mt-4 text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <X className="w-4 h-4" />
                  Close suggestions
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Advanced Filters */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Price Range
                    </label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Any price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="under-25">Under $25</SelectItem>
                        <SelectItem value="25-50">$25 - $50</SelectItem>
                        <SelectItem value="50-100">$50 - $100</SelectItem>
                        <SelectItem value="over-100">Over $100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Time
                    </label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Any time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                        <SelectItem value="evening">Evening</SelectItem>
                        <SelectItem value="night">Night</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Vibe
                    </label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Any vibe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chill">Chill & Relaxed</SelectItem>
                        <SelectItem value="party">High Energy</SelectItem>
                        <SelectItem value="intimate">Intimate</SelectItem>
                        <SelectItem value="wild">Wild & Crazy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Live Search Results Preview */}
      {searchParams.query && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <Card className="bg-white/90 backdrop-blur-sm rounded-2xl border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">
                🎉 Found{" "}
                <span className="font-bold text-unclub-blue">42 parties</span>{" "}
                matching "{searchParams.query}"
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
