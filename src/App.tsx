import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Plus, 
  ChevronDown, 
  Sparkles, 
  ArrowLeft, 
  Star, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Map as MapIcon,
  Car,
  MessageSquare,
  Filter
} from 'lucide-react';
import { MOCK_PROPERTIES, Property } from './types';

// --- Components ---

const Navbar = ({ onHome }: { onHome: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 px-8 flex items-center justify-between">
    <div 
      className="flex items-center gap-2 cursor-pointer" 
      onClick={onHome}
    >
      <div className="w-8 h-8 bg-navy-900 rounded-lg flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-teal-500" />
      </div>
      <span className="font-display font-bold text-xl tracking-tight text-navy-900">Getaway</span>
    </div>
    <div className="flex items-center gap-8">
      <button className="text-sm font-medium text-slate-600 hover:text-navy-900 transition-colors">My Trips</button>
      <div className="flex items-center gap-3 pl-8 border-l border-slate-200">
        <span className="text-sm font-medium text-navy-900">Ivana</span>
        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" 
            alt="User" 
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  </nav>
);

const SearchDashboard = ({ onSearch }: { onSearch: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [foodOption, setFoodOption] = useState('Breakfast');

  return (
    <div className="min-h-screen pt-32 pb-20 px-8 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="font-display text-5xl font-bold text-navy-900 mb-4">Where to next, Ivana?</h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">Move from analysis paralysis to booking confidence with AI-curated matches.</p>
      </motion.div>

      <motion.div 
        layout
        className="w-full max-w-4xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
      >
        <div className="p-8 grid grid-cols-4 gap-6">
          <div className="col-span-2 space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Destination</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Where are you going?" 
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-action-blue/20 focus:border-action-blue transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Period</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Dates" 
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-action-blue/20 focus:border-action-blue transition-all"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Budget</label>
              <div className="relative">
                <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="w-full pl-7 pr-2 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-action-blue/20 focus:border-action-blue transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Travelers</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-action-blue/20 focus:border-action-blue transition-all">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4+</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 pb-8">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-semibold text-action-blue hover:text-navy-900 transition-colors mb-6"
          >
            <Filter className="w-4 h-4" />
            Additional Criteria
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-8"
              >
                <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider">Environment</h3>
                    <div className="flex flex-wrap gap-3">
                      {['Quiet place', 'Pet friendly', 'Adults only', 'City center', 'Beachfront'].map(chip => (
                        <button key={chip} className="px-4 py-2 rounded-full border border-slate-200 text-sm font-medium hover:border-action-blue hover:text-action-blue transition-all">
                          {chip}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider">Smoking</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-slate-600">Smoking allowed</span>
                      <button className="w-12 h-6 bg-slate-200 rounded-full relative transition-colors hover:bg-slate-300">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider">Food Options</h3>
                  <div className="flex p-1 bg-slate-100 rounded-xl w-fit">
                    {['Breakfast', 'Half Board', 'All Inclusive'].map(option => (
                      <button 
                        key={option}
                        onClick={() => setFoodOption(option)}
                        className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${foodOption === option ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-navy-900'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={onSearch}
            className="w-full mt-8 py-4 bg-navy-900 text-white rounded-2xl font-display font-bold text-lg flex items-center justify-center gap-3 hover:bg-navy-800 transition-all group relative overflow-hidden"
          >
            <div className="absolute inset-0 ai-sparkle opacity-0 group-hover:opacity-10 transition-opacity" />
            <Sparkles className="w-5 h-5 text-teal-500" />
            Find My Top 3
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Shortlist = ({ onSelect }: { onSelect: (p: Property) => void }) => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-teal-50 border border-teal-100 rounded-2xl p-6 mb-12 flex items-center gap-4"
      >
        <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center shrink-0">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="font-display font-bold text-navy-900 text-lg">AI Synthesis Complete</h2>
          <p className="text-teal-800/80">Synthesized 1,000+ reviews from Booking, Airbnb, and Expedia into your best 3 matches.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-8">
        {MOCK_PROPERTIES.map((property, idx) => (
          <motion.div 
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden flex flex-col group cursor-pointer"
            onClick={() => onSelect(property)}
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={property.image} 
                alt={property.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-bold text-navy-900">{property.rating}</span>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="mb-4">
                <h3 className="font-display font-bold text-2xl text-navy-900 mb-1">{property.name}</h3>
                <div className="flex items-center gap-1 text-slate-400 text-sm">
                  <MapPin className="w-4 h-4" />
                  {property.location}
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  </div>
                  <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">AI Insight</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  <span className="font-bold text-navy-900">{property.quietScore} Quiet Score.</span> {property.aiInsight}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-navy-900">${property.priceTotal}</div>
                  <div className="text-xs font-bold text-teal-600 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    No hidden fees
                  </div>
                </div>
                <button className="px-6 py-3 bg-navy-900 text-white rounded-xl font-bold text-sm hover:bg-navy-800 transition-all">
                  Review Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-6">
        <button className="text-sm font-bold text-slate-400 hover:text-navy-900 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Load more offers
        </button>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-center gap-3 max-w-2xl"
        >
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <p className="text-sm text-amber-800">
            Options are limited. Try <span className="font-bold underline cursor-pointer">increasing your budget by 10%</span> or <span className="font-bold underline cursor-pointer">adjusting your dates</span> for 25 more results.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const PropertyDetail = ({ property, onBack }: { property: Property, onBack: () => void }) => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-8 max-w-7xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-navy-900 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shortlist
      </button>

      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-2 space-y-12">
          {/* Gallery */}
          <div className="masonry-grid">
            <div className="masonry-item-large rounded-3xl overflow-hidden shadow-lg">
              <img src={property.gallery[0]} className="w-full h-full object-cover" alt="Gallery 1" referrerPolicy="no-referrer" />
            </div>
            <div className="masonry-item-small rounded-3xl overflow-hidden shadow-lg">
              <img src={property.gallery[1]} className="w-full h-full object-cover" alt="Gallery 2" referrerPolicy="no-referrer" />
            </div>
            <div className="masonry-item-small rounded-3xl overflow-hidden shadow-lg">
              <img src={property.gallery[2]} className="w-full h-full object-cover" alt="Gallery 3" referrerPolicy="no-referrer" />
            </div>
            <div className="masonry-item-small rounded-3xl overflow-hidden shadow-lg">
              <img src={property.gallery[3]} className="w-full h-full object-cover" alt="Gallery 4" referrerPolicy="no-referrer" />
            </div>
            <div className="masonry-item-small rounded-3xl overflow-hidden shadow-lg relative group cursor-pointer">
              <img src={property.image} className="w-full h-full object-cover blur-[2px]" alt="Gallery 5" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-navy-900/40 flex items-center justify-center text-white font-bold">
                +12 Photos
              </div>
            </div>
          </div>

          {/* Trust Dashboard */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl font-bold text-navy-900">Trust Dashboard</h2>
              <div className="flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full border border-teal-100">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span className="text-sm font-bold text-teal-600">AI Verified Insights</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
                <h3 className="font-bold text-navy-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-500" />
                  Review Synthesis
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pros</span>
                    <ul className="space-y-2">
                      {property.pros.map(pro => (
                        <li key={pro} className="flex items-start gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cons</span>
                    <ul className="space-y-2">
                      {property.cons.map(con => (
                        <li key={con} className="flex items-start gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-50 rounded-3xl p-8 border border-rose-100 shadow-sm space-y-6">
                <h3 className="font-bold text-rose-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-500" />
                  Red Flag Detection
                </h3>
                <div className="space-y-4">
                  {property.redFlags.map(flag => (
                    <div key={flag} className="p-4 bg-white rounded-2xl border border-rose-200 flex gap-3">
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      <p className="text-sm text-rose-900 font-medium">{flag}</p>
                    </div>
                  ))}
                  <p className="text-xs text-rose-700/60 leading-relaxed italic">
                    *Our AI flags potential risks based on cross-platform review patterns and recent guest reports.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Integrated Utility Modules */}
          <section className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-navy-900 flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-slate-400" />
                Places Nearby
              </h3>
              <div className="h-48 bg-slate-200 rounded-3xl overflow-hidden relative border border-slate-300">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover opacity-50 grayscale" 
                  alt="Map Placeholder" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span className="text-sm font-bold text-navy-900">View Interactive Map</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-navy-900 flex items-center gap-2">
                <Car className="w-5 h-5 text-slate-400" />
                Rent a Car
              </h3>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-navy-900">SUV - Tesla Model Y</h4>
                  <p className="text-sm text-slate-500">From $85/day • Electric</p>
                </div>
                <button className="px-4 py-2 bg-slate-100 text-navy-900 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all">
                  Quick-Add
                </button>
              </div>
            </div>
          </section>

          {/* Social Proof */}
          <section className="space-y-6">
            <h3 className="font-bold text-navy-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-slate-400" />
              Social Proof
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {property.reviews.map((review, i) => (
                <div key={i} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-navy-900">{review.author}</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`w-3 h-3 ${j < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sticky Sidebar */}
        <div className="relative">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-8">
              <div>
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Price</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-navy-900">${property.priceTotal}</span>
                  <span className="text-slate-400 text-sm">/ 7 nights</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Accommodation</span>
                  <span className="font-medium text-navy-900">${property.priceTotal - 120}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Service Fee</span>
                  <span className="font-medium text-navy-900">$120</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Taxes</span>
                  <span className="font-medium text-teal-600">Included</span>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-bold text-navy-900">All-in Total</span>
                  <span className="text-xl font-bold text-navy-900">${property.priceTotal}</span>
                </div>
              </div>

              <button className="w-full py-4 bg-navy-900 text-white rounded-2xl font-display font-bold text-lg hover:bg-navy-800 transition-all shadow-lg shadow-navy-900/20">
                Book Confidently
              </button>

              <div className="flex items-center justify-center gap-2 text-xs font-bold text-teal-600 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                No hidden fees guarantee
              </div>
            </div>

            <div className="bg-navy-900 rounded-3xl p-6 text-white space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-500" />
                <span className="font-bold">AI Concierge Tip</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Prices for {property.location} are expected to rise by 15% in the next 48 hours. Booking now is recommended for best value.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<'search' | 'shortlist' | 'detail'>('search');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handleSearch = () => {
    setScreen('shortlist');
  };

  const handleSelectProperty = (p: Property) => {
    setSelectedProperty(p);
    setScreen('detail');
  };

  const handleBackToShortlist = () => {
    setScreen('shortlist');
  };

  const handleHome = () => {
    setScreen('search');
    setSelectedProperty(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-teal-100 selection:text-teal-900">
      <Navbar onHome={handleHome} />
      
      <main>
        <AnimatePresence mode="wait">
          {screen === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SearchDashboard onSearch={handleSearch} />
            </motion.div>
          )}

          {screen === 'shortlist' && (
            <motion.div
              key="shortlist"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Shortlist onSelect={handleSelectProperty} />
            </motion.div>
          )}

          {screen === 'detail' && selectedProperty && (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PropertyDetail 
                property={selectedProperty} 
                onBack={handleBackToShortlist} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer / Background Accents */}
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="fixed -bottom-40 -left-40 w-96 h-96 bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-action-blue/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}
