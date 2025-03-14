import { 
  SiReact, 
  SiNodedotjs, 
  SiTypescript, 
  SiMongodb,
  SiExpress,
  SiTailwindcss
} from "react-icons/si";

export default function TechStack() {
  const technologies = [
    { name: "React", icon: SiReact },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Express", icon: SiExpress },
    { name: "Tailwind", icon: SiTailwindcss },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-primary uppercase tracking-wide">
            Technologies I Work With
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-6">
          {technologies.map((tech) => (
            <div key={tech.name} className="col-span-1 flex justify-center items-center flex-col">
              <div className="h-12 w-12 text-gray-500 flex items-center justify-center">
                <tech.icon className="text-3xl" />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
