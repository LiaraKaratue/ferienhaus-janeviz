import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarProps {
  selectedStart?: Date | null;
  selectedEnd?: Date | null;
  onSelectDate?: (date: Date) => void;
  isDateBlocked?: (date: Date) => boolean;
  minDate?: Date;
  className?: string;
}

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const MONTHS = [
'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];


export function Calendar({
  selectedStart,
  selectedEnd,
  onSelectDate,
  isDateBlocked,
  minDate = new Date(),
  className
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Get the day of week for the first day (0 = Sunday, adjust for Monday start)
    let startDayOfWeek = firstDay.getDay() - 1;
    if (startDayOfWeek < 0) startDayOfWeek = 6;

    const daysArray: (Date | null)[] = [];

    // Add empty slots for days before the first of the month
    for (let i = 0; i < startDayOfWeek; i++) {
      daysArray.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      daysArray.push(new Date(year, month, day));
    }

    return daysArray;
  }, [currentMonth]);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isSelected = (date: Date) => {
    if (!selectedStart) return false;
    const dateStr = date.toDateString();
    if (selectedStart.toDateString() === dateStr) return true;
    if (selectedEnd?.toDateString() === dateStr) return true;
    return false;
  };

  const isInRange = (date: Date) => {
    if (!selectedStart || !selectedEnd) return false;
    return date > selectedStart && date < selectedEnd;
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div data-ev-id="ev_b384216316" className={cn('bg-card rounded-lg border border-border p-4', className)}>
      {/* Header */}
      <div data-ev-id="ev_0c03fdec1a" className="flex items-center justify-between mb-4">
        <button data-ev-id="ev_b5d2ff64ee"
        onClick={goToPreviousMonth}
        className="p-2 hover:bg-muted rounded-md transition-colors"
        aria-label="Vorheriger Monat">

          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 data-ev-id="ev_5680a77ea5" className="font-semibold">
          {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <button data-ev-id="ev_d517105a1e"
        onClick={goToNextMonth}
        className="p-2 hover:bg-muted rounded-md transition-colors"
        aria-label="Nächster Monat">

          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Weekday headers */}
      <div data-ev-id="ev_f22c0a94a2" className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((day) =>
        <div data-ev-id="ev_7b0382c90f" key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        )}
      </div>

      {/* Days grid */}
      <div data-ev-id="ev_d585b049bd" className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) {
            return <div data-ev-id="ev_06c326d80e" key={`empty-${index}`} className="h-10" />;
          }

          const blocked = isDateBlocked?.(date) ?? false;
          const past = isPast(date);
          const selected = isSelected(date);
          const inRange = isInRange(date);
          const disabled = blocked || past;

          return (
            <button data-ev-id="ev_82ea20030f"
            key={date.toISOString()}
            onClick={() => !disabled && onSelectDate?.(date)}
            disabled={disabled}
            className={cn(
              'h-10 w-full rounded-md text-sm font-medium transition-colors',
              'hover:bg-primary/10',
              selected && 'bg-primary text-primary-foreground hover:bg-primary',
              inRange && 'bg-primary/20',
              blocked && 'bg-destructive/20 text-destructive line-through cursor-not-allowed',
              past && 'text-muted-foreground/50 cursor-not-allowed',
              !disabled && !selected && !inRange && 'hover:bg-muted'
            )}>

              {date.getDate()}
            </button>);

        })}
      </div>

      {/* Legend */}
      <div data-ev-id="ev_c3dd17cf13" className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
        <div data-ev-id="ev_6da5f9772b" className="flex items-center gap-1">
          <div data-ev-id="ev_4c14194762" className="w-3 h-3 rounded bg-primary" />
          <span data-ev-id="ev_5f6a95ec5f">Ausgewählt</span>
        </div>
        <div data-ev-id="ev_410c3a5bd9" className="flex items-center gap-1">
          <div data-ev-id="ev_9663af1422" className="w-3 h-3 rounded bg-destructive/20" />
          <span data-ev-id="ev_288facd3c3">Belegt</span>
        </div>
      </div>
    </div>);

}