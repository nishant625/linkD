import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.query;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing video URL" });
  }

  try {
    // Fetch the video from the CDN
    const response = await axios.get(url, { responseType: "stream" });

    // Set headers to force download
    res.setHeader("Content-Disposition", 'attachment; filename="video.mp4"');
    res.setHeader("Content-Type", "video/mp4");

    // Pipe the video stream to the response
    response.data.pipe(res);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch video" });
  }
}
