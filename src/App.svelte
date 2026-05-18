<script>
  import Header from './lib/Header.svelte';
  import Hero from './lib/Hero.svelte';
  import DemoSection from './lib/DemoSection.svelte';
  import PromptSection from './lib/PromptSection.svelte';
</script>

<div id="top"></div>

<Header />

<main class="main">
  <Hero />
  <DemoSection />
  <PromptSection />
</main>

<footer class="footer">
  <div class="footer-inner">
    <span class="footer-brand">
      <span class="footer-mark"></span>
      <span>Storytelling Craft</span>
    </span>
    <span class="footer-meta">
      A reference distilled from the source video
    </span>
  </div>
</footer>

<style>
  .main {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .footer {
    padding: 32px;
    width: 100%;
  }

  .footer-inner {
    max-width: 1223px;
    margin: 0 auto;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(189, 215, 255, 0.4);
    border-radius: 9999px;
    box-shadow: var(--shadow-search);
    font-size: 13px;
    color: var(--neutral-700);
  }

  .footer-brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .footer-mark {
    width: 8px;
    height: 8px;
    border-radius: 9999px;
    background: var(--blue-700);
    box-shadow: 0 0 0 3px rgba(38, 112, 220, 0.18);
  }

  .footer-sep {
    color: var(--neutral-400);
  }

  @media (max-width: 540px) {
    .footer {
      padding: 16px;
    }
    .footer-inner {
      flex-direction: column;
      border-radius: 16px;
      padding: 16px;
      text-align: center;
    }
  }
</style>
