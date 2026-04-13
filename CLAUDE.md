# wilderness-ppt

基于邝野传媒（Wilderness Media）品牌设计规范的HTML幻灯片生成器。

## 架构

**输出格式**：单HTML文件，零依赖，浏览器直开

| 组件 | 来源 | 角色 |
|------|------|------|
| 引擎CSS | `references/html-template.md` | 固定：viewport锁定、导航、编辑模式 |
| 品牌CSS | AI生成 | 每PPT定制：品牌色变量、页面样式 |
| Slides HTML | AI生成 | 每PPT定制：页面内容结构 |
| 引擎JS | `references/html-template.md` | 固定：键盘导航、演讲者模式、编辑功能 |

## 流程

```
用户文档 → 内容摄取 → 页面类型匹配 → 分页方案确认
    ↓
读取品牌规范 + 页面模板 → 生成Slides HTML
    ↓
组装单文件 → 浏览器交付 → 编辑迭代
```

## 成员

| 文件 | 用途 |
|------|------|
| `SKILL.md` | 主流程：文档→slides完整流程 |
| `references/brand-spec.md` | 品牌设计规范（色彩/字体/布局/组件/装饰） |
| `references/slide-types.md` | 6种页面类型模板（Cover/Contents/Content-Split/Data/Case/Gallery） |
| `references/html-template.md` | HTML模板架构（双模式引擎：演示+编辑） |
| `references/content-parsing.md` | 文档解析策略（结构识别→页面匹配） |

## 品牌DNA

**核心识别**：
- 主色：`#2D3A2D` 深墨绿
- 强调：`#4ADE80` 亮绿
- 卡片：`#FFFFFF` 纯白，`rounded-[40px]`
- 字体：Montserrat + Noto Sans SC
- 标识：PRO/JECT SHOWCASE

**6种页面类型**：
1. Cover - 封面（环形文字+主标题+年份）
2. Contents - 目录（白底+绿色编号）
3. Content-Split - 内容分栏（左文右卡）
4. Data - 数据展示（水印+亮绿数字）
5. Case - 项目案例（顶部白卡+底部对比）
6. Gallery - 图片画廊（圆角网格）

## 依赖

- CDN: Tailwind CSS, Google Fonts
- 浏览器: 现代浏览器（支持CSS变量、scroll-snap、BroadcastChannel）

## Git 发布工作流

每次完成新版本迭代并通过验证后，必须执行以下步骤：

1. **检查改动范围**：确认修改是否涉及多个文件（如 `render.js`、`references/html-template.md`、`editor.html`、`SKILL.md`、output 等）。如果只改了 output 里的单个 HTML，要回头检查**模板和渲染引擎**是否也需要同步更新，避免"源头没改、下次生成又出错"。
2. **保持一致性**：确保 `render.js`、`references/html-template.md`、`editor.html` 和 output 文件中的引擎代码（如函数名、按钮事件、快捷键逻辑）完全一致。
3. **提交并提醒**：所有相关文件修改完毕后，执行 `git add`、`git commit`、`git push origin main`，并**主动提醒用户**已在 GitHub 上推送了新版本。

> 原则：**output 是产物，模板和渲染器才是源头**。产物和源头必须同步。

## Changelog

- 2026-04-08: 初始版本，基于frontend-slides和codeck架构，适配邝野传媒品牌规范
