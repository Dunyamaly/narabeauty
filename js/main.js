;(function () {
  var r = document.documentElement,
    b = document.getElementById('tg')
  function isDark() {
    var t = r.getAttribute('data-theme')
    return t ? t === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches
  }
  function sync() {
    b.textContent = isDark() ? '☀' : '☾'
  }
  try {
    var s = localStorage.getItem('theme')
    if (s) r.setAttribute('data-theme', s)
  } catch (e) {}
  sync()
  b.onclick = function () {
    var n = isDark() ? 'light' : 'dark'
    r.setAttribute('data-theme', n)
    try {
      localStorage.setItem('theme', n)
    } catch (e) {}
    sync()
  }
  var t = document.getElementById('tar')
  t.min = new Date().toISOString().slice(0, 10)
  document.getElementById('fm').onsubmit = function (e) {
    e.preventDefault()
    var f = e.target,
      v = function (n) {
        return f.elements[n].value
      }
    var m =
      'Salam! Rezervasiya istəyirəm.\nAd: ' +
      v('ad') +
      '\nTelefon: ' +
      v('tel') +
      '\nXidmət: ' +
      v('xid') +
      '\nTarix: ' +
      v('tar') +
      ', ' +
      v('saat') +
      (v('qeyd') ? '\nQeyd: ' + v('qeyd') : '')
    document.getElementById('ok').textContent =
      'Sorğunuz hazırdır, WhatsApp açılır. Göndər düyməsini basmağı unutmayın.'
    window.open('https://wa.me/994500000000?text=' + encodeURIComponent(m), '_blank')
  }
  var nv = document.querySelector('nav')
  function sc() {
    nv.classList.toggle('sc', window.scrollY > 40)
  }
  addEventListener('scroll', sc, { passive: true })
  sc()
  var hero = document.querySelector('.hero'),
    gl = document.querySelector('.glow')
  hero.addEventListener('mousemove', function (e) {
    var q = hero.getBoundingClientRect()
    gl.style.left = e.clientX - q.left + 'px'
    gl.style.top = e.clientY - q.top + 'px'
  })
  function cnt(b) {
    var n = +b.dataset.n,
      s = b.dataset.s || '',
      t0 = performance.now()
    ;(function f(t) {
      var p = Math.min((t - t0) / 1600, 1)
      b.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))).toLocaleString('en') + s
      if (p < 1) requestAnimationFrame(f)
    })(t0)
  }
  var els = document.querySelectorAll(
    '.head,.stats div,.row,.st div,.why li,.rv figure,details,form.fm,.cta,.perks li'
  )
  if (!('IntersectionObserver' in window)) {
    r.classList.remove('js')
  } else {
    els.forEach(function (el) {
      el.classList.add('rev')
      el.style.transitionDelay =
        Math.min([].indexOf.call(el.parentNode.children, el), 5) * 90 + 'ms'
    })
    var io = new IntersectionObserver(
      function (a) {
        a.forEach(function (x) {
          if (!x.isIntersecting) return
          var el = x.target
          el.classList.add('in')
          io.unobserve(el)
          var b = el.querySelector('b[data-n]')
          if (b) cnt(b)
          setTimeout(function () {
            el.classList.remove('rev')
            el.style.transitionDelay = ''
          }, 1600)
        })
      },
      { threshold: 0.15 }
    )
    els.forEach(function (el) {
      io.observe(el)
    })
  }
})()
