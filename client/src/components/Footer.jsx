import { Instagram, Linkedin, MessageCircle, Youtube, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-[#F0F4F1] py-16 px-4 md:px-8 lg:px-16 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-700/50 pb-12">

                {/* About NGO */}
                <div className="flex flex-col gap-4">
                    <Link to="/" className="flex items-center gap-3 mb-2">
                        <img src="/logo.svg" alt="ESTAH Logo" className="h-12 w-auto object-contain bg-white rounded-lg p-1" />
                        <span className="text-2xl font-black tracking-widest text-[#F0F4F1] drop-shadow-sm">
                            ESTAH
                        </span>
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                        Empowering communities, nurturing nature, and creating a sustainable future for the next generations through collective action and awareness.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-lg font-bold text-white mb-2">Quick Links</h4>
                    <ul className="flex flex-col gap-3 text-gray-400 text-sm">
                        <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
                        <li><Link to="/events" className="hover:text-accent transition-colors">Events</Link></li>
                        <li><Link to="/about" className="hover:text-accent transition-colors">About</Link></li>
                        <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Get In Touch */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-lg font-bold text-white mb-2">Get In Touch</h4>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        Follow our journey and join the community on social media.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="bg-white/10 p-2.5 rounded-full hover:bg-accent hover:text-white transition-all">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="bg-white/10 p-2.5 rounded-full hover:bg-accent hover:text-white transition-all">
                            <Linkedin size={20} />
                        </a>
                        <a href="#" className="bg-white/10 p-2.5 rounded-full hover:bg-accent hover:text-white transition-all">
                            <MessageCircle size={20} />
                        </a>
                        <a href="#" className="bg-white/10 p-2.5 rounded-full hover:bg-accent hover:text-white transition-all">
                            <Youtube size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <p>&copy; 2026 ESTAH. All rights reserved.</p>
                <p className="mt-2 md:mt-0">Designed to make an impact</p>
            </div>
        </footer>
    );
};

export default Footer;
