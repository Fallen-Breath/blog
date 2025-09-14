// from https://stefenson.github.io/


isStop = 0
tracking = 0
storetracking = 1

function o(w, v, i) {
  return w.getAttribute(v) || i
}

function j(i) {
  return document.getElementsByTagName(i)
}

function l() {
  var i = j("script"), w = i.length, v = i[w - 1];
  return {l: w, z: o(v, "zIndex", -1), o: o(v, "opacity", 0.5), c: o(v, "color", "150,0,255"), n: o(v, "count", 64)}
}

var k = function () {
  r = u.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  n = u.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}
let maxFps = 60
let fpsInterval = 1000 / maxFps
let startTime = Date.now()

function b() {
  if (isStop === 1) {
    return;
  }
  currentTime = Date.now()
  if (currentTime - startTime >= fpsInterval) {
    startTime = currentTime

    e.clearRect(0, 0, r, n);
    var w = [f].concat(t)
    var x, v, A, B, z, y

    t.forEach(function (i) {
      for (v = 0; v < w.length; v++) {
        x = w[v]
        savex = null
        if (i !== x && null !== x.x && null !== x.y) {
          B = i.x - x.x
          z = i.y - x.y
          prex = i.x + i.xa - x.x
          prey = i.y + i.ya - x.y
          y = B * B + z * z
          if (x === f) {
            if (y < x.max) {
              i.xd = (Math.abs(prex) > Math.abs(B) && Math.abs(prex) * Math.abs(B) > 0 ? -1 : 1) * y / x.max * 2 * i.xa
              i.yd = (Math.abs(prey) > Math.abs(z) && Math.abs(prey) * Math.abs(z) > 0 ? -1 : 1) * y / x.max * 2 * i.ya
            } else {
              i.xd = 0
              i.yd = 0
            }
          }
          if (y < x.max) {
            A = (x.max - y) / x.max
            e.beginPath()
            e.lineWidth = A / 2
            e.strokeStyle = "rgba(" + s.c + "," + (A + 0.2) + ")"
            e.moveTo(i.x, i.y)
            e.lineTo(x.x, x.y)
            e.stroke()
          }
        }
      }
      i.x += i.xa + i.xd
      i.y += i.ya + i.yd
      i.xa *= i.x > r || i.x < 0 ? -1 : 1
      i.ya *= i.y > n || i.y < 0 ? -1 : 1
      e.fillRect(i.x - 0.5, i.y - 0.5, 1, 1)
      w.splice(w.indexOf(i), 1)
    })
  }
  m(b)
}

var u = document.createElement("canvas"), s = l(), c = "c_n" + s.l, e = u.getContext("2d"), r, n,
m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (i) {
  window.setTimeout(i, fpsInterval)
}
a = Math.random
f = {x: null, y: null, max: 20000}
u.id = c
u.style.cssText = "position:fixed;top:0;left:0;z-index:" + s.z + ";opacity:" + s.o + ";pointer-events:none;"
j("body")[0].appendChild(u)
k()

for (var t = [], p = 0; s.n > p; p++) {
  var h = a() * r, g = a() * n, q = 2 * a() - 1, d = 2 * a() - 1
  t.push({x: h, y: g, xa: q, ya: d, xd: 0, yd: 0, max: 6000})
}

function loadnestbg() {
  isStop = 0
  window.onresize = k
  k()
  b()

  tracking = storetracking
  setTrack(tracking)
  window.onmousedown = function (e) {
    if (e.button === 0 && ['body', 'html', 'footer'].includes(e.target.localName)) {
      setTrack(1 - tracking);
    }
  }

  bgnow = document.getElementById("BackgroundSwitch");
  bgnow_title = document.getElementById("BackgroundSwitchTitle");
}

function switchbg() {
  isStop = 1;
  window.onresize = null

  setTrack(tracking)
  storetracking = tracking

  bgnow = document.getElementById("BackgroundSwitch")
  bgnow_title = document.getElementById("BackgroundSwitchTitle")

}

let lastEvent = null
function setTrack(newState) {
  if (newState === 1) {
    if (lastEvent !== null) {
      f.x = lastEvent.clientX
      f.y = lastEvent.clientY
    }
    window.onmousemove = function (i) {
      i = i || window.event
      lastEvent = i
      f.x = i.clientX
      f.y = i.clientY
    }
    window.onmouseout = function () {
      f.x = null
      f.y = null
    };
    tracking = 1
  }
  else {
    f.x = null
    f.y = null

    window.onmousemove = function (e) {
      lastEvent = e
    }
    window.onmouseout = null

    tracking = 0;
  }
}

loadnestbg()
