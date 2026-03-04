import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Facebook, ArrowRight, Mic, Radio, Users, Star, Calendar, FileText } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MagneticButton = ({ children, className = '', onClick, href }: { children: React.ReactNode, className?: string, onClick?: () => void, href?: string }) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    if (!button || !text) return;

    const onMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * 0.3;
      const y = (e.clientY - top - height / 2) * 0.3;

      gsap.to(button, { x, y, duration: 0.5, ease: 'power3.out' });
      gsap.to(text, { x: x * 0.5, y: y * 0.5, duration: 0.5, ease: 'power3.out' });
    };

    const onMouseLeave = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      gsap.to(text, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    };

    button.addEventListener('mousemove', onMouseMove);
    button.addEventListener('mouseleave', onMouseLeave);

    return () => {
      button.removeEventListener('mousemove', onMouseMove);
      button.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const content = (
    <div ref={buttonRef} className={`relative inline-flex items-center justify-center cursor-pointer interactive ${className}`} onClick={onClick}>
      <div ref={textRef} className="relative z-10 flex items-center gap-2">
        {children}
      </div>
    </div>
  );

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">{content}</a>;
  }

  return content;
};

const TiltCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      gsap.to(card, {
        rotateY: x * 10,
        rotateX: -y * 10,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    };

    const onMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);

    return () => {
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Text Animation
    const chars = document.querySelectorAll('.hero-char');
    gsap.from(chars, {
      y: 50,
      opacity: 0,
      stagger: 0.05,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.2
    });

    // Fade in sections
    gsap.utils.toArray('.fade-up').forEach((el: any) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Floating abstract shapes
    gsap.to('.floating-shape-1', {
      y: -30,
      x: 20,
      rotation: 10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    gsap.to('.floating-shape-2', {
      y: 40,
      x: -30,
      rotation: -15,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1
    });

    // Parallax Images
    gsap.utils.toArray('.parallax-img').forEach((img: any) => {
      gsap.to(img, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      
      {/* Soft Glows Background */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-rose-100/50 blur-[100px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-100/50 blur-[120px] pointer-events-none z-0"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center p-6 md:px-12 bg-slate-50/50 backdrop-blur-md border-b border-slate-200/50">
        <div className="text-sm font-serif font-medium tracking-widest uppercase text-slate-800">I'm Meg</div>
        <MagneticButton href="https://www.instagram.com/dj_meg_/" className="text-sm font-mono tracking-widest uppercase text-slate-600 hover:text-rose-600 transition-colors">
          IG <ArrowRight className="w-4 h-4" />
        </MagneticButton>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col lg:flex-row justify-center items-center px-6 md:px-12 pt-24 pb-12 z-10 max-w-7xl mx-auto">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-20 pt-10 lg:pt-0">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-slate-200 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-xs font-mono tracking-widest uppercase text-slate-600">Available for Booking</span>
          </div>
          
          <h1 className="text-[15vw] lg:text-[7vw] leading-[0.9] font-serif font-medium tracking-tighter mb-6 text-slate-900 flex flex-wrap">
            {'I\'M MEG'.split('').map((char, i) => (
              <span key={i} className="hero-char inline-block">{char === ' ' ? '\u00A0' : char}</span>
            ))}
          </h1>
          
          <p className="text-xl md:text-2xl font-serif text-slate-600 max-w-md text-balance mb-10 fade-up">
            梅格-金鐘級主持發聲人
          </p>

          <div className="flex flex-col sm:flex-row gap-4 fade-up w-full sm:w-auto flex-wrap">
            <MagneticButton 
              href="mailto:megwang4422@gmail.com"
              className="px-8 py-4 bg-rose-600 text-white rounded-full font-medium tracking-wide shadow-lg shadow-rose-600/20 hover:bg-rose-700 hover:shadow-rose-600/40 transition-all"
            >
              立即預約 <ArrowRight className="w-5 h-5" />
            </MagneticButton>
            <MagneticButton 
              href="https://drive.google.com/file/d/1L34H6duFqHimXu7xQhqnRMHX395LETKP/view?usp=sharing"
              className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-medium tracking-wide shadow-sm hover:bg-slate-50 transition-colors"
            >
              個人簡歷 <FileText className="w-5 h-5" />
            </MagneticButton>
            <MagneticButton 
              href="https://www.instagram.com/dj_meg_/"
              className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-medium tracking-wide shadow-sm hover:bg-slate-50 transition-colors"
            >
              追蹤 IG <Instagram className="w-5 h-5" />
            </MagneticButton>
            <MagneticButton 
              href="https://www.facebook.com/share/1KLAvTrG3Q/?mibextid=wwXIfr"
              className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-medium tracking-wide shadow-sm hover:bg-slate-50 transition-colors"
            >
              追蹤 FB <Facebook className="w-5 h-5" />
            </MagneticButton>
          </div>
        </div>

        {/* Image & Abstract Shapes */}
        <div className="w-full lg:w-1/2 relative h-[60vh] lg:h-[80vh] mt-12 lg:mt-0 flex justify-center items-center">
          {/* Abstract Floating Shapes */}
          <div className="absolute top-[10%] right-[10%] w-32 h-32 rounded-full bg-gradient-to-br from-rose-200 to-orange-100 blur-2xl opacity-60 floating-shape-1"></div>
          <div className="absolute bottom-[20%] left-[10%] w-48 h-48 rounded-full bg-gradient-to-tr from-blue-200 to-indigo-100 blur-3xl opacity-60 floating-shape-2"></div>
          
          {/* Full-bleed Image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src="/hero-image.jpg" 
              alt="Meg Host" 
              className="w-full h-full object-contain parallax-img"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

      </section>

      {/* Value Proposition Section */}
      <section className="py-32 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 fade-up">
            <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-6 text-slate-900 max-w-[80%] md:max-w-full mx-auto">
              聲入人心，<br className="md:hidden" /><span className="text-rose-600 italic">金鐘底蘊。</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-[75%] md:max-w-2xl mx-auto">
              從電台廣播到萬人現場，<br className="md:hidden" />
              成就一場完美的感官盛宴。<br className="md:hidden" />
              以專業的聲音與控場能力，<br className="md:hidden" />
              為每一個重要時刻注入靈魂。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value Cards */}
            <TiltCard className="fade-up">
              <div className="h-full p-10 rounded-[2rem] glass-card soft-shadow relative overflow-hidden group bg-white/60 hover:bg-white/80 transition-colors duration-500">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Radio className="w-7 h-7 text-rose-600" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-4 text-slate-900">廣播金鐘入圍</h3>
                <p className="text-slate-500 text-sm leading-relaxed">近10年廣播音樂節目主持經驗，曾任 KISS RADIO 節目部經理與 DJ，深厚的聲音底蘊。</p>
                <div className="absolute top-8 right-8 text-sm font-mono text-slate-300 font-light">01</div>
              </div>
            </TiltCard>

            <TiltCard className="fade-up" style={{ transitionDelay: '100ms' }}>
              <div className="h-full p-10 rounded-[2rem] glass-card soft-shadow relative overflow-hidden group bg-white/60 hover:bg-white/80 transition-colors duration-500">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Users className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-4 text-slate-900">萬人現場控場</h3>
                <p className="text-slate-500 text-sm leading-relaxed">從品牌記者會、大型演唱會到萬人家庭日，精準掌控現場氣氛，完美呈現品牌價值。</p>
                <div className="absolute top-8 right-8 text-sm font-mono text-slate-300 font-light">02</div>
              </div>
            </TiltCard>

            <TiltCard className="fade-up" style={{ transitionDelay: '200ms' }}>
              <div className="h-full p-10 rounded-[2rem] glass-card soft-shadow relative overflow-hidden group bg-white/60 hover:bg-white/80 transition-colors duration-500">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Star className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-4 text-slate-900">全方位主持專業</h3>
                <p className="text-slate-500 text-sm leading-relaxed">歌手簽唱會、品牌新車發表、政府大型活動、國際論壇（中英雙語），以及超過百場的高端婚禮主持經驗。</p>
                <div className="absolute top-8 right-8 text-sm font-mono text-slate-300 font-light">03</div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Experience Gallery */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 fade-up flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif mb-4 text-slate-900">現場魅力</h2>
            <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Live Experience</p>
          </div>
          <MagneticButton className="text-rose-600 font-medium text-sm flex items-center gap-2 hover:text-rose-700">
            查看更多經歷 <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12 max-w-7xl mx-auto">
          {/* Item 1 */}
          <TiltCard className="h-[40vh] fade-up">
            <div className="w-full h-full rounded-[2rem] overflow-hidden relative soft-shadow group">
              <img 
                src="/體驗-1：大型演唱會 & 跨年晚會 .png" 
                alt="Live Concert" 
                className="w-full h-full object-cover parallax-img scale-110 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-xl font-serif mb-1 text-white">大型演唱會 & 跨年晚會</h3>
                <p className="text-slate-200 text-sm">華友聯萬人音浪演唱會</p>
              </div>
            </div>
          </TiltCard>

          {/* Item 2 */}
          <TiltCard className="h-[40vh] fade-up" style={{ transitionDelay: '100ms' }}>
            <div className="w-full h-full rounded-[2rem] overflow-hidden relative soft-shadow group">
              <img 
                src="/體驗-2：廣播節目主持 : KISS RADIO .png" 
                alt="Radio Host" 
                className="w-full h-full object-cover parallax-img scale-110 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-xl font-serif mb-1 text-white">廣播節目主持</h3>
                <p className="text-slate-200 text-sm">KISS RADIO 音樂風</p>
              </div>
            </div>
          </TiltCard>

          {/* Item 3 */}
          <TiltCard className="h-[40vh] fade-up" style={{ transitionDelay: '200ms' }}>
            <div className="w-full h-full rounded-[2rem] overflow-hidden relative soft-shadow group">
              <img 
                src="/體驗-3：品牌發表會 : 科技大廠旺年會.png" 
                alt="Brand Event" 
                className="w-full h-full object-cover parallax-img scale-110 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-xl font-serif mb-1 text-white">品牌發表會</h3>
                <p className="text-slate-200 text-sm">科技大廠旺年會</p>
              </div>
            </div>
          </TiltCard>

          {/* Item 4 */}
          <TiltCard className="h-[40vh] fade-up">
            <div className="w-full h-full rounded-[2rem] overflow-hidden relative soft-shadow group">
              <img 
                src="/體驗-4：政府大型活動 : 全國地政盃.png" 
                alt="Government Event" 
                className="w-full h-full object-cover parallax-img scale-110 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-xl font-serif mb-1 text-white">政府大型活動</h3>
                <p className="text-slate-200 text-sm">全國地政盃</p>
              </div>
            </div>
          </TiltCard>

          {/* Item 5 */}
          <TiltCard className="h-[40vh] fade-up" style={{ transitionDelay: '100ms' }}>
            <div className="w-full h-full rounded-[2rem] overflow-hidden relative soft-shadow group">
              <img 
                src="/體驗-5：國際研討會 : 中英雙語主持.png" 
                alt="International Forum" 
                className="w-full h-full object-cover parallax-img scale-110 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-xl font-serif mb-1 text-white">國際研討會</h3>
                <p className="text-slate-200 text-sm">中英雙語主持</p>
              </div>
            </div>
          </TiltCard>

          {/* Item 6 */}
          <TiltCard className="h-[40vh] fade-up" style={{ transitionDelay: '200ms' }}>
            <div className="w-full h-full rounded-[2rem] overflow-hidden relative soft-shadow group">
              <img 
                src="/體驗-6：歌手簽唱會 : 百場以上活動經驗.png" 
                alt="Singer Event" 
                className="w-full h-full object-cover parallax-img scale-110 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-xl font-serif mb-1 text-white">歌手簽唱會</h3>
                <p className="text-slate-200 text-sm">百場以上活動經驗</p>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-white soft-shadow p-12 md:p-24 text-center relative overflow-hidden fade-up border border-slate-100">
          {/* Decorative background blur */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-rose-50/50 to-transparent pointer-events-none"></div>
          
          <h2 className="text-4xl md:text-6xl font-serif mb-8 tracking-tight text-slate-900 relative z-10">
            成就一場完美的<br/><span className="italic text-rose-600">感官盛宴</span>
          </h2>
          
          <p className="text-lg text-slate-500 mb-12 max-w-xl mx-auto relative z-10">
            無論是品牌發表、萬人演唱會或是高端婚禮，讓專業的聲音為您的活動注入靈魂。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10 flex-wrap">
            <MagneticButton 
              href="mailto:megwang4422@gmail.com"
              className="px-10 py-5 bg-slate-900 text-white rounded-full font-medium tracking-wide shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-colors w-full sm:w-auto"
            >
              立即預約 <Calendar className="w-5 h-5" />
            </MagneticButton>
            <MagneticButton 
              href="https://www.instagram.com/dj_meg_/"
              className="px-10 py-5 bg-white border border-slate-200 text-slate-700 rounded-full font-medium tracking-wide shadow-sm hover:bg-slate-50 transition-colors w-full sm:w-auto"
            >
              追蹤 IG <Instagram className="w-5 h-5" />
            </MagneticButton>
            <MagneticButton 
              href="https://www.facebook.com/share/1KLAvTrG3Q/?mibextid=wwXIfr"
              className="px-10 py-5 bg-white border border-slate-200 text-slate-700 rounded-full font-medium tracking-wide shadow-sm hover:bg-slate-50 transition-colors w-full sm:w-auto"
            >
              追蹤 FB <Facebook className="w-5 h-5" />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono text-slate-500 uppercase tracking-widest relative z-10 max-w-7xl mx-auto">
        <div>© {new Date().getFullYear()} I'm Meg. All rights reserved.</div>
        <div className="flex gap-8">
          <a href="https://www.facebook.com/share/1KLAvTrG3Q/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-rose-600 transition-colors interactive">Facebook</a>
          <a href="https://podcasts.apple.com/tw/podcast/梅格的地下電台/id1615219484" target="_blank" rel="noopener noreferrer" className="hover:text-rose-600 transition-colors interactive">Podcast</a>
        </div>
      </footer>
    </div>
  );
}
