# 女装电商网站部署指南

## 🚀 项目概述

这是一个基于 React + TypeScript + Vite + Supabase 构建的现代化女装电商网站，具备完整的购物功能包括商品展示、购物车、订单管理等。

## 📋 前置要求

- Node.js 20.x 或更高版本
- npm 或 pnpm 包管理器
- Git 版本控制
- 已配置的 Supabase 项目

## 🔧 环境配置

### 1. 环境变量设置

项目使用以下环境变量：

```bash
# Supabase 配置
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# 应用配置（可选）
VITE_APP_NAME=女装电商网站
VITE_APP_URL=https://your-domain.com
VITE_API_URL=https://your-api-domain.com
```

### 2. 环境文件说明

- `.env.local` - 本地开发环境配置
- `.env.production` - 生产环境配置
- `.env.example` - 环境变量示例

## 🏗️ 构建项目

### 开发环境构建
```bash
# 安装依赖
npm install

# 运行开发服务器
npm run dev
```

### 生产环境构建
```bash
# 运行类型检查
npm run check

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 🌐 部署选项

### 选项 1: Vercel 部署（推荐）

#### 自动部署（推荐）
1. 将代码推送到 GitHub
2. 登录 [Vercel](https://vercel.com)
3. 导入 GitHub 仓库
4. 配置环境变量
5. 点击部署

#### 手动部署
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署到预览环境
vercel

# 部署到生产环境
vercel --prod
```

#### Vercel 配置
项目已包含 `vercel.json` 配置文件：
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ],
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite",
  "nodeVersion": "20.x"
}
```

### 选项 2: Netlify 部署

#### 自动部署
1. 将代码推送到 GitHub
2. 登录 [Netlify](https://netlify.com)
3. 连接 GitHub 仓库
4. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
5. 设置环境变量
6. 点击部署

#### 手动部署
```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 部署到预览环境
netlify deploy

# 部署到生产环境
netlify deploy --prod
```

### 选项 3: GitHub Pages 部署

1. 安装 gh-pages
```bash
npm install -g gh-pages
```

2. 构建项目
```bash
npm run build
```

3. 部署到 GitHub Pages
```bash
gh-pages -d dist
```

### 选项 4: 传统服务器部署

#### 使用 Nginx
1. 构建项目
```bash
npm run build
```

2. 复制 dist 文件夹到服务器
3. 配置 Nginx：
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        root /path/to/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 使用 Apache
1. 构建项目
2. 配置 .htaccess 文件：
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 🔧 部署脚本使用

项目包含自动化部署脚本：

### 使用 deploy.sh 脚本
```bash
# 给脚本执行权限
chmod +x deploy.sh

# 运行部署脚本
./deploy.sh
```

### 脚本功能
- ✅ 环境检查
- ✅ 依赖安装
- ✅ 类型检查
- ✅ 生产构建
- ✅ 构建结果验证
- ✅ 部署建议

## 📊 性能优化

### 构建优化
- 代码分割（Code Splitting）
- 懒加载（Lazy Loading）
- 资源压缩（Minification）
- 缓存优化（Caching）

### 运行时优化
- 图片懒加载
- 组件按需加载
- 状态管理优化
- 网络请求优化

## 🛡️ 安全建议

### 环境变量安全
- 不要将 `.env` 文件提交到版本控制
- 在生产环境中使用安全的密钥管理
- 定期轮换 API 密钥

### 应用安全
- 启用 HTTPS
- 配置 CSP 头
- 防止 XSS 攻击
- 输入验证和清理

## 📈 监控和分析

### 性能监控
- 集成 Web Vitals
- 配置性能指标收集
- 设置错误监控（Sentry）

### 用户分析
- 集成 Google Analytics
- 配置转化跟踪
- 用户行为分析

## 🚨 故障排除

### 常见构建错误
1. **内存不足**
   ```bash
   export NODE_OPTIONS="--max-old-space-size=4096"
   ```

2. **依赖冲突**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **类型错误**
   ```bash
   npm run check
   ```

### 部署后问题
1. **404 错误**
   - 检查路由配置
   - 确认服务器重写规则

2. **静态资源加载失败**
   - 检查基础路径配置
   - 确认资源路径正确

3. **API 连接失败**
   - 检查环境变量配置
   - 确认 Supabase 服务正常

## 📝 后续步骤

部署完成后，建议：

1. **功能测试**
   - 用户注册/登录
   - 商品浏览和搜索
   - 购物车功能
   - 订单流程

2. **性能测试**
   - 页面加载速度
   - 移动端适配
   - 不同网络环境

3. **安全测试**
   - 输入验证
   - 权限控制
   - 数据加密

4. **监控设置**
   - 错误监控
   - 性能监控
   - 用户行为分析

## 📞 技术支持

如遇到问题，请检查：
- 项目文档：`README.md`
- 构建优化：`BUILD_OPTIMIZATION.md`
- 技术架构：`.trae/documents/fashion-ecommerce-technical-architecture.md`

---

**🎉 恭喜！您的女装电商网站已成功部署！**