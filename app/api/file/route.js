import axios from "axios";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return new Response(JSON.stringify({ error: "Missing video URL" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const response = await axios.get(url, { responseType: "stream" });

    return new Response(response.data, {
      headers: {
        "Content-Disposition": 'attachment; filename="video.mp4"',
        "Content-Type": "video/mp4",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch video" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
