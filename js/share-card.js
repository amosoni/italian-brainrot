// Italian Brainrot Quiz - 分享卡片生成器
// 生成可下载的测验结果分享卡片

class ShareCardGenerator {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.cardWidth = 800;
    this.cardHeight = 600;
  }

  // 生成分享卡片
  generateShareCard(score, totalQuestions, title, description) {
    this.initCanvas();
    this.drawBackground();
    this.drawItalianFlag();
    this.drawTitle();
    this.drawScore(score, totalQuestions);
    this.drawTitleCard(title, description);
    this.drawFooter();
    
    return this.canvas.toDataURL('image/png');
  }

  // 初始化Canvas
  initCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.cardWidth;
    this.canvas.height = this.cardHeight;
    this.ctx = this.canvas.getContext('2d');
    
    // 设置高质量渲染
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';
  }

  // 绘制背景
  drawBackground() {
    // 渐变背景
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.cardHeight);
    gradient.addColorStop(0, '#f8f9fa');
    gradient.addColorStop(1, '#e9ecef');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.cardWidth, this.cardHeight);
    
    // 添加阴影效果
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    this.ctx.shadowBlur = 20;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 10;
  }

  // 绘制意大利国旗
  drawItalianFlag() {
    const flagWidth = 60;
    const flagHeight = 40;
    const flagX = 50;
    const flagY = 50;
    
    // 绿色条
    this.ctx.fillStyle = '#008C45';
    this.ctx.fillRect(flagX, flagY, flagWidth / 3, flagHeight);
    
    // 白色条
    this.ctx.fillStyle = '#F4F5F0';
    this.ctx.fillRect(flagX + flagWidth / 3, flagY, flagWidth / 3, flagHeight);
    
    // 红色条
    this.ctx.fillStyle = '#CD212A';
    this.ctx.fillRect(flagX + 2 * flagWidth / 3, flagY, flagWidth / 3, flagHeight);
    
    // 国旗边框
    this.ctx.strokeStyle = '#333';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(flagX, flagY, flagWidth, flagHeight);
    
    // 重置阴影
    this.ctx.shadowColor = 'transparent';
    this.ctx.shadowBlur = 0;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
  }

  // 绘制标题
  drawTitle() {
    this.ctx.fillStyle = '#CD212A';
    this.ctx.font = 'bold 48px Arial, sans-serif';
    this.ctx.textAlign = 'center';
    
    // 添加白色描边
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 3;
    this.ctx.strokeText('Risultato Quiz Brainrot', this.cardWidth / 2, 120);
    
    // 填充文字
    this.ctx.fillText('Risultato Quiz Brainrot', this.cardWidth / 2, 120);
    
    // 绘制大脑图标
    this.drawBrainIcon(this.cardWidth - 100, 80);
  }

  // 绘制大脑图标
  drawBrainIcon(x, y) {
    // 大脑轮廓
    this.ctx.fillStyle = '#FF6B6B';
    this.ctx.beginPath();
    this.ctx.arc(x, y, 25, 0, 2 * Math.PI);
    this.ctx.fill();
    
    // 大脑纹理
    this.ctx.strokeStyle = '#FF4757';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(x - 8, y - 5, 8, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(x + 8, y - 5, 8, 0, 2 * Math.PI);
    this.ctx.stroke();
    
    // 添加发光效果
    this.ctx.shadowColor = '#FFD700';
    this.ctx.shadowBlur = 15;
    this.ctx.fill();
    this.ctx.shadowColor = 'transparent';
    this.ctx.shadowBlur = 0;
  }

  // 绘制分数
  drawScore(score, totalQuestions) {
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // 分数背景
    this.ctx.fillStyle = '#e8f5e8';
    this.ctx.fillRect(100, 180, 600, 80);
    
    // 分数边框
    this.ctx.strokeStyle = '#22bb33';
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(100, 180, 600, 80);
    
    // 分数文字
    this.ctx.fillStyle = '#008C45';
    this.ctx.font = 'bold 36px Arial, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`Brainrottato: ${percentage}%`, this.cardWidth / 2, 220);
    
    // 分数详情
    this.ctx.font = '24px Arial, sans-serif';
    this.ctx.fillStyle = '#155724';
    this.ctx.fillText(`${score}/${totalQuestions} domande corrette`, this.cardWidth / 2, 250);
  }

  // 绘制称号卡片
  drawTitleCard(title, description) {
    // 称号背景
    this.ctx.fillStyle = '#fff3cd';
    this.ctx.fillRect(100, 300, 600, 120);
    
    // 称号边框
    this.ctx.strokeStyle = '#ffc107';
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(100, 300, 600, 120);
    
    // 称号标题
    this.ctx.fillStyle = '#856404';
    this.ctx.font = 'bold 32px Arial, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(title, this.cardWidth / 2, 340);
    
    // 称号描述
    this.ctx.font = '18px Arial, sans-serif';
    this.ctx.fillStyle = '#856404';
    this.ctx.fillText(description, this.cardWidth / 2, 370);
    
    // 绘制披萨图标
    this.drawPizzaIcon(this.cardWidth - 120, 320);
  }

  // 绘制披萨图标
  drawPizzaIcon(x, y) {
    // 披萨饼底
    this.ctx.fillStyle = '#FFD700';
    this.ctx.beginPath();
    this.ctx.arc(x, y, 20, 0, 2 * Math.PI);
    this.ctx.fill();
    
    // 披萨酱
    this.ctx.fillStyle = '#FF6B35';
    this.ctx.beginPath();
    this.ctx.arc(x, y, 15, 0, 2 * Math.PI);
    this.ctx.fill();
    
    // 奶酪
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(x - 8, y - 3, 16, 6);
    
    // 边框
    this.ctx.strokeStyle = '#333';
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
  }

  // 绘制页脚
  drawFooter() {
    // 页脚背景
    this.ctx.fillStyle = '#f8f9fa';
    this.ctx.fillRect(0, this.cardHeight - 80, this.cardWidth, 80);
    
    // 页脚边框
    this.ctx.strokeStyle = '#dee2e6';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(0, this.cardHeight - 80, this.cardWidth, 80);
    
    // 页脚文字
    this.ctx.fillStyle = '#CD212A';
    this.ctx.font = 'bold 24px Arial, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('A base di pizza, pasta e meme!', this.cardWidth / 2, this.cardHeight - 45);
    
    // 网站地址
    this.ctx.font = '18px Arial, sans-serif';
    this.ctx.fillStyle = '#6c757d';
    this.ctx.fillText('italianbrainrot.today', this.cardWidth / 2, this.cardHeight - 20);
  }

  // 下载分享卡片
  downloadShareCard(score, totalQuestions, title, description, filename = 'brainrot-quiz-result.png') {
    const dataURL = this.generateShareCard(score, totalQuestions, title, description);
    
    // 创建下载链接
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataURL;
    
    // 触发下载
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // 获取分享卡片的HTML预览
  getShareCardPreview(score, totalQuestions, title, description) {
    const dataURL = this.generateShareCard(score, totalQuestions, title, description);
    
    return `
      <div style="text-align: center; margin: 20px 0;">
        <h3 style="color: #CD212A; margin-bottom: 20px;">🎉 你的测验结果分享卡片</h3>
        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); display: inline-block;">
          <img src="${dataURL}" alt="Brainrot Quiz Result" style="max-width: 100%; height: auto; border-radius: 8px;">
        </div>
        <div style="margin-top: 20px;">
          <button onclick="window.shareCardGenerator.downloadShareCard(${score}, ${totalQuestions}, '${title}', '${description}')" 
                  style="background: linear-gradient(135deg, #9c27b0 0%, #673ab7 100%); color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 15px rgba(156, 39, 176, 0.3);">
            📥 Scarica la Card
          </button>
        </div>
      </div>
    `;
  }
}

// 创建全局实例
window.shareCardGenerator = new ShareCardGenerator();

export default ShareCardGenerator; 