interface ScoreRadialChartProps {
  score: number;
  size?: number;
  color?: string;
}

const ScoreRadialChart = ({ score, size = 160, color }: ScoreRadialChartProps) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  // Color based on score (fallback if no color prop)
  const getColor = () => {
    if (color) return color;
    if (score >= 70) return "hsl(var(--secondary))";
    if (score >= 40) return "hsl(var(--primary))";
    return "hsl(166 30% 55%)";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
        />
        {/* Score arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Center text overlay */}
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{ width: size, height: size }}
      >
        <span className="font-heading text-4xl font-bold text-foreground">{score}%</span>
      </div>
      <span className="font-heading text-sm font-medium text-muted-foreground">Sketch Score</span>
    </div>
  );
};

export default ScoreRadialChart;
