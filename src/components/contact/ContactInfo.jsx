import Reveal from "../Reveal";

export const CONTACT_INFO = [
  {
    id: "email",
    title: "البريد الإلكتروني",
    value: "info@khadamati.com",
    href: "mailto:info@khadamati.com",
    icon: "fa-solid fa-envelope",
    dir: "ltr",
    delay: 100,
  },
  {
    id: "mobile",
    title: "الهاتف المحمول",
    value: "+963 33 444 852",
    href: "tel:+96333444852",
    icon: "fa-solid fa-mobile-screen-button",
    dir: "ltr",
    delay: 200,
  },
  {
    id: "landline",
    title: "الهاتف الأرضي",
    value: "011 222 3344",
    href: "tel:0112223344",
    icon: "fa-solid fa-phone-flip",
    dir: "ltr",
    delay: 250,
  },
  {
    id: "location",
    title: "الموقع",
    value: "سوريا - دمشق - ساحة الحجاز",
    href: "#",
    icon: "fa-solid fa-location-dot",
    dir: "rtl",
    delay: 300,
  },
];

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-5">
      {CONTACT_INFO.map((item) => (
        <Reveal key={item.id} delay={item.delay}>
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 flex items-center gap-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-[#263174]/30">
            <div className="w-14 h-14 rounded-2xl bg-[#263174]/10 text-[#263174] flex items-center justify-center text-2xl flex-shrink-0">
              <i className={item.icon}></i>
            </div>

            <div>
              <span className="block text-sm font-bold text-[var(--text-muted)] mb-1">
                {item.title}
              </span>

              <a
                href={item.href}
                className="text-lg font-black text-[var(--text-dark)] hover:text-[#263174] transition-colors"
                dir={item.dir}
              >
                {item.value}
              </a>
            </div>
          </div>
        </Reveal>
      ))}

      <Reveal delay={400}>
        <div className="rounded-3xl bg-[#263174] p-7 text-white shadow-md">
          <div className="flex items-center gap-3.5 mb-3">
            <i className="fa-solid fa-headset text-[#d97706] text-2xl"></i>
            <h3 className="font-black text-xl">نحن هنا لمساعدتك</h3>
          </div>

          <p className="text-white/80 text-base font-medium leading-[1.8]">
            أرسل لنا رسالتك وسنحاول الرد عليك في أسرع وقت ممكن.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
