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
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

type ServiceCardProps = {
  title: string;
  description: string;
  features: string[];
  price: string;
  icon: React.ElementType;
};

const ServiceCard = ({ title, description, features, price, icon: Icon }: ServiceCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative group bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
    >
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
    </motion.div>
  );
};

export default function ServicesPage() {
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

  const serviceCategories = {
    "Web Development": [
      "Website Development",
      "Web Application Development",
      "E-commerce Solutions", 
      "Website Redesign"
    ],
    "Mobile Solutions": [
      "Mobile App Development",
      "Web & Mobile Optimization"
    ],
    "Design & User Experience": [
      "UI/UX Design Services", 
      "Accessibility Services"
    ],
    "Maintenance & Support": [
      "Website Maintenance",
      "Cloud Services", 
      "Data & Analytics",
      "Digital Marketing Integration"
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight"
            >
              Comprehensive Web & Mobile Solutions
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-xl max-w-3xl mx-auto"
            >
              From initial design to ongoing maintenance, we offer end-to-end digital services to help your business thrive online.
            </motion.p>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Our Service Categories</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                We offer a wide range of services to meet your digital needs, from website development to ongoing support.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(serviceCategories).map(([category, serviceList], index) => (
                <motion.div 
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{category}</h3>
                  <ul className="space-y-2">
                    {serviceList.map(serviceName => (
                      <li key={serviceName} className="flex items-center">
                        <svg className="h-5 w-5 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{serviceName}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Services */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Our Services in Detail</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Each service includes transparent pricing and personalized approaches tailored to your business needs.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Ready to Start Your Project?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Contact us today to discuss how we can help bring your vision to life.
            </p>
            <div className="mt-8">
              <a href="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-700">
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}