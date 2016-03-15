/* ******************************************************
 *
 * StaggeredGridJS.js
 * スタッガード格子を書くjsスクリプト 
 *
 * [ -- 使い方 -- ]
 *   <div class="StaggeredGridJS" I="4" J="4" pml=0 w=500 h=500></div>
 *   <p>図. スタッガード格子</p>
 *
 * [ -- プロパティ -- ]
 *   I:X方向セル数
 *   J:Y方向セル数
 *   pml:PML層数
 *   w:図の横幅
 *   h:図の縦幅
 *
 * Version : 1.0
 *
 * 作成日：2016/3/15
 * 作成者：FiFi
 * ******************************************************/


/*********************************
 *
 * コンストラクタ
 *
 ********************************/
$(function() {

    $(".StaggeredGridJS").each(function(i, dom_elem){

        var I = $(dom_elem).attr("I")*1
        var J = $(dom_elem).attr("J")*1
        var w = $(dom_elem).attr("w")*1
        var h = $(dom_elem).attr("h")*1
        var pml = $(dom_elem).attr("pml")*1

        var id_attr = "fdtd-"+i;

        // canvas生成
        var obj = $("<canvas/>").attr("id", id_attr)
            .attr("width", w)
            .attr("height", h)

        $(dom_elem).append(obj);
        
        var canvas = $("#"+id_attr).get(0)

        drawStaggeredGrid(canvas,I,J,pml);
    });
})

/***************************************
 *
 * メイン関数
 *
 ****************************************/
function drawStaggeredGrid(canvas, I,J,PML) {

    ctx = canvas.getContext('2d')

    // 定数
    // I = 3
    // J = 3
    // PML = 1

    // マジックナンバー
    margin = 30;

    canvas_width = canvas.width;
    canvas_height = canvas.height;

    main_width = canvas_width - margin * 2;
    main_height = canvas_height - margin * 2;
    dx = main_width / I
    dy = main_height / J

    // /* フォントスタイルを定義 */
    ctx.font = "1px 'ＭＳ Ｐゴシック'";

    // --------
    // 外枠
    ctx.strokeRect(0, 0, canvas_width, canvas_height)

    // --------
    // P
    for (var i = 0; i < I; i++) {
        for (var j = 0; j < J; j++) {
            px = margin + i * dx + dx / 2;
            py = margin + j * dy + dy / 2;
            /* 補助点 */
            ctx.fillStyle = 'rgba(250, 0, 0, 0.5)'; //塗りつぶし色
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2, false);
            ctx.fill();

            // マップを書く
            ctx.fillStyle = 'rgba(255, 255, 255, 1.0)'; //塗りつぶし色
            if (i < PML || i > I - PML - 1 || j < PML || j > J - PML - 1) {
                ctx.fillStyle = 'rgba(190, 80, 70, 0.2)'; //塗りつぶし色
            }
            ctx.strokeRect(px - dx / 2, py - dy / 2, dx, dy)
            ctx.fillRect(margin + i * dx, margin + j * dy, dx, dy)


            /* 青色でstrokText */
            ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; //塗りつぶし色
            ctx.textAlign = "center";
            ctx.fillText('P(' + i + ',' + j + ')', px, py);
        }
    }
    // --------
    // Vx
    for (var i=0; i<I+1;i++){
        for (var j=0; j<J;j++){
            var vx = margin + i*dx
            var vy = margin + j*dy + dy/2

            /* 補助点 */
            ctx.fillStyle = 'rgba(0, 0, 250, 0.5)'; //塗りつぶし色
            // 境界
            if( i==0 || i==I ){
                ctx.fillStyle = 'rgba(10, 10, 10, 0.9)'; //塗りつぶし色
            }

            ctx.beginPath();
            ctx.arc(vx, vy, 3, 0, Math.PI * 2, false);
            ctx.fill();
        }
    }
    // Vy
    for (var i=0; i<I; i++){
        for (var j=0; j<J+1; j++){
            var vx = margin + i*dx + dx/2
            var vy = margin + j*dy

            /* 補助点 */
            ctx.fillStyle = 'rgba(0, 0, 250, 0.5)'; //塗りつぶし色
            // 境界
            if( j==0 || j==J ){
                ctx.fillStyle = 'rgba(10, 10, 10, 0.9)'; //塗りつぶし色
            }

            ctx.beginPath();
            ctx.arc(vx, vy, 3, 0, Math.PI * 2, false);
            ctx.fill();
        }
    }

    // --------
    // Cell index
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; //塗りつぶし色
    for (var i = 0; i < I; i++) {
        var y = margin + main_height + margin / 3;
        ctx.fillText(i, margin + i * dx + dx / 2, y);
    }
    var y = margin + main_height + margin / 1.5
    var x = margin + main_width / 2
    ctx.fillText("Cell Number", x, y)
    for (var j = 0; j < J; j++) {
        var x = margin - margin / 3;
        ctx.fillText(j, x, margin + j * dy + dy / 2);
    }
    // --------
    // Node index
    for (var i = 0; i < I + 1; i++) {
        var y = margin - margin / 5;
        ctx.fillText(i, margin + i * dx, y);
    }
    var x = margin + main_width / 2
    var y = margin / 3
    ctx.fillText("Node Number", x, y)
    for (var j = 0; j < J + 1; j++) {
        var x = margin + main_width + margin / 5;
        ctx.fillText(j, x, margin + j * dy + 2);
    }

}
