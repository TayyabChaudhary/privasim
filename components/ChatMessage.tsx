// Error from OpenAI!
import { User } from "lucide-react";

interface ChatMessageProps {
  message: string;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
<div className="group w-full text-gray-500" style={{ marginBottom: '10px', padding: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2) !important' }}>
  <div className="text-sm gap-5 md:gap-1 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-1 md:py-1 flex lg:px-0 m-auto">
    <div className="w-[30px] flex flex-col relative items-end">
      <div className="flex">
        <User className="h-5 w-5" />
      </div>
    </div>
    <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-30 lg:w-[calc(200%-115px)]">
      <div className="flex flex-grow flex-col gap-0.001">
        <div
          className="min-h-[0px] flex flex-col items-start gap-0 whitespace-pre-wrap px-0"
          key={message}
        >
          {message}
        </div>
      </div>
      <div className="flex justify-between lg:block" />
    </div>
  </div>
</div>


  );
}


