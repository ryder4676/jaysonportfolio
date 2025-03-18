import { 
  Globe, 
  ShoppingCart, 
  Smartphone, 
  Settings, 
  BarChart2, 
  Palette,
  Cloud,
  Lock,
  PenTool,
  Zap,
  MessageSquare,
  Database
} from "lucide-react";

type ServiceCardProps = {
  title: string;
  description: string;
  features: string[];
  price: string;
  icon: React.ElementType;
};

const ServiceCard = ({ title, description, features, price, icon: Icon }: ServiceCardProps) => {
  return (
    <div className="relative group bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
        <span className="bg-blue-100 text-primary text-xs font-medium px-2.5 py-0.5 rounded-full">
          {price}
        </span>
      </div>
      <div>
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">{title}</h3>
        <div className="mt-4 space-y-1">
          <p className="text-base text-gray-500">{description}</p>
          <div className="pt-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start mt-2 first:mt-0">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-sm text-gray-500">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ServicesSection() {
  const services = [
    {
      title: "Website Development",
      description: "Professional custom websites built from scratch",
      features: ["Custom design & development", "E-commerce websites", "CMS implementation", "Landing page creation"],
      price: "From $3,000",
      icon: Globe,
    },
    {
      title: "Website Maintenance",
      description: "Keep your website secure, updated and running smoothly",
      features: ["Security updates & monitoring", "Performance optimization", "Content updates", "Hosting & domain management"],
      price: "From $500/mo",
      icon: Lock,
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications",
      features: ["iOS & Android development", "React Native apps", "UI/UX design", "App maintenance & updates"],
      price: "From $10,000",
      icon: Smartphone,
    },
    {
      title: "Web & Mobile Optimization",
      description: "Improve performance, SEO and user experience",
      features: ["SEO optimization", "Mobile responsiveness", "Speed optimization", "Conversion rate optimization"],
      price: "From $1,500",
      icon: Zap,
    },
    {
      title: "E-commerce Solutions",
      description: "Complete online stores with payment processing",
      features: ["Payment gateway integration", "Inventory management", "Online marketing", "Marketplace integration"],
      price: "From $7,500",
      icon: ShoppingCart,
    },
    {
      title: "Cloud Services",
      description: "Secure, scalable cloud infrastructure and applications",
      features: ["Cloud hosting & migration", "Cloud-based applications", "Data backup & recovery", "Serverless architecture"],
      price: "From $2,000",
      icon: Cloud,
    },
    {
      title: "UI/UX Design Services",
      description: "Create intuitive, engaging user experiences",
      features: ["User research & analysis", "Wireframing & prototyping", "Graphic design & branding", "User testing"],
      price: "From $3,500",
      icon: PenTool,
    },
    {
      title: "Web Application Development",
      description: "Custom web applications with complex functionality",
      features: ["Custom web applications", "SaaS development", "CRM/ERP systems", "API development & integration"],
      price: "From $8,000",
      icon: Settings,
    },
    {
      title: "Digital Marketing Integration",
      description: "Connect your web presence with marketing tools",
      features: ["Social media marketing setup", "Email marketing campaigns", "PPC advertising management", "Content marketing strategy"],
      price: "From $1,800",
      icon: MessageSquare,
    },
    {
      title: "Data & Analytics",
      description: "Make data-driven decisions with powerful analytics",
      features: ["Analytics implementation", "Data visualization", "Reporting dashboards", "Data-driven recommendations"],
      price: "From $2,500",
      icon: Database,
    },
    {
      title: "Accessibility Services",
      description: "Make your digital products accessible to everyone",
      features: ["WCAG compliance", "Accessibility audits", "Remediation services", "Accessible design patterns"],
      price: "From $1,500",
      icon: BarChart2,
    },
    {
      title: "Website Redesign",
      description: "Transform your existing website with modern design",
      features: ["UI/UX improvements", "Modern technology stack", "Performance optimization", "Brand consistency"],
      price: "From $2,500",
      icon: Palette,
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Services</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Comprehensive Web & Mobile Solutions
          </p>
          <p className="mt-4 max-w-3xl text-xl text-gray-500 lg:mx-auto">
            From initial design to ongoing maintenance, we offer end-to-end digital services to help your business thrive online. All services include transparent pricing and personalized approaches.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              features={service.features}
              price={service.price}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
