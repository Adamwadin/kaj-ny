import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, supabase } from "@supabase/auth-ui-shared";
import { useAuth } from "./Authcontexts";
import { createClient } from "@supabase/supabase-js";

export default function Loginsession() {
  const { session, logout } = useAuth();

  const supabase = createClient(
    "https://dfjuvhlyklnijakilptc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmanV2aGx5a2xuaWpha2lscHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY4OTQ3MzAsImV4cCI6MjAzMjQ3MDczMH0.3GI04pbFSeLLDaf7TviiKtnw59kluc5s32e2ghevhlc"
  );
  

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return (
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }
}
