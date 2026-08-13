import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { JWT } from "google-auth-library";

export const runtime = "nodejs";

type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  orgType: string;
  sport: string;
  message: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Email clients strip <style> blocks and ignore modern CSS, so the lead
// notification is built as nested tables with inline styles only, in the
// site's orange-on-ink palette (--color-acid / --color-ink).
const ACID = "#ff6900";
const INK = "#16181d";

function leadRow(label: string, value: string, isLast = false) {
  const border = isLast ? "" : "border-bottom:1px solid #2a2d34;";
  return `
          <tr>
            <td style="${border}padding:14px 28px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8b9098;width:110px;vertical-align:top;">${escapeHtml(
              label
            )}</td>
            <td style="${border}padding:14px 28px 14px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#ededed;vertical-align:top;">${value}</td>
          </tr>`;
}

function renderLeadEmail(lead: LeadPayload) {
  const mailto = `<a href="mailto:${encodeURIComponent(lead.email)}" style="color:${ACID};text-decoration:none;">${escapeHtml(
    lead.email
  )}</a>`;
  const phone = lead.phone
    ? `<a href="tel:${encodeURIComponent(lead.phone)}" style="color:${ACID};text-decoration:none;">${escapeHtml(lead.phone)}</a>`
    : '<span style="color:#6b7078;">—</span>';
  const company = lead.company ? escapeHtml(lead.company) : '<span style="color:#6b7078;">—</span>';
  const orgType = lead.orgType ? escapeHtml(lead.orgType) : '<span style="color:#6b7078;">—</span>';
  const sport = lead.sport ? escapeHtml(lead.sport) : '<span style="color:#6b7078;">—</span>';
  const message = lead.message
    ? escapeHtml(lead.message).replace(/\n/g, "<br/>")
    : '<span style="color:#6b7078;">—</span>';

  const received = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>New lead</title></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">New discovery-call request from ${escapeHtml(
    lead.name
  )}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:${INK};border-radius:14px;overflow:hidden;">
          <tr>
            <td style="height:5px;background-color:${ACID};font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:32px 28px 24px 28px;">
              <p style="margin:0 0 10px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${ACID};font-weight:bold;">Veloc Media &middot; New Enquiry</p>
              <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:26px;line-height:1.25;color:#ffffff;font-weight:bold;">${escapeHtml(
                lead.name
              )} wants to talk</h1>
              <p style="margin:10px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#8b9098;">Received ${escapeHtml(
                received
              )} IST</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 8px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #2a2d34;">
${leadRow("Name", escapeHtml(lead.name))}
${leadRow("Email", mailto)}
${leadRow("Phone", phone)}
${leadRow("Organization", company)}
${leadRow("Org type", orgType)}
${leadRow("Sport", sport)}
${leadRow("Message", message, true)}
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:12px 28px 32px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:${ACID};border-radius:999px;">
                    <a href="mailto:${encodeURIComponent(
                      lead.email
                    )}" style="display:inline-block;padding:14px 32px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;letter-spacing:0.4px;color:${INK};text-decoration:none;">Reply to ${escapeHtml(
    lead.name
  )}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px;background-color:#101216;border-top:1px solid #2a2d34;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#6b7078;">Sent automatically from the Veloc Media website booking form. Reply directly to this email to reach the lead.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function renderLeadText(lead: LeadPayload) {
  return [
    "VELOC MEDIA — NEW ENQUIRY",
    "",
    `Name:         ${lead.name}`,
    `Email:        ${lead.email}`,
    `Phone:        ${lead.phone || "—"}`,
    `Organization: ${lead.company || "—"}`,
    `Org type:     ${lead.orgType || "—"}`,
    `Sport:        ${lead.sport || "—"}`,
    "",
    "Message:",
    lead.message || "—",
  ].join("\n");
}

// Notifies the site owner by email over SMTP (e.g. a Gmail app password).
// No-ops (rather than throwing) when the integration isn't configured, so
// local dev never breaks.
async function sendLeadEmail(lead: LeadPayload) {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, ADMIN_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ADMIN_EMAIL) {
    console.warn("[book-call] Email skipped: set SMTP_HOST, SMTP_USER, SMTP_PASS and ADMIN_EMAIL to enable.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"Veloc Media Website" <${SMTP_USER}>`,
    to: ADMIN_EMAIL,
    replyTo: lead.email,
    subject: `New discovery-call request — ${lead.name}`,
    text: renderLeadText(lead),
    html: renderLeadEmail(lead),
  });
}

// Appends the lead as a new row to a Google Sheet using a service account
// (no Apps Script webhook needed). The sheet must be shared with the
// service account's email (Editor access) for this to succeed.
//
// Uses google-auth-library directly (just for the JWT -> access token
// exchange) plus a plain fetch against the Sheets REST API, rather than the
// full `googleapis` client — that package's generated types are large
// enough to make `tsc` run out of memory on this project.
async function appendLeadToSheet(lead: LeadPayload) {
  const { GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env;
  if (!GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    console.warn(
      "[book-call] Google Sheet skipped: set GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY to enable."
    );
    return;
  }

  const jwt = new JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    // .env files store the key with literal "\n" sequences; convert them
    // back to real newlines for PEM parsing.
    key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const { token } = await jwt.getAccessToken();
  if (!token) throw new Error("Failed to obtain a Google access token.");

  const range = encodeURIComponent("Sheet1!A:H");
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${range}:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [
          [
            new Date().toISOString(),
            lead.name,
            lead.email,
            lead.phone,
            lead.company,
            lead.orgType,
            lead.sport,
            lead.message,
          ],
        ],
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Google Sheets API error ${res.status}: ${text}`);
  }
}

export async function POST(request: Request) {
  let body: Partial<LeadPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name || "").trim().slice(0, 200);
  const email = String(body.email || "").trim().slice(0, 200);
  const phone = String(body.phone || "").trim().slice(0, 60);
  const company = String(body.company || "").trim().slice(0, 200);
  const orgType = String(body.orgType || "").trim().slice(0, 100);
  const sport = String(body.sport || "").trim().slice(0, 100);
  const message = String(body.message || "").trim().slice(0, 2000);

  if (!name || !email || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please provide a valid name and email." }, { status: 400 });
  }

  const lead: LeadPayload = { name, email, phone, company, orgType, sport, message };

  const results = await Promise.allSettled([sendLeadEmail(lead), appendLeadToSheet(lead)]);

  results.forEach((result) => {
    if (result.status === "rejected") console.error("[book-call]", result.reason);
  });

  const allFailed = results.length > 0 && results.every((result) => result.status === "rejected");
  if (allFailed) {
    return NextResponse.json(
      { ok: false, error: "We couldn't submit your request right now. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
