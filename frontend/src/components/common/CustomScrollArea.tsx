"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

interface CustomScrollAreaProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  maxHeight?: string | number;
  showScrollHint?: boolean;
}

export default function CustomScrollArea({
  children,
  className = "",
  contentClassName = "",
  maxHeight,
  showScrollHint = true,
}: CustomScrollAreaProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const [hasScroll, setHasScroll] = useState(false);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);

  const dragStartY = useRef(0);
  const dragStartScrollTop = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Recalculate thumb dimensions and position
  const updateMetrics = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const { clientHeight, scrollHeight, scrollTop } = viewport;

    const canScroll = scrollHeight > clientHeight + 2;
    setHasScroll(canScroll);

    setShowTopShadow(scrollTop > 10);
    setShowBottomShadow(scrollTop < scrollHeight - clientHeight - 10);

    if (!canScroll) {
      setThumbHeight(0);
      setThumbTop(0);
      return;
    }

    const track = trackRef.current;
    const trackHeight = track ? track.clientHeight : Math.max(clientHeight - 16, 40);

    const minThumb = 36;
    const calculatedHeight = Math.max(
      Math.round((clientHeight / scrollHeight) * trackHeight),
      minThumb
    );
    setThumbHeight(calculatedHeight);

    const maxScroll = scrollHeight - clientHeight;
    const maxThumbTop = trackHeight - calculatedHeight;
    const currentThumbTop = maxScroll > 0 ? (scrollTop / maxScroll) * maxThumbTop : 0;
    setThumbTop(currentThumbTop);
  }, []);

  // Sync metrics on mount, resize, and content change
  useEffect(() => {
    updateMetrics();

    const viewport = viewportRef.current;
    if (!viewport) return;

    const resizeObserver = new ResizeObserver(() => {
      updateMetrics();
    });

    resizeObserver.observe(viewport);
    if (viewport.firstElementChild) {
      resizeObserver.observe(viewport.firstElementChild);
    }

    // Also run after layout settlement
    const timer = setTimeout(updateMetrics, 80);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [updateMetrics]);

  // Handle scroll events
  const handleScroll = () => {
    updateMetrics();

    setIsScrolling(true);
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 900);
  };

  // Drag thumb handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const viewport = viewportRef.current;
    if (!viewport) return;

    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartScrollTop.current = viewport.scrollTop;
  };

  // Global pointer move and up listeners while dragging thumb
  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMoveWindow = (e: PointerEvent) => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;

      const deltaY = e.clientY - dragStartY.current;
      const trackHeight = track.clientHeight;
      const maxThumbTop = trackHeight - thumbHeight;
      const maxScroll = viewport.scrollHeight - viewport.clientHeight;

      if (maxThumbTop <= 0) return;

      const scrollDelta = (deltaY / maxThumbTop) * maxScroll;
      viewport.scrollTop = dragStartScrollTop.current + scrollDelta;
    };

    const handlePointerUpWindow = () => {
      setIsDragging(false);
      document.body.style.userSelect = "";
    };

    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", handlePointerMoveWindow);
    window.addEventListener("pointerup", handlePointerUpWindow);
    window.addEventListener("pointercancel", handlePointerUpWindow);

    return () => {
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", handlePointerMoveWindow);
      window.removeEventListener("pointerup", handlePointerUpWindow);
      window.removeEventListener("pointercancel", handlePointerUpWindow);
    };
  }, [isDragging, thumbHeight]);

  // Click on track to jump
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const rect = track.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const trackHeight = track.clientHeight;
    const maxThumbTop = trackHeight - thumbHeight;
    const maxScroll = viewport.scrollHeight - viewport.clientHeight;

    if (maxThumbTop <= 0) return;

    const targetThumbTop = Math.max(0, Math.min(clickY - thumbHeight / 2, maxThumbTop));
    viewport.scrollTop = (targetThumbTop / maxThumbTop) * maxScroll;
  };

  return (
    <div
      className={`relative overflow-hidden flex flex-col ${className}`}
      style={maxHeight ? { maxHeight } : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top subtle shadow fade hint */}
      {showScrollHint && (
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-6 z-20 transition-opacity duration-200 bg-gradient-to-b from-white via-white/80 to-transparent ${
            hasScroll && showTopShadow ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
      )}

      {/* Scrollable Viewport with hidden browser scrollbars */}
      <div
        ref={viewportRef}
        onScroll={handleScroll}
        tabIndex={0}
        role="region"
        aria-label="Konten yang dapat digulir"
        className={`w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-none overscroll-contain focus:outline-none ${contentClassName}`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>

      {/* Bottom subtle shadow fade hint */}
      {showScrollHint && (
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-6 z-20 transition-opacity duration-200 bg-gradient-to-t from-white via-white/80 to-transparent ${
            hasScroll && showBottomShadow ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
      )}

      {/* Custom Handcrafted Scrollbar Track & Thumb */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        className={`absolute top-2 bottom-2 right-1.5 w-1.5 sm:w-2 z-30 transition-all duration-300 rounded-full select-none ${
          hasScroll
            ? isHovered || isDragging
              ? "opacity-100 bg-gray-200/70 backdrop-blur-xs cursor-pointer"
              : "opacity-100 bg-gray-100/60 hover:bg-gray-200/60 cursor-pointer"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      >
        {/* Custom Draggable Thumb */}
        {hasScroll && (
          <div
            ref={thumbRef}
            onPointerDown={handlePointerDown}
            style={{
              height: `${thumbHeight}px`,
              transform: `translateY(${thumbTop}px)`,
            }}
            role="scrollbar"
            aria-controls="scrollable-content"
            aria-orientation="vertical"
            aria-valuenow={Math.round((thumbTop / (trackRef.current?.clientHeight || 1)) * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            className={`w-full rounded-full transition-all duration-150 cursor-grab active:cursor-grabbing origin-center ${
              isDragging
                ? "bg-[#bc0c11] scale-x-125 shadow-[0_0_12px_rgba(188,12,17,0.5)]"
                : isHovered
                ? "bg-gradient-to-b from-[#bc0c11] to-[#990a0e] shadow-[0_0_8px_rgba(188,12,17,0.35)]"
                : isScrolling
                ? "bg-[#bc0c11]/85 shadow-[0_0_6px_rgba(188,12,17,0.25)]"
                : "bg-slate-300/85 hover:bg-[#bc0c11]"
            }`}
          />
        )}
      </div>
    </div>
  );
}
