// Italian Brainrot Generator - 性能优化工具

export class PerformanceOptimizer {
  constructor() {
    this.intersectionObserver = null;
    this.imageCache = new Map();
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupServiceWorker();
    this.optimizeImages();
    this.setupLazyLoading();
  }

  // 设置交叉观察器用于懒加载
  setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.loadLazyElement(entry.target);
              this.intersectionObserver.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.1
        }
      );
    }
  }

  // 懒加载元素
  setupLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    lazyElements.forEach(element => {
      if (this.intersectionObserver) {
        this.intersectionObserver.observe(element);
      } else {
        // 降级方案：直接加载
        this.loadLazyElement(element);
      }
    });
  }

  // 加载懒加载元素
  loadLazyElement(element) {
    const lazyType = element.dataset.lazy;
    
    switch (lazyType) {
      case 'image':
        this.loadLazyImage(element);
        break;
      case 'script':
        this.loadLazyScript(element);
        break;
      case 'content':
        this.loadLazyContent(element);
        break;
    }
  }

  // 懒加载图片
  loadLazyImage(imgElement) {
    const src = imgElement.dataset.src;
    if (src) {
      imgElement.src = src;
      imgElement.classList.remove('lazy');
      imgElement.removeAttribute('data-lazy');
      imgElement.removeAttribute('data-src');
    }
  }

  // 懒加载脚本
  loadLazyScript(scriptElement) {
    const src = scriptElement.dataset.src;
    if (src) {
      const newScript = document.createElement('script');
      newScript.src = src;
      newScript.async = true;
      scriptElement.parentNode.replaceChild(newScript, scriptElement);
    }
  }

  // 懒加载内容
  loadLazyContent(contentElement) {
    const url = contentElement.dataset.url;
    if (url) {
      fetch(url)
        .then(response => response.text())
        .then(html => {
          contentElement.innerHTML = html;
          contentElement.classList.remove('lazy');
          contentElement.removeAttribute('data-lazy');
          contentElement.removeAttribute('data-url');
        })
        .catch(error => {
          console.error('Failed to load lazy content:', error);
        });
    }
  }

  // 图片优化
  optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      this.optimizeImage(img);
    });
  }

  // 优化单个图片
  optimizeImage(img) {
    // 添加loading="lazy"属性
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }

    // 添加alt属性（如果没有）
    if (!img.hasAttribute('alt')) {
      img.setAttribute('alt', 'Italian Brainrot Image');
    }

    // 设置合适的尺寸
    if (img.naturalWidth && img.naturalHeight) {
      this.setOptimalImageSize(img);
    }

    // 图片加载完成后的优化
    img.addEventListener('load', () => {
      this.setOptimalImageSize(img);
    });
  }

  // 设置图片最佳尺寸
  setOptimalImageSize(img) {
    const container = img.closest('.container, .hero-generator, .ai-content-section');
    if (container) {
      const containerWidth = container.offsetWidth;
      if (img.naturalWidth > containerWidth) {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
      }
    }
  }

  // 图片缓存
  cacheImage(url) {
    if (this.imageCache.has(url)) {
      return this.imageCache.get(url);
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.imageCache.set(url, img);
        resolve(img);
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  // 设置Service Worker
  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  // 预加载关键资源
  preloadCriticalResources() {
    const criticalResources = [
      '/js/common.js',
      '/js/text-generator.js',
      '/css/variables.css',
      '/css/components.css'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.endsWith('.js') ? 'script' : 'style';
      document.head.appendChild(link);
    });
  }

  // 防抖函数
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // 节流函数
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // 性能监控
  monitorPerformance() {
    if ('performance' in window) {
      // 监控页面加载性能
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          if (perfData) {
            console.log('Page Load Performance:', {
              'DOM Content Loaded': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
              'Load Complete': perfData.loadEventEnd - perfData.loadEventStart,
              'Total Time': perfData.loadEventEnd - perfData.fetchStart
            });
          }
        }, 0);
      });

      // 监控资源加载性能
      const resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          if (entry.duration > 1000) { // 超过1秒的资源
            console.warn('Slow resource loaded:', entry.name, entry.duration + 'ms');
          }
        });
      });
      
      try {
        resourceObserver.observe({ entryTypes: ['resource'] });
      } catch (e) {
        console.log('PerformanceObserver not supported');
      }
    }
  }

  // 清理资源
  cleanup() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    this.imageCache.clear();
  }
}

// 导出单例实例
export const performanceOptimizer = new PerformanceOptimizer();

// 页面卸载时清理资源
window.addEventListener('beforeunload', () => {
  performanceOptimizer.cleanup();
}); 