import { useEffect, useState } from "react";

export default function LiveIndicator({ formatTime }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2">
      <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
      <span className="text-sm font-medium text-green-600">
        Live • Updated {formatTime(currentTime)}
      </span>
    </div>
  );
}
