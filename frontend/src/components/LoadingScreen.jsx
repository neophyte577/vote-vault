import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/vault-door.json";

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const fullText = ">opening";

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
    <div className="fixed inset-0 z-50 bg-black text-gray-100 flex flex-col items-center justify-center gap-3">
      {/* animation */}
      <div className="flex items-center justify-center w-full">
        <div className="w-[80vw] max-w-[500px]">
          <Lottie animationData={animationData} loop={true} style={{ width: "100%", height: "auto" }} />
        </div>
      </div>

      {/* typing */}
      <div className="text-4xl font-mono font-bold flex items-center justify-center">
        {text} <span className="animate-blink ml-1"> | </span>
      </div>

      {/* load bar */}
      <div className="w-[200px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
        <div className="w-[40%] h-full bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-loading-bar"></div>
      </div>
    </div>
  );
};
