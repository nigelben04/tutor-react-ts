import React from "react";

interface SmartphoneIconProps {
  size?: number;
  color?: string;
}

const SmartphoneIcon: React.FC<SmartphoneIconProps> = ({
  size = 24,
  color = "gray",
}) => {
  const encodedSVG = `
    data:image/svg+xml;utf8,
    %3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22
    enable-background%3D%22new%200%200%2032%2032%22
    viewBox%3D%220%200%2032%2032%22%3E%3Cpath
    fill%3D%22${encodeURIComponent(color)}%22
    d%3D%22M22%2C2h-2h-8h-2C8.3457031%2C2%2C7%2C3.3457031%2C7%2C5v22c0%2C1.6542969%2C1.3457031%2C3%2C3%2C3h12c1.6542969%2C0%2C3-1.3457031%2C3-3V5%0D%0A%09C25%2C3.3457031%2C23.6542969%2C2%2C22%2C2z%20M19%2C4v1c0%2C0.5512695-0.4482422%2C1-1%2C1h-4c-0.5512695%2C0-1-0.4487305-1-1V4H19z%20M23%2C27%0D%0A%09c0%2C0.5517578-0.4482422%2C1-1%2C1H10c-0.5512695%2C0-1-0.4482422-1-1V5c0-0.5512695%2C0.4487305-1%2C1-1h1v1c0%2C1.6542969%2C1.3457031%2C3%2C3%2C3h4%0D%0A%09c1.6542969%2C0%2C3-1.3457031%2C3-3V4h1c0.5517578%2C0%2C1%2C0.4487305%2C1%2C1V27z%20M19%2C26c0%2C0.5527344-0.4472656%2C1-1%2C1h-4%0D%0A%09c-0.5522461%2C0-1-0.4472656-1-1s0.4477539-1%2C1-1h4C18.5527344%2C25%2C19%2C25.4472656%2C19%2C26z%22%2F%3E%3C%2Fsvg%3E
  `;

  return (
    <img src={encodedSVG} alt="Smartphone Icon" width={size} height={size} />
  );
};

export default SmartphoneIcon;
