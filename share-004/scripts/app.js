/**
 * AI协作能力PPT - 主应用控制器
 * 负责初始化、页面协调和全局状态管理
 */

class PPTApp {
    constructor() {
        this.totalPages = 74; // 总页面数
        this.currentPage = 0;
        this.isInitialized = false;
        
        // 绑定方法到实例
        this.onPageLoad = this.onPageLoad.bind(this);
        this.onPageLeave = this.onPageLeave.bind(this);
        this.updateNavigation = this.updateNavigation.bind(this);
    }

    /**
     * 初始化应用
     */
    async init() {
        try {
            console.log('🚀 AI协作能力PPT 初始化中...');
            
            // 等待DOM加载完成
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // 额外等待确保所有CSS和资源加载完成
            await new Promise(resolve => setTimeout(resolve, 100));

            // 检查必要的依赖
            this.checkDependencies();

            // 初始化fullpage.js
            this.initFullpage();
            
            // 初始化导航系统
            this.initNavigation();
            
            // 初始化键盘控制
            this.initKeyboardControls();
            
            // 初始化触摸手势（移动端）
            this.initTouchControls();
            
            this.isInitialized = true;
            console.log('✅ PPT应用初始化完成');
            
            // 触发首页加载事件（延迟以确保fullpage完全初始化）
            setTimeout(() => {
                this.onPageLoad(0);
            }, 200);
            
        } catch (error) {
            console.error('❌ PPT应用初始化失败:', error);
            this.showError('应用初始化失败，请刷新页面重试');
        }
    }

    /**
     * 检查必要依赖
     */
    checkDependencies() {
        const dependencies = [
            { name: 'fullpage', check: () => typeof fullpage !== 'undefined' },
            { name: 'TailwindCSS', check: () => document.querySelector('[class*="bg-black"]') !== null }
        ];

        dependencies.forEach(dep => {
            if (dep.check()) {
                console.log(`✅ ${dep.name} 加载成功`);
            } else {
                console.warn(`⚠️ ${dep.name} 可能未正确加载`);
            }
        });
    }

    /**
     * 初始化fullpage.js
     */
    initFullpage() {
        // 确保fullpage.js已加载
        if (typeof fullpage === 'undefined') {
            console.error('❌ fullpage.js 未加载');
            this.showError('fullpage.js库未正确加载');
            return;
        }

        console.log('🔧 开始初始化fullpage.js...');

        // 简化的fullpage.js配置
        const config = {
            // 基础滚动设置
            autoScrolling: true,
            scrollHorizontally: false,
            
            // 简化的动画配置
            css3: true,
            scrollingSpeed: 700,
            fitToSection: true,
            fitToSectionDelay: 1000,
            
            // 移动端支持
            touchSensitivity: 15,
            normalScrollElementTouchThreshold: 5,
            
            // 导航配置
            navigation: false,
            menu: false,
            
            // 事件回调 - 简化版本
            afterLoad: (origin, destination, direction) => {
                console.log(`✅ 页面加载完成: 第${destination.index + 1}页`);
                setTimeout(() => {
                    this.onPageLoad(destination.index, origin?.index, direction);
                }, 100);
            },
            
            onLeave: (origin, destination, direction) => {
                console.log(`📤 准备离开: 第${origin.index + 1}页 → 第${destination.index + 1}页`);
                return this.onPageLeave(origin.index, destination.index, direction);
            }
        };

        try {
            // 检查DOM元素是否存在
            const fullpageElement = document.getElementById('fullpage');
            if (!fullpageElement) {
                throw new Error('找不到#fullpage元素');
            }

            const sections = fullpageElement.querySelectorAll('.section');
            if (sections.length === 0) {
                throw new Error('找不到.section元素');
            }

            console.log(`📄 发现 ${sections.length} 个页面section`);

            // 初始化fullpage
            this.fullpageApi = new fullpage('#fullpage', config);
            
            console.log('✅ fullpage.js 初始化成功');
            
            // 延迟验证初始化是否真正成功
            setTimeout(() => {
                if (this.fullpageApi && typeof this.fullpageApi.moveSectionDown === 'function') {
                    console.log('✅ fullpage.js API验证成功');
                } else {
                    console.error('❌ fullpage.js API验证失败');
                    this.showError('页面滚动功能初始化不完整');
                }
            }, 500);
            
        } catch (error) {
            console.error('❌ fullpage.js 初始化失败:', error);
            this.showError(`页面滚动功能初始化失败: ${error.message}`);
        }
    }

    /**
     * 生成页面锚点
     */
    generateAnchors() {
        const anchors = [];
        for (let i = 1; i <= this.totalPages; i++) {
            anchors.push(`page-${i}`);
        }
        return anchors;
    }

    /**
     * 页面加载回调
     */
    onPageLoad(index, nextIndex, direction) {
        this.currentPage = index;
        
        // 更新导航指示器
        this.updateNavigation();
        
        // 更新页面计数器
        this.updatePageCounter();
        
        // 激活当前页面动画
        this.activatePageAnimations(index);
        
        // 加载页面特定功能
        this.loadPageSpecificFeatures(index);
        
        console.log(`📄 切换到第 ${index + 1} 页`);
    }

    /**
     * 页面离开回调
     */
    onPageLeave(index, nextIndex, direction) {
        // 清理页面动画
        this.cleanupPageAnimations(index);
        
        return true; // 允许页面切换
    }

    /**
     * 初始化导航系统
     */
    initNavigation() {
        const indicator = document.getElementById('page-indicator');
        if (!indicator) return;

        // 清空现有指示器
        indicator.innerHTML = '';

        // 当前只显示已实现的10页指示器
        const implementedPages = 10; // 当前实现的页面数
        
        // 生成页面指示器
        for (let i = 0; i < implementedPages; i++) {
            const dot = document.createElement('div');
            dot.className = 'page-dot';
            dot.setAttribute('data-page', i);
            dot.setAttribute('role', 'button');
            dot.setAttribute('aria-label', `跳转到第 ${i + 1} 页`);
            
            // 点击事件
            dot.addEventListener('click', () => {
                console.log(`点击指示器，跳转到第 ${i + 1} 页`);
                this.goToPage(i);
            });
            
            indicator.appendChild(dot);
        }

        // 添加页面计数器
        const counter = document.createElement('div');
        counter.id = 'page-counter';
        counter.className = 'page-counter';
        document.body.appendChild(counter);
    }

    /**
     * 更新导航状态
     */
    updateNavigation() {
        // 更新页面指示器
        const dots = document.querySelectorAll('.page-dot');
        dots.forEach((dot, index) => {
            if (index === this.currentPage) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    /**
     * 更新页面计数器
     */
    updatePageCounter() {
        const counter = document.getElementById('page-counter');
        if (counter) {
            const implementedPages = 10; // 当前实现的页面数
            counter.textContent = `${this.currentPage + 1} / ${implementedPages}`;
        }
    }

    /**
     * 跳转到指定页面
     */
    goToPage(pageIndex) {
        const implementedPages = 10; // 当前实现的页面数
        console.log(`goToPage调用: pageIndex=${pageIndex}, implementedPages=${implementedPages}, fullpageApi=${!!this.fullpageApi}`);
        if (pageIndex >= 0 && pageIndex < implementedPages && this.fullpageApi) {
            console.log(`执行跳转到第 ${pageIndex + 1} 页`);
            this.fullpageApi.moveTo(pageIndex + 1);
        } else {
            console.log(`跳转失败: 条件不满足`);
        }
    }

    /**
     * 初始化键盘控制
     */
    initKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            if (!this.isInitialized) return;

            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ': // 空格键
                    e.preventDefault();
                    this.nextPage();
                    break;
                    
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    this.prevPage();
                    break;
                    
                case 'Home':
                    e.preventDefault();
                    this.goToPage(0);
                    break;
                    
                case 'End':
                    e.preventDefault();
                    this.goToPage(this.totalPages - 1);
                    break;
                    
                case 'Escape':
                    e.preventDefault();
                    // 可以添加全屏退出等功能
                    break;
            }
        });
    }

    /**
     * 初始化触摸控制
     */
    initTouchControls() {
        let touchStartY = 0;
        let touchStartX = 0;
        const minSwipeDistance = 50;

        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        });

        document.addEventListener('touchend', (e) => {
            if (!this.isInitialized) return;

            const touchEndY = e.changedTouches[0].clientY;
            const touchEndX = e.changedTouches[0].clientX;
            
            const deltaY = touchStartY - touchEndY;
            const deltaX = touchStartX - touchEndX;
            
            // 垂直滑动
            if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
                if (deltaY > 0) {
                    this.nextPage(); // 向上滑动，下一页
                } else {
                    this.prevPage(); // 向下滑动，上一页
                }
            }
            
            // 水平滑动
            else if (Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    this.nextPage(); // 向左滑动，下一页
                } else {
                    this.prevPage(); // 向右滑动，上一页
                }
            }
        });
    }

    /**
     * 下一页
     */
    nextPage() {
        const implementedPages = 8; // 当前实现的页面数
        if (this.fullpageApi && this.currentPage < implementedPages - 1) {
            this.fullpageApi.moveSectionDown();
        }
    }

    /**
     * 上一页
     */
    prevPage() {
        if (this.fullpageApi && this.currentPage > 0) {
            this.fullpageApi.moveSectionUp();
        }
    }

    /**
     * 激活页面动画
     */
    activatePageAnimations(pageIndex) {
        const section = document.querySelector(`.section:nth-child(${pageIndex + 1})`);
        if (section) {
            section.classList.add('active');
            
            // 触发页面内元素动画
            const animatedElements = section.querySelectorAll('.purpose-item, .identity-card');
            animatedElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.animationPlayState = 'running';
                }, index * 100);
            });
        }
    }

    /**
     * 清理页面动画
     */
    cleanupPageAnimations(pageIndex) {
        const section = document.querySelector(`.section:nth-child(${pageIndex + 1})`);
        if (section) {
            section.classList.remove('active');
        }
    }

    /**
     * 加载页面特定功能
     */
    loadPageSpecificFeatures(pageIndex) {
        // 根据页面索引加载特定功能
        // 这里将在后续任务中添加具体的页面功能
        
        // 例子：如果是图表页面，初始化图表
        if (this.isChartPage(pageIndex)) {
            this.loadCharts(pageIndex);
        }
    }

    /**
     * 判断是否为图表页面
     */
    isChartPage(pageIndex) {
        // 需要图表的页面索引（将在后续任务中完善）
        const chartPages = [9]; // 第10页：对比表格
        return chartPages.includes(pageIndex);
    }

    /**
     * 加载图表
     */
    loadCharts(pageIndex) {
        // 图表加载逻辑将在任务13中实现
        console.log(`📊 加载第 ${pageIndex + 1} 页的图表`);
    }

    /**
     * 显示错误信息
     */
    showError(message) {
        console.error('❌', message);
        
        // 创建错误提示
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #E31937;
            color: white;
            padding: 2rem;
            border-radius: 10px;
            z-index: 9999;
            text-align: center;
            font-family: 'Noto Sans SC', serif;
        `;
        errorDiv.innerHTML = `
            <h3 style="margin: 0 0 1rem 0;">出现错误</h3>
            <p style="margin: 0;">${message}</p>
        `;
        
        document.body.appendChild(errorDiv);
        
        // 3秒后自动消失
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 3000);
    }
}

// 全局应用实例
let app;

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    app = new PPTApp();
    app.init();
});

// 导出应用实例（供其他模块使用）
window.PPTApp = PPTApp;
window.app = app;