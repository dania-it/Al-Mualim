import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Reveal from '../Reveal';

const FAQS = [
  {
    q: 'كيف تضمن المنصة عدم تعرضي للظلم من قبل الفني؟',
    a: 'يتم تسجيل كل طلب رسمياً عبر المنصة بدءاً من لحظة "تأكيد التعامل"، ونرسل فريق معاينة عند بداية العمل وعند التسليم. أي تأخير يُسجل رسمياً ويؤثر مباشرة على مستحقات الفني.',
  },
  {
    q: 'ماذا يحدث في حال تأخر الفني عن تسليم العمل؟',
    a: 'كل تأخير مسجل يتسبب في خصم نسبة محددة من دفعة الفني، وتكرار التأخير لثلاث مرات يؤدي إلى حظر حسابه وفصله من المنصة نهائياً لضمان الالتزام الكامل.',
  },
  {
    q: 'هل التقييمات المعروضة موثوقة وحقيقية',
    a: 'نحن لا نسمح بتقييمات النجوم المجردة، حيث إن كل تقييم ظاهر مدعوم بتجربة حقيقية وموثقة من قبل العملاء.',
  },
  {
    q: 'كيف يتم التحقق من هوية الفنيين؟',
    a: 'يلتزم كل فني برفع صورة عن هويته الشخصية الرسمية عند التسجيل، ويبقى حسابه قيد المراجعة حتى يكتمل التدقيق من قبل فريقنا قبل ظهوره للعملاء.',
  },
  {
    q: 'هل السعر الظاهر على المنصة نهائي؟',
    a: 'السعر المعروض هو سعر تقريبي ويختلف بحسب حجم العمل والتفاصيل الفعلية للمشروع. تقوم المنصة بمتابعة الاتفاق النهائي بين الطرفين حتى إتمام التسليم.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(1);
  const navigate = useNavigate();

  const handleContactClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/contact');
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 font-tajawal relative overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* هيدر القسم */}
        <Reveal delay={100}>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#080d28] leading-tight">
              لديك استفسار؟ <span className="text-[#263174]">انظر هنا.</span>
            </h2>
            <p className="text-xs sm:text-base text-slate-500 font-medium mt-2.5">
              إجابات سريعة وشفافة على أبرز الاستفسارات المتعلقة بالمنصة ولضمان حقوقك
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          <div className="lg:col-span-1 h-full">
            <Reveal delay={200 + FAQS.length * 80}>
              <div className="bg-[#263174] text-white rounded-2xl p-8 sm:p-10 text-center flex flex-col items-center justify-between h-full min-h-[320px] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />

                <div className="w-16 h-16 rounded-2xl bg-[#ffb53e]/15 border border-[#ffb53e]/30 flex items-center justify-center text-[#ffb53e] text-2xl mb-6 shadow-inner relative z-10">
                  <i className="fa-solid fa-comments" />
                </div>

                <h3 className="text-xl sm:text-2xl font-black mb-3 text-white relative z-10">
                  لديك أسئلة أخرى؟
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium w-full text-right mb-4">
                  فريق الدعم الفني جاهز للرد على جميع استفساراتك على مدار الساعة، ومساعدتك في اختيار الفني المناسب أو متابعة طلباتك الحالية فوراً.
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal w-full text-right mb-6">
                  سواء كنت ترغب في الحصول على استشارة مجانية، أو الاستفسار عن ضمان الأعمال، أو تحتاج إلى مساعدة للتوصل إلى اتفاق مناسب، نحن هنا لضمان تجربتك وسير العمل بكل سلاسة. لا تتردد في التواصل معنا عبر وسائل التواصل الاجتماعي أو البريد الإلكتروني أو الهاتف.
                </p>

                <button
                  type="button"
                  onClick={handleContactClick}
                  className="relative z-10 w-full bg-[var(--accent-gold)] hover:bg-[var(--accent-gold)]-400 text-[#080d28] font-black text-sm py-3.5 px-6 rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-98 cursor-pointer"
                >
                  تواصل معنا الآن
                </button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3.5 w-full">
            {FAQS.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <Reveal key={item.q} delay={150 + i * 80}>
                  <div
                    className={`rounded-2xl border transition-all duration-300 ease-in-out ${
                      isOpen
                        ? 'bg-[#263174] text-white border-[#263174] shadow-md'
                        : 'bg-white text-[#080d28] border-slate-200/80 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-4.5 text-right focus:outline-none cursor-pointer"
                    >
                      <h3 className={`text-sm sm:text-base font-bold transition-colors duration-200 ${isOpen ? 'text-white' : 'text-[#080d28]'}`}>
                        {item.q}
                      </h3>
                      
                      <span className={`text-lg font-black transition-transform duration-300 ${isOpen ? 'text-[#ffb53e] rotate-180' : 'text-slate-400'}`}>
                        {isOpen ? '—' : '+'}
                      </span>
                    </button>
                    
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className={`px-6 pb-5 text-xs sm:text-sm leading-relaxed ${isOpen ? 'text-slate-200 border-t border-white/10 pt-3.5' : 'text-slate-500'}`}>
                          {item.a}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}