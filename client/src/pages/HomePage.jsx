import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import useEvents from '../hooks/useEvents';
import EventCard from '../components/EventCard';
import EventCardSkeleton from '../components/EventCardSkeleton';
import AnimatedCounter from '../components/AnimatedCounter';
import { Leaf, Droplets, MapPin, Search, ArrowRight, TreePine, Recycle, Globe2 } from 'lucide-react';

const HomePage = () => {
    const { events, loading, error } = useEvents();

    const heroRef = useRef(null);
    const { scrollYProgress: heroScrollY } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const heroY = useTransform(heroScrollY, [0, 1], ["0%", "40%"]);
    const heroOpacity = useTransform(heroScrollY, [0, 1], [1, 0]);

    // Animation variants
    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const textReveal = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
    };

    const parallaxImage = {
        hidden: { scale: 1.1, opacity: 0 },
        show: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: "easeOut" } }
    };

    return (
        <div className="w-full relative bg-bg">
            {/* 1. HERO SECTION (Parallax & Scale) */}
            <section ref={heroRef} className="relative h-screen min-h-[90vh] flex items-center justify-center overflow-hidden bg-dark">
                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 w-full h-full">
                    {/* High-end gradient base */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#051c0b] via-[#0d3b19] to-[#0a2e12] z-0"></div>
                    {/* Rich overlay image to replicate premium feel */}
                    <motion.div
                        variants={parallaxImage}
                        initial="hidden"
                        animate="show"
                        className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center z-0 mix-blend-overlay"
                    ></motion.div>
                </motion.div>

                <motion.div
                    className="container mx-auto px-6 max-w-6xl text-center text-white relative z-10"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                >
                    <div className="overflow-hidden mb-4">
                        <motion.h1
                            variants={textReveal}
                            className="text-6xl md:text-8xl font-black tracking-tighter leading-tight"
                        >
                            We Heal The Earth
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden mb-12">
                        <motion.h2
                            variants={textReveal}
                            className="text-2xl md:text-4xl font-light text-green-100 tracking-wide"
                        >
                            <span className="text-accent italic font-semibold">Together</span> for People, Planet, and Progress.
                        </motion.h2>
                    </div>

                    <motion.div variants={textReveal} className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
                        <Link
                            to="/about"
                            className="group relative overflow-hidden px-8 py-4 bg-accent text-white rounded-full font-bold text-lg hover:shadow-[0_0_20px_rgba(255,111,0,0.5)] transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-3"
                        >
                            <span className="relative z-10">Discover Our Mission</span>
                            <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-orange-600/50"></div>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
                >
                    <span className="text-sm font-semibold tracking-widest uppercase">Scroll</span>
                    <div className="w-[1px] h-12 bg-white/30 overflow-hidden">
                        <motion.div
                            animate={{ y: ["-100%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            className="w-full h-full bg-white"
                        />
                    </div>
                </motion.div>
            </section>

            {/* 2. OUR JOURNEY (Bali Solutions Aesthetic: Massive Typography + Clean Grid) */}
            <section className="py-32 bg-bg border-b border-gray-100 relative z-20">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                        >
                            <motion.p variants={textReveal} className="text-accent font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-2">
                                <Leaf size={16} /> Our Core Philosophy
                            </motion.p>
                            <motion.h2 variants={textReveal} className="text-4xl md:text-6xl font-black text-dark leading-[1.1] mb-8">
                                Collective Action for <span className="text-primary italic">Transformative Change</span>.
                            </motion.h2>
                            <motion.p variants={textReveal} className="text-xl text-gray-600 leading-relaxed mb-6 font-light">
                                We cannot have thriving communities on a dying planet. Join our transformative mission of taking consistent, meaningful action throughout the year to address environmental and social challenges.
                            </motion.p>
                            <motion.p variants={textReveal} className="text-lg text-gray-500 leading-relaxed mb-10">
                                From Planet Run initiatives to community-driven programs, our multifaceted approach systematically addresses environmental and social challenges through strategically targeted initiatives designed for maximum ecological restoration.
                            </motion.p>

                            <motion.div variants={textReveal}>
                                <Link to="/about" className="inline-flex items-center gap-2 font-bold text-dark hover:text-accent transition-colors underline underline-offset-8 decoration-2 text-lg">
                                    Read more about our approach <ArrowRight size={20} />
                                </Link>
                            </motion.div>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-6 relative">
                            {/* Decorative background blob */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-100/50 rounded-full blur-3xl -z-10"></div>

                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="bg-white p-8 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-center translate-y-12"
                            >
                                <span className="text-6xl font-black text-primary mb-2">
                                    <AnimatedCounter value={2500} duration={2} suffix="+" />
                                </span>
                                <p className="text-gray-500 font-semibold tracking-wide uppercase text-sm">Students Empowered</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="bg-primary p-8 rounded-3xl shadow-[0_20px_40px_-15px_rgba(27,94,32,0.3)] text-white flex flex-col justify-center -translate-y-4"
                            >
                                <span className="text-6xl font-black text-accent mb-2">
                                    <AnimatedCounter value={100} duration={2} suffix="%" />
                                </span>
                                <p className="text-green-100 font-semibold tracking-wide uppercase text-sm">Community Focus</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. INITIATIVES (Parallax Image Cards) */}
            <section className="py-32 bg-[#f4f7f5]">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial="hidden" whileInView="show" viewport={{ once: true }} variants={textReveal}
                            className="text-5xl md:text-6xl font-black text-dark mb-6"
                        >
                            We Heal The Earth
                        </motion.h2>
                        <motion.p
                            initial="hidden" whileInView="show" viewport={{ once: true }} variants={textReveal}
                            className="text-xl text-gray-600 max-w-2xl mx-auto"
                        >
                            Our flagship environmental movement harnesses the power of unity.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Initiative 1 */}
                        <motion.div
                            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={textReveal}
                            className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer"
                        >
                            <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Habitat Recovery" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <Globe2 className="text-accent mb-4 w-10 h-10" />
                                <h3 className="text-3xl font-bold text-white mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">Habitat Recovery</h3>
                                <p className="text-gray-300 opacity-0 h-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:h-auto group-hover:translate-y-0">Eco-restoration events and large-scale reforestation drives across the country.</p>
                            </div>
                        </motion.div>

                        {/* Initiative 2 */}
                        <motion.div
                            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={textReveal}
                            className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer"
                        >
                            <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Regenerative Education" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <TreePine className="text-accent mb-4 w-10 h-10" />
                                <h3 className="text-3xl font-bold text-white mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">Regenerative Education</h3>
                                <p className="text-gray-300 opacity-0 h-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:h-auto group-hover:translate-y-0">Teaching students not just how to succeed, but how to sustain the world around them.</p>
                            </div>
                        </motion.div>

                        {/* Initiative 3 */}
                        <motion.div
                            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={textReveal}
                            className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer"
                        >
                            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000&q=80" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Solution Based Action" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <Recycle className="text-accent mb-4 w-10 h-10" />
                                <h3 className="text-3xl font-bold text-white mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">Solution-Based Action</h3>
                                <p className="text-gray-300 opacity-0 h-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:h-auto group-hover:translate-y-0">Building real-world solutions for local community challenges through civic action.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4. UPCOMING EVENTS (High-end list view) */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex justify-between items-end mb-16 border-b border-gray-200 pb-8">
                        <div>
                            <p className="text-accent font-bold tracking-widest uppercase mb-3">Powering Change Together</p>
                            <h2 className="text-5xl font-black text-dark">Join Our Events</h2>
                        </div>
                        <Link to="/events" className="hidden md:flex items-center gap-2 font-bold text-primary hover:text-accent transition-colors text-lg group">
                            View All <ArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {loading ? (
                            <>
                                <EventCardSkeleton />
                                <EventCardSkeleton />
                                <EventCardSkeleton />
                            </>
                        ) : error ? (
                            <div className="col-span-full text-center py-10 bg-red-50 text-red-600 rounded-card font-medium">
                                {error} - Unable to fetch events right now.
                            </div>
                        ) : (
                            events.slice(0, 3).map(evt => (
                                <motion.div key={evt.slug} variants={textReveal} className="h-full">
                                    <EventCard event={evt} />
                                </motion.div>
                            ))
                        )}
                    </motion.div>

                    <div className="mt-12 text-center md:hidden">
                        <Link to="/events" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-full font-bold w-full">
                            View All Events
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
