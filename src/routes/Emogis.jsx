import { useState } from "react";
import EmojiPicker, { Emoji } from "emoji-picker-react";

const Emogis = () => {
  const [selectedEmoji, setSelectedEmoji] = useState("");

  function onClick(emojiData) {
    setSelectedEmoji(emojiData.unified);
  }

  return (
    <div >
      <div> 
        {selectedEmoji ? <Emoji unified={selectedEmoji} size={62} /> : null}
      </div>

      <EmojiPicker onEmojiClick={onClick} />
    </div>
  );
};

export default Emogis;
