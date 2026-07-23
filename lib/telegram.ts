/**
 * Send a notification to Telegram with optional image attachment.
 * Supports standard HTTP URLs and Base64 Data URLs.
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
      // Case 1: Base64 Data URL
      if (imageUrl.startsWith("data:image/")) {
        const matches = imageUrl.match(/^data:(image\/\w+);base64,(.+)$/);
        if (matches) {
          const mimeType = matches[1];
          const base64Data = matches[2];
          const buffer = Buffer.from(base64Data, "base64");
          const blob = new Blob([buffer], { type: mimeType });

          const formData = new FormData();
          formData.append("chat_id", chatId);
          formData.append("photo", blob, `screenshot.${mimeType.split("/")[1] || "png"}`);
          formData.append("caption", message);
          formData.append("parse_mode", "HTML");

          const photoRes = await fetch(`${baseUrl}/sendPhoto`, {
            method: "POST",
            body: formData,
          });

          const photoData = await photoRes.json();
          if (photoData.ok) return;
          console.warn("Telegram sendPhoto (base64) failed:", photoData.description);
        }
      } else {
        // Case 2: Standard HTTP URL
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const fullImageUrl = imageUrl.startsWith("http") ? imageUrl : `${appUrl}${imageUrl}`;

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
        if (photoData.ok) return;
        console.warn("Telegram sendPhoto (URL) failed:", photoData.description);
      }

      // Fallback: Send text message if photo failed
      await fetch(`${baseUrl}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      });
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
    console.error("Failed to send Telegram notification:", error);
  }
}
