import { useEffect } from "react";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <h1 className="text-4xl font-bold text-customBlue animate-pulse">
        <span className="text-black">Price</span>Chase
      </h1>
    </div>
  );
};

export default SplashScreen;
