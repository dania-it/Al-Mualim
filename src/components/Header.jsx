
export default function Header({ title, subtitle, logo }) {
  return (
    <header 
      className="bg-gradient-to-br from-[var(--text-dark)] via-[var(--primary)] to-[var(--primary-hover)] text-white py-12 sm:py-16 md:py-20 px-6 text-center mb-10 rounded-3xl shadow-xl border border-[var(--border-color)]/20 font-tajawal"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
        
        {logo && (
          <img 
            src={logo} 
            alt="Logo" 
            className="h-16 sm:h-20 w-auto object-contain mb-2 drop-shadow-md" 
          />
        )}

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            {subtitle}
          </p>
        )}

      </div>
    </header>
  );
}