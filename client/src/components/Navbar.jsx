import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Leaf } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Events', path: '/events' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '#' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-200 py-3 shadow-sm' : 'bg-transparent py-5'
            }`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img src="/logo.svg" alt="ESTAH Logo" className="h-12 w-auto object-contain" />
                        <span className={`text-2xl font-black tracking-widest ${isScrolled ? 'text-primary' : 'text-primary/95'} drop-shadow-sm`}>
                            ESTAH
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <ul className="flex items-center gap-6">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className={`text-sm font-medium hover:text-accent transition-colors ${isScrolled ? 'text-gray-700' : 'text-gray-800'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link
                            to="#"
                            className="bg-accent text-white px-5 py-2.5 rounded-pill font-semibold text-sm hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5 transform duration-200"
                        >
                            Donate
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-primary p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl md:hidden"
                    >
                        <div className="flex flex-col p-4 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-gray-800 font-medium p-2 hover:bg-gray-50 rounded-lg"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                to="#"
                                className="bg-accent text-white text-center py-3 rounded-button font-semibold mt-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Donate Now
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
