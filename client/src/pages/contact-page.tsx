import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ProjectForm from "@/components/contact/project-form";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Start Your Project</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                AI-Powered Project Planner
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Let my AI assistant guide you through creating a detailed project specification.
              </p>
            </div>

            <div className="mt-16 max-w-3xl mx-auto">
              <ProjectForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
