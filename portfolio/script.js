// GSAPプラグインの登録
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    // ------------------------------------------------
    // 1. ヒーローセクションの登場アニメーション
    // ------------------------------------------------
    const tl = gsap.timeline();
    
    tl.to(".hero-title", {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: "back.out(1.7)"
    })
    .from(".hero-subtitle", {
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: "power2.out"
    }, "-=0.5");

    // ------------------------------------------------
    // 2. スクロールアニメーション
    // ------------------------------------------------
    
    // About
    gsap.to(".content-card", {
        scrollTrigger: {
            trigger: ".about",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
    });

    // Work
    gsap.to(".work-card", {
        scrollTrigger: {
            trigger: ".work",
            start: "top 75%",
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.2)"
    });

    // Skill
    gsap.to(".skill-item", {
        scrollTrigger: {
            trigger: ".skill",
            start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power1.out"
    });

    // プレビュー用のdivをbodyに追加
const previewBox = document.createElement("div");
previewBox.classList.add("hover-preview");
document.body.appendChild(previewBox);

const links = document.querySelectorAll(".hover-reveal-link");

links.forEach(link => {
    link.addEventListener("mouseenter", (e) => {
        const imgUrl = link.getAttribute("data-image");
        if(imgUrl){
            previewBox.style.backgroundImage = `url(${imgUrl})`;
            previewBox.style.display = "block";
            
            gsap.to(previewBox, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });

    link.addEventListener("mousemove", (e) => {
        // マウスの少し右下に表示
        gsap.to(previewBox, {
            x: e.clientX + 20,
            y: e.clientY + 20,
            duration: 0.5, // 少し遅れてついてくる感じ
            ease: "power3.out"
        });
    });

    link.addEventListener("mouseleave", () => {
        gsap.to(previewBox, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            onComplete: () => {
                previewBox.style.display = "none";
            }
        });
    });
});

    // ------------------------------------------------
    // 3. マウスストーカー & キラキラパーティクル
    // ------------------------------------------------
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    // パーティクルを生成する関数
    const createParticle = (x, y) => {
        const particle = document.createElement("span");
        particle.innerText = "★"; // 星の形
        particle.className = "star-particle";
        document.body.appendChild(particle);

        // ランダムなサイズと色
        const size = Math.random() * 15 + 10 + "px";
        const colors = ["#ffffff", "#fff700", "#ffcffc"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // 初期位置の設定
        particle.style.position = "fixed";
        particle.style.left = x + "px";
        particle.style.top = y + "px";
        particle.style.fontSize = size;
        particle.style.color = color;
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "9998";

        // アニメーション（飛び散って消える）
        const destinationX = (Math.random() - 0.5) * 100; // 左右に散る
        const destinationY = (Math.random() - 0.5) * 100; // 上下に散る
        const rotation = Math.random() * 360;

        gsap.to(particle, {
            x: destinationX,
            y: destinationY,
            rotation: rotation,
            opacity: 0,
            scale: 0,
            duration: 1 + Math.random(),
            ease: "power2.out",
            onComplete: () => {
                particle.remove(); // アニメーション終了後に削除
            }
        });
    };

    // マウス移動イベント
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // マウスストーカーの移動
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });

            // パーティクルの生成（移動するたびに星を出す）
            // 負荷軽減のため、少し頻度を調整
            if (Math.random() > 0.8) {
                createParticle(posX, posY);
            }
        });

        // クリックしたときはたくさん星を出す
        window.addEventListener("click", (e) => {
            for (let i = 0; i < 8; i++) {
                createParticle(e.clientX, e.clientY);
            }
        });
    }
});