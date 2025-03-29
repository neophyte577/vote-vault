import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/vault-door-animation.json";

export const LoadingScreen = ({ onComplete, exiting }) => {
  const [text, setText] = useState("");
  const fullText = "> please stand by";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);

        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-700 ease-in-out ${
        exiting ? '-translate-x-full' : 'translate-x-0'
      }`}
    >
      <div className="fixed inset-0 z-50 bg-black text-gray-100 flex flex-col items-center justify-center gap-3">
        {/* animation */}
        <div className="flex items-center justify-center w-full">
          <div className="w-[80vw] max-w-[500px]">
            <Lottie animationData={animationData} loop={true} style={{ width: "100%", height: "auto" }} />
          </div>
        </div>

        {/* typing */}
        <div className="font-orbitron text-gray-600 md:text-gray-700 text-xl md:text-4xl font-mono font-bold flex items-center justify-center">
          {text} <span className="animate-blink ml-1"> | </span>
        </div>

        {/* load bar */}
        <div className="w-[150px] md:w-[350px] h-[2px] bg-gray-900 rounded relative overflow-hidden">
          <div className="w-[40%] h-full bg-paleHoney shadow-[0_0_15px_#3b82f6] animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
};
