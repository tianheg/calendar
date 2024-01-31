import { ChevronDown } from '@/assets/icons';
import clsxm from '@/libs/clsxm';
import { downloadFromBase64 } from '@/libs/download';
import { useToPng } from '@hugocxl/react-to-image';
import { useEffect, useMemo, useState } from 'react';
import Calendar from './Calendar';
import { Checkbox, DatePickerWithRange, Divider } from './ui';
import { useShareModal } from '@/hooks/useShareModal';
import { usePreference } from '@/hooks/usePreference';
import useCalendar from '@/hooks/useCalendar';
import { generateDateList } from '@/libs/date';
import { DateRange } from 'react-day-picker';
import { isSameMonth } from 'date-fns';

const ShareModal = () => {
  const { isOpen, closeShareModal } = useShareModal();
  const [highlightToday, setHighlightToday] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [headerText, setHeaderText] = useState('节假日安排');
  const [footerText, setFooterText] = useState('Calendar Remark');
  const [showCustomArea, setShowCustomArea] = useState(false);
  const { currentYear, currentMonth } = useCalendar();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const {
    preference: { firstDayOfWeek, showExtraDays, showDateContent },
  } = usePreference();
  const [state, covertToPng, ref] = useToPng<HTMLDivElement>({
    onSuccess: (data) => {
      downloadFromBase64(data, `${headerText} - Calendar Remark.png`);
    },
  });

  const dateList = useMemo<Date[]>(() => {
    if (!startDate || !endDate) return [];

    return generateDateList(startDate, endDate, firstDayOfWeek);
  }, [startDate, endDate, firstDayOfWeek]);

  const dimNonCurrentMonth = useMemo(() => {
    if (!startDate || !endDate) return true;
    return isSameMonth(startDate, endDate);
  }, [startDate, endDate]);

  const handleSave = () => {
    if (state.status !== 'loading') {
      covertToPng();
    }
  };

  const handleClose = () => {
    closeShareModal();
    setShowCustomArea(false);
  };

  useEffect(() => {
    if (currentMonth !== -1 && currentYear) {
      setStartDate(new Date(currentYear, currentMonth, 1));
      setEndDate(new Date(currentYear, currentMonth + 1, 0));
    }
  }, [currentMonth, currentYear]);

  const renderCustomArea = () => {
    return (
      <div
        className={clsxm(
          'relative px-1 mt-2 mx-2 md:mx-4 overflow-hidden transition-all duration-200 rounded-lg p-2 text-sm md:text-base mb-2',
          showCustomArea && 'bg-slate-100'
        )}
      >
        <div
          className='flex items-center cursor-pointer select-none'
          onClick={() => setShowCustomArea(!showCustomArea)}
        >
          <ChevronDown
            className={clsxm(
              'size-6 transition-all duration-200',
              showCustomArea && 'rotate-180'
            )}
          />
          <div>定制化</div>
        </div>
        <div
          className={clsxm(
            'transition-all duration-200 flex flex-col justify-center',
            showCustomArea
              ? 'h-52 opacity-100 visible'
              : 'h-0 opacity-0 invisible'
          )}
        >
          {showCustomArea && (
            <>
              <Divider direction='horizontal' className='my-2' />
              <div className='flex flex-col gap-3 py-2'>
                <div className='flex items-center gap-2'>
                  <span className='text-nowrap'>标记今日</span>
                  <Checkbox
                    checked={highlightToday}
                    onChange={() => setHighlightToday(!highlightToday)}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <div className='flex items-center gap-2'>
                    <span className='text-nowrap'>显示头部</span>
                    <Checkbox
                      checked={showHeader}
                      onChange={() => setShowHeader(!showHeader)}
                    />
                  </div>
                  <div className='flex items-center justify-center w-full'>
                    <input
                      type='text'
                      placeholder='例如：节假日安排'
                      maxLength={20}
                      value={headerText}
                      className='w-full px-2 py-1 text-sm transition-all duration-200 border border-gray-300 rounded-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent'
                      onChange={(e) => setHeaderText(e.target.value)}
                      disabled={!showHeader}
                    />
                  </div>
                </div>
                <div className='flex flex-col gap-1'>
                  <div className='flex items-center gap-2'>
                    <span className='text-nowrap'>显示底部</span>
                    <Checkbox
                      checked={showFooter}
                      onChange={() => setShowFooter(!showFooter)}
                    />
                  </div>
                  <div className='flex items-center justify-center w-full'>
                    <input
                      type='text'
                      placeholder='例如：Calendar Remark'
                      maxLength={20}
                      value={footerText}
                      className='w-full px-2 py-1 text-sm transition-all duration-200 border border-gray-300 rounded-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent'
                      onChange={(e) => setFooterText(e.target.value)}
                      disabled={!showFooter}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const handleDateChange = (range?: DateRange) => {
    if (!range) return;

    setStartDate(range.from);
    setEndDate(range.to);
  };

  return (
    <div
      className={clsxm(
        'fixed inset-0 z-20 flex justify-center items-center transition-all duration-300 invisible overflow-y-scroll',
        isOpen ? 'visible bg-black/40' : 'invisible'
      )}
    >
      <div className='absolute w-screen h-full px-2 pt-16 -translate-x-1/2 left-1/2 md:w-fit'>
        <div
          className={clsxm(
            'flex flex-col bg-white rounded-lg shadow-md transition-all duration-300 dark:bg-zinc-600',
            isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          )}
        >
          <div className='p-1 md:p-4'>
            <div className='flex justify-center w-auto py-2'>
              <DatePickerWithRange
                from={startDate}
                to={endDate}
                max={366}
                onChange={handleDateChange}
              />
            </div>
            <div className='max-h-[50vh] overflow-y-auto scrollbar-track-white scrollbar-thumb-slate-300 scrollbar-thin scrollbar-thumb-rounded-full'>
              <div ref={ref} className='p-2 bg-white md:p-4 dark:bg-zinc-600'>
                <div className='bg-white dark:bg-zinc-800 w-full md:w-[37.5rem] rounded-lg md:shadow-lg shadow-slate-200 text-sm md:text-base overflow-hidden'>
                  {showHeader && (
                    <div className='w-full px-1 py-2 text-center md:px-2 md:py-4 bg-slate-100 dark:bg-zinc-900/20 dark:text-zinc-200'>
                      {headerText}
                    </div>
                  )}
                  <Calendar
                    isSharing
                    firstDayOfWeek={firstDayOfWeek}
                    showExtraDays={showExtraDays}
                    showDateContent={showDateContent}
                    dateList={dateList}
                    highlightToday={highlightToday}
                    dimNonCurrentMonth={dimNonCurrentMonth}
                  />
                  {showFooter && (
                    <div className='flex items-center justify-center w-full gap-1 px-1 py-2 text-sm md:gap-2 md:px-2 md:py-4 bg-slate-100 dark:bg-zinc-900/20 md:text-base dark:text-zinc-200'>
                      <img
                        src='/favicon.svg'
                        className='w-4 h-4 md:w-6 md:h-6'
                      />
                      <span>{footerText}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {renderCustomArea()}
          </div>
          <div className='w-full h-px bg-gray-200'></div>
          <div className='flex justify-end gap-4 px-6 py-4'>
            <button
              className='px-3 py-1 text-sm text-white transition-all duration-200 bg-red-500 rounded-md hover:bg-red-600 md:text-base'
              onClick={handleClose}
            >
              关闭
            </button>
            <button
              className='px-3 py-1 text-sm text-white transition-all duration-200 bg-blue-500 rounded-md hover:bg-blue-600 md:text-base'
              onClick={() => handleSave()}
            >
              保存图片
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
