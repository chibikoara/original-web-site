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
  $("#sns, .constellation , .me").click(function (e) {
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

  $(".test-slick")
    .on("init", function () {
      $('.slick-slide[data-slick-index="0"]').addClass("add-anime");
    })
    .slick({
      fade: true,
      arrows: false,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 3000,
      pauseOnFocus: false,
      pauseOnHover: false,
    })
    .on({
      beforeChange: function (event, slick, currentSlide, nextSlide) {
        $(".slick-slide", this).eq(nextSlide).addClass("add-anime");
        $(".slick-slide", this).eq(currentSlide).addClass("remove-anime");
      },
      afterChange: function () {
        $(".remove-anime", this).removeClass("remove-anime add-anime");
      },
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

  // 要素を取得
  const menuButton = document.getElementById("menu-button");
  const menuContent = document.getElementById("menu-content");
  const section4 = document.getElementById("section4");

  // IntersectionObserverでsection4を監視
  const observer2 = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // section4が画面内に入ったとき、メニューボタンを表示
          menuButton.classList.add("show");
        } else {
          // section4が画面外に出たとき、メニューボタンとメニューコンテンツを非表示
          menuButton.classList.remove("show");
          menuContent.classList.remove("show");
        }
      });
    },
    { threshold: 0.01 } // section4が10%見えたらトリガー
  );

  // section4の監視を開始
  observer2.observe(section4);

  // メニューボタンのクリック動作
  menuButton.addEventListener("click", () => {
    menuContent.classList.toggle("show"); // メニューを開閉
  });
});
