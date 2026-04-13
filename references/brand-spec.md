# 邝野传媒品牌设计规范

## 核心哲学

打造具有专业品质、现代感和品牌辨识度的企业级HTML PPT。融合深墨绿品牌色、简洁留白、卡片式布局，创造高端商务视觉体验。

**设计原则：品牌一致性 + 专业简洁 + 视觉层次 + 内容聚焦**

---

## I. 色彩系统

### 品牌主色
| 名称 | 色值 | 用途 |
|------|------|------|
| 深墨绿 | `#2D3A2D` | 主背景色，品牌识别色 |
| 森林绿 | `#3D4F3D` | 次要背景，渐变使用 |
| 浅墨绿 | `#4A5D4A` | 装饰元素，悬停状态 |

### 功能色
| 名称 | 色值 | 用途 |
|------|------|------|
| 纯白 | `#FFFFFF` | 卡片背景、文字、边框 |
| 浅灰白 | `#F5F5F5` | 次要背景、分隔区域 |
| 中灰色 | `#888888` | 次要文字、说明文字 |
| 深灰色 | `#333333` | 正文文字 |

### 强调色
| 名称 | 色值 | 用途 |
|------|------|------|
| 亮绿色 | `#4ADE80` | 关键数据、高亮标签、CTA按钮 |
| 荧光绿 | `#22C55E` | 数据强调、进度指示 |
| 淡绿色 | `#86EFAC` | 渐变装饰、轻量高亮 |

### 色彩应用策略
1. **背景分层**: 深墨绿(主) → 白色(卡片) → 浅灰(区域)
2. **数据高亮**: 亮绿色用于数字、百分比、关键指标
3. **标签系统**: 白色边框 + 透明背景的标签按钮
4. **渐变装饰**: 深墨绿到森林绿的微妙渐变

---

## II. 布局系统

### 页面规格
- **尺寸**: 响应式，锁定 `100vh` 高度
- **内边距**: `p-16` (64px) 默认
- **最大内容宽度**: 容器内自动适配

### 布局模式

#### 1. 左右分栏布局 (60/40 或 50/50)
```html
<div class="grid grid-cols-2 gap-12 items-center">
    <div class="left-content">
        <h2>主标题</h2>
        <p>描述文字</p>
    </div>
    <div class="right-content">
        <!-- 图片/卡片/数据 -->
    </div>
</div>
```

#### 2. 白色卡片浮层布局
```html
<!-- 深绿背景上的白色圆角卡片 -->
<div class="bg-dark-green min-h-screen p-16">
    <div class="bg-white rounded-[40px] p-12 shadow-2xl">
        <!-- 卡片内容 -->
    </div>
</div>
```

#### 3. 图片网格布局
```html
<div class="grid grid-cols-3 gap-4">
    <div class="rounded-2xl overflow-hidden">
        <img src="..." class="w-full h-full object-cover">
    </div>
</div>
```

### 间距系统
| 用途 | 值 |
|------|-----|
| 页面内边距 | `p-16` (64px) |
| 卡片内边距 | `p-8` ~ `p-12` (32px ~ 48px) |
| 元素间距 | `gap-4` ~ `gap-8` (16px ~ 32px) |
| 大卡片圆角 | `rounded-[40px]` |
| 中卡片圆角 | `rounded-2xl` (16px) |
| 小元素圆角 | `rounded-lg` (8px) |
| 标签圆角 | `rounded-full` |

---

## III. 字体系统

### 字体家族
| 用途 | 字体 |
|------|------|
| 英文标题 | Montserrat (300-700) |
| 中文标题 | Noto Sans SC Bold |
| 正文 | Noto Sans SC Regular |
| 数据数字 | Montserrat |

### 字体层次
```css
/* 页面大标题 */
font-size: clamp(2rem, 4vw, 3.5rem);
font-weight: 700;
color: #2D3A2D;

/* 英文副标题 */
font-size: clamp(1.25rem, 2vw, 1.75rem);
font-weight: 600;
letter-spacing: 0.05em;

/* 中文主标题 */
font-size: clamp(1.5rem, 3vw, 2.5rem);
font-weight: 700;

/* 正文 */
font-size: clamp(0.875rem, 1.5vw, 1.125rem);
line-height: 1.8;

/* 数据数字 */
font-size: clamp(2.5rem, 5vw, 4rem);
font-weight: 700;
color: #4ADE80;
```

### 文字颜色规范
| 背景 | 用途 | 颜色 |
|------|------|------|
| 深色背景 | 主文字 | 白色 `#FFFFFF` |
| 浅色背景 | 标题 | 深墨绿 `#2D3A2D` |
| 浅色背景 | 正文 | 深灰 `#333333` |
| 任何背景 | 次要说明 | 中灰 `#888888` |
| 任何背景 | 高亮数据 | 亮绿 `#4ADE80` |

---

## IV. 组件系统

### 1. 页面标识 (PRO/JECT SHOWCASE)
```html
<div class="flex items-center gap-2 mb-6">
    <span class="bg-white/20 px-3 py-1.5 text-xs font-bold">PRO</span>
    <span class="text-white/50 text-sm tracking-[0.2em]">JECT SHOWCASE</span>
</div>
```

### 2. 标签按钮
```html
<span class="px-6 py-2 border border-white/30 rounded-full text-sm text-white">
    最前沿
</span>
```

### 3. 数据指标卡片
```html
<div class="text-center">
    <div class="text-5xl font-bold text-light-green mb-2">300W+</div>
    <div class="text-gray-600">全网平台播放量</div>
</div>
```

### 4. 对比展示卡片
```html
<div class="grid grid-cols-2 gap-0 rounded-2xl overflow-hidden">
    <div class="bg-white/10 p-6">
        <div class="text-white/50 mb-2">普通提示词</div>
        <div class="text-white/80 text-sm">效果一般</div>
    </div>
    <div class="bg-light-green/20 p-6">
        <div class="text-light-green text-sm mb-2">优化提示词</div>
        <div class="text-white text-sm font-medium">专业质感</div>
    </div>
</div>
```

### 5. 环形装饰文字
```html
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <svg class="circular-text w-80 h-80" viewBox="0 0 200 200">
        <defs>
            <path id="cp" d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"/>
        </defs>
        <text fill="rgba(255,255,255,0.15)" font-size="8" letter-spacing="2">
            <textPath href="#cp">WILDERNESS MEDIA • WILDERNESS MEDIA • </textPath>
        </text>
    </svg>
</div>
```

---

## V. 装饰元素

### 1. 大号水印文字
```html
<div class="absolute bottom-0 right-0 text-[180px] font-bold text-white/5 leading-none select-none">
    BRAND
</div>
```

### 2. 分隔线
```html
<div class="w-16 h-1 bg-light-green mb-6"></div>
```

### 3. 年份标记
```html
<div class="absolute bottom-8 left-8">
    <span class="bg-dark-green text-white px-3 py-1 text-sm">2026</span>
</div>
```

---

## VI. 技术规格

### CDN资源
```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
```

### Tailwind配置
```javascript
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
```

---

## VII. 品质检查清单

- [ ] 使用了深墨绿 `#2D3A2D` 作为主背景色
- [ ] 白色卡片使用 40px 大圆角
- [ ] 关键数据使用亮绿色 `#4ADE80` 高亮
- [ ] 标签按钮使用圆角边框设计
- [ ] 图片展示使用圆角容器
- [ ] 页面顶部有统一的 PRO/JECT SHOWCASE 标识
- [ ] 字体层次分明（英文标题 + 中文标题 + 正文）
- [ ] 留白充足，不拥挤
- [ ] 包含装饰性元素（环形文字/水印文字）
- [ ] 每页高度锁定 100vh，无内部滚动
- [ ] 整体专业且符合品牌调性

---

*文档版本: v1.0*
*品牌: 邝野传媒 Wilderness Media*
