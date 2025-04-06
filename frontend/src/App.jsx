import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage";  
import DownloadPage from "./pages/DownloadPage";  
import NotFoundPage from "./pages/NotFoundPage"; 
import MainLayout from "./layouts/MainLayout";
import BulkDataMirror from "./pages/BulkDataMirror";

// useEffect(() => {
//   const splash = document.getElementById('splash');
//   if (splash) splash.style.display = 'none';

//   const noise = document.getElementById('noise-overlay');
//   if (noise) noise.remove();
// }, []);

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />} >
        <Route path="/" element={<MainPage />} />
        <Route path="/form-download" element={<DownloadPage />} />
        <Route path="/fec-mirror" element={<BulkDataMirror />}/>
        <Route path="*" element={<NotFoundPage />} /> 
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
