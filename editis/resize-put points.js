var pic = new Image
pic.src = 'img.jpeg'
var pnt = new Image
pnt.src = 'pnt.png'
pntSize = 3
var c1 = document.getElementById("canvas1")
var c2 = document.getElementById("canvas2")
var c3 = document.getElementById("wrkspc")
var ctx = c1.getContext("2d")
var btx = c2.getContext("2d")
var wrkspc = c3.getContext("2d")
var winWidth = window.innerWidth
var winHeight = window.innerHeight
c1.width = winWidth
c1.height = winHeight
c2.width = winWidth
c2.height = winHeight
//////////////////////////////////////////////////////////////////////
img = new Object
img = { x: 0, y: 0, w: 500, h: 500 }
img.x = parseInt(window.innerWidth / 2 - img.w / 2)
img.y = parseInt(window.innerHeight / 2 - img.h / 2)

ctx.drawImage(pic, img.x, img.y, img.w, img.h)
depthimg = ctx.createImageData(pic.width, pic.height)
pnts = []//[{x,y}]
//////////////////////////////////////////////////////////////////////
var pixarr = []
var ttlpix = img.h * img.w;
for (i = 0; i <= ttlpix; i++)
    pixarr[i] = 0
//////////////////////////////////////////////////////////////////////
function erctx(x, y, w, h) {
    var ig = ctx.createImageData(w, h);
    // for (var i = ig.data.length; i > 0; i--)
    //     ig.data[i] = 0
    ctx.putImageData(ig, x, y)
}
//////////////////////////////////////////////////////////////////////
function erbtx(x, y, w, h) {
    var ig = btx.createImageData(w, h);
    for (var i = ig.data.length; i > 0; i--)
        ig.data[i] = 0
    btx.putImageData(ig, x, y)
}
//////////////////////////////////////////////////////////////////////
clkedpix()
srlzoom()
//////////////////////////////////////////////////////////////////////
function zoomto(nw, nh) {
    image = ctx.getImageData(img.x, img.y, img.w, img.h)
    nimage = ctx.createImageData(nw, nh)

    ow = img.w
    inc = 0
    for (e = 0; e < nh; e++) {
        q = unitary(e, nh - 1, ow - 1)
        for (i = 0; i < nw; i++) {
            y = parseInt(cta(unitary(i, nw - 1, ow - 1), q, ow))
            y = y * 4
            p = [image.data[y], image.data[y + 1], image.data[y + 2], image.data[y + 3]]
            for (f = 0; f < 4; f++) {
                nimage.data[inc] = p[f]
                inc++
            }
        }
    }
    ctx.putImageData(nimage, 0, 0);
}
//////////////////////////////////////////////////////////////////////
function srlzoom() {
    window.addEventListener("mousewheel", zoom, false);
    function zoom(i) {
        wid = img.w + i.wheelDeltaY
        hei = img.h + i.wheelDeltaY
        if ((wid > 100 && hei > 100) && (wid < pic.width + 500 && hei < pic.height + 500)) {
            erctx(img.x, img.y, img.w, img.h)
            // erbtx(img.x, img.y, img.w, img.h)
            btx.clearRect(img.x, img.y, img.w, img.h);
            img.w = wid
            img.h = hei
            img.x = parseInt(window.innerWidth / 2 - wid / 2)
            img.y = parseInt(window.innerHeight / 2 - hei / 2)
            ctx.drawImage(pic, img.x, img.y, img.w, img.h)
            redobtx()
        }
    }
}
//////////////////////////////////////////////////////////////////////
function clkedpix() {
    window.addEventListener("mousedown", function (i) {
        var x = i.clientX
        var y = i.clientY

        if ((x >= img.x && x < img.w + img.x) && (y >= img.y && y < img.h + img.y)) {
            x = x - img.x
            y = y - img.y
            // console.log(x, y)
            return (mep(x, y))
        }
    }, false)
}
//////////////////////////////////////////////////////////////////////
//tools
function cta(x, y, w) {//cartisian to array[i]
    x = parseInt(x)
    y = parseInt(y)
    return w * y + x
}

function atc(w, value) {//array[i] to cartisian 
    var y = value / w - 1
    if (y != parseInt(y))
        y = parseInt(y) + 1
    var x = value - (w * y - 1) - 1
    return { x: x, y: y };
}

function unitary(pt, frm, to) {//proportionally convert//
    return (to * pt) / frm
}
//////////////////////////////////////////////////////////////////////
function mep(x, y) {
    console.log(x, y);
    btx.drawImage(pnt, img.x + x, img.y + y, pntSize, pntSize)
        btx.lineTo(img.x + x, img.y + y)
        btx.stroke()
    x = parseInt(unitary(x, img.w - 1, pic.width - 1))
    y = parseInt(unitary(y, img.h - 1, pic.height - 1))
    // console.log(cta(x,y,pic.width))
    pnts.push({ x: x, y: y })
    console.log(pnts);
    // redobtx()
}
//////////////////////////////////////////////////////////////////////
function redobtx() {
    for (i = 0; i < pnts.length; i++) {
        x = unitary(pnts[i].x, pic.width - 1, img.w - 1)
        y = unitary(pnts[i].y, pic.height - 1, img.h - 1)
        btx.drawImage(pnt, x + img.x, y + img.y, pntSize, pntSize)
        btx.lineTo(img.x + x, img.y + y)
        btx.stroke()
    }
}
//////////////////////////////////////////////////////////////////////
// line()
function line(pnt1, pnt2, pnt3) {
    pnt1 = { x: 0, y: 0 }
    x1 = 0
    x2 = 500
    y1 = 0
    y2 = 500
    m = (y2 - y1) / (x2 - x1)
    b = y1 - (m * x1)

    for (i = x1; i < x2; i++) {
        ctx.moveTo(pnt1.x, pnt1.y);
        y = m * i + b
        x = i

        ctx.lineTo(x, y);
        ctx.stroke();
    }

}
//////////////////////////////////////////////////////////////////////
function mask() {

}
