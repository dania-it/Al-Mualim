
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from "..//components/contact/ContactInfo";

export default function Footer() {
  return (
    <footer 
      className="bg-gradient-to-br from-[#080d28] via-[var(--primary)] to-[#16214d] text-white/80 font-tajawal border-t border-[var(--border-color)]/20" 
      dir="rtl"
    >
  
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-right">
       
          <div className="sm:col-span-2 lg:col-span-2 flex flex-col items-start gap-2">
            <Link 
              to="/" 
              className="flex items-center -mt-3 md:-mt-4"
            >
              <img 
                src="/public/img/logo-gold.png" 
                alt="المعلم - Al-Mualim" 
                className="h-20 sm:h-24 md:h-26 w-auto object-contain" 
              />
            </Link>

            <p className="text-base sm:text-lg leading-relaxed text-white/75 font-medium max-w-lg">
              منصة موثوقة تربطك بأفضل الفنيين المعتمدين لإعادة إعمار وصيانة بيتك بضغطة زر وبجودة عالية.
            </p>

   
            <div className="flex items-center gap-3 mt-1">
              {[
                { icon: 'facebook-f', href: 'https://facebook.com' },
                { icon: 'instagram', href: 'https://instagram.com' },
                { icon: 'whatsapp', href: 'https://wa.me/963000000000' }, // اضبط رقمك مع الرمز الدولي
                { icon: 'x-twitter', href: 'https://x.com' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/80 flex items-center justify-center text-lg hover:bg-[var(--accent-gold)] hover:text-[var(--text-dark)] hover:border-[var(--accent-gold)] hover:-translate-y-1 transition-all duration-200"
                  aria-label={social.icon}
                >
                  <i className={`fa-brands fa-${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

       
          <div className="flex flex-col items-start gap-3">
            <h4 className="text-[var(--accent-gold)] text-lg sm:text-xl font-bold tracking-tight mb-1">
              روابط سريعة
            </h4>
            
            <Link to="/" className="text-base font-medium text-white/75 hover:text-[var(--accent-gold)] transition-colors duration-200">
              الرئيسية
            </Link>

            <Link to="/jobs" className="text-base font-medium text-white/75 hover:text-[var(--accent-gold)] transition-colors duration-200">
               الخدمات
            </Link>

            <Link to="/about" className="text-base font-medium text-white/75 hover:text-[var(--accent-gold)] transition-colors duration-200">
              من نحن
            </Link>

            <Link to="/contact" className="text-base font-medium text-white/75 hover:text-[var(--accent-gold)] transition-colors duration-200">
              تواصل معنا
            </Link>

            <Link to="/join-as-worker" className="text-base font-medium text-white/75 hover:text-[var(--accent-gold)] transition-colors duration-200">
              انضم إلينا 
            </Link>
          </div>

<div className="flex flex-col items-start gap-3.5">
  <h4 className="text-accent-gold text-lg sm:text-xl font-bold tracking-tight mb-1">
    تواصل معنا
  </h4>

  {CONTACT_INFO.map((item) => (
    <a
      key={item.id}
      href={item.href}
      className="text-base font-medium text-white/75 hover:text-white transition-colors duration-200 flex items-center justify-start gap-3"
    >
      <i className={`${item.icon} text-accent-gold text-lg shrink-0`}></i>
      <span dir={item.dir}>{item.value}</span>
    </a>
  ))}
</div>

        </div>

        <div className="mt-10 pt-5 border-t border-white/10 text-right sm:text-center text-sm font-medium text-white/60">
          جميع الحقوق محفوظة ©  
          <span className="font-bold text-white">المعلم</span> لإعادة الإعمار والصيانة
        </div>
      </div>
    </footer>
  );
}