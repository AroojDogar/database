
"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
};

const getTime = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const quickQuestions = [
  "What account types are available?",
  "How can I apply for a loan?",
  "What are your banking hours?",
  "How do I get a debit card?",
];

const rules = [
  {
    keywords: ["hello", "hi", "hey", "salam"],
    response:
      "Hello! Welcome to BankAssist. I can help you with account types, loans, debit cards, branch hours, and general banking information.",
  },
  {
    keywords: ["account", "accounts", "saving", "current"],
    response:
      "Our demo bank offers Savings Accounts and Current Accounts. Savings accounts are generally designed for saving money, while current accounts support frequent transactions. Specific requirements depend on the bank's policies.",
  },
  {
    keywords: ["loan", "loans", "financing"],
    response:
      "To apply for a loan, customers generally need to review eligibility requirements, provide identification and income documents, and submit an application. Approval depends on the bank's assessment.",
  },
  {
    keywords: ["hours", "timing", "timings", "open", "branch"],
    response:
      "Branch operating hours vary by location and bank policy. This demonstration does not yet contain verified branch schedules.",
  },
  {
    keywords: ["card", "debit", "atm"],
    response:
      "Debit cards allow eligible account holders to access funds for purchases and ATM withdrawals. Card availability, fees, and limits depend on the bank.",
  },
  {
    keywords: ["thank", "thanks"],
    response:
      "You're welcome! Feel free to ask another banking-related question.",
  },
];

function getReply(message: string): string {
  const normalized = message
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = new Set(normalized.split(" "));

  const matchedRule = rules.find((rule) =>
    rule.keywords.some((keyword) => words.has(keyword))
  );

  return (
    matchedRule?.response ??
    "I couldn't find a matching answer. Please ask about accounts, loans, debit cards, or branch hours."
  );
}

const initialMessage = (): Message => ({
  id: 1,
  role: "assistant",
  content:
    "Welcome to BankAssist! I'm your virtual banking information assistant. How can I help you today?",
  time: getTime(),
});

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    initialMessage(),
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  function sendMessage(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const userMessage: Message = {
      id: nextId.current++,
      role: "user",
      content,
      time: getTime(),
    };

    const botMessage: Message = {
      id: nextId.current++,
      role: "assistant",
      content: getReply(content),
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    window.setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 500);
  }

  function resetChat() {
    nextId.current = 2;
    setMessages([initialMessage()]);
    setInput("");
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#102b4e] text-xl font-bold text-white">
              B
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                BankAssist
              </h1>
              <p className="text-xs text-slate-500">
                Banking Information Assistant
              </p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
            ● Assistant Online
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-9">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-emerald-700">
            DIGITAL BANKING SUPPORT
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Banking support, simplified.
          </h2>
          <p className="mt-3 max-w-2xl text-slate-500">
            Explore banking services and get instant answers
            through our rule-based virtual assistant.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="space-y-5">
            <div className="rounded-2xl bg-[#102b4e] p-6 text-white shadow-sm">
              <div className="mb-4 text-3xl">▣</div>
              <h3 className="text-xl font-semibold">
                How can we help?
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Get information about everyday banking
                products and services.
              </p>
              <div className="mt-6 border-t border-white/20 pt-4 text-xs text-slate-300">
                Available 24/7 for general information
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-4 font-semibold">
                Popular Questions
              </h3>

              <div className="space-y-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => sendMessage(question)}
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 p-3 text-left text-sm text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 disabled:opacity-50"
                  >
                    {question}
                    <span className="ml-2 text-emerald-600">
                      ↗
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold">Security Notice</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Never share your PIN, password, OTP,
                or complete card details in this chat.
              </p>
            </div>
          </aside>

          <div className="flex h-162.5 min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
                  B
                </div>
                <div>
                  <h3 className="font-semibold">
                    BankAssist Virtual Assistant
                  </h3>
                  <p className="text-xs text-emerald-600">
                    ● Ready to help
                  </p>
                </div>
              </div>

              <button
                onClick={resetChat}
                disabled={loading}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                New Chat
              </button>
            </div>

            <div
              className="min-h-0 flex-1 space-y-5 overflow-y-auto bg-[#fafbfd] p-5 md:p-7"
              aria-live="polite"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-7 shadow-sm ${
                      message.role === "user"
                        ? "rounded-br-sm bg-[#102b4e] text-white"
                        : "rounded-bl-sm border border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <p
                      className={`mt-2 text-right text-[10px] ${
                        message.role === "user"
                          ? "text-slate-300"
                          : "text-slate-400"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-500">
                    Assistant is typing...
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage(input);
              }}
              className="border-t border-slate-100 bg-white p-4 md:p-5"
            >
              <div className="flex gap-3">
                <input
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value)
                  }
                  placeholder="Ask a banking question..."
                  aria-label="Your banking question"
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send
                </button>
              </div>

              <p className="mt-3 text-center text-[11px] text-slate-400">
                Demo banking assistant • Rule-based responses
                • No live banking access
              </p>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} BankAssist.
        Educational demonstration only.
      </footer>
    </main>
  );
}
