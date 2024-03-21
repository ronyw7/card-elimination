interface CardProps {
  className?: string;
  index?: number;
  color?: string;
  cost?: number;
  onClick?(): void;
}

export function Card({ className, index, color, cost, onClick }: CardProps) {
  const style = {
    ...(color ? { backgroundColor: color } : {}),
    ...(index ? { left: `${index * 75}px` } : {}),
  };

  return (
    <div
      className={`card ${className}`}
      onClick={onClick ? onClick : () => {}}
      style={style}
    >
      {cost !== undefined && (
        <span className="card-cost">{cost}</span>
      )}
    </div>
  );
}
