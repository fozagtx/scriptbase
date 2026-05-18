<script>
  const videoId = 'jqdEqfHD22A';
  const thumbHd = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const thumbFallback = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  function handleImgError(e) {
    if (e.target.src !== thumbFallback) {
      e.target.src = thumbFallback;
    }
  }
</script>

<section class="hero" id="video">
  <div class="hero-copy">
    <h1 class="hero-title">
      Discover how top creators<br />
      <em>make great content.</em>
    </h1>
    <p class="hero-sub">
      An AI workflow that turns Claude or ChatGPT into a storytelling coach,
      built from the principles top creators actually use.
    </p>

    <div class="hero-cta-row">
      <a class="hero-cta" href="#prompt">
        Get the prompt
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path
            d="M4 12h14m0 0l-6-6m6 6l-6 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          />
        </svg>
      </a>
      <a class="hero-secondary" href="https://youtu.be/{videoId}" target="_blank" rel="noopener noreferrer">
        Watch the source
      </a>
    </div>
  </div>

  <a
    class="video-frame"
    href="https://youtu.be/{videoId}"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Open reference video on YouTube"
  >
    <img
      class="video-thumb"
      src={thumbHd}
      alt="Reference video thumbnail"
      loading="lazy"
      on:error={handleImgError}
    />
    <div class="video-overlay"></div>

    <div class="video-frame-chrome">
      <div class="chrome-dots">
        <span></span><span></span><span></span>
      </div>
      <div class="chrome-url">youtu.be/{videoId}</div>
    </div>

    <div class="play-button" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="32" height="32">
        <path d="M8 5v14l11-7z" fill="currentColor" />
      </svg>
    </div>

    <div class="video-meta">
      <span class="video-dot"></span>
      <span class="video-label">Source · YouTube</span>
    </div>
  </a>
</section>

<style>
  .hero {
    max-width: 1320px;
    width: 100%;
    margin: 24px auto 0;
    padding: 48px 32px 32px;
    display: grid;
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.3fr);
    gap: 64px;
    align-items: center;
  }

  .kicker {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 12px;
    color: var(--blue-700);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .kicker::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background: var(--blue-700);
    box-shadow: 0 0 0 3px rgba(38, 112, 220, 0.18);
  }

  .hero-title {
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: clamp(40px, 5.5vw, 64px);
    line-height: 1.04;
    letter-spacing: -1.2px;
    color: var(--navy);
    margin-bottom: 20px;
  }

  .hero-title em {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 400;
    color: var(--blue-700);
    letter-spacing: -0.5px;
  }

  .hero-sub {
    font-family: var(--font-sans);
    font-size: 17px;
    line-height: 1.55;
    color: var(--neutral-700);
    max-width: 520px;
    margin-bottom: 28px;
  }

  .hero-stats {
    display: inline-flex;
    align-items: center;
    gap: 18px;
    padding: 14px 20px;
    background: rgba(255, 255, 255, 0.55);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(189, 215, 255, 0.4);
    border-radius: 16px;
    box-shadow: var(--shadow-search);
    margin-bottom: 28px;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }

  .stat-num {
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 22px;
    color: var(--navy);
    line-height: 1;
  }

  .stat-label {
    font-family: var(--font-sans);
    font-size: 11px;
    color: var(--neutral-600);
    line-height: 1.2;
  }

  .stat-divider {
    width: 1px;
    height: 24px;
    background: var(--neutral-300);
  }

  .hero-cta-row {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }

  .hero-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 48px;
    padding: 0 22px;
    border-radius: 16px;
    background-image: var(--cta-gradient);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--white);
    font-weight: 600;
    font-size: 15px;
    letter-spacing: -0.5px;
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.3) inset,
      0 8px 24px rgba(0, 66, 171, 0.2);
    transition:
      transform var(--transition),
      filter var(--transition);
  }

  .hero-cta:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }

  .hero-secondary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 48px;
    padding: 0 18px;
    border-radius: 16px;
    background: var(--white);
    border: 1px solid rgba(0, 37, 97, 0.06);
    color: var(--blue-700);
    font-weight: 600;
    font-size: 14px;
    transition: transform var(--transition);
  }

  .hero-secondary:hover {
    transform: translateY(-1px);
  }

  /* Video frame */
  .video-frame {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 16 / 10;
    border-radius: 28px;
    overflow: hidden;
    background: var(--skeleton);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.8) inset,
      0 30px 80px -20px rgba(0, 66, 171, 0.3),
      0 12px 40px -8px rgba(0, 34, 89, 0.2);
    transition:
      transform var(--transition),
      box-shadow var(--transition);
    cursor: pointer;
  }

  .video-frame:hover {
    transform: translateY(-2px);
  }

  .video-frame:hover .play-button {
    transform: translate(-50%, -50%) scale(1.06);
  }

  .video-thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s var(--ease-out);
  }

  .video-frame:hover .video-thumb {
    transform: scale(1.02);
  }

  .video-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 34, 89, 0.05) 0%,
      rgba(0, 34, 89, 0) 30%,
      rgba(0, 34, 89, 0) 60%,
      rgba(0, 34, 89, 0.5) 100%
    );
    pointer-events: none;
  }

  .video-frame-chrome {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 42px;
    padding: 0 18px;
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(189, 215, 255, 0.4);
  }

  .chrome-dots {
    display: inline-flex;
    gap: 6px;
  }

  .chrome-dots span {
    width: 9px;
    height: 9px;
    border-radius: 9999px;
    background: var(--neutral-300);
  }

  .chrome-dots span:first-child {
    background: #ff6568;
  }

  .chrome-dots span:nth-child(2) {
    background: #f7c365;
  }

  .chrome-dots span:nth-child(3) {
    background: var(--success);
  }

  .chrome-url {
    flex: 1;
    text-align: center;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--neutral-700);
    letter-spacing: 0;
  }

  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 104px;
    height: 104px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.95);
    color: var(--blue-700);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 2px solid rgba(255, 255, 255, 0.9);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.8) inset,
      0 14px 32px rgba(0, 66, 171, 0.3);
    transition: transform 0.25s var(--ease-out);
  }

  .play-button svg {
    margin-left: 5px;
    width: 36px;
    height: 36px;
  }

  .video-meta {
    position: absolute;
    bottom: 14px;
    left: 14px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(189, 215, 255, 0.4);
    color: var(--navy);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.3px;
  }

  .video-dot {
    width: 8px;
    height: 8px;
    border-radius: 9999px;
    background: var(--success);
    box-shadow: 0 0 0 3px rgba(13, 222, 83, 0.18);
  }

  @media (max-width: 980px) {
    .hero {
      grid-template-columns: 1fr;
      gap: 36px;
      padding: 24px 16px;
    }
  }

  @media (max-width: 540px) {
    .hero-stats {
      gap: 12px;
      padding: 12px 14px;
    }
    .stat-num {
      font-size: 18px;
    }
    .play-button {
      width: 64px;
      height: 64px;
    }
  }
</style>
