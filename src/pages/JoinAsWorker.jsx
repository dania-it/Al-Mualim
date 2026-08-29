
import { Link } from "react-router-dom";
import imgHero from "../assets/Gemini_Generated_Image_cpavngcpavngcpav.jfif";
import Reveal from "../components/Reveal";
import FeatureCard from "../components/FeatureCard";

const STEPS = [
  {
    icon: "fa-solid fa-file-signature",
    title: "إنشاء حساب",
    desc: "املأ بياناتك الأساسية، تخصصك، مكان إقامتك، وقم برفع صورة هويتك.",
  },
  {
    icon: "fa-solid fa-images",
    title: "أضف معرض أعمالك",
    desc: "صور من عملك السابق تساعد الزبون بأخد قرار أسرع وتزيد ثقته بك.",
  },
  {
    icon: "fa-solid fa-clipboard-check",
    title: "مراجعة المنصة",
    desc: "فريقنا يراجع بياناتك وهويتك قبل تفعّيل حسابك — لضمان جودة وموثوقية كل فني على الممنصة.",
  },
  {
    icon: "fa-solid fa-briefcase",
    title: "ابدأ استقبال الطلبات",
    desc: "بمجرد التفعيل، تظهر في صفحة الخدمات وهنا الزبائن تعلم في وجودك وقد يتم التواصل معك  مباشرة.",
  },
];

const BENEFITS = [
  {
    icon: "fa-solid fa-users",
    title: "زبائن حقيقيون",
    desc: "وصول مباشر لزبائن يبحثون على فني بتخصصك، بلا وسيط ولا عمولة خفية.",
  },
  {
    icon: "fa-solid fa-star",
    title: "بناء سمعتك",
    desc: "كل تقييم موثق بيبني ملفك الشخصي وعندها تظهر بمرتبة أعلى بالبحث.",
  },
  {
    icon: "fa-solid fa-shield-halved",
    title: "حماية من نزاع الأجر",
    desc: "المنصة توثق تفاصيل كل طلب من البداية، حتى حقك محفوظ بالنزاعات.",
  },
  {
    icon: "fa-solid fa-hand-holding-heart",
    title: "مساهمة بإعادة الإعمار",
    desc: "عملك عبر المنصة جزء من جهد أكبر لإعادة إعمار وصيانة البيوت.",
  },
];

export default function JoinAsWorker() {
  return (
    <div
      className="min-h-screen bg-[var(--bg-main)] text-[var(--text-dark)] font-tajawal text-base"
      dir="rtl"
    >
      <main className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-8 pb-20">
        

        <Reveal>
          <section
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-8
              lg:gap-12
              items-center
              bg-[var(--card-bg)]
              border
              border-[var(--border-color)]
              rounded-[32px]
              p-6
              md:p-10
              mb-16
              shadow-[0_8px_25px_rgba(8,13,40,0.06)]
            "
          >
     
            <div className="text-center md:text-right order-1 md:order-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-dark)] leading-[1.35] mb-6">
                انضم إلينا <span className="text-[var(--primary)]">كفني معتمد</span>
              </h1>

              <p className="text-[var(--text-muted)] text-lg md:text-xl leading-[1.8] max-w-[600px] mx-auto md:mx-0 mb-8 font-medium">
                سجّل بياناتك، و المنصة توصلك بزبائن حقيقيين، واعمل وانت مرتاح
                البال — كل عمل متابَع من الطلب حتى التسليم.
              </p>

              <div className="flex justify-center md:justify-start">
                <Link
                  to="/login"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2.5
                    bg-[var(--accent-gold)]
                    text-[var(--primary)]
                    font-black
                    text-lg
                    px-9
                    py-4
                    rounded-xl
                    shadow-md
                    transition-all
                    duration-200
                    hover:-translate-y-1
                    hover:shadow-lg
                  "
                >
                  <i className="fa-solid fa-user-plus text-[var(--primary)] text-xl"></i>
                  سجّل كفني الآن
                </Link>
              </div>
            </div>


            <div className="order-2 md:order-1 flex items-center justify-center">
              <div
                className="
                  w-full
                  max-w-[520px]
                  h-[320px]
                  md:h-[380px]
                  rounded-[26px]
                  overflow-hidden
                  border-4
                  border-[var(--primary)]/10
                  shadow-[0_10px_25px_rgba(8,13,40,0.10)]
                  group
                "
              >
                <img
                  src={imgHero}
                  alt="فنيان يعملان معاً"
                  className="
                    w-full
                    h-full
                    object-cover
                    object-top
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        </Reveal>


        <section className="mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text-dark)] text-center mb-10">
              خطوات الانضمام
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
{STEPS.map((s, i) => (
  <Reveal key={s.title} delay={i * 100} className="h-full flex">
    <div
      className="
        w-full
        bg-white
        text-[var(--text-dark)]
        border
        border-[var(--border-color)]
        rounded-3xl
        p-6
        pt-9
        text-center
        relative
        flex
        flex-col
        items-center
        justify-between
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
        group
      "
    >

      <span
        className="
          absolute
          -top-4
          right-6
          w-9
          h-9
          bg-[#263174]
          text-white
          rounded-full
          flex
          items-center
          justify-center
          font-black
          text-base
          border-2
          border-white
          shadow-md
        "
      >
        {i + 1}
      </span>

    
      <div className="flex flex-col items-center w-full">
        <div className="w-16 h-16 rounded-2xl bg-[#263174]/10 flex items-center justify-center text-[#263174] text-3xl mb-4 mt-1 transition-transform duration-300 group-hover:scale-105">
          <i className={s.icon}></i>
        </div>

        <h3 className="text-lg md:text-xl font-black text-[#263174] mb-3">
          {s.title}
        </h3>
      </div>

      <p className="text-base leading-[1.8] text-[#080d28]/85 font-medium mt-auto">
        {s.desc}
      </p>
    </div>
  </Reveal>
))}
          </div>
        </section>

        <Reveal>
          <section className="bg-[#263174] border border-[var(--border-color)] rounded-[32px] p-7 md:p-12 mb-16">
            <div className="text-center max-w-[650px] mx-auto mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-white">
                لماذا تنضم لمنصتنا؟
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BENEFITS.map((b, i) => (
                <Reveal key={b.title} delay={i * 100} className="h-full">
                  <FeatureCard
                    icon={b.icon}
                    title={b.title}
                    desc={b.desc}
                  />
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="flex flex-col sm:flex-row gap-6 items-start bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[28px] p-8 md:p-10 mb-16 shadow-[0_8px_25px_rgba(8,13,40,0.04)]">
            <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center text-3xl shrink-0">
              <i className="fa-solid fa-magnifying-glass-chart"></i>
            </div>

            <div>
              <h2 className="text-2xl font-black text-[var(--primary)] mb-3">
                رقابة ومتابعة مستمرة لضمان أداء عالي
              </h2>

              <p className="text-base md:text-lg text-[var(--text-dark)] leading-[1.9] font-medium">
                المنصة بترسل معاينة عند بدء الشغل وعند تسليمه، وبتوثّق أي
                تأخير أو تقصير. الالتزام محسوب فعلياً — أي تأخير بيأثر على
                نسبة معينة من الدفعة، والتكرار (3 مرات) بيؤدي لفصل الفني من
                المنصة. هيك منحافظ على مستوى موحّد من الجودة لكل الأطراف.
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal delay={200}>
          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-3 bg-[var(--accent-gold)] text-[var(--primary)] font-black text-lg px-9 py-4 rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
        
                هل أنت مستعد؟ سجل حسابك الآن
            </Link>
          </div>
        </Reveal>
      </main>
    </div>
  );
}