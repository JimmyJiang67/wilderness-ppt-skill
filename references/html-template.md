# HTML 模板架构

单文件HTML结构，包含三模式引擎（演示模式 + 编辑模式 + 移动模式）

## 文件结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- Meta + CDN资源 + Tailwind配置 -->
</head>
<body>
    <!-- UI组件：进度条/导航点/页码/编辑工具栏 -->
    <!-- Slides容器 -->
    <!-- 引擎Script -->
</body>
</html>
```

## Head部分

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[标题] - Wilderness Media</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind配置 -->
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
    
    <!-- 引擎样式 -->
    <style>
    /* [完整引擎样式见下文] */
    </style>
</head>
```

## 引擎样式 (style)

```css
/* === VIEWPORT LOCK === */
html, body { 
    height: 100%; 
    overflow-x: hidden; 
    margin: 0; 
    padding: 0; 
}
html { 
    scroll-snap-type: y mandatory; 
    scroll-behavior: smooth; 
}

/* === SLIDE === */
.slide {
    width: 100vw; 
    height: 100vh; 
    height: 100dvh;
    overflow: hidden; 
    scroll-snap-align: start;
    display: flex; 
    flex-direction: column; 
    position: relative; 
    box-sizing: border-box;
}
.slide-content {
    flex: 1; 
    display: flex; 
    flex-direction: column; 
    justify-content: center;
    max-height: 100%; 
    overflow: hidden;
}

/* === TYPOGRAPHY === */
:root {
    --title-size: clamp(2rem, 4vw, 3.5rem);
    --h2-size: clamp(1.5rem, 3vw, 2.5rem);
    --h3-size: clamp(1.25rem, 2vw, 1.75rem);
    --body-size: clamp(0.875rem, 1.5vw, 1.125rem);
    --slide-padding: clamp(1.5rem, 4vw, 4rem);
    --data-size: clamp(2.5rem, 5vw, 4rem);
}

/* === PROGRESS BAR === */
.progress-bar {
    position: fixed; 
    top: 0; 
    left: 0; 
    height: 3px;
    background: #4ADE80; 
    z-index: 1000; 
    transition: width 0.3s ease;
}

/* === PAGE INDICATOR === */
.page-indicator {
    position: fixed; 
    bottom: 24px; 
    right: 32px;
    font-family: 'Montserrat', sans-serif; 
    font-size: 12px;
    color: rgba(255,255,255,0.4); 
    z-index: 900; 
    pointer-events: none;
}
.page-indicator.on-light { 
    color: rgba(0,0,0,0.3); 
}

/* === NAV DOTS === */
.nav-dots {
    position: fixed; 
    right: 16px; 
    top: 50%; 
    transform: translateY(-50%);
    display: flex; 
    flex-direction: column; 
    gap: 8px; 
    z-index: 900;
}
.nav-dot {
    width: 8px; 
    height: 8px; 
    border-radius: 50%;
    background: rgba(255,255,255,0.3); 
    cursor: pointer; 
    transition: all 0.3s;
}
.nav-dot.active { 
    background: #4ADE80; 
    transform: scale(1.4); 
}
.nav-dot.on-light { 
    background: rgba(0,0,0,0.2); 
}
.nav-dot.on-light.active { 
    background: #2D3A2D; 
}

/* === OVERVIEW MODE === */
body.overview-mode { 
    scroll-snap-type: none !important; 
    scroll-behavior: auto !important; 
}
body.overview-mode .slide { 
    height: auto; 
    min-height: auto; 
    overflow: visible; 
    scroll-snap-align: none; 
    border-bottom: 4px solid rgba(0,0,0,0.1); 
}
body.overview-mode .slide:hover { 
    outline: 3px solid #4ADE80; 
    outline-offset: -3px; 
    cursor: pointer; 
}

/* === EDIT MODE === */
body.edit-mode .slide { 
    border: 2px solid transparent; 
    transition: border-color 0.2s; 
}
body.edit-mode .slide:hover { 
    border-color: #4ADE80; 
}
body.edit-mode [contenteditable="true"] { 
    outline: 2px dashed #4ADE80; 
    outline-offset: 4px; 
    border-radius: 4px; 
    cursor: text !important;
}
body.edit-mode [contenteditable="true"]:focus { 
    outline: 2px solid #4ADE80; 
    background: rgba(74,222,128,0.05); 
}

/* === MOVE MODE === */
body.move-mode .slide { 
    border: 2px solid transparent; 
    transition: border-color 0.2s; 
}
body.move-mode .slide:hover { 
    border-color: #22C55E; 
}
body.move-mode * { 
    cursor: move !important; 
}
body.move-mode .slide-content *:hover { 
    outline: 1px dashed #22C55E; 
}

/* === EDIT TOOLBAR === */
.edit-toolbar {
    position: fixed; 
    top: 16px; 
    left: 50%; 
    transform: translateX(-50%);
    display: none; 
    gap: 8px; 
    z-index: 2000;
    background: rgba(45,58,45,0.95); 
    backdrop-filter: blur(12px);
    padding: 8px 16px; 
    border-radius: 12px; 
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
body.edit-mode .edit-toolbar { 
    display: flex; 
}
.edit-toolbar button {
    background: rgba(255,255,255,0.1); 
    border: 1px solid rgba(255,255,255,0.2);
    color: white; 
    padding: 6px 14px; 
    border-radius: 8px; 
    font-size: 13px;
    cursor: pointer; 
    font-family: 'Noto Sans SC', sans-serif; 
    transition: all 0.2s; 
    white-space: nowrap;
}
.edit-toolbar button:hover { 
    background: #4ADE80; 
    color: #2D3A2D; 
    border-color: #4ADE80; 
}

/* === MODE INDICATOR === */
.mode-indicator {
    position: fixed; 
    top: 16px; 
    left: 16px;
    font-family: 'Montserrat', sans-serif; 
    font-size: 11px; 
    font-weight: 600;
    letter-spacing: 0.1em; 
    text-transform: uppercase;
    padding: 4px 10px; 
    border-radius: 6px; 
    z-index: 2000;
    pointer-events: none; 
    opacity: 0; 
    transition: opacity 0.3s;
}
.mode-indicator.visible { 
    opacity: 1; 
}
.mode-indicator.edit { 
    background: rgba(251,191,36,0.2); 
    color: #fbbf24; 
}

/* === KEYBOARD HINT === */
.keyboard-hint {
    position: fixed; 
    bottom: 24px; 
    left: 50%; 
    transform: translateX(-50%);
    font-family: 'Montserrat', sans-serif; 
    font-size: 11px;
    color: rgba(255,255,255,0.3); 
    z-index: 900; 
    pointer-events: none;
    opacity: 0; 
    transition: opacity 0.5s;
}
.keyboard-hint.show { 
    opacity: 1; 
}

/* === CIRCULAR TEXT === */
.circular-text { 
    animation: rotate 60s linear infinite; 
}
@keyframes rotate { 
    from { transform: rotate(0deg); } 
    to { transform: rotate(360deg); } 
}

body { 
    font-family: 'Noto Sans SC', sans-serif; 
    background: #1a1a1a; 
}

/* === RESPONSIVE === */
@media (max-height: 700px) { 
    .slide { padding: 24px !important; } 
}
@media (max-height: 600px) { 
    .keyboard-hint { display: none; } 
    .nav-dots { display: none; } 
}
@media (max-width: 600px) {
    .nav-dots { display: none; }
    .slide .grid { grid-template-columns: 1fr !important; }
}
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { 
        animation-duration: 0.01ms !important; 
        transition-duration: 0.2s !important; 
    }
    html { scroll-behavior: auto; }
    .circular-text { animation: none; }
}
```

## Body UI组件

```html
<body>
    <!-- 进度条 -->
    <div class="progress-bar" id="progressBar" style="width: 0%"></div>
    
    <!-- 导航点 -->
    <nav class="nav-dots" id="navDots"></nav>
    
    <!-- 页码指示器 -->
    <div class="page-indicator" id="pageIndicator">1 / 10</div>
    
    <!-- 模式指示器 -->
    <div class="mode-indicator" id="modeIndicator"></div>
    
    <!-- 编辑工具栏 -->
    <div class="edit-toolbar" id="editToolbar">
        <button onclick="toggleContentEditable()">编辑文字(E)</button>
        <button onclick="toggleMoveMode()">移动位置(M)</button>
        <button onclick="insertImage()">插入图片</button>
        <button onclick="insertVideo()">插入视频</button>
        <button onclick="sendToAI()" style="background:#4ADE80;color:#2D3A2D;border-color:#4ADE80;font-weight:bold;">发给 AI 修改</button>
        <button onclick="deleteCurrentSlide()">删除页面</button>
        <button onclick="downloadHTML()">保存文件</button>
    </div>
    
    <!-- 键盘提示 -->
    <div class="keyboard-hint" id="keyboardHint">← → 翻页 · F 全屏 · P 演讲者 · E 编辑文字 · M 移动位置 · Esc 概览</div>
    
    <!-- Slides容器 -->
    <section class="slide ..." data-slide-type="cover" data-slide-index="0">
        <!-- 页面内容 -->
    </section>
    <!-- 更多slides... -->
    
    <!-- 引擎Script -->
    <script>
    // [完整引擎脚本见下文 - 包含localStorage存储、拖拽移动、全屏修复等]
    </script>
</body>
```

## 引擎Script

```javascript
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

    // ==================== STORAGE ====================
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
                    const el = slide.querySelector(`[data-edit-id="${id}"]`);
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

    // ==================== INIT EDIT IDS ====================
    function initEditIds() {
        slides.forEach((slide, slideIdx) => {
            const textElements = slide.querySelectorAll('h1,h2,h3,h4,p,span,li,div[class*="text-"],.font-montserrat,.font-bold');
            let elIdx = 0;
            textElements.forEach(el => {
                if (!el.closest('svg') && !el.dataset.editId && el.textContent.trim().length > 0) {
                    el.dataset.editId = `s${slideIdx}_e${elIdx++}`;
                }
            });
        });
    }

    // ==================== NAVIGATION ====================
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

    // ==================== KEYBOARD (Fixed for fullscreen) ====================
    function handleKeyDown(e) {
        if (isEditMode && document.activeElement.contentEditable === 'true') {
            if (e.key === 'Escape') {
                document.activeElement.blur();
                saveEdits();
            }
            return;
        }

        switch(e.key) {
            case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown':
                e.preventDefault();
                if (isOverviewMode) exitOverview();
                nextSlide();
                break;
            case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace':
                e.preventDefault();
                if (isOverviewMode) exitOverview();
                prevSlide();
                break;
            case 'f': case 'F':
                e.preventDefault();
                toggleFullscreen();
                break;
            case 'p': case 'P':
                e.preventDefault();
                openPresenterMode();
                break;
            case 'e': case 'E':
                e.preventDefault();
                toggleEditMode();
                break;
            case 'm': case 'M':
                e.preventDefault();
                toggleMoveMode();
                break;
            case 'Escape':
                if (isOverviewMode) exitOverview();
                else if (isMoveMode) toggleMoveMode();
                else if (isEditMode) toggleEditMode();
                else toggleOverview();
                break;
        }
    }

    // Bind to both document and window for fullscreen compatibility
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', handleKeyDown);

    // Fullscreen change handler
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            document.fullscreenElement.focus();
        }
    });

    let touchStartX = 0;
    document.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
    document.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - touchStartX; if (Math.abs(dx) > 50) { dx < 0 ? nextSlide() : prevSlide(); } });

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            slides[currentSlide].requestFullscreen().then(() => {
                slides[currentSlide].focus();
            }).catch(() => {
                document.documentElement.requestFullscreen();
            });
        } else {
            document.exitFullscreen();
        }
    }

    function toggleOverview() {
        isOverviewMode = !isOverviewMode;
        document.body.classList.toggle('overview-mode', isOverviewMode);
    }
    function exitOverview() { isOverviewMode = false; document.body.classList.remove('overview-mode'); goToSlide(currentSlide); }
    document.addEventListener('click', e => { if (isOverviewMode) { const s = e.target.closest('.slide'); if (s) { currentSlide = parseInt(s.dataset.slideIndex); exitOverview(); } } });

    // ==================== EDIT MODE ====================
    function toggleEditMode() {
        isEditMode = !isEditMode;
        document.body.classList.toggle('edit-mode', isEditMode);
        const mi = document.getElementById('modeIndicator');
        mi.textContent = isEditMode ? 'EDIT MODE (Click text to edit)' : '';
        mi.className = 'mode-indicator visible edit';
        clearTimeout(editTimeout);
        editTimeout = setTimeout(() => mi.classList.remove('visible'), 3000);

        if (isEditMode) {
            enableEditing();
            startAutoSave();
        } else {
            disableEditing();
            stopAutoSave();
            saveEdits();
        }
    }

    function enableEditing() {
        const slide = slides[currentSlide];
        const selectors = 'h1,h2,h3,h4,p,span,li,div[class*="text-"],.font-montserrat,.font-bold,div[class*="rounded"]';
        slide.querySelectorAll(selectors).forEach(el => {
            if (!el.closest('svg') && el.textContent.trim().length > 0) {
                el.contentEditable = 'true';
                el.style.cursor = 'text';
            }
        });
        slide.dataset.editable = 'true';
    }

    function disableEditing() {
        slides.forEach(s => {
            s.querySelectorAll('[contenteditable]').forEach(el => {
                el.contentEditable = 'false';
                el.style.cursor = '';
            });
            delete s.dataset.editable;
        });
    }

    function startAutoSave() {
        autoSaveInterval = setInterval(saveEdits, 5000);
    }

    function stopAutoSave() {
        if (autoSaveInterval) {
            clearInterval(autoSaveInterval);
            autoSaveInterval = null;
        }
    }

    // ==================== MOVE MODE (Drag) ====================
    function toggleMoveMode() {
        isMoveMode = !isMoveMode;
        const mi = document.getElementById('modeIndicator');
        mi.textContent = isMoveMode ? 'MOVE MODE (Drag elements)' : '';
        mi.className = 'mode-indicator visible';
        mi.style.background = 'rgba(74,222,128,0.2)';
        mi.style.color = '#4ADE80';
        clearTimeout(editTimeout);
        editTimeout = setTimeout(() => mi.classList.remove('visible'), 3000);

        if (isMoveMode) {
            enableDragging();
        } else {
            disableDragging();
            saveEdits();
        }
    }

    let draggedEl = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    function enableDragging() {
        const slide = slides[currentSlide];
        slide.querySelectorAll('div,h1,h2,h3,h4,p,span').forEach(el => {
            if (!el.closest('svg') && el.textContent.trim().length > 0) {
                el.style.cursor = 'move';
                el.draggable = false;
                el.addEventListener('mousedown', startDrag);
            }
        });
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', endDrag);
    }

    function disableDragging() {
        slides.forEach(s => {
            s.querySelectorAll('*').forEach(el => {
                el.style.cursor = '';
                el.removeEventListener('mousedown', startDrag);
            });
        });
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', endDrag);
    }

    function startDrag(e) {
        if (!isMoveMode) return;
        e.preventDefault();
        draggedEl = e.currentTarget;
        const style = window.getComputedStyle(draggedEl);
        if (style.position === 'static') {
            draggedEl.style.position = 'relative';
        }
        dragOffsetX = e.clientX;
        dragOffsetY = e.clientY;
        draggedEl.style.zIndex = '1000';
        draggedEl.style.transition = 'none';
    }

    function onDrag(e) {
        if (!draggedEl) return;
        e.preventDefault();
        const dx = e.clientX - dragOffsetX;
        const dy = e.clientY - dragOffsetY;
        const currentTransform = draggedEl.style.transform || '';
        const translateMatch = currentTransform.match(/translate\(([^)]+)\)/);
        let baseX = 0, baseY = 0;
        if (translateMatch) {
            const parts = translateMatch[1].split(',').map(p => parseFloat(p) || 0);
            baseX = parts[0];
            baseY = parts[1] || 0;
        }
        draggedEl.style.transform = `translate(${baseX + dx}px, ${baseY + dy}px)`;
        dragOffsetX = e.clientX;
        dragOffsetY = e.clientY;
    }

    function endDrag(e) {
        if (draggedEl) {
            draggedEl.style.zIndex = '';
            draggedEl.style.transition = '';
            draggedEl = null;
            saveEdits();
        }
    }

    // ==================== TOOLBAR FUNCTIONS ====================
    window.toggleContentEditable = function() { toggleEditMode(); };
    window.toggleMoveMode = function() { toggleMoveMode(); };

    window.sendToAI = function() {
        const s = slides[currentSlide];
        const type = s.dataset.slideType || 'unknown';
        const idx = currentSlide + 1;
        
        // 提取标题
        const h1 = s.querySelector('h1');
        const h2 = s.querySelector('h2');
        const h3 = s.querySelector('h3');
        const titleText = h2 ? h2.innerText.trim() : (h1 ? h1.innerText.trim() : '');
        const subTitleText = h3 ? h3.innerText.trim() : '';
        
        // 提取所有可见文本（过滤空行）
        const allText = Array.from(s.querySelectorAll('p, span, li, div.font-bold'))
            .map(el => el.innerText.trim())
            .filter(t => t.length > 0 && t !== titleText && t !== subTitleText);
        const uniqueText = [...new Set(allText)].slice(0, 15);
        
        // 提取图片
        const imgs = Array.from(s.querySelectorAll('img'))
            .map(img => {
                const label = img.closest('div')?.querySelector('span')?.innerText?.trim() || '';
                return label ? `${label}: ${img.src}` : img.src;
            });
        
        let prompt = `请修改第${idx}页（类型：${type}）\n`;
        if (titleText) prompt += `标题：${titleText}\n`;
        if (subTitleText) prompt += `副标题：${subTitleText}\n`;
        if (uniqueText.length > 0) prompt += `\n页面内容：\n${uniqueText.map(t => '- ' + t).join('\n')}\n`;
        if (imgs.length > 0) prompt += `\n图片资源：\n${imgs.map(i => '- ' + i).join('\n')}\n`;
        prompt += `\n修改要求：`;
        
        navigator.clipboard.writeText(prompt).then(() => {
            alert('当前页面信息已复制到剪贴板！\n\n请回到 Claude Code 粘贴发送。');
        }).catch(() => {
            alert('复制失败，请手动复制以下内容：\n\n' + prompt);
        });
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
                    wrapper.innerHTML = `<img src="${src}" class="w-full h-[140px] object-cover"><div class="absolute bottom-0 left-0 right-0 bg-light-green/80 px-2 py-1"><span class="text-dark-green text-[10px] font-bold">新插入</span></div>`;
                    zone.appendChild(wrapper);
                } else {
                    let imgGrid = slide.querySelector('.img-insert-zone');
                    if (!imgGrid) {
                        imgGrid = document.createElement('div');
                        imgGrid.className = 'grid grid-cols-4 gap-4 mt-4';
                        imgGrid.setAttribute('data-img-zone', 'inserted');
                        (slide.querySelector('.slide-content') || slide).appendChild(imgGrid);
                    }
                    const wrapper = document.createElement('div');
                    wrapper.className = 'rounded-xl overflow-hidden border-2 border-light-green/50 relative';
                    wrapper.innerHTML = `<img src="${src}" class="w-full h-[140px] object-cover"><div class="absolute bottom-0 left-0 right-0 bg-light-green/80 px-2 py-1"><span class="text-dark-green text-[10px] font-bold">新插入</span></div>`;
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
        if (url.includes('youtube.com/watch')) { const id = new URL(url).searchParams.get('v'); embed = `https://www.youtube.com/embed/${id}`; }
        if (url.includes('bilibili.com/video/')) { const bv = url.match(/BV\w+/)?.[0]; embed = `https://player.bilibili.com/player.html?bvid=${bv}`; }
        const iframe = document.createElement('iframe');
        iframe.src = embed; iframe.className = 'rounded-2xl w-full'; iframe.allowFullscreen = true; iframe.style.aspectRatio = '16/9';
        (slides[currentSlide].querySelector('.slide-content') || slides[currentSlide]).appendChild(iframe);
        saveEdits();
    };

    window.deleteCurrentSlide = function() {
        if (totalSlides <= 1) { alert('至少保留一页'); return; }
        if (!confirm(`确定删除第${currentSlide+1}页？`)) return;
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
        w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>演讲者模式</title><style>body{margin:0;font-family:'Noto Sans SC',sans-serif;background:#1a1a1a;color:white;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto 1fr auto;height:100vh}h2{grid-column:1/-1;text-align:center;padding:12px;background:#2D3A2D;margin:0;font-size:14px}.current,.next{padding:20px;overflow:hidden}.controls{grid-column:1/-1;text-align:center;padding:16px;background:#2D3A2D}.timer{font-family:Montserrat,monospace;font-size:24px}</style></head><body><h2>演讲者模式</h2><div class="current"><h3>当前页</h3><div id="cv"></div></div><div class="next"><h3>下一页</h3><div id="nv"></div></div><div class="controls"><span class="timer" id="tm">00:00</span> <button onclick="sec=0">重置</button> <button onclick="paused=!paused">暂停</button></div></body></html>`);
        let sec = 0, paused = false;
        setInterval(() => { if (!paused) { sec++; const m=String(Math.floor(sec/60)).padStart(2,'0'),s=String(sec%60).padStart(2,'0'); const t=w.document.getElementById('tm'); if(t)t.textContent=m+':'+s; } }, 1000);
        function upd(i) { const cv=w.document.getElementById('cv'),nv=w.document.getElementById('nv'); if(cv)cv.innerHTML=slides[i].outerHTML; if(nv)nv.innerHTML=slides[i+1]?slides[i+1].outerHTML:'<p style="opacity:0.5">最后一页</p>'; }
        upd(currentSlide);
        try { const ch = new BroadcastChannel('ppt-sync'); ch.onmessage = e => { if(e.data.t==='s') upd(e.data.i); }; } catch(e){}
    };

    // ==================== INIT ====================
    initEditIds();
    loadEdits();
    createNavDots();
    setupIO();
    updateUI();
    setTimeout(() => { const h = document.getElementById('keyboardHint'); h.classList.add('show'); setTimeout(() => h.classList.remove('show'), 4000); }, 500);
})();
```

## 使用说明

1. **复制完整代码**：将上述head样式和script完整复制到输出HTML
2. **插入slides内容**：在UI组件后、script前插入所有slide section
3. **每slide必须**：`data-slide-type` 和 `data-slide-index` 属性
4. **slide类必须**：包含 `slide` class 和背景色 class（如 `bg-dark-green` 或 `bg-white`）

## 快捷键

| 按键 | 功能 |
|------|------|
| ← → / 空格 | 翻页 |
| F | 全屏 |
| P | 演讲者模式 |
| E | 编辑文字模式 |
| M | 移动位置模式（拖拽元素） |
| Esc | 退出当前模式 / 概览模式 |

## 关键约束

- 单文件HTML，所有CSS/JS内联
- 零构建工具依赖
- 零外部JS库（除Tailwind CDN）
- 浏览器直开即用
- **编辑自动保存**：使用localStorage保存编辑内容
- **拖拽移动**：在移动模式下可拖拽任意元素调整位置
