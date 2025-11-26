#!/bin/bash

# 女装电商网站部署脚本
# 支持部署到 Vercel、Netlify、GitHub Pages 等平台

echo "🚀 开始部署女装电商网站..."

# 检查 Node.js 版本
echo "📋 检查环境..."
node --version
npm --version

# 安装依赖
echo "📦 安装依赖..."
npm ci

# 运行类型检查
echo "🔍 运行类型检查..."
npm run check

# 构建生产版本
echo "🏗️  构建生产版本..."
npm run build

# 检查构建结果
if [ -d "dist" ]; then
    echo "✅ 构建成功！"
    echo "📊 构建文件大小："
    du -sh dist/
    
    echo "📁 构建文件列表："
    ls -la dist/
    
    echo "🎉 部署准备完成！"
    echo ""
    echo "下一步操作："
    echo "1. Vercel: 运行 'vercel --prod' 或直接推送代码到 GitHub"
    echo "2. Netlify: 运行 'netlify deploy --prod'"
    echo "3. GitHub Pages: 推送 dist 文件夹到 gh-pages 分支"
    echo ""
    echo "📖 详细部署说明请查看 DEPLOY.md 文件"
else
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi