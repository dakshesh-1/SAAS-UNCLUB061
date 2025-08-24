import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Users, Calendar, DollarSign, TrendingUp, Shield, AlertTriangle,
  CheckCircle, XCircle, Eye, Edit, Trash2, Ban, UserCheck,
  BarChart3, Activity, Globe, Clock, Star, Crown, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock admin data
const adminStats = [
  {
    title: "Total Users",
    value: "125K",
    change: "+12%",
    trend: "up",
    icon: Users,
    gradient: "from-instagram-pink to-instagram-purple"
  },
  {
    title: "Active Events",
    value: "2.4K",
    change: "+8%",
    trend: "up",
    icon: Calendar,
    gradient: "from-instagram-purple to-instagram-blue"
  },
  {
    title: "Platform Revenue",
    value: "$1.2M",
    change: "+23%",
    trend: "up",
    icon: DollarSign,
    gradient: "from-instagram-orange to-instagram-yellow"
  },
  {
    title: "Success Rate",
    value: "98.5%",
    change: "+0.3%",
    trend: "up",
    icon: TrendingUp,
    gradient: "from-genz-mint to-genz-cyber"
  }
];

const recentUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9e2b36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    status: "active",
    role: "host",
    joinDate: "2024-01-15",
    eventsHosted: 12,
    totalRevenue: "$5,400"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    email: "marcus@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    status: "active",
    role: "attendee",
    joinDate: "2024-02-20",
    eventsAttended: 24,
    totalSpent: "$1,200"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    email: "emma@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    status: "pending",
    role: "host",
    joinDate: "2024-03-10",
    eventsHosted: 0,
    totalRevenue: "$0"
  }
];

const pendingEvents = [
  {
    id: 1,
    title: "Tech Conference 2024",
    host: "Alex Kim",
    category: "Technology",
    date: "2024-08-15",
    attendees: 500,
    price: "$299",
    status: "pending",
    submittedDate: "2024-07-01"
  },
  {
    id: 2,
    title: "Music Festival",
    host: "Sarah Chen",
    category: "Music",
    date: "2024-09-20",
    attendees: 2000,
    price: "$89",
    status: "under_review",
    submittedDate: "2024-07-05"
  }
];

const systemAlerts = [
  {
    id: 1,
    type: "warning",
    message: "High server load detected in NYC region",
    time: "5 minutes ago",
    severity: "medium"
  },
  {
    id: 2,
    type: "info",
    message: "Scheduled maintenance completed successfully",
    time: "1 hour ago",
    severity: "low"
  },
  {
    id: 3,
    type: "error",
    message: "Payment processing issue resolved",
    time: "2 hours ago",
    severity: "high"
  }
];

export default function Admin() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50">
      {/* Header */}
      <motion.div
        className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-20 z-30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                className="text-4xl font-black bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-orange bg-clip-text text-transparent"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                Admin Control Center
              </motion.h1>
              <motion.p
                className="text-gray-600 mt-1 flex items-center gap-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Shield className="w-4 h-4" />
                Monitor and manage platform operations 🛡️
              </motion.p>
            </div>
            
            <motion.div
              className="flex items-center gap-3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full px-4 py-2">
                <Activity className="w-4 h-4 mr-2" />
                System Healthy
              </Badge>
              <Button variant="outline" className="rounded-2xl">
                <Globe className="w-4 h-4 mr-2" />
                Global View
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {adminStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-0 shadow-xl overflow-hidden relative">
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    background: `linear-gradient(45deg, hsl(var(--instagram-pink)), hsl(var(--instagram-purple)))`,
                    backgroundSize: "200% 200%",
                  }}
                />
                <CardContent className="p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(255, 0, 150, 0.3)",
                          "0 0 40px rgba(255, 0, 150, 0.1)",
                          "0 0 20px rgba(255, 0, 150, 0.3)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <Badge className={`bg-gradient-to-r ${stat.gradient} text-white rounded-full px-3 py-1`}>
                      {stat.change}
                    </Badge>
                  </div>
                  <motion.h3
                    className="text-3xl font-black text-gray-900 mb-1"
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm rounded-2xl p-1 mb-8">
              <TabsTrigger value="overview" className="rounded-xl font-semibold">Overview</TabsTrigger>
              <TabsTrigger value="users" className="rounded-xl font-semibold">Users</TabsTrigger>
              <TabsTrigger value="events" className="rounded-xl font-semibold">Events</TabsTrigger>
              <TabsTrigger value="system" className="rounded-xl font-semibold">System</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-instagram-purple" />
                      Platform Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-to-br from-instagram-pink/10 to-instagram-purple/10 rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-16 h-16 text-instagram-purple mx-auto mb-4" />
                        <p className="text-gray-600 font-semibold">📊 Real-time Analytics</p>
                        <p className="text-sm text-gray-500 mt-2">Live activity monitoring dashboard</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* System Health */}
                <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-instagram-yellow" />
                      System Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "API Response Time", value: "45ms", status: "excellent", color: "green" },
                        { name: "Database Performance", value: "98%", status: "good", color: "blue" },
                        { name: "Storage Usage", value: "67%", status: "normal", color: "yellow" },
                        { name: "Active Connections", value: "12.4K", status: "high", color: "purple" }
                      ].map((metric, index) => (
                        <motion.div
                          key={metric.name}
                          className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-gray-50 to-white"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <div className="flex items-center gap-3">
                            <motion.div
                              className={`w-3 h-3 bg-${metric.color}-500 rounded-full`}
                              animate={{
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.2,
                              }}
                            />
                            <span className="font-medium text-gray-900">{metric.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">{metric.value}</div>
                            <div className="text-xs text-gray-500 capitalize">{metric.status}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* System Alerts */}
              <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-instagram-orange" />
                    System Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {systemAlerts.map((alert, index) => (
                      <motion.div
                        key={alert.id}
                        className={`p-4 rounded-2xl border-l-4 ${
                          alert.severity === 'high' 
                            ? 'border-red-500 bg-red-50' 
                            : alert.severity === 'medium'
                            ? 'border-yellow-500 bg-yellow-50'
                            : 'border-blue-500 bg-blue-50'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5, scale: 1.01 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <motion.div
                              animate={{
                                rotate: alert.type === 'error' ? [0, 5, -5, 0] : 0,
                              }}
                              transition={{
                                duration: 1,
                                repeat: alert.type === 'error' ? Infinity : 0,
                              }}
                            >
                              {alert.type === 'error' ? (
                                <XCircle className="w-5 h-5 text-red-600" />
                              ) : alert.type === 'warning' ? (
                                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                              ) : (
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                              )}
                            </motion.div>
                            <div>
                              <p className="font-medium text-gray-900">{alert.message}</p>
                              <p className="text-sm text-gray-600">{alert.time}</p>
                            </div>
                          </div>
                          <Badge 
                            className={`rounded-full px-3 py-1 ${
                              alert.severity === 'high' 
                                ? 'bg-red-100 text-red-800' 
                                : alert.severity === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {alert.severity}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              {/* User Management Header */}
              <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="rounded-2xl max-w-md"
                      />
                      <Select>
                        <SelectTrigger className="rounded-2xl w-48">
                          <SelectValue placeholder="Filter by role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Users</SelectItem>
                          <SelectItem value="host">Hosts</SelectItem>
                          <SelectItem value="attendee">Attendees</SelectItem>
                          <SelectItem value="admin">Admins</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" className="rounded-2xl">
                        Export Data
                      </Button>
                      <Button className="bg-gradient-to-r from-instagram-pink to-instagram-purple text-white rounded-2xl">
                        Add User
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Users Table */}
              <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user, index) => (
                      <motion.div
                        key={user.id}
                        className="p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5, scale: 1.01 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <motion.div whileHover={{ scale: 1.1 }}>
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                              </Avatar>
                            </motion.div>
                            
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-gray-900">{user.name}</h3>
                                <Badge className={`rounded-full px-2 py-1 text-xs ${
                                  user.role === 'host' 
                                    ? 'bg-gradient-to-r from-instagram-purple to-instagram-blue text-white'
                                    : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                                }`}>
                                  {user.role === 'host' && <Crown className="w-3 h-3 mr-1" />}
                                  {user.role}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">{user.email}</p>
                              <p className="text-xs text-gray-500">Joined {user.joinDate}</p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center gap-4 mb-2">
                              {user.role === 'host' ? (
                                <>
                                  <div className="text-center">
                                    <div className="font-bold text-gray-900">{user.eventsHosted}</div>
                                    <div className="text-xs text-gray-600">Events</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="font-bold text-green-600">{user.totalRevenue}</div>
                                    <div className="text-xs text-gray-600">Revenue</div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="text-center">
                                    <div className="font-bold text-gray-900">{user.eventsAttended}</div>
                                    <div className="text-xs text-gray-600">Attended</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="font-bold text-blue-600">{user.totalSpent}</div>
                                    <div className="text-xs text-gray-600">Spent</div>
                                  </div>
                                </>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Badge className={`rounded-full px-2 py-1 text-xs ${
                                user.status === 'active' 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {user.status}
                              </Badge>
                              
                              <div className="flex items-center gap-1">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button variant="outline" size="sm" className="rounded-xl">
                                    <Eye className="w-3 h-3" />
                                  </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button variant="outline" size="sm" className="rounded-xl">
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button variant="outline" size="sm" className="rounded-xl text-red-600 hover:bg-red-50">
                                    <Ban className="w-3 h-3" />
                                  </Button>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-6">
              {/* Pending Events */}
              <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-instagram-orange" />
                    Pending Approvals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5, scale: 1.01 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1">{event.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <span>by {event.host}</span>
                              <Badge variant="outline">{event.category}</Badge>
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span>{event.attendees} capacity</span>
                              <span className="font-semibold text-green-600">{event.price}</span>
                              <span className="text-gray-500">Submitted {event.submittedDate}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge className={`rounded-full px-3 py-1 ${
                              event.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {event.status.replace('_', ' ')}
                            </Badge>
                            
                            <div className="flex items-center gap-1">
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button variant="outline" size="sm" className="rounded-xl">
                                  <Eye className="w-3 h-3" />
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-xl">
                                  <UserCheck className="w-3 h-3 mr-1" />
                                  Approve
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button variant="outline" size="sm" className="rounded-xl text-red-600 hover:bg-red-50">
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Reject
                                </Button>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Server Status */}
                <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Server Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { region: "US East", status: "operational", load: "23%", ping: "12ms" },
                        { region: "US West", status: "operational", load: "31%", ping: "18ms" },
                        { region: "Europe", status: "maintenance", load: "0%", ping: "N/A" },
                        { region: "Asia Pacific", status: "operational", load: "45%", ping: "34ms" }
                      ].map((server, index) => (
                        <motion.div
                          key={server.region}
                          className="flex items-center justify-between p-3 rounded-2xl bg-gray-50"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center gap-3">
                            <motion.div
                              className={`w-3 h-3 rounded-full ${
                                server.status === 'operational' ? 'bg-green-500' :
                                server.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              animate={{
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.2,
                              }}
                            />
                            <span className="font-medium">{server.region}</span>
                          </div>
                          <div className="text-right text-sm">
                            <div className="capitalize">{server.status}</div>
                            <div className="text-gray-500">{server.load} load • {server.ping}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-to-br from-instagram-blue/10 to-genz-cyber/10 rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <TrendingUp className="w-16 h-16 text-instagram-blue mx-auto mb-4" />
                        <p className="text-gray-600 font-semibold">📈 Performance Metrics</p>
                        <p className="text-sm text-gray-500 mt-2">Real-time system performance tracking</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
