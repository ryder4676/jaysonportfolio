import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { ArrowLeft, Plus, CheckCircle2, Circle, Calendar, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  dueDate: string;
  assignee: string;
};

type User = {
  id: string;
  name: string;
  avatar: string;
};

const users: User[] = [
  { id: "u1", name: "Alex Johnson", avatar: "bg-blue-500" },
  { id: "u2", name: "Sam Smith", avatar: "bg-green-500" },
  { id: "u3", name: "Taylor Williams", avatar: "bg-purple-500" },
  { id: "u4", name: "Jordan Lee", avatar: "bg-amber-500" }
];

const initialTasks: Task[] = [
  {
    id: "t1",
    title: "Finalize project proposal",
    description: "Review and update the proposal for client presentation",
    completed: false,
    priority: "high",
    dueDate: "2025-03-18",
    assignee: "u1"
  },
  {
    id: "t2",
    title: "Create wireframes",
    description: "Design initial wireframes for the mobile app interface",
    completed: true,
    priority: "medium",
    dueDate: "2025-03-15",
    assignee: "u2"
  },
  {
    id: "t3",
    title: "Frontend development setup",
    description: "Set up React environment and core components",
    completed: false,
    priority: "medium",
    dueDate: "2025-03-20",
    assignee: "u3"
  },
  {
    id: "t4",
    title: "API integration planning",
    description: "Document required endpoints and data models",
    completed: false,
    priority: "low",
    dueDate: "2025-03-22",
    assignee: "u4"
  },
  {
    id: "t5",
    title: "Weekly progress meeting",
    description: "Team sync on project status and blockers",
    completed: false,
    priority: "high",
    dueDate: "2025-03-14",
    assignee: "u1"
  }
];

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-blue-100 text-blue-800"
};

export default function TaskFlowDemo() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState({ 
    title: "", 
    description: "",
    priority: "medium",
    dueDate: "",
    assignee: "u1"
  });
  const [showAddTask, setShowAddTask] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<"all" | "completed" | "pending">("all");

  const handleToggleComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = () => {
    if (newTask.title.trim() === "") return;
    
    const task: Task = {
      id: `t${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      completed: false,
      priority: newTask.priority as "high" | "medium" | "low",
      dueDate: newTask.dueDate,
      assignee: newTask.assignee
    };
    
    setTasks([...tasks, task]);
    setNewTask({ 
      title: "", 
      description: "",
      priority: "medium",
      dueDate: "",
      assignee: "u1"
    });
    setShowAddTask(false);
  };

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "all") return true;
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <Link href="/portfolio/taskflow">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Project
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-center">TaskFlow</h1>
        <Button onClick={() => setShowAddTask(!showAddTask)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {showAddTask && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="Task title"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Task description"
                  className="mt-1"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask({...newTask, priority: value})}
                  >
                    <SelectTrigger id="priority" className="mt-1">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="assignee">Assignee</Label>
                  <Select
                    value={newTask.assignee}
                    onValueChange={(value) => setNewTask({...newTask, assignee: value})}
                  >
                    <SelectTrigger id="assignee" className="mt-1">
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map(user => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowAddTask(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTask}>
                  Add Task
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger 
            value="all" 
            onClick={() => setCurrentFilter("all")}
          >
            All Tasks
          </TabsTrigger>
          <TabsTrigger 
            value="pending" 
            onClick={() => setCurrentFilter("pending")}
          >
            Pending
          </TabsTrigger>
          <TabsTrigger 
            value="completed" 
            onClick={() => setCurrentFilter("completed")}
          >
            Completed
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No tasks found
          </div>
        ) : (
          filteredTasks.map(task => (
            <Card key={task.id} className={task.completed ? "opacity-70" : ""}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <button 
                    className="mt-1.5 flex-shrink-0" 
                    onClick={() => handleToggleComplete(task.id)}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
                        {task.title}
                      </h3>
                      <Badge className={priorityColors[task.priority]}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                      {task.dueDate && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      )}
                      
                      <div className="flex items-center">
                        {users.find(u => u.id === task.assignee) && (
                          <div className="flex items-center">
                            <div 
                              className={`h-5 w-5 rounded-full flex items-center justify-center text-white text-xs mr-1 ${users.find(u => u.id === task.assignee)?.avatar}`}
                            >
                              {users.find(u => u.id === task.assignee)?.name.charAt(0)}
                            </div>
                            <span className="text-xs text-gray-500">
                              {users.find(u => u.id === task.assignee)?.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}