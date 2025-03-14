import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SiReact, SiNodedotjs, SiTypescript, SiMongodb, SiVuedotjs, SiD3Dotjs, SiExpress, SiFirebase, SiFlutter } from "react-icons/si";

// Define portfolio item type
type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  image: React.ReactNode;
  category: 'web' | 'mobile' | 'ecommerce';
  technologies: {
    icon: React.ReactNode;
    name: string;
    colorClass: string;
  }[];
};

// Define tech tag component
const TechTag = ({ icon, name, colorClass }: { icon: React.ReactNode; name: string; colorClass: string }) => (
  <span className={`${colorClass} text-xs font-medium px-2.5 py-0.5 rounded inline-flex items-center gap-1`}>
    {icon}
    {name}
  </span>
);

export default function PortfolioGrid() {
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'ecommerce'>('all');

  // Portfolio items data
  const portfolioItems: PortfolioItem[] = [
    {
      id: "techmarket",
      title: "TechMarket E-commerce",
      description: "Complete e-commerce solution with inventory management and payment processing.",
      image: (
        <svg 
          viewBox="0 0 24 24" 
          className="h-48 w-full object-cover bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white"
          stroke="currentColor" 
          fill="none" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      ),
      category: 'ecommerce',
      technologies: [
        { icon: <SiReact className="h-3 w-3" />, name: "React", colorClass: "bg-blue-100 text-blue-800" },
        { icon: <SiNodedotjs className="h-3 w-3" />, name: "Node.js", colorClass: "bg-green-100 text-green-800" },
        { icon: <SiMongodb className="h-3 w-3" />, name: "MongoDB", colorClass: "bg-purple-100 text-purple-800" },
      ],
    },
    {
      id: "taskflow",
      title: "TaskFlow App",
      description: "Productivity mobile application for task management with team collaboration features.",
      image: (
        <svg 
          viewBox="0 0 24 24" 
          className="h-48 w-full object-cover bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white"
          stroke="currentColor" 
          fill="none" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <path d="M9 16l2 2 4-4"></path>
        </svg>
      ),
      category: 'mobile',
      technologies: [
        { icon: <SiReact className="h-3 w-3" />, name: "React Native", colorClass: "bg-blue-100 text-blue-800" },
        { icon: <SiFirebase className="h-3 w-3" />, name: "Firebase", colorClass: "bg-yellow-100 text-yellow-800" },
        { icon: <SiTypescript className="h-3 w-3" />, name: "TypeScript", colorClass: "bg-indigo-100 text-indigo-800" },
      ],
    },
    {
      id: "analytics",
      title: "Analytics Dashboard",
      description: "Real-time data visualization dashboard for a financial services company.",
      image: (
        <svg 
          viewBox="0 0 24 24" 
          className="h-48 w-full object-cover bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white"
          stroke="currentColor" 
          fill="none" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
          <line x1="2" y1="20" x2="22" y2="20"></line>
        </svg>
      ),
      category: 'web',
      technologies: [
        { icon: <SiVuedotjs className="h-3 w-3" />, name: "Vue.js", colorClass: "bg-green-100 text-green-800" },
        { icon: <SiD3Dotjs className="h-3 w-3" />, name: "D3.js", colorClass: "bg-red-100 text-red-800" },
        { icon: <SiExpress className="h-3 w-3" />, name: "Express", colorClass: "bg-gray-100 text-gray-800" },
      ],
    },
    {
      id: "healthtrack",
      title: "HealthTrack Mobile App",
      description: "Health monitoring app with fitness tracking and personalized recommendations.",
      image: (
        <svg 
          viewBox="0 0 24 24" 
          className="h-48 w-full object-cover bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white"
          stroke="currentColor" 
          fill="none" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          <path d="M16 8l-8 8"></path>
          <path d="M8 8l8 8"></path>
        </svg>
      ),
      category: 'mobile',
      technologies: [
        { icon: <SiFlutter className="h-3 w-3" />, name: "Flutter", colorClass: "bg-blue-100 text-blue-800" },
        { icon: <SiFirebase className="h-3 w-3" />, name: "Firebase", colorClass: "bg-yellow-100 text-yellow-800" },
        { icon: <SiNodedotjs className="h-3 w-3" />, name: "Node.js", colorClass: "bg-green-100 text-green-800" },
      ],
    },
    {
      id: "boutiquestore",
      title: "Boutique Store",
      description: "Custom e-commerce platform for a high-end fashion boutique with virtual try-on features.",
      image: (
        <svg 
          viewBox="0 0 24 24" 
          className="h-48 w-full object-cover bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center text-white"
          stroke="currentColor" 
          fill="none" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
      ),
      category: 'ecommerce',
      technologies: [
        { icon: <SiReact className="h-3 w-3" />, name: "React", colorClass: "bg-blue-100 text-blue-800" },
        { icon: <SiTypescript className="h-3 w-3" />, name: "TypeScript", colorClass: "bg-indigo-100 text-indigo-800" },
        { icon: <SiNodedotjs className="h-3 w-3" />, name: "Node.js", colorClass: "bg-green-100 text-green-800" },
      ],
    },
    {
      id: "corporateportal",
      title: "Corporate Portal",
      description: "Internal employee portal with document management and team communication features.",
      image: (
        <svg 
          viewBox="0 0 24 24" 
          className="h-48 w-full object-cover bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white"
          stroke="currentColor" 
          fill="none" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      category: 'web',
      technologies: [
        { icon: <SiReact className="h-3 w-3" />, name: "React", colorClass: "bg-blue-100 text-blue-800" },
        { icon: <SiNodedotjs className="h-3 w-3" />, name: "Node.js", colorClass: "bg-green-100 text-green-800" },
        { icon: <SiMongodb className="h-3 w-3" />, name: "MongoDB", colorClass: "bg-purple-100 text-purple-800" },
      ],
    },
  ];

  // Filter the portfolio items based on the selected filter
  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  return (
    <div>
      <div className="flex justify-center space-x-2 mb-8">
        <Button
          onClick={() => setFilter('all')}
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
        >
          All
        </Button>
        <Button
          onClick={() => setFilter('web')}
          variant={filter === 'web' ? 'default' : 'outline'}
          size="sm"
        >
          Web Apps
        </Button>
        <Button
          onClick={() => setFilter('mobile')}
          variant={filter === 'mobile' ? 'default' : 'outline'}
          size="sm"
        >
          Mobile
        </Button>
        <Button
          onClick={() => setFilter('ecommerce')}
          variant={filter === 'ecommerce' ? 'default' : 'outline'}
          size="sm"
        >
          E-commerce
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="relative">
              {item.image}
              <div className="absolute inset-0 bg-primary bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <Button variant="secondary" size="sm" className="flex items-center gap-1">
                  View Details <ExternalLink className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-gray-600">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.technologies.map((tech, index) => (
                  <TechTag key={index} {...tech} />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/contact">
          <Button className="inline-flex items-center px-6">
            Start Your Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
