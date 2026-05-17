import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { full_name, email, phone, college, course, year, skills, why_join, portfolio_url } = body as {
    full_name: string; email: string; phone: string;
    college: string; course: string; year: string;
    skills: string[]; why_join: string; portfolio_url?: string;
  };

  if (!full_name?.trim() || !email?.trim() || !phone?.trim())
    return NextResponse.json({ error: "Name, email and phone are required." }, { status: 422 });
  if (!college?.trim() || !course?.trim() || !year?.trim())
    return NextResponse.json({ error: "Academic details are required." }, { status: 422 });
  if (!why_join?.trim() || why_join.trim().length < 20)
    return NextResponse.json({ error: "Please tell us more about why you want to join." }, { status: 422 });

  const { error } = await supabaseAdmin.from("intern_applications").insert({
    full_name: full_name.trim().slice(0, 100),
    email: email.trim().toLowerCase().slice(0, 200),
    phone: phone.trim().slice(0, 20),
    college: college.trim().slice(0, 200),
    course: course.trim().slice(0, 100),
    year: year.trim(),
    skills: Array.isArray(skills) ? skills.slice(0, 15) : [],
    why_join: why_join.trim().slice(0, 2000),
    portfolio_url: portfolio_url?.trim().slice(0, 300) || null,
  });

  if (error) {
    console.error("[intern] supabase error:", error);
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: "Application received! We'll be in touch soon." });
}
