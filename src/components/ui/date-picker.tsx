"use client"

import * as React from "react"
import { format, addDays, endOfMonth, isSameDay } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, type DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger, PopoverPortal } from "@/components/ui/popover"

const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

type DatePickerMode = "single" | "range"

interface DatePickerProps {
  mode?: DatePickerMode
  value?: Date | DateRange | undefined
  onChange?: (date: Date | DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  fromDate?: Date
  toDate?: Date
}

export function DatePicker({
  mode = "single",
  value,
  onChange,
  placeholder = "Seleccionar fecha",
  disabled = false,
  className,
  fromDate,
  toDate,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [navOpen, setNavOpen] = React.useState<"month" | "year" | null>(null)
  const [internalMonth, setInternalMonth] = React.useState<Date>(
    value instanceof Date ? value : new Date()
  )

  const selectedDate = mode === "single" ? (value as Date | undefined) : undefined
  const selectedRange = mode === "range" ? (value as DateRange | undefined) : undefined

  const today = new Date()

  const presets = React.useMemo(() => [
    { label: "Hoy", getValue: () => new Date() },
    { label: "Mañana", getValue: () => addDays(new Date(), 1) },
    { label: "Próx. Semana", getValue: () => addDays(new Date(), 7) },
    { label: "Próx. Mes", getValue: () => addDays(new Date(), 30) },
    { label: "Fin de Mes", getValue: () => endOfMonth(new Date()) },
  ], [])

  const formattedDisplay = React.useMemo(() => {
    if (mode === "single" && selectedDate) {
      return format(selectedDate, "d MMM yyyy", { locale: es })
    }
    if (mode === "range" && selectedRange?.from) {
      if (selectedRange.to) {
        return `${format(selectedRange.from, "d MMM", { locale: es })} - ${format(selectedRange.to, "d MMM yyyy", { locale: es })}`
      }
      return format(selectedRange.from, "d MMM yyyy", { locale: es })
    }
    return ""
  }, [mode, selectedDate, selectedRange])

  const handleSelect = React.useCallback((day: Date | undefined) => {
    if (!day) return
    if (mode === "single") {
      onChange?.(day)
      setOpen(false)
    }
    setInternalMonth(day)
  }, [mode, onChange])

  const handleRangeSelect = React.useCallback((range: DateRange | undefined) => {
    onChange?.(range)
    if (range?.from && range?.to) {
      setTimeout(() => setOpen(false), 300)
    }
  }, [onChange])

  const handlePreset = React.useCallback((getValue: () => Date) => {
    const d = getValue()
    if (mode === "single") {
      onChange?.(d)
      setOpen(false)
    } else {
      onChange?.({ from: d, to: addDays(d, 7) })
    }
    setInternalMonth(d)
  }, [mode, onChange])

  const handleYearSelect = React.useCallback((year: number) => {
    const newDate = new Date(internalMonth)
    newDate.setFullYear(year)
    setInternalMonth(newDate)
    setNavOpen(null)
  }, [internalMonth])

  const handleMonthSelect = React.useCallback((monthIndex: number) => {
    const newDate = new Date(internalMonth)
    newDate.setMonth(monthIndex)
    setInternalMonth(newDate)
    setNavOpen(null)
  }, [internalMonth])

  const currentYear = internalMonth.getFullYear()
  const currentMonth = internalMonth.getMonth()
  const years = React.useMemo(() => {
    const start = fromDate?.getFullYear() ?? currentYear - 10
    const end = toDate?.getFullYear() ?? currentYear + 10
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [fromDate, toDate, currentYear])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <button
          className={cn(
            "relative flex h-11 w-full items-center gap-3 rounded-xl border border-border/40 bg-background/80 px-4 text-left text-sm shadow-sm backdrop-blur-sm transition-all duration-200",
            "hover:border-kyron-cyan/30 hover:shadow-[0_0_20px_-8px_rgba(6,182,212,0.15)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kyron-cyan/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "group",
            !formattedDisplay && "text-muted-foreground/60",
            disabled && "cursor-not-allowed opacity-50 hover:border-border/40 hover:shadow-none",
            open && "border-kyron-cyan/40 shadow-[0_0_25px_-8px_rgba(6,182,212,0.2)]",
            className
          )}
        >
          <span className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-300",
            formattedDisplay
              ? "bg-kyron-cyan/10 text-kyron-cyan"
              : "bg-muted/50 text-muted-foreground/40"
          )}>
            <CalendarIcon className="h-3.5 w-3.5" />
          </span>
          <span className="flex-1 truncate font-medium">
            {formattedDisplay || <span className="font-normal tracking-wide">{placeholder}</span>}
            {formattedDisplay && (
              <span className="ml-2 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/30">
                <span className="inline-block h-1 w-1 rounded-full bg-kyron-cyan/40" />
                click para cambiar
              </span>
            )}
          </span>
          <ChevronRight className={cn(
            "h-3.5 w-3.5 shrink-0 transition-all duration-300 text-muted-foreground/20",
            open && "rotate-90 text-kyron-cyan/40"
          )} />
        </button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent
          align="start"
          sideOffset={8}
          className="w-auto min-w-[320px] overflow-hidden rounded-2xl border border-border/40 bg-background/95 p-0 shadow-2xl backdrop-blur-2xl"
        >
          <div className="relative">
            {/* Glass reflection line */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-kyron-cyan/20 to-transparent" />

            {/* Quick presets */}
            {mode === "single" && (
              <div className="flex items-center gap-1.5 border-b border-border/20 px-4 py-3">
                <span className="mr-1 text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground/30">Ir a:</span>
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handlePreset(preset.getValue)}
                    className={cn(
                      "rounded-lg px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-200",
                      "border border-transparent",
                      isSameDay(preset.getValue(), selectedDate ?? today)
                        ? "bg-kyron-cyan/10 text-kyron-cyan border-kyron-cyan/20"
                        : "text-muted-foreground/50 hover:text-foreground hover:bg-muted/50 hover:border-border/30"
                    )}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}

            {/* Custom caption - month/year selector */}
            <div className="flex items-center justify-between border-b border-border/20 px-4 py-2.5">
              <button
                type="button"
                onClick={() => setInternalMonth(new Date(internalMonth.getFullYear(), internalMonth.getMonth() - 1))}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "h-8 w-8 rounded-xl p-0 hover:bg-muted/50"
                )}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setNavOpen(navOpen === "month" ? null : "month")}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm font-bold tracking-tight transition-all duration-200",
                    "hover:bg-muted/50",
                    navOpen === "month" && "bg-muted/50 text-kyron-cyan"
                  )}
                >
                  {MONTHS[currentMonth]}
                </button>
                <button
                  type="button"
                  onClick={() => setNavOpen(navOpen === "year" ? null : "year")}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm font-bold tracking-tight transition-all duration-200",
                    "hover:bg-muted/50",
                    navOpen === "year" && "bg-muted/50 text-kyron-cyan"
                  )}
                >
                  {currentYear}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setInternalMonth(new Date(internalMonth.getFullYear(), internalMonth.getMonth() + 1))}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "h-8 w-8 rounded-xl p-0 hover:bg-muted/50"
                )}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Month grid selector */}
            {navOpen === "month" && (
              <div className="grid grid-cols-4 gap-1 p-3">
                {MONTHS.map((month, i) => (
                  <button
                    key={month}
                    type="button"
                    onClick={() => handleMonthSelect(i)}
                    className={cn(
                      "rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200",
                      "hover:bg-muted/50 hover:text-foreground",
                      i === currentMonth
                        ? "bg-kyron-cyan/10 text-kyron-cyan border border-kyron-cyan/20"
                        : "text-muted-foreground/60 border border-transparent"
                    )}
                  >
                    {month.slice(0, 3)}
                  </button>
                ))}
              </div>
            )}

            {/* Year grid selector */}
            {navOpen === "year" && (
              <div className="grid grid-cols-5 gap-1 p-3 max-h-[200px] overflow-y-auto">
                {years.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => handleYearSelect(year)}
                    className={cn(
                      "rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200",
                      "hover:bg-muted/50 hover:text-foreground",
                      year === currentYear
                        ? "bg-kyron-cyan/10 text-kyron-cyan border border-kyron-cyan/20"
                        : "text-muted-foreground/60 border border-transparent"
                    )}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}

            {/* Calendar */}
            <div className={cn(navOpen && "hidden")}>
              <DayPicker
                mode={mode as "single" | "range"}
                selected={value}
                onSelect={(day: Date | DateRange | undefined) => {
                  if (mode === "single") handleSelect(day as Date | undefined)
                  else handleRangeSelect(day as DateRange | undefined)
                }}
                month={internalMonth}
                onMonthChange={setInternalMonth}
                locale={es}
                fromDate={fromDate}
                toDate={toDate}
                showOutsideDays={false}
                className="p-3"
                classNames={{
                  months: "flex flex-col",
                  month: "space-y-1",
                  caption: "hidden",
                  nav: "hidden",
                  table: "w-full border-collapse",
                  head_row: "flex",
                  head_cell: "w-9 h-8 text-[9px] font-black uppercase tracking-widest text-muted-foreground/30 flex items-center justify-center",
                  row: "flex w-full mt-0.5",
                  cell: cn(
                    "h-9 w-9 text-center text-sm p-0 relative",
                    "first:[&:has([aria-selected])]:rounded-l-xl last:[&:has([aria-selected])]:rounded-r-xl",
                    "[&:has([aria-selected])]:bg-kyron-cyan/5"
                  ),
                  day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-9 w-9 p-0 font-medium text-sm rounded-xl",
                    "hover:bg-muted/50 hover:text-foreground",
                    "aria-selected:opacity-100 aria-selected:rounded-xl",
                    "transition-all duration-150"
                  ),
                  day_selected: "!bg-kyron-cyan !text-white !hover:bg-kyron-cyan/90 shadow-lg shadow-kyron-cyan/20",
                  day_today: "ring-1 ring-kyron-cyan/20 !font-bold !text-kyron-cyan",
                  day_outside: "text-muted-foreground/20",
                  day_disabled: "text-muted-foreground/20 cursor-not-allowed",
                  day_range_middle: "!bg-kyron-cyan/10 !rounded-none",
                  day_range_end: "!rounded-r-xl !bg-kyron-cyan !text-white",
                  day_range_start: "!rounded-l-xl !bg-kyron-cyan !text-white",
                  day_hidden: "invisible",
                }}
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border/20 px-4 py-2.5">
              <button
                type="button"
                onClick={() => {
                  onChange?.(undefined)
                  setOpen(false)
                }}
                className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors"
              >
                Limpiar
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-kyron-cyan/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-kyron-cyan hover:bg-kyron-cyan/20 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}
