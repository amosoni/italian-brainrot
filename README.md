# Italian Brainrot Generator

## 项目简介
一个魔性有趣的意大利脑洞生成器网站，支持文本梗生成、图片魔改、意大利口音语音合成和趣味测试，适合社交分享和迷因传播。

---

## 功能特性
- **文本生成器**：输入普通文本，输出混合意大利语、emoji和乱码的魔性句子。
- **图片生成器**：上传图片，自动添加意大利元素（如披萨、🤌、复古滤镜）。
- **语音合成**：用Web Speech API朗读魔性文本，模仿意大利口音。
- **趣味测试**："Are You Brainrotted?"脑洞指数测试，生成可分享的结果卡片。

---

## 技术栈
| 功能           | 技术/库                  |
|----------------|--------------------------|
| 前端框架       | React / 纯HTML+JS        |
| 图片处理       | Canvas API               |
| 语音合成       | Web Speech API           |
| 数据存储       | localStorage / Firebase  |
| 部署           | Vercel / Netlify         |

---

## 开发步骤
1. **初始化项目**
   - 新建文件夹，创建`index.html`、`style.css`、`main.js`。
   - 可选：用`create-react-app`初始化React项目。
2. **实现文本生成器**
   - 编写`generateBrainrotText`函数，实现意大利词、emoji、乱码随机插入。
   - 搭建输入框、按钮和输出区域。
3. **实现图片生成器**
   - 用`<input type="file">`上传图片，Canvas绘制原图并叠加emoji/滤镜。
   - 提供预览和下载功能。
4. **实现语音合成**
   - 用`SpeechSynthesisUtterance`实现文本朗读，调整rate/pitch/voice参数。
   - 添加"朗读"按钮。
5. **实现趣味测试**
   - 用数组存储题目和选项，记录分数，生成结果。
   - 可用Canvas或`html-to-image`生成可分享的结果图片。
6. **美化界面**
   - 使用意大利国旗配色（#008C45、#F4F5F0、#CD212A）。
   - 字体建议：Impact、Times New Roman、手写体。
   - 添加emoji动画和动效。
7. **本地存储/云存储**
   - 用localStorage保存用户生成内容。
   - 如需云端同步，可集成Firebase。
8. **部署上线**
   - 代码上传至GitHub，使用Vercel/Netlify一键部署。
   - 绑定自定义域名（如`italianbrainrot.fun`）。

---

## 使用说明
1. 访问网站，输入文本或上传图片。
2. 点击"生成"按钮，获得魔性内容。
3. 可点击"朗读"体验意大利口音。
4. 参与趣味测试，生成并分享脑洞指数卡片。

---

## 贡献与反馈
- 欢迎PR和建议！
- 联系方式：请在GitHub Issue区留言。 