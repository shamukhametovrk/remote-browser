// Вставляется nginx-ом в страницу neko. Сообщает серверу размер окна, чтобы виртуальный экран
// совпадал с ним (текст без масштабирования). Повторяет при повороте и изменении размера окна.
(function () {
  var room = location.pathname.split("/").filter(Boolean)[0];
  if (!room) return;
  var timer = null, lastKey = "";
  function send() {
    var w = Math.round(window.innerWidth), h = Math.round(window.innerHeight);
    var key = w + "x" + h;
    if (key === lastKey) return;
    lastKey = key;
    fetch("/_fit/" + room + "?w=" + w + "&h=" + h, { method: "POST" })
      .then(function (r) { return r.json(); })
      .then(function (j) { console.log("[autofit]", key, j); })
      .catch(function (e) { console.warn("[autofit]", e); });
  }
  function schedule() { clearTimeout(timer); timer = setTimeout(send, 1000); }
  window.addEventListener("resize", schedule);
  window.addEventListener("orientationchange", schedule);
  if (document.readyState === "complete") schedule(); else window.addEventListener("load", schedule);
})();
