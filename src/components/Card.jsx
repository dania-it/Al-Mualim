import { Link } from 'react-router-dom';

const CAT_CONFIG = {
  'الكل': { color: 'text-indigo-900', bgColor: 'bg-indigo-900/10', icon: 'fa-solid fa-border-all', barColor: 'bg-indigo-900' },
  'كهرباء': { color: 'text-amber-500', bgColor: 'bg-amber-500/10', icon: 'fa-solid fa-bolt', barColor: 'bg-amber-500' },
  'طيان': { color: 'text-cyan-500', bgColor: 'bg-cyan-500/10', icon: 'fa-solid fa-faucet-drip', barColor: 'bg-cyan-500' },
  'دهان': { color: 'text-violet-500', bgColor: 'bg-violet-500/10', icon: 'fa-solid fa-paint-roller', barColor: 'bg-violet-500' },
  'صيانة': { color: 'text-red-500', bgColor: 'bg-red-500/10', icon: 'fa-solid fa-screwdriver-wrench', barColor: 'bg-red-500' },
  'نجارة': { color: 'text-stone-500', bgColor: 'bg-stone-500/10', icon: 'fa-solid fa-tree', barColor: 'bg-stone-500' },
  'بلاط': { color: 'text-sky-500', bgColor: 'bg-sky-500/10', icon: 'fa-solid fa-border-top-left', barColor: 'bg-sky-500' },
};

export default function Card({ job }) {
  if (!job) return null;

  const config = CAT_CONFIG[job.category] || CAT_CONFIG['الكل'];
  const isAllCard = job.category === 'الكل';
  const hasPortfolio = job.portfolioImages?.length > 0;
  const rating = job.rating || 0;
  const fullStars = Math.floor(rating);

  return (
    <div className="group bg-white rounded-[18px] overflow-hidden shadow-[0_2px_10px_rgba(8,13,40,0.06)] flex flex-col transition-all duration-250 ease-in-out relative hover:-translate-y-[5px] hover:shadow-[0_18px_36px_rgba(38,49,116,0.13)]">
   
      <div className={`h-1 w-full shrink-0 ${config.barColor}`} />

      <div className="flex items-center gap-3 px-4 pt-4">
        <div className={`w-[42px] h-[42px] rounded-xl flex items-center justify-center text-lg shrink-0 ${config.bgColor} ${config.color}`}>
          <i className={config.icon}></i>
        </div>
        <div className="flex-1 flex justify-between items-center">
          <span className={`text-[11px] font-extrabold tracking-[0.4px] uppercase ${config.color}`}>
            {isAllCard ? 'الكل' : (job.category || 'عام')}
          </span>
          {!isAllCard && (
            <span className="text-[20px] font-black text-[#080d28] leading-none">
              {job.price || 0}<span className="text-xs font-semibold text-[#6a89ba] mr-px">$</span>
            </span>
          )}
        </div>
      </div>

      <div className="px-4 py-3 flex flex-col gap-[6px] flex-1">
        <h3 className="text-sm font-extrabold text-[#080d28] leading-[1.4]">
          {isAllCard ? 'عرض جميع التخصصات والخدمات' : (job.title || 'بدون عنوان')}
        </h3>
        <p className="text-xs text-[#6a89ba] leading-[1.6] line-clamp-2 overflow-hidden">
          {isAllCard ? 'استكشف كافة الكفاءات والخدمات المعتمدة على المنصة' : (job.description || '')}
        </p>
      </div>

      <div className="px-4">
        {!isAllCard && hasPortfolio ? (
          <div className="grid grid-cols-3 gap-[2px] rounded-[10px] overflow-hidden h-[60px]">
            {job.portfolioImages.slice(0, 3).map((img, i) => (
              <div key={i} className="overflow-hidden">
                <img src={img} alt="عمل" className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110" />
              </div>
            ))}
          </div>
        ) : !isAllCard && (
          <div className="h-[44px] bg-[#f1f2f2] rounded-[10px] flex items-center justify-center gap-[6px] text-[11px] text-slate-400">
            <i className="fa-regular fa-image"></i>
            <span>لا توجد صور أعمال</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center px-4 py-3 border-t border-[#f1f2f2] mt-2">
        {!isAllCard ? (
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] shrink-0 ${config.bgColor} ${config.color}`}>
              <i className="fa-solid fa-helmet-safety"></i>
            </div>
            <div>
              <p className="text-xs font-bold text-[#080d28] leading-[1.2]">{job.workerName || 'غير محدد'}</p>
              {rating > 0 && (
                <div className="flex items-center gap-[2px] mt-[2px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className={`fa-star text-[9px] ${i < fullStars ? 'fa-solid text-[#ffb53e]' : 'fa-regular text-gray-300'}`}></i>
                  ))}
                  <span className="text-[10px] font-bold text-[#ffb53e] mr-[3px]">{rating}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] shrink-0 ${config.bgColor} ${config.color}`}>
              <i className="fa-solid fa-users"></i>
            </div>
            <p className="text-xs font-bold text-[#080d28] leading-[1.2]">جميع الفنيين المعتمدين</p>
          </div>
        )}
        <Link
          to={isAllCard ? '/workers' : `/jobs/${job.id}`}
          className="inline-flex items-center gap-[5px] text-[11px] font-bold text-[#263174] bg-[#263174]/[0.07] border border-[#263174]/15 px-3 py-[6px] rounded-full whitespace-nowrap transition-all duration-150 hover:bg-[#263174] hover:text-white"
        >
          التفاصيل <i className="fa-solid fa-arrow-left text-[9px]"></i>
        </Link>
      </div>
    </div>
  );
}