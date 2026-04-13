# 页面类型模板

6种标准页面类型，每种包含：判断规则 + HTML结构 + 设计约束

---

## 1. Cover 封面页

**判断规则**: 文档主标题/演示主题

**用途**: 演示开场，品牌第一印象

**视觉特征**: 深墨绿背景 + 环形SVG文字 + 主标题 + 年份

### HTML模板
```html
<section class="slide bg-dark-green relative" data-slide-type="cover" data-slide-index="0">
    <!-- 环形装饰文字 -->
    <div class="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2">
        <svg class="circular-text w-80 h-80" viewBox="0 0 200 200">
            <defs><path id="cp0" d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"/></defs>
            <text fill="rgba(255,255,255,0.15)" font-size="8" letter-spacing="2">
                <textPath href="#cp0">WILDERNESS MEDIA • WILDERNESS MEDIA • </textPath>
            </text>
        </svg>
    </div>
    
    <!-- 左侧装饰线 -->
    <div class="absolute left-16 top-1/2 -translate-y-1/2 w-px h-48 bg-white/20"></div>
    
    <!-- 主标题区域 -->
    <div class="absolute bottom-24 right-24 text-right">
        <div class="flex items-start gap-6">
            <div class="w-1.5 h-24 bg-light-green mt-2"></div>
            <div class="text-left">
                <h1 class="text-6xl font-bold text-white leading-tight">主标题</h1>
                <h1 class="text-6xl font-bold text-white leading-tight">第二行</h1>
            </div>
            <div class="text-left pt-2">
                <div class="text-3xl font-light text-white/70 tracking-wider">副标题英文</div>
                <div class="text-3xl font-light text-white/70 tracking-wider">副标题中文</div>
            </div>
        </div>
        <p class="text-white/50 mt-8 text-lg">描述语句</p>
    </div>
    
    <!-- 年份标记 -->
    <div class="absolute top-8 right-8 text-white/30 text-sm">2026</div>
</section>
```

### 设计约束
- 必须包含环形SVG装饰
- 主标题使用 `text-6xl` 以上字号
- 必须有亮绿色竖线装饰
- 右下角或顶部显示年份

---

## 2. Contents 目录页

**判断规则**: 章节列表/议程/大纲

**用途**: 展示演示结构

**视觉特征**: 白色背景 + 绿色边框编号 + 网格布局

### HTML模板
```html
<section class="slide bg-white relative" data-slide-type="contents" data-slide-index="1">
    <div class="slide-content p-16">
        <h2 class="text-7xl font-bold text-dark-green mb-16 font-montserrat">Contents.</h2>
        
        <div class="grid grid-cols-2 gap-x-24 gap-y-10">
            <!-- 目录项 -->
            <div class="flex items-start gap-5 group cursor-pointer">
                <div class="w-14 h-14 border-2 border-light-green rounded-xl flex items-center justify-center group-hover:bg-light-green transition-colors">
                    <span class="text-light-green group-hover:text-white font-bold text-xl transition-colors">1</span>
                </div>
                <div>
                    <h3 class="text-2xl font-bold text-dark-green font-montserrat">Chapter Title</h3>
                    <p class="text-gray-500 mt-1">章节描述</p>
                </div>
            </div>
            <!-- 更多项... -->
        </div>
        
        <!-- 底部年份 -->
        <div class="absolute bottom-8 left-8 flex items-center">
            <span class="bg-dark-green text-white px-3 py-1.5 text-sm font-bold">2026</span>
        </div>
    </div>
</section>
```

### 设计约束
- 白色背景
- 编号使用绿色边框方框
- 英文标题使用 Montserrat
- 悬停效果：背景变绿，文字变白
- 最多8项，超出则分多页

---

## 3. Content-Split 内容分栏页

**判断规则**: 文字描述+无数据/要点列表

**用途**: 概念讲解、流程说明、特性介绍

**视觉特征**: 深绿底 + 左侧文字 + 右侧白色卡片

### HTML模板
```html
<section class="slide bg-dark-green" data-slide-type="content-split" data-slide-index="2">
    <div class="slide-content p-16">
        <!-- PRO/JECT标识 -->
        <div class="flex items-center gap-2 mb-5">
            <span class="bg-white/20 px-3 py-1.5 text-xs font-bold">PRO</span>
            <span class="text-white/50 text-sm tracking-[0.2em]">JECT SHOWCASE</span>
        </div>
        
        <h2 class="text-4xl font-bold text-white mb-1 font-montserrat">English Title</h2>
        <h3 class="text-lg text-white/60 mb-6">中文标题 · 补充说明</h3>
        
        <!-- 内容网格 -->
        <div class="grid grid-cols-2 gap-16 h-full items-center">
            <!-- 左侧：文字内容 -->
            <div class="text-white">
                <p class="text-white/70 leading-relaxed mb-6">
                    主要描述文字...
                </p>
                <div class="space-y-3">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-light-green/20 flex items-center justify-center text-light-green text-sm font-bold">1</div>
                        <span class="text-white/80">要点一</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-light-green/20 flex items-center justify-center text-light-green text-sm font-bold">2</div>
                        <span class="text-white/80">要点二</span>
                    </div>
                </div>
            </div>
            
            <!-- 右侧：白色卡片 -->
            <div class="bg-white rounded-[40px] p-10 shadow-2xl">
                <h3 class="text-xl font-bold text-dark-green mb-6">卡片标题</h3>
                <!-- 卡片内容 -->
            </div>
        </div>
    </div>
</section>
```

### 设计约束
- 必须包含 PRO/JECT SHOWCASE 标识
- 左侧深色背景文字，右侧白色卡片
- 要点使用带数字的绿色背景圆角方块
- 白色卡片使用 `rounded-[40px]`

---

## 4. Data 数据展示页

**判断规则**: 含数字/百分比/指标/统计数据

**用途**: 展示关键数据、成果、KPI

**视觉特征**: 水印文字 + 大号亮绿数字

### HTML模板
```html
<section class="slide bg-dark-green relative overflow-hidden" data-slide-type="data" data-slide-index="3">
    <!-- 背景水印 -->
    <div class="absolute bottom-0 right-0 text-[180px] font-bold text-white/5 leading-none font-montserrat select-none">DATA</div>
    
    <div class="slide-content relative z-10 p-16">
        <!-- PRO/JECT标识 -->
        <div class="flex items-center gap-2 mb-6">
            <span class="bg-white/20 px-3 py-1.5 text-xs font-bold">PRO</span>
            <span class="text-white/50 text-sm tracking-[0.2em]">JECT SHOWCASE</span>
        </div>
        
        <h2 class="text-4xl font-bold text-white mb-2 font-montserrat">Data Title</h2>
        <h3 class="text-2xl text-white/80 mb-10">数据标题</h3>
        
        <!-- 数据网格 -->
        <div class="grid grid-cols-3 gap-8">
            <div class="text-center">
                <div class="text-6xl font-bold text-light-green font-montserrat mb-2">60+</div>
                <div class="text-white/60">指标说明</div>
            </div>
            <div class="text-center">
                <div class="text-6xl font-bold text-light-green font-montserrat mb-2">300W+</div>
                <div class="text-white/60">指标说明</div>
            </div>
            <div class="text-center">
                <div class="text-6xl font-bold text-light-green font-montserrat mb-2">4.8</div>
                <div class="text-white/60">指标说明</div>
            </div>
        </div>
    </div>
</section>
```

### 设计约束
- 必须有大号水印文字（透明度5%）
- 数字使用亮绿色 `text-light-green`
- 数字字号 `clamp(3rem, 6vw, 5rem)`
- 数据卡片布局均匀分布

---

## 5. Case 项目案例页

**判断规则**: 含对比描述/前后对比/方案对比

**用途**: 案例展示、方案对比、服务优势

**视觉特征**: 顶部白色卡片 + 底部对比网格

### HTML模板
```html
<section class="slide bg-dark-green relative" data-slide-type="case" data-slide-index="4">
    <!-- 顶部白色卡片 -->
    <div class="bg-white rounded-b-[40px] p-10 mx-16">
        <div class="flex items-center gap-2 mb-4">
            <span class="bg-dark-green text-white px-3 py-1.5 text-xs font-bold">PRO</span>
            <span class="text-gray-500 text-sm tracking-[0.2em]">JECT SHOWCASE</span>
        </div>
        <h2 class="text-3xl font-bold text-dark-green font-montserrat">Case Title</h2>
        <h3 class="text-xl text-gray-700 mt-2">案例标题 · 副标题</h3>
    </div>
    
    <!-- 下方对比内容 -->
    <div class="p-16">
        <div class="grid grid-cols-3 gap-6">
            <!-- 对比卡片1 -->
            <div class="bg-black/30 rounded-2xl overflow-hidden">
                <div class="grid grid-cols-2">
                    <div class="p-5 bg-white/5">
                        <div class="text-white/50 text-sm mb-2">普通方案</div>
                        <div class="text-white/80 text-sm">问题描述</div>
                    </div>
                    <div class="p-5 bg-light-green/20">
                        <div class="text-light-green text-sm mb-2">优化方案</div>
                        <div class="text-white text-sm font-medium">解决方案</div>
                    </div>
                </div>
            </div>
            <!-- 更多对比卡片... -->
        </div>
        
        <!-- 底部金句 -->
        <div class="mt-8 text-center">
            <div class="inline-block bg-dark-green/50 rounded-full px-8 py-3">
                <span class="text-light-green font-bold">核心洞察金句</span>
            </div>
        </div>
    </div>
</section>
```

### 设计约束
- 顶部必须有白色圆角卡片
- 对比卡片使用左右分栏（普通vs优化）
- 优化方案使用 `bg-light-green/20` 背景
- 底部可添加核心洞察金句

---

## 6. Gallery 图片画廊页

**判断规则**: 含图片/视觉素材/作品集展示

**用途**: 图片展示、作品展示、视觉案例

**视觉特征**: 圆角网格 + 悬停缩放

### HTML模板
```html
<section class="slide bg-dark-green" data-slide-type="gallery" data-slide-index="5">
    <div class="slide-content p-16">
        <!-- PRO/JECT标识 -->
        <div class="flex items-center gap-2 mb-2">
            <span class="bg-white/20 px-3 py-1.5 text-xs font-bold">PRO</span>
            <span class="text-white/50 text-sm tracking-[0.2em]">JECT SHOWCASE</span>
        </div>
        
        <h2 class="text-3xl font-bold text-white font-montserrat mb-1">Gallery Title</h2>
        <h3 class="text-lg text-white/60 mb-6">图片画廊描述</h3>
        
        <!-- 图片网格 -->
        <div class="grid grid-cols-4 gap-4 flex-1">
            <div class="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group">
                <img src="image1.jpg" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            </div>
            <div class="rounded-2xl overflow-hidden relative group">
                <img src="image2.jpg" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            </div>
            <div class="rounded-2xl overflow-hidden relative group">
                <img src="image3.jpg" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            </div>
            <!-- 更多图片... -->
        </div>
    </div>
</section>
```

### 设计约束
- 图片容器使用 `rounded-2xl overflow-hidden`
- 悬停效果：`group-hover:scale-105 transition-transform duration-500`
- 支持不规则网格（大图+小图组合）
- 图片使用 `object-cover` 保持比例

---

## 页面类型选择决策树

```
内容分析
├── 是主标题/主题？ → Cover
├── 是章节列表？ → Contents
├── 含图片为主？ → Gallery
├── 含数字/数据？ → Data
├── 含对比描述？ → Case
└── 其他文字内容？ → Content-Split
```

## 注意事项

1. **每页必须**: `data-slide-type` 和 `data-slide-index` 属性
2. **slide类必须**: `height: 100vh; overflow: hidden`
3. **内容超限**: 分页处理，不挤压在一页
4. **图片路径**: 使用相对路径或file://绝对路径
5. **响应式**: 所有尺寸使用 `clamp()` 或相对单位
