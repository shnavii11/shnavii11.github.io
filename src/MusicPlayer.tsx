import { useEffect, useRef, useState } from 'react';

const VIDEO_ID = 'lbI9gm5yBEs';
const FALLBACK_TITLE = '佩奇的夏天2021';

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

// Load the YouTube IFrame API once, resolve when ready.
let apiPromise: Promise<void> | null = null;
function loadYT(): Promise<void> {
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev && prev();
      resolve();
    };
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  });
  return apiPromise;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  );
}

export default function MusicPlayer() {
  const holderRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [title, setTitle] = useState(FALLBACK_TITLE);

  useEffect(() => {
    let mounted = true;
    let raf = 0;

    loadYT().then(() => {
      if (!mounted || !holderRef.current || !window.YT) return;
      playerRef.current = new window.YT.Player(holderRef.current, {
        videoId: VIDEO_ID,
        width: '0',
        height: '0',
        playerVars: { playsinline: 1, controls: 0, disablekb: 1, rel: 0 },
        events: {
          onReady: (e: any) => {
            if (!mounted) return;
            setReady(true);
            try {
              const t = e.target.getVideoData()?.title;
              if (t) setTitle(t);
            } catch {
              /* keep fallback title */
            }
          },
          onStateChange: (e: any) => {
            setPlaying(e.data === window.YT.PlayerState.PLAYING);
          },
        },
      });
    });

    const tick = () => {
      const p = playerRef.current;
      if (p && p.getDuration) {
        const d = p.getDuration() || 0;
        const t = p.getCurrentTime() || 0;
        if (d > 0) setProgress(Math.min(1, t / d));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      try {
        playerRef.current?.destroy?.();
      } catch {
        /* noop */
      }
    };
  }, []);

  const toggle = () => {
    const p = playerRef.current;
    if (!p) return;
    if (playing) p.pauseVideo();
    else p.playVideo();
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const p = playerRef.current;
    if (!p || !p.getDuration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    p.seekTo(ratio * (p.getDuration() || 0), true);
  };

  return (
    <div className="player">
      {/* Hidden YouTube audio stream */}
      <div className="player-yt" aria-hidden="true">
        <div ref={holderRef} />
      </div>

      <button
        className="player-btn"
        onClick={toggle}
        disabled={!ready}
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>

      <div className="player-body">
        <div className="player-title">{title}</div>
        <div className="player-bar" onClick={seek} role="slider" aria-label="Seek">
          <div className="player-fill" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
