import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaWater, FaChartLine, FaMobileAlt, FaLightbulb, FaArrowRight, FaPlay } from "react-icons/fa";

const features = [
    {
        icon: <FaMobileAlt className="text-white w-6 h-6" />,
        title: "Mobile App Integration",
        description: "Seamless integration with DWLR station datasets.",
        gradient: "from-cyan-400 to-blue-500"
    },
    {
        icon: <FaChartLine className="text-white w-6 h-6" />,
        title: "Data Visualization",
        description: "Interactive graphs showing water level trends and recharge patterns.",
        gradient: "from-purple-400 to-pink-500"
    },
    {
        icon: <FaWater className="text-white w-6 h-6" />,
        title: "Real-time Estimation",
        description: "Estimate groundwater availability instantly for any region.",
        gradient: "from-emerald-400 to-teal-500"
    },
    {
        icon: <FaLightbulb className="text-white w-6 h-6" />,
        title: "Decision Support",
        description: "Provide actionable insights for researchers, planners, and policymakers.",
        gradient: "from-orange-400 to-red-500"
    },
];

const ModernLandingPage = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(prev => ({
                        ...prev,
                        [entry.target.id]: entry.isIntersecting
                    }));
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('[data-animate]').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const navigateToDashboard = () => {
        const user = localStorage.getItem("user");
        if (user) {
            navigate("/dashboard");
            console.log("Navigating to dashboard...");
        } else {
            navigate("/login");
            console.log("Not logged in. Redirecting to login...");
        }
    };


    return (
        <div className="font-sans bg-black text-white overflow-hidden">
            {/* Cursor Follower */}
            <div
                className="fixed w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full pointer-events-none z-50 opacity-30 blur-sm transition-all duration-75 ease-out"
                style={{
                    left: `${mousePosition.x - 12}px`,
                    top: `${mousePosition.y - 12}px`,
                }}
            />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />

                    {/* Floating Orbs */}
                    <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-float-delayed" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl animate-pulse" />

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-40" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }} />
                </div>

                {/* Content */}
                <div className="container mx-auto px-6 text-center relative z-10">
                    <div className="space-y-8 max-w-4xl mx-auto">
                        {/* Badge */}
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                            Real-time Groundwater Intelligence
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-6xl md:text-8xl font-bold leading-tight">
                            <span className="block bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent animate-gradient-x">
                                Groundwater
                            </span>
                            <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x-delayed mt-2">
                                Guardians
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                            Empowering sustainable groundwater management with{' '}
                            <span className="text-cyan-400 font-semibold">real-time data</span> and{' '}
                            <span className="text-purple-400 font-semibold">actionable insights</span>
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                            <button
                                onClick={navigateToDashboard}
                                className="group px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold text-white shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
                            >
                                <span>Launch Dashboard</span>
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                            </button>

                            <button className="group px-8 py-4 rounded-full border border-white/30 font-semibold text-white hover:bg-white/10 backdrop-blur-md transition-all duration-300 flex items-center gap-3">
                                <FaPlay className="text-sm" />
                                <span>Watch Demo</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
                    </div>
                </div>
            </section>

            {/* Challenge Section */}
            <section id="challenge" data-animate className="py-32 bg-gradient-to-b from-black to-gray-900 relative">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
                </div>

                <div className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${isVisible.challenge ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                                The Challenge
                            </span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-orange-400 mx-auto rounded-full" />
                    </div>

                    <div className="max-w-5xl mx-auto mb-16">
                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed text-center font-light">
                            Groundwater is central to India's drinking, agricultural, and industrial water needs.
                            Despite covering <span className="text-cyan-400 font-semibold">3.3 million sq km</span> and
                            supporting <span className="text-purple-400 font-semibold">16% of the global population</span>,
                            India has only <span className="text-red-400 font-semibold">4% of the world's freshwater resources</span>.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { value: "3.3M", unit: "sq km", label: "Land area coverage", color: "from-blue-400 to-cyan-400", delay: "delay-0" },
                            { value: "16%", unit: "", label: "Global population dependent", color: "from-green-400 to-emerald-400", delay: "delay-100" },
                            { value: "4%", unit: "", label: "Global freshwater available", color: "from-yellow-400 to-orange-400", delay: "delay-200" },
                            { value: "High", unit: "Risk", label: "Overexploitation & climate impact", color: "from-red-400 to-pink-400", delay: "delay-300" },
                        ].map((item, idx) => (
                            <div key={idx} className={`group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${item.delay}`}>
                                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                                <div className="relative z-10 text-center">
                                    <div className="mb-4">
                                        <span className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                                            {item.value}
                                        </span>
                                        {item.unit && <span className="text-lg text-gray-400 ml-1">{item.unit}</span>}
                                    </div>
                                    <p className="text-gray-300 font-medium">{item.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section id="solution" data-animate className="py-32 bg-gradient-to-b from-gray-900 to-black relative">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl" />
                    <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
                </div>

                <div className={`container mx-auto px-6 relative z-10 transition-all duration-1000 delay-200 ${isVisible.solution ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                Our Solution
                            </span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: "Real-time Monitoring",
                                desc: "Analyze water level fluctuations from 5,260 DWLR stations across India.",
                                gradient: "from-blue-500/20 to-cyan-500/20",
                                borderGradient: "from-blue-500 to-cyan-500",
                                icon: "📊"
                            },
                            {
                                title: "Recharge Estimation",
                                desc: "Estimate groundwater recharge dynamically for better planning and resource allocation.",
                                gradient: "from-emerald-500/20 to-teal-500/20",
                                borderGradient: "from-emerald-500 to-teal-500",
                                icon: "💧"
                            },
                            {
                                title: "Resource Evaluation",
                                desc: "Evaluate groundwater resources in real-time to support informed decisions.",
                                gradient: "from-purple-500/20 to-pink-500/20",
                                borderGradient: "from-purple-500 to-pink-500",
                                icon: "🎯"
                            },
                        ].map((item, idx) => (
                            <div key={idx} className={`group relative p-8 rounded-3xl bg-gradient-to-br ${item.gradient} backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:-translate-y-4`}>
                                <div className={`absolute inset-0 bg-gradient-to-r ${item.borderGradient} opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-300`} />
                                <div className="relative z-10 text-center">
                                    <div className="text-4xl mb-6">{item.icon}</div>
                                    <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" data-animate className="py-32 bg-gradient-to-b from-black to-gray-900 relative">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
                </div>

                <div className={`container mx-auto px-6 relative z-10 transition-all duration-1000 delay-400 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                Key Features
                            </span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {features.map((feature, idx) => (
                            <div key={idx} className={`group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:-translate-y-4`}>
                                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`} />

                                <div className="relative z-10 text-center">
                                    <div className={`w-16 h-16 mb-6 rounded-2xl flex items-center justify-center mx-auto bg-gradient-to-r ${feature.gradient} shadow-lg`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section id="impact" data-animate className="py-32 bg-gradient-to-b from-gray-900 to-black relative">
                <div className="absolute inset-0">
                    <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl" />
                </div>

                <div className={`container mx-auto px-6 relative z-10 transition-all duration-1000 delay-600 ${isVisible.impact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                                Global Impact
                            </span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full" />
                    </div>

                    <div className="max-w-4xl mx-auto mb-16">
                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed text-center font-light">
                            Empowering stakeholders, researchers, and policymakers with instant access to
                            <span className="text-cyan-400 font-semibold"> real-time groundwater intelligence</span>,
                            enabling scientific evaluation and effective management interventions.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                icon: <FaChartLine className="w-8 h-8" />,
                                title: "Informed Decisions",
                                desc: "Empowers policymakers to make data-driven groundwater management choices.",
                                gradient: "from-blue-500 to-cyan-500",
                                bgGradient: "from-blue-500/20 to-cyan-500/20"
                            },
                            {
                                icon: <FaWater className="w-8 h-8" />,
                                title: "Scientific Evaluation",
                                desc: "Supports researchers in monitoring and assessing groundwater resources effectively.",
                                gradient: "from-emerald-500 to-teal-500",
                                bgGradient: "from-emerald-500/20 to-teal-500/20"
                            },
                            {
                                icon: <FaLightbulb className="w-8 h-8" />,
                                title: "Effective Interventions",
                                desc: "Enables timely actions to manage and conserve groundwater sustainably.",
                                gradient: "from-purple-500 to-pink-500",
                                bgGradient: "from-purple-500/20 to-pink-500/20"
                            },
                        ].map((item, idx) => (
                            <div key={idx} className={`group relative p-8 rounded-3xl bg-gradient-to-br ${item.bgGradient} backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:-translate-y-4`}>
                                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`} />

                                <div className="relative z-10 text-center">
                                    <div className={`w-16 h-16 mb-6 rounded-2xl flex items-center justify-center mx-auto bg-gradient-to-r ${item.gradient} text-white shadow-lg`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-black to-gray-900 border-t border-white/10 py-16">
                <div className="container mx-auto px-6 text-center">
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            Groundwater Guardians
                        </h3>
                    </div>
                    <p className="text-gray-400">&copy; 2025 Groundwater Guardians. All rights reserved.</p>
                </div>
            </footer>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        @keyframes gradient-x-delayed {
          0%, 100% { background-size: 200% 200%; background-position: right center; }
          50% { background-size: 200% 200%; background-position: left center; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        .animate-gradient-x-delayed {
          animation: gradient-x-delayed 3s ease infinite;
        }
      `}</style>
        </div>
    );
};

export default ModernLandingPage;