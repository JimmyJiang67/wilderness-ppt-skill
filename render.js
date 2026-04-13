const fs = require('fs');
const path = require('path');

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

function renderBadge(badge) {
    if (!badge) return '';
    return `<div class="flex items-center gap-2 mb-5"><span class="bg-white/20 px-3 py-1.5 text-xs font-bold">${escapeHtml(badge.prefix)}</span><span class="text-white/50 text-sm tracking-[0.2em]">${escapeHtml(badge.suffix)}</span></div>`;
}

function renderBadgeLight(badge) {
    if (!badge) return '';
    return `<div class="flex items-center gap-2 mb-4"><span class="bg-dark-green text-white px-3 py-1.5 text-xs font-bold">${escapeHtml(badge.prefix)}</span><span class="text-gray-500 text-sm tracking-[0.2em]">${escapeHtml(badge.suffix)}</span></div>`;
}

function renderSlide(slide, idx, brand) {
    const type = slide.type;
    const bgClass = slide.bg === 'white' ? 'bg-white' : 'bg-dark-green';
    switch (type) {
        case 'cover':
            return `<section class="slide ${bgClass} relative" data-slide-type="cover" data-slide-index="${idx}">
    <div class="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2"><svg class="circular-text w-80 h-80" viewBox="0 0 200 200"><defs><path id="cp${idx}" d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"/></defs><text fill="rgba(255,255,255,0.15)" font-size="8" letter-spacing="2"><textPath href="#cp${idx}">${escapeHtml(brand)} • ${escapeHtml(brand)} • ${escapeHtml(brand)} • </textPath></text></svg></div>
    <div class="absolute left-16 top-1/2 -translate-y-1/2 w-px h-48 bg-white/20"></div>
    <div class="absolute bottom-24 right-24 text-right"><div class="flex items-start gap-6"><div class="w-1.5 h-24 bg-light-green mt-2"></div><div class="text-left">${slide.title.map(t => `<h1 class="text-6xl font-bold text-white leading-tight">${escapeHtml(t)}</h1>`).join('')}</div><div class="text-left pt-2">${slide.subtitle.map(s => `<div class="text-3xl font-light text-white/70 tracking-wider">${escapeHtml(s)}</div>`).join('')}</div></div><p class="text-white/50 mt-8 text-lg">${escapeHtml(slide.description)}</p></div>
    <div class="absolute top-8 right-8 text-white/30 text-sm">${escapeHtml(slide.year || '2026')}</div>
</section>`;

        case 'contents': {
            const items = (slide.items || []).map(item => `<div class="flex items-start gap-5 group cursor-pointer"><div class="w-14 h-14 border-2 border-light-green rounded-xl flex items-center justify-center group-hover:bg-light-green transition-colors"><span class="text-light-green group-hover:text-white font-bold text-xl transition-colors">${escapeHtml(item.number)}</span></div><div><h3 class="text-2xl font-bold text-dark-green font-montserrat">${escapeHtml(item.title)}</h3><p class="text-gray-500 mt-1">${escapeHtml(item.desc)}</p></div></div>`).join('');
            return `<section class="slide ${bgClass} relative" data-slide-type="contents" data-slide-index="${idx}"><div class="slide-content p-16"><h2 class="text-7xl font-bold text-dark-green mb-16 font-montserrat">${escapeHtml(slide.title)}</h2><div class="grid grid-cols-2 gap-x-24 gap-y-10">${items}</div><div class="absolute bottom-8 left-8 flex items-center"><span class="bg-dark-green text-white px-3 py-1.5 text-sm font-bold">${escapeHtml(slide.year || '2026')}</span></div></div></section>`;
        }

        case 'content-split': {
            let leftHtml = '';
            if (slide.left) {
                const desc = slide.left.description ? `<p class="text-white/70 leading-relaxed mb-6 whitespace-pre-line">${escapeHtml(slide.left.description)}</p>` : '';
                const list = slide.left.list ? `<div class="space-y-3">${slide.left.list.map(li => `<div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-light-green/20 flex items-center justify-center text-light-green text-sm font-bold">${escapeHtml(li.number)}</div><span class="text-white/80">${escapeHtml(li.text)}</span></div>`).join('')}</div>` : '';
                const tags = slide.left.tags ? `<div class="flex gap-3 mt-4">${slide.left.tags.map(t => `<span class="px-6 py-2 border border-white/30 rounded-full text-sm">${escapeHtml(t)}</span>`).join('')}</div>` : '';
                const highlight = slide.left.highlight ? `<div class="p-5 bg-white/5 rounded-2xl border border-white/10 mt-4"><p class="text-white/80 text-sm">${escapeHtml(slide.left.highlight)}</p>${slide.left.subHighlight ? `<p class="text-white/40 text-xs mt-2">${escapeHtml(slide.left.subHighlight)}</p>` : ''}</div>` : '';
                leftHtml = `<div class="text-white">${desc}${list}${tags}${highlight}</div>`;
            }
            let rightHtml = '';
            if (slide.rightCard) {
                if (slide.rightCard.grid2x2) {
                    const grid = slide.rightCard.grid2x2.map(cell => `<div class="bg-dark-green/5 rounded-2xl p-5 text-center"><div class="text-3xl mb-2">${escapeHtml(cell.icon)}</div><div class="text-dark-green font-bold">${escapeHtml(cell.title)}</div><div class="text-gray-500 text-sm mt-1">${escapeHtml(cell.sub)}</div></div>`).join('');
                    rightHtml = `<div class="bg-white rounded-[40px] p-10 shadow-2xl"><h3 class="text-xl font-bold text-dark-green mb-6">${escapeHtml(slide.rightCard.title)}</h3><div class="grid grid-cols-2 gap-4">${grid}</div></div>`;
                } else if (slide.rightCard.layers) {
                    const layers = slide.rightCard.layers.map(ly => `<div class="bg-dark-green/5 rounded-2xl p-5 border-l-4 ${ly.highlight ? 'border-light-green' : 'border-dark-green'}"><div class="${ly.highlight ? 'text-light-green' : 'text-dark-green'} font-bold text-lg mb-1">${escapeHtml(ly.number)}</div><div class="text-gray-600 text-sm">${escapeHtml(ly.text)}</div></div>`).join('');
                    rightHtml = `<div class="bg-white rounded-[40px] p-10 shadow-2xl"><h3 class="text-xl font-bold text-dark-green mb-6">${escapeHtml(slide.rightCard.title)}</h3><div class="space-y-4">${layers}</div></div>`;
                } else if (slide.rightCard.mainText) {
                    const main = slide.rightCard.mainText.map((t, i) => {
                        if (t === '→') return `<div class="text-gray-400 text-lg mb-4">→</div>`;
                        return `<div class="text-6xl font-bold ${i === slide.rightCard.mainText.length - 1 ? 'text-light-green' : 'text-dark-green'} mb-4 whitespace-pre-line">${escapeHtml(t)}</div>`;
                    }).join('');
                    const divider = slide.rightCard.divider ? `<div class="w-16 h-1 bg-light-green mx-auto mb-4"></div>` : '';
                    const footer = slide.rightCard.footer ? `<div class="mt-6 p-4 bg-dark-green rounded-2xl text-center"><p class="text-white/90 text-sm font-medium">${escapeHtml(slide.rightCard.footer)}</p></div>` : '';
                    rightHtml = `<div class="bg-white rounded-[40px] p-10 shadow-2xl">${slide.rightCard.badge ? renderBadgeLight(slide.rightCard.badge) : ''}<div class="text-center py-8">${main}${divider}</div>${footer}</div>`;
                }
            }
            let topHtml = '';
            if (slide.topElements) {
                topHtml = slide.topElements.map(el => {
                    if (el.type === 'cards-row') {
                        const cards = el.cards.map(c => `<div class="col-span-1 bg-white/5 rounded-xl p-4 border border-white/10 text-center flex flex-col justify-center"><div class="text-light-green text-2xl font-bold font-montserrat">${escapeHtml(c.number)}</div><div class="text-white font-bold text-sm mt-1">${escapeHtml(c.title)}</div><div class="text-white/40 text-[11px] mt-1">${escapeHtml(c.sub)}</div></div>`).join('');
                        return `<div class="grid grid-cols-6 gap-4 mb-5 items-stretch">${cards}</div>`;
                    } else if (el.type === 'prompt-bar') {
                        const steps = el.steps.map((s, i) => `<span class="text-white/50 text-xs">${escapeHtml(s)}</span>${i < el.steps.length - 1 ? '<span class="text-white/20">→</span>' : ''}`).join('');
                        return `<div class="col-span-3 bg-white/5 rounded-xl px-5 py-3 border border-light-green/20 flex items-center justify-center gap-2"><span class="text-light-green text-xs font-bold">${escapeHtml(el.label)}</span>${steps}</div>`;
                    }
                    return '';
                }).join('');
            }
            let imagesHtml = '';
            if (slide.images) {
                const imgs = slide.images.map(img => {
                    if (img.style === 'arrow') return `<div class="flex items-center justify-center"><div class="text-white/30 text-2xl">→</div></div>`;
                    if (img.style === 'placeholder') return `<div class="image-placeholder rounded-xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center h-[160px] cursor-pointer"><span class="text-white/20 text-xs">+</span></div>`;
                    const borderClass = img.style === 'highlight' ? 'border-2 border-light-green/50' : 'border-2 border-white/10';
                    const labelBg = img.style === 'highlight' ? 'bg-light-green/80' : 'bg-black/70';
                    const labelColor = img.style === 'highlight' ? 'text-dark-green' : 'text-white/70';
                    const boldClass = img.style === 'highlight' ? 'font-bold' : '';
                    return `<div class="rounded-xl overflow-hidden ${borderClass} relative"><img src="${escapeHtml(img.src)}" class="w-full h-[160px] object-cover" onerror="this.style.display='none';this.parentElement.classList.add('bg-white/5');"><div class="absolute bottom-0 left-0 right-0 ${labelBg} px-2 py-1"><span class="${labelColor} text-[10px] ${boldClass}">${escapeHtml(img.label)}</span></div></div>`;
                }).join('');
                imagesHtml = `<div class="grid grid-cols-6 gap-3 items-center mt-4" data-img-zone="comparison">${imgs}</div>`;
            }
            let footerHtml = '';
            if (slide.footer) {
                footerHtml = `<div class="mt-5 p-4 bg-white/5 rounded-xl border border-light-green/20 flex items-center justify-between"><div class="flex items-center gap-3"><span class="bg-dark-green text-white px-3 py-1 text-xs font-bold rounded">${escapeHtml(slide.footer.badge)}</span><span class="text-light-green font-bold text-sm">${escapeHtml(slide.footer.quote)}</span></div><div class="text-white/40 text-xs">${escapeHtml(slide.footer.subquote)}</div></div>`;
            }
            return `<section class="slide ${bgClass}" data-slide-type="content-split" data-slide-index="${idx}"><div class="slide-content p-16">${renderBadge(slide.badge)}<h2 class="text-4xl font-bold text-white mb-1 font-montserrat">${escapeHtml(slide.title)}</h2><h3 class="text-lg text-white/60 mb-6">${escapeHtml(slide.subtitle)}</h3>${topHtml}${imagesHtml}<div class="grid grid-cols-2 gap-16 h-full items-center mt-4">${leftHtml}${rightHtml}</div>${footerHtml}</div></section>`;
        }

        case 'gallery': {
            const imgs = (slide.images || []).map(img => {
                const borderClass = img.style === 'highlight' ? 'border-2 border-light-green/50' : 'border-2 border-white/10';
                const labelBg = img.style === 'highlight' ? 'bg-light-green/80' : 'bg-black/60';
                const labelColor = img.style === 'highlight' ? 'text-dark-green' : 'text-white/80';
                const boldClass = img.style === 'highlight' ? 'font-bold' : '';
                return `<div class="col-span-1 rounded-2xl overflow-hidden relative ${borderClass}"><img src="${escapeHtml(img.src)}" class="w-full h-full object-cover" onerror="this.style.display='none'"><div class="absolute bottom-0 left-0 right-0 ${labelBg} px-3 py-2"><span class="${labelColor} text-xs ${boldClass}">${escapeHtml(img.label)}</span></div></div>`;
            }).join('');
            const caption = slide.caption ? `<div class="mt-4 flex items-center justify-center gap-8"><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-white/30"></div><span class="text-white/50 text-sm">${escapeHtml(slide.caption.left)}</span></div><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-light-green"></div><span class="text-white/50 text-sm">${escapeHtml(slide.caption.right)}</span></div></div>` : '';
            return `<section class="slide ${bgClass}" data-slide-type="gallery" data-slide-index="${idx}"><div class="slide-content p-16">${renderBadge(slide.badge)}<h2 class="text-3xl font-bold text-white font-montserrat mb-1">${escapeHtml(slide.title)}</h2><h3 class="text-lg text-white/60 mb-6">${escapeHtml(slide.subtitle)}</h3><div class="grid grid-cols-4 gap-4 flex-1">${imgs}</div>${caption}</div></section>`;
        }

        case 'case': {
            const cases = (slide.cases || []).map(c => `<div class="space-y-4"><div class="text-white/80 font-medium mb-4">${escapeHtml(c.title)}</div><div class="bg-black/30 rounded-2xl overflow-hidden"><div class="grid grid-cols-2"><div class="p-5 bg-white/5"><div class="text-white/50 text-sm mb-2">${escapeHtml(c.before.label)}</div><div class="text-white/80 text-sm">${escapeHtml(c.before.text)}</div><div class="text-white/40 text-xs mt-2">${escapeHtml(c.before.sub)}</div></div><div class="p-5 bg-light-green/20"><div class="text-light-green text-sm mb-2">${escapeHtml(c.after.label)}</div><div class="text-white text-sm font-medium">${escapeHtml(c.after.text)}</div><div class="text-white/70 text-xs mt-2">${escapeHtml(c.after.sub)}</div></div></div></div></div>`).join('');
            const quote = slide.quote ? `<div class="mt-8 text-center"><div class="inline-block bg-dark-green/50 rounded-full px-8 py-3"><span class="text-light-green font-bold">${escapeHtml(slide.quote)}</span></div></div>` : '';
            return `<section class="slide ${bgClass} relative" data-slide-type="case" data-slide-index="${idx}"><div class="bg-white rounded-b-[40px] p-10 mx-16">${renderBadgeLight(slide.badge)}<h2 class="text-3xl font-bold text-dark-green font-montserrat">${escapeHtml(slide.title)}</h2><h3 class="text-xl text-gray-700 mt-2">${escapeHtml(slide.subtitle)}</h3></div><div class="p-16"><div class="grid grid-cols-3 gap-6">${cases}</div>${quote}</div></section>`;
        }

        case 'data': {
            const items = (slide.items || []).map(item => `<div class="bg-white/5 rounded-2xl p-6 border ${item.highlight ? 'border-light-green/30' : 'border-white/10'}"><div class="text-5xl font-bold text-light-green font-montserrat mb-2">${escapeHtml(item.value)}</div><div class="text-white font-bold mb-1">${escapeHtml(item.title)}</div><div class="text-white/50 text-sm">${escapeHtml(item.desc)}</div></div>`).join('');
            const watermark = slide.watermark ? `<div class="absolute bottom-0 right-0 text-[180px] font-bold text-white/5 leading-none font-montserrat select-none">${escapeHtml(slide.watermark)}</div>` : '';
            return `<section class="slide ${bgClass} relative overflow-hidden" data-slide-type="data" data-slide-index="${idx}">${watermark}<div class="slide-content relative z-10 p-16">${renderBadge(slide.badge)}<h2 class="text-4xl font-bold text-white mb-2 font-montserrat">${escapeHtml(slide.title)}</h2><h3 class="text-2xl text-white/80 mb-10">${escapeHtml(slide.subtitle)}</h3><div class="grid grid-cols-4 gap-6">${items}</div></div></section>`;
        }

        case 'quote': {
            const tags = (slide.tags || []).map(t => `<span class="px-8 py-3 border border-white/40 rounded-full text-sm">${escapeHtml(t)}</span>`).join('');
            return `<section class="slide ${bgClass} relative overflow-hidden" data-slide-type="quote" data-slide-index="${idx}"><div class="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2"><svg class="w-72 h-72" viewBox="0 0 200 200"><defs><path id="cp${idx}" d="M 100,100 m -85,0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"/></defs><text fill="rgba(255,255,255,0.08)" font-size="9" letter-spacing="3"><textPath href="#cp${idx}">AIGC • ${escapeHtml(brand)} • AIGC • ${escapeHtml(brand)} • </textPath></text></svg></div><div class="slide-content relative z-10 p-16 flex flex-col justify-center items-center text-center"><div class="w-16 h-1 bg-light-green mb-12"></div><h2 class="text-5xl font-bold text-white leading-tight mb-6 max-w-3xl">${escapeHtml(slide.title)}<br><span class="text-light-green">${escapeHtml(slide.highlightTitle)}</span></h2><p class="text-white/50 text-lg max-w-xl mb-12 whitespace-pre-line">${escapeHtml(slide.description)}</p><div class="flex gap-6">${tags}</div><div class="absolute bottom-8 right-8 text-white/30 text-sm">${escapeHtml(slide.footer)}</div></div></section>`;
        }

        default:
            return `<section class="slide ${bgClass}" data-slide-type="${type}" data-slide-index="${idx}"><div class="slide-content p-16"><h2 class="text-white">Unknown slide type: ${type}</h2></div></section>`;
    }
}

function buildHTML(data) {
    const brand = data.meta?.brand || 'WILDERNESS MEDIA';
    const title = data.meta?.title || 'Wilderness PPT';
    const slidesHtml = (data.slides || []).map((slide, idx) => renderSlide(slide, idx, brand)).join('\n');
    
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
    <script>
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    'dark-green': '#2D3A2D',
                    'forest-green': '#3D4F3D',
                    'light-green': '#4ADE80',
                    'fluorescent-green': '#22C55E',
                },
                fontFamily: {
                    'montserrat': ['Montserrat', 'sans-serif'],
                    'noto': ['Noto Sans SC', 'sans-serif'],
                }
            }
        }
    }
    </script>
    <style>
    html, body { height: 100%; overflow-x: hidden; margin: 0; padding: 0; }
    html { scroll-snap-type: y mandatory; scroll-behavior: smooth; }
    .slide {
        width: 100vw; height: 100vh; height: 100dvh;
        overflow: hidden; scroll-snap-align: start;
        display: flex; flex-direction: column; position: relative; box-sizing: border-box;
    }
    .slide-content {
        flex: 1; display: flex; flex-direction: column; justify-content: center;
        max-height: 100%; overflow: hidden;
    }
    :root {
        --title-size: clamp(2rem, 4vw, 3.5rem);
        --h2-size: clamp(1.5rem, 3vw, 2.5rem);
        --h3-size: clamp(1.25rem, 2vw, 1.75rem);
        --body-size: clamp(0.875rem, 1.5vw, 1.125rem);
        --slide-padding: clamp(1.5rem, 4vw, 4rem);
        --data-size: clamp(2.5rem, 5vw, 4rem);
    }
    .progress-bar {
        position: fixed; top: 0; left: 0; height: 3px;
        background: #4ADE80; z-index: 1000; transition: width 0.3s ease;
    }
    .page-indicator {
        position: fixed; bottom: 24px; right: 32px;
        font-family: 'Montserrat', sans-serif; font-size: 12px;
        color: rgba(255,255,255,0.4); z-index: 900; pointer-events: none;
    }
    .page-indicator.on-light { color: rgba(0,0,0,0.3); }
    .nav-dots {
        position: fixed; right: 16px; top: 50%; transform: translateY(-50%);
        display: flex; flex-direction: column; gap: 8px; z-index: 900;
    }
    .nav-dot {
        width: 8px; height: 8px; border-radius: 50%;
        background: rgba(255,255,255,0.3); cursor: pointer; transition: all 0.3s;
    }
    .nav-dot.active { background: #4ADE80; transform: scale(1.4); }
    .nav-dot.on-light { background: rgba(0,0,0,0.2); }
    .nav-dot.on-light.active { background: #2D3A2D; }
    body.overview-mode { scroll-snap-type: none !important; scroll-behavior: auto !important; }
    body.overview-mode .slide { height: auto; min-height: auto; overflow: visible; scroll-snap-align: none; border-bottom: 4px solid rgba(0,0,0,0.1); }
    body.overview-mode .slide:hover { outline: 3px solid #4ADE80; outline-offset: -3px; cursor: pointer; }
    body.edit-mode .slide { border: 2px solid transparent; transition: border-color 0.2s; }
    body.edit-mode .slide:hover { border-color: #4ADE80; }
    body.edit-mode [contenteditable="true"] { outline: 2px dashed #4ADE80; outline-offset: 4px; border-radius: 4px; cursor: text !important; }
    body.edit-mode [contenteditable="true"]:focus { outline: 2px solid #4ADE80; background: rgba(74,222,128,0.05); }
    body.move-mode .slide { border: 2px solid transparent; transition: border-color 0.2s; }
    body.move-mode .slide:hover { border-color: #22C55E; }
    body.move-mode * { cursor: move !important; }
    body.move-mode .slide-content *:hover { outline: 1px dashed #22C55E; }
    .edit-toolbar {
        position: fixed; top: 16px; left: 50%; transform: translateX(-50%);
        display: none; gap: 8px; z-index: 2000;
        background: rgba(45,58,45,0.95); backdrop-filter: blur(12px);
        padding: 8px 16px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    body.edit-mode .edit-toolbar { display: flex; }
    .edit-toolbar button {
        background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
        color: white; padding: 6px 14px; border-radius: 8px; font-size: 13px;
        cursor: pointer; font-family: 'Noto Sans SC', sans-serif;
        transition: all 0.2s; white-space: nowrap;
    }
    .edit-toolbar button:hover { background: #4ADE80; color: #2D3A2D; border-color: #4ADE80; }
    .mode-indicator {
        position: fixed; top: 16px; left: 16px;
        font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600;
        letter-spacing: 0.1em; text-transform: uppercase;
        padding: 4px 10px; border-radius: 6px; z-index: 2000;
        pointer-events: none; opacity: 0; transition: opacity 0.3s;
    }
    .mode-indicator.visible { opacity: 1; }
    .mode-indicator.edit { background: rgba(251,191,36,0.2); color: #fbbf24; }
    .keyboard-hint {
        position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
        font-family: 'Montserrat', sans-serif; font-size: 11px;
        color: rgba(255,255,255,0.3); z-index: 900; pointer-events: none;
        opacity: 0; transition: opacity 0.5s;
    }
    .keyboard-hint.show { opacity: 1; }
    .circular-text { animation: rotate 60s linear infinite; }
    @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    body { font-family: 'Noto Sans SC', sans-serif; background: #1a1a1a; }
    @media (max-height: 700px) { .slide { padding: 24px !important; } }
    @media (max-height: 600px) { .keyboard-hint { display: none; } .nav-dots { display: none; } }
    @media (max-width: 600px) {
        .nav-dots { display: none; }
        .slide .grid { grid-template-columns: 1fr !important; }
    }
    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.2s !important; }
        html { scroll-behavior: auto; }
        .circular-text { animation: none; }
    }
    </style>
</head>
<body>
<div class="progress-bar" id="progressBar" style="width: 0%"></div>
<nav class="nav-dots" id="navDots"></nav>
<div class="page-indicator" id="pageIndicator">1 / 10</div>
<div class="mode-indicator" id="modeIndicator"></div>
<div class="edit-toolbar" id="editToolbar">
    <button onclick="toggleContentEditable()">编辑文字(E)</button>
    <button onclick="toggleMoveMode()">移动位置(M)</button>
    <button onclick="insertImage()">插入图片</button>
    <button onclick="insertVideo()">插入视频</button>
    <button onclick="sendToAI()" style="background:#4ADE80;color:#2D3A2D;border-color:#4ADE80;font-weight:bold;">发给 AI 修改</button>
    <button onclick="deleteCurrentSlide()">删除页面</button>
    <button onclick="downloadHTML()">保存文件</button>
</div>
<div class="keyboard-hint" id="keyboardHint">← → 翻页 · F 全屏 · P 演讲者 · E 编辑文字 · M 移动位置 · Esc 概览</div>
${slidesHtml}
<script>
(function() {
    'use strict';
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let isEditMode = false;
    let isOverviewMode = false;
    let isMoveMode = false;
    let editTimeout = null;
    let autoSaveInterval = null;

    const STORAGE_KEY = 'wilderness_ppt_edits_v1';

    function saveEdits() {
        const edits = {};
        slides.forEach((slide, idx) => {
            const slideEdits = {};
            slide.querySelectorAll('[data-edit-id]').forEach(el => {
                const id = el.dataset.editId;
                const content = el.innerHTML;
                const transform = el.style.transform;
                const left = el.style.left;
                const top = el.style.top;
                const position = el.style.position;
                if (id) {
                    slideEdits[id] = { content, transform, left, top, position };
                }
            });
            if (Object.keys(slideEdits).length > 0) {
                edits[idx] = slideEdits;
            }
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(edits));
        showSaveIndicator();
    }

    function loadEdits() {
        try {
            const edits = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
            Object.keys(edits).forEach(slideIdx => {
                const slide = slides[slideIdx];
                if (!slide) return;
                const slideEdits = edits[slideIdx];
                Object.keys(slideEdits).forEach(id => {
                    const el = slide.querySelector('[data-edit-id="' + id + '"]');
                    if (el) {
                        const data = slideEdits[id];
                        if (data.content) el.innerHTML = data.content;
                        if (data.transform) el.style.transform = data.transform;
                        if (data.left) el.style.left = data.left;
                        if (data.top) el.style.top = data.top;
                        if (data.position) el.style.position = data.position;
                    }
                });
            });
        } catch(e) { console.log('No saved edits found'); }
    }

    function showSaveIndicator() {
        const indicator = document.createElement('div');
        indicator.textContent = '已自动保存';
        indicator.style.cssText = 'position:fixed;top:60px;right:16px;background:#4ADE80;color:#2D3A2D;padding:6px 12px;border-radius:6px;font-size:12px;z-index:3000;transition:opacity 0.5s;';
        document.body.appendChild(indicator);
        setTimeout(() => { indicator.style.opacity = '0'; setTimeout(() => indicator.remove(), 500); }, 1500);
    }

    function initEditIds() {
        slides.forEach((slide, slideIdx) => {
            const textElements = slide.querySelectorAll('h1,h2,h3,h4,p,span,li,div[class*="text-"],.font-montserrat,.font-bold');
            let elIdx = 0;
            textElements.forEach(el => {
                if (!el.closest('svg') && !el.dataset.editId && el.textContent.trim().length > 0) {
                    el.dataset.editId = 's' + slideIdx + '_e' + elIdx++;
                }
            });
        });
    }

    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        currentSlide = index;
        slides[index].scrollIntoView({ behavior: 'smooth' });
        updateUI();
    }
    function nextSlide() { if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1); }
    function prevSlide() { if (currentSlide > 0) goToSlide(currentSlide - 1); }

    function updateUI() {
        const p = ((currentSlide + 1) / totalSlides) * 100;
        document.getElementById('progressBar').style.width = p + '%';
        const ind = document.getElementById('pageIndicator');
        ind.textContent = (currentSlide + 1) + ' / ' + totalSlides;
        const s = slides[currentSlide];
        const isLight = s.classList.contains('bg-white');
        ind.className = 'page-indicator' + (isLight ? ' on-light' : '');
        document.querySelectorAll('.nav-dot').forEach((d, i) => {
            d.classList.toggle('active', i === currentSlide);
            if (isLight && i === currentSlide) d.classList.add('on-light');
            else d.classList.remove('on-light');
        });
    }

    function createNavDots() {
        const c = document.getElementById('navDots');
        slides.forEach((_, i) => {
            const d = document.createElement('div');
            d.className = 'nav-dot';
            d.addEventListener('click', () => goToSlide(i));
            c.appendChild(d);
        });
    }

    function setupIO() {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { currentSlide = parseInt(e.target.dataset.slideIndex); updateUI(); } });
        }, { threshold: 0.6 });
        slides.forEach(s => obs.observe(s));
    }

    function handleKeyDown(e) {
        if (isEditMode && document.activeElement.contentEditable === 'true') {
            if (e.key === 'Escape') { document.activeElement.blur(); saveEdits(); }
            return;
        }
        switch(e.key) {
            case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown': e.preventDefault(); if (isOverviewMode) exitOverview(); nextSlide(); break;
            case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace': e.preventDefault(); if (isOverviewMode) exitOverview(); prevSlide(); break;
            case 'f': case 'F': e.preventDefault(); toggleFullscreen(); break;
            case 'p': case 'P': e.preventDefault(); openPresenterMode(); break;
            case 'e': case 'E': e.preventDefault(); toggleEditMode(); break;
            case 'm': case 'M': e.preventDefault(); toggleMoveMode(); break;
            case 'Escape': if (isOverviewMode) exitOverview(); else if (isMoveMode) toggleMoveMode(); else if (isEditMode) toggleEditMode(); else toggleOverview(); break;
        }
    }
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', handleKeyDown);

    document.addEventListener('fullscreenchange', () => { if (document.fullscreenElement) document.fullscreenElement.focus(); });

    let touchStartX = 0;
    document.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
    document.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - touchStartX; if (Math.abs(dx) > 50) { dx < 0 ? nextSlide() : prevSlide(); } });

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            slides[currentSlide].requestFullscreen().then(() => slides[currentSlide].focus()).catch(() => document.documentElement.requestFullscreen());
        } else document.exitFullscreen();
    }

    function toggleOverview() { isOverviewMode = !isOverviewMode; document.body.classList.toggle('overview-mode', isOverviewMode); }
    function exitOverview() { isOverviewMode = false; document.body.classList.remove('overview-mode'); goToSlide(currentSlide); }
    document.addEventListener('click', e => { if (isOverviewMode) { const s = e.target.closest('.slide'); if (s) { currentSlide = parseInt(s.dataset.slideIndex); exitOverview(); } } });

    function toggleEditMode() {
        isEditMode = !isEditMode;
        document.body.classList.toggle('edit-mode', isEditMode);
        const mi = document.getElementById('modeIndicator');
        mi.textContent = isEditMode ? 'EDIT MODE (Click text to edit)' : '';
        mi.className = 'mode-indicator visible edit';
        clearTimeout(editTimeout);
        editTimeout = setTimeout(() => mi.classList.remove('visible'), 3000);
        if (isEditMode) { enableEditing(); startAutoSave(); } else { disableEditing(); stopAutoSave(); saveEdits(); }
    }

    function enableEditing() {
        const slide = slides[currentSlide];
        const selectors = 'h1,h2,h3,h4,p,span,li,div[class*="text-"],.font-montserrat,.font-bold,div[class*="rounded"]';
        slide.querySelectorAll(selectors).forEach(el => {
            if (!el.closest('svg') && el.textContent.trim().length > 0) { el.contentEditable = 'true'; el.style.cursor = 'text'; }
        });
        slide.dataset.editable = 'true';
    }

    function disableEditing() {
        slides.forEach(s => {
            s.querySelectorAll('[contenteditable]').forEach(el => { el.contentEditable = 'false'; el.style.cursor = ''; });
            delete s.dataset.editable;
        });
    }

    function startAutoSave() { autoSaveInterval = setInterval(saveEdits, 5000); }
    function stopAutoSave() { if (autoSaveInterval) { clearInterval(autoSaveInterval); autoSaveInterval = null; } }

    function toggleMoveMode() {
        isMoveMode = !isMoveMode;
        const mi = document.getElementById('modeIndicator');
        mi.textContent = isMoveMode ? 'MOVE MODE (Drag elements)' : '';
        mi.className = 'mode-indicator visible';
        mi.style.background = 'rgba(74,222,128,0.2)';
        mi.style.color = '#4ADE80';
        clearTimeout(editTimeout);
        editTimeout = setTimeout(() => mi.classList.remove('visible'), 3000);
        if (isMoveMode) enableDragging(); else { disableDragging(); saveEdits(); }
    }

    let draggedEl = null, dragOffsetX = 0, dragOffsetY = 0;
    function enableDragging() {
        const slide = slides[currentSlide];
        slide.querySelectorAll('div,h1,h2,h3,h4,p,span').forEach(el => {
            if (!el.closest('svg') && el.textContent.trim().length > 0) { el.style.cursor = 'move'; el.draggable = false; el.addEventListener('mousedown', startDrag); }
        });
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', endDrag);
    }
    function disableDragging() {
        slides.forEach(s => { s.querySelectorAll('*').forEach(el => { el.style.cursor = ''; el.removeEventListener('mousedown', startDrag); }); });
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', endDrag);
    }
    function startDrag(e) { if (!isMoveMode) return; e.preventDefault(); draggedEl = e.currentTarget; const style = window.getComputedStyle(draggedEl); if (style.position === 'static') draggedEl.style.position = 'relative'; dragOffsetX = e.clientX; dragOffsetY = e.clientY; draggedEl.style.zIndex = '1000'; draggedEl.style.transition = 'none'; }
    function onDrag(e) { if (!draggedEl) return; e.preventDefault(); const dx = e.clientX - dragOffsetX; const dy = e.clientY - dragOffsetY; const currentTransform = draggedEl.style.transform || ''; const translateMatch = currentTransform.match(/translate\(([^)]+)\)/); let baseX = 0, baseY = 0; if (translateMatch) { const parts = translateMatch[1].split(',').map(p => parseFloat(p) || 0); baseX = parts[0]; baseY = parts[1] || 0; } draggedEl.style.transform = 'translate(' + (baseX + dx) + 'px, ' + (baseY + dy) + 'px)'; dragOffsetX = e.clientX; dragOffsetY = e.clientY; }
    function endDrag(e) { if (draggedEl) { draggedEl.style.zIndex = ''; draggedEl.style.transition = ''; draggedEl = null; saveEdits(); } }

    window.toggleContentEditable = function() { toggleEditMode(); };
    window.toggleMoveMode = function() { toggleMoveMode(); };

    window.sendToAI = function() {
        const s = slides[currentSlide];
        const type = s.dataset.slideType || 'unknown';
        const idx = currentSlide + 1;
        const h1 = s.querySelector('h1');
        const h2 = s.querySelector('h2');
        const h3 = s.querySelector('h3');
        const titleText = h2 ? h2.innerText.trim() : (h1 ? h1.innerText.trim() : '');
        const subTitleText = h3 ? h3.innerText.trim() : '';
        const allText = Array.from(s.querySelectorAll('p, span, li, div.font-bold')).map(el => el.innerText.trim()).filter(t => t.length > 0 && t !== titleText && t !== subTitleText);
        const uniqueText = [...new Set(allText)].slice(0, 15);
        const imgs = Array.from(s.querySelectorAll('img')).map(img => { const label = img.closest('div')?.querySelector('span')?.innerText?.trim() || ''; return label ? label + ': ' + img.src : img.src; });
        let prompt = '请修改第' + idx + '页（类型：' + type + '）\n';
        if (titleText) prompt += '标题：' + titleText + '\n';
        if (subTitleText) prompt += '副标题：' + subTitleText + '\n';
        if (uniqueText.length > 0) prompt += '\n页面内容：\n' + uniqueText.map(t => '- ' + t).join('\n') + '\n';
        if (imgs.length > 0) prompt += '\n图片资源：\n' + imgs.map(i => '- ' + i).join('\n') + '\n';
        prompt += '\n修改要求：';
        navigator.clipboard.writeText(prompt).then(() => alert('当前页面信息已复制到剪贴板！\n\n请回到 Claude Code 粘贴发送。')).catch(() => alert('复制失败，请手动复制以下内容：\n\n' + prompt));
    };

    window.insertImage = function() {
        const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*';
        input.onchange = e => {
            const f = e.target.files[0]; if (!f) return;
            const r = new FileReader();
            r.onload = ev => {
                const src = ev.target.result;
                const slide = slides[currentSlide];
                const zone = slide.querySelector('[data-img-zone]');
                if (zone) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'rounded-xl overflow-hidden border-2 border-light-green/50 relative';
                    wrapper.innerHTML = '<img src="' + src + '" class="w-full h-[140px] object-cover"><div class="absolute bottom-0 left-0 right-0 bg-light-green/80 px-2 py-1"><span class="text-dark-green text-[10px] font-bold">新插入</span></div>';
                    zone.appendChild(wrapper);
                } else {
                    let imgGrid = slide.querySelector('.img-insert-zone');
                    if (!imgGrid) { imgGrid = document.createElement('div'); imgGrid.className = 'grid grid-cols-4 gap-4 mt-4'; imgGrid.setAttribute('data-img-zone', 'inserted'); (slide.querySelector('.slide-content') || slide).appendChild(imgGrid); }
                    const wrapper = document.createElement('div');
                    wrapper.className = 'rounded-xl overflow-hidden border-2 border-light-green/50 relative';
                    wrapper.innerHTML = '<img src="' + src + '" class="w-full h-[140px] object-cover"><div class="absolute bottom-0 left-0 right-0 bg-light-green/80 px-2 py-1"><span class="text-dark-green text-[10px] font-bold">新插入</span></div>';
                    imgGrid.appendChild(wrapper);
                }
                saveEdits();
            };
            r.readAsDataURL(f);
        };
        input.click();
    };

    window.insertVideo = function() {
        const url = prompt('请输入视频URL：'); if (!url) return;
        let embed = url;
        if (url.includes('youtube.com/watch')) { const id = new URL(url).searchParams.get('v'); embed = 'https://www.youtube.com/embed/' + id; }
        if (url.includes('bilibili.com/video/')) { const bv = url.match(/BV\w+/)?.[0]; embed = 'https://player.bilibili.com/player.html?bvid=' + bv; }
        const iframe = document.createElement('iframe');
        iframe.src = embed; iframe.className = 'rounded-2xl w-full'; iframe.allowFullscreen = true; iframe.style.aspectRatio = '16/9';
        (slides[currentSlide].querySelector('.slide-content') || slides[currentSlide]).appendChild(iframe);
        saveEdits();
    };

    window.deleteCurrentSlide = function() {
        if (totalSlides <= 1) { alert('至少保留一页'); return; }
        if (!confirm('确定删除第' + (currentSlide + 1) + '页？')) return;
        slides[currentSlide].remove();
        document.querySelectorAll('.slide').forEach((s, i) => s.dataset.slideIndex = i);
        location.reload();
    };

    window.downloadHTML = function() {
        saveEdits();
        const blob = new Blob([document.documentElement.outerHTML], { type: 'text/html' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
        a.download = document.title + '.html'; a.click();
    };

    window.openPresenterMode = function() {
        const w = window.open('', 'presenter', 'width=1200,height=700');
        w.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>演讲者模式</title><style>body{margin:0;font-family:\'Noto Sans SC\',sans-serif;background:#1a1a1a;color:white;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto 1fr auto;height:100vh}h2{grid-column:1/-1;text-align:center;padding:12px;background:#2D3A2D;margin:0;font-size:14px}.current,.next{padding:20px;overflow:hidden}.controls{grid-column:1/-1;text-align:center;padding:16px;background:#2D3A2D}.timer{font-family:Montserrat,monospace;font-size:24px}</style></head><body><h2>演讲者模式</h2><div class="current"><h3>当前页</h3><div id="cv"></div></div><div class="next"><h3>下一页</h3><div id="nv"></div></div><div class="controls"><span class="timer" id="tm">00:00</span> <button onclick="sec=0">重置</button> <button onclick="paused=!paused">暂停</button></div></body></html>');
        let sec = 0, paused = false;
        setInterval(() => { if (!paused) { sec++; const m=String(Math.floor(sec/60)).padStart(2,'0'),s=String(sec%60).padStart(2,'0'); const t=w.document.getElementById('tm'); if(t)t.textContent=m+':'+s; } }, 1000);
        function upd(i) { const cv=w.document.getElementById('cv'),nv=w.document.getElementById('nv'); if(cv)cv.innerHTML=slides[i].outerHTML; if(nv)nv.innerHTML=slides[i+1]?slides[i+1].outerHTML:'<p style="opacity:0.5">最后一页</p>'; }
        upd(currentSlide);
        try { const ch = new BroadcastChannel('ppt-sync'); ch.onmessage = e => { if(e.data.t==='s') upd(e.data.i); }; } catch(e){}
    };

    initEditIds();
    loadEdits();
    createNavDots();
    setupIO();
    updateUI();
    setTimeout(() => { const h = document.getElementById('keyboardHint'); h.classList.add('show'); setTimeout(() => h.classList.remove('show'), 4000); }, 500);
})();
</script>
</body>
</html>`;
}

function main() {
    const args = process.argv.slice(2);
    const inputFile = args[0] || 'aigc-demo.json';
    const outputFile = args[1] || path.join('output', 'AIGC培训课程.html');
    
    const inputPath = path.resolve(inputFile);
    if (!fs.existsSync(inputPath)) {
        console.error('Input file not found:', inputPath);
        process.exit(1);
    }
    
    const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    const html = buildHTML(data);
    const outPath = path.resolve(outputFile);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
    console.log('Generated:', outPath, `(${Math.round(html.length / 1024)}KB)`);
}

main();
