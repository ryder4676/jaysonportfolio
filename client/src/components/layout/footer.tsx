import { Link } from "wouter";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="font-bold text-xl text-white">DevCraft<span className="text-primary">Studio</span></span>
            <p className="mt-4 text-gray-400 text-sm">
              Professional web and mobile application development services. Transforming ideas into powerful digital solutions.
            </p>
            <div className="mt-6">
              <div className="flex space-x-6">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <span className="sr-only">GitHub</span>
                  <FaGithub className="h-5 w-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <FaTwitter className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <FaLinkedin className="h-5 w-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <FaInstagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Services</h3>
            <ul role="list" className="mt-4 space-y-4">
              <li>
                <Link href="/#services">
                  <a className="text-base text-gray-400 hover:text-white">Web Development</a>
                </Link>
              </li>
              <li>
                <Link href="/#services">
                  <a className="text-base text-gray-400 hover:text-white">Mobile Apps</a>
                </Link>
              </li>
              <li>
                <Link href="/#services">
                  <a className="text-base text-gray-400 hover:text-white">E-commerce</a>
                </Link>
              </li>
              <li>
                <Link href="/#services">
                  <a className="text-base text-gray-400 hover:text-white">UI/UX Design</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Contact</h3>
            <ul role="list" className="mt-4 space-y-4">
              <li className="flex">
                <FaEnvelope className="h-5 w-5 text-primary mr-2 mt-1" />
                <a href="mailto:contact@devcraftstudio.com" className="text-base text-gray-400 hover:text-white">
                  contact@devcraftstudio.com
                </a>
              </li>
              <li className="flex">
                <FaPhone className="h-5 w-5 text-primary mr-2 mt-1" />
                <a href="tel:5877074990" className="text-base text-gray-400 hover:text-white">
                  (587) 707-4990
                </a>
              </li>
              <li className="flex">
                <FaMapMarkerAlt className="h-5 w-5 text-primary mr-2 mt-1" />
                <span className="text-base text-gray-400">Calgary, AB, Canada</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} DevCraft Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
