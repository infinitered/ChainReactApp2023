import React, { useEffect, useState } from "react"
import { useHeader } from "../../hooks"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { translate } from "../../i18n"
import { GiftedChat, IMessage } from "react-native-gifted-chat"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { aiPrompt } from "./ai"

const NUMBER_OF_MESSAGES_TO_SEND = 8
const chatbotAvatarURL =
  "https://pbs.twimg.com/profile_images/1638277840352456704/g7sdYc76_400x400.jpg"
const chatbotName = "Chain React Bot"

const INITIAL_MESSAGES: IMessage[] = [
  {
    _id: 1,
    text: `Hello there! I'm ${chatbotName}. How can I help you with questions about the Chain React conference and the surrounding Portland area?`,
    createdAt: new Date(),
    user: {
      _id: 2,
      name: chatbotName,
      avatar: chatbotAvatarURL,
    },
  },
]

export const ChatScreen: React.FunctionComponent<TabScreenProps<"Chat">> = () => {
  useHeader({
    title: translate("chatScreen.title"),
    rightTx: "chatScreen.reset",
    onRightPress: () => {
      AsyncStorage.removeItem("chat/messages")
      setMessages(INITIAL_MESSAGES)
    },
  })

  // generate a user-specific uuid if it isn't already in AsyncStorage
  const [uuid, setUuid] = useState<string | null>(null)

  // show a "typing" indicator when Claude is responding -- initially true
  const [typingIndicator, setTypingIndicator] = useState(true)

  // also grab messages in AsyncStorage
  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    const getUuid = async () => {
      const uuid = await AsyncStorage.getItem("chat/uuid")
      if (uuid) {
        setUuid(uuid)
      } else {
        // generate a random string
        const uuid =
          Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        await AsyncStorage.setItem("chat/uuid", uuid)
        setUuid(uuid)
      }
    }
    getUuid()

    const getMessages = async () => {
      const messages = await AsyncStorage.getItem("chat/messages")
      if (messages) {
        setMessages(JSON.parse(messages))
      } else {
        setMessages(INITIAL_MESSAGES)
      }

      setTypingIndicator(false)
    }
    getMessages()
  }, [])

  async function saveMessages(messagesCallback: (old: IMessage[]) => IMessage[]) {
    let newMessages = []
    setMessages((old) => {
      newMessages = messagesCallback(old)
      return newMessages
    })

    // console.log("saving messages", newMessages)

    // persist to AsyncStorage
    AsyncStorage.setItem("chat/messages", JSON.stringify(newMessages))
  }

  return (
    <>
      {uuid && (
        <GiftedChat
          messages={messages}
          isTyping={typingIndicator}
          onSend={async (newMessages) => {
            const appendedMessages = [
              ...newMessages.map((message) => ({ ...message, _id: Date.now() })),
              ...messages,
            ]
            saveMessages(() => appendedMessages)
            setTypingIndicator(true)

            // ask Claude for AI response
            // first, build the prompt using the last 15 messages
            const prompt = appendedMessages
              .slice(0, NUMBER_OF_MESSAGES_TO_SEND)
              .reverse()
              .map(
                (message) => (message.user._id === uuid ? "Human: " : "Assistant: ") + message.text,
              )
              .join("\n\n")

            // turn on the GiftedChat "typing" indicator
            // then, ask Claude for a response
            const response = await aiPrompt({ prompt, userId: uuid })
            const claudeMessage = {
              _id: Date.now(),
              text: response.completion.trim(),
              createdAt: new Date(),
              user: {
                _id: 2,
                name: chatbotName,
                avatar: chatbotAvatarURL,
              },
            }
            setTypingIndicator(false)
            saveMessages(() => [claudeMessage, ...appendedMessages])
          }}
          user={{
            _id: uuid,
          }}
          textInputProps={{
            testID: "aiChatInput",
          }}
        />
      )}
    </>
  )
}
