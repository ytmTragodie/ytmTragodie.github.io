// Global Scripts for Health Management Platform

document.addEventListener('DOMContentLoaded', () => {
    console.log('HealthCare+ Platform Loaded');
    
    // --- 1. Global Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });

    document.querySelectorAll('.card, .product-card, .post-card, .chart-main-container, .chart-history-container, .ai-panel').forEach((el) => {
        el.style.opacity = '0'; 
        el.classList.add('fade-in-init'); 
        observer.observe(el);
    });

    // --- 2. Mall Logic ---
    if (window.location.pathname.includes('mall.html')) {
        initMall();
    }

    // --- 3. Diet Logic ---
    if (window.location.pathname.includes('diet.html')) {
        initDiet();
    }

    // --- 4. Community Logic ---
    if (window.location.pathname.includes('community.html')) {
        initCommunity();
    }

    // --- 5. Monitor Logic ---
    if (window.location.pathname.includes('monitor.html')) {
        initMonitor();
    }
});

// =======================
// MALL MODULE
// =======================
function initMall() {
    // 1. Calculator Toggle
    window.toggleCalculator = function() {
        const panel = document.getElementById('calculator-panel');
        if (panel.classList.contains('active')) {
            panel.classList.remove('active');
        } else {
            panel.classList.add('active');
        }
    };

    window.calculateFood = function() {
        const name = document.getElementById('foodName').value;
        const amount = document.getElementById('foodAmount').value;
        const resultArea = document.getElementById('resultArea');

        if (!name || !amount) {
            alert('请输入食材名称和分量');
            return;
        }

        let statusClass = 'status-green';
        let statusText = '✅ 营养指标正常';
        let message = '该食材适合您的健康计划。';
        let color = '#4CAF50';

        if (name.includes('肉') || name.includes('油') || name.includes('炸')) {
            statusClass = 'status-red';
            statusText = '⚠️ 热量/脂肪超标';
            message = '该食材热量过高，不利于血脂控制。';
            color = '#F44336';
        } else if (name.includes('糖') || name.includes('甜') || name.includes('蛋糕')) {
            statusClass = 'status-orange';
            statusText = '⚠️ 含糖量超标';
            message = '糖分过高，易引起血糖波动。';
            color = '#FF9800';
        }

        resultArea.innerHTML = `
            <div style="background: #f5f7fa; padding: 15px; border-radius: 8px;">
                <div class="status-tag ${statusClass}" style="background: ${color}; color: white; padding: 4px 10px; border-radius: 4px; font-size: 0.8rem;">${statusText}</div>
                <h4 style="margin: 10px 0;">${name} (${amount}g)</h4>
                <p style="font-size: 0.9rem; color: #666;">${message}</p>
            </div>
        `;
    };

    // 2. Product Rendering (Existing)
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';
    
    document.querySelectorAll('.cat-link').forEach(link => {
        if (link.dataset.cat === category) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    renderProducts(category);
}

// ... (Product Data remains same) ...
const productData = {
    'pressure': [
        { name: '严选芹菜粉', desc: '天然降压食材', price: '25.0', tag: '降压', img: '严选芹菜粉.webp' },
        { name: '罗布麻茶', desc: '平稳血压良伴', price: '45.0', tag: '降压', img: '罗布麻茶.webp' },
        { name: '低钠海盐', desc: '减少钠摄入', price: '12.0', tag: '低钠', img: '低钠海盐.webp' },
        { name: '严选山楂片', desc: '无糖添加，药食同源', price: '29.9', tag: '降压', img: '严选山楂片.jpg' },
        { name: '特级决明子', desc: '颗粒饱满，清肝明目', price: '19.9', tag: '降压', img: '特级决明子.webp' },
        { name: '野生天麻片', desc: '平抑肝阳，祛风通络', price: '88.0', tag: '降压', img: '野生天麻片.webp' }
    ],
    'sugar': [
        { name: '低脂燕麦片', desc: '高纤维控糖', price: '35.0', tag: '控糖', img: '低脂燕麦片.png' },
        { name: '苦荞茶', desc: '辅助降糖', price: '28.0', tag: '控糖', img: '苦荞茶.png' },
        { name: '无糖全麦面包', desc: '早餐优选', price: '18.0', tag: '控糖', img: '无糖全麦面包.png' }
    ],
    'salt': [
        { name: '低钠酱油', desc: '减盐不减鲜', price: '15.0', tag: '低钠', img: '低钠酱油.jpeg' },
        { name: '无盐虾皮', desc: '天然钙源', price: '22.0', tag: '补钙', img: '' }
    ],
    'nutrition': [
        { name: '乳清蛋白粉', desc: '增强免疫力', price: '128.0', tag: '增肌', img: '' },
        { name: '复合维生素', desc: '每日营养补充', price: '59.0', tag: '综合', img: '' }
    ]
};

productData['all'] = [
    ...productData['pressure'], 
    ...productData['sugar'], 
    ...productData['salt'], 
    ...productData['nutrition']
];

function renderProducts(cat) {
    const grid = document.querySelector('.grid-4');
    if (!grid) return;
    grid.style.opacity = '0.5';
    setTimeout(() => {
        grid.innerHTML = '';
        const items = productData[cat] || productData['all'];
        items.forEach(item => {
            let imgHtml = '';
            if (item.img) {
                imgHtml = `<img src="${item.img}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">`;
            } else {
                imgHtml = `<div style="width: 100%; height: 100%; background: #eee; display: flex; align-items: center; justify-content: center; color: #999;">暂无图片</div>`;
            }

            const html = `
                <div class="product-card fade-in">
                    <div class="product-img">
                        ${imgHtml}
                    </div>
                    <div class="product-info">
                        <h4>${item.name}</h4>
                        <p style="font-size: 0.85rem; color: #666;">${item.desc}</p>
                        <div class="price">¥ ${item.price}</div>
                        <button class="btn btn-outline" style="width: 100%; padding: 6px;">加入购物车</button>
                    </div>
                </div>
            `;
            grid.innerHTML += html;
        });
        grid.style.opacity = '1';
    }, 300);
}

// =======================
// MONITOR MODULE (Multi-Device)
// =======================
const deviceConfigs = {
    'glucose': {
        unit: 'mmol/L',
        label: '血糖',
        min: 4.0, max: 10.0,
        color: '#F44336', // Red
        statusNormal: '血糖正常',
        alerts: ['血糖偏高预警', '血糖正常', '餐后血糖峰值']
    },
    'bp': {
        unit: 'mmHg',
        label: '收缩压',
        min: 90, max: 140,
        color: '#FF9800', // Orange
        statusNormal: '血压平稳',
        alerts: ['血压轻微波动', '心率正常', '早间血压正常']
    },
    'sleep': {
        unit: '小时',
        label: '深度睡眠',
        min: 0, max: 3, // Hours of deep sleep
        color: '#673AB7', // Purple
        statusNormal: '睡眠良好',
        alerts: ['入睡时间：23:00', '深睡占比 25%', '呼吸质量优']
    },
    'weight': {
        unit: 'kg',
        label: '体重',
        min: 60, max: 65,
        color: '#2196F3', // Blue
        statusNormal: '体重达标',
        alerts: ['体脂率 22%', '水分含量正常', '骨量正常']
    }
};

let currentDevice = 'glucose';
let chartInterval;

function initMonitor() {
    // 1. Tab Switching
    document.querySelectorAll('.device-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.device-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentDevice = tab.dataset.device;
            resetMonitor();
        });
    });

    // 2. Initial Setup
    resetMonitor();
}

function resetMonitor() {
    const config = deviceConfigs[currentDevice];
    const unitLabel = document.getElementById('unitLabel');
    const statusLabel = document.getElementById('statusLabel');
    const aiFeed = document.getElementById('aiFeed');
    
    // Reset UI
    unitLabel.innerText = config.unit;
    statusLabel.innerText = '检测中...';
    statusLabel.style.backgroundColor = '#ccc';
    aiFeed.innerHTML = ''; // Clear alerts

    // Reset Charts
    clearInterval(chartInterval);
    renderMainChart(config);
    renderSubChart(config);
    startRealtimeUpdates(config);
}

function renderMainChart(config) {
    const container = document.getElementById('mainChart');
    container.innerHTML = '';
    
    // Create 24 bars for 24 hours
    for(let i=0; i<24; i++) {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.background = config.color;
        // Random height 20-80%
        bar.style.height = (20 + Math.random() * 60) + '%';
        container.appendChild(bar);
    }
}

function renderSubChart(config) {
    const container = document.getElementById('subChart');
    container.innerHTML = '';
    
    // Create 7 bars for week
    for(let i=0; i<7; i++) {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.width = '20px'; // Wider bars for week
        bar.style.background = '#ddd'; // Passive color
        bar.style.height = (30 + Math.random() * 50) + '%';
        
        // Highlight last one
        if(i === 6) bar.style.background = config.color;
        
        container.appendChild(bar);
    }
}

function startRealtimeUpdates(config) {
    const valueDisplay = document.getElementById('realtimeValue');
    const statusLabel = document.getElementById('statusLabel');
    const aiFeed = document.getElementById('aiFeed');

    // Initial Value
    let currentVal = (config.min + config.max) / 2;
    
    chartInterval = setInterval(() => {
        // Update Value
        const change = (Math.random() - 0.5) * (config.max - config.min) * 0.1;
        currentVal += change;
        
        // Boundaries
        if(currentVal < config.min) currentVal = config.min;
        if(currentVal > config.max) currentVal = config.max;

        valueDisplay.innerText = currentVal.toFixed(1);

        // Update Chart Animation (Shift bars)
        const bars = document.querySelectorAll('#mainChart .chart-bar');
        if(bars.length > 0) {
            for(let i=0; i<bars.length-1; i++) {
                bars[i].style.height = bars[i+1].style.height;
            }
            const newHeight = ((currentVal - config.min) / (config.max - config.min) * 80 + 10) + '%';
            bars[bars.length-1].style.height = newHeight;
        }

        // Update Status
        statusLabel.innerText = config.statusNormal;
        statusLabel.className = 'status-tag'; // Reset
        statusLabel.style.backgroundColor = config.color;
        statusLabel.style.color = 'white';

        // AI Alerts (Randomly add one)
        if(Math.random() > 0.7) {
            const msg = config.alerts[Math.floor(Math.random() * config.alerts.length)];
            const time = new Date().toLocaleTimeString('zh-CN', {hour:'2-digit', minute:'2-digit'});
            const html = `
                <div class="alert-item fade-in" style="background: #f9f9f9; padding: 10px; border-radius: 8px; border-left: 3px solid ${config.color};">
                    <small style="color: #999;">${time}</small>
                    <p style="margin: 5px 0;">${msg}</p>
                </div>
            `;
            aiFeed.insertAdjacentHTML('afterbegin', html);
            if(aiFeed.children.length > 5) aiFeed.lastElementChild.remove();
        }

    }, 2000);
}

// ... (Diet and Community Logic remains same - omitted for brevity but should be kept in real file) ...
// Re-adding Diet and Community functions to ensure file integrity

// =======================
// DIET MODULE
// =======================
// (Copying previous diet logic to ensure it's not lost)
const recipesData = [
    { title: '山楂决明子小米粥', tags: ['高血压', '早餐', '降压'], imgTag: '早餐 • 降压', img: '山楂决明子小米粥.png', desc: '食材：小米、山楂片、决明子、去核红枣。消食化积，辅助降压。' },
    { title: '黄芪红枣小米粥', tags: ['高血压', '早餐', '补气'], imgTag: '早餐 • 补气', img: '黄芪红枣小米粥.webp', desc: '食材：小米、大米、黄芪片、去核红枣、桂圆干。益气补血，增强体质。' },
    { title: '茯苓芝麻糊', tags: ['高血压', '早餐', '养发'], imgTag: '早餐 • 养发', img: '茯苓芝麻糊.jpg', desc: '食材：无糖黑芝麻糊粉、茯苓粉、即食燕麦片。健脾祛湿，乌发养颜。' },
    { title: '葛根香蕉奶昔', tags: ['高血压', '早餐', '通络'], imgTag: '早餐 • 通络', img: '葛根香蕉奶昔.jpg', desc: '食材：香蕉、葛根粉、低脂牛奶、燕麦片。生津止渴，升阳止泻。' },
    { title: '天麻蒸鱼块', tags: ['高血压', '午餐', '平肝'], imgTag: '午餐 • 平肝', img: '天麻蒸鱼块.webp', desc: '食材：鲈鱼块、天麻片、姜丝、葱丝。平抑肝阳，祛风通络。' },
    { title: '清炒西芹百合', tags: ['高血压', '午餐', '清热'], imgTag: '午餐 • 清热', img: '清炒西芹百合.webp', desc: '食材：西芹、鲜百合。清热除烦，平肝降压。' },
    { title: '葛根玉米排骨汤', tags: ['高血压', '午餐', '滋阴'], imgTag: '午餐 • 滋阴', img: '葛根玉米排骨汤.png', desc: '食材：猪排骨、甜玉米、葛根、胡萝卜。清热生津，滋阴补肾。' },
    { title: '黄芪山药蒸鸡腿', tags: ['高血压', '午餐', '补气'], imgTag: '午餐 • 补气', img: '黄芪山药蒸鸡腿.webp', desc: '食材：鸡腿根、铁棍山药、黄芪片、姜丝。补气益肺，健脾固肾。' },
    { title: '茯苓莲子蒸鸭肉', tags: ['高血压', '晚餐', '安神'], imgTag: '晚餐 • 安神', img: '茯苓莲子蒸鸭肉.webp', desc: '食材：鸭胸肉、茯苓片、去心白莲子。健脾宁心，利水渗湿。' },
    { title: '山药茯苓馒头', tags: ['高血压', '晚餐', '健脾'], imgTag: '晚餐 • 健脾', img: '杂粮饭.png', desc: '食材：面粉、山药粉、茯苓粉、酵母。健脾益胃，增强免疫。' },
    { title: '枸杞香菇烧豆腐', tags: ['高血压', '晚餐', '养肝'], imgTag: '晚餐 • 养肝', img: '芹菜炒豆干.webp', desc: '食材：北豆腐、鲜香菇、枸杞、毛豆仁。滋补肝肾，益精明目。' },
    { title: '百合山药小米粥', tags: ['高血压', '晚餐', '助眠'], imgTag: '晚餐 • 助眠', img: '黄芪红枣小米粥.webp', desc: '食材：小米、鲜百合、铁棍山药、枸杞。养阴润肺，清心安神。' },
    { title: '苦瓜炒蛋', tags: ['糖尿病', '午餐', '降糖'], imgTag: '午餐 • 降糖', img: '清炒西芹百合.webp', desc: '食材：苦瓜、鸡蛋、少许盐。苦瓜皂苷辅助降糖，鸡蛋补充优质蛋白。' },
    { title: '杂粮饭', tags: ['糖尿病', '午餐', '低升糖'], imgTag: '午餐 • 低升糖', img: '杂粮饭.png', desc: '食材：糙米、黑米、红豆。富含膳食纤维，延缓血糖上升。' },
    { title: '清蒸鲈鱼', tags: ['糖尿病', '晚餐', '优质蛋白'], imgTag: '晚餐 • 控糖', img: '清蒸鱼.png', desc: '食材：鲈鱼、姜葱。低脂高蛋白，适合糖友食用。' },
    { title: '西蓝花炒虾仁', tags: ['糖尿病', '午餐', '低卡'], imgTag: '午餐 • 低卡', img: '芹菜炒豆干.webp', desc: '食材：西蓝花、虾仁、蒜末。低热量高营养，饱腹感强。' },
    { title: '清蒸茄子', tags: ['高血脂', '晚餐', '吸脂'], imgTag: '晚餐 • 吸脂', img: '天麻蒸鱼块.webp', desc: '食材：茄子、蒜末、生抽。茄子富含维生素P，增强血管弹性。' },
    { title: '燕麦核桃粥', tags: ['高血脂', '早餐', '降脂'], imgTag: '早餐 • 降脂', img: '低脂燕麦片.png', desc: '食材：燕麦片、核桃仁。燕麦β-葡聚糖有助于降低胆固醇。' },
    { title: '海带豆腐汤', tags: ['高血脂', '午餐', '清血管'], imgTag: '午餐 • 清血管', img: '葛根玉米排骨汤.png', desc: '食材：海带、豆腐。海带胶质吸附血管垃圾，豆腐补充大豆异黄酮。' },
    { title: '凉拌木耳', tags: ['高血脂', '晚餐', '清肠'], imgTag: '晚餐 • 清肠', img: '清炒西芹百合.webp', desc: '食材：黑木耳、醋、蒜泥。木耳多糖抗凝血，预防血栓。' }
];

function initDiet() {
    const slider = document.querySelector('.nav-slider');
    const btns = document.querySelectorAll('.filter-btn');
    const contentContainer = document.getElementById('recipe-container');

    renderRecipes('all');
    const activeBtn = document.querySelector('.filter-btn.active');
    if(activeBtn) moveSlider(activeBtn);

    btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            moveSlider(btn);
            contentContainer.classList.add('slide-out');
            contentContainer.classList.remove('slide-in');
            setTimeout(() => {
                renderRecipes(btn.dataset.filter);
                contentContainer.classList.remove('slide-out');
                contentContainer.classList.add('slide-in');
            }, 300);
        });
    });

    function moveSlider(targetBtn) {
        if(!slider) return;
        slider.style.width = targetBtn.offsetWidth + 'px';
        slider.style.left = targetBtn.offsetLeft + 'px';
    }
}

function renderRecipes(filter) {
    const container = document.getElementById('recipe-container');
    if (!container) return;
    container.innerHTML = '';
    const filtered = filter === 'all' ? recipesData : recipesData.filter(r => r.tags.includes(filter));
    if (filtered.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align:center; color:#999; padding:40px;">暂无相关食谱</div>';
        return;
    }
    filtered.forEach(item => {
        const html = `
            <div class="card recipe-card fade-in">
                <div class="recipe-img">
                    <img src="${item.img}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit;">
                    <span class="recipe-tag">${item.imgTag}</span>
                </div>
                <h4>${item.title}</h4>
                <p class="text-secondary" style="font-size: 0.9rem; margin-bottom: 10px;">${item.desc}</p>
                <div style="margin-top: auto;">
                    <p style="font-size: 0.85rem; background: #f0f4f8; padding: 8px; border-radius: 6px; margin-bottom: 15px;">
                        <span style="color: var(--primary);">【严选食材】</span> 
                        <a href="mall.html" style="text-decoration: underline;">查看相关食材</a>
                    </p>
                    <button class="btn btn-outline" style="width: 100%; border-radius: 8px; padding: 8px;">查看做法</button>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

// =======================
// COMMUNITY MODULE
// =======================
function initCommunity() {
    const topics = document.querySelectorAll('.topic-list li');
    const feed = document.getElementById('community-feed');

    topics.forEach(topic => {
        topic.addEventListener('click', () => {
            topics.forEach(t => t.classList.remove('active'));
            topic.classList.add('active');
            feed.style.opacity = '0';
            setTimeout(() => {
                const topicName = topic.getAttribute('data-topic') || topic.innerText.trim();
                loadFeed(topicName);
                feed.style.opacity = '1';
            }, 300);
        });
    });
}

function loadFeed(topicName) {
    const feed = document.getElementById('community-feed');
    let content = '';

    if (topicName.includes('每日打卡')) {
        content = `
            <div class="recruit-card fade-in">
                 <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div><span class="tag tag-blue mb-2">打卡挑战</span><h4>7天无糖饮食挑战</h4><p style="font-size: 0.9rem; color: #666; margin: 5px 0 10px;">坚持就是胜利！</p></div>
                    <button class="btn btn-primary" style="padding: 6px 16px; font-size: 0.9rem;">立即加入</button>
                </div>
            </div>
            ${createPost('李叔叔', '打卡第3天，血糖控制在6.5！', 56)}
            ${createPost('张阿姨', '今天走了一万步，感觉很棒。', 32)}
        `;
    } else if (topicName.includes('养生问答')) {
        content = `${createPost('王医生', '【科普】为什么不建议糖尿病人吃稀饭？升糖指数（GI）是关键...', 120, true)}${createPost('小刘', '请问高血压能不能吃人参？', 12)}`;
    } else if (topicName.includes('饮食记录')) {
        content = `${createPost('美食家小陈', '今天的午餐：藜麦饭 + 鸡胸肉 + 西兰花。', 45, false, ['杂粮饭.png', '清炒西芹百合.webp'])}${createPost('糖友老赵', '发现一个超好吃的无糖酸奶！', 33, false, ['葛根香蕉奶昔.jpg'])}${createPost('小美', '自制无糖蛋糕，做法分享~', 89, false, ['茯苓芝麻糊.jpg'])}`;
    } else if (topicName.includes('运动日记')) {
        content = `${createPost('跑者小李', '晨跑5公里，配速5:30。', 88)}${createPost('健身达人', '力量训练日，深蹲100kg达成！', 102)}${createPost('瑜伽爱好者', '今日瑜伽打卡，身心舒畅。', 45)}`;
    } else if (topicName.includes('慢病交流')) {
        content = `${createPost('康复之路', '确诊高血压3年，分享我的控压经验。', 210, false, ['严选芹菜粉.webp'])}${createPost('温暖的心', '有人吃过二甲双胍缓释片吗？有什么副作用？', 15)}${createPost('老张', '最近血压波动大，医生建议我减肥。', 22)}`;
    } else if (topicName.includes('健康分享')) {
        content = `${createPost('小编推荐', '这5种水果升糖指数最低，建议收藏！', 500, true, ['低脂燕麦片.png'])}${createPost('养生达人', '睡前泡脚的好处，坚持一个月效果惊人。', 340)}`;
    } else {
        content = `
            <div class="recruit-card fade-in">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div><span class="tag tag-blue mb-2">结伴招募</span><h4>糖尿病控糖打卡小组 (第3期)</h4><p style="font-size: 0.9rem; color: #666; margin: 5px 0 10px;">互相监督饮食，分享控糖食谱，每日打卡。</p><div style="display: flex; align-items: center; gap: 10px;"><img class="avatar" src="杂粮饭.png" style="width: 24px; height: 24px; object-fit: cover;"><span style="font-size: 0.85rem;">发起人: 糖小护</span></div></div>
                    <button class="btn btn-primary" style="padding: 6px 16px; font-size: 0.9rem;">立即加入</button>
                </div>
            </div>
            ${createPost('健康达人李阿姨', '今天的午餐打卡！芹菜炒豆干，清蒸鱼... #控糖', 24, false, ['芹菜炒豆干.webp', '清蒸鱼.png', '杂粮饭.png'])}
            ${createPost('王医生', '无糖不代表无热量！大家要注意看配料表。', 156, true, ['无糖全麦面包.png', '低脂燕麦片.png', '苦荞茶.png'])}
        `;
    }
    feed.innerHTML = content;
}

function createPost(user, text, likes, isExpert=false, images=[]) {
    const badge = isExpert ? '<span class="tag tag-blue" style="transform: scale(0.8);">认证专家</span>' : '';
    let imagesHtml = '';
    if (images && images.length > 0) {
        imagesHtml = '<div class="post-images">';
        images.forEach(img => {
            imagesHtml += `<img class="post-image" src="${img}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; background: #f0f0f0;">`;
        });
        imagesHtml += '</div>';
    }

    return `
        <div class="post-card fade-in">
            <div class="user-info"><img class="avatar" src="王医生.png" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;"><div><h5 style="margin: 0;">${user} ${badge}</h5><small style="color: #999;">刚刚发布</small></div></div>
            <p>${text}</p>
            ${imagesHtml}
            <div class="post-actions"><div class="action-btn">❤️ ${likes}</div><div class="action-btn" onclick="toggleComments(this)">💬 评论</div><div class="action-btn">⭐ 收藏</div></div>
            <div class="comment-section" style="display: none; margin-top: 15px; background: #f9f9f9; padding: 15px; border-radius: 8px;">
                <div style="display:flex; gap:10px; margin-bottom:10px;"><input type="text" class="form-input" placeholder="写下你的评论..." style="padding: 8px;"><button class="btn btn-primary" style="padding: 8px 15px;">发送</button></div>
                <div class="comment-list"><div style="border-bottom: 1px solid #eee; padding: 8px 0;"><span style="font-weight:bold; font-size:0.9rem;">用户A:</span> <span style="font-size:0.9rem; color:#555;">确实很有用！</span></div></div>
            </div>
        </div>
    `;
}

window.toggleComments = function(btn) {
    const card = btn.closest('.post-card');
    const section = card.querySelector('.comment-section');
    if (section.style.display === 'none') {
        section.style.display = 'block';
        section.style.animation = 'slideDown 0.3s ease-out';
    } else {
        section.style.display = 'none';
    }
}
