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
  /* Full-page Liquid Glass art direction */
  .fum-main{color:#f4f4f6!important;background:#0b0b0e!important}.fum-main .fum{color:#f4f4f6!important;background:transparent!important}
  .fum-main .sec{position:relative;color:#f4f4f6!important;background:radial-gradient(ellipse at 12% 0%,rgba(154,0,0,.12),transparent 38%),linear-gradient(145deg,#111115 0%,#0b0b0e 58%,#111014 100%)!important;border-top:1px solid rgba(255,255,255,.055);border-bottom:1px solid rgba(255,255,255,.045)}
  .fum-main .sec.grey{background:radial-gradient(ellipse at 88% 10%,rgba(242,99,99,.12),transparent 34%),linear-gradient(145deg,#17171c 0%,#101014 58%,#191418 100%)!important}
  .fum-main .sec.dark{background:radial-gradient(ellipse at 80% 12%,rgba(154,0,0,.17),transparent 38%),linear-gradient(145deg,#09090c 0%,#121216 52%,#0c0b0f 100%)!important}
  .fum-main #top{min-height:min(780px,92vh);display:flex;align-items:center;padding-top:150px!important;background:radial-gradient(ellipse at 76% 30%,rgba(154,0,0,.3),transparent 36%),radial-gradient(ellipse at 15% 82%,rgba(242,99,99,.1),transparent 32%),linear-gradient(130deg,#08080b 0%,#151116 55%,#0b0b0e 100%)!important}
  .fum-main .wrap{position:relative;z-index:1}.fum-main .h2,.fum-main h1,.fum-main h2,.fum-main h3,.fum-main h4{color:#f7f7f8!important;text-wrap:pretty}.fum-main .h2{letter-spacing:-.045em!important;line-height:1.08!important}
  .fum-main p,.fum-main li,.fum-main td,.fum-main figcaption,.fum-main blockquote,.fum-main summary{color:rgba(245,245,248,.78)!important}.fum-main .lead{color:rgba(239,239,244,.72)!important}.fum-main .eyebrow,.fum-main .small{color:#f28a8a!important}.fum-main .num{color:#ff7777!important}
  .fum-main .grid>div,.fum-main .grid>figure,.fum-main .card,.fum-main .dcard{position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.13)!important;border-radius:22px!important;background:linear-gradient(145deg,rgba(255,255,255,.105),rgba(255,255,255,.025) 55%,rgba(154,0,0,.055))!important;box-shadow:0 18px 48px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.13)!important;backdrop-filter:blur(18px) saturate(1.35);-webkit-backdrop-filter:blur(18px) saturate(1.35);transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease}
  .fum-main .grid>div:hover,.fum-main .grid>figure:hover,.fum-main .card:hover,.fum-main .dcard:hover{transform:translateY(-5px);border-color:rgba(242,99,99,.42)!important;box-shadow:0 24px 60px rgba(0,0,0,.32),inset 0 1px 0 rgba(255,255,255,.2)!important}
  .fum-main .grid img,.fum-main .card img,.fum-main .dcard img{filter:saturate(.88) contrast(1.04);transition:transform .55s ease,filter .55s ease}.fum-main .grid>div:hover img,.fum-main .grid>figure:hover img{transform:scale(1.035);filter:saturate(1.08) contrast(1.05)}
  .fum-main .tbl{border:1px solid rgba(255,255,255,.16)!important;background:rgba(255,255,255,.055)!important;border-radius:20px!important;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
  .fum-main table{color:rgba(245,245,248,.82)!important}.fum-main th{color:#ff9999!important;border-bottom-color:rgba(255,255,255,.2)!important}.fum-main td{border-bottom-color:rgba(255,255,255,.1)!important}.fum-main .ev{color:rgba(245,245,248,.78)!important}
  .fum-main details{border-bottom-color:rgba(255,255,255,.15)!important}.fum-main summary{color:#f7f7f8!important}.fum-main .ph,.fum-main .phl{color:rgba(255,255,255,.62)!important;background:rgba(255,255,255,.075)!important;border:1px dashed rgba(255,255,255,.22)!important;backdrop-filter:blur(12px)}
  .fum-main a:not(.pill){color:#f5caca}.fum-main a:not(.pill):hover{color:#fff}
  .fum-main .pill{min-height:50px!important;border:1px solid rgba(255,255,255,.24)!important;border-radius:999px!important;background:linear-gradient(135deg,rgba(255,255,255,.18),rgba(255,255,255,.055))!important;color:#fff!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.22),0 12px 30px rgba(0,0,0,.2)!important;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
  .fum-main #tham-gia .pill,.fum-main a.pill[style*="#9A0000"]{background:linear-gradient(135deg,#c51b28,#78000a)!important;border-color:rgba(255,255,255,.25)!important;color:#fff!important;box-shadow:0 12px 34px rgba(154,0,0,.28),inset 0 1px 0 rgba(255,255,255,.25)!important}
  .fum-main #tham-gia>div>div{border:1px solid rgba(255,255,255,.18)!important;border-radius:26px!important;box-shadow:0 24px 60px rgba(0,0,0,.24),inset 0 1px 0 rgba(255,255,255,.18)!important}
  .fum-main #tham-gia>div>div:first-child{background:linear-gradient(140deg,rgba(176,8,24,.92),rgba(85,0,8,.86))!important;backdrop-filter:blur(18px)}.fum-main #tham-gia>div>div:last-child{background:linear-gradient(145deg,rgba(255,255,255,.13),rgba(255,255,255,.035))!important;color:#fff!important;backdrop-filter:blur(18px)}
  .fum-main footer{color:rgba(255,255,255,.72)!important;background:linear-gradient(135deg,#09090c,#171116)!important;border-top:1px solid rgba(255,255,255,.13)}.fum-main footer a{color:#f3c5c5!important}
  .fum-main #daysLeft,.fum-main #hLeft,.fum-main #mLeft,.fum-main #sLeft{color:#ff8585!important}
  .fum-main [style*="background:#18181C"],.fum-main [style*="background: #18181C"],.fum-main [style*="background:#141417"],.fum-main [style*="background:#0E0E10"],.fum-main [style*="background:#F4F4F5"],.fum-main [style*="background:#fff"],.fum-main [style*="background: #fff"]{background:linear-gradient(145deg,rgba(255,255,255,.12),rgba(255,255,255,.035))!important;border-color:rgba(255,255,255,.14)!important}
  .fum-main [style*="color:#111113"],.fum-main [style*="color: #111113"],.fum-main [style*="color:#4B4B52"],.fum-main [style*="color: #4B4B52"],.fum-main [style*="color:#33333A"]{color:rgba(245,245,248,.78)!important}
  @media(max-width:760px){.fum-main #top{min-height:auto;padding-top:126px!important}.fum-main .sec{padding-top:68px!important;padding-bottom:68px!important}.fum-main .wrap{gap:28px!important}.fum-main .grid{gap:14px!important}.fum-main .grid>div,.fum-main .grid>figure,.fum-main .card,.fum-main .dcard{border-radius:18px!important}}
  @media(prefers-reduced-transparency:reduce){.fum-main .grid>div,.fum-main .grid>figure,.fum-main .card,.fum-main .dcard,.fum-main .tbl{background:#17171c!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}}

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
