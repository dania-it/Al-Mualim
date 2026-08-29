import { useState } from 'react';
import { useApp } from '../../Context/AppContext';
import DashboardSelect from './DashboardSelect';

export default function AssignWorkerDropdown({
  project,
  approvedWorkers = [],
  getBusyProject,
}) {
  const { assignWorkerToProject } = useApp();

  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);

  const byCategory = approvedWorkers.filter(
    (worker) =>
      worker.category === project.category &&
      !(getBusyProject && getBusyProject(worker.workerName))
  );

  const fallbackWorkers = approvedWorkers.filter(
    (worker) =>
      !(getBusyProject && getBusyProject(worker.workerName))
  );

  const options =
    byCategory.length > 0
      ? byCategory
      : fallbackWorkers;

  const usingFallback =
    byCategory.length === 0 &&
    fallbackWorkers.length > 0;

  const dropdownOptions = options.map((worker) => {
    const categoryText = usingFallback ? ` (${worker.category})` : '';
    const ratingText = worker.rating > 0 ? ` ★${worker.rating}` : ' — جديد';

    return {
      value: worker.workerName,
      label: `${worker.workerName}${categoryText}${ratingText}`,
    };
  });

  const handleAssign = async (e) => {
    if (e) e.preventDefault();
    if (!selected || loading) return;

    setLoading(true);

    try {
      await assignWorkerToProject(
        project.id,
        selected
      );

      setSelected('');
    } catch (error) {
      console.error(
        'فشل تعيين الفني:',
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (options.length === 0) {
    return (
      <span
        className="
          text-xs sm:text-sm
          text-amber-700
          bg-amber-50
          border
          border-amber-200
          px-3 py-2
          rounded-xl sm:rounded-2xl
          flex items-center
          gap-1.5
          font-medium
          font-[var(--font-tajawal)]
        "
        dir="rtl"
      >
        <i className="fa-solid fa-triangle-exclamation text-xs shrink-0" />
        لا يوجد فنيون متاحون
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full min-w-[200px] sm:min-w-[220px] font-[var(--font-tajawal)]" dir="rtl">
      {usingFallback && (
        <p className="text-[11px] sm:text-xs text-amber-600 font-bold flex items-center gap-1">
          <i className="fa-solid fa-triangle-exclamation shrink-0" />
          لا يوجد فني بتخصص {project.category}
        </p>
      )}

      <DashboardSelect
        icon="fa-solid fa-helmet-safety"
        placeholder={
          usingFallback
            ? 'اختر فني من أي تخصص...'
            : `اختر فني ${project.category}...`
        }
        value={selected}
        options={dropdownOptions}
        onChange={setSelected}
        disabled={loading}
      />

      {selected && (
        <button
          type="button"
          onClick={handleAssign}
          disabled={loading}
          className="
            w-full
            py-2 sm:py-2.5
            bg-[var(--primary)]
            text-white
            text-xs sm:text-sm
            font-bold
            rounded-xl
            hover:bg-[var(--primary-hover)]
            transition-all
            flex items-center
            justify-center
            gap-2
            disabled:opacity-60
            active:scale-95
            cursor-pointer
          "
        >
          {loading ? (
            <>
              <i className="fa-solid fa-spinner fa-spin text-xs sm:text-sm" />
              جاري التعيين...
            </>
          ) : (
            <>
              <i className="fa-solid fa-user-check text-xs sm:text-sm" />
              تعيين الفني
            </>
          )}
        </button>
      )}
    </div>
  );
}