import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingBag, 
  ArrowUpRight, 
  ArrowDownRight,
  BarChart4,
  PieChart,
  LineChart
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts";

// Sample data for charts
const revenueData = [
  { month: "Jan", revenue: 8400 },
  { month: "Feb", revenue: 9200 },
  { month: "Mar", revenue: 9800 },
  { month: "Apr", revenue: 8900 },
  { month: "May", revenue: 11200 },
  { month: "Jun", revenue: 12800 },
  { month: "Jul", revenue: 14100 },
  { month: "Aug", revenue: 15400 },
  { month: "Sep", revenue: 16200 },
  { month: "Oct", revenue: 18000 },
  { month: "Nov", revenue: 19100 },
  { month: "Dec", revenue: 21200 },
];

const productPerformanceData = [
  { name: "Electronics", value: 42 },
  { name: "Clothing", value: 28 },
  { name: "Home & Garden", value: 15 },
  { name: "Sports", value: 10 },
  { name: "Other", value: 5 },
];

const customerData = [
  { age: "18-24", count: 1200 },
  { age: "25-34", count: 2800 },
  { age: "35-44", count: 3100 },
  { age: "45-54", count: 1800 },
  { age: "55-64", count: 1100 },
  { age: "65+", count: 600 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AnalyticsDemo() {
  const [timeRange, setTimeRange] = useState("year");

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <Link href="/portfolio/analytics">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Project
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-center">Financial Analytics</h1>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold">$156,243</h3>
                <div className="flex items-center text-green-500 text-sm mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+12.5% from last {timeRange}</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">New Customers</p>
                <h3 className="text-2xl font-bold">2,842</h3>
                <div className="flex items-center text-green-500 text-sm mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+8.1% from last {timeRange}</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Orders</p>
                <h3 className="text-2xl font-bold">4,721</h3>
                <div className="flex items-center text-green-500 text-sm mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+5.3% from last {timeRange}</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <ShoppingBag className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                <h3 className="text-2xl font-bold">3.42%</h3>
                <div className="flex items-center text-red-500 text-sm mt-1">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  <span>-0.8% from last {timeRange}</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart section */}
      <Tabs defaultValue="revenue" className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="revenue" className="flex items-center">
              <LineChart className="h-4 w-4 mr-2" />
              Revenue
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center">
              <PieChart className="h-4 w-4 mr-2" />
              Product Categories
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center">
              <BarChart4 className="h-4 w-4 mr-2" />
              Customer Demographics
            </TabsTrigger>
          </TabsList>
        </div>

        <Card>
          <TabsContent value="revenue" className="p-4">
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis 
                      tickFormatter={(value) => `$${value}`} 
                      domain={[0, 'dataMax + 2000']}
                    />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Revenue']}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8884d8"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="products" className="p-4">
            <CardHeader>
              <CardTitle>Product Category Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={productPerformanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {productPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Market Share']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="customers" className="p-4">
            <CardHeader>
              <CardTitle>Customer Age Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={customerData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value}`, 'Customers']}
                      labelFormatter={(label) => `Age Group: ${label}`}
                    />
                    <Bar dataKey="count" fill="#8884d8" barSize={40} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}