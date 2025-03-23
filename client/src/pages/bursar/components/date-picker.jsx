// client/src/pages/bursar/components/date-picker.jsx

"use client"

import * as React from "react"
import { format } from "date-fns"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

// Utility function for conditional class names
function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Button component
function Button({ id, variant, className, children, ...props }) {
  return (
    <button id={id} className={cn("btn", variant, className)} {...props}>
      {children}
    </button>
  )
}

// Popover components
function Popover({ children }) {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className="relative">
      {React.Children.map(children, child => {
        if (child.type === PopoverTrigger) {
          return React.cloneElement(child, { setIsOpen })
        }
        if (child.type === PopoverContent) {
          return isOpen ? child : null
        }
        return child
      })}
    </div>
  )
}

function PopoverTrigger({ children, setIsOpen }) {
  return React.cloneElement(children, {
    onClick: () => setIsOpen(prev => !prev)
  })
}

function PopoverContent({ children, className, align }) {
  return (
    <div className={cn("absolute z-10 mt-5 w-auto align-right", className, align)}>
      {children}
    </div>
  )
}

export function CalendarDateRangePicker({ className }) {
  const [date, setDate] = React.useState({
    from: new Date(2023, 0, 1),
    to: new Date(),
  })

  const handleDateChange = (range) => {
    setDate({
      from: range[0],
      to: range[1],
    })
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger>
          <Button
            id="date"
            variant={"none"}
            className={cn("w-[100%] justify-start text-left font-normal text-sm", !date && "text-muted-foreground")}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="right-0">
          <Calendar
            selectRange
            value={[date.from, date.to]}
            onChange={handleDateChange}
            showDoubleView
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}