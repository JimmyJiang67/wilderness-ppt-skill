---
name: wilderness-ppt
description: 基于邝野传媒（Wilderness Media）品牌设计规范的HTML幻灯片生成器。零依赖单文件HTML，支持演示模式（全屏/演讲者/概览）和编辑模式（直接编辑/重新生成/插入媒体）。
---

# Wilderness PPT — 邝野传媒幻灯片生成器

基于邝野传媒品牌设计规范创建专业级HTML幻灯片。

## 品牌DNA

**核心识别**：深墨绿 + 亮绿色 + 大圆角白色卡片

| 元素 | 规格 |
|------|------|
| 主背景 | `#2D3A2D` 深墨绿 |
| 强调色 | `#4ADE80` 亮绿 |
| 卡片背景 | `#FFFFFF` 纯白，圆角40px |
| 字体 | Montserrat（英文标题）+ Noto Sans SC（中文） |
| 页面标识 | PRO/JECT SHOWCASE |
| 装饰元素 | 环形SVG文字、大号水印 |

## 页面类型系统

| 类型 | 用途 | 视觉特征 |
|------|------|----------|
| **Cover** | 封面 | 环形文字 + 主标题 + 年份标记 |
| **Contents** | 目录 | 白底 + 绿色边框编号 + 网格布局 |
| **Content-Split** | 内容分栏 | 深绿底 + 左侧文字 + 右侧白色卡片 |
| **Data** | 数据展示 | 水印文字 + 大号亮绿数字 |
| **Case** | 项目案例 | 顶部白色卡片 + 底部对比网格 |
| **Gallery** | 图片画廊 | 圆角网格 + 悬停效果 |

## Phase 0: 模式检测

识别用户需求类型：

- **新建模式**：从文档/大纲生成完整PPT → 进入Phase 1
- **优化模式**：已有HTML需要改进 → 读取现有文件，分析后优化
- **编辑模式**：指定页面重新生成 → 定位slide-index，替换内容

## Phase 1: 内容摄取

### Step 1.1: 读取源文档

读取用户提供的文档（MD/TXT/PDF），分析：
- 文档结构（主标题、章节、要点层级）
- 数据指标（数字、百分比）
- 图片资源路径

### Step 1.2: 匹配页面类型

根据内容特征匹配页面类型：

```
# 主标题 → Cover封面页
## 章节标题 → Contents目录页或新页面
- 含数字/百分比 → Data数据页
- 含对比描述 → Case案例页
- 含图片 → Gallery画廊页
- 纯文字描述 → Content-Split内容页
```

### Step 1.3: 生成分页方案

输出结构：
```json
[
  { "type": "cover", "title": "主标题", "subtitle": "副标题" },
  { "type": "contents", "items": ["章节1", "章节2", ...] },
  { "type": "content-split", "title": "页面标题", "points": ["要点1", "要点2"] },
  ...
]
```

**确认分页方案**后再进入Phase 2。

## Phase 2: 生成HTML

### Step 2.1: 读取模板架构

必须读取 `references/html-template.md` 获取：
- HTML基础结构（head资源、viewport设置）
- 引擎CSS变量和基础样式
- SlideEngine类（导航/演示/编辑功能）

### Step 2.2: 读取页面类型模板

根据分页方案，读取 `references/slide-types.md` 中对应的HTML模板。

### Step 2.3: 按品牌规范生成

**色彩CSS变量**（必须包含）：
```css
:root {
  --dark-green: #2D3A2D;
  --forest-green: #3D4F3D;
  --light-green: #4ADE80;
  --fluorescent-green: #22C55E;
}
```

**关键设计约束**：
1. 每页必须 `height: 100vh; height: 100dvh; overflow: hidden`
2. 所有字号使用 `clamp(min, preferred, max)`
3. 白色卡片使用 `rounded-[40px]`
4. 数据数字使用 `text-light-green` 颜色
5. 页面顶部包含 `PRO/JECT SHOWCASE` 标识

### Step 2.4: 组装单文件

输出：单HTML文件，包含：
- CDN资源（Tailwind + Google Fonts）
- 内联CSS（品牌变量 + 引擎样式）
- 所有slide的HTML
- 内嵌JavaScript引擎

## Phase 3: 交付

1. **保存文件**：`[标题]_slides.html`
2. **打开浏览器**：自动启动查看
3. **说明快捷键**：
   - `← →` / `Space`：翻页
   - `F`：全屏
   - `P`：演讲者模式
   - `E`：编辑模式
   - `Esc`：概览模式

4. **说明编辑功能**（如启用）：
   - 按 `E` 进入编辑模式
   - 点击文字直接编辑
   - 工具栏：插入图片/视频/重新生成/删除页面
   - `Ctrl+S` 或点击保存下载文件

## Phase 4: 迭代编辑（按需）

当用户要求修改某页时：

1. **定位页面**：根据 `data-slide-index` 找到对应section
2. **重新生成**：读取当前内容 + 用户新要求 → 生成新HTML
3. **替换内容**：Edit替换文件中对应section
4. **刷新查看**：用户刷新浏览器查看更新

### 重新生成指令格式

用户可以在编辑模式下点击"复制重新生成指令"，自动复制到剪贴板：

```
请重新生成第N页（类型：content-split）：

当前内容摘要：[内容预览]

修改要求：[用户补充]
```

## 内容密度限制

| 页面类型 | 最大内容 |
|---------|---------|
| Cover | 主标题 + 副标题 + 年份 |
| Contents | 6-8个章节项 |
| Content-Split | 1标题 + 4-6个要点 |
| Data | 1标题 + 3-4个数据指标 |
| Case | 1标题 + 3个对比卡片 |
| Gallery | 1标题 + 4-6张图片 |

**超出限制？分页处理，不要挤压。**

## 图片处理

### 用户提供图片
- 读取图片路径，嵌入HTML
- 图片容器使用 `rounded-2xl overflow-hidden`
- 添加悬停效果：`hover:scale-105 transition-transform`

### 图片占位符
- 无图片区域显示虚线边框占位符
- 编辑模式下可点击插入本地图片

## 品质检查清单

生成后必须确认：

- [ ] 使用了深墨绿 `#2D3A2D` 作为主背景
- [ ] 白色卡片使用 `rounded-[40px]` 大圆角
- [ ] 关键数据使用亮绿色 `#4ADE80`
- [ ] 每页高度锁定 `100vh`，无内部滚动
- [ ] 字号使用 `clamp()` 响应式
- [ ] 页面顶部有 `PRO/JECT SHOWCASE` 标识
- [ ] 包含装饰元素（环形文字/水印）
- [ ] 键盘导航功能正常
- [ ] 编辑模式工具栏可用（如启用）

## 支持文件

| 文件 | 用途 | 何时读取 |
|------|------|---------|
| `references/brand-spec.md` | 品牌设计规范完整版 | Phase 2 |
| `references/slide-types.md` | 6种页面类型模板 | Phase 2 |
| `references/html-template.md` | HTML架构和引擎代码 | Phase 2 |
| `references/content-parsing.md` | 文档解析策略 | Phase 1 |

## 示例调用

```
用户：帮我做一个AIGC培训课程的PPT，内容在附件里

→ Phase 0: 新建模式
→ Phase 1: 读取附件，分析结构，匹配页面类型
→ Phase 2: 按品牌规范生成HTML
→ Phase 3: 保存并打开浏览器
```

```
用户：第3页效果不够好，重新生成一下，要更有冲击力

→ Phase 0: 编辑模式
→ Phase 4: 定位第3页，读取当前内容，重新生成，替换
```
