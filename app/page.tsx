"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import "./sidebar.css";
import { apiKeyAtom, modelAtom } from "@/lib/atom";
import { Mermaid } from "@/components/Mermaids";
import { ChatInput } from "@/components/ChatInput";
import { CodeBlock } from "@/components/CodeBlock";
import { ChatMessage } from "@/components/ChatMessage";
import type { Message, RequestBody } from "@/types/type";
import { parseCodeFromMessage } from "@/lib/utils";
import type { OpenAIModel } from "@/types/type";

export default function Home() {
  const [apiKey, setApiKey] = useAtom(apiKeyAtom);
  const [model, setModel] = useAtom(modelAtom);
  const [draftMessage, setDraftMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [draftOutputCode, setDraftOutputCode] = useState<string>("");
  const [outputCode, setOutputCode] = useState<string>("");
  const borderColor = "#e1e1e1"; // Replace with your desired shade of light gray
  const borderRadius = "5px"; // Replace with your desired border radius
  const [isBlockHidden, setIsBlockHidden] = useState(false);


  useEffect(() => {
    const apiKey = localStorage.getItem("apiKey");
    const model = localStorage.getItem("model");

    if (apiKey) {
      
   const hardcodedAPIKey = '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';
      setApiKey(apiKey);
    }
    if (model) {
      setModel(model as OpenAIModel);
    }
  }, []);

  const handleSubmit = async () => {
    if (!apiKey) {
      alert("Please enter an API key.");
      return;
    }

    if (!draftMessage) {
      alert("Please enter a message.");
      return;
    }

    const newMessage: Message = {
      role: "user",
      content: draftMessage,
    };
    const newMessages = [...messages, newMessage].slice(-4);
    setMessages(newMessages);
    
    setDraftMessage("");
    setDraftOutputCode("");

    const controller = new AbortController();
    const body: RequestBody = { messages: newMessages, model, apiKey };

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      alert("Something went wrong.");
      return;
    }

    const data = response.body;

    if (!data) {
      alert("Something went wrong.");
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let code = "";
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      code += chunkValue;
      setDraftOutputCode((prevCode) => prevCode + chunkValue);
    }
    setOutputCode(parseCodeFromMessage(code));
  };

  return (
<div
  className="parent-container"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingLeft: 0,
  }}
>
<main className="container flex-1 flex flex-wrap" style={{ width: '70%' }}>
  <div className="w-full md:w-9/12 mx-auto p-2 flex flex-col" style={{ width: "90%", maxHeight: "800px", paddingRight: "200px" }}>
    <div className="flex-1 flex justify-center relative mr-5 mb-1" style={{ height: "100%", overflowY: "auto", width: "100%", border: "10px solid var(--border-color) !important", borderRadius: "10px !important" }}>
        <Mermaid chart={outputCode} />
    </div>
  </div>

  <div className="flex flex-col justify-end w-full md:w-3/12 flex-row-reverse" style={{ width: '20%', position: 'fixed', top: '100px', right: '10px' }}>
    <div style={{ height: 'calc(100vh - 250px)', border: `1px solid var(--border-color)`, borderRadius: borderRadius, marginBottom: '10px', '--border-color': borderColor, boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }} className="flex-10">
      <CodeBlock code={draftOutputCode} />
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message.content} />
      ))}
    </div>

    <div className="p-50" style={{ paddingBottom: '5px' }}>
      <ChatInput
        messageCotent={draftMessage}
        onChange={setDraftMessage}
        onSubmit={handleSubmit}
      />
    </div>
  </div>
</main>

</div>
  );
}