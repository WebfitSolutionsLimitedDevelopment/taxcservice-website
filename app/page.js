'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Plane, Users, Heart, Briefcase, MapPin, Car, Phone, Mail, Clock,
  Shield, Star, ChevronDown, Menu, X, Check, Send, ArrowRight,
  Globe, Award, ThumbsUp, Navigation
} from 'lucide-react';

const IMAGES = {
  hero: 'https://images.pexels.com/photos/1467591/pexels-photo-1467591.jpeg',
  chauffeur: 'https://images.pexels.com/photos/7594130/pexels-photo-7594130.jpeg',
  auckland: 'https://images.unsplash.com/photo-1601766411448-13443d2db75d',
  aucklandSunset: 'https://images.unsplash.com/photo-1597958713970-19db605cc80d',
  rollsRoyce: 'https://images.unsplash.com/photo-1772990914622-4ee26e085381',
  mercedes: 'https://images.unsplash.com/photo-1770364276116-92b507f179ac',
};

const services = [
  {
    icon: Plane,
    title: 'Auckland Airport Transfers',
    description: 'Reliable meet-and-greet airport pickup and drop-off services. We track your flight so we\'re always on time, every time.',
    image: IMAGES.mercedes,
  },
  {
    icon: Briefcase,
    title: 'Business & Corporate Transfers',
    description: 'Impress your clients with our premium corporate transport. Professional chauffeurs, luxury vehicles, and punctual service.',
    image: IMAGES.rollsRoyce,
  },
  {
    icon: Users,
    title: 'Group & Event Transfers',
    description: 'Seamless group transport for conferences, events, and special occasions. Vehicles for any group size.',
    image: IMAGES.chauffeur,
  },
  {
    icon: Heart,
    title: 'Wedding Transfers',
    description: 'Make your special day unforgettable with our elegant wedding transport. Luxurious vehicles dressed to match your theme.',
    image: IMAGES.hero,
  },
  {
    icon: MapPin,
    title: 'Local & Domestic Travel',
    description: 'Comfortable point-to-point transfers anywhere in Auckland and across New Zealand. Your personal chauffeur, anytime.',
    image: IMAGES.auckland,
  },
  {
    icon: Globe,
    title: 'NZ Tours & Travel',
    description: 'Explore the beauty of New Zealand with our guided tour services. From Auckland to Queenstown, we\'ve got you covered.',
    image: IMAGES.aucklandSunset,
  },
];

const stats = [
  { number: '10,000+', label: 'Happy Passengers' },
  { number: '15+', label: 'Years Experience' },
  { number: '24/7', label: 'Available Service' },
  { number: '100%', label: 'Safety Record' },
];

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Business Traveller',
    text: 'Exceptional service from airport to hotel. The driver was professional, the car was immaculate, and they tracked my flight perfectly. Highly recommend!',
    rating: 5,
  },
  {
    name: 'James & Lisa K.',
    role: 'Wedding Clients',
    text: 'Our wedding transport was absolutely perfect. The team went above and beyond to make our day special. The cars were stunning!',
    rating: 5,
  },
  {
    name: 'David T.',
    role: 'Corporate Client',
    text: 'We use TaxcService for all our corporate transfers. Reliable, professional, and always on time. Our clients are always impressed.',
    rating: 5,
  },
];

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="TaxcService"
              width={180}
              height={54}
              priority
              className="h-12 w-auto object-contain"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#0d7377] ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a href="#quote">
              <Button className="bg-[#0d7377] hover:bg-[#0a5c5f] text-white rounded-full px-6">
                Get a Quote
              </Button>
            </a>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={isScrolled ? 'text-gray-800' : 'text-white'} size={24} />
            ) : (
              <Menu className={isScrolled ? 'text-gray-800' : 'text-white'} size={24} />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-xl p-6 mb-4 fade-in">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-gray-700 hover:text-[#0d7377] font-medium border-b border-gray-100 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a href="#quote" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full mt-4 bg-[#0d7377] hover:bg-[#0a5c5f] text-white rounded-full">
                Get a Quote
              </Button>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Luxury chauffeur service"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a3d3f]/95 via-[#0d7377]/80 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Shield className="text-amber-400" size={16} />
            <span className="text-white/90 text-sm font-medium">Auckland&apos;s Trusted Transport Service</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Premium Chauffeur &
            <span className="text-amber-400"> Transport Service</span>
            <br />in Auckland
          </h1>

          <p className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
            Experience the finest private transport service in Auckland, New Zealand.
            From airport transfers to luxury tours - travel in comfort, style, and safety.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#quote">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold rounded-full px-8 py-6 text-base shadow-lg shadow-amber-500/25">
                Request a Quote <ArrowRight className="ml-2" size={18} />
              </Button>
            </a>
            <a href="#services">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base bg-transparent">
                Our Services
              </Button>
            </a>
          </div>

          <div className="flex items-center gap-6 mt-12">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
                  <Star className="text-amber-400" size={14} />
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="text-amber-400 fill-amber-400" size={14} />
                ))}
              </div>
              <p className="text-white/70 text-sm">Rated 5/5 by 500+ happy customers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#services">
          <ChevronDown className="text-white/60" size={32} />
        </a>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="bg-[#0d7377] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                {stat.number}
              </p>
              <p className="text-white/70 text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#0d7377] font-semibold text-sm uppercase tracking-wider">What We Offer</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-6">
            Our Premium Services
          </h2>
          <p className="text-gray-600 text-lg">
            From airport pickups to scenic tours, we provide comprehensive transport
            solutions tailored to your needs across Auckland and New Zealand.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="service-card group overflow-hidden border-0 shadow-md hover:shadow-xl bg-white">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-[#0d7377] p-3 rounded-xl">
                    <Icon className="text-white" size={24} />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  <a href="#quote" className="inline-flex items-center gap-2 text-[#0d7377] font-semibold mt-4 hover:gap-3 transition-all">
                    Book Now <ArrowRight size={16} />
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const features = [
    { icon: Shield, title: 'Licensed & Insured', desc: 'Fully licensed and insured for your peace of mind' },
    { icon: Clock, title: '24/7 Availability', desc: 'Round-the-clock service for early flights or late events' },
    { icon: Award, title: 'Professional Chauffeurs', desc: 'Experienced, vetted, and professionally trained drivers' },
    { icon: ThumbsUp, title: 'Flight Tracking', desc: 'We monitor your flight so we\'re always ready when you land' },
    { icon: Car, title: 'Premium Vehicles', desc: 'Well-maintained luxury vehicles for maximum comfort' },
    { icon: Navigation, title: 'Local Expertise', desc: 'Auckland locals who know every route and shortcut' },
  ];

  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={IMAGES.auckland}
                alt="Auckland skyline"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#0d7377] text-white p-6 rounded-2xl shadow-xl hidden lg:block">
              <p className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>15+</p>
              <p className="text-white/80 text-sm">Years of Excellence</p>
            </div>
          </div>

          <div>
            <span className="text-[#0d7377] font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-6">
              Auckland&apos;s Most Trusted Transport Service
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              With over 15 years of experience, TaxcService has been the go-to transport
              provider for thousands of satisfied customers. Whether you&apos;re a visitor
              arriving at Auckland Airport or a local heading to a special event, we
              deliver exceptional service every single time.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-11 h-11 bg-[#0d7377]/10 rounded-xl flex items-center justify-center">
                      <Icon className="text-[#0d7377]" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {feature.title}
                      </h4>
                      <p className="text-gray-500 text-sm mt-0.5">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#0d7377] font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-6">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg">
            Don&apos;t just take our word for it - hear from our satisfied customers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-md bg-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="text-amber-400 fill-amber-400" size={18} />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <Separator className="mb-4" />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    pickupAddress: '',
    dropoffAddress: '',
    flightNumber: '',
    travelDate: '',
    passengers: '',
    returnRequired: 'no',
    bags: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          firstName: '', email: '', phone: '', pickupAddress: '',
          dropoffAddress: '', flightNumber: '', travelDate: '',
          passengers: '', returnRequired: 'no', bags: '',
        });
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="quote" className="py-20 lg:py-28 bg-[#0d7377]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-3xl p-12 shadow-2xl">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-green-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                Quote Request Received!
              </h3>
              <p className="text-gray-600 mb-8">
                Thank you for your enquiry. Our team will review your request and
                get back to you within 2 hours with a personalised quote.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                className="bg-[#0d7377] hover:bg-[#0a5c5f] text-white rounded-full px-8"
              >
                Submit Another Quote
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMAGES.aucklandSunset} alt="Auckland" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0a3d3f]/92" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Book Now</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-6">
            Request a Quote Now
          </h2>
          <p className="text-white/70 text-lg">
            Fill in the details below and our team will get back to you with a
            personalised quote within hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name *</Label>
              <Input
                id="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                required
                className="h-12 rounded-xl border-gray-200 focus:border-[#0d7377] focus:ring-[#0d7377]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                className="h-12 rounded-xl border-gray-200 focus:border-[#0d7377] focus:ring-[#0d7377]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Phone Number (Include Country Code)"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
                className="h-12 rounded-xl border-gray-200 focus:border-[#0d7377] focus:ring-[#0d7377]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="flightNumber" className="text-gray-700 font-medium">Flight Number</Label>
              <Input
                id="flightNumber"
                placeholder="Flight Number (e.g. SQ281)"
                value={formData.flightNumber}
                onChange={(e) => handleChange('flightNumber', e.target.value)}
                className="h-12 rounded-xl border-gray-200 focus:border-[#0d7377] focus:ring-[#0d7377]"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="pickupAddress" className="text-gray-700 font-medium">Pick Up Address *</Label>
              <Input
                id="pickupAddress"
                placeholder="Pick Up Address"
                value={formData.pickupAddress}
                onChange={(e) => handleChange('pickupAddress', e.target.value)}
                required
                className="h-12 rounded-xl border-gray-200 focus:border-[#0d7377] focus:ring-[#0d7377]"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="dropoffAddress" className="text-gray-700 font-medium">Destination Address *</Label>
              <Input
                id="dropoffAddress"
                placeholder="Destination Address"
                value={formData.dropoffAddress}
                onChange={(e) => handleChange('dropoffAddress', e.target.value)}
                required
                className="h-12 rounded-xl border-gray-200 focus:border-[#0d7377] focus:ring-[#0d7377]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelDate" className="text-gray-700 font-medium">Travel Date *</Label>
              <Input
                id="travelDate"
                type="date"
                value={formData.travelDate}
                onChange={(e) => handleChange('travelDate', e.target.value)}
                required
                className="h-12 rounded-xl border-gray-200 focus:border-[#0d7377] focus:ring-[#0d7377]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passengers" className="text-gray-700 font-medium">Number of Passengers *</Label>
              <Input
                id="passengers"
                type="number"
                min="1"
                placeholder="Passenger Numbers"
                value={formData.passengers}
                onChange={(e) => handleChange('passengers', e.target.value)}
                required
                className="h-12 rounded-xl border-gray-200 focus:border-[#0d7377] focus:ring-[#0d7377]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Return Required?</Label>
              <Select
                value={formData.returnRequired}
                onValueChange={(value) => handleChange('returnRequired', value)}
              >
                <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-[#0d7377] focus:ring-[#0d7377]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bags" className="text-gray-700 font-medium">Number of Bags</Label>
              <Input
                id="bags"
                type="number"
                min="0"
                placeholder="Number of Bags"
                value={formData.bags}
                onChange={(e) => handleChange('bags', e.target.value)}
                className="h-12 rounded-xl border-gray-200 focus:border-[#0d7377] focus:ring-[#0d7377]"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="mt-8">
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full bg-[#0d7377] hover:bg-[#0a5c5f] text-white rounded-xl h-14 text-base font-semibold shadow-lg shadow-[#0d7377]/25"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send size={18} /> Request a Quote
                </span>
              )}
            </Button>
          </div>

          <p className="text-center text-gray-500 text-sm mt-4">
            We typically respond within 2 hours during business hours.
          </p>
        </form>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#0d7377] font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-6">
            Contact Us
          </h2>
          <p className="text-gray-600 text-lg">
            Have questions? Reach out to us anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="border-0 shadow-md text-center">
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-[#0d7377]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="text-[#0d7377]" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Call Us</h4>
              <a href="tel:+6421234567" className="text-[#0d7377] hover:underline">+64 21 234 567</a>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md text-center">
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-[#0d7377]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="text-[#0d7377]" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Email Us</h4>
              <a href="mailto:nzroadtours@gmail.com" className="text-[#0d7377] hover:underline">nzroadtours@gmail.com</a>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md text-center">
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-[#0d7377]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-[#0d7377]" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Location</h4>
              <p className="text-gray-600">Auckland, New Zealand</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <img src="/logo.png" alt="TaxcService" className="h-14 w-auto mb-4" />
            <p className="text-gray-400 max-w-md leading-relaxed">
              Auckland&apos;s premium private transport and chauffeur service. Delivering
              comfort, safety, and reliability for over 15 years.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <Shield className="text-amber-400" size={16} />
                <span className="text-sm text-gray-300">Licensed & Insured</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'About', 'Testimonials', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Services</h4>
            <ul className="space-y-3">
              {['Airport Transfers', 'Corporate Transport', 'Wedding Cars', 'Group Transport', 'NZ Tours'].map((service) => (
                <li key={service}>
                  <a href="#services" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-gray-800" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TaxcService. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Auckland, New Zealand | taxcservice.com
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <QuoteForm />
      <ContactSection />
      <Footer />
    </main>
  );
}