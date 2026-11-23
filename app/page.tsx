import { readFileSync } from "node:fs";
import path from "node:path";
import GlassNavbar from "@/components/GlassNavbar";
import Hero3DLoader from "@/components/Hero3DLoader";
import Countdown from "@/components/Countdown";

function readOriginalContent() {
  const source = readFileSync(path.join(process.cwd(), "index.html"), "utf8");
  const styleStart = source.indexOf("<style>");
  const styleEnd = source.indexOf("</style>", styleStart);
  const originalCss =
    styleStart >= 0 && styleEnd > styleStart
      ? source.slice(styleStart + 7, styleEnd)
      : "";

  const bodyStart = source.indexOf("<body>");
  const bodyEnd = source.lastIndexOf("</body>");
  let content =
    bodyStart >= 0 && bodyEnd > bodyStart
      ? source.slice(bodyStart + 6, bodyEnd)
      : "";

  // The original countdown script is replaced by a React effect.
  const scriptStart = content.lastIndexOf("<script>");
  if (scriptStart >= 0) content = content.slice(0, scriptStart);

  // The original navigation is recreated as an accessible Liquid Glass component.
  // All remaining original section markup and copy are retained verbatim.
  const headerStart = content.indexOf("<header");
  const headerEnd = content.indexOf("</header>", headerStart);
  if (headerStart >= 0 && headerEnd > headerStart) {
    content = content.slice(0, headerStart) + content.slice(headerEnd + 9);
  }

  return { originalCss, content };
}

const { originalCss, content } = readOriginalContent();

const visualOverrides = `
  :root {
    --fum-red: #a71930;
    --fum-red-bright: #d94b62;
    --fum-ink: #29313b;
    --fum-glass-border: rgba(255,255,255,.78);
    --fum-glass-tint: rgba(255,255,255,.58);
    --fum-glass-shadow: 0 18px 54px rgba(75,86,105,.12);
  }
  html { scroll-behavior: smooth; }
  body { background: #f7f5f2; color: #29313b; }
  .fum { overflow: clip; }
  .fum-main { position: relative; isolation: isolate; z-index: 2; color: #29313b!important; background: #f7f5f2!important; }
  .fum-main .fum { color: #29313b!important; background: transparent!important; }
  .fum-main #top {
    position: relative; isolation: isolate; min-height: min(780px,92vh);
    display:flex; align-items:center; padding-top:150px!important;
    background:
      radial-gradient(ellipse at 82% 22%,rgba(219,91,111,.16),transparent 36%),
      radial-gradient(ellipse at 12% 80%,rgba(201,181,155,.22),transparent 34%),
      linear-gradient(135deg,#fffdf9 0%,#f5eee8 52%,#f8f3ef 100%)!important;
  }
  .fum-main #top > div,.fum-main .wrap { position:relative; z-index:2; }
  .fum-main .sec {
    position:relative; scroll-margin-top:100px; color:#34404c!important;
    background:linear-gradient(145deg,#fbfaf8 0%,#f2efeb 100%)!important;
    border-top:1px solid rgba(119,105,93,.08);
    border-bottom:1px solid rgba(119,105,93,.07);
  }
  .fum-main .sec.grey {
    background:radial-gradient(ellipse at 88% 10%,rgba(224,166,171,.16),transparent 34%),linear-gradient(145deg,#f4f0ec 0%,#eee9e4 100%)!important;
  }
  .fum-main .sec.dark {
    background:radial-gradient(ellipse at 80% 12%,rgba(215,106,122,.13),transparent 38%),linear-gradient(145deg,#f8f3ef 0%,#eee8e3 100%)!important;
  }
  .fum-main .h2,.fum-main h1,.fum-main h2,.fum-main h3,.fum-main h4 {
    color:#303945!important; text-wrap:pretty;
  }
  .fum-main .h2 { letter-spacing:-.045em!important; line-height:1.08!important; }
  .fum-main p,.fum-main li,.fum-main td,.fum-main figcaption,.fum-main blockquote,.fum-main summary {
    color:#59636e!important;
  }
  .fum-main .lead { color:#66717c!important; }
  .fum-main .eyebrow,.fum-main .small { color:#a71930!important; }
  .fum-main .num { color:#c43b52!important; }
  .fum-main .grid>div,.fum-main .grid>figure,.fum-main .card,.fum-main .dcard {
    position:relative; overflow:visible; height:auto!important; min-height:0!important;
    min-width:0; box-sizing:border-box; border:1px solid rgba(255,255,255,.88)!important;
    border-radius:22px!important;
    background:linear-gradient(145deg,rgba(255,255,255,.88),rgba(255,255,255,.56) 58%,rgba(250,233,231,.48))!important;
    box-shadow:0 14px 38px rgba(82,78,76,.08),inset 0 1px 0 rgba(255,255,255,.95)!important;
    backdrop-filter:blur(20px) saturate(1.22);-webkit-backdrop-filter:blur(20px) saturate(1.22);
    transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease;
  }
  .fum-main .grid>div:hover,.fum-main .grid>figure:hover,.fum-main .card:hover,.fum-main .dcard:hover {
    transform:translateY(-5px);border-color:rgba(196,59,82,.28)!important;
    box-shadow:0 22px 48px rgba(82,78,76,.13),inset 0 1px 0 #fff!important;
  }
  /* Keep long Vietnamese card copy fully readable; crop only dedicated media wrappers. */
  .fum-main .grid>div,.fum-main .grid>figure,.fum-main .card,.fum-main .dcard {
    overflow:visible!important; height:auto!important; min-height:0!important;
  }
  .fum-main .grid>div h3,.fum-main .grid>div p,.fum-main .grid>div span,
  .fum-main .grid>figure h3,.fum-main .grid>figure p,.fum-main .card h3,
  .fum-main .card p,.fum-main .dcard h3,.fum-main .dcard p {
    max-width:100%; overflow:visible!important; white-space:normal!important;
    overflow-wrap:anywhere; word-break:normal; text-overflow:clip;
    -webkit-line-clamp:unset!important; line-clamp:unset!important;
  }
  .fum-main .grid>div img,.fum-main .grid>figure img,.fum-main .card img,.fum-main .dcard img {
    max-width:100%;
  }
  .fum-main .grid img,.fum-main .card img,.fum-main .dcard img {
    filter:saturate(.96) contrast(1.01);transition:transform .55s ease,filter .55s ease;
  }
  .fum-main .grid>div:hover img,.fum-main .grid>figure:hover img { transform:scale(1.035);filter:saturate(1.06); }
  .fum-main .tbl {
    border:1px solid rgba(255,255,255,.9)!important;
    background:rgba(255,255,255,.68)!important;border-radius:20px!important;
    box-shadow:0 12px 32px rgba(82,78,76,.06);
    backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
  }
  .fum-main table { color:#59636e!important; }
  .fum-main th { color:#a71930!important;border-bottom-color:rgba(95,85,80,.16)!important; }
  .fum-main td { border-bottom-color:rgba(95,85,80,.09)!important; }
  .fum-main .ev { color:#59636e!important; }
  .fum-main details { border-bottom-color:rgba(95,85,80,.14)!important; }
  .fum-main summary { color:#303945!important; }
  .fum-main .ph,.fum-main .phl {
    color:#69737d!important;background:rgba(255,255,255,.62)!important;
    border:1px dashed rgba(105,115,125,.28)!important;backdrop-filter:blur(12px);
  }
  .fum-main a:not(.pill) { color:#a71930; }
  .fum-main a:not(.pill):hover { color:#d94b62; }
  .fum-main .pill {
    min-height:50px!important;border:1px solid rgba(255,255,255,.9)!important;
    border-radius:999px!important;
    background:linear-gradient(135deg,rgba(255,255,255,.92),rgba(255,255,255,.58))!important;
    color:#7e2637!important;
    box-shadow:inset 0 1px 0 #fff,0 10px 26px rgba(82,78,76,.09)!important;
    backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
    transition:transform .2s ease,box-shadow .2s ease,background .2s ease;
  }
  .fum-main a.pill:hover { transform:translateY(-2px);box-shadow:0 12px 28px rgba(82,78,76,.13)!important; }
  .fum-main #tham-gia .pill,.fum-main a.pill[style*="#9A0000"] {
    background:linear-gradient(135deg,#bd344b,#98243b)!important;
    border-color:rgba(255,255,255,.72)!important;color:#fff!important;
    box-shadow:0 12px 30px rgba(167,25,48,.2),inset 0 1px 0 rgba(255,255,255,.28)!important;
  }
  .fum-main #tham-gia>div>div {
    border:1px solid rgba(255,255,255,.8)!important;border-radius:26px!important;
    box-shadow:0 20px 48px rgba(82,78,76,.1),inset 0 1px 0 rgba(255,255,255,.5)!important;
  }
  .fum-main #tham-gia>div>div:first-child {
    background:linear-gradient(140deg,rgba(184,51,73,.96),rgba(132,34,53,.94))!important;
    backdrop-filter:blur(18px);
  }
  .fum-main #tham-gia>div>div:last-child {
    background:linear-gradient(145deg,rgba(255,255,255,.9),rgba(255,255,255,.66))!important;
    color:#34404c!important;backdrop-filter:blur(18px);
  }
  .fum-main footer {
    color:#626d78!important;
    background:linear-gradient(135deg,#eee9e4,#e5ded8)!important;
    border-top:1px solid rgba(119,105,93,.12);
  }
  .fum-main footer a { color:#98243b!important; }
  .fum-main #daysLeft,.fum-main #hLeft,.fum-main #mLeft,.fum-main #sLeft { color:#b7354c!important; }
  .fum-main [style*="background:#18181C"],.fum-main [style*="background: #18181C"],
  .fum-main [style*="background:#141417"],.fum-main [style*="background:#0E0E10"] {
    background:linear-gradient(145deg,rgba(255,255,255,.9),rgba(244,239,234,.78))!important;
    border-color:rgba(255,255,255,.9)!important;
  }
  /* Light-glass contrast pass: legacy dark-section copy must not remain white/low-contrast. */
  .fum-main .dark { color:#34404c!important; }
  .fum-main .dark :is(h1,h2,h3,h4,p,li,td,figcaption,blockquote,summary) { color:#34404c!important; }
  .fum-main .dark .lead,.fum-main .dark p[style*="color:#C9C9CE"],
  .fum-main .dark p[style*="color: #C9C9CE"],
  .fum-main .dark p[style*="color:#A9A9AF"],
  .fum-main .dark p[style*="color: #A9A9AF"],
  .fum-main .dark span[style*="color:#A9A9AF"],
  .fum-main .dark span[style*="color: #A9A9AF"],
  .fum-main .dark [style*="color:#E5E5E7"],
  .fum-main .dark [style*="color: #E5E5E7"] { color:#59636e!important; }
  .fum-main .dark .pill:not([style*="background:#9A0000"]) { color:#7e2637!important;border-color:rgba(126,38,55,.28)!important; }
  .fum-main .dark [style*="background:#9A0000"],
  .fum-main .dark [style*="background: #9A0000"] { color:#fff!important; }
  .fum-main .dark [style*="background:#9A0000"] *,
  .fum-main .dark [style*="background: #9A0000"] * { color:inherit!important; }
  .fum-main [style*="color:#111113"],.fum-main [style*="color: #111113"],
  .fum-main [style*="color:#4B4B52"],.fum-main [style*="color: #4B4B52"],
  .fum-main [style*="color:#33333A"] { color:#59636e!important; }
  .hero3d-backdrop {
    position:absolute;z-index:1;pointer-events:none;top:76px;right:-2vw;
    width:min(62vw,850px);height:560px;opacity:.48;
    mask-image:linear-gradient(90deg,transparent 0%,#000 24%,#000 82%,transparent 100%);
  }
  .hero3d-backdrop canvas { display:block; }
  @media(max-width:760px) {
    .fum-main #top { min-height:auto;padding-top:126px!important; }
    .fum-main .sec { padding:68px 18px!important; }
    .fum-main .wrap { gap:28px!important; }
    .fum-main .grid { gap:14px!important; }
    .fum-main .grid>div,.fum-main .grid>figure,.fum-main .card,.fum-main .dcard { border-radius:18px!important; }
    .hero3d-backdrop { top:150px;right:-25vw;width:100vw;height:390px;opacity:.3; }
  }
  @media(prefers-reduced-motion:reduce) {
    .fum-main *, .fum-main *::before, .fum-main *::after {
      scroll-behavior:auto!important;animation-duration:.01ms!important;
      animation-iteration-count:1!important;transition-duration:.01ms!important;
    }
  }
  /* Section 3: turn the legacy dark statistics strip into a light-glass band. */
  .fum-main .fum > section.dark:not(.sec) {
    color:#303945!important;
    background:linear-gradient(145deg,#f8f3ef 0%,#eee8e3 100%)!important;
  }
  .fum-main .fum > section.dark:not(.sec) > div:first-child {
    gap:14px!important;
    overflow:visible!important;
    background:transparent!important;
    border-radius:0!important;
  }
  .fum-main .fum > section.dark:not(.sec) > div:first-child > div {
    min-width:0;
    border:1px solid rgba(255,255,255,.9)!important;
    border-radius:20px!important;
    background:linear-gradient(145deg,rgba(255,255,255,.94),rgba(255,255,255,.68))!important;
    box-shadow:0 12px 30px rgba(82,78,76,.07),inset 0 1px 0 #fff!important;
  }
  .fum-main .fum > section.dark:not(.sec) > div:first-child > div > span {
    color:#34404c!important;
    overflow-wrap:anywhere;
  }
  .fum-main .fum > section.dark:not(.sec) > div:first-child > div > span[style*="color:#F26363"] {
    color:#c43b52!important;
  }

  /* Final CTA: preserve clear light text on the wine-red join card. */
  .fum-main #tham-gia > div > div:first-child h2,
  .fum-main #tham-gia > div > div:first-child p {
    color:#fff!important;
  }
  .fum-main #tham-gia > div > div:first-child p {
    color:rgba(255,255,255,.94)!important;
  }
  .fum-main #tham-gia > div > div:first-child .pill {
    background:rgba(255,255,255,.12)!important;
    color:#fff!important;
    border:1.5px solid rgba(255,255,255,.86)!important;
    box-shadow:inset 0 1px 0 rgba(255,255,255,.22)!important;
  }
  .fum-main #tham-gia > div > div:last-child h2 { color:#303945!important; }
  .fum-main #tham-gia > div > div:last-child p { color:#4b5662!important; }
  .fum-main #tham-gia > div > div:last-child .pill {
    color:#7e2637!important;
    border:1.5px solid rgba(126,38,55,.3)!important;
  }
  @media(max-width:760px) {
    .fum-main .fum > section.dark:not(.sec) { padding:0 18px 64px!important; }
    .fum-main .fum > section.dark:not(.sec) > div:first-child { grid-template-columns:1fr!important; }
  }

  @media(prefers-reduced-transparency:reduce) {
    .fum-main .grid>div,.fum-main .grid>figure,.fum-main .card,.fum-main .dcard,.fum-main .tbl {
      background:#f5f1ed!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;
    }
  }
`;

export default function HomePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: originalCss + visualOverrides }} />
      <GlassNavbar />
      <div className="hero3d-backdrop" data-lg-role="stage" aria-hidden="true">
        <Hero3DLoader />
      </div>
      <main className="fum-main" data-lg-role="focus" dangerouslySetInnerHTML={{ __html: content }} />
      <Countdown />
    </>
  );
}
