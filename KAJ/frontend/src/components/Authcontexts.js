import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";



const AuthContext = createContext();

const supabase = createClient(
  "https://dfjuvhlyklnijakilptc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmanV2aGx5a2xuaWpha2lscHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY4OTQ3MzAsImV4cCI6MjAzMjQ3MDczMH0.3GI04pbFSeLLDaf7TviiKtnw59kluc5s32e2ghevhlc"
);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const storedSession = sessionStorage.getItem("supabase.session");
    if (storedSession) {
      setSession(JSON.parse(storedSession));
    } else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setSession(session);
          sessionStorage.setItem("supabase.session", JSON.stringify(session));
        }
      });
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        sessionStorage.setItem("supabase.session", JSON.stringify(session));
      } else {
        sessionStorage.removeItem("supabase.session");
      }
    });
    

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    sessionStorage.removeItem("supabase.session");
  }

 
  return (
    <AuthContext.Provider value={{ session, logout, supabase }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
