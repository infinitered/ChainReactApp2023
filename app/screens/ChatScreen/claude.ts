import axios from "axios"

export async function claudePrompt({ prompt, userId }: { prompt: string; userId: string }) {
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

    console.tron.logImportant(response)

    return response.data
  } catch (error) {
    return { completion: "Hm, I seem to be having some trouble right now." }
  }
}
