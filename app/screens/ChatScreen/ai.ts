import axios from "axios"
import { reportCrash } from "../../utils/crashReporting"

export async function aiPrompt({ prompt, userId }: { prompt: string; userId: string }) {
  try {
    const response = await axios.post<{ completion: string }>(
      // "http://localhost:3000/api/claude",
      "https://chain-react-ai-chat.vercel.app/api/claude",
      {
        prompt,
        userId,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      },
    )

    return response.data
  } catch (error) {
    reportCrash(error)
    return { completion: "Hm, I seem to be having some trouble right now." }
  }
}
