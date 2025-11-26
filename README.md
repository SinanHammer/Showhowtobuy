# FASHION - 现代女装电商网站

一个面向中国消费者的现代女装电商网站，提供简洁优雅的购物体验。专注于快时尚女装销售，为追求时尚的中国女性提供便捷的在线购物平台。

## 🎯 项目特色

- **现代化设计**: 简洁优雅的界面设计，参考Zara和H&M的设计理念
- **移动端优先**: 响应式设计，确保在各种设备上都有良好的购物体验
- **完整电商功能**: 从商品浏览到订单管理的完整购物流程
- **多支付方式**: 支持支付宝、微信支付、银行卡等多种支付方式
- **用户角色系统**: 普通用户和VIP用户的分级管理

## 🛠 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式方案**: Tailwind CSS
- **路由管理**: React Router v7
- **状态管理**: Zustand
- **后端服务**: Supabase (PostgreSQL + 实时功能)
- **UI组件**: Lucide React (图标) + Sonner (通知)
- **代码质量**: ESLint + TypeScript

## 🚀 快速开始

### 环境要求
- Node.js 20+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 环境配置
1. 复制 `.env.example` 为 `.env.local`
2. 填写 Supabase 配置信息：
```bash
VITE_SUPABASE_URL=你的Supabase项目URL
VITE_SUPABASE_ANON_KEY=你的Supabase匿名Key
```

### 开发运行
```bash
npm run dev
```
访问 `http://localhost:5173` 查看网站

### 生产构建
```bash
npm run build
npm run preview
```

## 📱 功能模块

### 核心页面
- **首页**: 轮播图展示、新品推荐、热销商品、新用户弹窗
- **商品列表**: 商品筛选、分类浏览、搜索功能
- **商品详情**: 高清图片展示、尺码信息、用户评价、加入购物车
- **购物车**: 商品管理、数量调整、价格计算
- **结算页面**: 收货地址填写、支付方式选择、订单确认
- **订单管理**: 历史订单查看、订单状态跟踪
- **用户中心**: 个人信息管理、VIP等级显示
- **联系我们**: 邮件联系方式、客服信息

### 用户系统
- **注册登录**: 邮箱注册、微信登录、支付宝登录
- **VIP系统**: 累计消费满一定金额自动升级，享受专属权益

### 支付系统
- **多渠道支付**: 集成支付宝、微信支付、银行卡支付
- **订单管理**: 完整的订单生命周期管理

## 🎨 设计规范

### 色彩方案
- **主色调**: 纯黑色(#000000)、纯白色(#FFFFFF)、中灰色(#666666)
- **点缀色**: 柔和米色(#F5E6D3)、深蓝色(#1E3A8A)

### 字体规范
- **中文字体**: 思源黑体
- **英文字体**: Helvetica
- **正文字号**: 14-16px

### 响应式断点
- **手机**: <768px
- **平板**: 768-1024px  
- **桌面**: >1024px

## 📁 项目结构

```
src/
├── components/          # 公共组件
│   ├── Header.tsx      # 网站头部
│   ├── Footer.tsx      # 网站底部
│   └── Empty.tsx       # 空状态组件
├── pages/              # 页面组件
│   ├── Home.tsx        # 首页
│   ├── Products.tsx    # 商品列表
│   ├── ProductDetail.tsx # 商品详情
│   ├── Cart.tsx        # 购物车
│   ├── Checkout.tsx    # 结算页面
│   ├── Orders.tsx      # 订单管理
│   ├── Profile.tsx     # 个人中心
│   ├── Contact.tsx     # 联系我们
│   └── auth/           # 认证相关页面
│       ├── Login.tsx   # 登录
│       └── Register.tsx # 注册
├── stores/             # 状态管理
│   ├── auth.ts         # 用户认证状态
│   └── cart.ts         # 购物车状态
├── lib/                # 工具库
│   ├── supabase.ts     # Supabase客户端
│   └── utils.ts        # 工具函数
├── hooks/              # 自定义钩子
│   └── useTheme.ts     # 主题钩子
├── router.tsx          # 路由配置
├── App.tsx             # 根组件
└── main.tsx            # 应用入口
```

## 🔧 开发指南

### 代码规范
项目使用 ESLint 进行代码检查，运行以下命令检查代码：
```bash
npm run lint
```

### TypeScript检查
```bash
npm run check
```

### 构建优化
- 代码分割：自动将第三方库分割为独立chunk
- 控制台清理：生产环境自动移除console和debugger
- 图片优化：支持图片懒加载和压缩

## 🚀 部署

项目支持多种部署方式：

### Vercel部署
项目已配置 `vercel.json`，可直接部署到 Vercel

### 其他平台
支持任何静态网站托管平台，构建产物在 `dist/` 目录

## 📋 开发计划

- [ ] 完善商品搜索功能
- [ ] 添加商品收藏功能
- [ ] 优化移动端体验
- [ ] 添加更多支付方式
- [ ] 完善VIP权益系统

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests 来改进项目！

## 📄 许可证

MIT License

---

**技术栈**: React + TypeScript + Vite + Tailwind CSS + Supabase
**设计**: 现代化简洁风格，移动端优先
**目标**: 为中国女性消费者提供优质的时尚购物体验