import { useState } from "react";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Calendar.css";

interface CalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

export const Calendar = ({ selectedDate, onDateSelect }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const toUTCDate = (date: Date) => {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  };

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
  ];
  const thaiDays = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

  // เปลี่ยนเดือน
  const nextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  // เช็คว่าวันที่ถูกเลือกหรือไม่
  const isSelectedDate = (date: Date) =>
    selectedDate && selectedDate.toDateString() === date.toDateString();

  // ป้องกันการเลือกวันที่ผ่านมาแล้ว
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate() + 1); // ป้องกันการเลือกวันที่ผ่านมาแล้ว
    return date < today;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-nav-buttons">
          <button onClick={prevMonth} className="calendar-nav-button">
            <FontAwesomeIcon icon={faBackward} />
          </button>
          <h2 className="calendar-month-title">
            {thaiMonths[currentMonth.getMonth()]} {currentMonth.getFullYear() + 543}
          </h2>
          <button onClick={nextMonth} className="calendar-nav-button">
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
      </div>

      <div className="calendar-days-header">
        {thaiDays.map((day) => (
          <div key={day} className="calendar-day-name">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="calendar-empty-day" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), index + 1);
          const isSelected = isSelectedDate(date);
          const isPast = isPastDate(date);

          return (
            <button
              key={index}
              onClick={() => !isPast && onDateSelect?.(toUTCDate(date))}
              className={`calendar-day-button ${isSelected ? "calendar-selected" : ""} ${isPast ? "calendar-past" : ""}`}
              disabled={isPast}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};
