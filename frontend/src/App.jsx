import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Main from "./pages/MainPage";  
import DownloadPage from "./pages/DownloadPage";  
import NotFoundPage from "./pages/NotFoundPage"; 
import MainLayout from "./layouts/MainLayout";
import BulkDataMirror from "./pages/BulkDataMirror";

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />} >
        <Route path="/" element={<Main />} />
        <Route path="/form-download" element={<DownloadPage />} />
        <Route path="/fec-mirror" element={<BulkDataMirror />}/>
        <Route path="*" element={<NotFoundPage />} /> 
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
