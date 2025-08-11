# Italian Brainrot Generator 部署指南

## 问题修复说明

本项目已修复以下问题：

1. ✅ **图片生成器页面** - 修复了导航链接和功能
2. ✅ **语音合成页面** - 修复了导航链接和API调用
3. ✅ **Vercel配置** - 添加了API路由支持
4. ✅ **多语言支持** - 完善了意大利语和英语切换

## 部署步骤

### 1. 环境变量配置

在Vercel仪表板中添加以下环境变量：

```bash
REPLICATE_API_TOKEN=your_replicate_api_token_here
NODE_ENV=production
```

### 2. 获取Replicate API Token

1. 访问 [Replicate](https://replicate.com/)
2. 注册账户并登录
3. 在API Tokens页面创建新的token
4. 复制token到Vercel环境变量

### 3. 部署到Vercel

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 部署项目
vercel --prod
```

## 功能说明

### 文本生成器 (index.html)
- 生成意大利脑瘫梗文本
- 支持多语言切换
- 复制到剪贴板功能

### 图片生成器 (image.html)
- 上传图片并添加意大利元素
- 自动添加意大利短语和表情
- 下载生成的图片

### 语音合成器 (voice.html)
- 文本转意大利语音
- 使用Replicate AI API
- 支持音频下载

### 脑瘫梗测验 (quiz.html)
- 意大利文化知识测验
- 多语言支持
- 分数统计

## 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **后端**: Vercel Serverless Functions
- **AI服务**: Replicate API
- **部署**: Vercel

## 注意事项

1. **API限制**: Replicate API有使用限制，请查看官方文档
2. **图片处理**: 图片生成器在客户端处理，无需服务器资源
3. **多语言**: 支持英语和意大利语，语言设置保存在localStorage
4. **安全**: 已配置CSP和XSS保护头

## 故障排除

### 语音合成不工作
- 检查REPLICATE_API_TOKEN是否正确设置
- 确认API路由配置正确
- 查看浏览器控制台错误信息

### 图片生成器问题
- 确保浏览器支持Canvas API
- 检查图片文件格式是否支持
- 验证JavaScript文件是否正确加载

### 部署失败
- 检查vercel.json配置
- 确认环境变量设置
- 查看Vercel部署日志

## 更新日志

- **v1.1.0**: 修复导航链接和API配置
- **v1.0.0**: 初始版本发布 