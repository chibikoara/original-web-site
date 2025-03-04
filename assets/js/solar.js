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

//section3の星選択する部分の動き
$(document).ready(function () {
  const items = [
    { href: "#exp_sun", src: "./assets/img/sun.jpg", text: "太陽" },
    { href: "#exp_mercury", src: "./assets/img/mercury.jpg", text: "水星" },
    { href: "#exp_venus", src: "./assets/img/venus.jpg", text: "金星" },
    { href: "#exp_earth", src: "./assets/img/earth.jpg", text: "地球" },
    { href: "#exp_mars", src: "./assets/img/mars.jpg", text: "火星" },
    { href: "#exp_jupiter", src: "./assets/img/jupiter.jpg", text: "木星" },
    { href: "#exp_saturn", src: "./assets/img/saturn.jpg", text: "土星" },
    { href: "#exp_uranus", src: "./assets/img/uranus.jpg", text: "天王星" },
    { href: "#exp_neptune", src: "./assets/img/neptune.jpg", text: "海王星" },
  ];

  let currentIndex = 0;
  let autoSwitchInterval;

  function updateDisplay(index) {
    const item = items[index];

    // 現在のリンクをフェードアウト
    $("#current-link").removeClass("active");

    setTimeout(() => {
      // 新しいリンクの内容を設定
      $("#current-link").attr("href", item.href);
      $("#current-image").attr("src", item.src).attr("alt", item.text);
      $("#current-link p").text(item.text);

      // 新しいリンクをフェードインしながらズームイン
      $("#current-link").addClass("active zoom-in");
      setTimeout(() => $("#current-link").removeClass("zoom-in"), 500); // アニメーションをリセット
    }, 500);

    // インジケーターの更新
    $("#indicators span").removeClass("active");
    $(`#indicators span[data-index="${index}"]`).addClass("active");
  }

  function createIndicators() {
    items.forEach((_, index) => {
      const indicator = $("<span></span>")
        .attr("data-index", index)
        .click(function () {
          currentIndex = index;
          updateDisplay(currentIndex);
          resetAutoSwitch();
        });
      $("#indicators").append(indicator);
    });
  }

  // 自動切り替えの設定
  function startAutoSwitch() {
    autoSwitchInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
      updateDisplay(currentIndex);
    }, 5000); // 5秒ごとに切り替え
  }

  // 自動切り替えをリセット
  function resetAutoSwitch() {
    clearInterval(autoSwitchInterval);
    startAutoSwitch();
  }

  // 初期表示
  createIndicators();
  updateDisplay(currentIndex);
  startAutoSwitch();

  // 前ボタン
  $("#prev").click(function () {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateDisplay(currentIndex);
    resetAutoSwitch();
  });

  // 次ボタン
  $("#next").click(function () {
    currentIndex = (currentIndex + 1) % items.length;
    updateDisplay(currentIndex);
    resetAutoSwitch();
  });

  $("#current-link").click(function (e) {
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

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.8, // 要素の10%が見えたら発火
    }
  );

  // フェードインさせたい要素を監視
  document.querySelectorAll(".explain").forEach((element) => {
    observer.observe(element);
  });

  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const closeModalButton = document.getElementById("modal-close");
  const detailButtons = document.querySelectorAll(".detail-button");

  detailButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const detail = e.target.closest(".explain");
      const title = detail.querySelector("h3").textContent;
      const description = detail.getAttribute("data-description");

      // モーダルに内容を設定
      modalTitle.textContent = title;
      modalDescription.innerHTML = description;

      // モーダルを表示
      modal.classList.add("visible");
    });
  });


  // モーダルを閉じる処理
  closeModalButton.addEventListener("click", () => {
    modal.classList.remove("visible");
  });

  // モーダル外をクリックして閉じる処理
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("visible");
    }
  });
});

document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".custom-cursor");
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});
