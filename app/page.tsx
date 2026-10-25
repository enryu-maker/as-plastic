'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Menu,
  X,
  Check,
  Factory,
  Cog,
  Layers3,
  MessageCircle,
  ChevronDown,
  ShieldCheck,
  Phone,
  Mail,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { brand, whatsappUrl } from '@/lib/brand';

const products = [
  {
    name: 'Injection Moulding Dies',
    image: '/assets/injection-die.jpg',
    label: 'PRECISION TOOLING',
    description:
      'Moulding dies for phone cases, PET components, and a comprehensive range of industrial plastic applications with tight micrometer tolerances.',
    tags: ['Phone case dies', 'PET dies', 'Precision tooling'],
    icon: Cog,
  },
  {
    name: 'Plastic Mould Dies',
    image: '/assets/cap-mould.jpg',
    label: 'APPLICATION-SPECIFIC MOULDS',
    description:
      'High-grade plastic mould tooling for caps, closures, egg trays, and custom application-specific consumer products.',
    tags: ['Cap moulds', 'Egg tray moulds', 'Multi-cavity'],
    icon: Layers3,
  },
  {
    name: 'VMC Machining Work',
    image: '/assets/vmc-machining.jpg',
    label: 'MACHINING SERVICES',
    description:
      'Heavy VMC precision CNC machining for industrial components, die casting moulds, steel cavities, and custom tool room requirements.',
    tags: ['Die machining', 'Industrial components', 'CNC milling'],
    icon: Factory,
  },
  {
    name: 'Mould Base Work',
    image: '/assets/mould-base-rack.jpg',
    label: 'TOOL ROOM & MOULDING JOB WORKS',
    description:
      'Custom standard and bespoke mould base manufacturing for tool room job-works. Tailored to your engineering drawings and component specifications.',
    tags: ['Mould base', 'Tool room work', 'Job works'],
    icon: Layers3,
  },
];

const faqs = [
  [
    'What does A S Plastics manufacture?',
    'A S Plastics specializes in high-precision injection moulding dies, plastic mould dies, mould bases, die casting moulds, and heavy VMC machining services. Key applications include phone case dies, caps, PET components, packaging, and custom industrial parts.',
  ],
  [
    'Where is A S Plastics located?',
    `A S Plastics is located at ${brand.address}. Located in the premier SICOF industrial estate within Satpur MIDC, Nashik.`,
  ],
  [
    'What information is needed for a quotation?',
    'Simply share your product drawings (2D/3D CAD), sample photos, material requirements (e.g. PP, ABS, PET, Delrin), and estimated production volumes. Our technical team will confirm feasibility, tool design, delivery schedule, and a competitive quotation.',
  ],
  [
    'When was A S Plastics established?',
    'A S Plastics was established in 2015 as a dedicated manufacturing and tool room proprietorship in Nashik, Maharashtra.',
  ],
  [
    'Do you repair and maintain existing moulds?',
    'Yes. Alongside new tooling, A S Plastics takes up mould maintenance and repair job work, servicing existing injection moulds and dies at its tool room in Satpur MIDC, Nashik.',
  ],
  [
    'How long does it take to make an injection mould?',
    'Lead time depends on part size, cavity count and complexity. After reviewing your drawings, A S Plastics confirms the delivery schedule in writing along with the quotation.',
  ],
  [
    'How much does a plastic mould cost?',
    'Mould cost depends on part size and geometry, number of cavities, steel grade and the finish required. Share drawings or a sample and you will receive a transparent, itemised quotation.',
  ],
  [
    'Do you take VMC machining and tool room job work only?',
    'Yes. Besides complete moulds, A S Plastics takes VMC machining, mould base and tool room job work to your drawings and specifications.',
  ],
  [
    'Which areas does A S Plastics serve?',
    'A S Plastics is based in Nashik and supplies tooling to OEMs, injection moulders and packaging manufacturers across Maharashtra and India.',
  ],
];

const clients = [
  ['Rishabh', '/assets/clients/rishabh.jpeg'],
  ['Orbital', '/assets/clients/orbital.jpeg'],
  ['Supreme Equipments', '/assets/clients/supreme.png'],
  ['V K Pump Industries', '/assets/clients/vk-pump.jpeg'],
  ['Electric Switch', '/assets/clients/electric-switch.jpg'],
  ['Positive Metering Pumps', '/assets/clients/positive.jpeg'],
];

const processSteps = [
  [
    '01',
    'Share your requirement',
    'Tell us about your application, product drawings (2D/3D), plastic sample dimensions, and resin specifications.',
  ],
  [
    '02',
    'Discuss the details',
    'Connect directly with our engineering team to review mold flow feasibility, cavity configuration, and delivery milestones.',
  ],
  [
    '03',
    'Get a quotation & build',
    'Receive a transparent quotation with steel grades and delivery schedule. Fabrication begins on state-of-the-art machines.',
  ],
];

const pageJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to get a mould or die made by A S Plastics',
    step: processSteps.map(([n, name, text]) => ({ '@type': 'HowToStep', position: Number(n), name, text })),
  },
];

export default function HomePage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [contactModal, setContactModal] = useState<string | null>(null);
  const [expandedProducts, setExpandedProducts] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Highlight the nav link for whichever section crosses the upper-middle of the viewport.
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' }
    );
    ['home', 'products', 'about', 'clients', 'workflow', 'faqs', 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenu]);

  const handleEnquire = (productName?: string) => {
    const url = whatsappUrl(brand.whatsappNumber, productName);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      handleCallModal(productName);
    }
  };

  const handleCallModal = (productName?: string) => {
    setMobileMenu(false);
    setContactModal(productName || 'Tooling & Machining Inquiry');
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
      {/* Top Banner Notice */}
      <div className="bg-hero text-hero-muted text-[11px] py-2.5 border-b border-border/20">
        <div className="site-container flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <MapPin size={13} className="text-primary" /> Nashik, Maharashtra, India
          </span>
          <span className="hidden sm:inline-block">
            {brand.tagline}
          </span>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="site-container site-header flex h-[84px] items-center justify-between gap-5">
          <a href="#home" className="flex items-center gap-3" aria-label="A S Plastics home">
            <div className="relative h-12 w-12 flex-shrink-0">
              <Image
                src="/assets/as-plastics-logo.png"
                alt="A S Plastics logo"
                width={48}
                height={48}
                priority
                className="h-12 w-12 object-contain"
              />
            </div>
            <div>
              <span className="block text-xl font-extrabold tracking-tight">
                A S PLASTICS<span className="text-primary">.</span>
              </span>
              <span className="block text-[9px] text-muted-foreground font-semibold mt-0.5 tracking-wider">
                MOULDS · DIES · MACHINING
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-[13px] font-semibold" aria-label="Main navigation">
            {[
              ['Home', 'home'],
              ['Products & Services', 'products'],
              ['About Us', 'about'],
              ['Clients', 'clients'],
              ['Contact', 'contact'],
            ].map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activeSection === id ? 'true' : undefined}
                className={`nav-link ${activeSection === id ? 'text-primary' : 'text-foreground'} hover:text-primary transition-colors`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="whatsapp"
              className="hidden sm:inline-flex h-10 px-4 text-xs font-semibold"
              onClick={() => handleEnquire()}
            >
              <MessageCircle size={15} /> Chat on WhatsApp <ArrowUpRight size={14} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              aria-label={mobileMenu ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenu && (
          <nav
            aria-label="Mobile navigation"
            className="site-container flex flex-col gap-4 pb-6 pt-2 text-sm border-t border-border/50 md:hidden"
          >
            {[
              ['Home', '#home'],
              ['Products & Services', '#products'],
              ['About Us', '#about'],
              ['Our Clients', '#clients'],
              ['Manufacturing Process', '#workflow'],
              ['FAQs', '#faqs'],
              ['Contact Details', '#contact'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                aria-current={activeSection === href.slice(1) ? 'true' : undefined}
                className={`font-medium hover:text-primary transition-colors py-1 ${activeSection === href.slice(1) ? 'text-primary' : ''}`}
                onClick={() => setMobileMenu(false)}
              >
                {label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <Button variant="whatsapp" className="w-full text-xs" onClick={() => handleEnquire()}>
                <MessageCircle size={15} /> Chat on WhatsApp
              </Button>
              <Button variant="outline" className="w-full text-xs" onClick={() => handleCallModal()}>
                <Phone size={15} /> Call Direct
              </Button>
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* ========================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================= */}
        <section id="home" className="hero-scene text-hero-foreground">
          {/* Background image */}
          <img
            src="/assets/mould-workshop.jpg"
            alt="Precision steel injection mould in machining workshop"
            className="hero-background-img"
          />
          <div className="hero-shade" />

          <div className="site-container relative z-10">
            <div className="hero-content reveal">
              <div className="eyebrow text-hero-muted mb-6">
                A S Plastics · Established 2015
              </div>
              <h1 className="hero-title">
                Injection moulds.<br />
                Precision dies.<br />
                <span className="text-highlight">Made in Nashik.</span>
              </h1>
              <p className="mt-6 max-w-[460px] text-sm leading-7 text-hero-muted">
                A S Plastics is a tool room and mould manufacturer in Satpur MIDC, Nashik, making high-tolerance
                injection moulding dies, custom plastic moulds and mould bases, with heavy VMC machining and mould maintenance.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <Button
                  variant="brand"
                  className="h-12 px-6 text-xs font-semibold"
                  onClick={() => handleEnquire()}
                >
                  Discuss Your Requirement <ArrowUpRight size={15} />
                </Button>
                <Button variant="heroOutline" asChild className="h-12 px-6 text-xs">
                  <a href="#products">
                    Explore Our Products <ArrowRight size={15} />
                  </a>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-5 text-[11px] text-hero-muted">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-highlight flex-shrink-0" /> Manufacturer & Tool Room
                </span>
                <span className="hidden sm:inline-block h-3 border-l border-hero-muted/40" />
                <span className="flex items-center gap-2">
                  <MapPin size={15} className="text-highlight flex-shrink-0" /> Satpur MIDC, Nashik
                </span>
              </div>
            </div>
          </div>
          <span className="absolute bottom-5 right-7 text-[10px] text-hero-muted/80 z-10 hidden sm:block">
            Industrial tool room & precision workshop
          </span>
        </section>

        {/* ========================================================= */}
        {/* STATS AT A GLANCE */}
        {/* ========================================================= */}
        <section className="border-b border-border bg-muted/60" aria-label="Company at a glance">
          <div className="site-container grid grid-cols-2 lg:grid-cols-4 py-8 gap-y-6 gap-x-4">
            {[
              ['2015', 'Year of establishment', true],
              ['Manufacturer', 'Nature of business', false],
              ['Nashik', 'Maharashtra, India', false],
              ['Moulds & Dies', 'Our core expertise', false],
            ].map(([value, label, isFirst], i) => (
              <div
                key={label as string}
                className={`px-2 sm:px-5 ${i > 0 ? 'lg:border-l lg:border-border' : ''}`}
              >
                <p className={`font-bold break-words ${isFirst ? 'stat-number text-primary' : 'text-lg sm:text-[22px]'}`}>
                  {value}
                </p>
                <p className="mt-1.5 text-[11px] text-muted-foreground font-medium">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* PRODUCTS & SERVICES SECTION */}
        {/* ========================================================= */}
        <section id="products" className="py-20">
          <div className="site-container">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
              <div>
                <div className="eyebrow text-primary mb-3">What we make</div>
                <h2 className="section-title">
                  The right tooling.<br />For every application.
                </h2>
              </div>
              <p className="text-xs leading-6 text-muted-foreground max-w-[340px]">
                Explore our precision tooling, injection mould dies, and high-capacity VMC machining works tailored to your design tolerances.
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <article className="product-card" key={product.name}>
                  <div className="product-image">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />
                    <span className="absolute left-3 top-3 bg-background/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-muted-foreground rounded-sm border border-border">
                      0{i + 1}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-primary tracking-wider mb-2">
                        {product.label}
                      </p>
                      <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
                      <p className="mt-2.5 text-xs leading-6 text-muted-foreground min-h-[72px]">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-muted text-muted-foreground px-2 py-1 text-[10px] font-medium rounded-sm border border-border/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="link"
                      className="p-0 mt-5 h-8 w-full justify-between text-xs font-semibold"
                      onClick={() => handleEnquire(product.name)}
                    >
                      Enquire About This <ArrowUpRight size={14} />
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {/* Expandable items */}
            <div className="mt-10 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setExpandedProducts(!expandedProducts)}
                aria-expanded={expandedProducts}
                aria-controls="more-products"
                className="h-11 text-xs px-6 font-semibold"
              >
                {expandedProducts ? 'Show Core Products' : 'View More Products & Dies'}
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-300 ${expandedProducts ? 'rotate-180' : ''}`}
                />
              </Button>
            </div>

            <div id="more-products" hidden={!expandedProducts} className="mt-8 border-y border-border divide-y divide-border bg-card rounded-md border p-2">
              {[
                { name: 'Die Casting Moulds', desc: 'Precision aluminum & zinc high-pressure die casting moulds' },
                { name: 'Kids Toys & Specialty Moulds', desc: 'Multi-cavity high-speed plastic injection dies for durable toys' },
                { name: 'PET Preform Mould Components', desc: 'Custom blow & injection components for beverage packaging' },
                { name: 'Heavy Tool Room Job Works', desc: 'Surface grinding, EDM spark erosion, and lathe job-works' },
                { name: 'Mould Maintenance & Repair', desc: 'Servicing and repair of existing injection moulds and dies' },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 px-3 hover:bg-muted/40 transition-colors"
                >
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                  <Button
                    variant="brand"
                    size="sm"
                    onClick={() => handleEnquire(item.name)}
                    className="text-xs font-semibold self-start sm:self-auto"
                  >
                    Enquire <ArrowUpRight size={13} />
                  </Button>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-[10px] text-muted-foreground">
              Product imagery reflects workshop capabilities. Contact us with your technical drawings for customized feasibility and fabrication.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* ABOUT US SECTION */}
        {/* ========================================================= */}
        <section id="about" className="bg-muted/70 py-20 border-y border-border">
          <div className="site-container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative rounded-md overflow-hidden shadow-md border border-border">
              <img
                src="/assets/vmc-machining.jpg"
                alt="VMC machining of precision mould in Nashik"
                className="w-full aspect-[1.3] object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 bg-primary text-primary-foreground px-7 py-5">
                <p className="text-3xl font-extrabold leading-none">Since 2015</p>
                <p className="mt-1 text-[11px] font-medium opacity-90">
                  Rooted in Nashik. Focused on industrial excellence.
                </p>
              </div>
            </div>

            <div>
              <div className="eyebrow text-primary mb-4">About A S Plastics</div>
              <h2 className="section-title">
                Small details.<br />A bigger difference.
              </h2>
              <p className="text-sm leading-7 text-muted-foreground mt-5">
                Based in the industrial heart of Nashik, Maharashtra, <strong>A S Plastics</strong> is led by proprietor{' '}
                <strong>{brand.owner}</strong>. Since founding in 2015, we have earned trust by delivering dependable
                tooling, high-tolerance injection moulding dies, and complex VMC machining services.
              </p>
              <p className="text-xs leading-6 text-muted-foreground mt-3">
                From precision cap moulds to phone case dies and heavy mould bases, our infrastructure is built to support
                OEMs, injection moulders, and packaging manufacturers across Maharashtra and India.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6">
                {[
                  'Injection mould tooling',
                  'Plastic mould dies',
                  'Mould base manufacturing',
                  'Heavy VMC machining',
                  'Tool room job works',
                  'Quality inspection verified',
                ].map((text) => (
                  <span className="flex items-center gap-2 text-xs font-semibold text-foreground" key={text}>
                    <Check size={16} className="text-primary flex-shrink-0" />
                    {text}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <Button variant="brand" className="h-11 px-6 text-xs font-semibold" onClick={() => handleEnquire('General Inquiry')}>
                  Partner With Us <ArrowUpRight size={14} />
                </Button>
                <Button variant="outline" className="h-11 px-5 text-xs font-semibold" onClick={() => handleCallModal()}>
                  <Phone size={14} /> Contact Team
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CLIENTS */}
        {/* ========================================================= */}
        <section id="clients" className="py-16 border-b border-border">
          <div className="site-container">
            <div className="eyebrow text-primary mb-3">Trusted by</div>
            <h2 className="section-title">Our clients.</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-10">
              {clients.map(([name, src]) => (
                <div key={name} className="flex items-center justify-center bg-white rounded-md border border-border p-4 h-28">
                  <img src={src} alt={`${name} logo`} loading="lazy" className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* WORKFLOW / PROCESS */}
        {/* ========================================================= */}
        <section id="workflow" className="py-20">
          <div className="site-container">
            <div className="eyebrow text-primary mb-3">Your requirement, our starting point</div>
            <h2 className="section-title">Let’s talk tooling.</h2>
            <p className="text-xs text-muted-foreground mt-2 max-w-lg">
              A clear, collaborative process from initial concept drawings to tool delivery and first shot trials.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {processSteps.map(([number, title, body]) => (
                <div key={number} className="border-t-2 border-primary/40 pt-6 bg-card p-5 rounded-md border border-border shadow-sm">
                  <span className="text-primary text-sm font-extrabold tracking-wider">{number}</span>
                  <h3 className="font-bold mt-3 text-base text-foreground">{title}</h3>
                  <p className="text-xs leading-6 text-muted-foreground mt-2">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CONTACT BANNER */}
        {/* ========================================================= */}
        <section id="contact" className="bg-hero text-hero-foreground py-16 border-t border-border/20">
          <div className="site-container flex flex-col md:flex-row justify-between md:items-center gap-10">
            <div>
              <div className="eyebrow text-hero-muted mb-3">Start a conversation</div>
              <h2 className="section-title">
                Your next product starts<br />with the right mould.
              </h2>
              <p className="text-xs leading-6 text-hero-muted mt-3 max-w-md">
                Let’s discuss your plastic moulding and CNC machining requirements with prompt response and technical clarity.
              </p>
            </div>

            <div className="flex flex-col items-start gap-5">
              <Button
                variant="whatsapp"
                className="h-12 px-7 text-xs font-bold"
                onClick={() => handleEnquire()}
              >
                <MessageCircle size={17} /> Chat on WhatsApp <ArrowUpRight size={14} />
              </Button>

              <div className="space-y-2 text-xs text-hero-muted border-t border-hero-muted/20 pt-4 w-full">
                <p className="font-bold text-hero-foreground text-sm">{brand.owner} (Proprietor)</p>
                {brand.phoneNumbers.map((number: string) => (
                  <a
                    key={number}
                    href={`tel:+91${number}`}
                    className="flex items-center gap-2 hover:text-hero-foreground transition-colors"
                  >
                    <Phone size={13} className="text-highlight" /> +91 {number}
                  </a>
                ))}
                <p className="flex max-w-sm items-start gap-2 pt-1 text-hero-muted">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-highlight" />
                  {brand.address}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* FAQS SECTION */}
        {/* ========================================================= */}
        <section id="faqs" className="py-20 bg-muted/30 border-b border-border">
          <div className="site-container grid lg:grid-cols-[1fr_1.5fr] gap-10">
            <div>
              <div className="eyebrow text-primary mb-3">A few useful answers</div>
              <h2 className="section-title">
                Frequently asked<br />questions.
              </h2>
              <p className="text-xs text-muted-foreground mt-3 max-w-xs">
                Need more information? Feel free to message or call us anytime.
              </p>
            </div>

            <div className="border-t border-border">
              {faqs.map(([question, answer]) => (
                <details key={question} className="group border-b border-border py-5 cursor-pointer">
                  <summary className="flex cursor-pointer list-none justify-between items-center gap-4 text-sm font-bold text-foreground">
                    {question}
                    <ChevronDown
                      size={16}
                      className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                    />
                  </summary>
                  <p className="mt-3.5 text-xs leading-6 text-muted-foreground pr-4">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================= */}
      {/* FOOTER */}
      {/* ========================================================= */}
      <footer className="bg-muted border-t border-border py-12">
        <div className="site-container">
          <div className="flex flex-col md:flex-row justify-between gap-10">
            <div>
              <a href="#home" className="text-xl font-extrabold tracking-tight">
                A S PLASTICS<span className="text-primary">.</span>
              </a>
              <p className="mt-2 text-xs text-muted-foreground">
                {brand.servicesLine}
              </p>
              <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin size={13} className="text-primary mt-0.5 shrink-0" />
                {brand.address}
              </p>
              <p className="mt-2 flex items-start gap-2 text-xs text-muted-foreground">
                <Phone size={13} className="text-primary mt-0.5 shrink-0" />
                <span>
                  Tel: <a href="tel:+912534534690" className="hover:text-primary">{brand.landline}</a> · Cell:{' '}
                  {brand.phoneNumbers.map((number: string, i: number) => (
                    <React.Fragment key={number}>
                      {i > 0 && ' / '}
                      <a href={`tel:+91${number}`} className="hover:text-primary">{number}</a>
                    </React.Fragment>
                  ))}
                </span>
              </p>
              <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Mail size={13} className="text-primary shrink-0" />
                <a href={`mailto:${brand.email}`} className="hover:text-primary">
                  {brand.email}
                </a>
              </p>
              <p className="mt-2 text-xs font-semibold text-foreground">GSTIN: {brand.gstin}</p>
            </div>

            <div className="flex flex-wrap gap-8 sm:gap-12 text-xs">
              <div className="flex flex-col gap-2.5">
                <span className="font-bold text-foreground mb-1">Navigation</span>
                <a href="#products" className="text-muted-foreground hover:text-primary transition-colors">
                  Products & Services
                </a>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
                <a href="#workflow" className="text-muted-foreground hover:text-primary transition-colors">
                  Process
                </a>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </div>

              <div className="flex flex-col gap-2.5">
                <span className="font-bold text-foreground mb-1">Direct Connect</span>
                <button type="button" className="flex items-center gap-1.5 bg-transparent border-0 p-0 cursor-pointer text-left text-xs text-muted-foreground hover:text-primary transition-colors" onClick={() => handleEnquire()}>
                  <MessageCircle size={13} /> WhatsApp
                </button>
                <button type="button" className="flex items-center gap-1.5 bg-transparent border-0 p-0 cursor-pointer text-left text-xs text-muted-foreground hover:text-primary transition-colors" onClick={() => handleCallModal()}>
                  <Phone size={13} /> Call Us
                </button>
                <a href={`mailto:${brand.email}`} className="flex items-center gap-1.5 bg-transparent border-0 p-0 cursor-pointer text-left text-xs text-muted-foreground hover:text-primary transition-colors">
                  <Mail size={13} /> Email Us
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-10 pt-6 flex flex-wrap justify-between gap-3 text-[10px] text-muted-foreground">
            <span>© {new Date().getFullYear()} A S Plastics. All rights reserved.</span>
            <span>Made with ❤️ by <a href="https://nerdtech.in" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary transition-colors">NerdTech</a></span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <Button
        variant="whatsapp"
        size="icon"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg [&_svg]:size-6 hover:scale-105 transition-transform"
        onClick={() => handleEnquire()}
        aria-label="Chat with A S Plastics on WhatsApp"
      >
        <MessageCircle size={26} />
      </Button>

      {/* Direct Call Dialog Modal */}
      <Dialog
        open={contactModal !== null}
        onOpenChange={(open) => {
          if (!open) setContactModal(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Call A S Plastics</DialogTitle>
            <DialogDescription>
              To enquire directly about <strong>{contactModal}</strong>, contact proprietor{' '}
              <strong>{brand.owner}</strong> at either phone line below:
            </DialogDescription>
          </DialogHeader>
          <div className="mt-5 flex flex-col gap-3">
            {brand.phoneNumbers.map((number: string) => (
              <Button key={number} variant="brand" className="w-full h-11 text-xs font-bold" asChild>
                <a href={`tel:+91${number}`}>
                  <Phone size={15} /> Call +91 {number}
                </a>
              </Button>
            ))}
            <Button
              variant="whatsapp"
              className="w-full h-11 text-xs font-bold"
              onClick={() => {
                const product = contactModal || undefined;
                setContactModal(null);
                const url = whatsappUrl(brand.whatsappNumber || `91${brand.phoneNumbers[0]}`, product);
                if (url) {
                  window.open(url, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              <MessageCircle size={15} /> Or Send WhatsApp Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}