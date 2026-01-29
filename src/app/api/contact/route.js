import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req) {
    let body;
    try {
        body = await req.json();
    } catch {
        return Response.json({ success: false, error: "JSON invalide." }, { status: 400 });
    }

    const { name, email, message, type } = body ?? {};

    if (!name || !email || !message || !type) {
        return Response.json({ success: false, error: "Champs requis manquants." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        return Response.json(
            { success: false, error: "RESEND_API_KEY manquante côté serveur." },
            { status: 500 }
        );
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "kaliops.consulting@gmail.com",
        subject: `📬 Nouveau message de ${name}`,
        replyTo: email,
        html: `
      <h2>📨 Nouveau message reçu via le formulaire</h2>
      <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
      <p><strong>Email :</strong> ${escapeHtml(email)}</p>
      <p><strong>Type de demande :</strong> ${escapeHtml(type)}</p>
      <p><strong>Message :</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `,
    });
    console.log("RESEND data:", data);
    console.log("RESEND error:", error);

    if (error) {
        console.error("Resend error:", error);
        return Response.json({ success: false, error }, { status: 502 });
    }

    return Response.json({ success: true, id: data?.id }, { status: 200 });
}

function escapeHtml(str) {
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
