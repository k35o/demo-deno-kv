import { serve } from "https://deno.land/std@0.155.0/http/server.ts";

const db = await Deno.openKv();

serve(async (req: Request) => {
    await db.atomic().sum(["views"], 1n).commit();

    const res = await db.get(["views"]);
    const views = res.value.value;

    return new Response(`Views: ${views}`);
});
