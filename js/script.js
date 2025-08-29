// 自动获取仓库路径前缀
const repoPath = window.location.pathname.includes('/L-X-s_little_home')
    ? '/L-X-s_little_home'
    : '';

const sectionsConfig = [
    { id: 'home', path: `${repoPath}/sections/home.html` },
    { id: 'story', path: `${repoPath}/sections/story.html` },
    { id: 'gallery', path: `${repoPath}/sections/gallery.html` },
    { id: 'message', path: `${repoPath}/sections/message.html` },
];

// 加载章节内容
async function loadSection(sectionId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`无法加载 ${filePath}`);
        const html = await response.text();
        document.getElementById(sectionId).innerHTML = html;
    } catch (error) {
        console.error('加载章节失败:', error);
        document.getElementById(sectionId).innerHTML = `
            <div class="container">
                <h2>加载失败</h2>
                <p>抱歉，无法加载内容。请刷新页面重试。</p>
            </div>
        `;
    }
}

// 初始化Swiper
function initSwiper() {
    const swiper = new Swiper('.swiper', {
        // 启用鼠标滚轮控制
        mousewheel: true,
        
        // 启用键盘控制
        keyboard: {
            enabled: true,
        },
        
        // 分页指示器
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        // 导航按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // 方向：垂直滑动
        direction: 'vertical',
        
        // 滑动速度
        speed: 800,
        
        // 循环模式（可选）
        loop: false,
        
        // 滑动效果
        effect: 'slide',
        
        // 触摸灵敏度
        touchRatio: 1,
        
        // 滑动阻力
        resistanceRatio: 0.85,
        
        // 滑动到下一个幻灯片所需的最小距离
        threshold: 10,
        
        // 当滑动到边缘时禁止继续滑动
        preventInteractionOnTransition: true,
        
        // 初始化回调
        on: {
            init: function() {
                console.log('Swiper初始化完成！');
            },
        }
    });
    
    return swiper;
}

// 主初始化函数
async function initializeApp() {
    console.log('🚀 开始加载应用...');
    
    try {
        // 并行加载所有章节
        const loadPromises = sectionsConfig.map(section => 
            loadSection(section.id, section.path)
        );
        
        await Promise.all(loadPromises);
        console.log('✅ 所有章节加载完成');
        
        // 初始化Swiper
        const swiper = initSwiper();
        console.log('🎉 Swiper初始化完成');
        
        // 添加键盘快捷键提示
        console.log('💡 使用键盘上下键或鼠标滚轮切换页面');
        
    } catch (error) {
        console.error('应用初始化失败:', error);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 图片模态框功能（保持原有功能）
function openModal(img) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    if (modal && modalImg) {
        modal.style.display = 'block';
        modalImg.src = img.src;
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
}