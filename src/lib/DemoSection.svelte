<script>
  const videoId = 'b4GqJf7ccWI';

  // Silent autoplay loop, no controls — mimics a GIF.
  const previewSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&iv_load_policy=3`;
  // Full player with audio, controls, autoplay (allowed because user-gestured).
  const fullSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&playsinline=1&modestbranding=1`;

  let playing = $state(false);

  function startPlayback() {
    playing = true;
  }
</script>

<section class="demo-section" id="demo">
  <div class="demo-stage">
    <span class="ambient-orb orb-tl" aria-hidden="true"></span>
    <span class="ambient-orb orb-br" aria-hidden="true"></span>

    <article class="demo-card">
      <div class="demo-media" class:playing>
        <div class="media-chrome">
          <span class="rec-dot"></span>
          <span class="rec-label">
            {playing ? 'PLAYING · with audio' : 'PREVIEW · click to play'}
          </span>
        </div>

        <div class="iframe-wrap">
          <iframe
            class="yt-iframe"
            src={playing ? fullSrc : previewSrc}
            title="Walkthrough video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>

        {#if !playing}
          <button
            class="play-overlay"
            onclick={startPlayback}
            type="button"
            aria-label="Play walkthrough with sound"
          >
            <span class="play-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="34" height="34">
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </span>
            <span class="play-label">Play with sound</span>
          </button>
          <div class="media-gradient"></div>
        {/if}
      </div>

      <div class="demo-body">
        <p class="demo-kicker">
          <span class="kicker-dot"></span>
          For the curious
        </p>
        <h2 class="demo-title">
          New here? <em>Watch the walkthrough.</em>
        </h2>
        <p class="demo-copy">
          See exactly how the prompt turns a flat script into one people can't
          scroll past. Or skip the context, the prompt is right below, take it
          and run.
        </p>

        <div class="demo-ctas">
          <button class="cta-primary" type="button" onclick={startPlayback}>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
            {playing ? 'Playing' : 'Play the walkthrough'}
          </button>
          <a class="cta-secondary" href="#prompt">
            Skip, just give me the prompt
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path
                d="M5 12h14m0 0l-5-5m5 5l-5 5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  </div>
</section>

<style>
  .demo-section {
    max-width: 1080px;
    width: 100%;
    margin: 16px auto 8px;
    padding: 24px 32px;
  }

  .demo-stage {
    position: relative;
    isolation: isolate;
  }

  .ambient-orb {
    position: absolute;
    border-radius: 9999px;
    filter: blur(60px);
    pointer-events: none;
    z-index: 0;
  }

  .ambient-orb.orb-tl {
    width: 360px;
    height: 360px;
    top: -100px;
    left: -120px;
    background: radial-gradient(
      circle,
      rgba(121, 173, 248, 0.4) 0%,
      rgba(189, 215, 255, 0) 70%
    );
  }

  .ambient-orb.orb-br {
    width: 420px;
    height: 420px;
    bottom: -80px;
    right: -140px;
    background: radial-gradient(
      circle,
      rgba(215, 231, 254, 0.55) 0%,
      rgba(247, 251, 255, 0) 70%
    );
  }

  .demo-card {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
    gap: 0;
    background: rgba(255, 255, 255, 0.55);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
    border-radius: 32px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.7);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.95) inset,
      0 0 0 1px rgba(189, 215, 255, 0.35),
      0 40px 80px -30px rgba(0, 66, 171, 0.28),
      0 18px 40px -12px rgba(0, 34, 89, 0.16);
  }

  /* Media side */
  .demo-media {
    position: relative;
    aspect-ratio: 16 / 10;
    background: #000;
    overflow: hidden;
  }

  .media-chrome {
    position: absolute;
    top: 14px;
    left: 14px;
    z-index: 4;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px 6px 10px;
    border-radius: 9999px;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 10.5px;
    color: var(--white);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    pointer-events: none;
  }

  .rec-dot {
    width: 7px;
    height: 7px;
    border-radius: 9999px;
    background: #ff4444;
    box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.25);
    animation: rec-pulse 1.6s ease-in-out infinite;
  }

  @keyframes rec-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  /* iframe wrap — tiny crop (110%) hides YouTube's chrome
     without scaling enough to cause visible blur. */
  .iframe-wrap {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .yt-iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 110%;
    height: 110%;
    transform: translate(-50%, -50%);
    border: 0;
    pointer-events: none;
  }

  /* Once the user has clicked play, restore full size + interactivity. */
  .demo-media.playing .yt-iframe {
    width: 100%;
    height: 100%;
    pointer-events: auto;
  }

  /* Top mask hides YouTube's title bar that fades in on hover.
     Bottom mask hides progress bar / control hints. */
  .demo-media:not(.playing)::before,
  .demo-media:not(.playing)::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    z-index: 2;
    pointer-events: none;
  }

  .demo-media:not(.playing)::before {
    top: 0;
    height: 64px;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.55) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  .demo-media:not(.playing)::after {
    bottom: 0;
    height: 90px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.65) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  .media-gradient {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0) 45%,
      rgba(0, 0, 0, 0.35) 100%
    );
    pointer-events: none;
    z-index: 2;
  }

  .play-overlay {
    position: absolute;
    inset: 0;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    background: transparent;
    border: 0;
    cursor: pointer;
    color: var(--white);
    transition: backdrop-filter 0.3s var(--ease-out);
  }

  .play-overlay:hover .play-icon {
    transform: scale(1.06);
    filter: brightness(1.05);
  }

  .play-icon {
    width: 88px;
    height: 88px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.95);
    color: var(--blue-700);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(255, 255, 255, 0.92);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.85) inset,
      0 14px 40px rgba(0, 0, 0, 0.5);
    transition:
      transform 0.25s var(--ease-out),
      filter 0.25s var(--ease-out);
  }

  .play-icon svg {
    margin-left: 5px;
  }

  .play-label {
    display: inline-flex;
    align-items: center;
    padding: 7px 14px;
    border-radius: 9999px;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 12px;
    letter-spacing: -0.2px;
    color: var(--white);
  }

  /* Body side */
  .demo-body {
    padding: 36px 38px 34px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.7) 0%,
      rgba(244, 249, 255, 0.4) 100%
    );
  }

  .demo-kicker {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 11px;
    color: var(--blue-700);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .kicker-dot {
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background: var(--blue-700);
    box-shadow: 0 0 0 3px rgba(38, 112, 220, 0.18);
  }

  .demo-title {
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 30px;
    line-height: 1.1;
    letter-spacing: -0.8px;
    color: var(--navy);
  }

  .demo-title em {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 400;
    color: var(--blue-700);
    letter-spacing: -0.4px;
  }

  .demo-copy {
    font-family: var(--font-sans);
    font-size: 15px;
    line-height: 1.55;
    color: var(--neutral-700);
  }

  .demo-ctas {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 6px;
  }

  .cta-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    height: 46px;
    padding: 0 22px;
    border-radius: 14px;
    background-image: var(--cta-gradient);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: var(--white);
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 14px;
    letter-spacing: -0.4px;
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.3) inset,
      0 8px 22px rgba(0, 66, 171, 0.24);
    transition:
      transform var(--transition),
      filter var(--transition);
    cursor: pointer;
  }

  .cta-primary:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }

  .cta-secondary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    justify-content: center;
    height: 42px;
    padding: 0 18px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(189, 215, 255, 0.5);
    color: var(--navy);
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 13px;
    letter-spacing: -0.3px;
    transition:
      background var(--transition),
      transform var(--transition);
  }

  .cta-secondary:hover {
    background: var(--white);
    transform: translateY(-1px);
  }

  @media (max-width: 880px) {
    .demo-section {
      padding: 16px;
    }
    .demo-card {
      grid-template-columns: 1fr;
    }
    .demo-media {
      aspect-ratio: 16 / 9;
    }
    .demo-body {
      padding: 24px 24px 26px;
    }
    .demo-title {
      font-size: 24px;
    }
  }
</style>
