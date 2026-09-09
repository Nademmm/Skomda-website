"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  MessageSquare,
  X,
  Send,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Bot,
  User,
  School,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";

interface ChatSource {
  title: string;
  url: string;
  category?: string;
}

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  sources?: ChatSource[];
  timestamp: string;
  isStreaming?: boolean;
}

const QUICK_PROMPTS = [
  "Apa perbedaan jurusan SIJA (4 tahun) dan TJAT (3 tahun)?",
  "Berapa estimasi biaya hidup dan sewa kos di sekitar sekolah?",
  "Bagaimana alur pendaftaran PPDB 2026/2027?",
  "Sertifikasi internasional apa saja yang didapatkan siswa?",
];

const INITIAL_WELCOME: Message = {
  id: "welcome-1",
  role: "assistant",
  content:
    "Halo! Saya **Skomda AI Assistant**, asisten virtual cerdas resmi SMK Telkom Sidoarjo.\n\nAda yang bisa saya bantu seputar jurusan SIJA & TJAT, alur PPDB 2026/2027, fasilitas laboratorium, rekomendasi kos, atau program unggulan sekolah?",
  timestamp: "Baru saja",
};

export default function SkomdaChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([INITIAL_WELCOME]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Restore chat messages from localStorage on mount (hydration safe)
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem("skomda_chat_messages");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const cleaned = parsed.map((m: Message) => ({ ...m, isStreaming: false }));
          setMessages(cleaned);
        }
      }
      const savedOpen = sessionStorage.getItem("skomda_chat_open");
      if (savedOpen === "true") {
        setIsOpen(true);
      }
    } catch (err) {
      console.warn("[SkomdaChat] Failed to restore chat from localStorage:", err);
    }
  }, []);

  // Persist chat messages to localStorage whenever they change
  useEffect(() => {
    if (!isMounted) return;
    try {
      const toSave = messages.filter((m) => m.content.trim().length > 0 || !m.isStreaming);
      if (toSave.length > 0) {
        localStorage.setItem("skomda_chat_messages", JSON.stringify(toSave));
      }
    } catch (err) {
      console.warn("[SkomdaChat] Failed to save chat to localStorage:", err);
    }
  }, [messages, isMounted]);

  // Persist open/closed state to sessionStorage
  useEffect(() => {
    if (!isMounted) return;
    try {
      sessionStorage.setItem("skomda_chat_open", isOpen ? "true" : "false");
    } catch {}
  }, [isOpen, isMounted]);

  // Auto scroll down smoothly or instantly
  const scrollToBottom = useCallback((smooth = true) => {
    if (scrollContainerRef.current) {
      if (smooth) {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      } else {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(true);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, scrollToBottom]);

  // Keyboard shortcut: ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleCopyText = (id: string, text: string) => {
    const cleanText = text.replace(/<think>[\s\S]*?(<\/think>|$)/gi, "").trim();
    navigator.clipboard.writeText(cleanText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    setInputMessage("");
    setErrorStatus(null);

    const userMsgId = `user-${Date.now()}`;
    const userMsg: Message = {
      id: userMsgId,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const botMsgId = `bot-${Date.now()}`;
    const botPlaceholder: Message = {
      id: botMsgId,
      role: "assistant",
      content: "",
      sources: [],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMsg, botPlaceholder]);
    setIsLoading(true);

    // Initial smooth scroll to show user query
    setTimeout(() => scrollToBottom(true), 50);

    try {
      const historyPayload = messages
        .filter((m) => m.id !== "welcome-1")
        .slice(-6)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const apiBase =
        process.env.NEXT_PUBLIC_API_URL ||
        (typeof window !== "undefined" && window.location.hostname
          ? `http://${window.location.hostname}:8080/api`
          : "http://localhost:8080/api");

      const response = await fetch(`${apiBase}/chatbot/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream, application/json",
        },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server status: ${response.status}`);
      }

      const contentType = response.headers.get("Content-Type") || "";
      if (contentType.includes("text/event-stream") && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = "";
        let collectedSources: ChatSource[] = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const textChunk = decoder.decode(value, { stream: true });
          const lines = textChunk.split("\n");

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith("event: metadata")) {
              continue;
            }
            if (trimmed.startsWith("data:")) {
              const dataStr = trimmed.replace("data:", "").trim();
              if (dataStr === "[DONE]") {
                break;
              }
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.sources && Array.isArray(parsed.sources)) {
                  collectedSources = parsed.sources;
                }
                if (parsed.delta) {
                  accumulatedText += parsed.delta;
                }
                if (parsed.response) {
                  accumulatedText = parsed.response;
                }

                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMsgId
                      ? {
                          ...msg,
                          content: accumulatedText,
                          sources: collectedSources,
                          isStreaming: true,
                        }
                      : msg
                  )
                );

                // Fluid scroll tracking without animation collision
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
                }
              } catch {
                if (dataStr && !dataStr.startsWith("{")) {
                  accumulatedText += dataStr;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === botMsgId ? { ...msg, content: accumulatedText } : msg
                    )
                  );
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
                  }
                }
              }
            }
          }
        }

        // Finalize streaming state
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId
              ? {
                  ...msg,
                  isStreaming: false,
                  sources: collectedSources,
                }
              : msg
          )
        );
        scrollToBottom(true);
      } else {
        // Fallback response JSON non-streaming
        const data = await response.json();
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId
              ? {
                  ...msg,
                  content: data.response || "Terima kasih atas pertanyaannya.",
                  sources: data.sources || [],
                  isStreaming: false,
                }
              : msg
          )
        );
        scrollToBottom(true);
      }
    } catch (err: any) {
      console.warn("[SkomdaChatWidget] Request error, using friendly offline fallback:", err);
      setErrorStatus("Koneksi asisten virtual dialihkan ke kanal informasi sekolah.");

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMsgId
            ? {
                ...msg,
                content:
                  "Mohon maaf, layanan asisten virtual sedang dalam penyesuaian jaringan.\n\nUntuk pertanyaan seputar PPDB 2026/2027 atau konsultasi jurusan SIJA & TJAT, silakan hubungi WhatsApp Humas resmi SMK Telkom Sidoarjo di **0811-3021-919** atau unduh brosur resmi di menu [Unduh Informasi](/unduh-informasi).",
                sources: [
                  {
                    title: "Unduh Informasi & Brosur PPDB",
                    url: "/unduh-informasi",
                    category: "PPDB & Regulasi",
                  },
                ],
                isStreaming: false,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_WELCOME]);
    setErrorStatus(null);
    setInputMessage("");
    try {
      localStorage.removeItem("skomda_chat_messages");
    } catch {}
  };

  return (
    <aside aria-label="Asisten Virtual SMK Telkom Sidoarjo" className="fixed bottom-5 right-5 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Buka Chatbot Asisten Virtual SMK Telkom Sidoarjo"
          className="group relative flex size-14 items-center justify-center rounded-full bg-[#bc0c11] text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#990a0e] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#bc0c11] active:scale-95"
        >
          <div className="relative flex items-center justify-center">
            <MessageSquare className="size-6 transition-transform duration-300 group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-300 opacity-75" />
              <span className="relative inline-flex size-3 rounded-full bg-white" />
            </span>
          </div>
          {/* Hover Tooltip Label */}
          <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-lg bg-[#101828] px-3 py-1.5 font-jakarta text-xs font-medium text-white shadow-md transition-opacity duration-200 sm:block opacity-0 group-hover:opacity-100">
            Tanya Info Sekolah
          </span>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="chatbot-heading"
          className="flex flex-col w-[94vw] sm:w-[440px] h-[600px] max-h-[88vh] rounded-2xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header Panel */}
          <header className="relative flex items-center justify-between px-4 py-3.5 bg-[#bc0c11] text-white select-none">
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-xs border border-white/20">
                <School className="size-5 text-white" />
              </div>
              <div>
                <h2 id="chatbot-heading" className="font-jakarta font-bold text-sm tracking-tight leading-tight text-white">
                  Skomda Assistant
                </h2>
                <p className="font-jakarta text-[11px] text-red-100 flex items-center gap-1.5 mt-0.5">
                  <span className="size-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Aktif
                </p>
              </div>
            </div>

            {/* Header Control Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Bersihkan percakapan"
                aria-label="Bersihkan riwayat percakapan"
                className="flex size-8 items-center justify-center rounded-lg text-red-100 hover:bg-white/15 hover:text-white transition-colors"
              >
                <RotateCcw className="size-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Tutup (Esc)"
                aria-label="Tutup jendela chatbot"
                className="flex size-8 items-center justify-center rounded-lg text-red-100 hover:bg-white/15 hover:text-white transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
          </header>

          {/* Messages Scroll Area */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70 custom-scrollbar text-sm"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#bc0c11]/10 text-[#bc0c11] mt-1 border border-[#bc0c11]/15 shadow-2xs">
                    <Bot className="size-4" />
                  </div>
                )}

                <div
                  className={`flex flex-col max-w-[88%] ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`group relative rounded-2xl px-4 py-3 leading-relaxed break-words text-[13.5px] ${
                      msg.role === "user"
                        ? "bg-[#bc0c11] text-white rounded-br-xs shadow-xs"
                        : "bg-white text-[#101828] rounded-bl-xs border border-slate-200/80 shadow-xs"
                    }`}
                  >
                    {/* Render Content */}
                    {msg.role === "user" ? (
                      <div className="whitespace-pre-wrap font-medium">{msg.content}</div>
                    ) : msg.content ? (
                      <div>
                        <MarkdownRenderer content={msg.content} isStreaming={msg.isStreaming} />
                      </div>
                    ) : msg.isStreaming ? (
                      <div className="flex items-center gap-2.5 py-1 px-0.5 text-slate-500 text-xs">
                        <span className="relative flex size-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                          <span className="relative inline-flex size-2.5 rounded-full bg-[#bc0c11]" />
                        </span>
                        <span className="font-medium animate-pulse text-slate-600">
                          Menyiapkan jawaban resmi SKOMDA...
                        </span>
                      </div>
                    ) : null}

                    {/* Sources Badge List */}
                    {msg.sources && msg.sources.length > 0 && !msg.isStreaming && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-1.5 text-[11px]">
                        <div className="flex items-center gap-1.5 font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                          <School className="size-3 text-[#bc0c11]" />
                          <span>Halaman Terkait:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.sources.map((src, idx) => (
                            <Link
                              key={idx}
                              href={src.url}
                              target={src.url.startsWith("http") ? "_blank" : undefined}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/90 text-slate-800 hover:bg-red-50 hover:text-[#bc0c11] border border-slate-200/70 hover:border-red-200 transition-all font-medium text-xs shadow-2xs"
                            >
                              <span>{src.title}</span>
                              <ExternalLink className="size-2.5 shrink-0 text-[#bc0c11] opacity-75" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Copy Button (Only for assistant messages with content) */}
                    {msg.role === "assistant" && msg.content && !msg.isStreaming && (
                      <button
                        onClick={() => handleCopyText(msg.id, msg.content)}
                        title="Salin isi pesan"
                        aria-label="Salin teks jawaban"
                        className="absolute bottom-2 right-2 p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedId === msg.id ? (
                          <Check className="size-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="size-3.5" />
                        )}
                      </button>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === "user" && (
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-700 mt-1 shadow-2xs">
                    <User className="size-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Quick Suggestion Chips (Only if 1 welcome message present) */}
            {messages.length === 1 && (
              <div className="pt-2">
                <p className="font-jakarta text-xs font-semibold text-slate-500 mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-[#bc0c11]" />
                  Pertanyaan Populer:
                </p>
                <div className="flex flex-col gap-1.5">
                  {QUICK_PROMPTS.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-left font-jakarta text-xs text-slate-700 bg-white hover:bg-red-50/70 hover:text-[#bc0c11] hover:border-[#bc0c11]/30 p-2.5 rounded-xl border border-slate-200/80 transition-all duration-150 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-[#bc0c11]"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Error Notice Bar (if any) */}
          {errorStatus && (
            <div className="px-3 py-1.5 bg-amber-50 border-t border-amber-200 text-amber-800 text-[11px] flex items-center gap-1.5">
              <AlertCircle className="size-3.5 shrink-0 text-amber-600" />
              <span className="truncate">{errorStatus}</span>
            </div>
          )}

          {/* Input Form Section */}
          <footer className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ketik pertanyaan seputar sekolah..."
                disabled={isLoading}
                className="flex-1 min-h-[44px] px-3.5 py-2 text-sm text-[#101828] bg-slate-50 rounded-xl border border-slate-200 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#bc0c11]/30 focus:border-[#bc0c11] transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                aria-label="Kirim pertanyaan"
                className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#bc0c11] text-white hover:bg-[#990a0e] transition-colors disabled:opacity-40 disabled:hover:bg-[#bc0c11] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bc0c11]"
              >
                <Send className="size-4.5" />
              </button>
            </form>
          </footer>
        </div>
      )}
    </aside>
  );
}

// High-Fidelity Markdown Renderer Component
interface MarkdownRendererProps {
  content: string;
  isStreaming?: boolean;
}

function MarkdownRenderer({ content, isStreaming }: MarkdownRendererProps) {
  const cleanContent = content
    .replace(/<think>[\s\S]*?(<\/think>|$)/gi, "")
    .replace(/—/g, " - ")
    .trim();

  return (
    <div className="chat-markdown prose-sm max-w-none text-[13.5px] leading-relaxed text-slate-800 space-y-2">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="mb-2 last:mb-0 leading-relaxed text-slate-800 text-[13.5px]">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-900 tracking-tight">
              {children}
            </strong>
          ),
          h1: ({ children }) => (
            <h4 className="font-jakarta font-bold text-sm text-slate-900 mt-3 mb-1.5 pb-1 border-b border-slate-100 flex items-center gap-1.5 tracking-tight">
              {children}
            </h4>
          ),
          h2: ({ children }) => (
            <h4 className="font-jakarta font-bold text-sm text-slate-900 mt-3 mb-1.5 pb-1 border-b border-slate-100 flex items-center gap-1.5 tracking-tight">
              {children}
            </h4>
          ),
          h3: ({ children }) => (
            <h5 className="font-jakarta font-bold text-[13.5px] text-slate-900 mt-2.5 mb-1 flex items-center gap-1.5 tracking-tight">
              <span className="size-1.5 rounded-full bg-[#bc0c11] inline-block shrink-0" />
              <span>{children}</span>
            </h5>
          ),
          h4: ({ children }) => (
            <h6 className="font-jakarta font-bold text-[13px] text-slate-900 mt-2 mb-1">
              {children}
            </h6>
          ),
          ul: ({ children }) => (
            <ul className="my-2 space-y-1.5 pl-0 text-[13.5px]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-2 space-y-1.5 pl-5 list-decimal text-[13.5px] text-slate-800 marker:text-[#bc0c11] marker:font-semibold">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="flex items-start gap-2 text-slate-800 leading-relaxed text-[13.5px]">
              <span className="size-1.5 rounded-full bg-[#bc0c11]/80 mt-2 shrink-0" />
              <div className="flex-1 min-w-0">{children}</div>
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-2.5 rounded-r-xl border-l-3 border-[#bc0c11] bg-red-50/60 px-3.5 py-2 text-xs text-slate-700 leading-relaxed italic">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-3 w-full overflow-x-auto rounded-xl border border-slate-200/90 bg-white shadow-xs custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-100/90 text-slate-900 font-semibold border-b border-slate-200">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-xs font-semibold text-slate-900 whitespace-nowrap">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-xs text-slate-700 border-b border-slate-100 last:border-0 align-top leading-relaxed">
              {children}
            </td>
          ),
          a: ({ href, children }) => {
            const isExternal = href?.startsWith("http");
            return (
              <Link
                href={href || "#"}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-0.5 font-semibold text-[#bc0c11] underline underline-offset-2 hover:text-[#990a0e] transition-colors"
              >
                <span>{children}</span>
                {isExternal && <ExternalLink className="size-2.5 inline-block ml-0.5 opacity-75" />}
              </Link>
            );
          },
          code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded-md bg-slate-100 text-red-700 font-mono text-xs border border-slate-200/60">
              {children}
            </code>
          ),
          hr: () => <hr className="my-3 border-slate-200/80" />,
        }}
      >
        {cleanContent}
      </ReactMarkdown>

      {/* Typing Blinking Cursor */}
      {isStreaming && (
        <span className="inline-block w-1.5 h-3.5 ml-1 bg-[#bc0c11] rounded-full animate-pulse align-middle" />
      )}
    </div>
  );
}
