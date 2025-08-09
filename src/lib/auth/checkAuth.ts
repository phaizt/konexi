import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export async function checkAuth({ redirectTo = "/login" } = {}) {
    let user_id = localStorage.getItem("user_id");
    if (!user_id) {
        const supabase = createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();
        user_id = user?.id || null;
    }
    if (!user_id) {
        redirect(redirectTo);
    } else {
        localStorage.setItem("user_id", user_id);
    }

    return user_id; // logged-in user object
}
