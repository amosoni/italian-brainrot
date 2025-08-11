# Vercel 环境变量配置指南

## 必需的环境变量

### 1. REPLICATE_API_TOKEN
**说明**: Replicate AI服务的API密钥，用于语音合成功能

**获取步骤**:
1. 访问 [https://replicate.com/](https://replicate.com/)
2. 注册账户并登录
3. 进入 "Account" → "API Tokens"
4. 点击 "Create API token"
5. 复制生成的token

**在Vercel中设置**:
1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目
3. 进入 "Settings" → "Environment Variables"
4. 添加变量:
   - **Name**: `REPLICATE_API_TOKEN`
   - **Value**: `r8_your_token_here`
   - **Environment**: Production, Preview, Development (全选)

### 2. NODE_ENV (可选)
**说明**: 环境标识，建议设置为production

**值**: `production`

## 环境变量配置示例

```bash
# 生产环境
REPLICATE_API_TOKEN=r8_HeYcj83efWvm7fBv1D2ua8JKHQE38yy0ASkfNmc39
NODE_ENV=production

# 开发环境 (本地测试)
REPLICATE_API_TOKEN=r8_HeYcj83efWvm7fBv1D2ua8JKHQE38yy0ASkfNmc39
NODE_ENV=development
```

## 验证配置

### 1. 检查API是否工作
部署后，测试语音合成功能:
1. 访问 `/voice.html`
2. 输入文本并点击生成
3. 检查浏览器控制台是否有错误
4. 确认API调用成功

### 2. 查看Vercel函数日志
1. 在Vercel Dashboard中进入项目
2. 选择 "Functions" 标签
3. 查看 `/api/tts` 函数的调用日志
4. 确认没有认证错误

## 常见问题

### Q: API调用返回401错误
**A**: 检查REPLICATE_API_TOKEN是否正确设置，确保没有多余的空格

### Q: 环境变量在本地工作但部署后不工作
**A**: 确保在Vercel中设置了Production环境的环境变量

### Q: 如何更新环境变量
**A**: 在Vercel Dashboard中修改后，需要重新部署项目

## 安全注意事项

1. **不要**在代码中硬编码API密钥
2. **不要**将.env文件提交到Git仓库
3. **定期轮换**API密钥
4. **监控**API使用量和费用

## 支持

如果遇到问题，请检查:
1. Vercel部署日志
2. 浏览器控制台错误
3. 网络请求状态
4. Replicate API状态页面 