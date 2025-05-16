import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main>
      <Outlet />
      <Toaster />
    </main>
  );
}

export default App;
