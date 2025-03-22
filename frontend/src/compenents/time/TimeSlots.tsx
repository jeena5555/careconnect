import { useState } from "react";
import "./TimeSlots.css"

interface TimeSlotProps {
  startTime: string;
  endTime: string;
  onClick?: () => void;
  isSelected?: boolean;
  disabled?: boolean;
}

export const TimeSlot = ({
  startTime,
  endTime,
  onClick,
  isSelected = false,
  disabled = false
}: TimeSlotProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`time-slot ${isSelected ? "selected" : ""} ${disabled ? "disabled" : ""} ${isHovered ? "hovered" : ""}`}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="time-slot-content">
        <span className="time">{startTime}</span>
        <span className="arrow">→</span>
        <span className="time">{endTime}</span>
      </div>
    </button>
  );
};
