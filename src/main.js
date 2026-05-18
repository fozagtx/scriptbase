import { mount } from 'svelte';
import { init as initPlausible } from '@plausible-analytics/tracker';
import './app.css';
import App from './App.svelte';

initPlausible({
  domain: 'fozagtx.github.io',
  autoCapturePageviews: true,
  hashBasedRouting: true,
  outboundLinks: true,
  fileDownloads: true,
});

const app = mount(App, {
  target: document.getElementById('app'),
});

export default app;
