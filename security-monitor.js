// 网站安全监控脚本
// 将此脚本添加到您的网站中以监控潜在的安全问题

(function() {
    'use strict';
    
    // 监控可疑的DOM操作
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
        const element = originalCreateElement.call(document, tagName);
        
        // 监控iframe创建
        if (tagName.toLowerCase() === 'iframe') {
            console.warn('Security Alert: iframe created', element);
        }
        
        // 监控script创建
        if (tagName.toLowerCase() === 'script') {
            console.warn('Security Alert: script created', element);
        }
        
        return element;
    };
    
    // 监控eval调用
    const originalEval = window.eval;
    window.eval = function(code) {
        console.error('Security Alert: eval() called with:', code);
        return originalEval.call(this, code);
    };
    
    // 监控document.write
    const originalWrite = document.write;
    document.write = function(...args) {
        console.warn('Security Alert: document.write() called with:', args);
        return originalWrite.apply(this, args);
    };
    
    // 监控innerHTML设置
    const originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
    Object.defineProperty(Element.prototype, 'innerHTML', {
        set: function(value) {
            if (typeof value === 'string' && (value.includes('<script') || value.includes('javascript:'))) {
                console.error('Security Alert: Potential XSS detected in innerHTML:', value);
            }
            originalInnerHTML.set.call(this, value);
        },
        get: originalInnerHTML.get
    });
    
    // 检查可疑的外部链接
    function checkExternalLinks() {
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.href;
            if (href.includes('javascript:') || href.includes('data:') || href.includes('vbscript:')) {
                console.error('Security Alert: Suspicious link detected:', href);
            }
        });
    }
    
    // 检查可疑的脚本标签
    function checkScripts() {
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
            if (script.src && !script.src.startsWith(window.location.origin)) {
                console.warn('Security Alert: External script loaded:', script.src);
            }
        });
    }
    
    // 定期检查
    setInterval(() => {
        checkExternalLinks();
        checkScripts();
    }, 5000);
    
    // 页面加载完成后检查
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            checkExternalLinks();
            checkScripts();
        });
    } else {
        checkExternalLinks();
        checkScripts();
    }
    
    console.log('Security monitor activated');
})(); 