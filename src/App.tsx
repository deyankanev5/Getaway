import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Calendar as CalendarIcon, 
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
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  Clock
} from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, isWithinInterval, isBefore, startOfToday } from 'date-fns';
import { MOCK_PROPERTIES, Property } from './types';

// --- Types ---

type Currency = 'EUR' | 'USD';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

// --- Components ---

const Navbar = ({ onHome, currency, setCurrency, isLoggedIn, onSignOut, onNavigateSettings }: { onHome: () => void, currency: Currency, setCurrency: (c: Currency) => void, isLoggedIn: boolean, onSignOut: () => void, onNavigateSettings: () => void }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
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
      <div className="flex items-center gap-6">
        <div className="flex p-1 bg-slate-100 rounded-lg">
          {(['EUR', 'USD'] as Currency[]).map(c => (
            <button 
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${currency === c ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-navy-900'}`}
            >
              {c}
            </button>
          ))}
        </div>
        {isLoggedIn ? (
          <div className="relative">
            <div 
              className="flex items-center gap-3 pl-6 border-l border-slate-200 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="text-sm font-medium text-navy-900">Ivana</span>
              <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" 
                  alt="User" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50 flex flex-col"
                >
                  <button className="px-4 py-2 text-left text-sm font-medium text-slate-600 hover:text-navy-900 hover:bg-slate-50 transition-colors">
                    My Trips
                  </button>
                  <button 
                    onClick={() => { setDropdownOpen(false); onNavigateSettings(); }}
                    className="px-4 py-2 text-left text-sm font-medium text-slate-600 hover:text-navy-900 hover:bg-slate-50 transition-colors"
                  >
                    Account Settings
                  </button>
                  <div className="h-px bg-slate-100 my-1 font-bold"></div>
                  <button 
                    onClick={() => { setDropdownOpen(false); onSignOut(); }}
                    className="px-4 py-2 text-left text-sm font-bold text-rose-500 hover:bg-slate-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button className="text-sm font-bold text-navy-900 hover:text-navy-700 transition-colors">Sign In</button>
            <button className="px-5 py-2 bg-navy-900 text-white rounded-xl text-sm font-bold hover:bg-navy-800 transition-all">Join Getaway</button>
          </div>
        )}
      </div>
    </nav>
  );
};

const CalendarModal = ({ isOpen, onClose, range, setRange }: { isOpen: boolean, onClose: () => void, range: DateRange, setRange: (r: DateRange) => void }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfToday();

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const onDateClick = (day: Date) => {
    if (isBefore(day, today)) return;
    
    if (!range.start || (range.start && range.end)) {
      setRange({ start: day, end: null });
    } else if (range.start && !range.end) {
      if (isBefore(day, range.start)) {
        setRange({ start: day, end: null });
      } else {
        setRange({ ...range, end: day });
      }
    }
  };

  const renderHeader = (month: Date) => (
    <div className="flex items-center justify-between px-4 mb-4">
      <span className="font-bold text-navy-900">{format(month, 'MMMM yyyy')}</span>
    </div>
  );

  const renderDays = (month: Date) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isSelected = (range.start && isSameDay(day, range.start)) || (range.end && isSameDay(day, range.end));
        const isInRange = range.start && range.end && isWithinInterval(day, { start: range.start, end: range.end });
        const isPast = isBefore(day, today);
        const isCurrentMonth = isSameMonth(day, monthStart);

        days.push(
          <div
            key={day.toString()}
            className={`relative h-10 w-10 flex items-center justify-center cursor-pointer text-sm font-medium transition-all
              ${!isCurrentMonth ? 'text-slate-200 pointer-events-none' : ''}
              ${isPast ? 'text-slate-300 cursor-not-allowed' : 'text-navy-900 hover:bg-slate-100 rounded-full'}
              ${isSelected ? 'bg-navy-900 text-white hover:bg-navy-800 rounded-full z-10' : ''}
              ${isInRange ? 'bg-slate-100 rounded-none' : ''}
              ${range.start && isSameDay(day, range.start) && range.end ? 'rounded-l-full' : ''}
              ${range.end && isSameDay(day, range.end) ? 'rounded-r-full' : ''}
            `}
            onClick={() => onDateClick(cloneDay)}
          >
            <span>{format(day, 'd')}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div className="grid grid-cols-7 gap-0" key={day.toString()}>{days}</div>);
      days = [];
    }
    return <div className="space-y-1">{rows}</div>;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-5 h-5 text-slate-500" /></button>
          <div className="text-center">
            <h2 className="font-display font-bold text-navy-900 text-xl">When</h2>
            <p className="text-sm text-slate-500">
              {range.start ? format(range.start, 'MMM d') : 'Select start'} — {range.end ? format(range.end, 'MMM d') : 'Select end'}
            </p>
          </div>
          <div className="w-9" />
        </div>
        <div className="p-8">
          <div className="flex gap-12 relative">
            <button onClick={prevMonth} className="absolute left-0 top-0 p-2 hover:bg-slate-100 rounded-full z-20"><ChevronLeft className="w-5 h-5 text-navy-900" /></button>
            <button onClick={nextMonth} className="absolute right-0 top-0 p-2 hover:bg-slate-100 rounded-full z-20"><ChevronRight className="w-5 h-5 text-navy-900" /></button>
            <div className="flex-1">
              {renderHeader(currentMonth)}
              <div className="grid grid-cols-7 gap-0 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (<div key={d} className="text-center text-xs font-bold text-slate-400 uppercase">{d}</div>))}
              </div>
              {renderDays(currentMonth)}
            </div>
            <div className="flex-1">
              {renderHeader(addMonths(currentMonth, 1))}
              <div className="grid grid-cols-7 gap-0 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (<div key={d} className="text-center text-xs font-bold text-slate-400 uppercase">{d}</div>))}
              </div>
              {renderDays(addMonths(currentMonth, 1))}
            </div>
          </div>
        </div>
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button onClick={() => setRange({ start: null, end: null })} className="text-sm font-bold text-navy-900 hover:underline">Clear</button>
          <button onClick={onClose} className="px-10 py-3 bg-navy-900 text-white rounded-full font-bold hover:bg-navy-800 transition-all">Update</button>
        </div>
      </motion.div>
    </div>
  );
};

const CoupleQuiz = ({ onSearch, currency, isLoggedIn }: { onSearch: (budgetType?: 'per_night' | 'total', budgetValue?: number) => void, currency: Currency, isLoggedIn: boolean }) => {
  const [step, setStep] = useState(1);
  const [travelType, setTravelType] = useState<string>('');
  const [tripTypes, setTripTypes] = useState<string[]>([]);
  const [priorities, setPriorities] = useState<string[]>([]);
  const [budget, setBudget] = useState(1000);
  const [styleBoutique, setStyleBoutique] = useState(true);
  const [stylePacker, setStylePacker] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  const tripOptions = ['Relaxation', 'Adventure', 'Culture & History', 'Food & Nightlife', 'Beach', 'Mountains', 'City Break'];
  const priorityOptions = ['Location & Neighborhood', 'Cleanliness & Quiet', 'Unique Vibe', 'Price & Value', 'Trust & Reviews'];
  const travelTypeOptions = [
    { id: 'solo', icon: '🧳', label: 'Just me (solo)' },
    { id: 'partner', icon: '💑', label: 'Me & my partner' },
    { id: 'family', icon: '👨‍👩‍👧', label: 'Family with kids' },
    { id: 'friends', icon: '👯', label: 'Friends group' },
    { id: 'business', icon: '💼', label: 'Business travel' }
  ];

  const toggleTripType = (type: string) => {
    setTripTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const togglePriority = (priority: string) => {
    if (priorities.includes(priority)) {
      setPriorities(prev => prev.filter(p => p !== priority));
    } else if (priorities.length < 3) {
      setPriorities(prev => [...prev, priority]);
    }
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    else setIsFinished(true);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center gap-2 mb-8">
      {[1, 2, 3, 4].map(s => (
        <div 
          key={s} 
          className={`w-2 h-2 rounded-full transition-all duration-300 ${step === s ? 'w-6 bg-navy-900' : 'bg-slate-200'}`} 
        />
      ))}
    </div>
  );

  return (
    <div className="p-10 min-h-[500px] flex flex-col">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-grow"
          >
            {renderStepIndicator()}
            
            {step === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Who's this trip for?</label>
                  <h2 className="text-2xl font-display font-bold text-navy-900 mt-2">Select your travel group</h2>
                </div>
                <div className="space-y-3 max-w-md mx-auto">
                  {travelTypeOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => setTravelType(option.id)}
                      className={`w-full p-4 rounded-2xl border flex items-center gap-4 text-sm font-bold text-navy-900 cursor-pointer transition-all ${
                        travelType === option.id
                          ? 'border-navy-900 bg-navy-50'
                          : 'border-slate-200 hover:border-navy-900'
                      }`}
                    >
                      <span className="text-2xl">{option.icon}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">What kind of trip are you after?</label>
                  <h2 className="text-2xl font-display font-bold text-navy-900 mt-2">Select at least 2 vibes</h2>
                </div>
                <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
                  {tripOptions.map(type => (
                    <button
                      key={type}
                      onClick={() => toggleTripType(type)}
                      className={`px-5 py-2.5 rounded-full border text-xs font-bold transition-all ${
                        tripTypes.includes(type) 
                          ? 'bg-navy-900 border-navy-900 text-white shadow-lg shadow-navy-900/20' 
                          : 'border-slate-200 text-slate-500 hover:border-navy-900 hover:text-navy-900'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">What matters most to you?</label>
                  <h2 className="text-2xl font-display font-bold text-navy-900 mt-2">Rank your top 3 priorities</h2>
                </div>
                <div className="space-y-3 max-w-md mx-auto">
                  {priorityOptions.map(option => {
                    const rank = priorities.indexOf(option) + 1;
                    return (
                      <button
                        key={option}
                        onClick={() => togglePriority(option)}
                        className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all ${
                          rank > 0 
                            ? 'bg-navy-900 border-navy-900 text-white shadow-lg shadow-navy-900/20' 
                            : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-navy-900'
                        }`}
                      >
                        <span className="font-bold text-sm">{option}</span>
                        {rank > 0 && (
                          <div className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                            {rank}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-10">
                <div className="text-center">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Your travel style</label>
                  <h2 className="text-2xl font-display font-bold text-navy-900 mt-2">Fine-tune your preferences</h2>
                </div>
                
                <div className="max-w-md mx-auto space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Nightly Budget</label>
                      <span className="text-xl font-bold text-navy-900">
                        {currency === 'EUR' ? '€' : '$'}{budget}
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="200" 
                      max="2000" 
                      step="100"
                      value={budget}
                      onChange={(e) => setBudget(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-navy-900"
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-4">
                      <span className={`text-xs font-bold transition-colors ${styleBoutique ? 'text-navy-900' : 'text-slate-400'}`}>Boutique / unique stays</span>
                      <button 
                        onClick={() => setStyleBoutique(!styleBoutique)}
                        className={`w-14 h-7 rounded-full relative shrink-0 transition-colors ${styleBoutique ? 'bg-navy-900' : 'bg-teal-500'}`}
                      >
                        <motion.div 
                          animate={{ x: styleBoutique ? 4 : 32 }}
                          className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md" 
                        />
                      </button>
                      <span className={`text-xs font-bold transition-colors ${!styleBoutique ? 'text-navy-900' : 'text-slate-400'}`}>Reliable / chain hotels</span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className={`text-xs font-bold transition-colors ${stylePacker ? 'text-navy-900' : 'text-slate-400'}`}>Light packers</span>
                      <button 
                        onClick={() => setStylePacker(!stylePacker)}
                        className={`w-14 h-7 rounded-full relative shrink-0 transition-colors ${stylePacker ? 'bg-navy-900' : 'bg-teal-500'}`}
                      >
                        <motion.div 
                          animate={{ x: stylePacker ? 4 : 32 }}
                          className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md" 
                        />
                      </button>
                      <span className={`text-xs font-bold transition-colors ${!stylePacker ? 'text-navy-900' : 'text-slate-400'}`}>Comfort & amenities</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-12 flex items-center justify-between max-w-md mx-auto w-full">
              {step > 1 ? (
                <button onClick={prevStep} className="text-slate-400 font-bold text-sm hover:text-navy-900 transition-colors">Back</button>
              ) : <div />}
              <button 
                onClick={nextStep}
                disabled={(step === 1 && !travelType) || (step === 2 && tripTypes.length < 2) || (step === 3 && priorities.length < 1)}
                className="bg-navy-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-navy-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === 4 ? 'Finish Profile' : 'Next Step'}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center space-y-8 py-4"
          >
            <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-2">
              <Sparkles className="w-10 h-10 text-teal-500" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-display font-bold text-navy-900">
                {isLoggedIn ? "Ready, Ivana — here are your matches" : "Your profile is ready"}
              </h2>
              <p className="text-slate-500">We've synthesized your preferences into a custom travel profile.</p>
            </div>

            <div className="w-full max-w-md bg-slate-50 rounded-3xl p-8 border border-slate-100 text-left space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Traveling as</label>
                <div className="font-bold text-navy-900">{travelTypeOptions.find(t => t.id === travelType)?.label}</div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Your Vibe</label>
                <div className="flex flex-wrap gap-2">
                  {tripTypes.map(t => (
                    <span key={t} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-navy-900">{t}</span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Top Priority</label>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">1</div>
                  <span className="font-bold text-navy-900">{priorities[0]}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Budget</label>
                  <p className="font-bold text-navy-900">{currency === 'EUR' ? '€' : '$'}{budget}/night</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Style</label>
                  <p className="font-bold text-navy-900">{styleBoutique ? 'Boutique' : 'Reliable'}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={onSearch}
              className="w-full max-w-md py-5 bg-navy-900 text-white rounded-[24px] font-display font-bold text-xl flex items-center justify-center gap-4 hover:bg-navy-800 transition-all group relative overflow-hidden shadow-2xl shadow-navy-900/30"
            >
              <div className="absolute inset-0 ai-sparkle opacity-0 group-hover:opacity-10 transition-opacity" />
              <Sparkles className="w-6 h-6 text-teal-400" />
              Find My Matches
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SearchOrQuiz = ({ onSearch, currency, isLoggedIn }: { onSearch: (budgetType?: 'per_night' | 'total', budgetValue?: number) => void, currency: Currency, isLoggedIn: boolean }) => {
  const [activeTab, setActiveTab] = useState<'search' | 'quiz'>('search');
  const [isExpanded, setIsExpanded] = useState(false);
  const [foodOption, setFoodOption] = useState('No meals');
  const [selectedEnv, setSelectedEnv] = useState<string[]>([]);
  const [smokingAllowed, setSmokingAllowed] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [budgetType, setBudgetType] = useState<'per_night' | 'total'>('per_night');
  const [budgetValue, setBudgetValue] = useState<number | ''>('');
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && searchContainerRef.current) {
      setTimeout(() => {
        searchContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [isExpanded]);

  const toggleEnv = (env: string) => {
    setSelectedEnv(prev => prev.includes(env) ? prev.filter(e => e !== env) : [...prev, env]);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0 h-[80vh]">
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover" 
          alt="Hero" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/40 to-slate-50" />
      </div>

      <div className="relative z-10 w-full pt-48 pb-20 px-8 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4 text-teal-400" />
            AI-Powered Travel Intelligence
          </div>
          <h1 className="font-display text-7xl md:text-8xl font-bold text-white mb-6 tracking-tight leading-[0.9]">
            {isLoggedIn ? "Where to next, Ivana?" : "Travel with Confidence"}
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Move from analysis paralysis to booking confidence. Our AI synthesizes thousands of reviews to find your perfect stay.
          </p>
        </motion.div>

        <motion.div 
          ref={searchContainerRef}
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-5xl bg-white rounded-[40px] shadow-2xl shadow-navy-900/20 border border-slate-100 overflow-hidden"
        >
          {/* Tab Switcher */}
          <div className="flex justify-center pt-10 pb-2">
            <div className="flex p-1.5 bg-slate-100 rounded-2xl w-fit">
              <button 
                onClick={() => setActiveTab('search')}
                className={`px-8 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'search' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-navy-900'}`}
              >
                <Search className="w-4 h-4" />
                Search
              </button>
              <button 
                onClick={() => setActiveTab('quiz')}
                className={`px-8 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'quiz' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-navy-900'}`}
              >
                <Sparkles className="w-4 h-4" />
                Perfect Vacation Quiz
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'search' ? (
              <motion.div
                key="search-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                  <div className="lg:col-span-4 space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Destination</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Where are you going?" 
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy-900/5 focus:border-navy-900 transition-all text-navy-900 font-medium placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-3 space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Period</label>
                    <div 
                      onClick={() => setIsCalendarOpen(true)}
                      className="relative cursor-pointer group"
                    >
                      <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-navy-900 transition-colors" />
                      <div className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl group-hover:border-navy-900 transition-all text-sm text-navy-900 font-medium">
                        {dateRange.start && dateRange.end 
                          ? `${format(dateRange.start, 'MMM d')} - ${format(dateRange.end, 'MMM d')}`
                          : 'Select dates'}
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-3 space-y-3">
                    <div className="flex flex-wrap items-center gap-1.5 h-[24px]">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1 shrink-0">Budget</label>
                      <div className="flex p-0.5 bg-slate-100 rounded-[6px]">
                        <button 
                          onClick={() => setBudgetType('per_night')}
                          className={`px-2 py-1 rounded text-[9px] font-bold transition-all whitespace-nowrap ${budgetType === 'per_night' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-navy-900'}`}
                        >
                          Per night
                        </button>
                        <button 
                          onClick={() => setBudgetType('total')}
                          className={`px-2 py-1 rounded text-[9px] font-bold transition-all whitespace-nowrap ${budgetType === 'total' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-navy-900'}`}
                        >
                          Total
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                        {currency === 'EUR' ? '€' : '$'}
                      </span>
                      <input 
                        type="number" 
                        value={budgetValue}
                        onChange={(e) => setBudgetValue(e.target.value ? Number(e.target.value) : '')}
                        placeholder={budgetType === 'per_night' ? "Max / night" : "Max total"} 
                        className="w-full pl-10 pr-2 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy-900/5 focus:border-navy-900 transition-all text-navy-900 font-medium placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-2 space-y-3">
                    <div className="flex items-center h-[24px]">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Travelers</label>
                    </div>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <select className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-navy-900/5 focus:border-navy-900 transition-all text-navy-900 font-medium">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4+</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="px-10 pb-10">
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-navy-900 uppercase tracking-widest transition-colors mb-8 ml-1"
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
                        className="overflow-hidden space-y-10 mb-10"
                      >
                        <div className="grid grid-cols-2 gap-16">
                          <div className="space-y-6">
                            <h3 className="text-[10px] font-bold text-navy-900 uppercase tracking-[0.2em]">Environment</h3>
                            <div className="flex flex-wrap gap-3">
                              {['Quiet place', 'Pet friendly', 'Adults only', 'City center', 'Beachfront'].map(chip => (
                                <button 
                                  key={chip} 
                                  onClick={() => toggleEnv(chip)}
                                  className={`px-5 py-2.5 rounded-full border text-xs font-bold transition-all ${selectedEnv.includes(chip) ? 'bg-navy-900 border-navy-900 text-white' : 'border-slate-200 text-slate-500 hover:border-navy-900 hover:text-navy-900'}`}
                                >
                                  {chip}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-6">
                            <h3 className="text-[10px] font-bold text-navy-900 uppercase tracking-[0.2em]">Smoking Policy</h3>
                            <div className="flex items-center gap-4">
                              <span className="text-sm font-bold text-slate-500">Smoking allowed</span>
                              <button 
                                onClick={() => setSmokingAllowed(!smokingAllowed)}
                                className={`w-14 h-7 rounded-full relative transition-colors ${smokingAllowed ? 'bg-teal-500' : 'bg-slate-200'}`}
                              >
                                <motion.div 
                                  animate={{ x: smokingAllowed ? 32 : 4 }}
                                  className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md" 
                                />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h3 className="text-[10px] font-bold text-navy-900 uppercase tracking-[0.2em]">Meal Plans</h3>
                          <div className="flex p-1.5 bg-slate-100 rounded-2xl w-fit">
                            {['No meals', 'Breakfast', 'Half Board', 'All Inclusive'].map(option => (
                              <button 
                                key={option}
                                onClick={() => setFoodOption(option)}
                                className={`px-5 py-3 rounded-xl text-xs font-bold transition-all ${foodOption === option ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-navy-900'}`}
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
                    onClick={() => onSearch(budgetType, budgetValue || undefined)}
                    className="w-full py-5 bg-navy-900 text-white rounded-[24px] font-display font-bold text-xl flex items-center justify-center gap-4 hover:bg-navy-800 transition-all group relative overflow-hidden shadow-2xl shadow-navy-900/30"
                  >
                    <div className="absolute inset-0 ai-sparkle opacity-0 group-hover:opacity-10 transition-opacity" />
                    <Sparkles className="w-6 h-6 text-teal-400" />
                    Find My Perfect Match
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="quiz-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CoupleQuiz onSearch={onSearch} currency={currency} isLoggedIn={isLoggedIn} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {!isLoggedIn && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-32 w-full max-w-5xl grid grid-cols-3 gap-12"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-teal-500" />
              </div>
              <h3 className="font-display font-bold text-2xl text-navy-900">Verified Trust</h3>
              <p className="text-slate-500 leading-relaxed">Our AI cross-references thousands of reviews to detect red flags and verify authenticity.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-action-blue" />
              </div>
              <h3 className="font-display font-bold text-2xl text-navy-900">Smart Synthesis</h3>
              <p className="text-slate-500 leading-relaxed">Get the "vibe" of a place in seconds. We summarize the pros and cons so you don't have to.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-navy-900" />
              </div>
              <h3 className="font-display font-bold text-2xl text-navy-900">Best Deal Engine</h3>
              <p className="text-slate-500 leading-relaxed">We compare all major OTAs to ensure you're getting the absolute best price available.</p>
            </div>
          </motion.div>
        )}
      </div>

      <CalendarModal 
        isOpen={isCalendarOpen} 
        onClose={() => setIsCalendarOpen(false)} 
        range={dateRange} 
        setRange={setDateRange} 
      />
    </div>
  );
};

const Shortlist = ({ onSelect, currency }: { onSelect: (p: Property) => void, currency: Currency }) => {
  const [visibleCount, setVisibleCount] = useState(3);

  const formatPrice = (price: number) => {
    const converted = currency === 'USD' ? price * 1.08 : price;
    return new Intl.NumberFormat('en-IE', { 
      style: 'currency', 
      currency: currency,
      maximumFractionDigits: 0 
    }).format(converted);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

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
          <p className="text-teal-800/80">Synthesized 1,000+ reviews from Booking, Airbnb, and Expedia into your best matches.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-8">
        {MOCK_PROPERTIES.slice(0, visibleCount).map((property, idx) => {
          const bestOffer = property.offers.find(o => o.isBestDeal) || property.offers[0];
          const maxPrice = Math.max(...property.offers.map(o => o.price));
          const savings = maxPrice - bestOffer.price;
          
          return (
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
                <div className="absolute bottom-4 left-4 bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  Best Deal: {bestOffer.otaName}{savings > 0 ? ` · Save ${formatPrice(savings)}` : ''}
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
                    <div className="text-2xl font-bold text-navy-900">{formatPrice(bestOffer.price)}</div>
                    <div className="text-xs font-bold text-teal-600 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {bestOffer.conditions[0]}
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-navy-900 text-white rounded-xl font-bold text-sm hover:bg-navy-800 transition-all">
                    Compare Deals
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col items-center gap-6">
        {visibleCount < MOCK_PROPERTIES.length && (
          <button 
            onClick={handleLoadMore}
            className="text-sm font-bold text-slate-400 hover:text-navy-900 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Load more offers
          </button>
        )}

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

const BookingModal = ({ 
  onClose, 
  isLoggedIn, 
  otaName, 
  link 
}: { 
  onClose: () => void; 
  isLoggedIn: boolean; 
  otaName: string; 
  link: string; 
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }} 
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden p-8 text-center"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-navy-900 transition-colors rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          {isLoggedIn ? (
            <CheckCircle2 className="w-6 h-6 text-teal-500" />
          ) : (
            <Sparkles className="w-6 h-6 text-teal-500" />
          )}
        </div>

        {isLoggedIn ? (
          <>
            <h3 className="font-display font-bold text-2xl text-navy-900 mb-3">
              Redirecting to {otaName}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              We'll open their booking page. Your trip will be saved to My Trips automatically.
            </p>
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={onClose}
              className="w-full flex items-center justify-center px-6 py-3.5 bg-navy-900 text-white rounded-xl font-bold hover:bg-navy-800 transition-all font-display text-[15px] shadow-lg shadow-navy-900/20"
            >
              Continue &rarr;
            </a>
          </>
        ) : (
          <>
            <h3 className="font-display font-bold text-2xl text-navy-900 mb-3">
              Almost there!
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              To complete your booking on {otaName}, you'll be redirected to their site. No Getaway account needed &mdash; but signing up lets you save trips, compare later, and sync with your partner.
            </p>
            <div className="space-y-3">
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={onClose}
                className="w-full flex items-center justify-center px-6 py-3.5 bg-navy-900 text-white rounded-xl font-bold hover:bg-navy-800 transition-all font-display text-[15px] shadow-lg shadow-navy-900/20"
              >
                Continue to {otaName} &rarr;
              </a>
              <button 
                onClick={onClose}
                className="w-full flex items-center justify-center px-6 py-3.5 border border-slate-200 text-navy-900 rounded-xl font-bold hover:bg-slate-50 transition-all font-display text-[15px]"
              >
                Join Getaway first
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

const PropertyDetail = ({ property, onBack, currency, isLoggedIn }: { property: Property, onBack: () => void, currency: Currency, isLoggedIn: boolean }) => {
  const [filters, setFilters] = useState<string[]>([]);
  const [visibleOffersCount, setVisibleOffersCount] = useState(3);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const formatPrice = (price: number) => {
    const converted = currency === 'USD' ? price * 1.08 : price;
    return new Intl.NumberFormat('en-IE', { 
      style: 'currency', 
      currency: currency,
      maximumFractionDigits: 0 
    }).format(converted);
  };

  const bestOffer = property.offers.find(o => o.isBestDeal) || property.offers[0];
  const otherOffers = property.offers.filter(o => o !== bestOffer);
  const maxPrice = Math.max(...property.offers.map(o => o.price));
  const savings = maxPrice - bestOffer.price;

  const mockCars = [
    { name: 'Tesla Model Y', category: 'SUV · Electric', pricePerDay: 85 },
    { name: 'VW Golf', category: 'Compact · Petrol', pricePerDay: 42 },
    { name: 'BMW 3 Series', category: 'Sedan · Diesel', pricePerDay: 68 }
  ];

  const platformFiltersList = ['Booking.com', 'Airbnb', 'Expedia', 'Agoda', 'Hotels.com'];
  const activePlatforms = filters.filter(f => platformFiltersList.includes(f));
  const activeConditions = filters.filter(f => !platformFiltersList.includes(f) && f !== 'Lowest price');
  const isLowestPrice = filters.includes('Lowest price');

  let processedOffers = property.offers.filter(offer => {
    if (activePlatforms.length > 0 && !activePlatforms.includes(offer.otaName)) {
      return false;
    }
    if (activeConditions.length > 0 && !activeConditions.every(c => offer.conditions.includes(c))) {
      return false;
    }
    return true;
  });

  if (isLowestPrice) {
    processedOffers = [...processedOffers].sort((a, b) => a.price - b.price);
  }

  const toggleFilter = (filter: string) => {
    setFilters(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]);
  };

  const loadMoreOffers = () => {
    setVisibleOffersCount(prev => prev + 6);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-8 max-w-7xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-navy-900 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shortlist
      </button>

      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold text-navy-900 mb-2">{property.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-slate-500">
              <MapPin className="w-4 h-4" />
              {property.location}
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-navy-900 text-white rounded-lg text-xs font-bold">
              <Star className="w-3 h-3 fill-white" />
              {property.rating}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all">
            <Share2 className="w-5 h-5 text-navy-900" />
          </button>
          <button className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all">
            <Heart className="w-5 h-5 text-navy-900" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-2 space-y-16">
          {/* Hero Gallery - Now inside the main column */}
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
          
          {/* Guest Photos Strip */}
          <section className="space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-navy-900">📷 Guest Photos</h3>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full text-[10px] font-bold">47 photos</span>
                </div>
                <p className="text-xs text-slate-400 font-medium">From real travelers · Booking & Google</p>
              </div>
              <button className="text-xs font-bold text-action-blue hover:underline">See all guest photos →</button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
              {property.guestPhotos.map((photo, i) => {
                const platforms = [
                  { label: 'B', color: 'bg-blue-600' },
                  { label: 'G', color: 'bg-red-600' },
                  { label: 'A', color: 'bg-[#FF5A5F]' }
                ];
                const platform = platforms[i % platforms.length];
                
                return (
                  <div key={i} className="relative flex-shrink-0 w-[120px] h-[90px] rounded-xl overflow-hidden snap-start shadow-sm group cursor-zoom-in">
                    <img src={photo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={`Guest ${i}`} referrerPolicy="no-referrer" />
                    <div className={`absolute bottom-1.5 left-1.5 ${platform.color} text-white w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shadow-lg`}>
                      {platform.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* AI Synthesis & Trust Dashboard */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl font-bold text-navy-900">AI Trust Dashboard</h2>
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

              <div className="space-y-6">
                <h3 className="font-bold text-navy-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-500" />
                  Red Flag Detection
                </h3>
                <div className="space-y-4">
                  {property.redFlags.map((flag, idx) => (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-2xl border flex gap-3 relative overflow-hidden ${
                        flag.severity === 'critical' 
                          ? 'bg-rose-50 border-rose-100' 
                          : 'bg-amber-50 border-amber-100'
                      }`}
                    >
                      <div className={`absolute top-0 right-0 px-2 py-0.5 rounded-bl-lg text-[8px] font-bold uppercase tracking-wider ${
                        flag.severity === 'critical' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white'
                      }`}>
                        {flag.severity}
                      </div>
                      {flag.severity === 'critical' ? (
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                      )}
                      <div>
                        <p className={`text-sm font-bold mb-0.5 ${flag.severity === 'critical' ? 'text-rose-900' : 'text-amber-900'}`}>
                          {flag.severity === 'critical' ? 'Critical Issue' : 'Minor Concern'}
                        </p>
                        <p className={`text-sm leading-relaxed ${flag.severity === 'critical' ? 'text-rose-800/80' : 'text-amber-800/80'}`}>
                          {flag.text}
                        </p>
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    *Our AI flags potential risks based on cross-platform review patterns.
                  </p>
                </div>
              </div>
            </div>

            {/* Platform Ratings Synthesis */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-navy-900 mb-6 flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-action-blue" />
                Cross-Platform Rating Synthesis
              </h3>
              <div className="grid grid-cols-4 gap-6">
                {property.reviewSources.map((source, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{source.platform}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-bold text-navy-900">{source.rating}</span>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-navy-900 rounded-full" 
                        style={{ width: `${(source.rating / 5) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">{source.reviewCount} reviews</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Detailed Price Comparison */}
          <section id="prices" className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-display text-3xl font-bold text-navy-900">Compare All Deals</h2>
              </div>
              {savings > 0 && (
                <p className="text-teal-600 font-bold mt-2 text-sm flex items-center gap-1.5">
                  💰 Best deal saves you {formatPrice(savings)} vs highest listed price
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => toggleFilter('Lowest price')}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                  filters.includes('Lowest price') 
                    ? 'bg-navy-900 border-navy-900 text-white' 
                    : 'bg-white border-slate-200 text-slate-500'
                }`}
              >
                Lowest price
              </button>
              {['Booking.com', 'Airbnb', 'Expedia', 'Agoda', 'Hotels.com'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                    filters.includes(filter) 
                      ? 'bg-navy-900 border-navy-900 text-white' 
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  {filter}
                </button>
              ))}
              {['Breakfast included', 'Free cancellation'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                    filters.includes(filter) 
                      ? 'bg-navy-900 border-navy-900 text-white' 
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {processedOffers.slice(0, visibleOffersCount).map((offer, i) => (
                <div 
                  key={i} 
                  className={`bg-white border rounded-2xl p-6 flex items-center justify-between transition-all ${
                    offer.isBestDeal ? 'border-teal-200 bg-teal-50/30' : 'border-slate-100 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                      offer.isBestDeal ? 'bg-teal-500 text-white' : 'bg-slate-50 text-slate-400'
                    }`}>
                      {offer.otaName[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-navy-900">{offer.otaName}</h4>
                        {offer.isBestDeal && (
                          <span className="text-[10px] font-bold bg-teal-500 text-white px-2 py-0.5 rounded-full uppercase">Best Deal</span>
                        )}
                      </div>
                      <div className="flex gap-4 mt-1">
                        {offer.conditions.map(c => (
                          <span key={c} className="text-xs text-slate-500 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-teal-500" />
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="font-bold text-navy-900 text-lg">{formatPrice(offer.price)}</div>
                      {!offer.isBestDeal && (
                        <div className="text-[10px] font-bold text-rose-500 uppercase">
                          +{formatPrice(offer.price - bestOffer.price)}
                        </div>
                      )}
                    </div>
                    <button className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${
                      offer.isBestDeal 
                        ? 'bg-teal-500 text-white hover:bg-teal-600' 
                        : 'border border-slate-200 text-navy-900 hover:bg-slate-50'
                    }`}>
                      View Deal
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {visibleOffersCount < processedOffers.length && (
              <div className="flex justify-center pt-4">
                <button 
                  onClick={loadMoreOffers}
                  className="px-8 py-3 bg-white border border-slate-200 text-navy-900 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Load 6 more offers
                </button>
              </div>
            )}
          </section>

          {/* Rent a Car */}
          <section id="rent-a-car" className="space-y-6 pt-6">
            <div className="flex items-center gap-3">
              <Car className="w-8 h-8 text-navy-900" />
              <h2 className="font-display text-3xl font-bold text-navy-900">Rent a Car</h2>
            </div>
            <div className="flex overflow-x-auto gap-4 pb-2 snap-x">
              {mockCars.map((car, i) => (
                <div key={i} className="min-w-[220px] bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col snap-start">
                  <h3 className="font-bold text-navy-900 mb-1">{car.name}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">{car.category}</span>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-teal-600 font-bold">{formatPrice(car.pricePerDay)}/day</span>
                    <button className="border border-slate-200 text-navy-900 rounded-xl px-4 py-2 text-xs font-bold hover:bg-slate-50 transition-colors">
                      Quick-Add
                    </button>
                  </div>
                </div>
              ))}
              <button className="flex items-center shrink-0 px-4 text-sm font-bold text-slate-400 hover:text-navy-900 transition-colors">
                View all cars &rarr;
              </button>
            </div>
          </section>

          {/* Guest Reviews */}
          <section id="reviews" className="space-y-8">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold text-navy-900 mb-2">Guest Reviews</h2>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xl font-bold text-navy-900">{property.rating}</span>
                  <span className="text-slate-400 text-sm">• 1,240 verified reviews</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Aggregated across platforms</p>
                <div className="flex gap-2">
                  {property.reviewSources.map((source, idx) => {
                    const colors: Record<string, string> = {
                      'Booking': 'bg-blue-50 text-blue-600 border-blue-100',
                      'Airbnb': 'bg-rose-50 text-rose-600 border-rose-100',
                      'Google': 'bg-slate-50 text-slate-600 border-slate-100',
                      'Expedia': 'bg-amber-50 text-amber-600 border-amber-100'
                    };
                    return (
                      <div key={idx} className={`px-3 py-1.5 rounded-full border flex items-center gap-2 ${colors[source.platform] || 'bg-slate-50 border-slate-100'}`}>
                        <span className="text-[10px] font-bold">{source.platform}</span>
                        <div className="flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <span className="text-xs font-bold">{source.rating}</span>
                        </div>
                        <span className="text-[10px] opacity-60">({source.reviewCount})</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {property.reviews.map((review, i) => (
                <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-navy-900">{review.author}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">via {review.source}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`w-3.5 h-3.5 ${j < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 italic leading-relaxed">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </section>

          {/* About & Amenities */}
          <section className="space-y-8">
            <h2 className="font-display text-3xl font-bold text-navy-900">About this property</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed text-lg">
                Experience unparalleled luxury at {property.name}, located in the heart of {property.location}. 
                Our property is designed to provide a sanctuary of peace and comfort, featuring state-of-the-art 
                amenities and breathtaking views.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-4">
                <h4 className="font-bold text-navy-900 uppercase tracking-wider text-xs">Top Amenities</h4>
                <ul className="grid grid-cols-2 gap-3">
                  {['Free WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-teal-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-navy-900 uppercase tracking-wider text-xs">House Rules</h4>
                <ul className="space-y-3">
                  <li className="text-sm text-slate-600 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    Check-in: 3:00 PM
                  </li>
                  <li className="text-sm text-slate-600 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    Check-out: 11:00 AM
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Sticky Sidebar */}
        <div className="relative">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Best Deal</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-navy-900">{formatPrice(bestOffer.price)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-navy-900">{bestOffer.otaName}</div>
                  <div className="text-[10px] text-teal-600 font-bold uppercase">Verified Lowest</div>
                </div>
              </div>

              <div className="space-y-3">
                {bestOffer.conditions.map(c => (
                  <div key={c} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-teal-500" />
                    {c}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full py-4 bg-navy-900 text-white rounded-2xl font-display font-bold text-lg hover:bg-navy-800 transition-all shadow-lg shadow-navy-900/20"
              >
                Book on {bestOffer.otaName}
              </button>

              <div className="pt-6 border-t border-slate-100 space-y-4">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Other Options</h4>
                {otherOffers.slice(0, 3).map((offer, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-medium">{offer.otaName}</span>
                    <span className="font-bold text-navy-900">{formatPrice(offer.price)}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-teal-600 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                No hidden fees guarantee
              </div>
            </div>

            {/* AI Concierge Tip */}
            <div className="bg-navy-900 rounded-3xl p-6 text-white space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-500" />
                <span className="font-bold">AI Concierge Tip</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Prices for {property.location} are expected to rise by 15% in the next 48 hours. Booking now is recommended for best value.
              </p>
            </div>

            {/* Location Insights */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-4">
              <h3 className="font-bold text-navy-900 text-sm flex items-center gap-2">
                <MapIcon className="w-4 h-4 text-slate-400" />
                Location Insights
              </h3>
              <div className="h-32 bg-slate-200 rounded-2xl overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover opacity-60 grayscale" 
                  alt="Map Placeholder" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white px-3 py-1.5 rounded-full shadow-md text-[10px] font-bold text-navy-900">
                    Open Map
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">City Center</span>
                  <span className="text-navy-900 font-bold">1.2 km</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Public Transport</span>
                  <span className="text-navy-900 font-bold">200 m</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isBookingModalOpen && (
          <BookingModal 
            onClose={() => setIsBookingModalOpen(false)} 
            isLoggedIn={isLoggedIn}
            otaName={bestOffer.otaName}
            link={bestOffer.link}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const Settings = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-8 max-w-7xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-navy-900 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Search
      </button>

      <h1 className="font-display text-4xl font-bold text-navy-900 mb-8">Account Settings</h1>

      <div className="space-y-6">
        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          <h2 className="text-xl font-bold text-navy-900">Profile & Preferences</h2>
        </div>
        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          <h2 className="text-xl font-bold text-navy-900">Travel History</h2>
        </div>
        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          <h2 className="text-xl font-bold text-navy-900">Notifications</h2>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<'search' | 'shortlist' | 'detail' | 'settings'>('search');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to true based on user flow

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

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setScreen('search');
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-teal-100 selection:text-teal-900">
      <Navbar 
        onHome={handleHome} 
        currency={currency} 
        setCurrency={setCurrency} 
        isLoggedIn={isLoggedIn} 
        onSignOut={handleSignOut}
        onNavigateSettings={() => setScreen('settings')}
      />
      
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
              <SearchOrQuiz onSearch={handleSearch} currency={currency} isLoggedIn={isLoggedIn} />
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
              <Shortlist onSelect={handleSelectProperty} currency={currency} />
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
                currency={currency}
                isLoggedIn={isLoggedIn}
              />
            </motion.div>
          )}
          {screen === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Settings onBack={() => setScreen('search')} />
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
