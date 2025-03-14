import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import PortfolioGrid from "@/components/portfolio/portfolio-grid";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Portfolio</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Recent Projects
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                A collection of my best work across different industries and technologies.
              </p>
            </div>

            <div className="mt-12">
              <PortfolioGrid />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
