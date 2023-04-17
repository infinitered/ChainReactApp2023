import React, { useEffect } from "react"
import { useHeader } from "../../hooks"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { translate } from "../../i18n"
import { GiftedChat, IMessage } from "react-native-gifted-chat"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { claudePrompt } from "./claude"

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
  const [uuid, setUuid] = React.useState<string | null>(null)

  // also grab messages in AsyncStorage
  const [messages, setMessages] = React.useState<IMessage[]>(INITIAL_MESSAGES)

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
      }
    }
    getMessages()
  }, [])

  function saveMessages(newMessages) {
    setMessages(newMessages)

    // persist to AsyncStorage
    AsyncStorage.setItem("chat/messages", JSON.stringify(newMessages))
  }

  return (
    <>
      {uuid && (
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => {
            const appendedMessages = GiftedChat.append(messages, newMessages)
            saveMessages(appendedMessages)

            // ask Claude for AI response
            // first, build the prompt using the last 40 messages
            const prompt = appendedMessages
              .slice(-40)
              .reverse()
              .map(
                (message) => (message.user._id === uuid ? "Human: " : "Assistant: ") + message.text,
              )
              .join("\n\n")

            // then, ask Claude for a response
            claudePrompt({ prompt, userId: uuid }).then((response) => {
              console.tron.log({ prompt, response })
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
              saveMessages(GiftedChat.append(appendedMessages, [claudeMessage]))
            })
          }}
          user={{
            _id: uuid,
          }}
        />
      )}
    </>
  )
}
