import Reveal from "../components/Reveal";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";

export default function Contact() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[var(--bg-main)] text-[var(--text-dark)] font-tajawal"
    >
      <main className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-20">
      
        <Reveal>
          <section className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-black text-[#263174] mb-4">
              تواصل معنا
            </h1>

            <p className="text-[var(--text-muted)] text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
              عندك سؤال، اقتراح، أو مشكلة تقنية؟
              <br className="hidden sm:block" />
              فريقنا جاهز يساعدك.
            </p>
          </section>
        </Reveal>

        <section className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr] gap-8 items-start">
          <ContactInfo />

          <Reveal delay={250}>
            <ContactForm />
          </Reveal>
        </section>
      </main>
    </div>
  );
}