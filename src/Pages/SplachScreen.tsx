import { useEffect } from "react";
import logo from "../assets/images/logo (3).png"
interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <img className="w-44 h-44 lg:w-64 lg:h-64 animate-bounce" src={logo} alt="logo" />
    </div>
  );
};

export default SplashScreen;
