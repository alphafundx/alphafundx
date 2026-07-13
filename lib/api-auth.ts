import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { NextResponse } from "next/server";

/**
 * Get the current authenticated session or return a 401 response.
 * Returns { session, user, response? } — if response is set, return it immediately.
 */
export async function getAuthSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      session: null,
      user: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const user = session.user as {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string;
    status?: string;
  };

  return { session, user, response: null };
}

/**
 * Get the current authenticated session and ensure the user is an ADMIN.
 */
export async function getAdminSession() {
  const result = await getAuthSession();

  if (result.response) return result;

  if (result.user?.role !== "ADMIN") {
    return {
      session: null,
      user: null,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return result;
}
