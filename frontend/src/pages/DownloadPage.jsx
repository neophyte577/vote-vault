import DownloadForm from "../components/DownloadForm";
import { FlickeringGrid } from "../animations/FlickeringGrid";

const DownloadPage = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden">
        <FlickeringGrid className="absolute inset-0 w-full h-full pointer-events-none" />
        <div className="absolute mt-5 md:mt-10 inset-0 flex items-center justify-center">
            <DownloadForm />
        </div>
    </div>
  );
};

export default DownloadPage;
