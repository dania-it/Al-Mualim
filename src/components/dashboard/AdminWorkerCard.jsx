import { useState } from 'react';

export default function AdminWorkerCard({ worker, activeProject, onDelayClick, onRemove, onImageClick }) {
  const isBusy = !!activeProject;
  const delays = worker.delaysCount || worker.delays || 0;
  const portfolioCount = worker.portfolioImages?.filter(Boolean).length || 0;

  const openPortfolio = (idx = 0) => {
    if (portfolioCount === 0) return;
    if (typeof onImageClick === 'function') {
      onImageClick(worker.portfolioImages[idx]);
    }
  };

  return (
    <div 
      className={`border rounded-2xl overflow-hidden transition-all font-[var(--font-tajawal)] ${
        isBusy ? 'border-amber-300/80 bg-amber-50/60' : 'border-slate-200 bg-white shadow-xs'
      }`}
      dir="rtl"
    >
      <div className="flex items-start gap-2.5 sm:gap-3 p-3.5 sm:p-4">
        {worker.workerAvatar ? (
          <button 
            type="button" 
            onClick={() => typeof onImageClick === 'function' && onImageClick(worker.workerAvatar)} 
            title="عرض الصورة الشخصية"
            className="shrink-0 cursor-pointer"
          >
            <img
              src={worker.workerAvatar}
              alt={worker.workerName}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow-xs hover:scale-105 transition-transform"
            />
          </button>
        ) : (
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-black text-base sm:text-lg border border-[var(--primary)]/20 shrink-0">
            {worker.workerName?.charAt(0) || 'ف'}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-800 text-xs sm:text-sm truncate">{worker.workerName}</p>
          <p className="text-[11px] sm:text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <i className="fa-solid fa-toolbox text-slate-400 text-[10px] sm:text-xs"></i>
            <span className="truncate">{worker.category}</span>
            {worker.rating > 0 && (
              <>
                <span className="mx-0.5">•</span>
                <i className="fa-solid fa-star text-[#ffb53e] text-[10px] sm:text-xs"></i>
                <span className="font-semibold">{worker.rating}</span>
              </>
            )}
          </p>
          {worker.residence && (
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 flex items-center gap-1 truncate">
              <i className="fa-solid fa-location-dot text-[10px]"></i>
              <span className="truncate">{worker.residence}</span>
            </p>
          )}
          <span className={`inline-flex items-center gap-1 mt-1 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full ${
            isBusy ? 'bg-amber-100 text-amber-800 border border-amber-200/60' : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
          }`}>
            <i className={`text-[9px] ${isBusy ? 'fa-solid fa-lock' : 'fa-solid fa-circle-check'}`}></i>
            {isBusy ? 'قيد العمل' : 'متاح'}
          </span>
        </div>

        {onRemove && (
          <button 
            type="button" 
            onClick={onRemove} 
            title="إزالة الفني"
            className="text-rose-400 hover:text-rose-600 hover:bg-rose-50 p-1.5 sm:p-2 rounded-xl transition-all text-xs sm:text-sm shrink-0 cursor-pointer"
          >
            <i className="fa-solid fa-user-minus"></i>
          </button>
        )}
      </div>

      {isBusy && activeProject && (
        <div className="mx-3.5 sm:mx-4 mb-3 text-[10px] sm:text-xs bg-amber-100/80 text-amber-900 rounded-xl px-2.5 py-1.5 border border-amber-200 flex items-center gap-1.5">
          <i className="fa-solid fa-screwdriver-wrench shrink-0 text-amber-700"></i>
          <span className="truncate">يعمل على: <b>{activeProject.title}</b> — {activeProject.clientName}</span>
        </div>
      )}

      <div className="border-t border-slate-100 px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2">
        <button 
          type="button"
          onClick={() => onDelayClick && onDelayClick(worker, activeProject)}
          disabled={!isBusy}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold border transition-all flex-1 justify-center ${
            isBusy
              ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-500 hover:text-white hover:border-amber-500 cursor-pointer'
              : 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed opacity-75'
          }`}
        >
          <i className="fa-solid fa-clock-rotate-left text-[10px] sm:text-xs"></i>
          <span>تأخير ({delays}/3)</span>
        </button>

        <button 
          type="button"
          onClick={() => openPortfolio(0)}
          disabled={portfolioCount === 0}
          title={portfolioCount === 0 ? 'لا توجد صور أعمال' : 'عرض صور الأعمال'}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold border transition-all flex-1 justify-center ${
            portfolioCount > 0
              ? 'bg-[var(--primary-soft)] text-[var(--primary)] border-[var(--primary)]/20 hover:bg-[var(--primary)] hover:text-white cursor-pointer'
              : 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
          }`}
        >
          <i className="fa-solid fa-images text-[10px] sm:text-xs"></i>
          <span>أعمال {portfolioCount > 0 ? `(${portfolioCount})` : '(0)'}</span>
        </button>
      </div>
    </div>
  );
}