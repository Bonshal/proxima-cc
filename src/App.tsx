import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, Shield, Zap, Globe, Plane, Utensils, Star, Users, Building, ChevronRight, CheckCircle } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';

type CardColor = 'obsidian' | 'platinum' | 'gold' | 'titanium' | 'emerald' | 'sapphire';

interface AnimatedCardProps {
  color?: CardColor;
  className?: string;
  floatOffset?: number;
  rotationOffset?: number;
}

function AnimatedCard({ color = 'obsidian', className = '', floatOffset = 0, rotationOffset = 0 }: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const styles = {
    obsidian: 'bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border-zinc-700/50 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)]',
    platinum: 'bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 border-white/50 text-slate-900 shadow-[0_20px_50px_rgba(255,255,255,0.1)]',
    gold: 'bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 border-yellow-200/50 text-amber-950 shadow-[0_20px_50px_rgba(251,191,36,0.15)]',
    titanium: 'bg-gradient-to-br from-zinc-400 via-zinc-500 to-zinc-700 border-zinc-300/50 text-white shadow-[0_20px_50px_rgba(161,161,170,0.15)]',
    emerald: 'bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 border-emerald-500/50 text-white shadow-[0_20px_50px_rgba(16,185,129,0.15)]',
    sapphire: 'bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 border-blue-500/50 text-white shadow-[0_20px_50px_rgba(59,130,246,0.15)]',
  };

  return (
    <motion.div
      animate={{
        y: [floatOffset, floatOffset - 15, floatOffset],
        rotateZ: [rotationOffset, rotationOffset + 2, rotationOffset],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-[320px] h-[200px] rounded-2xl p-6 border flex flex-col justify-between backdrop-blur-sm ${styles[color]} ${className}`}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
        
        <div style={{ transform: "translateZ(40px)" }} className="flex justify-between items-start relative z-10">
          <div className="w-12 h-8 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-md opacity-90 shadow-inner flex items-center justify-center overflow-hidden">
            <div className="w-full h-[1px] bg-black/20 absolute top-1/2" />
            <div className="w-[1px] h-full bg-black/20 absolute left-1/3" />
            <div className="w-[1px] h-full bg-black/20 absolute right-1/3" />
          </div>
          <div className="text-2xl font-display font-bold tracking-widest italic opacity-90">PROXIMA</div>
        </div>
        
        <div style={{ transform: "translateZ(60px)" }} className="space-y-4 relative z-10">
          <div className="font-mono text-xl tracking-widest opacity-90 drop-shadow-sm">
            •••• •••• •••• 4242
          </div>
          <div className="flex justify-between items-end text-xs opacity-80 uppercase tracking-wider">
            <div>
              <div className="text-[9px] opacity-60 mb-1">Cardholder</div>
              <div className="font-medium tracking-widest">ALEX MORGAN</div>
            </div>
            <div>
              <div className="text-[9px] opacity-60 mb-1">Expires</div>
              <div className="font-medium tracking-widest">12/28</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Navbar({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: (p: string) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'cards', label: 'Cards' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'company', label: 'Company' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button 
          onClick={() => setCurrentPage('home')}
          className="text-2xl font-display font-bold tracking-widest italic hover:opacity-80 transition-opacity"
        >
          PROXIMA
        </button>
        
        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                currentPage === item.id 
                  ? 'bg-white text-black shadow-lg' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentPage('login')}
            className="hidden md:block text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            Log In
          </button>
          <button 
            onClick={() => setCurrentPage('signup')}
            className="px-5 py-2.5 bg-white text-black rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

function Home({ setCurrentPage }: { setCurrentPage: (p: string) => void }) {
  return (
    <div className="pt-20">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Now accepting applications
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-display font-medium tracking-tighter leading-[1.1]">
              The future of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">
                credit is here.
              </span>
            </h1>
            
            <p className="text-lg text-zinc-400 max-w-md leading-relaxed">
              Experience unparalleled rewards, zero foreign transaction fees, and a beautifully crafted metal card.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button 
                onClick={() => setCurrentPage('apply')}
                className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setCurrentPage('cards')}
                className="px-8 py-4 bg-transparent text-white border border-white/20 rounded-full font-medium hover:bg-white/5 transition-colors w-full sm:w-auto justify-center"
              >
                Compare Cards
              </button>
            </div>
          </motion.div>

          <div className="relative h-[400px] lg:h-[600px] flex items-center justify-center mt-12 lg:mt-0">
            <div className="absolute z-30">
              <AnimatedCard color="obsidian" floatOffset={0} rotationOffset={-5} />
            </div>
            <div className="absolute z-20 translate-x-12 translate-y-12 opacity-80 blur-[1px] hidden sm:block">
              <AnimatedCard color="platinum" floatOffset={10} rotationOffset={5} />
            </div>
            <div className="absolute z-10 -translate-x-12 -translate-y-12 opacity-60 blur-[2px] hidden sm:block">
              <AnimatedCard color="gold" floatOffset={-10} rotationOffset={-10} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-zinc-950 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-6">
              Designed for the modern spender
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              Every feature has been meticulously crafted to give you ultimate control over your finances.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Globe className="w-6 h-6" />, title: "Zero Borders", desc: "No foreign transaction fees. Spend anywhere in the world with real-time exchange rates." },
              { icon: <Shield className="w-6 h-6" />, title: "Ironclad Security", desc: "Virtual cards, instant freeze, and biometric authentication keep your money safe." },
              { icon: <Zap className="w-6 h-6" />, title: "Instant Rewards", desc: "Earn up to 5% cashback on your daily spend, credited instantly to your account." }
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-white">
                  {f.icon}
                </div>
                <h3 className="text-xl font-medium mb-3">{f.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function CardsPage({ setCurrentPage }: { setCurrentPage: (p: string) => void }) {
  const tiers = [
    {
      name: "Proxima Obsidian",
      color: "obsidian" as CardColor,
      desc: "The foundation of premium credit. Essential rewards with zero annual fee.",
      features: ["2% Cashback everywhere", "No foreign transaction fees", "Virtual cards included", "Basic travel insurance"],
      fee: "₹0"
    },
    {
      name: "Proxima Sapphire",
      color: "sapphire" as CardColor,
      desc: "Designed for the modern explorer. Premium travel perks and global connectivity.",
      features: ["3% Cashback on travel", "No foreign transaction fees", "TSA PreCheck credit", "Lost luggage protection"],
      fee: "₹4,999"
    },
    {
      name: "Proxima Emerald",
      color: "emerald" as CardColor,
      desc: "Sustainable spending. Earn rewards while contributing to global green initiatives.",
      features: ["4% Cashback on sustainable brands", "Carbon offset matching", "Eco-friendly metal card", "Local transit rewards"],
      fee: "₹9,999"
    },
    {
      name: "Proxima Platinum",
      color: "platinum" as CardColor,
      desc: "Elevated experiences. For the frequent traveler and lifestyle enthusiast.",
      features: ["4% Cashback on dining & travel", "Airport lounge access (4/yr)", "Global concierge service", "Premium travel insurance"],
      fee: "₹14,999"
    },
    {
      name: "Proxima Titanium",
      color: "titanium" as CardColor,
      desc: "Built for business. High limits, expense management, and corporate perks.",
      features: ["1.5% Cashback on all business spend", "Free employee cards", "QuickBooks integration", "Dedicated account manager"],
      fee: "₹24,999"
    },
    {
      name: "Proxima Gold",
      color: "gold" as CardColor,
      desc: "The ultimate status symbol. Unlimited access to the world's best experiences.",
      features: ["5% Cashback on everything", "Unlimited lounge access + guest", "Dedicated 24/7 wealth advisor", "Exclusive event invites"],
      fee: "₹49,999"
    }
  ];

  return (
    <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-6"
        >
          Choose your Proxima
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 max-w-2xl mx-auto text-lg"
        >
          Six distinct tiers. One seamless experience. Find the card that matches your lifestyle.
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
        {tiers.map((tier, i) => (
          <motion.div 
            key={tier.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
            className="flex flex-col items-center p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group hover:bg-white/[0.04] transition-colors"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="h-[220px] flex items-center justify-center mb-8 w-full">
              <AnimatedCard color={tier.color} className="scale-75 sm:scale-90" />
            </div>
            
            <h3 className="text-3xl font-display font-medium mb-2">{tier.name}</h3>
            <div className="text-xl font-medium text-zinc-300 mb-4">{tier.fee} <span className="text-sm text-zinc-500 font-normal">/ year</span></div>
            <p className="text-zinc-400 text-center mb-8 h-12">{tier.desc}</p>
            
            <ul className="space-y-4 mb-10 w-full flex-1">
              {tier.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-3 text-sm text-zinc-300">
                  <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => setCurrentPage('apply')}
              className={`w-full py-4 rounded-full font-medium transition-colors ${
              tier.color === 'platinum' 
                ? 'bg-white text-black hover:bg-zinc-200' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}>
              Apply for {tier.name.split(' ')[1]}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BenefitsPage() {
  const benefits = [
    { icon: <Plane className="w-8 h-8" />, title: "Global Lounge Access", desc: "Escape the chaos. Complimentary access to over 1,300 Priority Pass lounges worldwide, complete with free Wi-Fi, drinks, and snacks." },
    { icon: <Utensils className="w-8 h-8" />, title: "Fine Dining Credits", desc: "Receive up to ₹25,000 annually in statement credits when dining at our curated list of Michelin-starred partner restaurants." },
    { icon: <Star className="w-8 h-8" />, title: "Elite Hotel Status", desc: "Automatic Gold status at Marriott Bonvoy and Hilton Honors. Enjoy room upgrades, late checkout, and free breakfast." },
    { icon: <Shield className="w-8 h-8" />, title: "Purchase Protection", desc: "Buy with confidence. We cover your purchases against accidental damage or theft for up to 120 days." },
  ];

  return (
    <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-6"
        >
          Unrivaled Benefits
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 max-w-2xl mx-auto text-lg"
        >
          Elevate every aspect of your life. From travel to dining, Proxima ensures you're always treated like a VIP.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {benefits.map((b, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            className="p-10 rounded-3xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 text-zinc-300 group-hover:text-white group-hover:scale-110 transition-all duration-500">
              {b.icon}
            </div>
            <h3 className="text-2xl font-display font-medium mb-4">{b.title}</h3>
            <p className="text-zinc-400 leading-relaxed text-lg">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CompanyMotionGraphic() {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden rounded-3xl bg-zinc-900/20 border border-white/5">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Central Hub */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-64 h-64 border border-white/10 rounded-full border-dashed"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute w-96 h-96 border border-white/5 rounded-full"
      />
      
      {/* Core Node */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute z-20 w-24 h-24 bg-black border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.1)]"
      >
        <div className="text-xl font-display font-bold italic tracking-widest">PROXIMA</div>
      </motion.div>

      {/* Orbiting Nodes */}
      {[
        { radius: 128, angle: 0, size: 48, dot: 8, label: "LDN" },
        { radius: 128, angle: 120, size: 32, dot: 6, label: "NYC" },
        { radius: 128, angle: 240, size: 40, dot: 6, label: "SGP" },
        { radius: 192, angle: 60, size: 56, dot: 10, label: "TOK" },
        { radius: 192, angle: 180, size: 32, dot: 4, label: "FRA" },
        { radius: 192, angle: 300, size: 48, dot: 8, label: "DXB" },
      ].map((node, i) => (
        <motion.div
          key={i}
          className="absolute z-10 flex items-start justify-center"
          initial={{ rotate: node.angle }}
          animate={{
            rotate: node.radius === 128 ? node.angle + 360 : node.angle - 360,
          }}
          transition={{
            duration: node.radius === 128 ? 40 : 60,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: node.radius * 2,
            height: node.radius * 2,
          }}
        >
          <motion.div
            className="relative flex items-center justify-center bg-black/80 backdrop-blur-sm border border-white/10 rounded-full"
            style={{ width: node.size, height: node.size, marginTop: -node.size / 2 }}
            initial={{ rotate: -node.angle }}
            animate={{
              rotate: node.radius === 128 ? -(node.angle + 360) : -(node.angle - 360)
            }}
            transition={{
              duration: node.radius === 128 ? 40 : 60,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div 
              className="bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" 
              style={{ width: node.dot, height: node.dot }} 
            />
            <motion.div 
              className="absolute inset-0 rounded-full border border-white/20"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            />
            <div className="absolute top-full mt-2 text-[10px] font-mono text-zinc-500 tracking-widest">
              {node.label}
            </div>
          </motion.div>
        </motion.div>
      ))}
      
      {/* Connecting Pulses */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <radialGradient id="pulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <motion.circle
          cx="50%"
          cy="50%"
          r="80"
          fill="url(#pulse)"
          animate={{
            scale: [1, 2.5, 1],
            opacity: [0.8, 0, 0.8]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
}

function CompanyPage() {
  return (
    <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-6"
        >
          Redefining Wealth
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 max-w-2xl mx-auto text-lg"
        >
          We are building the financial infrastructure for the next generation of global citizens.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-32">
        {[
          { stat: "₹800B+", label: "Processed Annually" },
          { stat: "150+", label: "Countries Supported" },
          { stat: "24/7", label: "Global Support" }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="text-center p-8 rounded-3xl bg-white/[0.02] border border-white/5"
          >
            <div className="text-5xl font-display font-medium mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">{item.stat}</div>
            <div className="text-zinc-400 font-medium tracking-wide uppercase text-sm">{item.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-display font-medium">Our Mission</h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Legacy banks are slow, expensive, and out of touch with modern needs. We started Proxima to create a credit card that actually works for you, no matter where you are in the world.
          </p>
          <p className="text-zinc-400 text-lg leading-relaxed">
            By combining beautiful hardware with powerful software, we're giving our members unprecedented control over their financial lives.
          </p>
          <button className="flex items-center gap-2 text-white font-medium hover:gap-4 transition-all pt-4">
            View Open Positions <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full"
        >
          <CompanyMotionGraphic />
        </motion.div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 bg-black text-zinc-500 text-sm relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2 md:col-span-2">
          <div className="text-2xl font-display font-bold tracking-widest italic text-white mb-4">PROXIMA</div>
          <p className="max-w-xs">
            Redefining the credit experience with beautiful design and unparalleled rewards.
          </p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Products</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Proxima Obsidian</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Proxima Sapphire</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Proxima Emerald</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Proxima Platinum</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Proxima Titanium</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Proxima Gold</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Cardholder Agreement</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
        <p>© 2026 Proxima Financial. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

function ApplyPage({ setCurrentPage }: { setCurrentPage: (p: string) => void }) {
  return (
    <div className="pt-32 pb-32 px-6 max-w-3xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-display font-medium mb-4">Apply for Proxima</h1>
          <p className="text-zinc-400">Join the next generation of premium credit.</p>
        </div>
        
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setCurrentPage('home'); }}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">First Name</label>
              <input type="text" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="John" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Last Name</label>
              <input type="text" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="Doe" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Email Address</label>
            <input type="email" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="john@example.com" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Phone Number</label>
            <input type="tel" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="+91 98765 43210" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">PAN Number</label>
            <input type="text" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors uppercase" placeholder="ABCDE1234F" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Annual Income (₹)</label>
            <select required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none">
              <option value="">Select Income Range</option>
              <option value="1">Under ₹5,00,000</option>
              <option value="2">₹5,00,000 - ₹15,00,000</option>
              <option value="3">₹15,00,000 - ₹30,00,000</option>
              <option value="4">Above ₹30,00,000</option>
            </select>
          </div>
          
          <button type="submit" className="w-full py-4 bg-white text-black rounded-xl font-medium hover:bg-zinc-200 transition-colors mt-8">
            Submit Application
          </button>
          
          <p className="text-xs text-zinc-500 text-center mt-6">
            By submitting this application, you agree to our Terms of Service and Privacy Policy. We will perform a soft credit check that will not affect your credit score.
          </p>
        </form>
      </motion.div>
    </div>
  );
}

function LoginPage({ setCurrentPage }: { setCurrentPage: (p: string) => void }) {
  return (
    <div className="pt-32 pb-32 px-6 max-w-md mx-auto min-h-screen flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
      >
        <div className="text-center mb-8">
          <div className="text-2xl font-display font-bold tracking-widest italic mb-2">PROXIMA</div>
          <h1 className="text-2xl font-medium mb-2">Welcome back</h1>
          <p className="text-zinc-400 text-sm">Enter your details to access your account.</p>
        </div>
        
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setCurrentPage('home'); }}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Email</label>
            <input type="email" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="name@example.com" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-zinc-300">Password</label>
              <button type="button" className="text-xs text-zinc-400 hover:text-white transition-colors">Forgot password?</button>
            </div>
            <input type="password" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="••••••••" />
          </div>
          
          <button type="submit" className="w-full py-3.5 bg-white text-black rounded-xl font-medium hover:bg-zinc-200 transition-colors mt-6">
            Log In
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-zinc-400">
          Don't have an account?{' '}
          <button onClick={() => setCurrentPage('signup')} className="text-white font-medium hover:underline">
            Sign up
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function SignupPage({ setCurrentPage, showToast }: { setCurrentPage: (p: string) => void, showToast: (m: string) => void }) {
  return (
    <div className="pt-32 pb-32 px-6 max-w-md mx-auto min-h-screen flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
      >
        <div className="text-center mb-8">
          <div className="text-2xl font-display font-bold tracking-widest italic mb-2">PROXIMA</div>
          <h1 className="text-2xl font-medium mb-2">Create an account</h1>
          <p className="text-zinc-400 text-sm">Start your journey with Proxima today.</p>
        </div>
        
        <form className="space-y-5" onSubmit={(e) => { 
          e.preventDefault(); 
          showToast('Account created successfully!');
          setCurrentPage('home'); 
        }}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Full Name</label>
            <input type="text" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="John Doe" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Email</label>
            <input type="email" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="name@example.com" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Password</label>
            <input type="password" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="••••••••" />
          </div>
          
          <button type="submit" className="w-full py-3.5 bg-white text-black rounded-xl font-medium hover:bg-zinc-200 transition-colors mt-6">
            Create Account
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-zinc-400">
          Already have an account?{' '}
          <button onClick={() => setCurrentPage('login')} className="text-white font-medium hover:underline">
            Log in
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20 flex flex-col">
       <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
       
       {/* Toast Notification */}
       <AnimatePresence>
         {toast && (
           <motion.div
             initial={{ opacity: 0, y: -20, scale: 0.9 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: -20, scale: 0.9 }}
             className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-zinc-900 border border-white/10 shadow-2xl rounded-full px-6 py-3"
           >
             <CheckCircle className="w-5 h-5 text-emerald-400" />
             <span className="text-sm font-medium">{toast}</span>
           </motion.div>
         )}
       </AnimatePresence>

       <main className="flex-1 relative">
         <AnimatePresence mode="wait">
           <motion.div
             key={currentPage}
             initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
             animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
             exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
             transition={{ duration: 0.4, ease: "easeInOut" }}
             className="w-full"
           >
             {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
             {currentPage === 'cards' && <CardsPage setCurrentPage={setCurrentPage} />}
             {currentPage === 'benefits' && <BenefitsPage />}
             {currentPage === 'company' && <CompanyPage />}
             {currentPage === 'apply' && <ApplyPage setCurrentPage={setCurrentPage} />}
             {currentPage === 'login' && <LoginPage setCurrentPage={setCurrentPage} />}
             {currentPage === 'signup' && <SignupPage setCurrentPage={setCurrentPage} showToast={showToast} />}
           </motion.div>
         </AnimatePresence>
       </main>
       
       <Footer />
    </div>
  );
}
