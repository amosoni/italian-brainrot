// 安全检测脚本 - 监控可能的恶意代码注入
(function() {
    'use strict';
    
    console.log('🔒 Security detector activated');
    
    // 监控DOM变化
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // 检查新添加的script标签
                        if (node.tagName === 'SCRIPT') {
                            console.warn('🚨 Security Alert: New script tag added:', node);
                            if (node.src && !node.src.includes('googletagmanager.com') && !node.src.includes('fonts.googleapis.com')) {
                                console.error('🚨 Suspicious external script detected:', node.src);
                            }
                        }
                        
                        // 检查新添加的iframe
                        if (node.tagName === 'IFRAME') {
                            console.error('🚨 Security Alert: iframe detected:', node);
                        }
                        
                        // 检查可疑的链接
                        if (node.tagName === 'A' && node.href) {
                            if (node.href.includes('javascript:') || node.href.includes('data:')) {
                                console.error('🚨 Suspicious link detected:', node.href);
                            }
                        }
                    }
                });
            }
        });
    });
    
    // 开始监控
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // 检查现有的可疑元素
    function checkExistingElements() {
        // 检查所有script标签
        const scripts = document.querySelectorAll('script');
        scripts.forEach(function(script, index) {
            if (script.src) {
                console.log(`Script ${index}: ${script.src}`);
                if (!script.src.includes('googletagmanager.com') && 
                    !script.src.includes('fonts.googleapis.com') && 
                    !script.src.includes('fonts.gstatic.com') &&
                    !script.src.startsWith(window.location.origin)) {
                    console.warn('🚨 External script detected:', script.src);
                }
            }
        });
        
        // 检查所有iframe
        const iframes = document.querySelectorAll('iframe');
        if (iframes.length > 0) {
            console.error('🚨 iframe elements found:', iframes.length);
            iframes.forEach(function(iframe) {
                console.error('iframe src:', iframe.src);
            });
        }
        
        // 检查可疑的链接
        const links = document.querySelectorAll('a[href]');
        links.forEach(function(link) {
            if (link.href.includes('javascript:') || link.href.includes('data:')) {
                console.error('🚨 Suspicious link found:', link.href);
            }
        });
    }
    
    // 监控网络请求
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        console.log('🌐 Fetch request:', args[0]);
        return originalFetch.apply(this, args);
    };
    
    // 监控XMLHttpRequest
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...args) {
        console.log('🌐 XHR request:', url);
        return originalXHROpen.apply(this, [method, url, ...args]);
    };
    
    // 页面加载完成后检查
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkExistingElements);
    } else {
        checkExistingElements();
    }
    
    // 定期检查
    setInterval(checkExistingElements, 10000);
    
    console.log('🔒 Security monitoring active');
})(); 