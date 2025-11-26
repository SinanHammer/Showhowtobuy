/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        // 品牌色彩 - 基于PRD文档
        primary: {
          black: '#000000',
          white: '#FFFFFF',
          gray: '#666666',
        },
        accent: {
          beige: '#F5E6D3', // 柔和米色
          blue: '#1E3A8A',  // 深蓝色
        },
        // 扩展灰色透明度
        'primary-gray': {
          DEFAULT: '#666666',
          5: 'rgba(102, 102, 102, 0.05)',
          10: 'rgba(102, 102, 102, 0.1)',
          20: 'rgba(102, 102, 102, 0.2)',
          30: 'rgba(102, 102, 102, 0.3)',
        },
      },
      fontFamily: {
        // 中文字体：思源黑体，英文字体：Helvetica
        sans: ['Helvetica', 'Source Han Sans CN', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // 正文字号14-16px
        base: ['14px', '1.5'],
        lg: ['16px', '1.5'],
      },
      spacing: {
        // 卡片间距20px
        'card': '20px',
      },
      height: {
        // 轮播图高度
        'carousel-desktop': '500px',
        'carousel-mobile': '300px',
      },
      width: {
        // 登录表单宽度
        'auth-form': '400px',
      },
    },
  },
  plugins: [],
};
