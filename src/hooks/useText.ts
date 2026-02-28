import { useState } from 'react'
export const useText = (userText: string) => {
  const [text, setText] = useState(userText)

  return { text, setText }
}
