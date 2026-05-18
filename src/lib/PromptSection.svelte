<script>
  import { marked } from 'marked';
  import { prompts } from './prompts.js';

  marked.setOptions({
    breaks: false,
    gfm: true,
  });

  let selected = $state('claude');
  let copied = $state(false);
  let copyTimer;

  const current = $derived(prompts[selected]);
  const wordCount = $derived(
    current.body.trim().split(/\s+/).filter(Boolean).length
  );

  // Render markdown for display, but the copy button uses the raw body.
  // Escape any XML-style angle brackets so they render as visible text
  // instead of being interpreted as unknown HTML tags.
  const renderedHtml = $derived(
    marked.parse(
      current.body
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
    )
  );

  function selectModel(model) {
    if (selected === model) return;
    selected = model;
    copied = false;
    clearTimeout(copyTimer);
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(current.body);
      copied = true;
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => (copied = false), 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = current.body;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        copied = true;
        copyTimer = setTimeout(() => (copied = false), 2000);
      } catch {}
      document.body.removeChild(ta);
    }
  }
</script>

<section class="prompt-section" id="prompt">
  <div class="prompt-header">
    <div class="prompt-heading-block">
      <p class="kicker">The Prompt</p>
      <h2 class="prompt-title">Pick your model.</h2>
      <p class="prompt-subtitle">
        Same framework. Tuned for each model's strengths.
      </p>
    </div>

    <div class="toggle" role="tablist" aria-label="Select model">
      <span
        class="toggle-pill"
        class:right={selected === 'chatgpt'}
        aria-hidden="true"
      ></span>

      <button
        class="toggle-option"
        class:is-active={selected === 'claude'}
        role="tab"
        aria-selected={selected === 'claude'}
        onclick={() => selectModel('claude')}
        type="button"
      >
        <span class="toggle-logo claude-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              d="M3.388 16.512l4.962-2.79.083-.242-.083-.135h-.241l-.832-.051-2.84-.077-2.464-.103-2.387-.128-.602-.128L0 12.43l.058-.371.506-.339.723.064 1.601.108 2.4.167 1.74.103 2.581.27h.41l.058-.166-.141-.103-.109-.103-2.484-1.683L4.694 9.61l-1.408-1.025-.763-.519-.385-.487-.166-1.063.691-.762.929.064.237.064.94.723 2.011 1.556 2.626 1.933.385.32.154-.108.019-.077-.173-.288-1.428-2.587-1.524-2.625-.679-1.089-.179-.654a3.146 3.146 0 01-.109-.769L6.55.142 6.978 0l1.031.142.435.378.64 1.468 1.038 2.312 1.61 3.135.471.929.25.86.095.262h.16v-.16l.127-1.733.243-2.13.237-2.74.082-.77.385-.93.77-.51.602.282.493.71-.07.461-.293 1.913-.576 2.991-.378 2.003h.218l.25-.25 1.01-1.34 1.69-2.117.749-.84.871-.929.563-.448h1.063l.782 1.165-.352 1.197-1.09 1.382-.904 1.172-1.297 1.748-.807 1.394.077.116.198-.02 2.961-.628 1.601-.288 1.908-.328.86.403.096.41-.339.838-2.035.5-2.388.474-3.563.84-.045.032.05.064 1.601.153.685.038h1.677l3.123.231.819.538.491.66-.082.5-1.255.641-1.7-.404-3.961-.939-1.358-.34h-.193v.116l1.133 1.03 2.075 1.87 2.594 2.405.135.595-.327.461-.339-.05-2.245-1.683-.866-.762-1.96-1.652h-.128v.173l.45.66 2.39 3.591.121 1.103-.173.36-.621.22-.679-.122-1.397-1.96-1.434-2.198-1.16-1.978-.142.083-.685 7.378-.32.378-.74.282-.615-.467-.32-.756.32-1.504.397-1.96.32-1.555.288-1.932.173-.642-.013-.04-.142.019-1.459 2.005-2.219 2.991-1.755 1.882-.422.166-.73-.378.063-.673.41-.61 2.43-3.096 1.471-1.92.947-1.105-.005-.166h-.058l-6.687 4.346-1.196.154-.515-.481.064-.794.243-.256 2.014-1.387-.026.005z"
              fill="#D97757"
            />
          </svg>
        </span>
        <span class="toggle-label">Claude</span>
      </button>

      <button
        class="toggle-option"
        class:is-active={selected === 'chatgpt'}
        role="tab"
        aria-selected={selected === 'chatgpt'}
        onclick={() => selectModel('chatgpt')}
        type="button"
      >
        <span class="toggle-logo chatgpt-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path
              d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span class="toggle-label">ChatGPT</span>
      </button>
    </div>
  </div>

  <div class="prompt-stage">
    <span class="ambient-orb orb-tl" data-model={selected} aria-hidden="true"></span>
    <span class="ambient-orb orb-br" data-model={selected} aria-hidden="true"></span>

    <article class="prompt-card" data-model={selected}>
      <div class="prompt-card-top">
        <div class="model-identity">
          <span class="model-avatar" data-model={selected} aria-hidden="true">
            {#if selected === 'claude'}
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  d="M3.388 16.512l4.962-2.79.083-.242-.083-.135h-.241l-.832-.051-2.84-.077-2.464-.103-2.387-.128-.602-.128L0 12.43l.058-.371.506-.339.723.064 1.601.108 2.4.167 1.74.103 2.581.27h.41l.058-.166-.141-.103-.109-.103-2.484-1.683L4.694 9.61l-1.408-1.025-.763-.519-.385-.487-.166-1.063.691-.762.929.064.237.064.94.723 2.011 1.556 2.626 1.933.385.32.154-.108.019-.077-.173-.288-1.428-2.587-1.524-2.625-.679-1.089-.179-.654a3.146 3.146 0 01-.109-.769L6.55.142 6.978 0l1.031.142.435.378.64 1.468 1.038 2.312 1.61 3.135.471.929.25.86.095.262h.16v-.16l.127-1.733.243-2.13.237-2.74.082-.77.385-.93.77-.51.602.282.493.71-.07.461-.293 1.913-.576 2.991-.378 2.003h.218l.25-.25 1.01-1.34 1.69-2.117.749-.84.871-.929.563-.448h1.063l.782 1.165-.352 1.197-1.09 1.382-.904 1.172-1.297 1.748-.807 1.394.077.116.198-.02 2.961-.628 1.601-.288 1.908-.328.86.403.096.41-.339.838-2.035.5-2.388.474-3.563.84-.045.032.05.064 1.601.153.685.038h1.677l3.123.231.819.538.491.66-.082.5-1.255.641-1.7-.404-3.961-.939-1.358-.34h-.193v.116l1.133 1.03 2.075 1.87 2.594 2.405.135.595-.327.461-.339-.05-2.245-1.683-.866-.762-1.96-1.652h-.128v.173l.45.66 2.39 3.591.121 1.103-.173.36-.621.22-.679-.122-1.397-1.96-1.434-2.198-1.16-1.978-.142.083-.685 7.378-.32.378-.74.282-.615-.467-.32-.756.32-1.504.397-1.96.32-1.555.288-1.932.173-.642-.013-.04-.142.019-1.459 2.005-2.219 2.991-1.755 1.882-.422.166-.73-.378.063-.673.41-.61 2.43-3.096 1.471-1.92.947-1.105-.005-.166h-.058l-6.687 4.346-1.196.154-.515-.481.064-.794.243-.256 2.014-1.387-.026.005z"
                  fill="#D97757"
                />
              </svg>
            {:else}
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"
                  fill="#10A37F"
                />
              </svg>
            {/if}
          </span>
          <div class="model-meta">
            <span class="model-name">{current.label}</span>
            <span class="model-sub">
              <span class="status-dot" data-model={selected}></span>
              System prompt · ready
            </span>
          </div>
        </div>
        <button class="copy-btn" class:copied onclick={copyPrompt} type="button">
          {#if copied}
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                fill="currentColor"
              />
            </svg>
            <span>Copied</span>
          {:else}
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"
                fill="currentColor"
              />
            </svg>
            <span>Copy prompt</span>
          {/if}
        </button>
      </div>

      <div class="prompt-body">{@html renderedHtml}</div>

      <div class="prompt-card-bottom">
        <span class="prompt-meta">
          <span class="meta-pill">
            <strong>{wordCount.toLocaleString()}</strong> words
          </span>
          <span class="meta-pill">
            <strong>{current.body.length.toLocaleString()}</strong> chars
          </span>
        </span>
        <span class="prompt-shortcut">
          Paste into
          <span class="paste-target" data-model={selected}>{current.label}</span>
          and start the conversation
        </span>
      </div>
    </article>
  </div>

  <p class="footnote" id="how">
    Built from the reference video. Test your output against one rule:
    <strong>can you state the curiosity gap in one sentence?</strong>
    If not, the script isn't done.
  </p>
</section>

<style>
  .prompt-section {
    max-width: 1080px;
    width: 100%;
    margin: 32px auto 64px;
    padding: 32px;
  }

  .prompt-header {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 24px;
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
    margin-bottom: 12px;
  }

  .kicker::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background: var(--blue-700);
    box-shadow: 0 0 0 3px rgba(38, 112, 220, 0.18);
  }

  .prompt-title {
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 40px;
    line-height: 1.05;
    letter-spacing: -1px;
    color: var(--navy);
  }

  .prompt-subtitle {
    margin-top: 8px;
    font-size: 15px;
    color: var(--neutral-700);
  }

  /* Toggle */
  .toggle {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 6px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(189, 215, 255, 0.4);
    border-radius: 9999px;
    box-shadow: var(--shadow-search);
    gap: 4px;
  }

  .toggle-pill {
    position: absolute;
    top: 6px;
    left: 6px;
    width: calc(50% - 6px);
    height: calc(100% - 12px);
    background-image: var(--cta-gradient);
    border-radius: 9999px;
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.3) inset,
      0 4px 14px rgba(0, 66, 171, 0.22);
    transition: transform 0.28s var(--ease-out);
    z-index: 0;
  }

  .toggle-pill.right {
    transform: translateX(calc(100% + 4px));
  }

  .toggle-option {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    border-radius: 9999px;
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 14px;
    letter-spacing: -0.5px;
    color: var(--neutral-700);
    transition: color 0.2s var(--ease-out);
    min-width: 120px;
    justify-content: center;
  }

  .toggle-option:hover {
    color: var(--navy);
  }

  .toggle-option.is-active {
    color: var(--white);
  }

  .toggle-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    color: currentColor;
  }

  /* Stage holds the card + ambient orbs */
  .prompt-stage {
    position: relative;
    isolation: isolate;
  }

  .ambient-orb {
    position: absolute;
    border-radius: 9999px;
    filter: blur(50px);
    pointer-events: none;
    z-index: 0;
    transition: background 0.4s var(--ease-out);
  }

  .ambient-orb.orb-tl {
    width: 380px;
    height: 380px;
    top: -80px;
    left: -120px;
  }

  .ambient-orb.orb-br {
    width: 460px;
    height: 460px;
    bottom: -100px;
    right: -160px;
  }

  .ambient-orb[data-model='claude'].orb-tl {
    background: radial-gradient(
      circle,
      rgba(217, 119, 87, 0.28) 0%,
      rgba(217, 119, 87, 0) 70%
    );
  }
  .ambient-orb[data-model='claude'].orb-br {
    background: radial-gradient(
      circle,
      rgba(189, 215, 255, 0.45) 0%,
      rgba(189, 215, 255, 0) 70%
    );
  }
  .ambient-orb[data-model='chatgpt'].orb-tl {
    background: radial-gradient(
      circle,
      rgba(16, 163, 127, 0.22) 0%,
      rgba(16, 163, 127, 0) 70%
    );
  }
  .ambient-orb[data-model='chatgpt'].orb-br {
    background: radial-gradient(
      circle,
      rgba(121, 173, 248, 0.38) 0%,
      rgba(189, 215, 255, 0) 70%
    );
  }

  /* Prompt Card */
  .prompt-card {
    position: relative;
    z-index: 1;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
    border-radius: 32px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.7);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.95) inset,
      0 0 0 1px rgba(189, 215, 255, 0.35),
      0 40px 80px -30px rgba(0, 66, 171, 0.32),
      0 18px 40px -12px rgba(0, 34, 89, 0.18);
    transition: box-shadow 0.4s var(--ease-out);
  }

  .prompt-card[data-model='claude'] {
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.95) inset,
      0 0 0 1px rgba(217, 119, 87, 0.18),
      0 40px 80px -30px rgba(217, 119, 87, 0.22),
      0 18px 40px -12px rgba(0, 34, 89, 0.18);
  }

  .prompt-card[data-model='chatgpt'] {
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.95) inset,
      0 0 0 1px rgba(16, 163, 127, 0.18),
      0 40px 80px -30px rgba(16, 163, 127, 0.2),
      0 18px 40px -12px rgba(0, 34, 89, 0.18);
  }

  .prompt-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 24px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.7),
      rgba(244, 249, 255, 0.4)
    );
    border-bottom: 1px solid rgba(189, 215, 255, 0.45);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .model-identity {
    display: inline-flex;
    align-items: center;
    gap: 14px;
  }

  .model-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 14px;
    background: var(--white);
    border: 1px solid rgba(189, 215, 255, 0.45);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.95) inset,
      0 4px 10px -4px rgba(0, 34, 89, 0.15);
    transition: box-shadow 0.3s var(--ease-out);
  }

  .model-avatar[data-model='claude'] {
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.95) inset,
      0 4px 14px -4px rgba(217, 119, 87, 0.4);
  }

  .model-avatar[data-model='chatgpt'] {
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.95) inset,
      0 4px 14px -4px rgba(16, 163, 127, 0.35);
  }

  .model-meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .model-name {
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 15px;
    color: var(--navy);
    letter-spacing: -0.4px;
    line-height: 1.1;
  }

  .model-sub {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-sans);
    font-size: 11.5px;
    color: var(--neutral-600);
    letter-spacing: -0.2px;
  }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background: var(--success);
    box-shadow: 0 0 0 3px rgba(13, 222, 83, 0.18);
    animation: pulse-dot 2s ease-in-out infinite;
  }

  @keyframes pulse-dot {
    0%, 100% {
      box-shadow: 0 0 0 3px rgba(13, 222, 83, 0.18);
    }
    50% {
      box-shadow: 0 0 0 5px rgba(13, 222, 83, 0.08);
    }
  }

  .copy-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding: 0 18px;
    border-radius: 12px;
    background-image: var(--cta-gradient);
    border: 1px solid rgba(255, 255, 255, 0.25);
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 13px;
    color: var(--white);
    letter-spacing: -0.3px;
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.3) inset,
      0 6px 16px rgba(0, 66, 171, 0.22);
    transition:
      transform var(--transition),
      filter var(--transition),
      box-shadow var(--transition);
  }

  .copy-btn:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }

  .copy-btn.copied {
    background-image: linear-gradient(180deg, #0dde53 0%, #0bb443 100%);
    color: var(--white);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .prompt-body {
    padding: 32px 36px 36px;
    font-family: var(--font-sans);
    font-size: 14.5px;
    line-height: 1.65;
    color: var(--neutral-800);
    max-height: 620px;
    overflow-y: auto;
    letter-spacing: -0.2px;
    background:
      radial-gradient(
        circle at 0% 0%,
        rgba(189, 215, 255, 0.35) 0%,
        rgba(231, 243, 255, 0) 50%
      ),
      radial-gradient(
        circle at 100% 100%,
        rgba(215, 231, 254, 0.4) 0%,
        rgba(247, 251, 255, 0) 55%
      ),
      linear-gradient(to bottom, #f4f9ff 0%, #eff4f9 100%);
    box-shadow:
      rgba(255, 255, 255, 0.75) -4px -4px 6px 0 inset,
      rgba(255, 255, 255, 0.75) 4px 4px 6px 0 inset;
  }

  .prompt-body::-webkit-scrollbar {
    width: 10px;
  }

  .prompt-body::-webkit-scrollbar-track {
    background: transparent;
  }

  .prompt-body::-webkit-scrollbar-thumb {
    background: var(--neutral-300);
    border-radius: 9999px;
    border: 2px solid var(--white);
  }

  /* Rendered markdown styles (scoped to .prompt-body via :global) */
  .prompt-body :global(h1) {
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 24px;
    line-height: 1.2;
    letter-spacing: -0.6px;
    color: var(--navy);
    margin: 8px 0 16px;
  }

  .prompt-body :global(h2) {
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 20px;
    line-height: 1.25;
    letter-spacing: -0.5px;
    color: var(--navy);
    margin: 28px 0 12px;
    padding-top: 16px;
    border-top: 1px solid rgba(189, 215, 255, 0.5);
  }

  .prompt-body :global(h1 + h2),
  .prompt-body :global(:first-child + h2) {
    border-top: 0;
    padding-top: 0;
    margin-top: 16px;
  }

  .prompt-body :global(h3) {
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 16px;
    letter-spacing: -0.4px;
    color: var(--navy);
    margin: 22px 0 10px;
  }

  .prompt-body :global(p) {
    margin: 0 0 14px;
  }

  .prompt-body :global(strong) {
    color: var(--navy);
    font-weight: 600;
  }

  .prompt-body :global(em) {
    font-family: var(--font-serif);
    font-style: italic;
    color: var(--blue-700);
  }

  .prompt-body :global(ul),
  .prompt-body :global(ol) {
    margin: 0 0 16px;
    padding-left: 22px;
  }

  .prompt-body :global(li) {
    margin: 4px 0;
  }

  .prompt-body :global(li > p) {
    margin: 0 0 6px;
  }

  .prompt-body :global(code) {
    font-family: var(--font-mono);
    font-size: 12.5px;
    background: rgba(255, 255, 255, 0.75);
    color: var(--blue-900);
    padding: 1px 6px;
    border-radius: 6px;
    letter-spacing: 0;
    border: 1px solid rgba(189, 215, 255, 0.4);
  }

  .prompt-body :global(pre) {
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(189, 215, 255, 0.55);
    border-radius: 12px;
    padding: 14px 16px;
    margin: 12px 0 18px;
    overflow-x: auto;
    box-shadow: var(--shadow-search);
  }

  .prompt-body :global(pre code) {
    background: transparent;
    color: var(--navy);
    padding: 0;
    border-radius: 0;
    font-size: 12px;
    line-height: 1.6;
    white-space: pre;
    border: 0;
  }

  .prompt-body :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0 18px;
    font-size: 13.5px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 10px;
    overflow: hidden;
  }

  .prompt-body :global(blockquote) {
    border-left: 3px solid var(--blue-300);
    padding: 4px 0 4px 14px;
    margin: 12px 0 16px;
    color: var(--neutral-700);
    font-style: italic;
  }

  .prompt-body :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0 18px;
    font-size: 13.5px;
  }

  .prompt-body :global(th),
  .prompt-body :global(td) {
    text-align: left;
    padding: 8px 12px;
    border-bottom: 1px solid var(--neutral-300);
  }

  .prompt-body :global(th) {
    background: var(--blue-100);
    color: var(--navy);
    font-weight: 600;
    border-bottom-color: var(--blue-300);
  }

  .prompt-body :global(hr) {
    border: 0;
    border-top: 1px solid rgba(189, 215, 255, 0.6);
    margin: 24px 0;
  }

  .prompt-body :global(a) {
    color: var(--blue-700);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .prompt-card-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    padding: 16px 24px;
    background: linear-gradient(
      to top,
      rgba(255, 255, 255, 0.7),
      rgba(244, 249, 255, 0.4)
    );
    border-top: 1px solid rgba(189, 215, 255, 0.45);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    font-size: 12px;
    color: var(--neutral-700);
    flex-wrap: wrap;
  }

  .prompt-meta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .meta-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 5px 10px;
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid rgba(189, 215, 255, 0.4);
    border-radius: 9999px;
    font-size: 11.5px;
    color: var(--neutral-700);
    letter-spacing: -0.2px;
  }

  .meta-pill strong {
    color: var(--navy);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .prompt-shortcut {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--neutral-600);
  }

  .paste-target {
    color: var(--navy);
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid rgba(189, 215, 255, 0.4);
  }

  .paste-target[data-model='claude'] {
    background: rgba(217, 119, 87, 0.12);
    border-color: rgba(217, 119, 87, 0.3);
    color: #b85f3f;
  }

  .paste-target[data-model='chatgpt'] {
    background: rgba(16, 163, 127, 0.12);
    border-color: rgba(16, 163, 127, 0.3);
    color: #0d8a6c;
  }

  .footnote {
    max-width: 720px;
    margin: 32px auto 0;
    text-align: center;
    font-size: 15px;
    color: var(--neutral-700);
    line-height: 1.55;
  }

  .footnote strong {
    color: var(--navy);
    font-weight: 600;
  }

  @media (max-width: 700px) {
    .prompt-section {
      padding: 16px;
      margin: 16px auto 40px;
    }
    .prompt-title {
      font-size: 30px;
    }
    .prompt-body {
      padding: 18px;
      font-size: 12px;
      max-height: 480px;
    }
    .prompt-card-bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
    }
    .toggle-option {
      min-width: 100px;
      padding: 8px 14px;
      font-size: 13px;
    }
  }
</style>
