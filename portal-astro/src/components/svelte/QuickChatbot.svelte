<script lang="ts">
  import { onMount } from 'svelte';

  interface Message {
    id: string;
    role: 'user' | 'assistant';
    text: string;
    time: string;
  }

  let isOpen = $state(false);
  let inputMessage = $state('');
  let isLoading = $state(false);

  let messages = $state<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Halo! Saya asisten virtual resmi SMK Telkom Sidoarjo. Ada yang bisa saya bantu terkait program keahlian SIJA, TJAT, atau informasi PPDB?',
      time: 'Sekarang'
    }
  ]);

  const quickQuestions = [
    'Keunggulan SIJA 4 Tahun',
    'Fokus Keahlian TJAT 3 Tahun',
    'Jalur Pendaftaran PPDB',
    'Fasilitas Laboratorium Sekolah'
  ];

  function toggleOpen() {
    isOpen = !isOpen;
  }

  function formatTime(): string {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}`;
  }

  async function handleSend(textToSend?: string) {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: String(Date.now()),
      role: 'user',
      text: query,
      time: formatTime()
    };
    messages = [...messages, userMsg];
    inputMessage = '';
    isLoading = true;

    try {
      const response = await fetch('http://localhost:8080/api/chatbot/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.map((m) => ({ role: m.role, content: m.text }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data.reply || data.message || 'Informasi berhasil diterima.';
        messages = [
          ...messages,
          {
            id: String(Date.now() + 1),
            role: 'assistant',
            text: replyText,
            time: formatTime()
          }
        ];
      } else {
        fallbackReply(query);
      }
    } catch {
      fallbackReply(query);
    } finally {
      isLoading = false;
    }
  }

  function fallbackReply(query: string) {
    const q = query.toLowerCase();
    let answer = 'Terima kasih atas pertanyaannya. Untuk informasi resmi lebih detail, Anda dapat mengunjungi kampus SMK Telkom Sidoarjo di Jl. Raya Pecantingan, Sekardangan, Sidoarjo.';

    if (q.includes('sija') || q.includes('4 tahun')) {
      answer = 'Jurusan SIJA (Sistem Informasi Jaringan dan Aplikasi) adalah program 4 tahun dengan kurikulum Rekayasa Perangkat Lunak, Database Enterprise, Cloud Computing, dan Keamanan Siber.';
    } else if (q.includes('tjat') || q.includes('telekomunikasi') || q.includes('fiber')) {
      answer = 'Jurusan TJAT (Teknik Jaringan Akses Telekomunikasi) adalah program 3 tahun dengan spesialisasi instalasi kabel serat optik (fiber optic), sistem transmisi seluler, dan jaringan modern.';
    } else if (q.includes('ppdb') || q.includes('daftar')) {
      answer = 'Pendaftaran Peserta Didik Baru (PPDB) SMK Telkom Sidoarjo dibuka melalui beberapa gelombang seleksi. Pendaftaran resmi dapat diakses di ppdb.smktelkom-sda.sch.id.';
    } else if (q.includes('lab') || q.includes('fasilitas')) {
      answer = 'SMK Telkom Sidoarjo dilengkapi Laboratorium Komputer Modern, Lab Fiber Optic berstandar industri, Ruang Server, Ruang Multimedia, dan fasilitas olahraga.';
    }

    messages = [
      ...messages,
      {
        id: String(Date.now() + 1),
        role: 'assistant',
        text: answer,
        time: formatTime()
      }
    ];
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && isOpen) {
      isOpen = false;
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<!-- Floating Toggle Button (Apple Minimalist Pill) -->
<div class="fixed bottom-6 right-6 z-50">
  {#if !isOpen}
    <button
      onclick={toggleOpen}
      class="flex items-center gap-3 px-4 py-3 bg-[#161617]/90 hover:bg-[#1d1d1f] text-[#f5f5f7] rounded-full border border-white/15 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-apple focus:outline-none focus:ring-2 focus:ring-[#E1251B]"
      aria-label="Buka Asisten SKOMDA"
    >
      <span class="relative flex h-2.5 w-2.5">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E1251B] opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E1251B]"></span>
      </span>
      <span class="text-xs font-medium tracking-tight">Tanya SKOMDA</span>
      <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-[#86868b]">Svelte 5</span>
    </button>
  {/if}

  <!-- Apple Translucent Dialog Window -->
  {#if isOpen}
    <div
      class="w-[360px] sm:w-[390px] h-[520px] bg-[#161617]/95 rounded-3xl shadow-2xl border border-white/15 flex flex-col overflow-hidden backdrop-blur-2xl transition-all duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-dialog-title"
    >
      <!-- Header -->
      <div class="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-[#E1251B] text-white font-bold flex items-center justify-center text-xs">
            SK
          </div>
          <div>
            <h3 id="chat-dialog-title" class="text-xs font-semibold text-[#f5f5f7] tracking-tight">
              Asisten Virtual SKOMDA
            </h3>
            <p class="text-[10px] text-[#86868b] flex items-center gap-1.5 mt-0.5">
              <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              Svelte 5 Island &bull; Online
            </p>
          </div>
        </div>

        <button
          onclick={toggleOpen}
          class="p-1.5 text-[#86868b] hover:text-white rounded-full hover:bg-white/10 transition"
          aria-label="Tutup Obrolan"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Messages Area -->
      <div class="flex-1 p-4 overflow-y-auto space-y-3 bg-black/20">
        {#each messages as msg (msg.id)}
          <div class={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div
              class={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#E1251B] text-white rounded-br-xs'
                  : 'bg-[#1d1d1f] text-[#f5f5f7] border border-white/10 rounded-bl-xs'
              }`}
            >
              {msg.text}
            </div>
            <span class="text-[9px] font-mono text-[#86868b] mt-1 px-1">{msg.time}</span>
          </div>
        {/each}

        {#if isLoading}
          <div class="flex items-center gap-1.5 p-3 bg-[#1d1d1f] rounded-2xl w-fit border border-white/10">
            <span class="w-1.5 h-1.5 bg-[#E1251B] rounded-full animate-bounce"></span>
            <span class="w-1.5 h-1.5 bg-[#E1251B] rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span class="w-1.5 h-1.5 bg-[#E1251B] rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </div>
        {/if}
      </div>

      <!-- Suggested Chips (Apple Pills) -->
      <div class="p-2.5 bg-black/40 border-t border-white/5 flex gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
        {#each quickQuestions as q}
          <button
            onclick={() => handleSend(q)}
            class="whitespace-nowrap px-3 py-1 bg-white/5 hover:bg-white/10 text-[#86868b] hover:text-[#f5f5f7] rounded-full border border-white/10 transition shrink-0"
          >
            {q}
          </button>
        {/each}
      </div>

      <!-- Input Bar -->
      <form
        onsubmit={(e) => { e.preventDefault(); handleSend(); }}
        class="p-3 bg-black/50 border-t border-white/10 flex items-center gap-2"
      >
        <input
          type="text"
          bind:value={inputMessage}
          placeholder="Ketik pertanyaan..."
          class="flex-1 px-3.5 py-2 text-xs bg-white/5 border border-white/10 rounded-full text-[#f5f5f7] placeholder-[#86868b] focus:outline-none focus:border-[#E1251B]"
        />
        <button
          type="submit"
          disabled={isLoading || !inputMessage.trim()}
          class="px-3.5 py-2 bg-[#E1251B] hover:bg-[#ff3b30] disabled:opacity-40 text-white rounded-full text-xs font-semibold transition shrink-0"
        >
          Kirim
        </button>
      </form>
    </div>
  {/if}
</div>

<style>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
