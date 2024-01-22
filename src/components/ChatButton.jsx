import { Button } from "@/shadcn/components/ui/button";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

export default function ChatButton({ setChatIsOpen, setSelectedChat }) {
  const handleClick = () => {
    setSelectedChat(null);
    setChatIsOpen((prev) => !prev);
  };
  return (
    <Button
      variant="outline"
      size="icon"
      className="h-16 bg-primary text-background w-16 fixed bottom-12 right-[224px] rounded-full p-2.5"
      onClick={handleClick}
    >
      <ChatBubbleIcon className="h-8 w-8" />
    </Button>
  );
}
