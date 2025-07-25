import React from 'react';
import '../styles/Blogs.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogPage = () => {
    const blogs = [
        {
            title: 'Top Business Programs in the US for International Students',
            image: 'https://images.pexels.com/photos/7580643/pexels-photo-7580643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            date: 'January 25, 2025',
        },
        {
            title: 'GRE vs GMAT: Application Deep-Dive',
            image: 'https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=400',
            date: 'January 24, 2025',
        },
        {
            title: 'Biometric Requirements for Canadian Student Visas',
            image: 'https://www.immilawglobal.com/uploads/media/Canada%20Visa655ef6954be57.webp',
            date: 'January 20, 2025',
        },
        {
            title: 'United Kingdom Postgraduate Application Process for International Students',
            image: 'https://didmdw8v48h5q.cloudfront.net/wp-content/uploads/2021/09/uk-blog-header.png',
            date: 'January 18, 2025',
        },
        {
            title: 'Emerging Career Options in the United States',
            image: 'https://www.investopedia.com/thmb/XjhG15iR54iUxQgXrAxBg9Cg4vo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1767347751-541d9659d15d40ecbe47f973b6c509c4.jpg',
            date: 'January 15, 2025',
        },
        {
            title: 'A Pre-Departure Guide for International Students',
            image: 'https://media.licdn.com/dms/image/v2/D4D12AQFuIk98cUCXPA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1678882493281?e=2147483647&v=beta&t=4GCd0u5IW7EhU0lxkTDsfAA4vZ2ue3RKjaznQP7CaSg',
            date: 'January 10, 2025',
        }
    ];

    return (
        <div>
            <Navbar />
            <div className="blog-container">
                <div className="header-image">
                    <img src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png" alt="Header" />
                    <div className="mainline">
                        <h2>PlanStudies Blog</h2>
                        <button className="explore-btn">Explore Blogs</button>
                    </div>
                </div>

                <div className='blog'>
                    <div className="blogs">
                        {blogs.map((blog, index) => (
                            <div key={index} className="blog-card">
                                <img src={blog.image} alt={blog.title} />
                                <div className="blog-info">
                                    <h3>{blog.title}</h3>
                                    <p>{blog.description}</p>
                                    <span className="blog-date">{blog.date}</span><br />
                                    <a href="/blog-detail" className="read-more">Read More</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BlogPage;
