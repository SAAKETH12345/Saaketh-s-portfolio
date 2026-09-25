import { useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'

// Reusable physics config for hover followers
const physicsConfig = { stiffness: 150, damping: 15, mass: 0.1 }

function ServiceItem({ num, title, imageSrc }) {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const smoothX = useSpring(x, physicsConfig)
  const smoothY = useSpring(y, physicsConfig)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    // Center the follower image (w-[400px] h-[250px])
    x.set(e.clientX - rect.left - 200)
    y.set(e.clientY - rect.top - 125)
  }

  return (
    <div 
      className="hover-trigger group relative border-b border-primary py-12 md:py-20 px-6 md:px-12 flex flex-col md:flex-row md:justify-between items-start md:items-center cursor-pointer overflow-hidden hover:bg-primary hover:text-secondary transition-colors duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <span className="text-xl md:text-3xl font-bold mb-4 md:mb-0 mix-blend-difference pointer-events-none z-10 text-white">[{num}]</span>
      <h3 className="text-2xl md:text-[3vw] leading-tight font-black tracking-tighter uppercase z-10 text-left md:text-right w-full md:max-w-4xl mix-blend-difference pointer-events-none transition-transform duration-500 group-hover:-translate-x-4 text-white">
        {title}
      </h3>
      
      {/* Follower Image */}
      <motion.div
        className="absolute top-0 left-0 w-[300px] h-[200px] md:w-[400px] md:h-[250px] pointer-events-none z-0"
        style={{ x: smoothX, y: smoothY }}
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          scale: isHovered ? 1 : 0.8,
          rotate: isHovered ? 0 : -10
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <img src={imageSrc} alt={title} className="w-full h-full object-cover grayscale contrast-125" />
      </motion.div>
    </div>
  )
}

function ProjectItem({ project, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const smoothX = useSpring(x, physicsConfig)
  const smoothY = useSpring(y, physicsConfig)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    // Center the follower image (w-[400px] h-[300px])
    x.set(e.clientX - rect.left - 200)
    y.set(e.clientY - rect.top - 150)
  }

  return (
    <div 
      className="hover-trigger group relative border-b border-secondary py-16 px-6 md:px-12 flex flex-col md:flex-row md:justify-between items-start md:items-center cursor-pointer overflow-hidden hover:bg-secondary hover:text-primary transition-colors duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <span className="text-2xl md:text-4xl font-bold mb-4 md:mb-0 mix-blend-difference pointer-events-none z-10 text-white">
        {project.id}
      </span>
      <h3 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase leading-[1.1] tracking-tight mix-blend-difference pointer-events-none z-10 transition-transform duration-500 group-hover:-translate-x-8 text-right w-full text-white">
        {project.title}
      </h3>
      
      {/* Follower Image */}
      <motion.div
        className="absolute top-0 left-0 w-[300px] h-[200px] md:w-[400px] md:h-[300px] pointer-events-none z-0"
        style={{ x: smoothX, y: smoothY }}
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          scale: isHovered ? 1 : 0.8,
          rotate: isHovered ? 0 : -5
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <img src={project.imageSrc} alt={project.title} className="w-full h-full object-cover grayscale contrast-125" />
      </motion.div>
    </div>
  )
}

function CustomCursor() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const cursorX = useSpring(x, physicsConfig)
  const cursorY = useSpring(y, physicsConfig)
  
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateCursor = (e) => {
      // Offset by half of cursor size (w-5 h-5 is 20px)
      x.set(e.clientX - 10)
      y.set(e.clientY - 10)
    }

    const handleMouseOver = (e) => {
      const isClickable = e.target.closest('a') || e.target.closest('button') || e.target.closest('.hover-trigger')
      setIsHovering(!!isClickable)
    }

    window.addEventListener('mousemove', updateCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [x, y])

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 border-2 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{ x: cursorX, y: cursorY }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? "#0047ff" : "transparent",
        borderColor: isHovering ? "transparent" : "#ffffff"
      }}
      transition={{ duration: 0.2 }}
    />
  )
}

function AnimatedPhilosophy({ progress }) {
  const textY = useTransform(progress, [0.5, 1], [100, 0])
  const textOpacity = useTransform(progress, [0.5, 1], [0, 1])

  return (
    <motion.div 
      style={{ y: textY, opacity: textOpacity }}
      className="relative z-10 w-full px-8 flex flex-col justify-center items-center text-center max-w-6xl mx-auto"
    >
      <span className="text-[8vw] md:text-[6vw] leading-[0.9] font-heading font-black text-primary uppercase tracking-tighter">
        ALGORITHMIC
      </span>
      <span className="text-[8vw] md:text-[6vw] leading-[0.9] font-heading font-black text-primary uppercase tracking-tighter">
        PRECISION.
      </span>
      <span className="text-[8vw] md:text-[6vw] leading-[0.9] font-heading font-black text-primary uppercase tracking-tighter">
        GREAT IMPACT.
      </span>
    </motion.div>
  )
}

const projectsList = [
  { id: "01/05", title: "SentinelAgent (Autonomous SRE System for CockroachDB)", imageSrc: "/project-1.svg" },
  { id: "02/05", title: "WhatsApp-to-Email AI Chatbot (LLM Automation)", imageSrc: "/project-2.svg" },
  { id: "03/05", title: "Chanakya (AI Compliance Engine)", imageSrc: "/project-3.svg" },
  { id: "04/05", title: "SENTINEL Engine v2.4 (Cybersecurity Tool)", imageSrc: "/project-4.svg" },
  { id: "05/05", title: "Lumi AI Tutor & QuantumCash Enterprise Treasury", imageSrc: "/project-5.svg" }
]

function App() {
  const { scrollYProgress } = useScroll()
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacityRange = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Wipe Section Scroll Setup
  const containerRef = useRef(null)
  const { scrollYProgress: wipeProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  })
  
  // 2. Fix Broken Blue Scroll Wipe (Seamless Section Wipe)
  // Expand from 0 to 150vw radius from bottom-left edge as the section scrolls in
  const clipRadius = useTransform(wipeProgress, [0, 1], [0, 150])
  const clipPathValue = useMotionTemplate`circle(${clipRadius}vw at 0% 100%)`

  // Footer Parallax Setup
  const footerRef = useRef(null)
  const { scrollYProgress: footerProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  })
  const footerY = useTransform(footerProgress, [0, 1], ["-30%", "0%"])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-primary text-secondary overflow-x-hidden selection:bg-accent selection:text-primary">
      <CustomCursor />
      
      {/* Header / Navbar */}
      <header className="fixed top-6 right-6 lg:right-12 z-50 pointer-events-none mix-blend-difference text-white">
        <div className="flex gap-2 pointer-events-auto hover-trigger bg-white/10 backdrop-blur-3xl border border-white/20 p-2 rounded-full shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]">
          <a href="https://www.linkedin.com/in/kazipeta-saaketh/" target="_blank" rel="noopener noreferrer" className="rounded-full px-6 py-2.5 text-xs font-bold hover:bg-white hover:text-black transition-colors uppercase tracking-widest inline-flex items-center cursor-pointer">
            LINKEDIN
          </a>
          <a href="https://github.com/SAAKETH12345" target="_blank" rel="noopener noreferrer" className="bg-white text-black border border-white rounded-full px-6 py-2.5 text-xs font-bold hover:bg-transparent hover:text-white transition-colors uppercase tracking-widest inline-flex items-center cursor-pointer">
            GITHUB
          </a>
        </div>
      </header>

      {/* Hero section */}
      <section className="h-screen w-full relative grid grid-cols-12 grid-rows-6 px-8 overflow-hidden">
        
        {/* Side-by-Side Hero Content */}
        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-start w-full h-full z-20 px-4 md:pl-20 md:pr-12 pt-16 md:pt-20 gap-6 md:gap-12">
          
          {/* Left Side: Circle Portrait */}
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
            className="flex-shrink-0 flex justify-center items-center mb-4 md:mb-0"
          >
            <div className="w-[50vw] h-[50vw] md:w-[26vw] md:h-[26vw] rounded-full overflow-hidden border-8 border-secondary drop-shadow-2xl bg-gray-100 flex justify-center items-end relative shrink-0">
              <img 
                src="/hero_portrait_transparent.png" 
                alt="Portrait" 
                className="w-[75%] h-auto object-contain grayscale contrast-125 absolute bottom-0"
              />
            </div>
          </motion.div>

          {/* Right Side: Name */}
          <motion.div 
            style={{ y: yRange, opacity: opacityRange }} 
            className="flex-grow flex flex-col justify-center items-center md:items-start text-center md:text-left min-w-0"
          >
            <h1 className="flex flex-col leading-none tracking-tighter uppercase w-full">
              <span className="text-[11.5vw] md:text-[6vw] font-black text-secondary whitespace-nowrap">SAAKETH</span>
              <span className="text-[11.5vw] md:text-[6vw] font-black text-transparent whitespace-nowrap" style={{ WebkitTextStroke: '2px var(--color-secondary)' }}>KAZIPETA</span>
            </h1>
          </motion.div>

        </div>
      </section>

      {/* Philosophy Section with Clip-Path Wipe */}
      <motion.section 
        ref={containerRef}
        style={{ clipPath: clipPathValue }}
        className="min-h-screen bg-accent relative z-40 flex justify-center items-center py-40"
      >
        <AnimatedPhilosophy progress={wipeProgress} />
      </motion.section>

      {/* About Section */}
      <section id="about" className="min-h-screen bg-primary text-secondary py-32 border-t border-secondary px-6 md:px-12 flex flex-col justify-center relative z-40">
        <div className="max-w-7xl mx-auto w-full">
          <motion.h2 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-[6vw] font-black tracking-tighter mb-12 uppercase border-b-8 border-secondary pb-4 inline-block"
          >
            THE ARCHITECT.
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-12">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-[2.5vw] font-heading font-bold leading-tight tracking-tight"
            >
              I am a Systems Architect and Full-Stack AI Engineer specializing in Autonomous Agentic Workflows, Distributed Vector Databases, and Cloud SRE Infrastructure.
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl font-heading font-medium leading-relaxed opacity-80"
            >
              With a 9.14 CGPA and a strong foundation in hardware, my core stack spans Python, React, FastAPI, and CockroachDB. I build practical, real-world solutions—from WhatsApp AI chatbots that automate emails, to autonomous SRE agents like SentinelAgent that reduce MTTR by 99%. As a frequent hackathon Team Lead, I thrive under pressure, turning complex ideas into high-performance, production-ready software.
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise (Services) section */}
      <section id="skills" className="min-h-screen bg-secondary text-primary py-32">
        <div className="w-full">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-24 px-6 md:px-12"
          >
            <h2 className="text-[6vw] font-black tracking-tighter leading-none mb-12 pb-8">
              TECHNICAL <br/> EXPERTISE.
            </h2>
          </motion.div>

          <div className="flex flex-col border-t border-primary">
            <ServiceItem num="01" title="FULL-STACK DEVELOPMENT (React, FastAPI, Python)" imageSrc="/service-1.jpg" />
            <ServiceItem num="02" title="SYSTEMS ENGINEERING (C, Linux, OS Internals)" imageSrc="/service-2.jpg" />
            <ServiceItem num="03" title="AI & AUTOMATION (Ollama, Offline Agents, Bash)" imageSrc="/service-3.jpg" />
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="min-h-screen bg-primary text-secondary py-32">
        <div className="w-full">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-24 px-6 md:px-12"
          >
            <h2 className="text-[8vw] font-black leading-none tracking-tighter border-b-4 border-secondary pb-8">SELECTED WORKS.</h2>
          </motion.div>
          
          <div className="flex flex-col border-t-2 border-secondary">
            {projectsList.map((project, index) => (
              <ProjectItem key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer section */}
      <section id="contact" ref={footerRef} className="bg-accent text-primary pt-32 pb-24 px-6 md:px-12 overflow-hidden relative min-h-screen flex flex-col justify-end">
        <motion.div style={{ y: footerY }} className="w-full flex flex-col h-full relative">
          
          {/* 5. Fix Unclickable Footer Buttons/Links: Move CONTACT text to absolute background */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0 opacity-20 overflow-hidden">
             <h2 className="text-[13vw] leading-none font-black tracking-tighter uppercase whitespace-nowrap text-center">
               CONTACT
             </h2>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 border-t-2 border-primary/30 pt-16 mt-auto relative z-10 hover-trigger">
            {/* [Socials] */}
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-heading font-bold tracking-widest uppercase mb-2 opacity-70">[Socials]</h4>
              <a href="https://www.linkedin.com/in/kazipeta-saaketh/" target="_blank" rel="noopener noreferrer" className="text-3xl md:text-4xl font-heading font-bold hover:translate-x-4 transition-transform w-fit uppercase">LINKEDIN</a>
              <a href="https://github.com/SAAKETH12345" target="_blank" rel="noopener noreferrer" className="text-3xl md:text-4xl font-heading font-bold hover:translate-x-4 transition-transform w-fit uppercase">GITHUB</a>
              <a href="https://devpost.com/saakethkazipeta" target="_blank" rel="noopener noreferrer" className="text-3xl md:text-4xl font-heading font-bold hover:translate-x-4 transition-transform w-fit uppercase">DEVPOST</a>
            </div>

            {/* [Nav] */}
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-heading font-bold tracking-widest uppercase mb-2 opacity-70">[Nav]</h4>
              <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about').scrollIntoView({ behavior: 'smooth' }) }} className="text-3xl md:text-4xl font-heading font-bold hover:translate-x-4 transition-transform w-fit uppercase">ABOUT</a>
              <a href="#skills" onClick={(e) => { e.preventDefault(); document.getElementById('skills').scrollIntoView({ behavior: 'smooth' }) }} className="text-3xl md:text-4xl font-heading font-bold hover:translate-x-4 transition-transform w-fit uppercase">SKILLS</a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }) }} className="text-3xl md:text-4xl font-heading font-bold hover:translate-x-4 transition-transform w-fit uppercase">PROJECTS</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }) }} className="text-3xl md:text-4xl font-heading font-bold hover:translate-x-4 transition-transform w-fit uppercase">CONTACT</a>
            </div>

            {/* [Contact us] */}
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-heading font-bold tracking-widest uppercase mb-2 opacity-70">[Contact us]</h4>
              <a href="mailto:saakethkazipeta@gmail.com" className="text-[5vw] md:text-[2.5vw] lg:text-[1.8vw] font-heading font-bold hover:translate-x-4 transition-transform w-fit uppercase whitespace-nowrap">SAAKETHKAZIPETA@GMAIL.COM</a>
              <a href="tel:+919059130576" className="text-3xl md:text-4xl font-heading font-bold hover:translate-x-4 transition-transform w-fit uppercase whitespace-nowrap">+91 9059130576</a>
            </div>
          </div>
          
          <div className="mt-24 w-full flex justify-between items-end text-xs md:text-sm font-heading font-bold uppercase tracking-widest opacity-60 pb-4 relative z-10 hover-trigger">
            <span>© 2026 SAAKETH KAZIPETA</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

        </motion.div>
      </section>
    </div>
  )
}

export default App
