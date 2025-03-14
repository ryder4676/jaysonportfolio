import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { 
  ArrowLeft, 
  Heart, 
  Activity, 
  Coffee, 
  Moon, 
  Utensils, 
  Droplet,
  Plus,
  Flame,
  Clock,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { Progress } from "@/components/ui/progress";

// Sample data
const weeklyStepsData = [
  { day: "Mon", steps: 8245 },
  { day: "Tue", steps: 7891 },
  { day: "Wed", steps: 6354 },
  { day: "Thu", steps: 9812 },
  { day: "Fri", steps: 8756 },
  { day: "Sat", steps: 10237 },
  { day: "Sun", steps: 5489 },
];

const weeklyHeartRateData = [
  { time: "6 AM", rate: 62 },
  { time: "9 AM", rate: 75 },
  { time: "12 PM", rate: 81 },
  { time: "3 PM", rate: 76 },
  { time: "6 PM", rate: 83 },
  { time: "9 PM", rate: 72 },
  { time: "12 AM", rate: 65 },
];

const sleepData = [
  { day: "Mon", hours: 7.2 },
  { day: "Tue", hours: 6.8 },
  { day: "Wed", hours: 7.9 },
  { day: "Thu", hours: 6.4 },
  { day: "Fri", hours: 7.1 },
  { day: "Sat", hours: 8.5 },
  { day: "Sun", hours: 7.8 },
];

const waterIntake = [
  { time: "8 AM", amount: 250 },
  { time: "10 AM", amount: 200 },
  { time: "12 PM", amount: 300 },
  { time: "2 PM", amount: 200 },
  { time: "4 PM", amount: 250 },
  { time: "6 PM", amount: 200 },
  { time: "8 PM", amount: 100 },
];

const mealLog = [
  { 
    id: 1, 
    meal: "Breakfast", 
    time: "7:30 AM", 
    calories: 420, 
    items: [
      "Oatmeal with berries",
      "Greek yogurt",
      "Black coffee"
    ] 
  },
  { 
    id: 2, 
    meal: "Lunch", 
    time: "12:15 PM", 
    calories: 680, 
    items: [
      "Grilled chicken sandwich",
      "Side salad",
      "Sparkling water"
    ] 
  },
  { 
    id: 3, 
    meal: "Snack", 
    time: "3:30 PM", 
    calories: 190, 
    items: [
      "Apple",
      "Handful of almonds"
    ] 
  },
  { 
    id: 4, 
    meal: "Dinner", 
    time: "7:00 PM", 
    calories: 710, 
    items: [
      "Salmon fillet",
      "Quinoa",
      "Roasted vegetables",
      "Glass of water"
    ] 
  }
];

export default function HealthTrackDemo() {
  const [selectedMealDetails, setSelectedMealDetails] = useState<number | null>(null);

  // Calculate totals
  const totalSteps = weeklyStepsData.reduce((sum, day) => sum + day.steps, 0);
  const avgSteps = Math.round(totalSteps / weeklyStepsData.length);
  const dailyStepsGoal = 10000;
  const stepsProgress = Math.min(100, Math.round((avgSteps / dailyStepsGoal) * 100));

  const totalSleep = sleepData.reduce((sum, day) => sum + day.hours, 0);
  const avgSleep = (totalSleep / sleepData.length).toFixed(1);
  const sleepGoal = 8;
  const sleepProgress = Math.min(100, Math.round((parseFloat(avgSleep) / sleepGoal) * 100));

  const totalWater = waterIntake.reduce((sum, entry) => sum + entry.amount, 0);
  const waterGoal = 2000;
  const waterProgress = Math.min(100, Math.round((totalWater / waterGoal) * 100));

  const totalCalories = mealLog.reduce((sum, meal) => sum + meal.calories, 0);
  const calorieGoal = 2100;
  const calorieProgress = Math.min(100, Math.round((totalCalories / calorieGoal) * 100));

  const toggleMealDetails = (id: number) => {
    if (selectedMealDetails === id) {
      setSelectedMealDetails(null);
    } else {
      setSelectedMealDetails(id);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <Link href="/portfolio/healthtrack">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Project
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-center">HealthTrack</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Data
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Flame className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Daily Steps</p>
                  <h3 className="text-2xl font-bold">{avgSteps.toLocaleString()}</h3>
                </div>
              </div>
              <div className="text-sm text-gray-500">{stepsProgress}%</div>
            </div>
            <Progress value={stepsProgress} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">Goal: {dailyStepsGoal.toLocaleString()} steps</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Moon className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Avg Sleep</p>
                  <h3 className="text-2xl font-bold">{avgSleep} hrs</h3>
                </div>
              </div>
              <div className="text-sm text-gray-500">{sleepProgress}%</div>
            </div>
            <Progress value={sleepProgress} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">Goal: {sleepGoal} hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Droplet className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Water Intake</p>
                  <h3 className="text-2xl font-bold">{(totalWater / 1000).toFixed(1)}L</h3>
                </div>
              </div>
              <div className="text-sm text-gray-500">{waterProgress}%</div>
            </div>
            <Progress value={waterProgress} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">Goal: {(waterGoal / 1000).toFixed(1)}L</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Utensils className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Calories</p>
                  <h3 className="text-2xl font-bold">{totalCalories}</h3>
                </div>
              </div>
              <div className="text-sm text-gray-500">{calorieProgress}%</div>
            </div>
            <Progress value={calorieProgress} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">Goal: {calorieGoal} cal</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts section */}
      <Tabs defaultValue="activity" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="activity" className="flex items-center">
            <Activity className="h-4 w-4 mr-2" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="heart" className="flex items-center">
            <Heart className="h-4 w-4 mr-2" />
            Heart Rate
          </TabsTrigger>
          <TabsTrigger value="sleep" className="flex items-center">
            <Moon className="h-4 w-4 mr-2" />
            Sleep
          </TabsTrigger>
          <TabsTrigger value="water" className="flex items-center">
            <Droplet className="h-4 w-4 mr-2" />
            Water
          </TabsTrigger>
        </TabsList>

        <Card className="mt-6">
          <TabsContent value="activity">
            <CardHeader>
              <CardTitle>Weekly Step Count</CardTitle>
              <CardDescription>Your daily steps for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyStepsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[0, 12000]} />
                    <Tooltip formatter={(value) => [`${value.toLocaleString()} steps`, 'Steps']} />
                    <Bar dataKey="steps" fill="#ff9f43" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="heart">
            <CardHeader>
              <CardTitle>Heart Rate</CardTitle>
              <CardDescription>Average heart rate throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyHeartRateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[50, 100]} />
                    <Tooltip formatter={(value) => [`${value} bpm`, 'Heart Rate']} />
                    <Line 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="#ee5253" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="sleep">
            <CardHeader>
              <CardTitle>Sleep Duration</CardTitle>
              <CardDescription>Hours of sleep per night</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sleepData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip formatter={(value) => [`${value} hours`, 'Sleep']} />
                    <Bar dataKey="hours" fill="#a55eea" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="water">
            <CardHeader>
              <CardTitle>Water Intake</CardTitle>
              <CardDescription>Water consumption throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={waterIntake}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 500]} />
                    <Tooltip formatter={(value) => [`${value} ml`, 'Water']} />
                    <Bar dataKey="amount" fill="#54a0ff" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>

      {/* Meal tracking */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Today's Meals</h2>
        <div className="space-y-4">
          {mealLog.map((meal) => (
            <Card key={meal.id}>
              <CardContent className="p-4">
                <div 
                  className="flex justify-between items-center cursor-pointer" 
                  onClick={() => toggleMealDetails(meal.id)}
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Utensils className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{meal.meal}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{meal.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3 text-sm font-medium">{meal.calories} cal</span>
                    {selectedMealDetails === meal.id ? 
                      <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    }
                  </div>
                </div>
                
                {selectedMealDetails === meal.id && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Meal items:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {meal.items.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}