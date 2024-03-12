import * as React from "react";

export function FavoriteIcon({ onClickFunction }) {
  
  return (
    <svg width ="20px" viewBox="0 0 100 100">
      <polygon
        points="50,10 63.8,38.7 100,38.7 73.2,61.3 80.9,91.3 50,67.5 19.1,91.3 26.8,61.3 0,38.7 36.2,38.7"
        fill="#e4d237"
        stroke="#e4d237"
        strokeWidth="10"
        onClick={onClickFunction}
      />
    </svg>
  )
}
