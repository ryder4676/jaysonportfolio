import { CheckCircle } from "lucide-react";

export default function ProcessSection() {
  const processSteps = [
    {
      number: 1,
      title: "Discovery",
      description: "We start by understanding your goals, target audience, and project requirements through our AI-powered client intake form.",
      duration: "1-2 Weeks",
      activities: [
        "Needs analysis with AI assistance",
        "Competitive research",
        "Project scope definition"
      ],
      isLeft: true
    },
    {
      number: 2,
      title: "Design",
      description: "Creating an intuitive user experience and appealing visual design that aligns with your brand and project goals.",
      duration: "2-3 Weeks",
      activities: [
        "Wireframes and prototypes",
        "User experience design",
        "Visual design concepts"
      ],
      isLeft: false
    },
    {
      number: 3,
      title: "Development",
      description: "Building your application using modern, scalable technologies with a focus on performance and security.",
      duration: "4-8 Weeks",
      activities: [
        "Frontend development",
        "Backend implementation",
        "Regular progress updates"
      ],
      isLeft: true
    },
    {
      number: 4,
      title: "Launch & Support",
      description: "Testing, deployment, and ongoing support to ensure your application performs flawlessly.",
      duration: "1-2 Weeks",
      activities: [
        "Quality assurance testing",
        "Deployment to production",
        "Training and documentation"
      ],
      isLeft: false
    }
  ];

  return (
    <section id="process" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">My Process</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            How I bring your vision to life
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            A structured approach to delivering high-quality digital solutions.
          </p>
        </div>

        <div className="mt-16">
          <div className="relative">
            {/* Process Timeline */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200"></div>

            {/* Process Steps */}
            {processSteps.map((step, index) => (
              <div key={step.number} className={`relative lg:flex items-center mb-20 ${index === processSteps.length - 1 ? 'mb-0' : ''}`}>
                {step.isLeft ? (
                  <>
                    <div className="lg:w-1/2 lg:pr-16 mb-8 lg:mb-0 text-center lg:text-right">
                      <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                      <p className="mt-3 text-lg text-gray-600">{step.description}</p>
                    </div>
                    <div className="flex lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-primary text-white shadow-lg">
                      <span className="text-lg font-bold">{step.number}</span>
                    </div>
                    <div className="lg:w-1/2 lg:pl-16 text-center lg:text-left">
                      <div className="mb-2 flex items-center justify-center lg:justify-start">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{step.duration}</span>
                      </div>
                      <ul className="text-gray-600 space-y-2">
                        {step.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="flex items-center lg:justify-start justify-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="lg:w-1/2 lg:pr-16 mb-8 lg:mb-0 text-center lg:text-right order-2 lg:order-1">
                      <div className="mb-2 flex items-center justify-center lg:justify-end">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{step.duration}</span>
                      </div>
                      <ul className="text-gray-600 space-y-2">
                        {step.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="flex items-center lg:justify-end justify-center">
                            <span>{activity}</span>
                            <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-primary text-white shadow-lg order-1 lg:order-2">
                      <span className="text-lg font-bold">{step.number}</span>
                    </div>
                    <div className="lg:w-1/2 lg:pl-16 text-center lg:text-left order-3">
                      <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                      <p className="mt-3 text-lg text-gray-600">{step.description}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
