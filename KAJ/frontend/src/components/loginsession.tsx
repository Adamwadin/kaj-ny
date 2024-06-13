import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useAuth } from "./Authcontexts";

export default function Loginsession() {
  const { session, logout, supabase } = useAuth();

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return (
      <div id="logout-container" className="logout-container">
      <button id="logout-button" className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
    );
  }
}