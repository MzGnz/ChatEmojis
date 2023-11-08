import EmojiPicker from "emoji-picker-react";

export const EmojiMenuPicker = ({ onClick }) => {
  return <EmojiPicker onEmojiClick={(emojiData) => onClick(emojiData.emoji)} />
}