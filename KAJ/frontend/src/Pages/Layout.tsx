import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import Loginsession from "../components/loginsession";

 
export const Layout = () => {
  return (
    <>
      <header>
        <Navigation />
        
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};