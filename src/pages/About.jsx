import { useState, useEffect } from "react";
import { getSiteMeta } from "../api/index";
import Reveal from "../components/Reveal";
import FeatureCard from "../components/FeatureCard";

import aboutHeroImage from "../assets/Customer_service_agent_working_c…_202608132315.jpg";

const VALUES = [
  {
    icon: "fa-solid fa-shield-halved",
    title: "فنيين موثقين",
    desc: "كل فني يعمل عبر المنصة يتم التحقق من هويته وبياناته قبل القبول.",
  },
  {
    icon: "fa-solid fa-hand-holding-heart",
    title: "دعم إعادة الإعمار",
    desc: "نسعى لربط الزبائن بفنيين موثوقين وفتح فرص عمل حقيقية.",
  },
  {
    icon: "fa-solid fa-magnifying-glass-chart",
    title: "رقابة مستمرة",
    desc: "نتابع سير الأعمال ونحرص على جودة الخدمة من بداية الطلب حتى التسليم.",
  },
];

export default function About() {
  const [siteMeta, setSiteMeta] = useState({ features: [] });

  useEffect(() => {
    getSiteMeta()
      .then(setSiteMeta)
      .catch(() => {});
  }, []);

  const apiFeatures = (siteMeta.features || []).filter((apiFeat) => {
    const cleanApiTitle = apiFeat.title ? apiFeat.title.trim() : "";
    return cleanApiTitle !== "فنيون موثقون";
  });

  const allFeatures = [...VALUES, ...apiFeatures];

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-dark)] font-tajawal" dir="rtl">
      <main className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-8 pb-20">
        
        <Reveal>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[32px] p-6 md:p-8 lg:p-10 mb-16 shadow-[0_8px_25px_rgba(8,13,40,0.06)]">
            <div className="text-center md:text-right order-1 md:order-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-dark)] leading-[1.35] mb-5">
                منصة تجمعك <span className="text-[var(--primary)]">بالفني المناسب</span>
              </h1>
              <p className="text-[var(--text-muted)] text-base md:text-lg leading-[1.9] max-w-[600px] mx-auto md:mx-0">
                منصة المعلم تربط  الزبائن بأفضل الفنيين المعتمدين، وتعمل على مساعدتك حتى تجد الشخص المناسب لخدمتك بسهولة وثقة، مع المتابعة بأفضل طريقة .
              </p>
            </div>

            <div className="order-2 md:order-1 flex items-center justify-center">
              <div className="w-full max-w-[520px] rounded-[26px] overflow-hidden border-4 border-[var(--primary)]/10 shadow-[0_10px_25px_rgba(8,13,40,0.10)] group">
                <img
                  src={aboutHeroImage}
                  alt="منصة المعلم"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                  fetchpriority="high"
                />
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="bg-[var(--primary)] border border-[var(--border-color)] rounded-[32px] p-7 md:p-10 mb-16">
            <div className="text-center max-w-[650px] mx-auto mb-10">


              <h2 className="text-2xl md:text-3xl font-black text-white mt-4">
                لماذا تختار منصة المعلم؟
              </h2>

              <p className="text-sm md:text-base text-white/80 mt-3 leading-relaxed">
                لأننا نجمع بين سهولة الوصول للفني المناسب، التوثيق، والمتابعة لضمان تجربة أفضل.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-5">
              {allFeatures.map((feature, index) => (
                <div
                  key={`${feature.title}-${index}`}
                  className="w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] max-w-[380px] flex-grow-0"
                >
                  <Reveal delay={index * 100}>
                    <FeatureCard
                      icon={feature.icon}
                      title={feature.title}
                      desc={feature.desc}
                    />
                  </Reveal>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
        <Reveal>
          <section className="text-center bg-[var(--card-bg)] rounded-[28px] p-8 md:p-10 border border-[var(--border-color)]">
            <h2 className="text-xl md:text-2xl font-black mb-3 text-[var(--primary)]">
              المعلم... أسهل، أوثق، وأقرب لك
            </h2>
            <p className="text-sm md:text-base text-[var(--text-dark)] max-w-[600px] mx-auto leading-[1.9]">
              هدفنا نبني منصة موثوقة تجمع الزبائن بالفنيين المناسبين وتسهّل عملية الحصول على الخدمة من البداية حتى النهاية.
            </p>
          </section>
        </Reveal>

      </main>
    </div>
  );
}