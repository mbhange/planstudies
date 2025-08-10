import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaCalendar, FaArrowRight, FaBookOpen } from 'react-icons/fa';

const BlogPage = () => {
    const blogs = [
        {
            title: 'Top Business Programs in the US for International Students',
            image: 'https://images.pexels.com/photos/7580643/pexels-photo-7580643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            date: 'January 25, 2025',
            excerpt: 'Discover the best business programs in the United States tailored for international students, including admission requirements and career prospects.',
            category: 'Education',
            readTime: '5 min read'
        },
        {
            title: 'GRE vs GMAT: Application Deep-Dive',
            image: 'https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=400',
            date: 'January 24, 2025',
            excerpt: 'A comprehensive comparison of GRE and GMAT exams to help you choose the right test for your graduate school applications.',
            category: 'Test Prep',
            readTime: '7 min read'
        },
        {
            title: 'Biometric Requirements for Canadian Student Visas',
            image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            date: 'January 20, 2025',
            excerpt: 'Everything you need to know about biometric requirements and the application process for Canadian student visas.',
            category: 'Visa Guide',
            readTime: '4 min read'
        },
        {
            title: 'United Kingdom Postgraduate Application Process for International Students',
            image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            date: 'January 18, 2025',
            excerpt: 'Step-by-step guide to applying for postgraduate programs in the UK, including UCAS applications and requirements.',
            category: 'Education',
            readTime: '6 min read'
        },
        {
            title: 'Emerging Career Options in the United States',
            image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            date: 'January 15, 2025',
            excerpt: 'Explore the fastest-growing career fields in the US and how international students can position themselves for success.',
            category: 'Career',
            readTime: '8 min read'
        },
        {
            title: 'A Pre-Departure Guide for International Students',
            image: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            date: 'January 10, 2025',
            excerpt: 'Essential checklist and tips for international students preparing to study abroad, from documentation to cultural preparation.',
            category: 'Student Life',
            readTime: '10 min read'
        }
    ];

    const categories = ['All', 'Education', 'Test Prep', 'Visa Guide', 'Career', 'Student Life'];
    const [selectedCategory, setSelectedCategory] = React.useState('All');

    const filteredBlogs = selectedCategory === 'All' 
        ? blogs 
        : blogs.filter(blog => blog.category === selectedCategory);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow bg-gradient-to-br from-gray-50 to-blue-50">
                {/* Hero Section */}
                <section className="bg-custom-blue-gradient relative overflow-hidden text-center py-16 md:py-20 px-8 md:px-10 text-white">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 animate-fadeInUp">
                            PlanStudies <span className="highlight">Blog</span>
                        </h1>
                        <p className="text-white/90 text-lg md:text-xl mb-12 max-w-4xl mx-auto opacity-90 animate-fadeInUp">
                            Your gateway to educational excellence - Expert insights, guides, and advice for your study abroad journey
                        </p>
                        
                        {/* Statistics Section */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 max-w-6xl mx-auto px-5">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 animate-fadeInUp">
                                <span className="block text-2xl md:text-3xl lg:text-4xl font-bold mb-2" style={{color: '#ffd700'}}>500+</span>
                                <span className="text-sm md:text-base opacity-90 font-medium">Educational Articles</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
                                <span className="block text-2xl md:text-3xl lg:text-4xl font-bold mb-2" style={{color: '#ffd700'}}>50K+</span>
                                <span className="text-sm md:text-base opacity-90 font-medium">Monthly Readers</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                                <span className="block text-2xl md:text-3xl lg:text-4xl font-bold mb-2" style={{color: '#ffd700'}}>25+</span>
                                <span className="text-sm md:text-base opacity-90 font-medium">Countries Covered</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
                                <span className="block text-2xl md:text-3xl lg:text-4xl font-bold mb-2" style={{color: '#ffd700'}}>Expert</span>
                                <span className="text-sm md:text-base opacity-90 font-medium">Written Content</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
                                <span className="block text-2xl md:text-3xl lg:text-4xl font-bold mb-2" style={{color: '#ffd700'}}>Weekly</span>
                                <span className="text-sm md:text-base opacity-90 font-medium">Fresh Updates</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 animate-fadeInUp" style={{animationDelay: '0.5s'}}>
                                <span className="block text-2xl md:text-3xl lg:text-4xl font-bold mb-2" style={{color: '#ffd700'}}>Free</span>
                                <span className="text-sm md:text-base opacity-90 font-medium">Access Forever</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Category Filter */}
                <section className="py-8 bg-white border-b">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        selectedCategory === category
                                            ? 'bg-custom-blue-gradient text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Blog Grid */}
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredBlogs.map((blog, index) => (
                                <article key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                                    <div className="relative overflow-hidden">
                                        <img 
                                            src={blog.image} 
                                            alt={blog.title}
                                            className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-custom-blue-gradient text-white px-3 py-1 rounded-full text-xs font-medium">
                                                {blog.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center text-gray-500 text-sm mb-3 space-x-4">
                                            <span className="flex items-center">
                                                <FaCalendar className="mr-2 text-xs" />
                                                {blog.date}
                                            </span>
                                            <span>{blog.readTime}</span>
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {blog.title}
                                        </h2>
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {blog.excerpt}
                                        </p>
                                        <a 
                                            href="/blog-detail" 
                                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors group"
                                        >
                                            Read More
                                            <FaArrowRight className="ml-2 text-sm group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Load More Button */}
                        <div className="text-center mt-12">
                            <button className="bg-custom-blue-gradient text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                                Load More Articles
                            </button>
                        </div>
                    </div>
                </section>

                {/* Newsletter Subscription */}
                <section className="bg-white py-12 md:py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="max-w-2xl mx-auto">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                                Stay Updated with Our Latest Posts
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Subscribe to our newsletter and never miss important updates, tips, and guides for your educational journey.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button className="bg-custom-blue-gradient text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default BlogPage;
