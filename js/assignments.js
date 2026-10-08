/*
  Danh sách bài tập hiển thị trên trang chủ.
  Thêm bài mới: chèn một object vào đầu mảng (mới nhất lên trên).
  href là đường dẫn tương đối tính từ gốc site; khoảng trắng phải viết %20.
*/
window.ASSIGNMENTS = [
  {
    code: "03",
    title: "Tìm và sửa lỗi CSS",
    date: "2026-10-04",
    summary: "Chẩn đoán và sửa lỗi box model, position trên trang khuyến mãi thiệp Tết: menu sticky, hero, thẻ sản phẩm, nút lên đầu trang.",
    tags: ["Box model", "Position", "z-index"],
    links: [
      { label: "Bài 1 — Sửa lỗi bố cục vỡ", href: "Assignment3/Bai%20tap%201%20Tim%20va%20sua%20loi%20CSS/trang.html" },
      { label: "Bài 2 — Sửa lỗi tinh vi (dùng AI)", href: "Assignment3/Bai%20tap%202%20Tim%20va%20sua%20loi%20CSS/trang.html" },
      { label: "Bài 3 — Responsive 3/2/1 cột", href: "Assignment3/Bai%20tap%203%20x%C3%A2y%20d%E1%BB%B1ng%20css%20responsive/responsive-Bai%20tap%203.html" }
    ]
  },
  {
    code: "02",
    title: "HTML & thẻ semantic",
    date: "2026-09-27",
    summary: "Mở rộng template Blakletterpress: form đăng ký, trang đa phương tiện và refactor trang chủ sang HTML5 semantic.",
    tags: ["Form", "Media", "Semantic", "SEO"],
    links: [
      { label: "Trang chủ gốc", href: "baitapHTML/index.html" },
      { label: "Đăng ký nhận thông tin", href: "baitapHTML/register.html" },
      { label: "Đa phương tiện", href: "baitapHTML/media.html" },
      { label: "Trang chủ semantic", href: "baitapHTML/index_new.html" }
    ]
  },
  {
    code: "01",
    title: "Tên miền, hosting & repo",
    date: "2026-09-22",
    summary: "Đăng ký tên miền, triển khai lên Vercel với CI/CD từ GitHub, trỏ DNS và cấp SSL.",
    tags: ["Domain", "Vercel", "GitHub"],
    links: [
      { label: "Repo GitHub", href: "https://github.com/SonNguyen-25/IT4409-20235416" }
    ]
  }
];

(function () {
  "use strict";

  var list = document.getElementById("assignment-list");
  if (!list) return;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function formatDate(iso) {
    var p = iso.split("-");
    return p[2] + "/" + p[1] + "/" + p[0];
  }

  window.ASSIGNMENTS.forEach(function (a) {
    var item = el("article", "assignment reveal");

    item.appendChild(el("div", "assignment-code", a.code));

    var body = el("div", "assignment-body");

    var head = el("div", "assignment-head");
    head.appendChild(el("h3", null, a.title));
    var time = el("time", "assignment-date", formatDate(a.date));
    time.setAttribute("datetime", a.date);
    head.appendChild(time);
    body.appendChild(head);

    body.appendChild(el("p", "assignment-summary", a.summary));

    if (a.tags && a.tags.length) {
      var tags = el("ul", "assignment-tags");
      a.tags.forEach(function (t) { tags.appendChild(el("li", null, t)); });
      body.appendChild(tags);
    }

    var links = el("ul", "assignment-links");
    a.links.forEach(function (l) {
      var li = el("li");
      var link = el("a", "assignment-link");
      link.href = l.href;
      if (/^https?:/.test(l.href)) {
        link.target = "_blank";
        link.rel = "noopener";
      }
      link.appendChild(el("span", null, l.label));
      link.appendChild(el("span", "assignment-arrow", "↗"));
      li.appendChild(link);
      links.appendChild(li);
    });
    body.appendChild(links);

    item.appendChild(body);
    list.appendChild(item);
  });
})();
