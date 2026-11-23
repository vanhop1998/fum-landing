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
    --fum-red: #9a0000;
    --fum-red-bright: #f26363;
    --fum-ink: #0e0e10;
    --fum-glass-border: rgba(255,255,255,.38);
    --fum-glass-tint: rgba(30,36,46,.16);
    --fum-glass-shadow: 0 18px 54px rgba(0,0,0,.22);
  }
  body { background: #0e0e10; }
  .fum { overflow: clip; }
  .fum-main { position: relative; isolation: isolate; z-index: 2; }
  .fum-main #top {
    position: relative;
    isolation: isolate;
    background:
      radial-gradient(ellipse at 78% 18%, rgba(154,0,0,.24), transparent 36%),
      linear-gradient(135deg, rgba(14,14,16,.88) 0%, rgba(21,19,22,.72) 58%, rgba(14,14,16,.88) 100%) !important;
    padding-top: 116px !important;
  }
  .fum-main #top > div { position: relative; z-index: 2; }
  .fum-main .sec { scroll-margin-top: 100px; }
  .fum-main .dark { background-color: #0e0e10; }
  .fum-main .grey { background: #f1f1f3; }
  .fum-main .card, .fum-main .dcard {
    transition: transform .28s ease, border-color .28s ease, box-shadow .28s ease;
  }
  .fum-main .card:hover, .fum-main .dcard:hover {
    transform: translateY(-3px);
    border-color: rgba(154,0,0,.35);
    box-shadow: 0 18px 38px rgba(0,0,0,.08);
  }
  .fum-main .dark .dcard:hover { box-shadow: 0 18px 38px rgba(0,0,0,.22); }
  .fum-main a.pill {
    transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
  }
  .fum-main a.pill:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(154,0,0,.24);
  }
  .fum-main img { height: auto; }
  .fum-main #top img { height: 100%; }
  .hero3d-backdrop {
    position: absolute;
    z-index: 1;
    pointer-events: none;
    top: 76px;
    right: -2vw;
    width: min(62vw, 850px);
    height: 560px;
    opacity: .76;
    mask-image: linear-gradient(90deg, transparent 0%, #000 24%, #000 82%, transparent 100%);
  }
  .hero3d-backdrop canvas { display: block; }
  @media (max-width: 760px) {
    .fum-main #top { padding-top: 112px !important; }
    .hero3d-backdrop { top: 150px; right: -25vw; width: 100vw; height: 390px; opacity: .38; }
    .fum-main .sec { padding-left: 18px; padding-right: 18px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .fum-main *, .fum-main *::before, .fum-main *::after {
      scroll-behavior: auto !important;
      animation-duration: .01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: .01ms !important;
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
      <main className="fum-main" dangerouslySetInnerHTML={{ __html: content }} />
      <Countdown />
    </>
  );
}
