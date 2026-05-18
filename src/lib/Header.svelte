<script>
  // floating centered nav only
</script>

<header class="header">
  <div class="header-inner">
    <nav class="nav-container" aria-label="Primary">
      <a class="nav-link" href="#demo">Demo</a>
      <span class="nav-dot" aria-hidden="true"></span>
      <a class="nav-link" href="#prompt">The Prompt</a>
      <span class="nav-dot" aria-hidden="true"></span>
      <a class="nav-link" href="#video">Reference</a>
    </nav>
  </div>
</header>

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: 50;
    width: 100%;
    padding: 20px 32px 8px;
    background: transparent;
    pointer-events: none;
  }

  .header-inner {
    max-width: 1223px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-container {
    pointer-events: auto;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 10px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(189, 215, 255, 0.4);
    border-radius: 9999px;
    box-shadow: var(--shadow-search);
  }

  .nav-link {
    padding: 8px 14px;
    border-radius: 9999px;
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 14px;
    color: var(--neutral-700);
    letter-spacing: -0.3px;
    transition:
      color var(--transition),
      background-color var(--transition);
    white-space: nowrap;
  }

  .nav-link:hover {
    color: var(--navy);
    background: rgba(38, 112, 220, 0.08);
  }

  .nav-dot {
    width: 3px;
    height: 3px;
    background: var(--neutral-400);
    border-radius: 9999px;
  }

  @media (max-width: 600px) {
    .header {
      padding: 14px 16px 6px;
    }
    .nav-link {
      padding: 6px 10px;
      font-size: 13px;
    }
  }
</style>
