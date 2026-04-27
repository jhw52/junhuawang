# 王俊华的个人主页项目 (Portfolio)

这是一个基于简历数据驱动的现代化个人主页网站，采用了 **React + TypeScript + Tailwind CSS** 技术栈构建。

## 项目结构说明

- `/src/data/resume.json`: **核心数据文件**。所有页面内容（姓名、简介、教育、项目等）均从此文件读取。只需修改此 JSON，网页内容将自动更新。
- `/src/App.tsx`: **页面逻辑与渲染模块**。包含了导航、滚动监听和各个内容板块的渲染逻辑。
- `/src/types.ts`: 定义了简历数据的 TypeScript 接口，确保数据结构的严谨性。
- `/src/index.css`: 全局样式文件，通过 Tailwind CSS 定制了主题颜色、字体（Inter & JetBrains Mono）和通用组件样式。
- `/public`: 存放静态资源。

## 核心功能

- **动态渲染**: JS 模块自动解析 `resume.json` 并生成对应的 HTML 结构。
- **响应式设计**: 适配手机、平板及电脑屏幕。
- **交互动效**: 使用 `motion/react` (Framer Motion) 实现平滑的入场动画、滚动效果和悬停反馈。
- **现代美学**: 采用大字号标题、毛玻璃效果 (Glassmorphism) 和专业的技术感网格布局。

## 如何扩展

### 1. 增加更多模块
在 `resume.json` 中增加新的字段（例如 `blog` 或 `social`），然后在 `src/App.tsx` 中编写相应的渲染组件并将其加入 `items` 导航数组中即可。

### 2. 迁移与 React 扩展
本项目**已经是基于 React 构建的**，这意味着它具备最强的扩展性：
- **新增页面**: 可以引入 `react-router-dom` 来实现多页面路由（如新增一个独立博客页）。
- **组件复用**: 可以将 `App.tsx` 中的内部组件（如 `Card`, `SectionHeading`）提取到独立的 `.tsx` 文件中以便复用。
- **状态管理**: 如果后续涉及复杂的交互（如用户登录或深色模式切换），可以使用 React 的 `Context API` 或 `Redux`。

### 3. 新增一个“博客页面”
1. 在 `src/` 下创建 `Blog.tsx`。
2. 安装 `react-markdown` 来渲染 Markdown 格式的文章。
3. 在 `resume.json` 中添加文章列表数据。
4. 使用路由跳转到该页面。

---

*注：本项目代码在 AI Studio 环境中可直接运行预览。*
