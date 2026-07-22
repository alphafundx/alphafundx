/**
 * Send a notification to Telegram with optional image attachment.
 * Gracefully no-ops if env vars are missing.
 */
export async function sendTelegramNotification({
  message,
  imageUrl,
}: {
  message: string;
  imageUrl?: string | null;
}) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log("Telegram notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set");
    return;
  }

  try {
    const baseUrl = `https://api.telegram.org/bot${botToken}`;

    if (imageUrl) {
      // Build absolute image URL if relative
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const fullImageUrl = imageUrl.startsWith("http") ? imageUrl : `${appUrl}${imageUrl}`;

      // Try sending as photo with caption
      const photoRes = await fetch(`${baseUrl}/sendPhoto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          photo: fullImageUrl,
          caption: message,
          parse_mode: "HTML",
        }),
      });

      const photoData = await photoRes.json();

      // If photo failed (e.g. localhost URL), fallback to text with link
      if (!photoData.ok) {
        console.warn("Telegram sendPhoto failed, falling back to text:", photoData.description);
        await fetch(`${baseUrl}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: `${message}\n\n📷 <a href="${fullImageUrl}">View Screenshot</a>`,
            parse_mode: "HTML",
            disable_web_page_preview: false,
          }),
        });
      }
    } else {
      // Text-only message
      await fetch(`${baseUrl}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      });
    }
  } catch (error) {
    // Never let Telegram failures break the main flow
    console.error("Failed to send Telegram notification:", error);
  }
}
