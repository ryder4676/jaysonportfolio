import { useEffect, useState } from "react";
import { useLocation, useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SiReact, SiNodedotjs, SiTypescript, SiMongodb, SiVuedotjs, SiD3Dotjs, SiExpress, SiFirebase, SiFlutter } from "react-icons/si";

// Define portfolio item type
type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  image: React.ReactNode;
  category: 'web' | 'mobile' | 'ecommerce';
  technologies: {
    icon: React.ReactNode;
    name: string;
    colorClass: string;
  }[];
  features: string[];
  clientFeedback?: string;
  projectLink?: string;
};

// Sample portfolio data
const portfolioItems: PortfolioItem[] = [
  {
    id: "techmarket",
    title: "TechMarket E-commerce",
    description: "Complete e-commerce solution with inventory management and payment processing.",
    detailedDescription: "A full-featured e-commerce platform for a technology retailer with over 500 products. The solution includes inventory management, payment processing, order tracking, and a customer loyalty program.",
    image: (
      <svg 
        viewBox="0 0 24 24" 
        className="h-64 w-full object-cover bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white"
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
      { icon: <SiReact className="h-4 w-4" />, name: "React", colorClass: "bg-blue-100 text-blue-800" },
      { icon: <SiNodedotjs className="h-4 w-4" />, name: "Node.js", colorClass: "bg-green-100 text-green-800" },
      { icon: <SiMongodb className="h-4 w-4" />, name: "MongoDB", colorClass: "bg-purple-100 text-purple-800" },
    ],
    features: [
      "Responsive design for all devices",
      "Secure payment processing with Stripe",
      "Inventory management system",
      "Customer account dashboard",
      "Order tracking and history",
      "Product reviews and ratings",
      "Admin dashboard for order management",
      "Real-time sales analytics"
    ],
    clientFeedback: "DevCraft Studio delivered a fantastic e-commerce platform that has significantly increased our online sales. The system is intuitive, reliable, and our customers love the shopping experience.",
    projectLink: "https://techmarket-example.com"
  },
  {
    id: "taskflow",
    title: "TaskFlow App",
    description: "Productivity mobile application for task management with team collaboration features.",
    detailedDescription: "TaskFlow is a cross-platform mobile application designed to boost productivity for teams and individuals. It features intuitive task management, team collaboration tools, and progress tracking with custom notifications.",
    image: (
      <svg 
        viewBox="0 0 24 24" 
        className="h-64 w-full object-cover bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white"
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
      { icon: <SiReact className="h-4 w-4" />, name: "React Native", colorClass: "bg-blue-100 text-blue-800" },
      { icon: <SiFirebase className="h-4 w-4" />, name: "Firebase", colorClass: "bg-yellow-100 text-yellow-800" },
      { icon: <SiTypescript className="h-4 w-4" />, name: "TypeScript", colorClass: "bg-indigo-100 text-indigo-800" },
    ],
    features: [
      "Cross-platform (iOS & Android)",
      "Intuitive task management",
      "Team collaboration tools",
      "Progress tracking & analytics",
      "Custom notifications",
      "Offline capabilities",
      "Cloud synchronization",
      "Time tracking for tasks"
    ],
    clientFeedback: "The TaskFlow app has completely transformed how our team manages projects. It's intuitive, reliable, and has all the features we need without being overly complex. Highly recommended!",
    projectLink: "https://taskflow-app.example.com"
  },
  {
    id: "analytics",
    title: "Analytics Dashboard",
    description: "Real-time data visualization dashboard for a financial services company.",
    detailedDescription: "A sophisticated real-time analytics dashboard developed for a financial services company. The platform processes large volumes of data and presents it through interactive visualizations, enabling stakeholders to make data-driven decisions quickly.",
    image: (
      <svg 
        viewBox="0 0 24 24" 
        className="h-64 w-full object-cover bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white"
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
      { icon: <SiVuedotjs className="h-4 w-4" />, name: "Vue.js", colorClass: "bg-green-100 text-green-800" },
      { icon: <SiD3Dotjs className="h-4 w-4" />, name: "D3.js", colorClass: "bg-red-100 text-red-800" },
      { icon: <SiExpress className="h-4 w-4" />, name: "Express", colorClass: "bg-gray-100 text-gray-800" },
    ],
    features: [
      "Real-time data processing",
      "Interactive data visualizations",
      "Custom reporting tools",
      "User permission management",
      "Data export capabilities",
      "Automated alerts and notifications",
      "Historical data analysis",
      "Mobile-responsive design"
    ],
    clientFeedback: "The analytics dashboard has given us unprecedented insights into our financial operations. The visualizations are clear and intuitive, making it easy for all team members to understand complex data patterns.",
    projectLink: "https://analytics-dashboard.example.com"
  },
  {
    id: "healthtrack",
    title: "HealthTrack Mobile App",
    description: "Health monitoring app with fitness tracking and personalized recommendations.",
    detailedDescription: "HealthTrack is a comprehensive health and wellness app that combines fitness tracking with nutritional guidance and personalized health recommendations. The app integrates with wearable devices and provides users with actionable insights into their health data.",
    image: (
      <svg 
        viewBox="0 0 24 24" 
        className="h-64 w-full object-cover bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white"
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
      { icon: <SiFlutter className="h-4 w-4" />, name: "Flutter", colorClass: "bg-blue-100 text-blue-800" },
      { icon: <SiFirebase className="h-4 w-4" />, name: "Firebase", colorClass: "bg-yellow-100 text-yellow-800" },
      { icon: <SiNodedotjs className="h-4 w-4" />, name: "Node.js", colorClass: "bg-green-100 text-green-800" },
    ],
    features: [
      "Fitness activity tracking",
      "Nutritional guidance",
      "Sleep quality analysis",
      "Integration with wearable devices",
      "Personalized health recommendations",
      "Progress tracking and goal setting",
      "Health data visualization",
      "Community challenges and social features"
    ],
    clientFeedback: "HealthTrack has been a game-changer for our wellness program. The app is beautiful, intuitive, and our users love the personalized recommendations and insights it provides.",
    projectLink: "https://healthtrack-app.example.com"
  },
  {
    id: "boutiquestore",
    title: "Boutique Store",
    description: "Custom e-commerce platform for a high-end fashion boutique with virtual try-on features.",
    detailedDescription: "A premium e-commerce solution developed for a high-end fashion boutique. The platform includes innovative virtual try-on features using augmented reality, personalized styling recommendations, and a seamless checkout process.",
    image: (
      <svg 
        viewBox="0 0 24 24" 
        className="h-64 w-full object-cover bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center text-white"
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
      { icon: <SiReact className="h-4 w-4" />, name: "React", colorClass: "bg-blue-100 text-blue-800" },
      { icon: <SiTypescript className="h-4 w-4" />, name: "TypeScript", colorClass: "bg-indigo-100 text-indigo-800" },
      { icon: <SiNodedotjs className="h-4 w-4" />, name: "Node.js", colorClass: "bg-green-100 text-green-800" },
    ],
    features: [
      "AR-powered virtual try-on",
      "Personalized styling recommendations",
      "High-resolution product imagery",
      "Secure payment processing",
      "Customer loyalty program",
      "Inventory management",
      "Mobile-first responsive design",
      "Gift card and promotional code system"
    ],
    clientFeedback: "Our boutique's online presence has been transformed by this platform. The virtual try-on feature has significantly reduced return rates, and our customers love the personalized shopping experience.",
    projectLink: "https://boutique-store.example.com"
  },
  {
    id: "corporateportal",
    title: "Corporate Portal",
    description: "Internal employee portal with document management and team communication features.",
    detailedDescription: "A comprehensive internal portal for corporate employees that centralizes document management, team communication, and workflow automation. The platform enhances productivity by streamlining internal processes and improving information access.",
    image: (
      <svg 
        viewBox="0 0 24 24" 
        className="h-64 w-full object-cover bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white"
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
      { icon: <SiReact className="h-4 w-4" />, name: "React", colorClass: "bg-blue-100 text-blue-800" },
      { icon: <SiNodedotjs className="h-4 w-4" />, name: "Node.js", colorClass: "bg-green-100 text-green-800" },
      { icon: <SiMongodb className="h-4 w-4" />, name: "MongoDB", colorClass: "bg-purple-100 text-purple-800" },
    ],
    features: [
      "Centralized document management",
      "Team communication tools",
      "Workflow automation",
      "Employee directory",
      "Meeting scheduler",
      "Task assignment and tracking",
      "Department-specific dashboards",
      "Single sign-on integration"
    ],
    clientFeedback: "This portal has revolutionized how our teams collaborate. Document sharing is seamless, communication is streamlined, and our workflow processes are much more efficient than before.",
    projectLink: "https://corporate-portal.example.com"
  },
];

// Define tech tag component
const TechTag = ({ icon, name, colorClass }: { icon: React.ReactNode; name: string; colorClass: string }) => (
  <span className={`${colorClass} text-sm font-medium px-3 py-1 rounded inline-flex items-center gap-1 mr-2 mb-2`}>
    {icon}
    {name}
  </span>
);

// Feature item component
const FeatureItem = ({ feature }: { feature: string }) => (
  <div className="flex items-start mt-3">
    <div className="flex-shrink-0">
      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    </div>
    <p className="ml-3 text-gray-700">{feature}</p>
  </div>
);

export default function PortfolioDetail() {
  const [, params] = useRoute('/portfolio/:id');
  const [, setLocation] = useLocation();
  const [project, setProject] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    if (params?.id) {
      const foundProject = portfolioItems.find(item => item.id === params.id);
      if (foundProject) {
        setProject(foundProject);
      } else {
        // Redirect to portfolio page if project not found
        setLocation('/portfolio');
      }
    }
  }, [params, setLocation]);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/portfolio">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Button>
      </Link>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="relative">
          {project.image}
          <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
            {project.category === 'web' && 'Web Application'}
            {project.category === 'mobile' && 'Mobile App'}
            {project.category === 'ecommerce' && 'E-commerce'}
          </div>
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">{project.detailedDescription}</p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Technologies Used</h2>
            <div className="flex flex-wrap">
              {project.technologies.map((tech, index) => (
                <TechTag key={index} {...tech} />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.features.map((feature, index) => (
                <FeatureItem key={index} feature={feature} />
              ))}
            </div>
          </div>

          {project.clientFeedback && (
            <Card className="mt-8 bg-blue-50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Client Feedback</h2>
                <p className="italic text-gray-700">{project.clientFeedback}</p>
              </CardContent>
            </Card>
          )}

          {project.projectLink && (
            <div className="mt-8 flex justify-center">
              <Link href={`/demos/${project.id.toLowerCase()}`}>
                <Button className="flex items-center gap-2" size="lg">
                  Visit Demo
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioItems
            .filter(item => item.id !== project.id)
            .slice(0, 3)
            .map(item => (
              <Link key={item.id} href={`/portfolio/${item.id}`}>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    {item.image}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}