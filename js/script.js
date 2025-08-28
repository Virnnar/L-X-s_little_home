// 配置对象：定义所有需要加载的章节
const sectionsConfig = [
    { id: 'home', path: './sections/home.html' },
    { id: 'story', path: './sections/story.html' },
    { id: 'gallery', path: './sections/gallery.html' },
    { id: 'message', path: './sections/message.html' }
];


// 加载单个章节的函数
async function loadSection(sectionId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`无法加载 ${filePath}: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(sectionId).innerHTML = html;
        console.log(`✅ 已加载: ${sectionId}`);
    } catch (error) {
        console.error('❌ 加载章节失败:', error);
        document.getElementById(sectionId).innerHTML = `
            <div class="container">
                <h2>加载失败</h2>
                <p>抱歉，无法加载内容。请刷新页面重试。</p>
            </div>
        `;
    }
}

// 加载所有章节
async function loadAllSections() {
    console.log('🚀 开始加载所有章节...');
    
    // 使用 Promise.all 并行加载所有章节
    const loadPromises = sectionsConfig.map(section => 
        loadSection(section.id, section.path)
    );
    
    await Promise.all(loadPromises);
    console.log('🎉 所有章节加载完成！');
    
    // 所有内容加载完成后，初始化滚动监听
    initScrollListener();
}

// 初始化滚动监听
function initScrollListener() {
    window.addEventListener('scroll', function() {
        let sections = document.querySelectorAll('section');
        let navLinks = document.querySelectorAll('#navbar a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(pageYOffset >= (sectionTop - sectionHeight / 3)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    });
}

// 图片模态框功能
function openModal(img) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImg.src = img.src;
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
}

// 页面加载完成后开始加载所有章节
document.addEventListener('DOMContentLoaded', function() {
    loadAllSections();
});

// 添加错误处理
window.addEventListener('error', function(e) {
    console.error('全局错误:', e.error);
});