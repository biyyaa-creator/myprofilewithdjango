document.addEventListener("DOMContentLoaded", () => {
    initFastLoading();
    initTyping();
    initScrollReveal();
    initSakura();
    initSkillBar();
});

function initFastLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingFill = document.querySelector('.loading-fill');
    let width = 0;
    const interval = setInterval(() => {
        width += Math.random()*30;
        if(width >= 100) width = 100;
        loadingFill.style.width = width + '%';
        if(width >= 100){
            clearInterval(interval);
            loadingScreen.style.opacity = 0;
            setTimeout(()=>{ loadingScreen.style.display='none'; }, 300);
        }
    }, 130);
}

function initTyping() {
    const el = document.getElementById('typing-name');
    const texts = ["Hi!!", "I'm Nabila F Andina Lubis", "Let’s get started"];
    let count = 0, index = 0, currentText = '', letter = '';

    (function type(){
        if(count === texts.length) count = 0;
        currentText = texts[count];
        letter = currentText.slice(0, ++index);
        el.textContent = letter;
        if(letter.length === currentText.length){
            setTimeout(() => { index = 0; count++; type(); }, 1500);
        } else {
            setTimeout(type, 210);
        }
    })();
}

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-center');
    window.addEventListener('scroll', reveal);
    function reveal() {
        const windowHeight = window.innerHeight;
        reveals.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if(top < windowHeight - 100){
                setTimeout(() => el.classList.add('active'), 100);
            }
        });
    }
    reveal();
}

function initSakura() {
    const canvas = document.getElementById('sakura');
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    window.addEventListener('resize', ()=>{
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    });

    const petals = [];
    const petalCount = 15; 

    for(let i=0;i<petalCount;i++){
        petals.push({
            x: Math.random()*W,
            y: Math.random()*H,
            r: Math.random()*5+2,
            tilt: Math.random()*0.3,
            color: `rgba(255,192,203,${Math.random()*0.7+0.3})`
        });
    }

    function drawPetals(){
        ctx.clearRect(0,0,W,H);
        petals.forEach(p=>{
            ctx.save();
            ctx.translate(p.x,p.y);
            ctx.rotate(p.tilt);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.ellipse(0,0,p.r*1.2,p.r,0,0,2*Math.PI);
            ctx.fill();
            ctx.restore();

            
            p.y += Math.cos(p.tilt)+0.5; 
            p.x += Math.sin(p.tilt*2)*0.5;
            p.tilt += 0.01;

            if(p.y>H){ p.y=-10; p.x=Math.random()*W; }
            if(p.x>W){ p.x=0; }
        });
        requestAnimationFrame(drawPetals);
    }

    drawPetals();
}

// =========================
// SKILL BAR ANIMATION
// =========================
function initSkillBar() {
    const skills = document.querySelectorAll('.skill-fill');
    skills.forEach(skill => {
        const width = skill.getAttribute('data-width');
        setTimeout(() => { skill.style.width = width; }, 500);
    });
}
