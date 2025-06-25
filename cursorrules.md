# CursorRules for Italian Brainrot Generator

## 1. 文件结构规范
- `index.html` / `App.jsx`：主页面或入口组件
- `main.js` / `components/`：主要功能模块（文本生成、图片处理、语音合成、测试）
- `style.css` / `styles/`：样式文件，建议分模块管理
- `assets/`：图片、emoji贴图等静态资源

## 2. 命名规范
- 变量/函数：小驼峰（如`generateBrainrotText`）
- 组件/类名：大驼峰（如`TextGenerator`）
- 文件/文件夹：小写+中划线或小驼峰（如`image-generator.js`）

## 3. 代码风格
- 使用ES6+语法（let/const、箭头函数、模板字符串等）
- 统一用单引号或双引号，保持一致
- 组件/函数尽量职责单一，便于维护
- 注释清晰，重要逻辑需说明

## 4. 协作建议
- 新功能建议新建分支开发，合并前自测
- 重要变更请写明commit message
- 代码合并前建议自查格式和命名

## 5. 依赖与部署
- 依赖用`package.json`管理（如用React）
- 静态站点建议用Vercel/Netlify部署

## 6. 其他
- 遵循MIT开源协议，欢迎二创和魔改
- 如有疑问可在Issue区讨论 