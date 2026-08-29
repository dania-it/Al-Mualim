import Reveal from "../Reveal";

const STEPS = [
  {
    step: "01",
    title: "اختر الفني المناسب",
    desc: "تصفح التخصصات، اطلع على التقييمات الحقيقية والسعر، وأكّد الطلب بكل سهولة.",
    icon: "fa-solid fa-user-gear",
  },
  {
    step: "02",
    title: "متابعة وضمان العمل",
    desc: "نتابع معك خطوة بخطوة من بداية التنفيذ وحتى المعاينة والتسليم النهائي.",
    icon: "fa-solid fa-shield-halved",
  },
  {
    step: "03",
    title: "شاركنـا تقييمـك",
    desc: "تقييمك الموثق يبني سمعة الفني الحقيقية ويساعد باقي العملاء في الاختيار.",
    icon: "fa-solid fa-star",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="py-20 sm:py-24 bg-[var(--bg-main)] text-base font-tajawal relative"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal delay={100}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-dark)] leading-tight">
              كيف <span className="text-[var(--primary)]">تعمل المنصة؟</span>
            </h2>

            <p className="text-base sm:text-lg text-[var(--text-muted)] mt-3 font-medium">
              3 خطوات بسيطة تضمن لك تنفيذ عملك بأعلى جودة
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={200 + i * 150}>
              <div className="bg-[#263174] text-white rounded-[28px] p-8 sm:p-9 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col justify-between border border-white/10 group h-full">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 text-[var(--accent-gold)] flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 group-hover:bg-[var(--accent-gold)] group-hover:text-[#263174] transition-all duration-300">
                      <i className={s.icon}></i>
                    </div>
                    <span className="text-5xl font-black text-white/20 group-hover:text-[var(--accent-gold)] group-hover:scale-110 transition-all duration-300 select-none">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-4 tracking-wide group-hover:text-[var(--accent-gold)] transition-colors">
                    {s.title}
                  </h3>

                  <p className="text-base leading-[1.8] text-slate-200 font-medium">
                    {s.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
