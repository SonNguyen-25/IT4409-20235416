(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- theme ---------- */
  var toggle = document.getElementById("theme-toggle");
  toggle.addEventListener("click", function () {
    var next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
  });

  /* ---------- typing ---------- */
  var phrases = [
    "cảm ơn bạn đã ghé thăm.",
    "hệ thống đang hoạt động ổn định.",
    "nội dung sẽ sớm được bổ sung."
  ];
  var target = document.getElementById("typed");
  var phraseIndex = 0;
  var charIndex = 0;
  var deleting = false;

  function type() {
    var current = phrases[phraseIndex];
    charIndex += deleting ? -1 : 1;
    target.textContent = current.slice(0, charIndex);

    var delay = deleting ? 35 : 55;
    if (!deleting && charIndex === current.length) {
      delay = 2200;
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }

  if (reduceMotion) {
    target.textContent = phrases[0];
  } else {
    type();
  }

  /* ---------- scroll reveal ---------- */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        setTimeout(function () { entry.target.classList.add("visible"); }, i * 90);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { observer.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- nav border on scroll ---------- */
  var nav = document.querySelector(".nav");
  window.addEventListener("scroll", function () {
    nav.classList.toggle("scrolled", window.scrollY > 8);
  }, { passive: true });

  /* ---------- footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- uptime ---------- */
  var launched = new Date("2026-09-22T00:00:00+07:00");
  var uptime = document.getElementById("uptime");
  function tickUptime() {
    var diff = Math.max(0, Date.now() - launched.getTime());
    var days = Math.floor(diff / 86400000);
    var hours = Math.floor(diff / 3600000) % 24;
    var mins = Math.floor(diff / 60000) % 60;
    uptime.textContent = "trực tuyến " + days + " ngày " + hours + " giờ " + mins + " phút";
  }
  tickUptime();
  setInterval(tickUptime, 30000);

  /* ---------- starfield ---------- */
  var canvas = document.getElementById("stars");
  var ctx = canvas.getContext("2d");
  var stars = [];
  var pointer = { x: 0, y: 0 };

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var count = Math.min(110, Math.round(window.innerWidth / 12));
    stars = [];
    for (var i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        a: Math.random() * 0.5 + 0.2
      });
    }
  }

  function starColor() {
    return getComputedStyle(document.documentElement).getPropertyValue("--star-color").trim();
  }

  function draw() {
    var rgb = starColor();
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    stars.forEach(function (s) {
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0) s.x = window.innerWidth;
      if (s.x > window.innerWidth) s.x = 0;
      if (s.y < 0) s.y = window.innerHeight;
      if (s.y > window.innerHeight) s.y = 0;

      var dx = s.x - pointer.x;
      var dy = s.y - pointer.y;
      var near = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 180);

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r + near * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + rgb + "," + (s.a + near * 0.5) + ")";
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", function (e) {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  }, { passive: true });

  resize();
  if (!reduceMotion) draw();
})();
