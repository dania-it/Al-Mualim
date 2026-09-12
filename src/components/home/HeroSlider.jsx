import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import imgSlide1 from "../../assets/Gemini_Generated_Image_sn5xr8sn5xr8sn5x.jfif";
import imgSlide2 from "../../assets/Gemini_Generated_Image_8how128how128how.jfif";
import imgSlide3 from "../../assets/Gemini_Generated_Image_sn5xr8sn5xr8sn5x (2).jfif";

const SLIDES = [
  {
    title: "ابحث عن الفني",
    highlight: "المثالي لك",
    subtitle:
      "الفنيين المعتمدين في مجالات الكهرباء والطيان والدهان والنجار وأكثر — جاهزون لخدمتك",
    image: imgSlide1,
  },
  {
    title: "المنصة تتابع",
    highlight: "عملك من الألف للياء",
    subtitle:
      "معاينة عند البدء والتسليم، وتقييم موثّق بعد كل عمل — رقابة فعلية مش وعود بس",
    image: imgSlide2,
  },
  {
    title: "لديك مهنة؟",
    highlight: "انضم كفني معتمد",
    subtitle:
      "وصول مباشر لزبائن حقيقيين، وبناء سمعتك عبر تقييمات موثقة من كل عمل",
    image: imgSlide3,
    cta: {
      to: "/join-as-worker",
      label: "سجّل كفني الآن",
    },
  },
];

const AUTO_INTERVAL = 5000;

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setActive((current) => (current + 1) % SLIDES.length);
    }, AUTO_INTERVAL);
  };

  useEffect(() => {
    startTimer();

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const slide = SLIDES[active];

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#080d28]
        font-tajawal

        h-[600px]
        sm:h-[680px]
        md:h-[740px]
        lg:h-[770px]
      "
      onMouseEnter={() => clearInterval(timerRef.current)}
      onMouseLeave={startTimer}
      dir="rtl"
    >
      <div className="absolute inset-0">
        {SLIDES.map((s, index) => (
          <div
            key={index}
            className={`
              absolute
              inset-0
              bg-cover
              bg-center
              transition-all
              duration-1000
              ease-in-out

              ${
                index === active
                  ? "opacity-100 scale-105"
                  : "opacity-0 scale-100"
              }
            `}
            style={{
              backgroundImage: `url("${s.image}")`,
            }}
          />
        ))}

        <div
          className="
            absolute
            inset-0
            bg-black/20
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-l
            from-[#080d28]/80
            via-[#080d28]/35
            to-transparent
          "
        />
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-40
            bg-gradient-to-t
            from-[#080d28]/35
            to-transparent
          "
        />
      </div>

      <div
        className="
          relative
          z-20
          h-full
          max-w-7xl
          mx-auto
          px-6
          sm:px-10
          lg:px-16

          flex
          items-center

          justify-start
        "
      >
        <div
          className="
            w-full
            max-w-xl

            text-right

            flex
            flex-col
            items-start

            pt-4
            sm:pt-0

            lg:mr-4
          "
        >
          <h1
            className="
              text-[32px]
              sm:text-4xl
              md:text-5xl
              lg:text-[58px]

              leading-[1.2]

              font-black
              text-white

              tracking-tight

              drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]
            "
          >
            {slide.title}

            <span
              className="
                block
                mt-2

                text-[#ffb53e]

                drop-shadow-[0_3px_10px_rgba(0,0,0,0.45)]
              "
            >
              {slide.highlight}
            </span>
          </h1>

          <p
            className="
              mt-6

              max-w-lg

              text-sm
              sm:text-base
              md:text-lg

              text-white/90

              font-medium

              leading-[1.9]

              drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]
            "
          >
            {slide.subtitle}
          </p>

          {slide.cta && (
            <Link
              to={slide.cta.to}
              className="
                mt-8

                inline-flex
                items-center
                justify-center
                gap-2

                bg-[#ffb53e]
                text-[#263174]

                font-black

                text-sm
                sm:text-base

                px-7
                sm:px-9

                py-3
                sm:py-3.5

                rounded-xl

                shadow-[0_10px_30px_rgba(0,0,0,0.25)]

                hover:bg-white
                hover:-translate-y-1

                transition-all
                duration-300
              "
            >
              <i className="fa-solid fa-helmet-safety text-base sm:text-lg"></i>

              <span>{slide.cta.label}</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
