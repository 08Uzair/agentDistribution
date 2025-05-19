import { Github, Linkedin, FileDown, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-blue-400 text-sm p-4 flex flex-col md:flex-row items-center justify-center relative gap-4 ">
      <p className="text-center md:text-left">© 2025 Uzer Nizamuddin Qureshi</p>

      <div className="flex items-center gap-6 absolute right-2">
        <a
          href="https://www.linkedin.com/in/uzairqureshi0803/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href="https://github.com/08Uzair"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href="https://drive.google.com/file/d/1j_wsxgjRIL3pA9reUaeb07234jQ7pM1f/view?usp=sharing"
          download
          className="hover:text-green-400"
        >
          <FileDown className="w-5 h-5" />
        </a>
        <a
          href="https://uzerqureshi-portfolio.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-400"
        >
          <Globe className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
