import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  Shield, 
  BadgeDollarSign, 
  ArrowRight, 
  Wrench
} from 'lucide-react';

// --- VARIANTES REUTILIZABLES PARA ANIMACIONES (Mantiene el código limpio) ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 } // Añade retraso entre elementos hijos
  }
};

const Header = () => {
  const navigate = useNavigate();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed w-full top-0 bg-white/80 backdrop-blur-md shadow-sm z-50 border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button 
            onClick={() => window.scrollTo(0, 0)}
            className="shrink-0 flex items-center group"
          >
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3"
            >
              <Wrench className="text-white w-6 h-6" />
            </motion.div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">URBAN<span className="text-blue-600">MANT</span></span>
          </button>

          <nav className="hidden md:flex space-x-10" aria-label="Navegación principal">
            {['servicios', 'beneficios', 'contacto'].map((item) => (
              <a key={item} href={`#${item}`} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <motion.button 
              onClick={() => navigate('/app/dashboard')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md hover:bg-slate-800 transition-colors"
            >
              Acceder
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
        
        <motion.div 
          className="lg:w-1/2 text-center lg:text-left"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm mb-6 border border-blue-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Servicio de emergencia 24/7
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            Soluciones <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">rápidas</span> para tu tranquilidad.
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            ¿Tu equipo falló? Lo reparamos hoy mismo con garantía escrita. Sin demoras ni sorpresas en el precio.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="mt-10 flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
            <motion.button 
              onClick={() => navigate('/app/dashboard')}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(37, 99, 235, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors hover:bg-blue-700"
            >
              Acceder al Sistema
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                 <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Animación de la imagen desde la derecha */}
        <motion.div 
          className="lg:w-1/2 w-full relative"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Técnico profesional" 
              className="object-cover w-full h-125"
            />
          </div>
          
          {/* Tarjeta flotante con animación continua (Float effect) */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-4 md:flex"
          >
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle2 className="text-green-600 w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Técnicos Certificados</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: Clock, title: "En tu puerta en 120 min.", desc: "Tu urgencia es nuestra prioridad. Contamos con técnicos distribuidos estratégicamente." },
    { icon: Shield, title: "6 Meses de Garantía", desc: "Si el equipo vuelve a fallar, la nueva reparación corre 100% por nuestra cuenta." },
    { icon: BadgeDollarSign, title: "Precio Cerrado", desc: "Sabrás el costo exacto antes de empezar. Sin costos extra de última hora." }
  ];

  return (
    <section id="beneficios" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Aparición al hacer scroll (whileInView) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">¿Por qué elegirnos?</h2>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((item, idx) => (
            <motion.article 
              key={idx} 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ContactForm = () => (
  <section id="contacto" className="py-24 bg-white relative overflow-hidden">
    <div className="absolute top-1/2 left-0 w-full h-1/2 bg-slate-900 -z-10"></div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-800 overflow-hidden flex flex-col lg:flex-row">
        
        <div className="text-white p-12 lg:w-2/5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 blur-[80px] rounded-full opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Solicita tu presupuesto</h2>
            <p className="text-slate-400 mb-10 text-lg">Déjanos tus datos y un especialista se comunicará contigo en menos de 15 minutos para asesorarte.</p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-slate-800 p-3 rounded-lg text-blue-400"><Clock className="w-6 h-6" /></div>
                <div>
                  <p className="font-semibold text-white">Horario de atención</p>
                  <p className="text-slate-400">Lunes a Viernes, 08:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-12 lg:w-3/5 bg-white m-2 rounded-4xl">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label htmlFor="nombre" className="text-sm font-bold text-slate-700">Nombre completo</label>
                <input type="text" id="nombre" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 transition-colors focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none" placeholder="Juan Pérez" required />
              </div>
              <div className="space-y-1">
                <label htmlFor="telefono" className="text-sm font-bold text-slate-700">Teléfono / WhatsApp</label>
                <input type="tel" id="telefono" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 transition-colors focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none" placeholder="+54 9..." required />
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="servicio" className="text-sm font-bold text-slate-700">¿Qué necesitas?</label>
              <select id="servicio" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 transition-colors focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none appearance-none cursor-pointer">
                <option value="">Selecciona un servicio...</option>
                <option value="mantenimiento">Mantenimiento Preventivo</option>
                <option value="instalacion">Instalación de Equipos</option>
                <option value="reparacion">Reparación de Urgencia</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white font-bold text-lg py-4 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-600/30 transform hover:-translate-y-1 flex justify-center items-center gap-2 mt-4">
              Enviar Solicitud
            </button>
            <p className="text-center text-xs text-slate-500 font-medium">Tus datos están seguros. No enviamos spam.</p>
          </form>
        </div>

      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Wrench className="text-blue-500 w-6 h-6" />
          <span className="text-xl font-black text-white tracking-tight">Fix<span className="text-blue-500">Pro</span></span>
        </div>
        <p className="text-sm font-medium">&copy; {new Date().getFullYear()} FixPro. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

// ... Omito el código estático de ContactForm y Footer para mantenerlo conciso, 
// puedes aplicar el mismo patrón de `motion.div` con `whileInView={fadeInUp}` a esas secciones.

export default function LandingPage() {
  return (
    <div className="font-sans text-slate-800 bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <ContactForm />
      </main>
        <Footer />
    </div>
  );
}