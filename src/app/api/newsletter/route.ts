import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "subscribers.json");

async function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function getSubscribers(): Promise<string[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email é obrigatório." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    await ensureDataDir();
    const subscribers = await getSubscribers();

    if (subscribers.includes(normalizedEmail)) {
      return NextResponse.json(
        { message: "Este email já está inscrito!" },
        { status: 200 }
      );
    }

    subscribers.push(normalizedEmail);
    await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2));

    // TODO: Integrar com serviço de email (Mailchimp, Resend, etc.)
    // Exemplo com Resend:
    // await resend.contacts.create({ email: normalizedEmail, audienceId: '...' });

    return NextResponse.json(
      { message: "Inscrito com sucesso!" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Erro interno. Tente novamente." },
      { status: 500 }
    );
  }
}
