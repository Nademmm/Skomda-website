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
  ArrowDown,
  Trash2,
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

// High-Fidelity LLM Thinking State with soundwave equalizer and progressive reasoning phases
function ThinkingState() {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const phases = [
    "Menganalisis pertanyaan...",
    "Membaca arsip resmi SKOMDA...",
    "Merangkai jawaban terbaik...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhaseIdx((prev) => (prev + 1) % phases.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [phases.length]);

  return (
    <div className="flex flex-col gap-2.5 py-1 px-0.5 min-w-[210px]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-lg bg-red-100/90 text-[#bc0c11]">
            <Sparkles className="size-3.5 animate-pulse" />
          </div>
          <span className="text-xs font-semibold text-slate-700 tracking-tight">
            {phases[phaseIdx]}
          </span>
        </div>

        {/* Soundwave Equalizer Bars */}
        <div className="flex items-center gap-0.5 h-4 px-1.5 py-0.5 rounded-md bg-slate-100 border border-slate-200/80">
          <span className="w-1 bg-[#bc0c11] rounded-full animate-soundwave-1" />
          <span className="w-1 bg-[#bc0c11] rounded-full animate-soundwave-2" />
          <span className="w-1 bg-[#bc0c11] rounded-full animate-soundwave-3" />
          <span className="w-1 bg-[#bc0c11] rounded-full animate-soundwave-4" />
        </div>
      </div>

      {/* Dynamic shimmer line */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200/60">
        <div className="h-full rounded-full animate-shimmer-wave w-full" />
      </div>
    </div>
  );
}

export default function SkomdaChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([INITIAL_WELCOME]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
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

  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const isAutoScrollActiveRef = useRef(true);

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
      isAutoScrollActiveRef.current = true;
      setShowScrollToBottom(false);
    }
  }, []);

  // Track scroll position: if user scrolls up away from bottom, pause auto-scroll
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight <= 60;
    isAutoScrollActiveRef.current = isNearBottom;
    setShowScrollToBottom(!isNearBottom);
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(true);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, scrollToBottom]);

  // Keyboard shortcut: ESC to close dialog or cancel reset
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showResetConfirm) {
          setShowResetConfirm(false);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, showResetConfirm]);

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

      const liveGatewayUrl =
        process.env.NEXT_PUBLIC_NEXUS_ROUTER_URL || "https://fahlyce.vercel.app";

      let response: Response | null = null;

      // 1. Coba hubungi proxy backend lokal terlebih dahulu
      try {
        response = await fetch(`${apiBase}/chatbot/message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream, application/json",
          },
          body: JSON.stringify({
            message: query,
            history: historyPayload,
            stream: true,
            model: "Emberock",
          }),
        });
      } catch (localErr) {
        console.warn("[SkomdaChatWidget] Backend lokal tidak merespons, beralih langsung ke cloud gateway:", localErr);
      }

      // 2. Jika backend lokal tidak aktif atau mengembalikan status error, hubungi langsung gateway cloud Fahlyce
      if (!response || !response.ok) {
        try {
          response = await fetch(`${liveGatewayUrl.replace(/\/+$/, "")}/api/v1/skomda/chat`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Internal-Client": "skomda",
              Accept: "text/event-stream, application/json",
            },
            body: JSON.stringify({
              message: query,
              history: historyPayload,
              stream: true,
              model: "Emberock",
            }),
          });
        } catch (cloudErr) {
          console.error("[SkomdaChatWidget] Cloud gateway error:", cloudErr);
        }
      }

      if (!response || !response.ok) {
        throw new Error(`Server status: ${response ? response.status : "unreachable"}`);
      }

      const contentType = response.headers.get("Content-Type") || "";
      if (contentType.includes("text/event-stream") && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = "";
        let collectedSources: ChatSource[] = [];
        let streamBuffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          streamBuffer += decoder.decode(value, { stream: true });
          const lines = streamBuffer.split("\n");
          // Simpan baris terakhir yang mungkin belum selesai terkirim di dalam buffer
          streamBuffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith("event: metadata")) {
              continue;
            }
            if (trimmed.startsWith("data:")) {
              const dataStr = trimmed.replace(/^data:\s*/, "").trim();
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

                // Fluid scroll tracking without fighting user manual scroll
                if (scrollContainerRef.current && isAutoScrollActiveRef.current) {
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
                  if (scrollContainerRef.current && isAutoScrollActiveRef.current) {
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
        if (isAutoScrollActiveRef.current) {
          scrollToBottom(true);
        }
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

  const handleTriggerReset = () => {
    if (messages.length <= 1) {
      return;
    }
    setShowResetConfirm(true);
  };

  const handleConfirmReset = () => {
    setMessages([INITIAL_WELCOME]);
    setErrorStatus(null);
    setInputMessage("");
    setShowResetConfirm(false);
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
                onClick={handleTriggerReset}
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

          {/* Confirmation Warning Modal before Resetting Chat */}
          {showResetConfirm && (
            <div
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs z-30 flex items-center justify-center p-4 animate-in fade-in duration-150"
              onClick={() => setShowResetConfirm(false)}
            >
              <div
                className="bg-white rounded-2xl p-5 shadow-2xl border border-slate-200/90 max-w-[310px] w-full flex flex-col items-center text-center animate-in zoom-in-95 duration-150"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-[#bc0c11] mb-3 border border-red-100/80 shadow-2xs">
                  <Trash2 className="size-5" />
                </div>
                <h3 className="font-jakarta font-bold text-sm text-slate-900 tracking-tight">
                  Bersihkan Percakapan?
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Seluruh riwayat obrolan dan rekomendasi yang tampil akan dihapus dan kembali ke percakapan awal.
                </p>
                <div className="flex items-center gap-2 w-full mt-4">
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 py-2 px-3 rounded-xl border border-slate-200/90 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmReset}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#bc0c11] text-white text-xs font-semibold hover:bg-[#990a0e] transition-colors shadow-xs active:scale-95 cursor-pointer"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70 custom-scrollbar text-sm relative"
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
                    className={`rounded-2xl px-4 py-3 leading-relaxed break-words text-[13.5px] ${
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
                      <ThinkingState />
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
                  </div>

                  {/* Assistant Message Footer with Timestamp & Dedicated Copy Button (No Overlap) */}
                  <div className="flex items-center justify-between w-full text-[11px] text-slate-400 mt-1 px-1">
                    <div className="flex items-center gap-1.5">
                      <span>{msg.timestamp}</span>
                      {msg.role === "assistant" && !msg.isStreaming && (
                        <>
                          <span className="text-slate-300">·</span>
                          <span className="text-[10px] text-slate-500 font-medium">SKOMDA AI</span>
                        </>
                      )}
                    </div>

                    {msg.role === "assistant" && msg.content && !msg.isStreaming && (
                      <button
                        onClick={() => handleCopyText(msg.id, msg.content)}
                        title="Salin isi pesan"
                        aria-label="Salin teks jawaban"
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-[#bc0c11] py-0.5 px-1.5 rounded-md hover:bg-slate-200/70 active:scale-95 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#bc0c11]"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="size-3 text-emerald-600" />
                            <span className="text-emerald-600 font-semibold">Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3 text-slate-400" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
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

            {/* Floating Jump-to-Bottom Pill when user scrolls up during typing or reading */}
            {showScrollToBottom && (
              <div className="sticky bottom-2 flex justify-center z-10 pointer-events-none">
                <button
                  type="button"
                  onClick={() => scrollToBottom(true)}
                  className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-slate-700 text-xs font-semibold shadow-md border border-slate-200/90 hover:bg-red-50 hover:text-[#bc0c11] hover:border-red-200 transition-all active:scale-95 cursor-pointer"
                >
                  <ArrowDown className="size-3.5 text-[#bc0c11]" />
                  <span>Ke pesan terbaru</span>
                </button>
              </div>
            )}
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
        <span className="inline-block w-0.5 h-4 ml-1 bg-[#bc0c11] rounded-full animate-typing-cursor align-text-bottom shadow-xs" />
      )}
    </div>
  );
}
