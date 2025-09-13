/**
 * AI协作能力PPT - 动画控制器
 * 实现Apple风格的高质量动画效果
 */

class AnimationController {
    constructor() {
        this.animations = new Map();
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // 初始化动画系统
        this.init();
    }

    /**
     * 初始化动画系统
     */
    init() {
        console.log('🎬 动画系统初始化中...');
        
        // 检测用户偏好
        this.checkMotionPreference();
        
        // 设置性能优化
        this.setupPerformanceOptimizations();
        
        console.log('✅ 动画系统初始化完成');
    }

    /**
     * 检测用户动画偏好
     */
    checkMotionPreference() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        mediaQuery.addListener((e) => {
            this.isReducedMotion = e.matches;
            if (this.isReducedMotion) {
                console.log('👤 用户偏好：减少动画');
                this.disableAnimations();
            } else {
                console.log('👤 用户偏好：正常动画');
                this.enableAnimations();
            }
        });
    }

    /**
     * 设置性能优化
     */
    setupPerformanceOptimizations() {
        // 为动画元素添加 will-change 属性
        const animatedElements = document.querySelectorAll('.purpose-item, .identity-card, .section');
        animatedElements.forEach(el => {
            el.style.willChange = 'transform, opacity';
        });
    }

    /**
     * Apple风格页面切换动画
     */
    pageTransition(direction = 'next', fromSection, toSection) {
        if (this.isReducedMotion) {
            return this.simpleTransition(fromSection, toSection);
        }

        const duration = 800;
        const easing = 'cubic-bezier(0.23, 1, 0.32, 1)'; // Apple's favorite easing

        // 设置初始状态
        if (toSection) {
            toSection.style.transform = direction === 'next' ? 'translateY(100%)' : 'translateY(-100%)';
            toSection.style.opacity = '0';
        }

        // 执行动画
        const animation = toSection?.animate([
            {
                transform: direction === 'next' ? 'translateY(100%)' : 'translateY(-100%)',
                opacity: 0
            },
            {
                transform: 'translateY(0)',
                opacity: 1
            }
        ], {
            duration: duration,
            easing: easing,
            fill: 'forwards'
        });

        // 同时动画离开的页面
        if (fromSection) {
            fromSection.animate([
                {
                    transform: 'translateY(0)',
                    opacity: 1
                },
                {
                    transform: direction === 'next' ? 'translateY(-100%)' : 'translateY(100%)',
                    opacity: 0.3
                }
            ], {
                duration: duration,
                easing: easing,
                fill: 'forwards'
            });
        }

        return animation;
    }

    /**
     * 简单过渡（无动画偏好用户）
     */
    simpleTransition(fromSection, toSection) {
        if (fromSection) {
            fromSection.style.opacity = '0';
        }
        if (toSection) {
            toSection.style.opacity = '1';
            toSection.style.transform = 'none';
        }
    }

    /**
     * 视差滚动效果
     */
    parallaxScroll(scrollOffset, element) {
        if (this.isReducedMotion) return;

        const speed = 0.5;
        const yPos = scrollOffset * speed;
        
        if (element) {
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
    }

    /**
     * 文字逐字显示动画
     */
    typewriterEffect(element, text, speed = 100) {
        if (this.isReducedMotion) {
            element.textContent = text;
            return;
        }

        element.textContent = '';
        let index = 0;

        const typeInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typeInterval);
            }
        }, speed);

        return typeInterval;
    }

    /**
     * 计数器动画
     */
    animateCounter(element, start, end, duration = 2000) {
        if (this.isReducedMotion) {
            element.textContent = end;
            return;
        }

        const startTime = performance.now();
        const range = end - start;

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 使用 easeOutCubic 缓动函数
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            const current = Math.floor(start + (range * easeProgress));
            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = end; // 确保最终值正确
            }
        };

        requestAnimationFrame(updateCounter);
    }

    /**
     * 卡片翻转动画
     */
    flipCard(card, frontContent, backContent) {
        if (this.isReducedMotion) {
            card.innerHTML = backContent;
            return;
        }

        const duration = 600;
        
        // 第一阶段：翻转到90度
        card.animate([
            { transform: 'rotateY(0deg)' },
            { transform: 'rotateY(90deg)' }
        ], {
            duration: duration / 2,
            easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
            fill: 'forwards'
        }).addEventListener('finish', () => {
            // 更换内容
            card.innerHTML = backContent;
            
            // 第二阶段：从-90度翻转到0度
            card.animate([
                { transform: 'rotateY(-90deg)' },
                { transform: 'rotateY(0deg)' }
            ], {
                duration: duration / 2,
                easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
                fill: 'forwards'
            });
        });
    }

    /**
     * 波纹扩散动画
     */
    rippleEffect(element, x, y) {
        if (this.isReducedMotion) return;

        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(227, 25, 55, 0.3);
            width: ${size}px;
            height: ${size}px;
            left: ${x - size / 2}px;
            top: ${y - size / 2}px;
            pointer-events: none;
            transform: scale(0);
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        const animation = ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(1)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
        });
        
        animation.addEventListener('finish', () => {
            ripple.remove();
        });
    }

    /**
     * 粒子效果
     */
    createParticles(container, count = 20) {
        if (this.isReducedMotion) return;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: #E31937;
                border-radius: 50%;
                pointer-events: none;
            `;
            
            container.appendChild(particle);
            
            // 随机位置和动画
            const startX = Math.random() * container.offsetWidth;
            const startY = Math.random() * container.offsetHeight;
            const endX = startX + (Math.random() - 0.5) * 200;
            const endY = startY + (Math.random() - 0.5) * 200;
            
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            const animation = particle.animate([
                { 
                    transform: 'translate(0, 0) scale(0)',
                    opacity: 0 
                },
                { 
                    transform: `translate(${endX - startX}px, ${endY - startY}px) scale(1)`,
                    opacity: 1 
                },
                { 
                    transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`,
                    opacity: 0 
                }
            ], {
                duration: 2000 + Math.random() * 1000,
                easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
                delay: Math.random() * 1000
            });
            
            animation.addEventListener('finish', () => {
                particle.remove();
            });
        }
    }

    /**
     * 渐进式显示动画
     */
    staggeredFadeIn(elements, delay = 100) {
        elements.forEach((element, index) => {
            if (this.isReducedMotion) {
                element.style.opacity = '1';
                element.style.transform = 'none';
                return;
            }

            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.animate([
                    { opacity: 0, transform: 'translateY(30px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], {
                    duration: 600,
                    easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
                    fill: 'forwards'
                });
            }, index * delay);
        });
    }

    /**
     * 禁用所有动画
     */
    disableAnimations() {
        document.body.classList.add('reduce-motion');
    }

    /**
     * 启用所有动画
     */
    enableAnimations() {
        document.body.classList.remove('reduce-motion');
    }

    /**
     * 清理动画
     */
    cleanup() {
        this.animations.forEach(animation => {
            if (animation && animation.cancel) {
                animation.cancel();
            }
        });
        this.animations.clear();
    }
}

// 全局动画控制器实例
window.AnimationController = AnimationController;

// 在应用初始化时创建动画控制器
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
});