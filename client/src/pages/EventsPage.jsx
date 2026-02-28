import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import useEvents from '../hooks/useEvents';
import EventCard from '../components/EventCard';
import EventCardSkeleton from '../components/EventCardSkeleton';
import { AlertCircle, RefreshCw, Search } from 'lucide-react';

const EventsPage = () => {
    const { events, loading, error } = useEvents();
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    // Extract unique categories dynamically from fetched events
    const categories = useMemo(() => {
        if (!events || events.length === 0) return ['All'];
        const cats = new Set(events.filter(e => e.category).map(e => e.category));
        return ['All', ...Array.from(cats)];
    }, [events]);

    const filteredEvents = useMemo(() => {
        return events.filter(evt => {
            const matchCategory = activeCategory === 'All' || evt.category === activeCategory;
            const matchSearch = evt.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                evt.location?.toLowerCase().includes(searchTerm.toLowerCase());
            return matchCategory && matchSearch;
        });
    }, [events, activeCategory, searchTerm]);

    // Handle retry
    const handleRetry = () => {
        window.location.reload();
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const textReveal = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
    };

    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityBg = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <div className="w-full bg-[#f8fbf9] min-h-screen pb-24">
            {/* Banner */}
            <div ref={heroRef} className="bg-dark py-32 px-6 text-center relative overflow-hidden min-h-[60vh] flex items-center justify-center">
                <motion.div style={{ y: yBg, opacity: opacityBg }} className="absolute inset-0 w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#051c0b] via-[#0d3b19]/80 to-[#0a2e12] z-0"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
                </motion.div>

                <motion.div
                    className="relative z-10 w-full mt-20"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                >
                    <div className="overflow-hidden">
                        <motion.h1
                            variants={textReveal}
                            className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tight"
                        >
                            Our Events
                        </motion.h1>
                    </div>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl mt-12 relative z-20">

                {/* Controls Section */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-12 flex flex-col md:flex-row justify-between items-center gap-6 border border-gray-100">

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {!loading && !error && categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-pill font-medium text-sm transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-green-50 text-gray-700 hover:bg-green-100'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-72">
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-button bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                        />
                        <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    </div>

                </div>

                {/* Content */}
                {error ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-red-100 flex flex-col items-center max-w-2xl mx-auto mt-20">
                        <AlertCircle className="text-red-500 w-16 h-16 mb-4" />
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Failed to load events</h3>
                        <p className="text-gray-500 mb-8">{error}</p>
                        <button
                            onClick={handleRetry}
                            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-button hover:bg-green-800 transition-colors font-semibold"
                        >
                            <RefreshCw size={18} />
                            Try Again
                        </button>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {loading ? (
                                // Skeletons
                                <>
                                    <motion.div key="skel1" exit={{ opacity: 0 }}><EventCardSkeleton /></motion.div>
                                    <motion.div key="skel2" exit={{ opacity: 0 }}><EventCardSkeleton /></motion.div>
                                    <motion.div key="skel3" exit={{ opacity: 0 }}><EventCardSkeleton /></motion.div>
                                    <motion.div key="skel4" exit={{ opacity: 0 }} className="hidden md:block"><EventCardSkeleton /></motion.div>
                                    <motion.div key="skel5" exit={{ opacity: 0 }} className="hidden lg:block"><EventCardSkeleton /></motion.div>
                                    <motion.div key="skel6" exit={{ opacity: 0 }} className="hidden lg:block"><EventCardSkeleton /></motion.div>
                                </>
                            ) : filteredEvents.length > 0 ? (
                                // Event Cards
                                filteredEvents.map((evt, idx) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                                        key={evt.slug}
                                        className="h-full"
                                    >
                                        <EventCard event={evt} />
                                    </motion.div>
                                ))
                            ) : (
                                // Empty state
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full py-20 text-center text-gray-500"
                                >
                                    <div className="text-6xl mb-4">🍂</div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
                                    <p>Try adjusting your search or category filters.</p>
                                    <button
                                        onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                                        className="mt-6 text-primary font-medium hover:underline"
                                    >
                                        Clear Filters
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default EventsPage;
