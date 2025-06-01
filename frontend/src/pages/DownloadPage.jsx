import DownloadForm from "../components/DownloadForm";
import { FlickeringGrid } from "../animations/FlickeringGrid";

const DownloadPage = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      <FlickeringGrid className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-x-0 top-16 md:top-24 flex justify-center">
        <div className="relative max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-6rem)] overflow-hidden">
          <div className="overflow-y-auto">
            <DownloadForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
