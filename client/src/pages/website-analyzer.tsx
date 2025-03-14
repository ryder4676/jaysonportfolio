import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import AnalyzerForm from "@/components/website-analyzer/analyzer-form";

export default function WebsiteAnalyzer() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">Website Analyzer</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                Improve your existing website
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
                Let me analyze your current website and provide recommendations for improvements with cost estimates.
              </p>
            </div>

            <div className="mt-12">
              <AnalyzerForm />
            </div>

            <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 shadow-lg">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">What You'll Receive</h3>
                  <p className="mt-2 text-white text-opacity-90">Within 48 hours, I'll send you a detailed analysis with:</p>
                  <ul className="mt-4 text-white text-opacity-90 space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Actionable recommendations for improvements</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Visual mockups of potential design enhancements</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Detailed cost estimates for implementation</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Timeline projection for completion</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-5 sm:mt-0 sm:ml-8">
                  <svg 
                    className="w-full h-40 sm:w-56 text-blue-200" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
