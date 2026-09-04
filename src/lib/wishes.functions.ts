import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const submitSchema = z.object({
  wishOne: z.string().trim().min(1).max(1000),
  wishTwo: z.string().trim().min(1).max(1000),
  wishThree: z.string().trim().min(1).max(1000),
  note: z.string().trim().max(2000).optional(),
});

export const submitWishes = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => submitSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = createClient(
      process.env["VITE_SUPABASE_URL"]!,
      process.env["VITE_SUPABASE_PUBLISHABLE_KEY"]!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );

    const { error } = await supabase.from("wishes").insert({
      wish_one: data.wishOne,
      wish_two: data.wishTwo,
      wish_three: data.wishThree,
      note: data.note ?? null,
    });

    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

const readSchema = z.object({ passcode: z.string().min(1) });

export type WishEntry = {
  id: string;
  wish_one: string;
  wish_two: string;
  wish_three: string;
  note: string | null;
  created_at: string;
};

export const readWishes = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => readSchema.parse(data))
  .handler(async ({ data }): Promise<WishEntry[]> => {
    const expected = process.env["WISHES_PASSCODE"];
    if (!expected || data.passcode !== expected) {
      throw new Error("Wrong passcode");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("wishes")
      .select("id, wish_one, wish_two, wish_three, note, created_at")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (rows ?? []) as WishEntry[];
  });
