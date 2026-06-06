import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const FAQ = [
  {
    keywords: ['more question', 'discord', 'contact', 'ask', 'help'],
    answer: "Join our recruitment Discord server to get answers directly from our members and leads. You can also attend our info sessions and events to chat with us in person!",
  },
  {
    keywords: ['advanced class', 'micro class', 'difficult', 'harder', 'difference between class', 'class difference'],
    answer: "\"Micro Class\" and \"Advanced Class\" are just names — they don't indicate difficulty or target seniority. They simply have different competition missions and rules.",
  },
  {
    keywords: ['apply sooner', 'apply later', 'rolling', 'deadline', 'when to apply', 'earlier'],
    answer: "Offers are released on a rolling basis, so the sooner you apply the better your chances of receiving an offer. Don't wait until the last minute!",
  },
  {
    keywords: ['first year', 'freshman', 'new student', 'first-year', '1st year'],
    answer: "Yes! We actively hope to recruit first years every season. We know first years may have less technical experience than upper years — that's completely okay and expected.",
  },
  {
    keywords: ['aerospace', 'enthusiast', 'passion', 'interest', 'aircraft lover', 'aviation'],
    answer: "A passion for aerospace is not mandatory! Some members joined for the engineering experience, others for their love of aviation. All backgrounds are welcome.",
  },
  {
    keywords: ['join', 'apply', 'application', 'recruit', 'how to join', 'sign up'],
    answer: "Recruitment opens in August each year. Keep an eye on our Discord and social media for announcements. You can also check out the Team page for more info on subteams and roles.",
  },
  {
    keywords: ['subteam', 'sub-team', 'team structure', 'division', 'aerodynamics', 'structures', 'avionics', 'software', 'propulsion', 'manufacturing'],
    answer: "We have 3 aircraft divisions and 7 technical subteams: Aerodynamics, Structures, Propulsion, Avionics, Software, Manufacturing, and Systems. We also have 7 admin subteams including Marketing, Finance, and Sponsorship.",
  },
  {
    keywords: ['competition', 'sae', 'aero design', 'event', 'where', 'contest'],
    answer: "We compete annually at the SAE Aero Design competition, where university teams worldwide design aircraft capable of handling flight, payload, propulsion, and autonomy challenges.",
  },
  {
    keywords: ['sponsor', 'donate', 'fund', 'support', 'money'],
    answer: "We're always looking for sponsors! Reach out to us at sponsor@ubcaerodesign.com or visit our Sponsor page for more details on partnership opportunities.",
  },
  {
    keywords: ['hello', 'hi', 'hey', 'what can you do', 'help me'],
    answer: "Hi there! 👋 I'm the AeroDesign assistant. I can answer questions about joining the team, our structure, competition, and more. What would you like to know?",
  },
];

const FALLBACK = "I'm not sure about that one yet! For more specific questions, join our Discord or reach out to us at captain@ubcaerodesign.com.";
const GREETING = "Hi! I'm the UBC AeroDesign assistant. Ask me anything about joining the team, our structure, or our competition!";

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const faq of FAQ) {
    if (faq.keywords.some(kw => lower.includes(kw))) {
      return faq.answer;
    }
  }
  return FALLBACK;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: GREETING },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { role: 'bot', text: getBotResponse(text) }]);
    }, 700);
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-aero-yellow shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06121f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#06121f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col transition-all duration-300 origin-bottom-right ${
          open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ height: '420px', background: '#0b1f33' }}
      >
        {/* Header */}
        <div className="px-4 py-3 bg-aero-navy border-b border-white/10 flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-aero-yellow flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06121f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div>
            <p className="font-poppins font-semibold text-white text-sm leading-tight">AeroDesign Assistant</p>
            <p className="font-urbanist text-white/40 text-xs">Ask me anything</p>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full bg-green-400" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] px-3 py-2 rounded-xl font-urbanist text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-aero-yellow text-aero-navy font-medium rounded-br-sm'
                    : 'bg-white/8 text-white/80 rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="bg-white/8 px-4 py-3 rounded-xl rounded-bl-sm flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-3 border-t border-white/10 flex gap-2 shrink-0 bg-aero-navy">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask a question..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 font-urbanist text-sm text-white placeholder-white/30 focus:outline-none focus:border-aero-yellow/50 transition-colors"
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="w-9 h-9 rounded-lg bg-aero-yellow flex items-center justify-center hover:bg-white transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06121f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
