import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Users, Globe2, BookOpen } from 'lucide-react';

const AboutPage = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    // Enhanced animations
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
            {/* Hero Section */}
            <div ref={heroRef} className="bg-dark text-center relative overflow-hidden min-h-[60vh] flex items-center justify-center">
                <motion.div style={{ y: yBg, opacity: opacityBg }} className="absolute inset-0 w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#051c0b] via-[#0d3b19] to-[#0a2e12] z-0"></div>
                    <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600')] bg-cover bg-center z-0 mix-blend-overlay"></div>
                </motion.div>

                <motion.div
                    className="relative z-10 w-full container mx-auto px-6 max-w-6xl mt-20"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                >
                    <div className="overflow-hidden">
                        <motion.h1
                            variants={textReveal}
                            className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight leading-[1.1]"
                        >
                            Driven by Passion,<br />
                            <span className="text-accent italic font-semibold">Sustained by Purpose</span>
                        </motion.h1>
                    </div>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl mt-32 text-gray-800">
                {/* Bridging the Gap Section - Massive Typography Approach */}
                <motion.section
                    initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                    className="mb-48 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center"
                >
                    <div>
                        <motion.div variants={textReveal} className="flex items-center gap-4 mb-6">
                            <div className="bg-primary/10 text-primary p-4 rounded-full">
                                <Users size={32} />
                            </div>
                            <h2 className="text-accent font-bold tracking-widest uppercase text-sm">Our Origin</h2>
                        </motion.div>
                        <motion.h3 variants={textReveal} className="text-5xl md:text-6xl font-black text-dark leading-[1.1] mb-8">
                            Bridging the <span className="text-primary italic font-semibold">Gap</span>
                        </motion.h3>
                    </div>

                    <div>
                        <div className="overflow-hidden mb-6">
                            <motion.p variants={textReveal} className="text-2xl leading-relaxed text-gray-800 font-light">
                                Our journey began with a simple observation: <strong className="font-bold">talent is universal, but opportunity is not.</strong>
                            </motion.p>
                        </div>
                        <div className="overflow-hidden">
                            <motion.p variants={textReveal} className="text-lg leading-relaxed text-gray-500">
                                We started as a small group of educators and social activists with a vision to democratize quality education and create high-impact community solutions. Today, we bridge the gap through large-scale scholarship exams, intensive fellowships, and sustainable development projects that transform lives from the grassroots up.
                            </motion.p>
                        </div>
                    </div>
                </motion.section>

                {/* The Journey - Massive Counter Stat */}
                <motion.section
                    initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                    className="mb-48 relative py-32"
                >
                    <div className="absolute inset-0 bg-primary/5 rounded-[40px] transform -skew-y-2 -z-10"></div>
                    <div className="text-center">
                        <motion.h2 variants={textReveal} className="text-primary font-bold tracking-widest uppercase text-sm mb-6">The Journey</motion.h2>
                        <div className="overflow-hidden">
                            <motion.p variants={textReveal} className="text-3xl md:text-5xl font-light text-dark leading-tight max-w-4xl mx-auto">
                                Empowering over <span className="block text-accent text-7xl md:text-9xl font-black my-4 tracking-tighter">2500+</span> students across India.
                            </motion.p>
                        </div>
                    </div>
                </motion.section>

                {/* We Heal The Earth Framework - Hover Expand Cards */}
                <motion.section
                    initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                    className="mb-32"
                >
                    <div className="text-center mb-16">
                        <motion.div variants={textReveal} className="inline-block mb-6">
                            <Globe2 size={64} className="text-accent mx-auto" />
                        </motion.div>
                        <div className="overflow-hidden mb-6">
                            <motion.h2 variants={textReveal} className="text-5xl md:text-7xl font-black text-primary tracking-tight uppercase">WE HEAL THE EARTH</motion.h2>
                        </div>
                        <div className="overflow-hidden">
                            <motion.p variants={textReveal} className="text-xl md:text-2xl font-light text-gray-500 max-w-3xl mx-auto leading-relaxed">
                                Our core philosophy is simple: we cannot have thriving communities on a dying planet. The framework integrates sustainability into every program we run.
                            </motion.p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div variants={textReveal} className="group bg-white p-10 rounded-[40px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 text-[120px] leading-none group-hover:scale-110 transition-transform duration-500">♻️</div>
                            <h3 className="text-3xl font-black mb-4 text-dark group-hover:text-primary transition-colors">Regenerative Education</h3>
                            <p className="text-gray-500 leading-relaxed text-lg relative z-10">
                                Teaching students not just how to succeed, but how to sustain. We embed environmental consciousness right into our core learning materials.
                            </p>
                        </motion.div>

                        <motion.div variants={textReveal} className="group bg-white p-10 rounded-[40px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 text-[120px] leading-none group-hover:scale-110 transition-transform duration-500">🏗️</div>
                            <h3 className="text-3xl font-black mb-4 text-dark group-hover:text-accent transition-colors">Solution-Based Action</h3>
                            <p className="text-gray-500 leading-relaxed text-lg relative z-10">
                                Building real-world solutions for local community challenges. From cleaning lakes to recycling waste, our initiatives are practical and measurable.
                            </p>
                        </motion.div>
                    </div>
                </motion.section>

            </div>
        </div>
    );
};

export default AboutPage;
