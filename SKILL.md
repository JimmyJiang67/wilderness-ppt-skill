---
name: wilderness-ppt
description: 基于邝野传媒（Wilderness Media）品牌设计规范的HTML幻灯片生成器。支持JSON剧本层编辑、双栏实时预览编辑器、以及AI逐页/批量共创模式。
---

# Wilderness PPT — 邝野传媒幻灯片生成器

基于邝野传媒品牌设计规范创建专业级HTML幻灯片。

**核心变更**：内容层与展示层已解耦。现在 `JSON` 是编辑源文件，`HTML` 仅用于演示。所有排版、字体、颜色由渲染引擎锁定，你只需关心内容。

---

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

---

## 页面类型系统

| 类型 | 用途 | 视觉特征 |
|------|------|----------|
| **Cover** | 封面 | 环形文字 + 主标题 + 年份标记 |
| **Contents** | 目录 | 白底 + 绿色边框编号 + 网格布局 |
| **Content-Split** | 内容分栏 | 深绿底 + 左侧文字 + 右侧白色卡片 |
| **Data** | 数据展示 | 水印文字 + 大号亮绿数字 |
| **Case** | 项目案例 | 顶部白色卡片 + 底部对比网格 |
| **Gallery** | 图片画廊 | 圆角网格 + 图片标签 |
| **Quote** | 金句结尾 | 居中大字 + 高亮文字 + 底部标签 |

---

## 工作流入口（两种模式）

### `/page` — 逐页共创模式
**适用场景**：内容还在打磨，需要一页一页和 AI 讨论。

流程：
1. 用户说："我们开始做第 3 页"
2. AI 只生成当前页的 **JSON 片段**
3. 用户确认或提出修改（"标题改一下"、"加张图"、"换位置"）
4. 确认满意后，AI 将这一页 JSON **追加**到总剧本中
5. 进入下一页，前面的页面 **不可被 AI 回头修改**

> 关键规则：**已锁定的页码不能重写**。如果用户想改前面的页，必须明确说 "修改第 N 页"。

### `/batch` — 批量生成模式
**适用场景**：用户已有完整文档/大纲，希望一次性出稿。

流程：
1. 读取用户提供的大纲/文档
2. AI 输出完整的 **JSON 剧本**（包含所有页面）
3. 用户浏览后指出要改的页码
4. AI 只修改指定的页面，其他页面保持不变
5. 最终生成 `xxx_slides.html` 用于演示

---

## 文件结构

生成/编辑一份 PPT 时，产出两个文件：

| 文件 | 作用 | 谁编辑 |
|------|------|--------|
| `xxx_slides.json` | **内容源文件**。纯 JSON，包含每页的文字、图片路径、结构 | 用户 + AI |
| `xxx_slides.html` | **演示文件**。全屏滚动、暗绿风格、演讲用 | 只看不改 |

额外工具：
- `editor.html`：本地双栏编辑器。左栏改 JSON，右栏实时渲染。支持上传图片、拖拽调顺序、一键导出 HTML。

---

## JSON 剧本格式

```json
{
  "meta": {
    "title": "AIGC培训课程 - 邝野传媒",
    "brand": "WILDERNESS MEDIA"
  },
  "slides": [
    {
      "type": "cover",
      "bg": "dark-green",
      "title": ["AIGC", "培训课程"],
      "subtitle": ["AI 破局", "全行业实战内参"],
      "description": "懂品牌、懂社媒、懂 AI 的整合型内容团队",
      "year": "2026"
    },
    {
      "type": "contents",
      "bg": "white",
      "title": "Contents.",
      "items": [
        {"number": "1", "title": "AI Basics", "desc": "自我介绍 + AI基础通识"}
      ],
      "year": "2026"
    }
  ]
}
```

### 各页面类型的 JSON 字段速查

**Cover**
- `title`: 字符串数组（逐行显示）
- `subtitle`: 字符串数组
- `description`: 底部描述
- `year`: 年份

**Contents**
- `title`: 通常为 "Contents."
- `items`: 数组，`{number, title, desc}`
- `year`: 底部年份

**Content-Split**
- `badge`: `{prefix, suffix}`（如 PRO / JECT SHOWCASE）
- `title`: 英文大标题
- `subtitle`: 中文副标题
- `left`: 左侧内容对象
  - `description`: 描述文字
  - `list`: 要点数组 `{number, text}`
  - `tags`: 标签字符串数组
  - `highlight` / `subHighlight`: 引用块
- `rightCard`: 右侧白色卡片
  - `title`: 卡片标题
  - `layers`: 三层结构 `{number, text, highlight}`
  - `grid2x2`: 2x2 网格 `{icon, title, sub}`
  - `mainText`: 居中大字数组（如 `["1张图", "→", "1个角色\\n资产"]`）
  - `divider`: 是否显示分隔线
  - `footer`: 卡片底部文字
- `topElements`: 顶部特殊组件（如卡片行、PROMPT 公式条）
- `images`: 图片数组（用于带图片对比的内容页）
- `footer`: 底部金句条 `{badge, quote, subquote}`

**Gallery**
- `badge`: 同上
- `title` / `subtitle`
- `images`: 数组 `{src, label, style}`，`style` 可选 `normal` 或 `highlight`
- `caption`: 底部说明 `{left, right}`

**Case**
- `badge`: 同上（显示在顶部白卡里）
- `title` / `subtitle`
- `cases`: 对比数组 `{title, before:{label,text,sub}, after:{label,text,sub}}`
- `quote`: 底部金句

**Data**
- `badge`: 同上
- `title` / `subtitle`
- `watermark`: 右下角大水印文字
- `items`: 数据数组 `{value, title, desc, highlight}`

**Quote**
- `title`: 主标题（白色）
- `highlightTitle`: 高亮标题（亮绿色）
- `description`: 说明文字
- `tags`: 底部标签数组
- `footer`: 右下角署名

---

## 本地编辑器 `editor.html`

项目内置一个零依赖的本地编辑器：`editor.html`

### 用法
1. 双击 `editor.html`，用浏览器打开
2. 左栏粘贴或编辑 JSON 剧本
3. 点击「重新渲染」，右栏实时显示演示效果
4. 点击「导出 HTML」，下载可演讲的完整单文件 HTML

### 界面
```
┌──────────────┬──────────────────────┐
│  JSON 编辑区  │     实时预览区        │
│              │  (全屏滚动幻灯片)      │
│  [重新渲染]   │                      │
│  [导出 HTML]  │                      │
└──────────────┴──────────────────────┘
```

---

## Phase 0: 模式检测

识别用户需求类型：

- **`/page` 逐页模式**：用户说"开始第 N 页"、"我们一页一页做" → 只生成当前页 JSON，确认后追加
- **`/batch` 批量模式**：用户提供了完整文档/大纲 → 生成完整 JSON 剧本
- **优化模式**：已有 JSON/HTML 需要改进 → 读取后局部修改
- **编辑模式**：指定页面重新生成 → 定位 slide-index，替换 JSON

---

## Phase 1: 内容摄取

### Step 1.1: 读取源文档

读取用户提供的文档（MD/TXT/PDF），分析：
- 文档结构（主标题、章节、要点层级）
- 数据指标（数字、百分比）
- 图片资源路径

### Step 1.2: 匹配页面类型

根据内容特征匹配页面类型：

```
# 主标题/主题 → Cover
## 章节列表/大纲 → Contents
- 含对比描述（前后对比） → Case
- 含图片为主 → Gallery
- 含数字/数据/时间 → Data
- 纯文字描述/概念讲解 → Content-Split
- 结尾金句/号召 → Quote
```

### Step 1.3: 生成分页方案

以 JSON 格式输出分页方案，用户确认后再继续。

---

## Phase 2: 生成/渲染

### 逐页模式 (/page)

1. 询问用户："第 N 页你想讲什么？"
2. 根据内容选择页面类型
3. 输出当前页的 JSON 片段
4. 用户修改确认后，追加到总 JSON
5. 询问："是否进入第 N+1 页？"

### 批量模式 (/batch)

1. 读取整个文档，生成完整 JSON 剧本
2. 保存为 `xxx_slides.json`
3. 调用渲染逻辑（或让用户自行在 `editor.html` 中渲染）
4. 输出 `xxx_slides.html`

---

## Phase 3: 交付

输出文件保存位置：`output/xxx_slides.json` 和 `output/xxx_slides.html`

同时告知用户：
- 演讲用 HTML：直接用浏览器打开，按 `F` 全屏，`← →` 翻页
- 后续编辑：用 `editor.html` 打开 JSON，修改后重新导出

---

## Phase 4: 迭代编辑

### 通过 AI 修改
用户说："第 3 页标题改成 xxx"、"第 5 页加一张图"
→ AI 读取对应 JSON，修改字段，重新输出 JSON 片段

### 通过编辑器自助修改
用户打开 `editor.html`：
1. 粘贴 JSON
2. 直接改文字、换图片路径
3. 拖拽 `elements` 数组调整元素顺序
4. 重新渲染 → 导出 HTML

---

## 内容密度限制

| 页面类型 | 最大内容 |
|---------|---------|
| Cover | 主标题 + 副标题 + 年份 |
| Contents | 6-8个章节项 |
| Content-Split | 1标题 + 4-6个要点 |
| Data | 1标题 + 3-4个数据指标 |
| Case | 1标题 + 3个对比卡片 |
| Gallery | 1标题 + 4-6张图片 |
| Quote | 1主标题 + 1高亮标题 + 3个标签 |

**超出限制？分页处理，不要挤压。**

---

## 图片处理

### 在 JSON 中引用图片
```json
{
  "type": "gallery",
  "images": [
    {"src": "images/photo1.jpg", "label": "优化提示词", "style": "highlight"}
  ]
}
```

### 路径规则
- **本地编辑器**：使用相对路径（相对于 `editor.html`）或 `file://` 绝对路径
- **演示 HTML**：浏览器打开时直接加载图片路径
- **打包分享**：建议把图片和 HTML 放在同一文件夹

### 图片占位符
JSON 中可写 `"src": "placeholder"`，渲染后显示虚线边框的 "+" 占位符。

---

## 品质检查清单

生成后必须确认：

- [ ] 使用了深墨绿 `#2D3A2D` 作为主背景
- [ ] 白色卡片使用 `rounded-[40px]` 大圆角
- [ ] 关键数据使用亮绿色 `#4ADE80`
- [ ] 每页高度锁定 `100vh`，无内部滚动
- [ ] 字号使用 `clamp()` 响应式
- [ ] 页面顶部有 `PRO/JECT SHOWCASE` 标识（除 Cover/Quote 外）
- [ ] 包含装饰元素（环形文字/水印）
- [ ] 键盘导航功能正常
- [ ] JSON 结构能被 `editor.html` 正确渲染

---

## 支持文件

| 文件 | 用途 | 何时读取 |
|------|------|---------|
| `references/brand-spec.md` | 品牌设计规范完整版 | Phase 2 |
| `references/slide-types.md` | 7种页面类型模板 | Phase 2 |
| `references/html-template.md` | HTML架构和引擎代码 | Phase 2 |
| `references/content-parsing.md` | 文档解析策略 | Phase 1 |
| `editor.html` | 本地 JSON 编辑器 + 实时渲染器 | 交付后 |
| `aigc-demo.json` | AIGC 培训课程完整示例 | 参考 |

---

## 示例调用

### 逐页共创
```
用户：/page，我们开始做 AIGC 培训 PPT 的第 1 页封面

→ Phase 0: /page 模式
→ Phase 1: 询问封面内容
→ Phase 2: 输出第 1 页 JSON，用户确认后追加
→ 进入第 2 页...
```

### 批量生成
```
用户：/batch，把这份大纲转成 PPT，附件是内容

→ Phase 0: /batch 模式
→ Phase 1: 读取附件，分析结构，匹配页面类型
→ Phase 2: 输出完整 JSON 剧本
→ Phase 3: 渲染并保存 HTML
```

### 自助编辑
```
用户：我想自己把第 3 页的图片换掉

→ 引导用户打开 editor.html
→ 粘贴 JSON，修改 src 路径
→ 重新渲染 → 导出 HTML
```
