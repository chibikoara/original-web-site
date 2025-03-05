const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  nav.classList.toggle("open");
});

//最初のスプラッシュ画面
window.addEventListener("load", function () {
  // ページ読み込み後、3秒後にスプラッシュ画面をフェードアウトさせる
  setTimeout(function () {
    document.getElementById("splash").classList.add("fade-out");
  }, 2000);

  // 1秒後（計4秒経過）にスプラッシュ画面をDOMから取り除くか非表示にし、メインコンテンツを表示する
  setTimeout(function () {
    document.getElementById("splash").style.display = "none";
    document.getElementById("main-content").classList.add("visible");
  }, 2500);

  setTimeout(function () {
    document.querySelector(".vertical-title").classList.add("visible");
  }, 3000);
});

$(document).ready(function () {
  $("#sns").click(function (e) {
    e.preventDefault(); // デフォルトのリンク動作を無効化
    const target = $(this).attr("href");
    if (target) {
      // スムーズスクロール
      document.querySelector(target).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });

  $("#toTop").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });


});

//背景のふつふつ動く点の生成
// JavaScriptで100個の.circleを生成
const circleContainer = document.querySelector(".circle-container");

for (let i = 1; i <= 100; i++) {
  const circle = document.createElement("div");
  circle.classList.add("circle");

  const size = Math.random() * 8 + 4;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;

  circle.style.left = `${Math.random() * 100}vw`;
  circle.style.top = `${Math.random() * 100}vh`;

  // サイズによるスピード調整
  const speed = size > 8 ? Math.random() * 6 + 4 : Math.random() * 3 + 2;
  circle.style.animationDuration = `${speed}s`;
  circle.style.background = `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(0,0,255,0.5) 100%)`;

  circleContainer.appendChild(circle);
}


document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".custom-cursor");
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});


document.querySelectorAll(".sl_im").forEach((image) => {
  image.addEventListener("mouseenter", () => {
    const targetId = image.getAttribute("data-target");
    const targetElement = document.getElementById(targetId);

    // 強調表示を追加
    if (targetElement) {
      targetElement.classList.add("highlight");
    }
  });

  image.addEventListener("mouseleave", () => {
    const targetId = image.getAttribute("data-target");
    const targetElement = document.getElementById(targetId);

    // 強調表示を削除
    if (targetElement) {
      targetElement.classList.remove("highlight");
    }
  });
});
