/**
 * AI协作能力PPT - 导航控制器
 * 处理页面导航、快捷键和进度指示
 */

class NavigationController {
    constructor() {
        this.currentPage = 0;
        this.totalPages = 74;
        this.history = [];
        this.bookmarks = [];
        
        // 初始化导航系统
        this.init();
    }

    /**
     * 初始化导航系统
     */
    init() {
        console.log('🧭 导航系统初始化中...');
        
        // 设置键盘快捷键
        this.setupKeyboardShortcuts();
        
        // 设置触摸手势
        this.setupTouchGestures();
        
        // 设置URL哈希导航
        this.setupHashNavigation();
        
        // 初始化进度指示器
        this.initProgressIndicator();
        
        console.log('✅ 导航系统初始化完成');
    }

    /**
     * 设置键盘快捷键
     */
    setupKeyboardShortcuts() {
        const shortcuts = {
            // 基础导航
            'ArrowRight': () => this.nextPage(),
            'ArrowDown': () => this.nextPage(),
            'ArrowLeft': () => this.prevPage(),
            'ArrowUp': () => this.prevPage(),
            'Space': () => this.nextPage(),
            'Backspace': () => this.prevPage(),
            
            // 快速跳转
            'Home': () => this.goToPage(0),
            'End': () => this.goToPage(this.totalPages - 1),
            'PageDown': () => this.jumpPages(5),
            'PageUp': () => this.jumpPages(-5),
            
            // 数字键快速跳转（1-9对应9个章节）
            'Digit1': () => this.goToChapter(1), // 开场
            'Digit2': () => this.goToChapter(2), // 互动破冰
            'Digit3': () => this.goToChapter(3), // AI时代关系
            'Digit4': () => this.goToChapter(4), // 工具链演示
            'Digit5': () => this.goToChapter(5), // 实战故事
            'Digit6': () => this.goToChapter(6), // 文科生优势
            'Digit7': () => this.goToChapter(7), // 理性分析
            'Digit8': () => this.goToChapter(8), // 人机协作
            'Digit9': () => this.goToChapter(9), // 实践方法
            
            // 功能键
            'KeyB': () => this.toggleBookmark(),
            'KeyH': () => this.goBack(),
            'KeyR': () => this.refreshPage(),
            'KeyF': () => this.toggleFullscreen(),
            'Escape': () => this.exitFullscreen(),
            
            // 演示模式
            'KeyP': () => this.togglePresentationMode(),
            'KeyT': () => this.showTableOfContents(),
        };

        document.addEventListener('keydown', (e) => {
            // 忽略在输入框中的按键
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            const key = e.code || e.key;
            const handler = shortcuts[key];
            
            if (handler) {
                e.preventDefault();
                handler();
            }
        });
    }

    /**
     * 设置触摸手势
     */
    setupTouchGestures() {
        let touchStart = { x: 0, y: 0 };
        let touchEnd = { x: 0, y: 0 };
        const minSwipeDistance = 50;
        
        document.addEventListener('touchstart', (e) => {
            touchStart.x = e.touches[0].clientX;
            touchStart.y = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            // 防止默认滚动
            e.preventDefault();
        }, { passive: false });
        
        document.addEventListener('touchend', (e) => {
            touchEnd.x = e.changedTouches[0].clientX;
            touchEnd.y = e.changedTouches[0].clientY;
            
            const deltaX = touchStart.x - touchEnd.x;
            const deltaY = touchStart.y - touchEnd.y;
            
            // 判断滑动方向和距离
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // 水平滑动
                if (Math.abs(deltaX) > minSwipeDistance) {
                    if (deltaX > 0) {
                        this.nextPage(); // 向左滑动
                    } else {
                        this.prevPage(); // 向右滑动
                    }
                }
            } else {
                // 垂直滑动
                if (Math.abs(deltaY) > minSwipeDistance) {
                    if (deltaY > 0) {
                        this.nextPage(); // 向上滑动
                    } else {
                        this.prevPage(); // 向下滑动
                    }
                }
            }
        }, { passive: true });
    }

    /**
     * 设置URL哈希导航
     */
    setupHashNavigation() {
        // 监听哈希变化
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            const pageMatch = hash.match(/^page-(\d+)$/);
            
            if (pageMatch) {
                const pageNum = parseInt(pageMatch[1]) - 1;
                if (pageNum >= 0 && pageNum < this.totalPages) {
                    this.goToPage(pageNum, false); // 不更新URL避免循环
                }
            }
        });
        
        // 页面加载时检查初始哈希
        if (window.location.hash) {
            const hash = window.location.hash.slice(1);
            const pageMatch = hash.match(/^page-(\d+)$/);
            
            if (pageMatch) {
                const pageNum = parseInt(pageMatch[1]) - 1;
                if (pageNum >= 0 && pageNum < this.totalPages) {
                    this.currentPage = pageNum;
                }
            }
        }
    }

    /**
     * 初始化进度指示器
     */
    initProgressIndicator() {
        // 创建进度条
        const progressBar = document.createElement('div');
        progressBar.id = 'progress-bar';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #E31937, #FF6B6B);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
        
        // 创建页面指示器（如果不存在）
        if (!document.getElementById('page-indicator')) {
            const indicator = document.createElement('div');
            indicator.id = 'page-indicator';
            indicator.style.cssText = `
                position: fixed;
                top: 50%;
                right: 2rem;
                transform: translateY(-50%);
                z-index: 50;
                display: flex;
                flex-direction: column;
                gap: 8px;
            `;
            document.body.appendChild(indicator);
        }
    }

    /**
     * 下一页
     */
    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.goToPage(this.currentPage + 1);
        }
    }

    /**
     * 上一页
     */
    prevPage() {
        if (this.currentPage > 0) {
            this.goToPage(this.currentPage - 1);
        }
    }

    /**
     * 跳转到指定页面
     */
    goToPage(pageIndex, updateUrl = true) {
        if (pageIndex >= 0 && pageIndex < this.totalPages) {
            // 记录历史
            if (this.currentPage !== pageIndex) {
                this.history.push(this.currentPage);
                if (this.history.length > 50) {
                    this.history.shift(); // 限制历史记录长度
                }
            }
            
            this.currentPage = pageIndex;
            
            // 更新URL哈希
            if (updateUrl) {
                window.location.hash = `page-${pageIndex + 1}`;
            }
            
            // 更新进度指示器
            this.updateProgress();
            
            // 触发页面切换事件
            this.dispatchPageChangeEvent();
            
            console.log(`📍 导航到第 ${pageIndex + 1} 页`);
        }
    }

    /**
     * 跳转多页
     */
    jumpPages(delta) {
        const newPage = Math.max(0, Math.min(this.totalPages - 1, this.currentPage + delta));
        this.goToPage(newPage);
    }

    /**
     * 跳转到章节
     */
    goToChapter(chapterNum) {
        const chapterStartPages = {
            1: 0,   // 开场部分 (第1-5页)
            2: 5,   // 互动破冰 (第6-8页)
            3: 8,   // AI时代关系 (第9-10页)
            4: 10,  // 工具链演示 (第11-16页)
            5: 16,  // 实战故事 (第17-24页)
            6: 24,  // 文科生优势 (第25-30页)
            7: 30,  // 理性分析 (第31-46页)
            8: 46,  // 人机协作 (第47-54页)
            9: 54,  // 实践方法 (第55-62页)
        };
        
        const startPage = chapterStartPages[chapterNum];
        if (startPage !== undefined) {
            this.goToPage(startPage);
        }
    }

    /**
     * 返回上一个访问的页面
     */
    goBack() {
        if (this.history.length > 0) {
            const prevPage = this.history.pop();
            this.goToPage(prevPage, false); // 不记录到历史中
        }
    }

    /**
     * 切换书签
     */
    toggleBookmark() {
        const pageIndex = this.currentPage;
        const bookmarkIndex = this.bookmarks.indexOf(pageIndex);
        
        if (bookmarkIndex === -1) {
            this.bookmarks.push(pageIndex);
            this.showMessage(`已添加书签：第 ${pageIndex + 1} 页`);
        } else {
            this.bookmarks.splice(bookmarkIndex, 1);
            this.showMessage(`已移除书签：第 ${pageIndex + 1} 页`);
        }
        
        // 更新书签指示器
        this.updateBookmarkIndicators();
    }

    /**
     * 更新书签指示器
     */
    updateBookmarkIndicators() {
        const indicator = document.getElementById('page-indicator');
        if (!indicator) return;
        
        const dots = indicator.querySelectorAll('.page-dot');
        dots.forEach((dot, index) => {
            if (this.bookmarks.includes(index)) {
                dot.classList.add('bookmarked');
                dot.style.backgroundColor = '#FFD700'; // 金色表示书签
            } else {
                dot.classList.remove('bookmarked');
            }
        });
    }

    /**
     * 更新进度指示器
     */
    updateProgress() {
        // 更新进度条
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            const progress = ((this.currentPage + 1) / this.totalPages) * 100;
            progressBar.style.width = `${progress}%`;
        }
        
        // 更新页面点指示器
        const indicator = document.getElementById('page-indicator');
        if (indicator) {
            const dots = indicator.querySelectorAll('.page-dot');
            dots.forEach((dot, index) => {
                if (index === this.currentPage) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }

    /**
     * 切换全屏模式
     */
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.warn('无法进入全屏模式:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    /**
     * 退出全屏
     */
    exitFullscreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }

    /**
     * 切换演示模式
     */
    togglePresentationMode() {
        document.body.classList.toggle('presentation-mode');
        
        if (document.body.classList.contains('presentation-mode')) {
            this.showMessage('演示模式已开启');
            // 隐藏光标
            document.body.style.cursor = 'none';
        } else {
            this.showMessage('演示模式已关闭');
            document.body.style.cursor = 'auto';
        }
    }

    /**
     * 显示目录
     */
    showTableOfContents() {
        const chapters = [
            { name: '开场部分', page: 0 },
            { name: '互动破冰', page: 5 },
            { name: 'AI时代关系', page: 8 },
            { name: '工具链演示', page: 10 },
            { name: '实战故事', page: 16 },
            { name: '文科生优势', page: 24 },
            { name: '理性分析', page: 30 },
            { name: '人机协作', page: 46 },
            { name: '实践方法', page: 54 },
            { name: '深度实践', page: 62 },
            { name: '结尾部分', page: 70 }
        ];
        
        const tocHtml = `
            <div id="table-of-contents" style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.9);
                border: 2px solid #E31937;
                border-radius: 10px;
                padding: 2rem;
                z-index: 9999;
                color: white;
                font-family: 'Noto Sans SC', serif;
                max-width: 500px;
                max-height: 80vh;
                overflow-y: auto;
            ">
                <h3 style="text-align: center; color: #E31937; margin-bottom: 1rem;">目录</h3>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${chapters.map((chapter, index) => `
                        <li style="
                            padding: 0.5rem;
                            cursor: pointer;
                            border-radius: 5px;
                            margin-bottom: 0.5rem;
                            ${this.currentPage >= chapter.page && 
                              (index === chapters.length - 1 || this.currentPage < chapters[index + 1].page) 
                              ? 'background: rgba(227, 25, 55, 0.3);' : ''}
                        " onclick="app.navigationController.goToPage(${chapter.page}); app.navigationController.closeTOC();">
                            <span style="color: #E31937;">${index + 1}.</span> ${chapter.name}
                            <span style="float: right; color: #999;">第${chapter.page + 1}页</span>
                        </li>
                    `).join('')}
                </ul>
                <div style="text-align: center; margin-top: 1rem;">
                    <button onclick="app.navigationController.closeTOC()" style="
                        background: #E31937;
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 5px;
                        cursor: pointer;
                    ">关闭</button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', tocHtml);
    }

    /**
     * 关闭目录
     */
    closeTOC() {
        const toc = document.getElementById('table-of-contents');
        if (toc) {
            toc.remove();
        }
    }

    /**
     * 刷新页面
     */
    refreshPage() {
        window.location.reload();
    }

    /**
     * 显示消息
     */
    showMessage(message, duration = 2000) {
        const messageEl = document.createElement('div');
        messageEl.style.cssText = `
            position: fixed;
            top: 2rem;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(227, 25, 55, 0.9);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            z-index: 9999;
            font-family: 'Noto Sans SC', serif;
            font-weight: 600;
            box-shadow: 0 4px 20px rgba(227, 25, 55, 0.3);
        `;
        messageEl.textContent = message;
        
        document.body.appendChild(messageEl);
        
        // 动画显示
        messageEl.animate([
            { opacity: 0, transform: 'translateX(-50%) translateY(-20px)' },
            { opacity: 1, transform: 'translateX(-50%) translateY(0)' }
        ], {
            duration: 300,
            easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
        });
        
        // 自动消失
        setTimeout(() => {
            messageEl.animate([
                { opacity: 1, transform: 'translateX(-50%) translateY(0)' },
                { opacity: 0, transform: 'translateX(-50%) translateY(-20px)' }
            ], {
                duration: 300,
                easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
            }).addEventListener('finish', () => {
                messageEl.remove();
            });
        }, duration);
    }

    /**
     * 触发页面切换事件
     */
    dispatchPageChangeEvent() {
        const event = new CustomEvent('pageChange', {
            detail: {
                currentPage: this.currentPage,
                totalPages: this.totalPages,
                progress: (this.currentPage + 1) / this.totalPages
            }
        });
        
        document.dispatchEvent(event);
    }

    /**
     * 获取当前页面信息
     */
    getCurrentPageInfo() {
        return {
            current: this.currentPage,
            total: this.totalPages,
            progress: (this.currentPage + 1) / this.totalPages,
            history: [...this.history],
            bookmarks: [...this.bookmarks]
        };
    }
}

// 全局导航控制器
window.NavigationController = NavigationController;