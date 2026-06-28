import { NextResponse } from "next/server";
import { contactSchema, ContactFormInput } from "../../lib/schemas/contact";

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = contactSchema.safeParse(body);

if (!parsed.success) {
  parsed.error.issues.forEach((err) => {
    console.log(err.path, err.message);
  });
}

  // simulate saving message
  return NextResponse.json(
    { message: "Contact message received" },
    { status: 201 }
  );
}