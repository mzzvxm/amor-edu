
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const DaysCounter = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  const startDate = new Date('2024-01-03');
  
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const totalMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const totalSeconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setDays(totalDays);
      setHours(totalHours);
      setMinutes(totalMinutes);
      setSeconds(totalSeconds);
    };
    
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-effect rounded-xl p-6 text-center animate-fadeInUp border border-blood-red-900/20">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Heart className="text-blood-red-400 animate-pulse-heart fill-current" size={24} />
        <h2 className="text-xl font-bold text-shadow text-blood-red-200">Estou te amando há</h2>
        <Heart className="text-blood-red-400 animate-pulse-heart fill-current" size={24} />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blood-red-900/20 rounded-lg p-3">
          <div className="text-3xl font-bold text-blood-red-300 mb-1">{days}</div>
          <div className="text-sm text-blood-red-400">dias</div>
        </div>
        <div className="bg-blood-red-900/20 rounded-lg p-3">
          <div className="text-3xl font-bold text-blood-red-300 mb-1">{hours}</div>
          <div className="text-sm text-blood-red-400">horas</div>
        </div>
        <div className="bg-blood-red-900/20 rounded-lg p-3">
          <div className="text-3xl font-bold text-blood-red-300 mb-1">{minutes}</div>
          <div className="text-sm text-blood-red-400">minutos</div>
        </div>
        <div className="bg-blood-red-900/20 rounded-lg p-3">
          <div className="text-3xl font-bold text-blood-red-300 mb-1">{seconds}</div>
          <div className="text-sm text-blood-red-400">segundos</div>
        </div>
      </div>
    </div>
  );
};

export default DaysCounter;
