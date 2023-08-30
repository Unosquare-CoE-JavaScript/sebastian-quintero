import { useState } from "react";

export const Button: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [bgColor, setBgColor] = useState<"red" | "blue">("red");

  const buttonBgColor = isDisabled ? "gray" : bgColor;
  const nextBgColor = bgColor === "red" ? "blue" : "red";

  return (
    <div>
      <button
        style={{ backgroundColor: buttonBgColor }}
        disabled={isDisabled}
        onClick={() => setBgColor(nextBgColor)}
      >
        Change to {nextBgColor}
      </button>
      <label>
        <input
          type="checkbox"
          onChange={(event) => setIsDisabled(!!event.target.checked)}
        />
        Disable button
      </label>
    </div>
  );
};
