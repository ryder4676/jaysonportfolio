import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  ArrowLeft, 
  FileText, 
  Users, 
  Calendar, 
  Bell,
  MessageSquare,
  Search,
  Plus,
  Mail,
  BarChart,
  Home,
  Settings,
  Folder,
  MoreHorizontal,
  Download,
  Share,
  ChevronDown,
  Star,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

// Sample data
type User = {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
  avatar: string;
};

type Document = {
  id: number;
  title: string;
  owner: string;
  uploadDate: string;
  type: string;
  size: string;
  starred: boolean;
};

type Task = {
  id: number;
  title: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "completed" | "inProgress" | "pending";
  assignedTo: number[];
};

type Event = {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  location: string;
  attendees: number[];
};

type Announcement = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  department: string;
};

const users: User[] = [
  { id: 1, name: "Alex Johnson", email: "alex.johnson@example.com", position: "Project Manager", department: "Product", avatar: "A" },
  { id: 2, name: "Sam Taylor", email: "sam.taylor@example.com", position: "Senior Developer", department: "Engineering", avatar: "S" },
  { id: 3, name: "Jamie Garcia", email: "jamie.garcia@example.com", position: "UX Designer", department: "Design", avatar: "J" },
  { id: 4, name: "Morgan Smith", email: "morgan.smith@example.com", position: "Marketing Specialist", department: "Marketing", avatar: "M" },
  { id: 5, name: "Taylor Wilson", email: "taylor.wilson@example.com", position: "HR Manager", department: "Human Resources", avatar: "T" },
];

const documents: Document[] = [
  { id: 1, title: "Q1 Financial Report", owner: "Finance Department", uploadDate: "2025-03-10", type: "PDF", size: "2.4 MB", starred: true },
  { id: 2, title: "Brand Guidelines 2025", owner: "Marketing Department", uploadDate: "2025-02-28", type: "PDF", size: "5.8 MB", starred: false },
  { id: 3, title: "Project Roadmap", owner: "Alex Johnson", uploadDate: "2025-03-05", type: "XLSX", size: "1.2 MB", starred: true },
  { id: 4, title: "Employee Handbook", owner: "HR Department", uploadDate: "2025-01-15", type: "DOCX", size: "3.5 MB", starred: false },
  { id: 5, title: "Product Specifications", owner: "Sam Taylor", uploadDate: "2025-03-08", type: "PDF", size: "4.1 MB", starred: false },
];

const tasks: Task[] = [
  { id: 1, title: "Finalize Q2 product roadmap", dueDate: "2025-03-18", priority: "high", status: "inProgress", assignedTo: [1, 2] },
  { id: 2, title: "Review marketing campaign assets", dueDate: "2025-03-15", priority: "medium", status: "pending", assignedTo: [4] },
  { id: 3, title: "Update employee onboarding documentation", dueDate: "2025-03-21", priority: "low", status: "completed", assignedTo: [5] },
  { id: 4, title: "Prepare for client presentation", dueDate: "2025-03-16", priority: "high", status: "inProgress", assignedTo: [1, 3] },
  { id: 5, title: "Fix critical bugs in production", dueDate: "2025-03-14", priority: "high", status: "pending", assignedTo: [2] },
];

const events: Event[] = [
  { id: 1, title: "Weekly Team Meeting", startTime: "2025-03-14 10:00", endTime: "2025-03-14 11:00", location: "Conference Room A", attendees: [1, 2, 3, 4, 5] },
  { id: 2, title: "Product Strategy Workshop", startTime: "2025-03-15 13:00", endTime: "2025-03-15 16:00", location: "Board Room", attendees: [1, 2, 3] },
  { id: 3, title: "Client Demo", startTime: "2025-03-16 14:30", endTime: "2025-03-16 15:30", location: "Zoom Meeting", attendees: [1, 3, 4] },
  { id: 4, title: "HR Policy Review", startTime: "2025-03-18 11:00", endTime: "2025-03-18 12:00", location: "Meeting Room B", attendees: [1, 5] },
];

const announcements: Announcement[] = [
  { 
    id: 1, 
    title: "New Project Management Tool Roll-out", 
    content: "We are excited to announce that we will be transitioning to a new project management platform starting next month. Training sessions will be scheduled soon.", 
    author: "Alex Johnson", 
    date: "2025-03-12", 
    department: "IT"
  },
  { 
    id: 2, 
    title: "Office Closure for Company Retreat", 
    content: "The office will be closed from April 5-7 for our annual company retreat. Please make necessary arrangements to complete time-sensitive tasks beforehand.", 
    author: "Taylor Wilson", 
    date: "2025-03-10", 
    department: "Human Resources"
  },
  { 
    id: 3, 
    title: "Q1 Performance Results", 
    content: "We are pleased to share that we exceeded our Q1 targets by 15%. Thank you all for your hard work and dedication.", 
    author: "Finance Department", 
    date: "2025-03-08", 
    department: "Finance"
  },
];

const priorityColors = {
  high: "text-red-500 bg-red-100",
  medium: "text-amber-500 bg-amber-100",
  low: "text-blue-500 bg-blue-100"
};

const statusColors = {
  completed: "bg-green-100 text-green-800",
  inProgress: "bg-blue-100 text-blue-800",
  pending: "bg-amber-100 text-amber-800"
};

const statusIcons = {
  completed: <CheckCircle className="h-4 w-4" />,
  inProgress: <Clock className="h-4 w-4" />,
  pending: <XCircle className="h-4 w-4" />
};

export default function CorporatePortalDemo() {
  const [activeSidebar, setActiveSidebar] = useState("dashboard");
  const [starredDocuments, setStarredDocuments] = useState(
    documents.filter(doc => doc.starred).map(doc => doc.id)
  );

  const toggleStar = (docId: number) => {
    if (starredDocuments.includes(docId)) {
      setStarredDocuments(starredDocuments.filter(id => id !== docId));
    } else {
      setStarredDocuments([...starredDocuments, docId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4 border-b">
          <Link href="/portfolio/corporateportal">
            <Button variant="outline" size="sm" className="w-full flex items-center justify-start gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Project
            </Button>
          </Link>
        </div>
        <div className="p-5">
          <h2 className="font-bold text-xl mb-6">Corporate Portal</h2>
          <nav className="space-y-1">
            <Button 
              variant={activeSidebar === "dashboard" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveSidebar("dashboard")}
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button 
              variant={activeSidebar === "documents" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveSidebar("documents")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Documents
            </Button>
            <Button 
              variant={activeSidebar === "tasks" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveSidebar("tasks")}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Tasks
            </Button>
            <Button 
              variant={activeSidebar === "calendar" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveSidebar("calendar")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </Button>
            <Button 
              variant={activeSidebar === "directory" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveSidebar("directory")}
            >
              <Users className="mr-2 h-4 w-4" />
              Directory
            </Button>
            <Button 
              variant={activeSidebar === "messages" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveSidebar("messages")}
            >
              <Mail className="mr-2 h-4 w-4" />
              Messages
              <Badge className="ml-auto">3</Badge>
            </Button>
            <Button 
              variant={activeSidebar === "settings" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveSidebar("settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center px-6">
          <div className="flex-1 flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2">
              <Home className="h-5 w-5" />
            </Button>
            <div className="relative max-w-md w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search..." 
                className="pl-10 bg-gray-50" 
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">
          {activeSidebar === "dashboard" && (
            <div className="space-y-6">
              {/* Welcome card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">Welcome back, Alex</h1>
                      <p className="text-gray-500">Here's what's happening in your workspace today</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Task
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Tasks Due</p>
                        <h3 className="text-2xl font-bold">5</h3>
                      </div>
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <CheckCircle className="h-6 w-6" />
                      </div>
                    </div>
                    <Progress value={40} className="h-2 mt-4" />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Upcoming Events</p>
                        <h3 className="text-2xl font-bold">3</h3>
                      </div>
                      <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                        <Calendar className="h-6 w-6" />
                      </div>
                    </div>
                    <Progress value={75} className="h-2 mt-4" />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">New Documents</p>
                        <h3 className="text-2xl font-bold">7</h3>
                      </div>
                      <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                        <FileText className="h-6 w-6" />
                      </div>
                    </div>
                    <Progress value={60} className="h-2 mt-4" />
                  </CardContent>
                </Card>
              </div>

              {/* Announcements */}
              <Card>
                <CardHeader>
                  <CardTitle>Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {announcements.map(announcement => (
                      <div key={announcement.id} className="border-b pb-4 last:border-0 last:pb-0">
                        <h3 className="font-medium text-lg">{announcement.title}</h3>
                        <p className="text-sm text-gray-500 mb-3">
                          {announcement.author} · {announcement.date} · {announcement.department}
                        </p>
                        <p className="text-gray-700">{announcement.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tasks and Events */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tasks.slice(0, 3).map(task => (
                        <div key={task.id} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                          <div className={`mt-1 p-1 rounded-full ${statusColors[task.status]}`}>
                            {statusIcons[task.status]}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{task.title}</h4>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-sm text-gray-500">Due {task.dueDate}</p>
                              <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                            </div>
                            <div className="flex -space-x-2 mt-2">
                              {task.assignedTo.map(userId => {
                                const user = users.find(u => u.id === userId);
                                return (
                                  <Avatar key={userId} className="h-6 w-6 border-2 border-white">
                                    <AvatarFallback className="text-xs">{user?.avatar}</AvatarFallback>
                                  </Avatar>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => setActiveSidebar("tasks")}>
                      View All Tasks
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {events.slice(0, 3).map(event => (
                        <div key={event.id} className="border-b pb-3 last:border-0 last:pb-0">
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="flex items-center mt-1">
                            <Calendar className="h-3.5 w-3.5 text-gray-500 mr-1.5" />
                            <p className="text-sm text-gray-500">
                              {new Date(event.startTime).toLocaleDateString()} at {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          <div className="flex items-center mt-1">
                            <Users className="h-3.5 w-3.5 text-gray-500 mr-1.5" />
                            <p className="text-sm text-gray-500">{event.attendees.length} attendees</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => setActiveSidebar("calendar")}>
                      View Calendar
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}

          {activeSidebar === "documents" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Document Library</h1>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Folder className="mr-2 h-4 w-4" />
                    New Folder
                  </Button>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All Documents</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="starred">Starred</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="grid grid-cols-12 bg-gray-100 p-4 border-b font-medium text-sm">
                  <div className="col-span-5">Name</div>
                  <div className="col-span-3 hidden md:block">Owner</div>
                  <div className="col-span-2 hidden md:block">Date</div>
                  <div className="col-span-1 hidden md:block">Size</div>
                  <div className="col-span-1 text-right">Actions</div>
                </div>

                {documents.map(doc => (
                  <div key={doc.id} className="grid grid-cols-12 p-4 border-b hover:bg-gray-50">
                    <div className="col-span-5 flex items-center">
                      <button 
                        onClick={() => toggleStar(doc.id)}
                        className="text-amber-400 mr-3"
                      >
                        <Star className={`h-5 w-5 ${starredDocuments.includes(doc.id) ? 'fill-current' : ''}`} />
                      </button>
                      <FileText className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <p className="font-medium">{doc.title}</p>
                        <p className="text-xs text-gray-500">{doc.type}</p>
                      </div>
                    </div>
                    <div className="col-span-3 hidden md:flex items-center">
                      {doc.owner}
                    </div>
                    <div className="col-span-2 hidden md:flex items-center">
                      {doc.uploadDate}
                    </div>
                    <div className="col-span-1 hidden md:flex items-center">
                      {doc.size}
                    </div>
                    <div className="col-span-7 md:col-span-1 flex items-center justify-end">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSidebar === "tasks" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Task Management</h1>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </div>

              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All Tasks</TabsTrigger>
                  <TabsTrigger value="inProgress">In Progress</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-4">
                {tasks.map(task => (
                  <Card key={task.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 p-1 rounded-full ${statusColors[task.status]}`}>
                          {statusIcons[task.status]}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{task.title}</h3>
                            <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 text-gray-500 mr-1.5" />
                              <p className="text-sm text-gray-500">Due {task.dueDate}</p>
                            </div>
                            <div className="flex -space-x-2">
                              {task.assignedTo.map(userId => {
                                const user = users.find(u => u.id === userId);
                                return (
                                  <Avatar key={userId} className="h-6 w-6 border-2 border-white">
                                    <AvatarFallback className="text-xs">{user?.avatar}</AvatarFallback>
                                  </Avatar>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeSidebar === "directory" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Employee Directory</h1>
              
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search employees..." 
                  className="pl-10" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map(user => (
                  <Card key={user.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>{user.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-gray-500">{user.position}</p>
                          <p className="text-xs text-gray-500">{user.department}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Mail className="h-3.5 w-3.5 mr-2" />
                          {user.email}
                        </div>
                        <Button variant="outline" className="w-full">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Stub content for other sections */}
          {activeSidebar === "calendar" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Calendar</h1>
              <Card>
                <CardContent className="p-6">
                  <p>Calendar content would go here</p>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeSidebar === "messages" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Messages</h1>
              <Card>
                <CardContent className="p-6">
                  <p>Messages content would go here</p>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeSidebar === "settings" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Settings</h1>
              <Card>
                <CardContent className="p-6">
                  <p>Settings content would go here</p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}