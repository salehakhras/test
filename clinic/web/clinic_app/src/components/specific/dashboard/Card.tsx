import React from "react";

interface CardProps {
  title?: string;
  cornerText?: string;
  width: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const Card = ({
  title,
  cornerText,
  width,
  children,
  action,
  className,
}: CardProps) => {
  return (
    <div
      className={`card round-md shadow-md m-2 bg-base-200 ${width} ${className}`}
    >
      <div className="card-body">
        <div className="flex justify-between">
          {title && <h2 className="card-title">{title}</h2>}
          {cornerText && (
            <span className="text-xs text-gray-500">{cornerText}</span>
          )}
        </div>
        {children}
        {action && <div className="card-actions justify-end">{action}</div>}
      </div>
    </div>
  );
};

export default Card;
