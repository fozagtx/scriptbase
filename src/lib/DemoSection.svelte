<script>
  let imgLoaded = $state(false);
  let imgFailed = $state(false);

  function onLoad() {
    imgLoaded = true;
  }

  function onError() {
    imgFailed = true;
  }
</script>

<section class="demo-section" id="demo">
  <div class="demo-stage">
    <span class="ambient-orb orb-tl" aria-hidden="true"></span>
    <span class="ambient-orb orb-br" aria-hidden="true"></span>

    <article class="demo-card">
      <div class="demo-media" class:loaded={imgLoaded} class:failed={imgFailed}>
        <div class="media-chrome">
          <span class="rec-dot"></span>
          <span class="rec-label">DEMO · 60s walkthrough</span>
        </div>

        <img
          class="demo-gif"
          src="/demo.gif"
          alt="Quick walkthrough of the storytelling prompt in action"
          loading="lazy"
          on:load={onLoad}
          on:error={onError}
        />

        {#if !imgLoaded || imgFailed}
          <div class="demo-placeholder" aria-hidden="true">
            <div class="placeholder-grid"></div>
            <div class="placeholder-center">
              <div class="placeholder-icon">
                <svg viewBox="0 0 24 24" width="32" height="32">
                  <path
                    d="M8 5v14l11-7z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p class="placeholder-text">
                Drop your demo GIF at
                <code>/public/demo.gif</code>
              </p>
            </div>
          </div>
        {/if}

        <div class="media-overlay"></div>
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
          <a
            class="cta-primary"
            href="https://youtu.be/jqdEqfHD22A"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
            Watch the walkthrough
          </a>
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
    aspect-ratio: 4 / 3;
    background: linear-gradient(135deg, #0a1e3d 0%, #002259 100%);
    overflow: hidden;
  }

  .media-chrome {
    position: absolute;
    top: 14px;
    left: 14px;
    z-index: 3;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px 6px 10px;
    border-radius: 9999px;
    background: rgba(0, 34, 89, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 11px;
    color: var(--white);
    letter-spacing: 0.04em;
    text-transform: uppercase;
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

  .demo-gif {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.4s var(--ease-out);
    z-index: 1;
  }

  .demo-media.loaded:not(.failed) .demo-gif {
    opacity: 1;
  }

  .demo-placeholder {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    background:
      radial-gradient(
        circle at 30% 20%,
        rgba(121, 173, 248, 0.25) 0%,
        rgba(0, 34, 89, 0) 50%
      ),
      radial-gradient(
        circle at 70% 80%,
        rgba(38, 112, 220, 0.2) 0%,
        rgba(0, 34, 89, 0) 50%
      );
  }

  .placeholder-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size: 32px 32px;
    mask-image: radial-gradient(circle at center, black 0%, transparent 80%);
    -webkit-mask-image: radial-gradient(circle at center, black 0%, transparent 80%);
  }

  .placeholder-center {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    text-align: center;
    padding: 20px;
  }

  .placeholder-icon {
    width: 72px;
    height: 72px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.95);
    color: var(--blue-700);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(255, 255, 255, 0.9);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.8) inset,
      0 14px 32px rgba(0, 0, 0, 0.3);
  }

  .placeholder-icon svg {
    margin-left: 4px;
  }

  .placeholder-text {
    font-family: var(--font-sans);
    font-size: 12px;
    color: rgba(255, 255, 255, 0.65);
    letter-spacing: -0.2px;
    max-width: 240px;
    line-height: 1.5;
  }

  .placeholder-text code {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--white);
    background: rgba(255, 255, 255, 0.12);
    padding: 1px 6px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .media-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(0, 34, 89, 0) 80%,
      rgba(255, 255, 255, 0.4) 100%
    );
    pointer-events: none;
    z-index: 2;
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
      aspect-ratio: 16 / 10;
    }
    .demo-body {
      padding: 24px 24px 26px;
    }
    .demo-title {
      font-size: 24px;
    }
  }
</style>
