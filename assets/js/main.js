(function () {
  "use strict";

  var data = window.SITE_DATA || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function get(path) {
    return path.split(".").reduce(function (obj, key) {
      return obj == null ? undefined : obj[key];
    }, data);
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  var PHOTO_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">' +
    '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/>' +
    '<path d="M21 16l-5-5-8 8"/></svg>';

  function placeholder(label) {
    var box = el("div", "placeholder");
    box.innerHTML = PHOTO_ICON;
    box.appendChild(el("span", null, label || "Foto"));
    return box;
  }

  /* ---------- Isi teks sederhana ---------- */
  $$("[data-bind]").forEach(function (node) {
    var value = get(node.getAttribute("data-bind"));
    if (typeof value === "string") node.textContent = value;
  });
  if (data.hero && data.hero.judul) document.title = "Untuk " + data.hero.judul;

  /* ---------- Penghitung hari bersama ---------- */
  var since = $("#heroSince");
  var jadian = data.hero && data.hero.jadian;
  var parts = jadian ? jadian.split("-").map(Number) : [];
  if (parts.length === 3) {
    var start = new Date(parts[0], parts[1] - 1, parts[2]);
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var days = Math.round((today - start) / 864e5);
    var tgl = start.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    since.textContent = "";
    since.appendChild(el("span", null, "bersama sejak " + tgl));
    if (days >= 0) {
      since.appendChild(el("span", "hero__dot", "\u2764"));
      since.appendChild(el("span", null, days.toLocaleString("id-ID") + " hari"));
    }
  } else {
    since.remove();
  }

  /* ---------- Hero ---------- */
  var heroTitle = $("#heroTitle");
  var titleText = (data.hero && data.hero.judul) || heroTitle.textContent;
  heroTitle.textContent = "";
  heroTitle.setAttribute("aria-label", titleText);
  Array.from(titleText).forEach(function (ch, i) {
    var span = el("span", "char", ch === " " ? " " : ch);
    span.setAttribute("aria-hidden", "true");
    span.style.transitionDelay = 150 + i * 70 + "ms";
    heroTitle.appendChild(span);
  });

  var heroBg = $("#heroBg");
  if (data.hero && data.hero.foto) {
    heroBg.style.backgroundImage = 'url("' + data.hero.foto + '")';
    heroBg.classList.add("has-photo");
  }

  /* ---------- Kutipan pembuka (kata menyala saat digulir) ---------- */
  var quote = $("#introQuote");
  var quoteWords = [];
  ((data.pembuka && data.pembuka.kutipan) || "").split(/\s+/).forEach(function (w, i, arr) {
    var span = el("span", "word", w);
    quote.appendChild(span);
    if (i < arr.length - 1) quote.appendChild(document.createTextNode(" "));
    quoteWords.push(span);
  });

  /* ---------- Puisi ---------- */
  var poemList = $("#poemList");
  (data.puisi || []).forEach(function (p) {
    var card = el("article", "poem");
    var wrap = card;
    if (p.foto) {
      wrap = el("div", "poem-feature");
      var pic = el("figure", "poem-feature__photo");
      var pimg = el("img");
      pimg.src = p.foto;
      pimg.alt = p.judul || "";
      pimg.loading = "lazy";
      pic.appendChild(pimg);
      wrap.appendChild(pic);
      wrap.appendChild(card);
    }
    if (p.tanggal) card.appendChild(el("span", "poem__date", p.tanggal));
    card.appendChild(el("h3", "poem__title", p.judul || ""));
    var body = el("div", "poem__body");
    var lineIndex = 0;
    (p.baris || []).forEach(function (line) {
      if (!line.trim()) {
        body.appendChild(el("span", "poem__gap"));
        return;
      }
      var span = el("span", "poem__line", line);
      span.style.transitionDelay = 200 + lineIndex * 120 + "ms";
      lineIndex++;
      body.appendChild(span);
    });
    card.appendChild(body);
    poemList.appendChild(wrap);
  });

  /* ---------- Galeri ---------- */
  var grid = $("#galleryGrid");
  var photos = data.galeri || [];
  photos.forEach(function (ph, i) {
    var fig = el("figure", "photo");
    fig.style.transitionDelay = (i % 3) * 90 + "ms";
    fig.tabIndex = 0;
    fig.setAttribute("role", "button");
    fig.setAttribute("aria-label", "Buka foto: " + (ph.keterangan || "foto " + (i + 1)));

    if (ph.src) {
      var img = el("img");
      img.src = ph.thumb || ph.src;
      img.alt = ph.keterangan || "";
      img.loading = "lazy";
      img.decoding = "async";
      if (ph.dimensi) {
        img.width = ph.dimensi[0];
        img.height = ph.dimensi[1];
      }
      fig.appendChild(img);
    } else {
      fig.appendChild(placeholder("Foto " + (i + 1)));
    }
    if (ph.keterangan) fig.appendChild(el("figcaption", null, ph.keterangan));

    fig.addEventListener("click", function () { openLightbox(i); });
    fig.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(i); }
    });
    grid.appendChild(fig);
  });

  /* ---------- Momen ---------- */
  var tlList = $("#timelineList");
  (data.momen || []).forEach(function (m) {
    var li = el("li", "moment");
    li.appendChild(el("span", "moment__date", m.tanggal || ""));
    li.appendChild(el("h3", "moment__title", m.judul || ""));
    li.appendChild(el("p", "moment__text", m.cerita || ""));
    tlList.appendChild(li);
  });

  /* ---------- Sembunyikan bagian yang kosong ---------- */
  function hideSection(id, isEmpty) {
    if (!isEmpty) return;
    var sec = document.getElementById(id);
    if (sec) sec.remove();
    var link = $('.nav__links a[href="#' + id + '"]');
    if (link) link.parentNode.remove();
  }
  hideSection("puisi", !(data.puisi || []).length);
  hideSection("galeri", !photos.length);
  hideSection("momen", !(data.momen || []).length);
  $$("[data-bind]").forEach(function (node) {
    if (!node.textContent.trim() && !node.id) node.remove();
  });

  /* ---------- Animasi muncul saat digulir ---------- */
  var revealTargets = $$(".reveal, .poem, .poem-feature__photo, .photo, .moment");
  $$(".reveal[data-delay]").forEach(function (n) {
    n.style.transitionDelay = n.getAttribute("data-delay") + "ms";
  });

  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealTargets.forEach(function (n) {
      if (!n.closest(".hero")) io.observe(n);
    });
  } else {
    revealTargets.forEach(function (n) { n.classList.add("is-in"); });
  }

  /* ---------- Efek berbasis scroll ---------- */
  var nav = $("#nav");
  var progress = $("#progress");
  var tlWrap = $("#timelineWrap");
  var tlFill = $("#timelineFill");
  var navLinks = $$(".nav__links a");
  var sections = navLinks.map(function (a) { return $(a.getAttribute("href")); });
  var lastY = window.scrollY;
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var vh = window.innerHeight;
    var docH = document.documentElement.scrollHeight - vh;

    progress.style.transform = "scaleX(" + (docH > 0 ? y / docH : 0) + ")";

    nav.classList.toggle("is-scrolled", y > 40);
    nav.classList.toggle("is-hidden", y > lastY && y > vh * 0.6 && !nav.classList.contains("is-open"));
    lastY = y;

    if (!reduceMotion) {
      heroBg.style.transform = "translateY(" + y * 0.3 + "px)";
    }

    // Kata kutipan menyala bertahap
    var qr = quote.getBoundingClientRect();
    var qProgress = (vh * 0.85 - qr.top) / (qr.height + vh * 0.35);
    var lit = Math.round(Math.max(0, Math.min(1, qProgress)) * quoteWords.length);
    quoteWords.forEach(function (w, i) { w.classList.toggle("is-lit", reduceMotion || i < lit); });

    // Garis linimasa terisi
    if (tlWrap && document.body.contains(tlWrap)) {
      var tr = tlWrap.getBoundingClientRect();
      var tProgress = (vh * 0.6 - tr.top) / tr.height;
      tlFill.style.transform = "scaleY(" + Math.max(0, Math.min(1, tProgress)) + ")";
    }

    // Tautan aktif
    var current = -1;
    sections.forEach(function (s, i) {
      if (s && s.getBoundingClientRect().top < vh * 0.4) current = i;
    });
    navLinks.forEach(function (a, i) { a.classList.toggle("is-active", i === current); });

    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  window.addEventListener("resize", onScroll);

  /* ---------- Menu mobile ---------- */
  var toggle = $("#navToggle");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });
  navLinks.forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  /* ---------- Lightbox ---------- */
  var lb = $("#lightbox");
  var lbMedia = $("#lbMedia");
  var lbCaption = $("#lbCaption");
  var lbIndex = 0;
  var lastFocus = null;

  function renderLightbox() {
    var ph = photos[lbIndex];
    lbMedia.innerHTML = "";
    if (ph.src) {
      var img = el("img");
      img.src = ph.src;
      img.alt = ph.keterangan || "";
      lbMedia.appendChild(img);
    } else {
      lbMedia.appendChild(placeholder("Foto " + (lbIndex + 1)));
    }
    lbCaption.textContent = ph.keterangan || "";
  }
  function openLightbox(i) {
    lbIndex = i;
    lastFocus = document.activeElement;
    renderLightbox();
    lb.classList.add("is-open");
    document.body.style.overflow = "hidden";
    $("#lbClose").focus();
  }
  function closeLightbox() {
    lb.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  function step(dir) {
    lbIndex = (lbIndex + dir + photos.length) % photos.length;
    renderLightbox();
  }
  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lbPrev").addEventListener("click", function () { step(-1); });
  $("#lbNext").addEventListener("click", function () { step(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  var touchX = null;
  lb.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (touchX == null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    touchX = null;
  });

  /* ---------- Tombol hati ---------- */
  $("#heartBtn").addEventListener("click", function (e) {
    var r = e.currentTarget.getBoundingClientRect();
    var cx = r.left + r.width / 2;
    var cy = r.top + r.height / 2;
    for (var i = 0; i < 16; i++) {
      var h = el("span", "burst", "❤");
      var angle = (Math.PI * 2 * i) / 16;
      var dist = 70 + Math.random() * 90;
      h.style.left = cx + "px";
      h.style.top = cy + "px";
      h.style.fontSize = 12 + Math.random() * 18 + "px";
      h.style.setProperty("--x", Math.cos(angle) * dist + "px");
      h.style.setProperty("--y", Math.sin(angle) * dist - 40 + "px");
      h.style.setProperty("--r", (Math.random() * 80 - 40) + "deg");
      document.body.appendChild(h);
      h.addEventListener("animationend", function () { this.remove(); });
    }
  });

  /* ---------- Kelopak berjatuhan (canvas) ---------- */
  var canvas = $("#petals");
  var ctx = canvas.getContext("2d");
  var petals = [];
  var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  var COLORS = ["#e8b4bf", "#f1c9d1", "#d98a9c", "#f5d7c6"];

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function makePetal(initial) {
    return {
      x: Math.random() * W,
      y: initial ? Math.random() * H : -20,
      size: 6 + Math.random() * 8,
      speed: 0.4 + Math.random() * 0.8,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.01 + Math.random() * 0.02,
      rot: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 0.35 + Math.random() * 0.4
    };
  }
  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(0, -p.size);
    ctx.bezierCurveTo(p.size, -p.size * 0.6, p.size * 0.6, p.size * 0.8, 0, p.size);
    ctx.bezierCurveTo(-p.size * 0.6, p.size * 0.8, -p.size, -p.size * 0.6, 0, -p.size);
    ctx.fill();
    ctx.restore();
  }
  function tick() {
    ctx.clearRect(0, 0, W, H);
    petals.forEach(function (p, i) {
      p.sway += p.swaySpeed;
      p.x += Math.sin(p.sway) * 0.6;
      p.y += p.speed;
      p.rot += p.rotSpeed;
      if (p.y > H + 20) petals[i] = makePetal(false);
      drawPetal(p);
    });
    requestAnimationFrame(tick);
  }
  if (!reduceMotion) {
    resize();
    var count = W < 720 ? 14 : 26;
    for (var i = 0; i < count; i++) petals.push(makePetal(true));
    window.addEventListener("resize", resize);
    requestAnimationFrame(tick);
  }

  /* ---------- Layar pembuka ---------- */
  document.body.classList.add("is-loading");
  function finishLoading() {
    $("#loader").classList.add("is-done");
    document.body.classList.remove("is-loading");
    setTimeout(function () {
      heroTitle.classList.add("is-in");
      $$(".hero .reveal").forEach(function (n) { n.classList.add("is-in"); });
    }, reduceMotion ? 0 : 300);
    onScroll();
  }
  if (document.readyState === "complete") {
    setTimeout(finishLoading, 900);
  } else {
    window.addEventListener("load", function () { setTimeout(finishLoading, 900); });
  }
})();
