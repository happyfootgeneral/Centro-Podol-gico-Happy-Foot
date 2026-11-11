/* Happy Foot mascot runtime v3 (phase 2 milestone 3 preview) — sprite flipbooks + WAAPI, transform/opacity only.
   Built from pipeline/build.py manifests. No filters, pauses offscreen / hidden tab, static for reduced motion. */
(() => {
'use strict';
const DEBUG = false, DEMO = false;
if (window.__hfHappy) return; window.__hfHappy = true;
{ const st = document.createElement('style'); st.textContent = "/* Happy Foot mascot (phase 2 milestone 3 preview). Only transform/opacity animate; no filters. */ .hfh{position:absolute;left:0;top:0;width:0;height:0;z-index:900;pointer-events:none;contain:layout style} .hfh *{position:absolute} .hfh-size{left:0;top:0;width:0;height:0;transform-origin:0 0} .hfh-mover,.hfh-w,.hfh-fx{left:0;top:0;width:0;height:0;will-change:transform} .hfh-w{transform-origin:0 0} .hfh-pose{left:0;top:0;opacity:0;will-change:opacity} .hfh-face{transform-origin:0 0} .hfh-pv{left:0;top:0;width:0;height:0;transform-origin:0 0;will-change:transform} .hfh-pv0{left:0;top:0;width:0;height:0} .hfh-s{background-repeat:no-repeat} .hfh-shadow{left:-120px;top:-16px;width:240px;height:32px;border-radius:50%;background:radial-gradient(closest-side,rgba(30,80,90,.26),rgba(30,80,90,.1) 60%,transparent)} .hfh-bubble{left:-210px;top:-400px;width:420px;height:420px;border-radius:50%;opacity:0;transform:scale(0); background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.95) 0 6%,rgba(255,255,255,0) 9%), radial-gradient(circle,rgba(255,255,255,0) 58%,rgba(190,240,232,.45) 70%,rgba(255,255,255,.9) 74%,rgba(170,220,250,.5) 77%,rgba(255,255,255,0) 80%)} .hfh-drop{left:-7px;top:-197px;width:14px;height:14px;border-radius:50%;background:#c9f1ea;border:2px solid #fff;opacity:0} .hfh-fx{top:-200px} .hfh-flash{left:-280px;top:-280px;width:560px;height:560px;border-radius:50%;opacity:0;transform:scale(0); background:radial-gradient(closest-side,#fff 0,#fff 34%,rgba(220,252,255,.9) 52%,rgba(120,225,245,.5) 74%,rgba(120,225,245,0) 100%)} .hfh-ring{left:-150px;top:-150px;width:300px;height:300px;border-radius:50%;opacity:0;transform:scale(0);border:7px solid rgba(255,255,255,.95); box-shadow:0 0 0 4px rgba(120,220,240,.45),inset 0 0 0 3px rgba(120,220,240,.35)} .hfh-sline{left:-4px;top:-52px;width:8px;height:52px;border-radius:4px;opacity:0;transform-origin:50% 100%;background:linear-gradient(rgba(60,200,225,.95),rgba(170,240,250,.6))} .hfh-spk{left:-20px;top:-20px;width:40px;height:40px;opacity:0;clip-path:polygon(50% 0,61% 39%,100% 50%,61% 61%,50% 100%,39% 61%,0 50%,39% 39%)} .hfh-spk.y{background:#ffc93a}.hfh-spk.c{background:#39cbe6}.hfh-spk.w{background:#9ff0ff} .hfh-q{left:40px;top:-470px;width:70px;height:90px;line-height:90px;text-align:center;font:800 88px/90px 'Fraunces',Georgia,serif;color:#0193b2;opacity:0;transform-origin:50% 100%} .hfh-z{left:70px;top:-330px;font:800 46px/1 'Plus Jakarta Sans',system-ui,sans-serif;color:#378fae;opacity:0} .hfh-z:nth-of-type(2n){font-size:38px} .hfh-spark{left:62px;top:-330px;width:34px;height:34px;opacity:0;color:#f4b942;font-size:34px;line-height:34px;text-align:center} .hfh-x{left:150px;top:-450px;color:#f29d1f} .hfh-ladder{left:-145px;top:0;width:290px;height:0;opacity:0;background-repeat:repeat-y;background-size:290px 52px;background-position:0 100%;transform-origin:50% 100%;will-change:transform,opacity} .hfh-say{left:0;top:0;white-space:nowrap;font:700 12px/1.25 'Plus Jakarta Sans',system-ui,sans-serif;color:#0a5f75;background:#fff;border:1.5px solid #bfe6ee;border-radius:14px;padding:4px 9px; box-shadow:0 3px 10px rgba(1,80,100,.12);opacity:0;transform-origin:0 100%;will-change:transform,opacity} .hfh-say::after{content:'';left:12px;bottom:-6px;width:9px;height:9px;background:#fff;border:1.5px solid #bfe6ee;border-width:0 1.5px 1.5px 0;transform:rotate(45deg)} .hfh-say.r{transform-origin:100% 100%}.hfh-say.r::after{left:auto;right:12px} .hfh-say.c{transform-origin:50% 100%}.hfh-say.c::after{left:calc(50% - 5px)} @media (max-width:759px){.hfh-say{font-size:11.5px;padding:4px 8px}} .hfh-toggle{position:fixed;left:1.5rem;bottom:5.2rem;z-index:998;width:36px;height:36px;border-radius:50%;border:1px solid rgba(1,147,178,.18);background:#fff;color:#0193b2; box-shadow:0 4px 14px rgba(11,37,50,.12);display:flex;align-items:center;justify-content:center;font-size:14px;cursor:pointer;opacity:.75;transition:opacity .2s} .hfh-toggle svg{width:16px;height:16px;display:block;fill:currentColor;flex-shrink:0} .hfh-toggle:hover,.hfh-toggle:focus-visible{opacity:1} .hfh-static .hfh-pose{opacity:0} @media (max-width:759px){.hfh-toggle{left:1rem;bottom:4.6rem;width:32px;height:32px;font-size:13px}} @media (prefers-reduced-motion:reduce){.hfh-bubble,.hfh-drop,.hfh-fx,.hfh-spark,.hfh-q,.hfh-z,.hfh-say,.hfh-ladder,.hfh-pbox{display:none}.hfh-pose[data-k=\"fw\"]{opacity:1}} @media print{.hfh,.hfh-toggle{display:none}} /* v3 */ .hfh-pbox{overflow:hidden;opacity:0;left:0;top:0;width:0;height:0} "; document.head.appendChild(st); }   // styles ship inside the script: one request
const M = {"ES":1,"H_CSS":360,"sections":{"core":{"src":"core.webp","w":1876,"h":362,"lazy":false,"bytes":52346,"n":17},"turn":{"src":"turn.webp","w":1960,"h":1463,"lazy":true,"bytes":275080,"n":31},"walk":{"src":"walk.webp","w":742,"h":298,"lazy":true,"bytes":16264,"n":9},"point":{"src":"point.webp","w":660,"h":375,"lazy":true,"bytes":22816,"n":4},"wink":{"src":"wink.webp","w":1495,"h":352,"lazy":true,"bytes":74282,"n":7},"rest":{"src":"rest.webp","w":1397,"h":348,"lazy":true,"bytes":59940,"n":6},"react":{"src":"react.webp","w":1879,"h":1786,"lazy":true,"bytes":370354,"n":30},"props":{"src":"props.webp","w":1849,"h":734,"lazy":true,"bytes":146936,"n":10},"peek":{"src":"peek.webp","w":704,"h":371,"lazy":true,"bytes":26012,"n":3},"seat":{"src":"seat.webp","w":1985,"h":673,"lazy":true,"bytes":121468,"n":10},"lie":{"src":"lie.webp","w":1642,"h":605,"lazy":true,"bytes":70626,"n":6},"climb":{"src":"climb.webp","w":519,"h":308,"lazy":true,"bytes":15090,"n":5},"walk2":{"src":"walk2.webp","w":1231,"h":425,"lazy":true,"bytes":57130,"n":5},"hop":{"src":"hop.webp","w":1025,"h":357,"lazy":true,"bytes":44840,"n":4},"fun":{"src":"fun.webp","w":1993,"h":707,"lazy":true,"bytes":131854,"n":12},"x1":{"src":"x1.webp","w":1958,"h":1107,"lazy":true,"bytes":249760,"n":22},"x2":{"src":"x2.webp","w":1956,"h":1094,"lazy":true,"bytes":218314,"n":20},"x3":{"src":"x3.webp","w":2043,"h":1093,"lazy":true,"bytes":259446,"n":23},"x4":{"src":"x4.webp","w":1882,"h":1072,"lazy":true,"bytes":245210,"n":23},"x5":{"src":"x5.webp","w":2032,"h":1140,"lazy":true,"bytes":262338,"n":24},"x6":{"src":"x6.webp","w":1902,"h":1098,"lazy":true,"bytes":250848,"n":23},"y1":{"src":"y1.webp","w":1894,"h":1060,"lazy":true,"bytes":229854,"n":20},"y2":{"src":"y2.webp","w":2040,"h":724,"lazy":true,"bytes":199152,"n":18},"y3":{"src":"y3.webp","w":1862,"h":1021,"lazy":true,"bytes":205726,"n":20},"y4":{"src":"y4.webp","w":2039,"h":735,"lazy":true,"bytes":180306,"n":16},"y5":{"src":"y5.webp","w":2032,"h":1088,"lazy":true,"bytes":214924,"n":20},"y6":{"src":"y6.webp","w":1986,"h":1090,"lazy":true,"bytes":225280,"n":20}},"frames":{"fw_body":{"x":-101.25,"y":-360.85,"w":222,"h":362,"sec":"core","sole":0.28,"sx":0,"sy":0},"fw_socket":{"x":-98.69,"y":-286.8,"w":39,"h":204,"sec":"core","sole":-86.58,"sx":226,"sy":0},"fw_armR":{"x":-161.34,"y":-247.5,"w":88,"h":95,"sec":"core","sole":-153.51,"pivot":[-88.72,-174.59],"sx":662,"sy":0},"fw_arm1":{"x":-171.6,"y":-286.8,"w":112,"h":204,"sec":"core","sole":-86.58,"sx":269,"sy":0},"fw_armD":{"x":-166.47,"y":-286.8,"w":107,"h":204,"sec":"core","sole":-86.58,"sx":385,"sy":0},"fw_arm2":{"x":-142.55,"y":-286.8,"w":83,"h":204,"sec":"core","sole":-86.58,"sx":496,"sy":0},"fw_arm3":{"x":-134.86,"y":-286.8,"w":75,"h":204,"sec":"core","sole":-86.58,"sx":583,"sy":0},"fw_leg0":{"x":-32.04,"y":-88.01,"w":138,"h":89,"sec":"core","sole":0.28,"sx":754,"sy":0},"fw_leg1":{"x":-31.76,"y":-88.01,"w":139,"h":87,"sec":"core","sole":-1.99,"sx":896,"sy":0},"fw_leg2":{"x":-32.04,"y":-88.01,"w":139,"h":82,"sec":"core","sole":-7.12,"sx":1039,"sy":0},"fw_mouth":{"x":-43.72,"y":-215.32,"w":74,"h":54,"sec":"core","sole":-162.91,"origin":[-6.98,-205.35],"sx":1798,"sy":0},"fwx_mouth_half":{"x":-49.41,"y":-221.01,"w":85,"h":66,"sec":"core","sole":-158.92,"sx":1273,"sy":0},"fwx_mouth_closed":{"x":-49.41,"y":-221.01,"w":85,"h":66,"sec":"core","sole":-158.92,"sx":1362,"sy":0},"fwx_mouth_o":{"x":-49.41,"y":-221.01,"w":85,"h":66,"sec":"core","sole":-158.92,"sx":1451,"sy":0},"fwx_mouth_big":{"x":-50.55,"y":-222.15,"w":87,"h":68,"sec":"core","sole":-157.78,"sx":1182,"sy":0},"fwx_eyeshalf":{"x":-66.79,"y":-260.6,"w":125,"h":55,"sec":"core","sole":-209.34,"sx":1540,"sy":0},"fwx_eyesclosed":{"x":-66.79,"y":-260.6,"w":125,"h":55,"sec":"core","sole":-209.34,"sx":1669,"sy":0},"r01_u0":{"x":-112.42,"y":-361.02,"w":223,"h":362,"sec":"turn","sole":0.34,"sx":1063,"sy":0},"r02_tA":{"x":-109.98,"y":-361.03,"w":220,"h":362,"sec":"turn","sole":0.34,"sx":1290,"sy":0},"r03_u1":{"x":-98.91,"y":-361.03,"w":210,"h":362,"sec":"turn","sole":0.34,"sx":1514,"sy":0},"r04_t1":{"x":-99.76,"y":-361.04,"w":209,"h":362,"sec":"turn","sole":0.35,"sx":1728,"sy":0},"r05_u2":{"x":-94.05,"y":-361.04,"w":192,"h":362,"sec":"turn","sole":0.35,"sx":0,"sy":369},"r06_tB":{"x":-84.99,"y":-361.38,"w":178,"h":363,"sec":"turn","sole":0.34,"sx":434,"sy":0},"r07_u3":{"x":-84.43,"y":-361.03,"w":177,"h":362,"sec":"turn","sole":0.34,"sx":196,"sy":369},"r08_t2":{"x":-87.26,"y":-362.05,"w":177,"h":365,"sec":"turn","sole":0.68,"sx":0,"sy":0},"r09_u4":{"x":-86.22,"y":-361.02,"w":191,"h":362,"sec":"turn","sole":0.34,"sx":377,"sy":369},"r10_tC":{"x":-88.55,"y":-361.03,"w":199,"h":363,"sec":"turn","sole":0.34,"sx":616,"sy":0},"r11_u5":{"x":-88.52,"y":-361.04,"w":193,"h":362,"sec":"turn","sole":0.35,"sx":572,"sy":369},"r12_t3":{"x":-92.45,"y":-361.04,"w":207,"h":362,"sec":"turn","sole":0.35,"sx":769,"sy":369},"r13_u6":{"x":-95.48,"y":-361.02,"w":214,"h":362,"sec":"turn","sole":0.34,"sx":980,"sy":369},"r14_tD":{"x":-111.98,"y":-361.38,"w":240,"h":363,"sec":"turn","sole":0.34,"sx":819,"sy":0},"r15_u7":{"x":-113.57,"y":-361.02,"w":244,"h":362,"sec":"turn","sole":0.34,"sx":1198,"sy":369},"r16_t4":{"x":-114.51,"y":-362.25,"w":249,"h":365,"sec":"turn","sole":0.75,"sx":181,"sy":0},"r17_u8":{"x":-109.91,"y":-361.05,"w":245,"h":362,"sec":"turn","sole":0.35,"sx":1446,"sy":369},"r18_tE":{"x":-114.06,"y":-361.05,"w":245,"h":362,"sec":"turn","sole":0.35,"sx":1695,"sy":369},"r19_u9":{"x":-107.99,"y":-361.05,"w":235,"h":362,"sec":"turn","sole":0.35,"sx":0,"sy":735},"r20_t5":{"x":-104.37,"y":-361.05,"w":205,"h":362,"sec":"turn","sole":0.35,"sx":239,"sy":735},"r21_u10":{"x":-100.01,"y":-361.06,"w":218,"h":362,"sec":"turn","sole":0.35,"sx":448,"sy":735},"r22_tF":{"x":-97.24,"y":-361.05,"w":206,"h":362,"sec":"turn","sole":0.35,"sx":670,"sy":735},"r23_u11":{"x":-87.04,"y":-361.02,"w":179,"h":362,"sec":"turn","sole":0.34,"sx":880,"sy":735},"r24_t6":{"x":-87.96,"y":-361,"w":175,"h":362,"sec":"turn","sole":0.33,"sx":1063,"sy":735},"r25_u12":{"x":-85.76,"y":-361.01,"w":169,"h":362,"sec":"turn","sole":0.34,"sx":1242,"sy":735},"r26_tG":{"x":-84.22,"y":-361.02,"w":167,"h":362,"sec":"turn","sole":0.34,"sx":1415,"sy":735},"r27_u13":{"x":-86.17,"y":-361.02,"w":167,"h":362,"sec":"turn","sole":0.34,"sx":1586,"sy":735},"r28_t7":{"x":-107.11,"y":-361.05,"w":199,"h":362,"sec":"turn","sole":0.35,"sx":1757,"sy":735},"r29_u14":{"x":-105.23,"y":-361.05,"w":195,"h":362,"sec":"turn","sole":0.35,"sx":0,"sy":1101},"r30_tH":{"x":-115.58,"y":-361.04,"w":223,"h":362,"sec":"turn","sole":0.35,"sx":199,"sy":1101},"r31_u15":{"x":-114.75,"y":-361.03,"w":223,"h":362,"sec":"turn","sole":0.34,"sx":426,"sy":1101},"r_body":{"x":-78.43,"y":-360.77,"w":171,"h":298,"sec":"walk","sole":-64.27,"sx":0,"sy":0},"r_bodyBlink":{"x":21.81,"y":-266.27,"w":69,"h":58,"sec":"walk","sole":-213.48,"sx":442,"sy":0},"r_bodyHalf":{"x":21.81,"y":-266.27,"w":69,"h":58,"sec":"walk","sole":-213.48,"sx":515,"sy":0},"r_armN":{"x":-74.98,"y":-175.6,"w":75,"h":91,"sec":"walk","sole":-86.46,"sx":175,"sy":0},"r_armF":{"x":34.43,"y":-160.3,"w":84,"h":65,"sec":"walk","sole":-96.41,"sx":354,"sy":0},"r_shin":{"x":-28.31,"y":-97.94,"w":46,"h":75,"sec":"walk","sole":-23.34,"sx":254,"sy":0},"r_foot":{"x":-35.58,"y":-42.08,"w":73,"h":43,"sec":"walk","sole":-0.38,"sx":588,"sy":0},"r_shinF":{"x":-28.31,"y":-97.94,"w":46,"h":75,"sec":"walk","sole":-23.34,"sx":304,"sy":0},"r_footF":{"x":-35.58,"y":-42.08,"w":73,"h":43,"sec":"walk","sole":-0.38,"sx":665,"sy":0},"point_low":{"x":-90.81,"y":-370.98,"w":266,"h":372,"sec":"point","sole":0,"sx":266,"sy":0},"point":{"x":-92.81,"y":-371.98,"w":262,"h":375,"sec":"point","sole":0.75,"sx":0,"sy":0},"pointx_half":{"x":35.18,"y":-283.66,"w":58,"h":61,"sec":"point","sole":-229.02,"sx":536,"sy":0},"pointx_blink":{"x":35.18,"y":-283.66,"w":58,"h":61,"sec":"point","sole":-229.02,"sx":598,"sy":0},"ib1":{"x":-150.04,"y":-350.1,"w":261,"h":352,"sec":"wink","sole":0.37,"sx":0,"sy":0},"ib2":{"x":-97.36,"y":-340.06,"w":207,"h":341,"sec":"wink","sole":0.35,"sx":265,"sy":0},"ib3":{"x":-108.11,"y":-328.46,"w":218,"h":329,"sec":"wink","sole":0.21,"sx":1207,"sy":0},"wink_half":{"x":-114.91,"y":-329.31,"w":239,"h":330,"sec":"wink","sole":0.21,"sx":721,"sy":0},"wink_open":{"x":-114.91,"y":-329.31,"w":239,"h":330,"sec":"wink","sole":0.21,"sx":964,"sy":0},"wink":{"x":-115.76,"y":-329.74,"w":241,"h":332,"sec":"wink","sole":0.64,"sx":476,"sy":0},"winkx_blink":{"x":-46.24,"y":-244.27,"w":62,"h":59,"sec":"wink","sole":-188.79,"sx":1429,"sy":0},"sit":{"x":-152.09,"y":-329.24,"w":288,"h":330,"sec":"rest","sole":0.28,"sx":523,"sy":0},"sitx_sleep":{"x":-72.06,"y":-233.26,"w":134,"h":106,"sec":"rest","sole":-130.73,"sx":1259,"sy":0},"i_sit":{"x":-162.97,"y":-346.12,"w":301,"h":348,"sec":"rest","sole":0.37,"sx":0,"sy":0},"sit1":{"x":-113.26,"y":-339.78,"w":214,"h":342,"sec":"rest","sole":0.81,"sx":305,"sy":0},"sit2":{"x":-94.25,"y":-311.46,"w":201,"h":315,"sec":"rest","sole":0.81,"sx":815,"sy":0},"sit3":{"x":-133.08,"y":-286.38,"w":235,"h":290,"sec":"rest","sole":0.81,"sx":1020,"sy":0},"p_think":{"x":-112.86,"y":-357.1,"w":244,"h":360,"sec":"react","sole":0.73,"sx":341,"sy":742},"p_surprised":{"x":-114.68,"y":-359.27,"w":218,"h":362,"sec":"react","sole":0.73,"sx":824,"sy":375},"p_gasp":{"x":-113.87,"y":-355.76,"w":223,"h":359,"sec":"react","sole":0.71,"sx":1161,"sy":742},"p_idea":{"x":-152.09,"y":-362.15,"w":271,"h":364,"sec":"react","sole":0.72,"sx":1001,"sy":0},"p_chin":{"x":-118.69,"y":-361.43,"w":285,"h":364,"sec":"react","sole":0.72,"sx":1276,"sy":0},"p_shy":{"x":-133.32,"y":-327.47,"w":317,"h":330,"sec":"react","sole":0.71,"sx":1336,"sy":1107},"p_heart":{"x":-121.73,"y":-368.16,"w":295,"h":371,"sec":"react","sole":0.74,"sx":0,"sy":0},"p_jump":{"x":-145.16,"y":-313.55,"w":288,"h":316,"sec":"react","sole":0.73,"sx":303,"sy":1468},"p_cheer":{"x":-135.09,"y":-316.15,"w":299,"h":318,"sec":"react","sole":0.71,"sx":0,"sy":1468},"p_open_arms":{"x":-185.59,"y":-357.9,"w":351,"h":360,"sec":"react","sole":0.7,"sx":589,"sy":742},"p_wave_hi":{"x":-111.51,"y":-362.87,"w":285,"h":365,"sec":"react","sole":0.72,"sx":712,"sy":0},"p_point_front":{"x":-114.93,"y":-362.12,"w":310,"h":364,"sec":"react","sole":0.71,"sx":1565,"sy":0},"p_run":{"x":-156.02,"y":-354.27,"w":282,"h":357,"sec":"react","sole":0.72,"sx":0,"sy":1107},"i_think":{"x":-98.45,"y":-358.91,"w":213,"h":360,"sec":"react","sole":0.36,"sx":944,"sy":742},"i_surprised":{"x":-120.36,"y":-359.64,"w":229,"h":361,"sec":"react","sole":0.36,"sx":1555,"sy":375},"i_gasp":{"x":-105.74,"y":-357.88,"w":203,"h":359,"sec":"react","sole":0.35,"sx":1388,"sy":742},"i_idea":{"x":-145.55,"y":-361.08,"w":265,"h":363,"sec":"react","sole":0.36,"sx":0,"sy":375},"i_chin":{"x":-106.48,"y":-361.11,"w":222,"h":362,"sec":"react","sole":0.37,"sx":1046,"sy":375},"i_shy":{"x":-95.62,"y":-343.8,"w":225,"h":345,"sec":"react","sole":0.38,"sx":286,"sy":1107},"i_heart":{"x":-101.33,"y":-364.5,"w":199,"h":366,"sec":"react","sole":0.38,"sx":509,"sy":0},"i_jump":{"x":-148.7,"y":-336.8,"w":293,"h":338,"sec":"react","sole":0.37,"sx":1039,"sy":1107},"i_cheer":{"x":-147.32,"y":-338.83,"w":280,"h":340,"sec":"react","sole":0.37,"sx":755,"sy":1107},"i_open_arms":{"x":-179.96,"y":-359.51,"w":337,"h":361,"sec":"react","sole":0.42,"sx":0,"sy":742},"i_wave_hi":{"x":-119.56,"y":-361.46,"w":274,"h":363,"sec":"react","sole":0.37,"sx":269,"sy":375},"i_point_front":{"x":-110.01,"y":-361.16,"w":279,"h":362,"sec":"react","sole":0.39,"sx":1272,"sy":375},"i_run":{"x":-146.18,"y":-357.53,"w":267,"h":359,"sec":"react","sole":0.37,"sx":1595,"sy":742},"i2_heart":{"x":-106.33,"y":-367.4,"w":206,"h":369,"sec":"react","sole":0.37,"sx":299,"sy":0},"i2_jump":{"x":-120.81,"y":-325.1,"w":210,"h":327,"sec":"react","sole":0.37,"sx":1657,"sy":1107},"i2_shy":{"x":-121.81,"y":-343.77,"w":236,"h":345,"sec":"react","sole":0.37,"sx":515,"sy":1107},"i2_wave_hi":{"x":-119.99,"y":-361.84,"w":273,"h":363,"sec":"react","sole":0.37,"sx":547,"sy":375},"p_magnifier":{"x":-120.62,"y":-362.23,"w":260,"h":364,"sec":"props","sole":0.74,"sx":682,"sy":0},"p_clipboard":{"x":-118.02,"y":-364.45,"w":323,"h":367,"sec":"props","sole":0.74,"sx":355,"sy":0},"p_megaphone":{"x":-135.54,"y":-365.02,"w":351,"h":368,"sec":"props","sole":0.72,"sx":0,"sy":0},"p_book":{"x":-119.4,"y":-347.81,"w":265,"h":351,"sec":"props","sole":0.72,"sx":644,"sy":372},"i_magnifier":{"x":-120.86,"y":-360.74,"w":230,"h":362,"sec":"props","sole":0.37,"sx":0,"sy":372},"i_clipboard":{"x":-121.62,"y":-362.29,"w":297,"h":364,"sec":"props","sole":0.39,"sx":946,"sy":0},"i_megaphone":{"x":-119.28,"y":-362.63,"w":294,"h":364,"sec":"props","sole":0.4,"sx":1247,"sy":0},"i_book":{"x":-102.47,"y":-354.28,"w":194,"h":356,"sec":"props","sole":0.36,"sx":234,"sy":372},"i2_book":{"x":-104.14,"y":-350.31,"w":208,"h":352,"sec":"props","sole":0.35,"sx":432,"sy":372},"i2_megaphone":{"x":-109.22,"y":-362.62,"w":300,"h":364,"sec":"props","sole":0.4,"sx":1545,"sy":0},"p_peek":{"x":-123.82,"y":-367.87,"w":243,"h":371,"sec":"peek","sole":0.72,"edge":[117.38,0],"sx":0,"sy":0},"p_peek2":{"x":-61.31,"y":-339.2,"w":139,"h":342,"sec":"peek","sole":0.72,"edge":[-59.88,0],"sx":247,"sy":0},"p_ledge":{"x":-127.22,"y":-264.93,"w":310,"h":267,"sec":"peek","sole":0.7,"sx":390,"sy":0},"p_seat_point":{"x":-180.78,"y":-320.75,"w":316,"h":323,"sec":"seat","sole":0.52,"sx":918,"sy":0},"p_seat_rest":{"x":-128.65,"y":-320.23,"w":246,"h":322,"sec":"seat","sole":0.51,"sx":1477,"sy":0},"p_sit_cheeks":{"x":-122.74,"y":-321.35,"w":235,"h":323,"sec":"seat","sole":0.72,"sx":1238,"sy":0},"p_sit_cheer":{"x":-141.55,"y":-310.37,"w":298,"h":313,"sec":"seat","sole":0.7,"sx":538,"sy":351},"p_zen":{"x":-161.61,"y":-331,"w":318,"h":333,"sec":"seat","sole":0.71,"sx":596,"sy":0},"i_zen":{"x":-143.65,"y":-345.6,"w":281,"h":347,"sec":"seat","sole":0.39,"sx":0,"sy":0},"seat_mid":{"x":-141.92,"y":-320.45,"w":254,"h":322,"sec":"seat","sole":0.31,"sx":1727,"sy":0},"i2_zen":{"x":-161.56,"y":-337.82,"w":307,"h":339,"sec":"seat","sole":0.39,"sx":285,"sy":0},"i_sit_cheeks":{"x":-123.57,"y":-320.13,"w":234,"h":321,"sec":"seat","sole":0.31,"sx":300,"sy":351},"i_sit_cheer":{"x":-156.99,"y":-320.25,"w":296,"h":322,"sec":"seat","sole":0.35,"sx":0,"sy":351},"p_lie_sleep":{"x":-113.23,"y":-264.92,"w":404,"h":267,"sec":"lie","sole":0.73,"sx":0,"sy":338},"p_lie_chin":{"x":-114.51,"y":-287,"w":364,"h":290,"sec":"lie","sole":0.72,"sx":1274,"sy":0},"i_lie_sleep":{"x":-100.99,"y":-297.57,"w":373,"h":299,"sec":"lie","sole":0.4,"sx":897,"sy":0},"i_lie_chin":{"x":-103.56,"y":-308.94,"w":333,"h":310,"sec":"lie","sole":0.39,"sx":560,"sy":0},"i2_lie_sleep":{"x":-130.1,"y":-332.3,"w":221,"h":334,"sec":"lie","sole":0.37,"sx":0,"sy":0},"i2_lie_chin":{"x":-101.52,"y":-309,"w":331,"h":311,"sec":"lie","sole":0.4,"sx":225,"sy":0},"c_body":{"x":-114.37,"y":-362.25,"w":222,"h":308,"sec":"climb","sole":-56.13,"sx":0,"sy":0},"c_armL":{"x":-126.35,"y":-168.4,"w":54,"h":92,"sec":"climb","sole":-78.59,"pivot":[-86.92,-160.91],"sx":286,"sy":0},"c_armR":{"x":66.75,"y":-169.15,"w":56,"h":93,"sec":"climb","sole":-78.59,"pivot":[82.51,-161.66],"sx":226,"sy":0},"c_legL":{"x":-79.2,"y":-75.59,"w":91,"h":78,"sec":"climb","sole":0,"pivot":[-50.75,-71.1],"sx":424,"sy":0},"c_legR":{"x":5.38,"y":-77.84,"w":76,"h":80,"sec":"climb","sole":0,"pivot":[49.79,-73.35],"sx":344,"sy":0},"fwalk_a":{"x":-118.75,"y":-361.25,"w":228,"h":363,"sec":"walk2","sole":0.42,"sx":252,"sy":0},"fwalk_b":{"x":-134.59,"y":-361.23,"w":248,"h":363,"sec":"walk2","sole":0.41,"sx":484,"sy":0},"bwalk_a":{"x":-120.3,"y":-361.34,"w":244,"h":363,"sec":"walk2","sole":0.45,"sx":736,"sy":0},"bwalk_b":{"x":-112.05,"y":-361.34,"w":243,"h":363,"sec":"walk2","sole":0.45,"sx":984,"sy":0},"back_reach":{"x":-125.09,"y":-423.52,"w":248,"h":425,"sec":"walk2","sole":0.47,"sx":0,"sy":0},"hop1":{"x":-143.83,"y":-325.13,"w":231,"h":329,"sec":"hop","sole":0.87,"sx":790,"sy":0},"hop2":{"x":-136.42,"y":-351.28,"w":252,"h":354,"sec":"hop","sole":0.87,"sx":267,"sy":0},"hop3":{"x":-142.52,"y":-342.57,"w":263,"h":346,"sec":"hop","sole":0.87,"sx":523,"sy":0},"hop4":{"x":-147.31,"y":-353.03,"w":263,"h":357,"sec":"hop","sole":0.87,"sx":0,"sy":0},"dance1":{"x":-126.12,"y":-340.41,"w":270,"h":344,"sec":"fun","sole":0.82,"sx":191,"sy":359},"dance2":{"x":-120,"y":-348.57,"w":210,"h":352,"sec":"fun","sole":0.82,"sx":1150,"sy":0},"dance3":{"x":-149.8,"y":-350.2,"w":260,"h":353,"sec":"fun","sole":0.82,"sx":704,"sy":0},"dance4":{"x":-119.59,"y":-348.57,"w":217,"h":352,"sec":"fun","sole":0.82,"sx":1364,"sy":0},"clap1":{"x":-135.74,"y":-351.82,"w":260,"h":354,"sec":"fun","sole":0.74,"sx":261,"sy":0},"clap2":{"x":-86.65,"y":-351.82,"w":175,"h":354,"sec":"fun","sole":0.74,"sx":525,"sy":0},"clap3":{"x":-87.4,"y":-350.33,"w":178,"h":353,"sec":"fun","sole":0.74,"sx":968,"sy":0},"clap4":{"x":-134.63,"y":-351.82,"w":257,"h":355,"sec":"fun","sole":0.74,"sx":0,"sy":0},"surprise1":{"x":-111.84,"y":-349.46,"w":211,"h":352,"sec":"fun","sole":0.75,"sx":1585,"sy":0},"surprise2":{"x":-137.82,"y":-324.6,"w":264,"h":327,"sec":"fun","sole":0.75,"sx":465,"sy":359},"surprise3":{"x":-97.91,"y":-344.94,"w":187,"h":348,"sec":"fun","sole":0.75,"sx":0,"sy":359},"surprise4":{"x":-96.4,"y":-348.7,"w":189,"h":352,"sec":"fun","sole":0.75,"sx":1800,"sy":0},"wave1":{"x":-159.49,"y":-360.84,"w":253,"h":364,"sec":"x1","sole":0.84,"sx":995,"sy":0},"wave4":{"x":-127.67,"y":-361.67,"w":221,"h":365,"sec":"x1","sole":0.84,"sx":283,"sy":0},"stretch1":{"x":-140.89,"y":-355.79,"w":280,"h":358,"sec":"x1","sole":0.84,"sx":884,"sy":745},"stretch2":{"x":-139.63,"y":-370.93,"w":279,"h":374,"sec":"x1","sole":0.84,"sx":0,"sy":0},"stretch3":{"x":-140.05,"y":-361.68,"w":271,"h":365,"sec":"x1","sole":0.84,"sx":508,"sy":0},"stretch4":{"x":-116.92,"y":-360,"w":224,"h":363,"sec":"x1","sole":0.84,"sx":1446,"sy":0},"laugh1":{"x":-95.2,"y":-360.8,"w":190,"h":364,"sec":"x1","sole":0.8,"sx":1252,"sy":0},"laugh2":{"x":-118.8,"y":-358.4,"w":210,"h":362,"sec":"x1","sole":0.8,"sx":0,"sy":745},"laugh3":{"x":-99.6,"y":-350.4,"w":250,"h":354,"sec":"x1","sole":0.8,"sx":1168,"sy":745},"laugh4":{"x":-113.6,"y":-360,"w":213,"h":363,"sec":"x1","sole":0.8,"sx":1674,"sy":0},"march1":{"x":-126.68,"y":-359.2,"w":234,"h":362,"sec":"x1","sole":0.8,"sx":214,"sy":745},"march2":{"x":-113.45,"y":-361.6,"w":208,"h":365,"sec":"x1","sole":0.8,"sx":783,"sy":0},"march3":{"x":-118.66,"y":-360,"w":220,"h":363,"sec":"x1","sole":0.8,"sx":0,"sy":378},"march4":{"x":-114.65,"y":-359.2,"w":222,"h":362,"sec":"x1","sole":0.8,"sx":452,"sy":745},"shrug1":{"x":-96.31,"y":-360.84,"w":207,"h":363,"sec":"x1","sole":0.84,"sx":224,"sy":378},"shrug2":{"x":-148.46,"y":-360.84,"w":275,"h":363,"sec":"x1","sole":0.84,"sx":435,"sy":378},"shrug3":{"x":-142.99,"y":-360.84,"w":274,"h":363,"sec":"x1","sole":0.84,"sx":714,"sy":378},"shrug4":{"x":-119.02,"y":-360.84,"w":213,"h":363,"sec":"x1","sole":0.84,"sx":992,"sy":378},"flex1":{"x":-106.53,"y":-360,"w":199,"h":363,"sec":"x1","sole":0.82,"sx":1209,"sy":378},"flex2":{"x":-160.41,"y":-360,"w":252,"h":363,"sec":"x1","sole":0.82,"sx":1412,"sy":378},"flex3":{"x":-150.2,"y":-360,"w":286,"h":363,"sec":"x1","sole":0.82,"sx":1668,"sy":378},"flex4":{"x":-108.98,"y":-359.18,"w":202,"h":362,"sec":"x1","sole":0.82,"sx":678,"sy":745},"hearthands1":{"x":-97.1,"y":-360,"w":190,"h":363,"sec":"x2","sole":0.77,"sx":1762,"sy":0},"hearthands3":{"x":-103.24,"y":-358.46,"w":195,"h":361,"sec":"x2","sole":0.77,"sx":1514,"sy":371},"hearthands4":{"x":-112.45,"y":-360.77,"w":206,"h":363,"sec":"x2","sole":0.77,"sx":0,"sy":371},"bow1":{"x":-90.59,"y":-360.78,"w":185,"h":364,"sec":"x2","sole":0.78,"sx":1107,"sy":0},"bow2":{"x":-102.3,"y":-352.19,"w":196,"h":355,"sec":"x2","sole":0.78,"sx":242,"sy":738},"bow4":{"x":-106.59,"y":-352.97,"w":238,"h":356,"sec":"x2","sole":0.78,"sx":0,"sy":738},"search1":{"x":-115.37,"y":-361.59,"w":218,"h":364,"sec":"x2","sole":0.79,"sx":1296,"sy":0},"search4":{"x":-112.2,"y":-360.79,"w":210,"h":363,"sec":"x2","sole":0.79,"sx":210,"sy":371},"thumbs1":{"x":-146.2,"y":-361.63,"w":242,"h":365,"sec":"x2","sole":0.81,"sx":387,"sy":0},"thumbs2":{"x":-130.72,"y":-360,"w":226,"h":363,"sec":"x2","sole":0.81,"sx":424,"sy":371},"thumbs3":{"x":-127.87,"y":-360.81,"w":240,"h":364,"sec":"x2","sole":0.81,"sx":1518,"sy":0},"thumbs4":{"x":-122.17,"y":-360,"w":221,"h":363,"sec":"x2","sole":0.81,"sx":654,"sy":371},"sneeze1":{"x":-97.68,"y":-360,"w":195,"h":363,"sec":"x2","sole":0.79,"sx":879,"sy":371},"sneeze2":{"x":-115.01,"y":-360.79,"w":213,"h":363,"sec":"x2","sole":0.79,"sx":1078,"sy":371},"sneeze3":{"x":-102.01,"y":-356.85,"w":193,"h":360,"sec":"x2","sole":0.79,"sx":1713,"sy":371},"sneeze4":{"x":-110.68,"y":-361.58,"w":222,"h":365,"sec":"x2","sole":0.79,"sx":633,"sy":0},"idea1":{"x":-93.66,"y":-363.08,"w":193,"h":366,"sec":"x2","sole":0.77,"sx":190,"sy":0},"idea2":{"x":-91.73,"y":-363.85,"w":186,"h":367,"sec":"x2","sole":0.77,"sx":0,"sy":0},"idea3":{"x":-150.32,"y":-362.31,"w":244,"h":365,"sec":"x2","sole":0.77,"sx":859,"sy":0},"idea4":{"x":-120.26,"y":-360,"w":215,"h":363,"sec":"x2","sole":0.77,"sx":1295,"sy":371},"jacks1":{"x":-115.15,"y":-361.66,"w":215,"h":364,"sec":"x3","sole":0.83,"sx":636,"sy":0},"jacks2":{"x":-165.45,"y":-340.05,"w":308,"h":343,"sec":"x3","sole":0.83,"sx":817,"sy":736},"jacks3":{"x":-143,"y":-346.7,"w":274,"h":350,"sec":"x3","sole":0.83,"sx":539,"sy":736},"jacks4":{"x":-147.99,"y":-353.35,"w":266,"h":357,"sec":"x3","sole":0.83,"sx":0,"sy":736},"kiss1":{"x":-93.95,"y":-363.16,"w":195,"h":366,"sec":"x3","sole":0.79,"sx":0,"sy":0},"kiss2":{"x":-93.16,"y":-361.58,"w":185,"h":365,"sec":"x3","sole":0.79,"sx":447,"sy":0},"kiss3":{"x":-151.58,"y":-362.37,"w":244,"h":366,"sec":"x3","sole":0.79,"sx":199,"sy":0},"kiss4":{"x":-114.87,"y":-360.79,"w":208,"h":364,"sec":"x3","sole":0.79,"sx":855,"sy":0},"scratch1":{"x":-95.73,"y":-360.82,"w":200,"h":363,"sec":"x3","sole":0.82,"sx":1067,"sy":0},"scratch2":{"x":-119.05,"y":-358.36,"w":231,"h":361,"sec":"x3","sole":0.82,"sx":1117,"sy":370},"scratch3":{"x":-131.73,"y":-360,"w":231,"h":362,"sec":"x3","sole":0.82,"sx":1538,"sy":0},"scratch4":{"x":-119.86,"y":-360,"w":214,"h":362,"sec":"x3","sole":0.82,"sx":1773,"sy":0},"peekaboo1":{"x":-91.39,"y":-358.41,"w":186,"h":361,"sec":"x3","sole":0.79,"sx":1352,"sy":370},"peekaboo2":{"x":-93.77,"y":-358.41,"w":188,"h":362,"sec":"x3","sole":0.79,"sx":0,"sy":370},"peekaboo3":{"x":-135.1,"y":-360,"w":261,"h":362,"sec":"x3","sole":0.79,"sx":192,"sy":370},"peekaboo4":{"x":-114.83,"y":-360,"w":208,"h":362,"sec":"x3","sole":0.79,"sx":457,"sy":370},"celebrate1":{"x":-126.73,"y":-334.22,"w":234,"h":337,"sec":"x3","sole":0.86,"sx":1129,"sy":736},"celebrate2":{"x":-133.17,"y":-360.86,"w":263,"h":363,"sec":"x3","sole":0.86,"sx":1271,"sy":0},"celebrate3":{"x":-141.77,"y":-353.13,"w":265,"h":357,"sec":"x3","sole":0.86,"sx":270,"sy":736},"celebrate4":{"x":-148.64,"y":-357.42,"w":265,"h":360,"sec":"x3","sole":0.86,"sx":1774,"sy":370},"salute2":{"x":-126.2,"y":-358.42,"w":228,"h":361,"sec":"x3","sole":0.79,"sx":1542,"sy":370},"salute3":{"x":-124.62,"y":-359.21,"w":229,"h":362,"sec":"x3","sole":0.79,"sx":669,"sy":370},"salute4":{"x":-116.7,"y":-359.21,"w":211,"h":362,"sec":"x3","sole":0.79,"sx":902,"sy":370},"sitswing1":{"x":-146.48,"y":-320.52,"w":265,"h":323,"sec":"x4","sole":0.86,"sx":1278,"sy":737},"sitswing2":{"x":-144.75,"y":-330.86,"w":262,"h":334,"sec":"x4","sole":0.86,"sx":273,"sy":737},"sitswing3":{"x":-139.58,"y":-330,"w":257,"h":333,"sec":"x4","sole":0.86,"sx":805,"sy":737},"sitswing4":{"x":-145.61,"y":-337.75,"w":265,"h":340,"sec":"x4","sole":0.86,"sx":1589,"sy":372},"sitwave2":{"x":-163.67,"y":-331.78,"w":262,"h":334,"sec":"x4","sole":0.89,"sx":539,"sy":737},"sitwave3":{"x":-172.12,"y":-332.67,"w":269,"h":335,"sec":"x4","sole":0.89,"sx":0,"sy":737},"sitwave4":{"x":-116.52,"y":-330,"w":208,"h":333,"sec":"x4","sole":0.89,"sx":1066,"sy":737},"run1":{"x":-113.68,"y":-359.18,"w":210,"h":362,"sec":"x4","sole":0.82,"sx":1029,"sy":0},"run2":{"x":-115.74,"y":-359.18,"w":208,"h":362,"sec":"x4","sole":0.82,"sx":1243,"sy":0},"run3":{"x":-123.16,"y":-364.12,"w":214,"h":367,"sec":"x4","sole":0.82,"sx":207,"sy":0},"run4":{"x":-109.98,"y":-356.7,"w":206,"h":359,"sec":"x4","sole":0.82,"sx":1115,"sy":372},"sneak1":{"x":-114.8,"y":-360,"w":214,"h":362,"sec":"x4","sole":0.8,"sx":1455,"sy":0},"sneak2":{"x":-103.2,"y":-360.8,"w":197,"h":363,"sec":"x4","sole":0.8,"sx":425,"sy":0},"sneak3":{"x":-118.4,"y":-360.8,"w":210,"h":363,"sec":"x4","sole":0.8,"sx":626,"sy":0},"sneak4":{"x":-92,"y":-360.8,"w":185,"h":363,"sec":"x4","sole":0.8,"sx":840,"sy":0},"twist1":{"x":-122.63,"y":-348.36,"w":260,"h":351,"sec":"x4","sole":0.83,"sx":1325,"sy":372},"twist2":{"x":-113.07,"y":-359.17,"w":205,"h":362,"sec":"x4","sole":0.83,"sx":1673,"sy":0},"twist3":{"x":-151.32,"y":-357.51,"w":244,"h":361,"sec":"x4","sole":0.83,"sx":0,"sy":372},"twist4":{"x":-150.07,"y":-358.34,"w":274,"h":361,"sec":"x4","sole":0.83,"sx":248,"sy":372},"blush1":{"x":-101.72,"y":-356.82,"w":194,"h":360,"sec":"x4","sole":0.79,"sx":917,"sy":372},"blush2":{"x":-110.46,"y":-365.56,"w":203,"h":368,"sec":"x4","sole":0.79,"sx":0,"sy":0},"blush3":{"x":-92.19,"y":-358.41,"w":184,"h":361,"sec":"x4","sole":0.79,"sx":526,"sy":372},"blush4":{"x":-106.49,"y":-358.41,"w":199,"h":361,"sec":"x4","sole":0.79,"sx":714,"sy":372},"yoga1":{"x":-85.3,"y":-361.5,"w":177,"h":365,"sec":"x5","sole":0.75,"sx":175,"sy":0},"yoga2":{"x":-83.42,"y":-360,"w":173,"h":362,"sec":"x5","sole":0.75,"sx":0,"sy":413},"yoga3":{"x":-85.68,"y":-406.6,"w":171,"h":409,"sec":"x5","sole":0.75,"sx":0,"sy":0},"yoga4":{"x":-100.71,"y":-360.75,"w":191,"h":363,"sec":"x5","sole":0.75,"sx":583,"sy":0},"dizzy1":{"x":-113.73,"y":-359.14,"w":264,"h":362,"sec":"x5","sole":0.86,"sx":177,"sy":413},"dizzy2":{"x":-129.55,"y":-360.86,"w":233,"h":363,"sec":"x5","sole":0.86,"sx":778,"sy":0},"dizzy3":{"x":-152.64,"y":-360,"w":265,"h":363,"sec":"x5","sole":0.86,"sx":1015,"sy":0},"dizzy4":{"x":-119.71,"y":-361.71,"w":223,"h":364,"sec":"x5","sole":0.86,"sx":356,"sy":0},"pointdown1":{"x":-118.52,"y":-358.38,"w":273,"h":361,"sec":"x5","sole":0.81,"sx":1184,"sy":413},"pointdown2":{"x":-107.6,"y":-355.96,"w":201,"h":358,"sec":"x5","sole":0.81,"sx":1037,"sy":779},"pointdown3":{"x":-118.52,"y":-358.38,"w":210,"h":361,"sec":"x5","sole":0.81,"sx":1461,"sy":413},"pointdown4":{"x":-117.3,"y":-358.38,"w":210,"h":361,"sec":"x5","sole":0.81,"sx":1675,"sy":413},"wait1":{"x":-89.42,"y":-359.23,"w":182,"h":362,"sec":"x5","sole":0.77,"sx":445,"sy":413},"wait2":{"x":-87.87,"y":-359.23,"w":178,"h":362,"sec":"x5","sole":0.77,"sx":631,"sy":413},"wait3":{"x":-89.42,"y":-359.23,"w":180,"h":362,"sec":"x5","sole":0.77,"sx":813,"sy":413},"wait4":{"x":-134.32,"y":-358.45,"w":252,"h":361,"sec":"x5","sole":0.77,"sx":0,"sy":779},"fan1":{"x":-133.41,"y":-353.22,"w":274,"h":356,"sec":"x5","sole":0.85,"sx":1242,"sy":779},"fan2":{"x":-137.65,"y":-360,"w":263,"h":363,"sec":"x5","sole":0.85,"sx":1284,"sy":0},"fan3":{"x":-141.46,"y":-360.85,"w":256,"h":363,"sec":"x5","sole":0.85,"sx":1551,"sy":0},"fan4":{"x":-120.71,"y":-360.85,"w":217,"h":363,"sec":"x5","sole":0.85,"sx":1811,"sy":0},"invite1":{"x":-141.06,"y":-358.41,"w":249,"h":361,"sec":"x5","sole":0.79,"sx":256,"sy":779},"invite2":{"x":-137.09,"y":-357.62,"w":226,"h":361,"sec":"x5","sole":0.79,"sx":509,"sy":779},"invite3":{"x":-148.21,"y":-357.62,"w":294,"h":361,"sec":"x5","sole":0.79,"sx":739,"sy":779},"invite4":{"x":-91.79,"y":-359.21,"w":183,"h":362,"sec":"x5","sole":0.79,"sx":997,"sy":413},"highfive1":{"x":-98.96,"y":-359.19,"w":200,"h":362,"sec":"x6","sole":0.81,"sx":587,"sy":370},"highfive2":{"x":-158.01,"y":-357.56,"w":250,"h":360,"sec":"x6","sole":0.81,"sx":509,"sy":737},"highfive3":{"x":-156.38,"y":-360.81,"w":247,"h":363,"sec":"x6","sole":0.81,"sx":1651,"sy":0},"highfive4":{"x":-129.5,"y":-358.37,"w":222,"h":361,"sec":"x6","sole":0.81,"sx":1598,"sy":370},"count1":{"x":-131.28,"y":-355.97,"w":222,"h":359,"sec":"x6","sole":0.81,"sx":1004,"sy":737},"count2":{"x":-130.87,"y":-358.39,"w":222,"h":361,"sec":"x6","sole":0.81,"sx":0,"sy":737},"count3":{"x":-145.37,"y":-357.58,"w":237,"h":360,"sec":"x6","sole":0.81,"sx":763,"sy":737},"count4":{"x":-148.59,"y":-358.39,"w":279,"h":361,"sec":"x6","sole":0.81,"sx":226,"sy":737},"hug1":{"x":-91.21,"y":-359.2,"w":185,"h":362,"sec":"x6","sole":0.8,"sx":791,"sy":370},"hug2":{"x":-100.45,"y":-359.2,"w":194,"h":362,"sec":"x6","sole":0.8,"sx":980,"sy":370},"hug3":{"x":-104.06,"y":-360.8,"w":196,"h":363,"sec":"x6","sole":0.8,"sx":0,"sy":370},"hug4":{"x":-153.88,"y":-355.98,"w":271,"h":358,"sec":"x6","sole":0.8,"sx":1230,"sy":737},"listen1":{"x":-144.67,"y":-360.83,"w":239,"h":364,"sec":"x6","sole":0.83,"sx":430,"sy":0},"listen2":{"x":-114.32,"y":-361.66,"w":215,"h":364,"sec":"x6","sole":0.83,"sx":673,"sy":0},"listen3":{"x":-135.94,"y":-362.49,"w":227,"h":365,"sec":"x6","sole":0.83,"sx":199,"sy":0},"listen4":{"x":-119.31,"y":-360,"w":212,"h":362,"sec":"x6","sole":0.83,"sx":1178,"sy":370},"rock1":{"x":-97.66,"y":-360,"w":191,"h":363,"sec":"x6","sole":0.83,"sx":200,"sy":370},"rock2":{"x":-100.55,"y":-362.48,"w":195,"h":366,"sec":"x6","sole":0.83,"sx":0,"sy":0},"rock4":{"x":-107.17,"y":-358.34,"w":200,"h":362,"sec":"x6","sole":0.83,"sx":1394,"sy":370},"cream1":{"x":-139.09,"y":-360.82,"w":238,"h":364,"sec":"x6","sole":0.82,"sx":892,"sy":0},"cream2":{"x":-150.14,"y":-361.64,"w":244,"h":364,"sec":"x6","sole":0.82,"sx":1134,"sy":0},"cream3":{"x":-96.95,"y":-360.82,"w":188,"h":363,"sec":"x6","sole":0.82,"sx":395,"sy":370},"cream4":{"x":-148.09,"y":-361.64,"w":265,"h":364,"sec":"x6","sole":0.82,"sx":1382,"sy":0},"yjump1":{"x":-114.48,"y":-345.98,"w":227,"h":347,"sec":"y1","sole":-1.7,"sx":918,"sy":368},"yjump2":{"x":-133.73,"y":-359.55,"w":264,"h":361,"sec":"y1","sole":0,"sx":548,"sy":0},"yjump3":{"x":-125.25,"y":-407.89,"w":275,"h":355,"sec":"y1","sole":-55.12,"sx":1551,"sy":0},"yjump4":{"x":-115.58,"y":-354.46,"w":259,"h":354,"sec":"y1","sole":-2.54,"sx":0,"sy":368},"yland1":{"x":-116.43,"y":-361.51,"w":275,"h":362,"sec":"y1","sole":0,"sx":269,"sy":0},"yland2":{"x":-109.92,"y":-352.55,"w":235,"h":353,"sec":"y1","sole":0,"sx":461,"sy":368},"yland3":{"x":-119.69,"y":-343.6,"w":245,"h":344,"sec":"y1","sole":0,"sx":1149,"sy":368},"yland4":{"x":-96.08,"y":-353.37,"w":194,"h":354,"sec":"y1","sole":0.81,"sx":263,"sy":368},"yleapr1":{"x":-122.24,"y":-337.64,"w":244,"h":338,"sec":"y1","sole":0,"sx":1646,"sy":368},"yleapr2":{"x":-106.85,"y":-358.16,"w":267,"h":334,"sec":"y1","sole":-26.5,"sx":0,"sy":726},"yleapr3":{"x":-108.56,"y":-382.09,"w":266,"h":307,"sec":"y1","sole":-77.79,"sx":1015,"sy":726},"yleapr4":{"x":-126.51,"y":-339.35,"w":244,"h":340,"sec":"y1","sole":-0.85,"sx":1398,"sy":368},"yleapl1":{"x":-123.09,"y":-333.37,"w":243,"h":334,"sec":"y1","sole":0,"sx":271,"sy":726},"yleapl2":{"x":-128.22,"y":-365.85,"w":237,"h":323,"sec":"y1","sole":-44.45,"sx":518,"sy":726},"yleapl3":{"x":-117.11,"y":-374.4,"w":252,"h":320,"sec":"y1","sole":-57.27,"sx":759,"sy":726},"yleapl4":{"x":-91.46,"y":-357.31,"w":239,"h":358,"sec":"y1","sole":-0.85,"sx":1042,"sy":0},"yhopd1":{"x":-106.65,"y":-362.51,"w":222,"h":360,"sec":"y1","sole":-5.05,"sx":816,"sy":0},"yhopd2":{"x":-117.08,"y":-402.05,"w":262,"h":356,"sec":"y1","sole":-48.78,"sx":1285,"sy":0},"yhopd3":{"x":-88.32,"y":-351.58,"w":214,"h":353,"sec":"y1","sole":-0.84,"sx":700,"sy":368},"yhopd4":{"x":-131.21,"y":-362.51,"w":265,"h":364,"sec":"y1","sole":0,"sx":0,"sy":0},"yintro1":{"x":-85.96,"y":-359.99,"w":188,"h":362,"sec":"y2","sole":0,"sx":219,"sy":0},"yintro2":{"x":-77.33,"y":-353.72,"w":185,"h":355,"sec":"y2","sole":0,"sx":410,"sy":367},"yintro3":{"x":-135.68,"y":-357.64,"w":240,"h":359,"sec":"y2","sole":0,"sx":1328,"sy":0},"yintro4":{"x":-124.31,"y":-355.29,"w":270,"h":357,"sec":"y2","sole":0,"sx":1756,"sy":0},"ywave1":{"x":-133.6,"y":-346.4,"w":240,"h":348,"sec":"y2","sole":0,"sx":1079,"sy":367},"ywave2":{"x":-130.64,"y":-348,"w":236,"h":350,"sec":"y2","sole":0,"sx":599,"sy":367},"ywave3":{"x":-126.48,"y":-346.4,"w":241,"h":348,"sec":"y2","sole":0,"sx":1323,"sy":367},"ybye1":{"x":-130.8,"y":-348.8,"w":236,"h":350,"sec":"y2","sole":0,"sx":839,"sy":367},"yexc1":{"x":-110.62,"y":-361.59,"w":226,"h":362,"sec":"y2","sole":-1.59,"sx":411,"sy":0},"yexc2":{"x":-94.41,"y":-360,"w":197,"h":362,"sec":"y2","sole":-0.79,"sx":641,"sy":0},"yexc3":{"x":-108.48,"y":-361.59,"w":276,"h":362,"sec":"y2","sole":-1.59,"sx":842,"sy":0},"yexc4":{"x":-86.62,"y":-355.23,"w":196,"h":357,"sec":"y2","sole":0,"sx":0,"sy":367},"ystart1":{"x":-108.1,"y":-362.11,"w":215,"h":363,"sec":"y2","sole":-2.12,"sx":0,"sy":0},"ystart2":{"x":-135.53,"y":-364.23,"w":260,"h":327,"sec":"y2","sole":-40.23,"sx":1776,"sy":367},"ystart3":{"x":-94.23,"y":-357.87,"w":204,"h":342,"sec":"y2","sole":-19.06,"sx":1568,"sy":367},"ystart4":{"x":-88.73,"y":-355.76,"w":180,"h":358,"sec":"y2","sole":-1.06,"sx":1572,"sy":0},"ystart5":{"x":-97.94,"y":-357.87,"w":202,"h":360,"sec":"y2","sole":-1.06,"sx":1122,"sy":0},"ystart6":{"x":-102.81,"y":-354.7,"w":206,"h":357,"sec":"y2","sole":0,"sx":200,"sy":367},"ysitd1":{"x":-127.34,"y":-360.93,"w":260,"h":362,"sec":"y3","sole":0,"sx":191,"sy":0},"ysitd2":{"x":-105.41,"y":-336.48,"w":235,"h":337,"sec":"y3","sole":0,"sx":1345,"sy":0},"ysitd3":{"x":-123.12,"y":-322.14,"w":239,"h":323,"sec":"y3","sole":0,"sx":888,"sy":367},"ysitd4":{"x":-113.85,"y":-321.3,"w":239,"h":322,"sec":"y3","sole":0,"sx":1619,"sy":367},"ystand1":{"x":-108.26,"y":-322.26,"w":248,"h":323,"sec":"y3","sole":0,"sx":1131,"sy":367},"ystand2":{"x":-116.65,"y":-317.22,"w":237,"h":318,"sec":"y3","sole":0,"sx":0,"sy":703},"ystand3":{"x":-116.65,"y":-322.26,"w":232,"h":323,"sec":"y3","sole":0.84,"sx":1383,"sy":367},"ystand4":{"x":-93.15,"y":-357.51,"w":195,"h":358,"sec":"y3","sole":0.84,"sx":1146,"sy":0},"ydoze1":{"x":-95.07,"y":-328.28,"w":193,"h":329,"sec":"y3","sole":0.81,"sx":451,"sy":367},"ydoze2":{"x":-121.88,"y":-325.03,"w":236,"h":326,"sec":"y3","sole":0,"sx":648,"sy":367},"ydoze3":{"x":-110.51,"y":-330.71,"w":223,"h":332,"sec":"y3","sole":0.81,"sx":0,"sy":367},"ydoze4":{"x":-111.32,"y":-329.9,"w":220,"h":331,"sec":"y3","sole":0,"sx":227,"sy":367},"ylie1":{"x":-149.69,"y":-331.97,"w":267,"h":333,"sec":"y3","sole":1.02,"sx":1584,"sy":0},"ylie2":{"x":-143.58,"y":-316.69,"w":304,"h":318,"sec":"y3","sole":0,"sx":241,"sy":703},"ylie3":{"x":-210.79,"y":-267.81,"w":366,"h":269,"sec":"y3","sole":1.02,"sx":549,"sy":703},"ylie4":{"x":-234.21,"y":-243.38,"w":389,"h":244,"sec":"y3","sole":0,"sx":919,"sy":703},"ysleepy1":{"x":-106.66,"y":-361.56,"w":213,"h":362,"sec":"y3","sole":-0.78,"sx":455,"sy":0},"ysleepy2":{"x":-77.1,"y":-361.56,"w":187,"h":363,"sec":"y3","sole":-0.78,"sx":0,"sy":0},"ysleepy3":{"x":-102.27,"y":-357.64,"w":217,"h":359,"sec":"y3","sole":-0.78,"sx":672,"sy":0},"ysleepy4":{"x":-125.8,"y":-357.64,"w":249,"h":359,"sec":"y3","sole":0,"sx":893,"sy":0},"yptup1":{"x":-110.74,"y":-361.62,"w":227,"h":363,"sec":"y4","sole":-0.81,"sx":688,"sy":0},"yptup2":{"x":-130.39,"y":-361.62,"w":241,"h":363,"sec":"y4","sole":-0.81,"sx":919,"sy":0},"yptup3":{"x":-106.39,"y":-364.85,"w":230,"h":366,"sec":"y4","sole":-0.81,"sx":227,"sy":0},"yptup4":{"x":-100.11,"y":-367.26,"w":223,"h":369,"sec":"y4","sole":0,"sx":0,"sy":0},"yptr1":{"x":-95.84,"y":-361.07,"w":195,"h":362,"sec":"y4","sole":0,"sx":1595,"sy":0},"yptr2":{"x":-93.36,"y":-360.24,"w":247,"h":361,"sec":"y4","sole":0.83,"sx":444,"sy":373},"yptr3":{"x":-92.54,"y":-361.07,"w":241,"h":362,"sec":"y4","sole":0,"sx":1794,"sy":0},"yptr4":{"x":-96.67,"y":-360.24,"w":250,"h":361,"sec":"y4","sole":0,"sx":695,"sy":373},"yptl1":{"x":-94.06,"y":-361.26,"w":194,"h":362,"sec":"y4","sole":0.83,"sx":0,"sy":373},"yptl2":{"x":-144,"y":-358.76,"w":255,"h":360,"sec":"y4","sole":0,"sx":1208,"sy":373},"yptl3":{"x":-145.67,"y":-359.59,"w":254,"h":360,"sec":"y4","sole":0.83,"sx":1467,"sy":373},"yptl4":{"x":-150.66,"y":-360.42,"w":255,"h":361,"sec":"y4","sole":0,"sx":949,"sy":373},"ynod1":{"x":-89.01,"y":-362.38,"w":184,"h":363,"sec":"y4","sole":-1.59,"sx":1164,"sy":0},"ynod2":{"x":-116.34,"y":-362.38,"w":223,"h":364,"sec":"y4","sole":-0.79,"sx":461,"sy":0},"ynod3":{"x":-125.72,"y":-361.59,"w":239,"h":363,"sec":"y4","sole":-0.79,"sx":1352,"sy":0},"ynod4":{"x":-134.38,"y":-360.79,"w":242,"h":362,"sec":"y4","sole":-0.79,"sx":198,"sy":373},"yheel1":{"x":-105.99,"y":-356.45,"w":216,"h":357,"sec":"y5","sole":0,"sx":0,"sy":731},"yheel2":{"x":-48.72,"y":-390.64,"w":249,"h":338,"sec":"y5","sole":-54.71,"sx":220,"sy":731},"yheel3":{"x":-112.83,"y":-381.24,"w":251,"h":360,"sec":"y5","sole":-23.93,"sx":1262,"sy":366},"yheel4":{"x":-130.78,"y":-361.58,"w":269,"h":362,"sec":"y5","sole":0,"sx":0,"sy":0},"yshy1":{"x":-126.46,"y":-359.85,"w":214,"h":361,"sec":"y5","sole":0,"sx":1814,"sy":0},"yshy2":{"x":-131.55,"y":-359.01,"w":224,"h":360,"sec":"y5","sole":0.85,"sx":1517,"sy":366},"yshy3":{"x":-135.79,"y":-360.7,"w":255,"h":362,"sec":"y5","sole":0,"sx":273,"sy":0},"yshy4":{"x":-133.25,"y":-360.7,"w":257,"h":362,"sec":"y5","sole":0,"sx":532,"sy":0},"ycur1":{"x":-131.41,"y":-361.38,"w":211,"h":362,"sec":"y5","sole":0,"sx":793,"sy":0},"ycur2":{"x":-138.99,"y":-359.69,"w":233,"h":361,"sec":"y5","sole":0.84,"sx":0,"sy":366},"ycur3":{"x":-137.31,"y":-359.69,"w":227,"h":361,"sec":"y5","sole":0,"sx":237,"sy":366},"ycur4":{"x":-139.83,"y":-358.85,"w":259,"h":360,"sec":"y5","sole":0,"sx":1745,"sy":366},"ylook1":{"x":-107.77,"y":-360.05,"w":203,"h":361,"sec":"y5","sole":0.8,"sx":468,"sy":366},"ylook2":{"x":-91.01,"y":-360.05,"w":184,"h":361,"sec":"y5","sole":0,"sx":675,"sy":366},"ylook3":{"x":-90.21,"y":-360.05,"w":202,"h":361,"sec":"y5","sole":0,"sx":863,"sy":366},"ylook4":{"x":-77.44,"y":-360.85,"w":180,"h":362,"sec":"y5","sole":0,"sx":1008,"sy":0},"ygig1":{"x":-98.94,"y":-359.79,"w":189,"h":361,"sec":"y5","sole":0,"sx":1069,"sy":366},"ygig2":{"x":-80.13,"y":-361.42,"w":183,"h":362,"sec":"y5","sole":0,"sx":1192,"sy":0},"ygig3":{"x":-87.49,"y":-361.42,"w":209,"h":362,"sec":"y5","sole":0,"sx":1379,"sy":0},"ygig4":{"x":-100.58,"y":-361.42,"w":218,"h":362,"sec":"y5","sole":0,"sx":1592,"sy":0},"ywalkf1":{"x":-110.75,"y":-359.98,"w":212,"h":359,"sec":"y6","sole":-3.15,"sx":893,"sy":369},"ywalkf2":{"x":-98.7,"y":-359.98,"w":213,"h":358,"sec":"y6","sole":-4.73,"sx":1292,"sy":369},"ywalkf3":{"x":-108.15,"y":-359.98,"w":213,"h":362,"sec":"y6","sole":-0.79,"sx":1035,"sy":0},"ywalkf4":{"x":-100.75,"y":-359.98,"w":212,"h":360,"sec":"y6","sole":-2.36,"sx":224,"sy":369},"yteet1":{"x":-114.97,"y":-363.37,"w":278,"h":365,"sec":"y6","sole":0,"sx":0,"sy":0},"yteet2":{"x":-107.17,"y":-363.37,"w":241,"h":365,"sec":"y6","sole":-0.84,"sx":282,"sy":0},"yteet3":{"x":-110.1,"y":-363.37,"w":269,"h":365,"sec":"y6","sole":0,"sx":527,"sy":0},"yteet4":{"x":-111.03,"y":-361.7,"w":231,"h":363,"sec":"y6","sole":0,"sx":800,"sy":0},"yphone1":{"x":-116.42,"y":-359.98,"w":225,"h":360,"sec":"y6","sole":-1.49,"sx":440,"sy":369},"yphone2":{"x":-79.6,"y":-358.49,"w":179,"h":359,"sec":"y6","sole":-1.49,"sx":1109,"sy":369},"yphone3":{"x":-114.63,"y":-356.25,"w":211,"h":358,"sec":"y6","sole":-0.75,"sx":1509,"sy":369},"yphone4":{"x":-131.69,"y":-353.27,"w":241,"h":355,"sec":"y6","sole":-0.75,"sx":0,"sy":735},"ytrip1":{"x":-123.9,"y":-360,"w":258,"h":358,"sec":"y6","sole":-4.3,"sx":1724,"sy":369},"ytrip2":{"x":-172.53,"y":-285.25,"w":278,"h":284,"sec":"y6","sole":-3.44,"sx":489,"sy":735},"ytrip3":{"x":-126.73,"y":-310.17,"w":240,"h":310,"sec":"y6","sole":-2.58,"sx":245,"sy":735},"ytrip4":{"x":-87.04,"y":-360,"w":196,"h":362,"sec":"y6","sole":-0.86,"sx":1252,"sy":0},"ybreath1":{"x":-111.27,"y":-359.99,"w":225,"h":362,"sec":"y6","sole":-0.8,"sx":1452,"sy":0},"ybreath2":{"x":-110.79,"y":-359.99,"w":223,"h":362,"sec":"y6","sole":-0.8,"sx":1681,"sy":0},"ybreath3":{"x":-109.67,"y":-359.99,"w":220,"h":362,"sec":"y6","sole":-0.8,"sx":0,"sy":369},"ybreath4":{"x":-109.75,"y":-358.39,"w":220,"h":360,"sec":"y6","sole":0,"sx":669,"sy":369}},"extra":{"rig":{"hipN":[-4.97,-74.22],"farOff":[29.84,-4.59],"ankle":[-4.97,-33.28],"heel":[-27.55,-0.77],"toe":[36.34,-0.77],"shoulderN":[-14.54,-164.89],"shoulderF":[54.33,-140.14]},"turn":["r01_u0","r02_tA","r03_u1","r04_t1","r05_u2","r06_tB","r07_u3","r08_t2","r09_u4","r10_tC","r11_u5","r12_t3","r13_u6","r14_tD","r15_u7","r16_t4","r17_u8","r18_tE","r19_u9","r20_t5","r21_u10","r22_tF","r23_u11","r24_t6","r25_u12","r26_tG","r27_u13","r28_t7","r29_u14","r30_tH","r31_u15"]}};
const BASE = (document.currentScript && document.currentScript.src || location.href).replace(/[^/]*$/, '');
// phones draw him at ~60 px: they get half-resolution sheets (same layout, the CSS background-size scales them)
const MOBRES = innerWidth < 760;
for (const k in M.sections) M.sections[k].src = BASE + 'assets/' + M.sections[k].src.split('/').pop().replace(/\.webp$/, MOBRES ? '_m.webp' : '.webp');
const L = M.frames, X = M.extra, TURN = X.turn, R = X.rig;
// ---- speech pools (Miguel's approved lines). ph(cat) rotates them by context and never repeats the line just said
const PH = {
  greet: ['¡Hola, soy Happy!', '¡Hola!', '¡Hola de nuevo!', '¡Aquí estoy otra vez!', '¡Volví!', '¿Me extrañaste?', '¡Bienvenido a Happy Foot!', '¡Qué bueno verte!', '¡Pasa, pasa!', '¡Te estaba esperando!', '¡Hoy es un gran día para tus pies!', '¡Hola, amigo!'],
  wa: ['Contáctanos aquí', '¡Reserva tu cita!', '¡Escríbenos!', '¿Agendamos?', '¡Un mensaje y listo!', '¡Aquí te atendemos!', '¡Separa tu cita hoy!', '¿Tienes dudas? ¡Escríbenos!', '¡Toca aquí!', '¡Es fácil, solo escribe!', '¡Te esperamos!', '¡Pide tu cita aquí!'],
  svc: ['¡Somos especialistas!', '¡Mira esto!', 'Tus pies en buenas manos', '¡Uñas sanas, pies felices!', '¡Mira nuestros servicios!', '¡Este es para ti!', '¡Cuidamos tus pies!', '¿Pies cansados?', '¡Conoce el tratamiento!', '¡Aquí está la solución!'],
  photo: ['¡Te veo!', '¡Qué cambio!', '¡Mira el antes y después!', '¡Wow!', '¡Increíble!', '¡Casos reales!', '¡Mira qué resultado!', '¡Así quedó!', '¡Pies felices!', '¡Esto me encanta!', '¡Qué orgullo!', '¡Tú también puedes!'],
  testi: ['¡Lee lo que dicen!', '¡Pacientes felices!', '¡Gracias por confiar!', '¡Qué lindas palabras!', '¡Eso nos alegra!', '¡Me emociono!'],
  menu: ['¿Quieres más información?', '¡Explora aquí!', '¿Te ayudo a buscar?', '¡Por aquí!', '¡Mira el menú!'],
  more: ['¡Hay más cosas!', '¡Sigue bajando!', '¡Aún hay más!', '¡Descubre más!', '¡Ven, te muestro!'],
  sede: ['¡Conoce nuestras sedes!', '¿Cuál te queda cerca?', '¡Te esperamos!', '¡Ven a vernos!'],
  quiet: ['¿Sigues ahí?', '¿Hola? ¿Hay alguien?', 'Mmm… ¿qué miramos?', 'Te espero aquí', '¡Despierta!'],
  drowsy: ['Voy a descansar un ratito…', '¡Ay, qué sueño!', '*bostezo*', 'Relax…'],
  sleep: ['Zzz…', 'Contando ovejitas…'],
  wake: ['¡Uy, me dormí!', '¡Ya desperté!', '¡Hola de nuevo!'],
  fast: ['¡Espérame!', '¡Qué rápido!', '¡Ya llegué!', '¡Uf, casi no llego!', '¡Wiii!', '¡Más despacio!', '¡Uy, qué rápido!'],
  social: ['¡Síguenos!', '¡Míranos en Instagram!', '¡Síguenos en redes!'],
  foot: ['¡Gracias por visitarnos!', '¡Hasta pronto!', '¡Vuelve pronto!', '¡Chau, chau!', '¡Llegaste al final!', '¡Nos vemos!', '¡Cuida tus pies!', '¡Un abrazo!', '¡Fue un gusto!'],
  top: ['¡Vuelve arriba!', '¡Sube conmigo!']
};
let lastSaid = ''; const phLast = {};
function ph(cat, ...extra) { const all = [...new Set([...(PH[cat] || []), ...extra])], pool = all.filter(t => t !== lastSaid && t !== phLast[cat]);
  const t = pool.length ? pool[Math.floor(Math.random() * pool.length)] : all[0]; phLast[cat] = t; return t; }
// the very first appearance of a browser session introduces himself; afterwards he greets with the rotating lines
function hello() { if (SS) { try { if (!SS.getItem('hf-hi')) { SS.setItem('hf-hi', '1'); return '¡Hola, soy Happy!'; } } catch (e) { } } else if (!hello.done) { hello.done = 1; return '¡Hola, soy Happy!'; } return ph('greet'); }

const LS = (() => { try { return localStorage; } catch (e) { return null; } })(), SS = (() => { try { return sessionStorage; } catch (e) { return null; } })();
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const TF = DEMO ? 0.45 : 1;
const el = (tag, cls, parent, css) => { const e = document.createElement(tag); if (cls) e.className = cls; if (css) Object.assign(e.style, css); if (parent) parent.appendChild(e); return e; };
const spr = (id, parent, cls, piv) => { const d = L[id], S = M.sections[d.sec], px = piv ? piv[0] : 0, py = piv ? piv[1] : 0;
  return el('div', 'hfh-s ' + (cls || ''), parent, { left: (d.x - px) + 'px', top: (d.y - py) + 'px', width: d.w + 'px', height: d.h + 'px',
    backgroundImage: `url(${S.src})`, backgroundPosition: `${-d.sx}px ${-d.sy}px`, backgroundSize: `${S.w}px ${S.h}px` }); };
const pv = (id, parent, p) => { const w = el('div', 'hfh-pv', parent, { left: p[0] + 'px', top: p[1] + 'px' }); spr(id, w, '', p); return w; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const rnd = (a, b) => a + Math.random() * (b - a);

// ---------------------------------------------------------------- DOM
const root = el('div', 'hfh', null); root.setAttribute('aria-hidden', 'true');
const size = el('div', 'hfh-size', root), mover = el('div', 'hfh-mover', size);
const shadow = el('div', 'hfh-shadow', mover);
const bubble = el('div', 'hfh-bubble', mover), drops = [...Array(8)].map(() => el('div', 'hfh-drop', mover));
const fx = el('div', 'hfh-fx', mover), flash = el('div', 'hfh-flash', fx), ring = el('div', 'hfh-ring', fx);
const slines = [...Array(12)].map(() => el('div', 'hfh-sline', fx)), spks = [...Array(8)].map((_, i) => el('div', 'hfh-spk ' + ['y', 'c', 'w'][i % 3], fx));
const bob = el('div', 'hfh-w', mover), shake = el('div', 'hfh-w', bob), breath = el('div', 'hfh-w', shake), pop = el('div', 'hfh-w', breath);
const qmark = el('div', 'hfh-q', mover); qmark.textContent = '?';
const zzz = [0, 1, 2].map(i => { const z = el('div', 'hfh-z', mover); z.textContent = 'z'; return z; });
const spark = el('div', 'hfh-spark', mover); spark.textContent = '✦';
const excl = el('div', 'hfh-q hfh-x', mover); excl.textContent = '!';
const ladder = el('div', 'hfh-ladder', null); size.insertBefore(ladder, mover); ladder.style.backgroundImage = `url(${BASE}assets/ladder.webp)`;
const pbox = el('div', 'hfh-pbox', size), PKS = {};
const say = el('div', 'hfh-say', root);
const P = {};
const fw = P.fw = el('div', 'hfh-pose', pop);
const armRotW = el('div', 'hfh-pv0', fw);
const A = L.fw_armR, arm = spr('fw_armR', armRotW); arm.style.transformOrigin = (A.pivot[0] - A.x) + 'px ' + (A.pivot[1] - A.y) + 'px';
spr('fw_body', fw);
const arms = { W: spr('fw_socket', fw), 1: spr('fw_arm1', fw), D: spr('fw_armD', fw), 2: spr('fw_arm2', fw), 3: spr('fw_arm3', fw) };
const legs = { 0: spr('fw_leg0', fw), 1: spr('fw_leg1', fw), 2: spr('fw_leg2', fw) };
const mouths = { open: spr('fw_mouth', fw), half: spr('fwx_mouth_half', fw), closed: spr('fwx_mouth_closed', fw), o: spr('fwx_mouth_o', fw), big: spr('fwx_mouth_big', fw) };
const eyes = { open: null, half: spr('fwx_eyeshalf', fw), shut: spr('fwx_eyesclosed', fw) };
// lazy groups are attached when their sheet is decoded
const lazyBuilt = {};
const SEQF = { hop: ['hop1', 'hop2', 'hop3', 'hop4'], fun: ['dance1', 'dance2', 'dance3', 'dance4', 'clap1', 'clap2', 'clap3', 'clap4', 'surprise1', 'surprise2', 'surprise3', 'surprise4'], rest: ['sit1', 'sit2', 'sit3'] };
const PSEC = { react: ['think', 'surprised', 'gasp', 'idea', 'chin', 'shy', 'heart', 'jump', 'cheer', 'open_arms', 'wave_hi', 'point_front', 'run'],
  props: ['magnifier', 'clipboard', 'megaphone', 'book'], seat: ['seat_point', 'seat_rest', 'sit_cheeks', 'sit_cheer', 'zen'], lie: ['lie_sleep', 'lie_chin'] };
// idle action sequences drawn in batches (gen10): played frame by frame from the front pose and back, only where every frame fits free
const XSEQ = { wave2: [['wave4', 'wave1', 'wave4'], 1, 260], stretch: [['stretch1', 'stretch2', 'stretch3', 'stretch4'], 1, 330, '@drowsy'], laugh: [['laugh1', 'laugh2', 'laugh1', 'laugh2', 'laugh3', 'laugh4'], 1, 210],
  march: [['march1', 'march2', 'march3', 'march4'], 3, 170], shrug: [['shrug1', 'shrug2', 'shrug3', 'shrug4'], 1, 250, 'Mmm…'], flex: [['flex1', 'flex2', 'flex3', 'flex4'], 1, 290],
  heart2: [['hearthands1', 'hearthands3', 'hearthands4'], 1, 400, '¡Con cariño!'], bow: [['bow1', 'bow2', 'bow4'], 1, 380, '¡Gracias!'], search: [['search1', 'search4'], 1, 650, '¿Te ayudo a buscar?'],
  thumbs2: [['thumbs1', 'thumbs2', 'thumbs3', 'thumbs4'], 1, 270], sneeze: [['sneeze1', 'sneeze2', 'sneeze3', 'sneeze4'], 1, 300], idea2: [['idea1', 'idea2', 'idea3', 'idea4'], 1, 310],
  jacks: [['jacks1', 'jacks2', 'jacks3', 'jacks4'], 2, 160], kiss: [['kiss1', 'kiss2', 'kiss3', 'kiss4'], 1, 300], scratch: [['scratch1', 'scratch2', 'scratch3', 'scratch4'], 1, 320, 'Mmm…'],
  peekaboo: [['peekaboo1', 'peekaboo2', 'peekaboo3', 'peekaboo4'], 1, 330, '¡Cucú!'], celebrate: [['celebrate1', 'celebrate2', 'celebrate3', 'celebrate4'], 1, 170, '¡Bravo!'],
  salute: [['thumbs1', 'salute2', 'salute3', 'salute4'], 1, 300], run: [['run1', 'run2', 'run3', 'run4'], 3, 120], sneak: [['sneak1', 'sneak2', 'sneak3', 'sneak4'], 1, 340],
  twist: [['twist1', 'twist2', 'twist3', 'twist4'], 2, 220], blush: [['blush1', 'blush2', 'blush3', 'blush4'], 1, 340],
  yoga: [['yoga1', 'yoga2', 'yoga3', 'yoga4'], 1, 430, 'Relax…'], dizzy: [['dizzy1', 'dizzy2', 'dizzy3', 'dizzy2', 'dizzy3', 'dizzy4'], 1, 230], pointdown: [['pointdown1', 'pointdown2', 'pointdown3', 'pointdown4'], 1, 340, '@more'],
  wait: [['wait1', 'wait2', 'wait3', 'wait2', 'wait4'], 1, 300, '@quiet'], fan: [['fan1', 'fan2', 'fan3', 'fan2', 'fan1', 'fan2', 'fan3', 'fan4'], 1, 200], invite: [['invite1', 'invite2', 'invite3', 'invite4'], 1, 340, '¡Pasa, pasa!'],
  highfive: [['highfive1', 'highfive2', 'highfive3', 'highfive4'], 1, 300], count: [['count1', 'count2', 'count3', 'count4'], 1, 380], hug: [['hug1', 'hug2', 'hug3', 'hug2', 'hug3', 'hug4'], 1, 260],
  listen: [['listen1', 'listen2', 'listen3', 'listen4'], 1, 380], rock: [['rock1', 'rock2', 'rock1', 'rock4', 'rock1'], 1, 260], cream: [['cream1', 'cream2', 'cream3', 'cream4'], 1, 420, '@svc'],
  // y1–y6 sequences ported from the live minified engine (114 frames)
  yintro: [['yintro1', 'yintro2', 'yintro3', 'yintro4'], 1, 340, '@greet'],
  ywave: [['ywave1', 'ywave2', 'ywave3', 'ywave2', 'ybye1', 'ywave3', 'ywave2', 'ywave1'], 1, 170, '@greet'],
  yexc: [['yexc1', 'yexc2', 'yexc3', 'yexc2', 'yexc3', 'yexc4'], 1, 180],
  ystart: [['ystart1', 'ystart2', 'ystart3', 'ystart4', 'ystart5', 'ystart6'], 1, 200],
  ysitrest: [['ysitd1', 'ysitd2', 'ysitd3', 'ysitd4', 'ydoze1', 'ydoze2', 'ydoze2', 'ydoze3', 'ydoze4', 'ystand1', 'ystand2', 'ystand3', 'ystand4'], 1, 190, '@drowsy'],
  ylie: [['ysitd1', 'ysitd2', 'ysitd3', 'ysitd4', 'ylie1', 'ylie2', 'ylie3', 'ylie4', 'ylie4', 'ylie3', 'ylie2', 'ylie1', 'ystand1', 'ystand2', 'ystand3', 'ystand4'], 1, 200],
  ysleepy: [['ysleepy1', 'ysleepy2', 'ysleepy3', 'ysleepy3', 'ysleepy4'], 1, 330, '@drowsy'],
  yptup: [['yptup1', 'yptup2', 'yptup3', 'yptup4', 'yptup4'], 1, 220, '@top'],
  yptr: [['yptr1', 'yptr2', 'yptr3', 'yptr4', 'yptr4'], 1, 220],
  yptl: [['yptl1', 'yptl2', 'yptl3', 'yptl4', 'yptl4'], 1, 220],
  ynod: [['ynod1', 'ynod2', 'ynod1', 'ynod2', 'ynod3', 'ynod4', 'ynod3', 'ynod4'], 1, 220],
  yheel: [['yheel1', 'yheel2', 'yheel3', 'yheel4'], 1, 180],
  yshy: [['yshy1', 'yshy2', 'yshy3', 'yshy4'], 1, 280, '@greet'],
  ycur: [['ycur1', 'ycur2', 'ycur3', 'ycur4'], 1, 300, 'Mmm…'],
  ylook: [['ylook1', 'ylook2', 'ylook3', 'ylook4'], 1, 380],
  ygig: [['ygig1', 'ygig2', 'ygig3', 'ygig4'], 1, 280],
  ywalkf: [['ywalkf1', 'ywalkf2', 'ywalkf3', 'ywalkf4'], 3, 150],
  yteet: [['yteet1', 'yteet2', 'yteet3', 'yteet4'], 1, 200],
  yphone: [['yphone1', 'yphone2', 'yphone3', 'yphone4'], 1, 330, '@wa'],
  ytrip: [['ytrip1', 'ytrip2', 'ytrip3', 'ytrip4'], 1, 240],
  ybreath: [['ybreath1', 'ybreath2', 'ybreath1', 'ybreath3', 'ybreath1', 'ybreath4', 'ybreath1'], 1, 260],
  yhopd: [['yhopd1', 'yhopd2', 'yhopd3', 'yhopd4'], 1, 200] };
const XSIT = { sitswing: [['sitswing1', 'sitswing2', 'sitswing3', 'sitswing4'], 2, 260], sitwave: [['sitwave4', 'sitwave2', 'sitwave3', 'sitwave2', 'sitwave3', 'sitwave4'], 1, 240, '¡Hola!'] };
const XSECS = Object.keys(M.sections).filter(k => /^[xy]\d+$/.test(k));
function buildLazy(sec) {
  if (lazyBuilt[sec]) return; lazyBuilt[sec] = true;
  if (/^[xy]\d+$/.test(sec)) for (const f in L) if (L[f].sec === sec) P[f] = spr(f, pop, 'hfh-pose');
  if (sec === 'turn') for (const id of TURN) P[id] = spr(id, pop, 'hfh-pose');
  if (sec === 'point') { const w = P.ptw = el('div', 'hfh-pose hfh-face', pop); P.pointLow = spr('point_low', w, 'hfh-pose'); P.point = el('div', 'hfh-pose', w); spr('point', P.point);
    P.pointEyes = { open: null, half: spr('pointx_half', P.point), shut: spr('pointx_blink', P.point) }; hideAll(P.pointEyes); P.ptw.style.opacity = 1; }
  if (sec === 'wink') { for (const k of ['ib1', 'ib2', 'ib3']) P[k] = spr(k, pop, 'hfh-pose'); P.winkOpen = spr('wink_open', pop, 'hfh-pose'); P.winkHalf = spr('wink_half', pop, 'hfh-pose');
    P.wink = el('div', 'hfh-pose', pop); spr('wink', P.wink); P.winkShut = spr('winkx_blink', P.wink); P.winkShut.style.opacity = 0; }
  if (sec === 'rest') { P.sit = el('div', 'hfh-pose', pop); spr('sit', P.sit); P.sitSleep = spr('sitx_sleep', P.sit); P.sitSleep.style.opacity = 0; if (L.i_sit) { P.i_sit = el('div', 'hfh-pose', pop); spr('i_sit', P.i_sit); } }
  if (sec === 'walk') {
    const rig = P.rig = el('div', 'hfh-pose hfh-face', pop);
    const far = R.farOff, add = (a, b) => [a[0] + b[0], a[1] + b[1]], hipF = add(R.hipN, far), ankF = add(R.ankle, far);
    const g = P.G = { hipF, ankF, far, add };
    g.armF = pv('r_armF', rig, R.shoulderF); g.shinF = pv('r_shinF', rig, hipF); g.footF = pv('r_footF', rig, ankF);
    g.shinN = pv('r_shin', rig, R.hipN); g.footN = pv('r_foot', rig, R.ankle);
    g.bodyW = el('div', 'hfh-pv', rig); spr('r_body', g.bodyW);
    g.eyes = { open: null, half: spr('r_bodyHalf', g.bodyW), shut: spr('r_bodyBlink', g.bodyW) }; hideAll(g.eyes);
    g.armN = pv('r_armN', rig, R.shoulderN);
    for (const [w, id, p] of [[g.footF, 'r_footF', ankF], [g.shinF, 'r_shinF', hipF]]) { const i = w.firstChild; i.style.left = (L[id].x + far[0] - p[0]) + 'px'; i.style.top = (L[id].y + far[1] - p[1]) + 'px'; }
  }
  if (PSEC[sec]) for (const n of PSEC[sec]) { const e = P['p_' + n] = el('div', 'hfh-pose hfh-face', pop); spr('p_' + n, e);
    for (const q of ['i_', 'i2_']) if (L[q + n]) { const b = P[q + n] = el('div', 'hfh-pose hfh-face', pop); spr(q + n, b); } }   // drawn in-between (stand <-> pose)
  if (sec === 'seat' && L.seat_mid) P.seat_mid = spr('seat_mid', pop, 'hfh-pose');
  if (sec === 'hop' || sec === 'fun' || sec === 'rest') for (const f of SEQF[sec]) if (L[f]) P[f] = spr(f, pop, 'hfh-pose');
  if (sec === 'walk2') for (const n of ['fwalk_a', 'fwalk_b', 'bwalk_a', 'bwalk_b', 'back_reach']) if (L[n]) P[n] = spr(n, pop, 'hfh-pose');
  if (sec === 'peek') for (const n of ['peek', 'peek2', 'ledge']) { const w = PKS['p_' + n] = el('div', 'hfh-pv', pbox); spr('p_' + n, w); w.style.opacity = 0; }
  if (sec === 'climb') { const c = P.climb = el('div', 'hfh-pose', pop), g = P.C = {};      // back-view climbing rig cut from Miguel's back view
    g.legL = pv('c_legL', c, L.c_legL.pivot); g.legR = pv('c_legR', c, L.c_legR.pivot); g.body = el('div', 'hfh-pv', c); spr('c_body', g.body);
    g.armL = pv('c_armL', c, L.c_armL.pivot); g.armR = pv('c_armR', c, L.c_armR.pivot); }
  for (const k in P) if (P[k] && P[k].classList && P[k].classList.contains('hfh-pose') && k !== cur.pose && P[k] !== P.ptw && P[k].parentNode === pop) P[k].style.opacity = 0;
  if (P.ptw && cur.pose !== 'pointLow' && cur.pose !== 'point') { P.pointLow.style.opacity = 0; P.point.style.opacity = 0; }
}
function hideAll(o) { for (const k in o) if (o[k]) o[k].style.opacity = 0; }
hideAll(arms); arms[3].style.opacity = 1; armRotW.style.opacity = 0; hideAll(legs); legs[0].style.opacity = 1;
hideAll(mouths); mouths.open.style.opacity = 1; hideAll(eyes);

// ---------------------------------------------------------------- state
const cur = { seated: false, fixed: false, pose: 'fw', arm: '3', mouth: 'open', x: 0, y: 0, visible: false, busy: false, hiding: false, face: 1, spot: null, sitting: false, sleeping: false };
const anyPose = id => P[id];
function setPose(id) {                       // hard swap, inline (outside clips)
  for (const k in P) { const e = P[k]; if (!e || !e.classList || !e.classList.contains('hfh-pose')) continue; if (e === P.ptw) continue; e.style.opacity = k === id ? 1 : 0; }
  if (P.ptw) P.ptw.style.opacity = 1;
  cur.pose = id;
}
function setArm(k) { for (const a in arms) arms[a].style.opacity = a === k ? 1 : 0; armRotW.style.opacity = k === 'W' ? 1 : 0; cur.arm = k; }

// ---------------------------------------------------------------- clip engine (one-shot WAAPI timelines, committed at the end)
let clipAnims = [], clipToken = 0, epoch = 0;
function clip(dur, build) {
  if (clipAnims.length) abortClip();
  const token = ++clipToken; const as = [];
  const tl = (e, frames, ease) => { if (!e) return; frames = frames.slice().sort((a, b) => a[0] - b[0]);
    const kf = frames.map(([t, p]) => Object.assign({ offset: Math.min(1, Math.max(0, t / dur)) }, p));
    if (kf[0].offset > 0) kf.unshift(Object.assign({}, frames[0][1], { offset: 0 }));
    if (kf[kf.length - 1].offset < 1) kf.push(Object.assign({}, frames[frames.length - 1][1], { offset: 1 }));
    const a = e.animate(kf, { duration: dur, fill: 'forwards' }); as.push([a, e]); };
  // flipbook over a set of elements: exactly one visible at a time (hard cuts, no crossfade)
  const flip = (els, sched, start) => { for (const k in els) { const e = els[k]; if (!e) continue; let vis = k === start; if (!vis && !sched.some(q => q[1] === k) && e.style.opacity === '0') continue; const f = [[0, { opacity: vis ? 1 : 0 }]];
      for (const [t, s] of sched) { const on = s === k; if (on !== vis) { f.push([Math.max(0, t - 0.5), { opacity: vis ? 1 : 0 }], [t, { opacity: on ? 1 : 0 }]); vis = on; } }
      tl(e, f); } };
  build(tl, flip);
  clipAnims = as.map(x => x[0]);
  return Promise.all(as.map(([a]) => a.finished.catch(() => 0))).then(() => {
    if (token !== clipToken) return false;
    for (const [a, e] of as) { try { a.commitStyles(); } catch (err) { } a.cancel(); }
    clipAnims = []; return true; });
}
function abortClip() { clipToken++; for (const a of clipAnims) { try { a.commitStyles(); } catch (e) { } a.cancel(); } clipAnims = []; }
const poseEls = () => { const o = {}; for (const k in P) { const e = P[k]; if (e && e.classList && e.classList.contains('hfh-pose') && e !== P.ptw) o[k] = e; } return o; };
const tr = (y, sx, sy) => `translateY(${y}px) scale(${sx},${sy})`;
const squashF = (t, k = 1) => [[t - 40, { transform: tr(0, 1, 1) }], [t + 30, { transform: tr(0, 1 + .07 * k, 1 - .08 * k) }],
  [t + 120, { transform: tr(0, 1 - .04 * k, 1 + .05 * k) }], [t + 220, { transform: tr(0, 1 + .01 * k, 1 - .01 * k) }], [t + 300, { transform: tr(0, 1, 1) }]];
const blinkSeq = (b, h1 = 40, sh = 80, h2 = 45) => [[b, 'half'], [b + h1, 'shut'], [b + h1 + sh, 'half'], [b + h1 + sh + h2, 'open']];
const LOWER = t => [[t, '1'], [t + 65, 'D'], [t + 130, '2'], [t + 195, '3']];
const RAISE = t => [[t, '2'], [t + 65, 'D'], [t + 130, '1'], [t + 195, 'W']];
let waveLoop = null;
function startWaveLoop() { if (waveLoop) return; waveLoop = arm.animate([{ transform: 'rotate(-16deg)' }, { transform: 'rotate(11deg)' }], { duration: 300, direction: 'alternate', iterations: Infinity, easing: 'ease-in-out' }); }
function stopWaveLoop() { if (waveLoop) { waveLoop.cancel(); waveLoop = null; } }
let breathLoop = null;
function startBreath(slow) { if (breathLoop) breathLoop.cancel(); breathLoop = breath.animate([{ transform: 'scale(1,1)' }, { transform: slow ? 'scale(.99,1.03)' : 'scale(.988,1.022)' }], { duration: slow ? 2100 : 1300, direction: 'alternate', iterations: Infinity, easing: 'ease-in-out' }); }

// burst FX (entrance and poof); scale s
function burst(tl, BU, s = 1, withBubble = true) {
  if (withBubble) tl(bubble, [[0, { transform: 'scale(0)', opacity: 0 }], [40, { transform: 'scale(.15)', opacity: 1, easing: 'cubic-bezier(.2,.8,.3,1.3)' }],
    [220, { transform: 'scale(1,1)', opacity: 1, easing: 'ease-in-out' }], [275, { transform: 'scale(1.07,.93)', opacity: 1, easing: 'ease-in-out' }],
    [325, { transform: 'scale(.94,1.06)', opacity: 1, easing: 'ease-in' }], [BU - 5, { transform: 'scale(.84,.84)', opacity: 1, easing: 'cubic-bezier(.1,.8,.3,1)' }],
    [BU + 55, { transform: 'scale(1.3)', opacity: 0 }], [BU + 60, { transform: 'scale(0)', opacity: 0 }]]);
  tl(flash, [[BU - 8, { transform: `scale(${.25 * s})`, opacity: 0 }], [BU + 6, { transform: `scale(${.85 * s})`, opacity: 1, easing: 'cubic-bezier(.2,.7,.3,1)' }],
    [BU + 70, { transform: `scale(${1.2 * s})`, opacity: .55, easing: 'ease-out' }], [BU + 170, { transform: `scale(${1.35 * s})`, opacity: 0 }], [BU + 175, { transform: 'scale(0)', opacity: 0 }]]);
  tl(ring, [[BU - 4, { transform: `scale(${.35 * s})`, opacity: 0 }], [BU + 10, { transform: `scale(${.55 * s})`, opacity: 1, easing: 'cubic-bezier(.15,.8,.3,1)' }],
    [BU + 230, { transform: `scale(${1.9 * s})`, opacity: 0 }], [BU + 235, { transform: 'scale(0)', opacity: 0 }]]);
  slines.forEach((l, i) => { const a = i * 30 + (i % 2) * 11, r0 = (120 + (i % 3) * 10) * s, r1 = (250 + (i % 3) * 30) * s, d = BU + 6 + (i % 3) * 12;
    tl(l, [[d - 6, { transform: `rotate(${a}deg) translateY(${-r0}px) scaleY(.2)`, opacity: 0 }],
      [d + 20, { transform: `rotate(${a}deg) translateY(${-r0 - 40 * s}px) scaleY(1)`, opacity: 1, easing: 'cubic-bezier(.2,.7,.4,1)' }],
      [d + 190, { transform: `rotate(${a}deg) translateY(${-r1}px) scaleY(.3)`, opacity: 0 }], [d + 195, { transform: 'scale(0)', opacity: 0 }]]); });
  spks.forEach((k, i) => { const a = (i / 8) * Math.PI * 2 + .4, r = (165 + (i % 3) * 45) * s, sc = .8 + (i % 3) * .25, d = BU + 15 + (i % 4) * 14;
    const x = Math.cos(a) * r, y = Math.sin(a) * r * .85;
    tl(k, [[d - 10, { transform: 'translate(0px,0px) scale(0) rotate(0deg)', opacity: 0 }],
      [d + 60, { transform: `translate(${x * .7}px,${y * .7}px) scale(${sc * 1.25}) rotate(45deg)`, opacity: 1, easing: 'cubic-bezier(.2,.8,.3,1)' }],
      [d + 300, { transform: `translate(${x}px,${y + 22}px) scale(0) rotate(150deg)`, opacity: 0 }]]); });
  if (withBubble) drops.forEach((d, i) => { const a = i / drops.length * Math.PI * 2 + .3, r = 240 + (i % 3) * 30;
    tl(d, [[BU, { transform: 'translate(0px,0px) scale(.4)', opacity: 0 }], [BU + 10, { transform: `translate(${Math.cos(a) * 150}px,${Math.sin(a) * 150}px) scale(1)`, opacity: 1, easing: 'cubic-bezier(.1,.7,.3,1)' }],
      [BU + 260, { transform: `translate(${Math.cos(a) * r}px,${Math.sin(a) * r + 50}px) scale(.3)`, opacity: 0 }], [BU + 265, { transform: 'scale(0)', opacity: 0 }]]); });
}
const shakeF = BU => [[0, { transform: 'translate(0px,0px) rotate(0deg)' }], [BU + 112, { transform: 'translate(0px,0px) rotate(0deg)' }],
  [BU + 140, { transform: 'translate(6px,1px) rotate(1.4deg)' }], [BU + 170, { transform: 'translate(-5px,0px) rotate(-1.1deg)' }],
  [BU + 200, { transform: 'translate(3px,0px) rotate(.6deg)' }], [BU + 230, { transform: 'translate(-1.5px,0px) rotate(-.3deg)' }], [BU + 260, { transform: 'translate(0px,0px) rotate(0deg)' }]];

// ---------------------------------------------------------------- actions
const ACT = {};
ACT.entrance = () => { setPose('fw'); setArm('W'); startWaveLoop(); const BU = 400;
  return clip(800, (tl) => { burst(tl, BU, 1, true);
    tl(pop, [[0, { transform: tr(-168, .12, .12) }], [220, { transform: tr(-118, .42, .42), easing: 'ease-in-out' }],
      [275, { transform: tr(-116, .45, .39), easing: 'ease-in-out' }], [325, { transform: tr(-120, .39, .45), easing: 'ease-in' }],
      [BU - 5, { transform: tr(-112, .34, .32), easing: 'cubic-bezier(.3,0,.6,1)' }], [BU + 60, { transform: tr(-40, .82, 1.28), easing: 'cubic-bezier(.4,0,1,1)' }],
      [BU + 115, { transform: tr(0, 1.26, .76), easing: 'cubic-bezier(.2,.8,.4,1)' }], [BU + 185, { transform: tr(-14, .9, 1.12), easing: 'ease-in-out' }],
      [BU + 255, { transform: tr(0, 1.07, .95), easing: 'ease-in-out' }], [BU + 315, { transform: tr(0, .98, 1.02), easing: 'ease-in-out' }], [BU + 365, { transform: tr(0, 1, 1) }]]);
    tl(shake, shakeF(BU));
    tl(shadow, [[0, { transform: 'scale(.2)', opacity: 0 }], [400, { transform: 'scale(.45)', opacity: .35, easing: 'ease-in' }], [515, { transform: 'scale(1.18)', opacity: 1 }], [620, { transform: 'scale(.97)', opacity: 1 }], [700, { transform: 'scale(1)', opacity: 1 }]]);
  }).then(() => { ACT.say(hello(), 1900, '¡Hola!'); return ACT.talkWave(1700); }); };
// quick re-appear (after poof / on a new page)
ACT.poofIn = (quiet) => { setPose(cur.sitting ? 'sit' : 'fw'); if (!cur.sitting) setArm('3'); hideAll(mouths); mouths.open.style.opacity = 1; const BU = 25;
  return clip(320, (tl) => { if (!quiet) burst(tl, BU, .6, false);
    tl(pop, [[0, { transform: tr(-26, .3, .3) }], [BU + 45, { transform: tr(-16, .9, 1.16), easing: 'cubic-bezier(.4,0,1,1)' }],
      [BU + 95, { transform: tr(0, 1.16, .85), easing: 'cubic-bezier(.2,.8,.4,1)' }], [BU + 165, { transform: tr(-4, .96, 1.05), easing: 'ease-in-out' }], [BU + 235, { transform: tr(0, 1.01, .99) }], [320, { transform: tr(0, 1, 1) }]]);
    tl(shadow, [[0, { transform: 'scale(.3)', opacity: 0 }], [BU + 95, { transform: 'scale(1.1)', opacity: 1 }], [300, { transform: 'scale(1)', opacity: 1 }]]);
  }); };
const W2 = () => !!(lazyBuilt.walk2 && P.fwalk_a && TURNS() && !cur.sitting);
ACT.walkIn = () => { setPose('fw'); setArm('3'); hideAll(mouths); mouths.open.style.opacity = 1; const T = 960, ST = 160;
  return clip(T, (tl, flip) => { const S = []; for (let i = 0; i < 6; i++) S.push([i * ST, i % 2 ? 'fw' : (i % 4 ? 'fwalk_b' : 'fwalk_a')]); flip(poseEls(), S, 'fw');
    const F = []; for (let i = 0; i <= 6; i++) { const u = i / 6, sc = .55 + .45 * u; F.push([i * ST, { transform: tr(i % 2 ? -5 * sc : 0, sc, sc), opacity: Math.min(1, u * 4) }]); } tl(pop, F);
    tl(shadow, [[0, { transform: 'scale(.5)', opacity: 0 }], [T, { transform: 'scale(1)', opacity: 1 }]]); }).then(ok => { pop.style.opacity = ''; return ok; }); };
ACT.walkOut = () => { stopWaveLoop(); if (sayAnim) sayAnim.cancel(); const back = [2, 4, 6, 8, 10, 12, 14], TB = back.length * 30, ST = 160, T = TB + 6 * ST;
  return clip(T, (tl, flip) => { const S = back.map((i, j) => [j * 30, tid(i * 11.25)]); for (let i = 0; i < 6; i++) S.push([TB + i * ST, i % 2 ? tid(180) : (i % 4 ? 'bwalk_b' : 'bwalk_a')]); flip(poseEls(), S, 'fw');
    const F = [[0, { transform: tr(0, 1, 1), opacity: 1 }], [TB, { transform: tr(0, 1, 1), opacity: 1 }]]; for (let i = 1; i <= 6; i++) { const u = i / 6, sc = 1 - .45 * u; F.push([TB + i * ST, { transform: tr(i % 2 ? -5 * sc : 0, sc, sc), opacity: u < .5 ? 1 : 1 - (u - .5) * 2 }]); } tl(pop, F);
    tl(shadow, [[0, { opacity: 1 }], [T, { transform: 'scale(.5)', opacity: 0 }]]); for (const z of zzz) tl(z, [[0, { opacity: 0 }]]); }).then(ok => { pop.style.opacity = ''; setPose('fw'); return ok; }); };
ACT.poofOut = () => { stopWaveLoop(); if (sayAnim) sayAnim.cancel(); const BU = 110;
  return clip(330, (tl, flip) => { burst(tl, BU, .6, false); if (cur.pose === 'fw') flip(mouths, [[0, 'o']], 'open');      // surprised 'o' as he vanishes
    tl(pop, [[0, { transform: tr(0, 1, 1) }], [90, { transform: tr(0, 1.12, .86), easing: 'ease-in' }], [BU, { transform: tr(-30, .7, 1.25), easing: 'cubic-bezier(.4,0,1,1)' }], [BU + 60, { transform: tr(-40, 0, 0) }]]);
    tl(shadow, [[0, { transform: 'scale(1)', opacity: 1 }], [BU + 40, { transform: 'scale(.3)', opacity: 0 }]]);
    for (const z of zzz) tl(z, [[0, { opacity: 0 }]]);
  }); };
ACT.blink = () => { const set = cur.pose === 'fw' ? eyes : cur.pose === 'rig' && P.G ? P.G.eyes : cur.pose === 'point' ? P.pointEyes : null;
  if (!set) return Promise.resolve(); return clip(260, (tl, flip) => flip(set, blinkSeq(10), 'open')); };
function talkSched(t0, ms) { const seq = ['o', 'big', 'half', 'closed', 'half', 'open', 'o', 'big', 'half', 'open']; const out = []; let t = t0, i = 0;
  while (t < t0 + ms - 120) { out.push([t, seq[i % seq.length]]); t += [110, 110, 40, 50, 40, 80, 110, 130, 40, 100][i % 10]; i++; } out.push([t, 'open']); return out; }
ACT.talkWave = (ms = 1600, talk = true) => { if (cur.pose !== 'fw') return Promise.resolve();
  const raise = cur.arm !== 'W'; const t0 = raise ? 200 : 0, end = t0 + ms;
  startWaveLoop();
  return clip(end + 260, (tl, flip) => { const sched = (raise ? RAISE(0) : []).concat(LOWER(end));
    flip(arms, sched, cur.arm); flip({ W: armRotW }, sched, cur.arm);
    if (talk) flip(mouths, talkSched(t0 + 150, Math.min(ms, 1300)), 'open');
    tl(pop, squashF(t0 + 40, .4));
  }).then(ok => { if (ok) { cur.arm = '3'; stopWaveLoop(); } }); };
ACT.talk = (ms = 1200) => cur.pose !== 'fw' ? Promise.resolve() : clip(ms + 100, (tl, flip) => flip(mouths, talkSched(0, ms), 'open'));
ACT.tap = () => cur.pose !== 'fw' ? Promise.resolve() : clip(700, (tl, flip) => flip(legs, [[0, '1'], [50, '2'], [170, '1'], [220, '0'], [380, '1'], [430, '2'], [550, '1'], [600, '0']], '0'));
ACT.think = () => { if (cur.pose !== 'fw') return Promise.resolve();
  return clip(2300, (tl, flip) => {
    tl(qmark, [[0, { transform: 'translate(0px,0px) scale(0) rotate(-20deg)', opacity: 0 }], [180, { transform: 'translate(0px,-10px) scale(1.25) rotate(8deg)', opacity: 1, easing: 'cubic-bezier(.2,.8,.3,1.4)' }],
      [320, { transform: 'translate(0px,-6px) scale(1) rotate(0deg)', opacity: 1 }], [900, { transform: 'translate(0px,-12px) scale(1.05) rotate(-6deg)', opacity: 1 }],
      [1500, { transform: 'translate(0px,-8px) scale(1) rotate(5deg)', opacity: 1 }], [2050, { transform: 'translate(0px,-10px) scale(1) rotate(0deg)', opacity: 1 }], [2300, { transform: 'translate(0px,-30px) scale(.4) rotate(0deg)', opacity: 0 }]]);
    tl(shake, [[0, { transform: 'rotate(0deg)' }], [260, { transform: 'rotate(-4deg)', easing: 'ease-in-out' }], [1100, { transform: 'rotate(-5deg)' }], [1300, { transform: 'rotate(3deg)', easing: 'ease-in-out' }],
      [2000, { transform: 'rotate(3.5deg)' }], [2300, { transform: 'rotate(0deg)', easing: 'ease-out' }]]);
    flip(mouths, [[200, 'closed'], [1900, 'half'], [1960, 'open']], 'open');
    flip(eyes, blinkSeq(1250), 'open');
  }); };
const TURNS = () => lazyBuilt.turn;
const tid = deg => TURN[(((Math.round(deg / 11.25)) % 32) + 32) % 32 - 1];
ACT.spin = () => { if (!TURNS() || cur.pose !== 'fw') return Promise.resolve();
  const gaps = []; for (let i = 0; i < 32; i++) { const u = Math.sin(Math.PI * i / 31); gaps.push(Math.round(48 - 14 * u)); }
  const lowerT = cur.arm === 'W' ? 0 : -1;
  return clip(1500 + 260, (tl, flip) => { const S0 = lowerT >= 0 ? 260 : 0; const S = []; let t = S0;
    for (let i = 0; i < 32; i++) { if (i) S.push([t, TURN[i - 1]]); t += gaps[i]; } S.push([t, 'fw']);
    if (lowerT >= 0) { flip(arms, LOWER(0), 'W'); flip({ W: armRotW }, LOWER(0), 'W'); }
    flip(poseEls(), S, 'fw');
    tl(pop, [[S0 + 50, { transform: tr(0, 1, 1) }], [S0 + 260, { transform: tr(-12, .97, 1.04) }], [S0 + 600, { transform: tr(-18, .96, 1.05) }], [t - 170, { transform: tr(-8, .99, 1.02) }], ...squashF(t + 10, .9)]);
    tl(shadow, [[S0 + 180, { transform: 'scale(1)' }], [S0 + 520, { transform: 'scale(.88)' }], [t, { transform: 'scale(1)' }]]);
  }).then(ok => { if (ok) { stopWaveLoop(); cur.arm = '3'; } }); };
// ---- walk (footstep planner from v3.4, generalised to any distance / direction)
function planWalk(D) {
  const g = P.G, STEP = 300, SWING = 255, NSW = Math.max(3, Math.ceil(2 * D / 62)), WD = (NSW - 1) * STEP, DT = 1000 / 60;
  const len = v => Math.hypot(v[0], v[1]), LEGL = R.ankle[1] - R.hipN[1], ease = u => u < 0 ? 0 : u > 1 ? 1 : u * u * (3 - 2 * u);
  const HX = tt => { const u = tt / WD, a = 0.18, v = 1 / (1 - a); if (u <= 0) return 0; if (u >= 1) return D;
    return D * (u < a ? v * u * u / (2 * a) : u > 1 - a ? 1 - v * (1 - u) * (1 - u) / (2 * a) : v * (u - a / 2)); };
  const HEEL = [R.heel[0] - R.ankle[0], R.heel[1] - R.ankle[1]], TOE = [R.toe[0] - R.ankle[0], R.toe[1] - R.ankle[1]];
  const rot = (v, deg) => { const r = deg * Math.PI / 180, c = Math.cos(r), s = Math.sin(r); return [v[0] * c - v[1] * s, v[0] * s + v[1] * c]; };
  const WL = { F: { swings: [] }, N: { swings: [] } };
  for (let k = 0; k < NSW; k++) { const s0 = k * STEP, leg = k % 2 ? WL.N : WL.F; leg.swings.push({ s0, s1: s0 + SWING, to: Math.min(D, HX(s0 + SWING + 130)) }); }
  const STRIKE = -14, OFF = 20, ROLL = 75, PUSH = 80, MAXA = 26, add = g.add;
  function footAt(leg, tt) { let from = 0;
    for (const s of leg.swings) {
      if (tt < s.s0 - PUSH) return [[from, R.ankle[1]], 0];
      if (tt < s.s0) { const u = ease((tt - (s.s0 - PUSH)) / PUSH), phi = OFF * u; const toe = [from + TOE[0], R.ankle[1] + TOE[1]]; return [add(toe, rot([-TOE[0], -TOE[1]], phi)), phi]; }
      if (tt < s.s1) { const u = (tt - s.s0) / SWING, e = ease(u), lift = Math.sin(Math.PI * u) * 11;
        const toe0 = [from + TOE[0], R.ankle[1] + TOE[1]], a0 = add(toe0, rot([-TOE[0], -TOE[1]], OFF));
        const heel1 = [s.to + HEEL[0], R.ankle[1] + HEEL[1]], a1 = add(heel1, rot([-HEEL[0], -HEEL[1]], STRIKE));
        return [[a0[0] + (a1[0] - a0[0]) * e, a0[1] + (a1[1] - a0[1]) * e - lift], OFF + (STRIKE - OFF) * e]; }
      if (tt < s.s1 + ROLL) { const u = ease((tt - s.s1) / ROLL), phi = STRIKE * (1 - u); const heel = [s.to + HEEL[0], R.ankle[1] + HEEL[1]]; return [add(heel, rot([-HEEL[0], -HEEL[1]], phi)), phi]; }
      from = s.to; }
    return [[from, R.ankle[1]], 0]; }
  const KF = { armF: [], armN: [], shinF: [], shinN: [], footF: [], footN: [], body: [], walk: [] };
  const tf = (x, y, r, sy) => `translate(${x.toFixed(2)}px,${y.toFixed(2)}px) rotate(${r.toFixed(2)}deg) scale(1,${(sy || 1).toFixed(4)})`;
  const DUR = WD + SWING + 2 * DT;
  for (let tt = 0; tt <= DUR; tt += DT) {
    const hx = HX(tt), [aN, pN] = footAt(WL.N, tt), [aF0, pF] = footAt(WL.F, tt);
    let hy = R.hipN[1];
    for (const [a, p] of [[aN, pN], [aF0, pF]]) { const dx = a[0] - hx; if (Math.abs(p) < 1 && a[1] >= R.ankle[1] - 0.5) hy = Math.max(hy, a[1] - Math.sqrt(Math.max(LEGL * LEGL - dx * dx, LEGL * LEGL * 0.55))); }
    const bobY = hy - R.hipN[1];
    KF.walk.push([tt, hx]); KF.body.push([tt, { transform: tf(0, bobY, 0) }]);
    const doLeg = (a, phi, isF, kS, kF) => { const hip = isF ? g.hipF : R.hipN, A0 = isF ? g.ankF : R.ankle; let ax = a[0] - hx;
      let act = [A0[0] + ax, A0[1] + (a[1] - R.ankle[1])]; const H = [hip[0], hip[1] + bobY]; let d = [act[0] - H[0], act[1] - H[1]];
      { const ang0 = Math.atan2(d[0], d[1]) * 180 / Math.PI, lim = Math.max(-MAXA, Math.min(MAXA, ang0));
        if (lim !== ang0) { const L0 = len(d), r = lim * Math.PI / 180; d = [Math.sin(r) * L0, Math.cos(r) * L0]; act = [H[0] + d[0], H[1] + d[1]]; ax = act[0] - A0[0]; } }
      KF[kS].push([tt, { transform: tf(0, bobY, -Math.atan2(d[0], d[1]) * 180 / Math.PI, len(d) / LEGL) }]);
      KF[kF].push([tt, { transform: tf(act[0] - A0[0], act[1] - A0[1], phi) }]); return ax; };
    const dxN = doLeg(aN, pN, false, 'shinN', 'footN'), dxF = doLeg(aF0, pF, true, 'shinF', 'footF');
    KF.armN.push([tt, { transform: tf(0, bobY, Math.max(-30, Math.min(30, 1.15 * dxN))) }]);
    KF.armF.push([tt, { transform: tf(0, bobY, Math.max(-25, Math.min(25, 1.0 * dxF))) }]);
  }
  return { KF, DUR };
}
// dxCss: horizontal distance in page px (sign = direction)
ACT.walkBy = (dxCss) => { if (!TURNS() || !lazyBuilt.walk || cur.pose !== 'fw') return Promise.resolve(false);
  const dir = Math.sign(dxCss) || 1, k = scaleK(), D = Math.abs(dxCss) / k; if (D < 20) return Promise.resolve(false);
  const { KF, DUR } = planWalk(D), g = P.G, QG = 40;
  P.rig.style.transform = dir < 0 ? 'scaleX(-1)' : '';
  const qDeg = i => dir > 0 ? i * 11.25 : 360 - i * 11.25;
  const lowerT = cur.arm !== '3' ? 0 : -1, Q0 = lowerT >= 0 ? 260 : 0, W0 = Q0 + 7 * QG, WEND = W0 + DUR, B0 = WEND + 60, BF = B0 + 6 * QG, END = BF + 320;
  return clip(END, (tl, flip) => {
    const S = []; for (let i = 1; i <= 7; i++) S.push([Q0 + (i - 1) * QG, tid(qDeg(i))]); S.push([W0, 'rig']);
    [6, 5, 4, 3, 2, 1].forEach((i, j) => S.push([B0 + j * QG, tid(qDeg(i))])); S.push([BF, 'fw']);
    flip(poseEls(), S, 'fw');
    if (lowerT >= 0) { flip(arms, LOWER(0), cur.arm); flip({ W: armRotW }, LOWER(0), cur.arm); }
    const sh = arr => arr.map(([t, v]) => [W0 + t, v]);
    for (const n of ['armF', 'armN', 'shinF', 'shinN', 'footF', 'footN']) tl(g[n], [[0, KF[n][0][1]], ...sh(KF[n]), [END, KF[n][KF[n].length - 1][1]]]);
    tl(g.bodyW, [[0, KF.body[0][1]], ...sh(KF.body), [END, KF.body[KF.body.length - 1][1]]]);
    tl(mover, [[0, { transform: 'translateX(0px)' }], [W0, { transform: 'translateX(0px)' }], ...KF.walk.map(([t, hx]) => [W0 + t, { transform: `translateX(${(dir * hx).toFixed(2)}px)` }]), [END, { transform: `translateX(${(dir * D).toFixed(2)}px)` }]]);
    flip(g.eyes, blinkSeq(W0 + Math.min(700, DUR * .5)), 'open');
    tl(pop, [...squashF(W0 + DUR + 40, .6), ...squashF(BF + 10, .5)].filter(f => f[0] >= 0));
  }).then(ok => { mover.style.transform = ''; if (ok) { cur.arm = '3'; stopWaveLoop(); place(cur.x + dxCss, cur.y); } return ok; }); };
ACT.thumbs = () => { if (!lazyBuilt.wink || cur.pose !== 'fw') return Promise.resolve();
  return clip(2600, (tl, flip) => { const S = [[0, 'ib1'], [50, 'ib2'], [110, 'ib3'], [180, 'winkOpen'], [290, 'winkHalf'], [360, 'wink'],
      [1700, 'winkHalf'], [1760, 'winkOpen'], [1830, 'ib3'], [1890, 'ib2'], [1950, 'ib1'], [2010, 'fw']];
    flip(poseEls(), S, 'fw'); const aS = [[2010, '1'], [2075, 'D'], [2140, '2'], [2205, '3']]; flip(arms, [[0, '3']].concat(aS), cur.arm); flip({ W: armRotW }, [[0, '3']], cur.arm);
    tl(pop, [...squashF(180, 1.1), ...squashF(2010, .4)]);
    tl(spark, [[420, { transform: 'scale(0) rotate(0deg)', opacity: 0 }], [560, { transform: 'scale(1.3) rotate(40deg)', opacity: 1 }], [760, { transform: 'scale(1) rotate(70deg)', opacity: 1 }], [1280, { transform: 'scale(.4) rotate(120deg)', opacity: 0 }]]);
  }).then(ok => { if (ok) { stopWaveLoop(); cur.arm = '3'; } }); };
ACT.point = (dir) => { if (!TURNS() || !lazyBuilt.point || cur.pose !== 'fw') return Promise.resolve();
  dir = dir || (Math.random() < .5 ? -1 : 1); P.ptw.style.transform = dir < 0 ? 'scaleX(-1)' : ''; const QG = 40, qDeg = i => dir > 0 ? i * 11.25 : 360 - i * 11.25;
  return clip(2500, (tl, flip) => { const S = []; for (let i = 1; i <= 6; i++) S.push([(i - 1) * QG, tid(qDeg(i))]); S.push([240, 'pointLow'], [310, 'point'], [1700, 'pointLow']);
    [6, 5, 4, 3, 2, 1].forEach((i, j) => S.push([1770 + j * QG, tid(qDeg(i))])); S.push([1770 + 6 * QG, 'fw']);
    flip(poseEls(), S, 'fw'); tl(pop, [...squashF(310, .8), ...squashF(1770 + 6 * QG, .5)]);
    flip(P.pointEyes, blinkSeq(1000), 'open'); }); };
ACT.sit = () => { if (!lazyBuilt.rest || cur.pose !== 'fw') return Promise.resolve();
  return clip(700, (tl, flip) => { flip(poseEls(), P.sit3 ? [[60, 'sit1'], [150, 'sit2'], [240, 'sit3'], [330, 'sit']] : P.i_sit ? [[110, 'i_sit'], [250, 'sit']] : [[200, 'sit']], 'fw');
    tl(pop, [[0, { transform: tr(0, 1, 1) }], [150, { transform: tr(0, 1.1, .88), easing: 'ease-in' }], [200, { transform: tr(-26, .92, 1.1), easing: 'ease-out' }], [330, { transform: tr(0, 1.14, .86), easing: 'ease-in' }],
      [460, { transform: tr(0, .96, 1.04) }], [580, { transform: tr(0, 1.01, .99) }], [700, { transform: tr(0, 1, 1) }]]); }).then(ok => { if (ok) { cur.sitting = true; cur.pose = 'sit'; } }); };
ACT.sleep = () => { if (cur.pose !== 'sit') return Promise.resolve(); P.sitSleep.style.opacity = 1; cur.sleeping = true; startBreath(true);
  zzz.forEach((z, i) => { z.style.opacity = 0; z._a = z.animate([{ transform: 'translate(0px,0px) scale(.5)', opacity: 0 }, { transform: 'translate(10px,-30px) scale(.9)', opacity: 1, offset: .3 }, { transform: 'translate(34px,-110px) scale(1.3)', opacity: 0 }],
    { duration: 2400, delay: i * 800, iterations: Infinity, easing: 'ease-out' }); }); return Promise.resolve(); };
ACT.wake = () => { if (!cur.sitting) return Promise.resolve(); zzz.forEach(z => { if (z._a) z._a.cancel(); z._a = null; z.style.opacity = 0; });
  if (P.sitSleep) P.sitSleep.style.opacity = 0; cur.sleeping = false; startBreath(false);
  return clip(650, (tl, flip) => { flip(poseEls(), P.sit3 ? [[60, 'sit3'], [140, 'sit2'], [220, 'sit1'], [300, 'fw']] : P.i_sit ? [[130, 'i_sit'], [270, 'fw']] : [[230, 'fw']], cur.pose); flip(arms, [[0, '3']], cur.arm);
    tl(pop, [[0, { transform: tr(0, 1, 1) }], [130, { transform: tr(0, 1.1, .9), easing: 'ease-in' }], [230, { transform: tr(-24, .9, 1.12), easing: 'ease-out' }], [360, { transform: tr(0, 1.1, .9) }], [500, { transform: tr(0, .97, 1.03) }], [650, { transform: tr(0, 1, 1) }]]);
  }).then(ok => { if (ok) { cur.sitting = false; cur.pose = 'fw'; cur.arm = '3'; } }); };

// ---------------------------------------------------------------- placement & spots
const isMobile = () => innerWidth < 760;
const scaleK = () => isMobile() ? 0.17 : (innerWidth < 1100 ? 0.31 : 0.35);
const PADS = () => isMobile() ? [15, 12] : [30, 16];          // clearance from text / photos / buttons (x, y)
function applyScale() { size.style.transform = `scale(${scaleK()})`; }
// y is the ground line = visible sole bottom (sprites are grounded on their sole; correct the sub-pixel remainder)
const SOLE = L.fw_leg0.sole || 0;
function place(x, y) { cur.x = x; cur.y = y; root.style.transform = `translate(${x.toFixed(1)}px,${(y - SOLE * scaleK()).toFixed(1)}px)`; }
let OBST = [], SPOTS = [], SEATS = [], PEEKS = [], spotsAt = 0, ROWS = new Map(), dirty = true;
function headerH() { const h = document.querySelector('.header'); return h ? h.getBoundingClientRect().height : 0; }
// the site reveals sections with a CSS `translate` transition; measure every box at its final (revealed) position
const RVS = '.reveal,.service-card,.location-card,.blog-card,.acceso-card,.ba-card,.sede-mini,.media-frame,.results-photo,.contact-form';
let rvCache = new Map();
function offY(e) { const a = e && e.closest && e.closest(RVS); if (!a) return 0; if (rvCache.has(a)) return rvCache.get(a);
  const t = getComputedStyle(a).translate; let v = 0; if (t && t !== 'none') { const q = t.split(' '); v = parseFloat(q[1] || 0) || 0; } rvCache.set(a, v); return v; }
const rectP = e => { const r = e.getBoundingClientRect(), oy = scrollY - offY(e); return { l: r.left + scrollX, r: r.right + scrollX, t: r.top + oy, b: r.bottom + oy, w: r.width, h: r.height }; };
// measurement is time-sliced (yields every ~6 ms) so it never makes a long task, and it only re-runs when the layout changed
const yieldT = () => new Promise(r => setTimeout(r, 0));
let sliceT0 = 0; const slice = async () => { if (performance.now() - sliceT0 > 6) { await yieldT(); sliceT0 = performance.now(); } };
const SOLID = 'img,picture,video,iframe,svg,canvas,input,select,textarea,button,label,a,[class*="badge"],[class*="pill"],[class*="chip"],[class*="tag"],.btn,.hero-float,.photo-frame,.media-frame,.card,[class*="card"],.trust-bar .container > *,.footer-social a';
const bgCache = new WeakMap(); let stickyEls = null;
async function collectObstacles() { rvCache = new Map(); sliceT0 = performance.now();
  const out = [], vw = innerWidth, vh = innerHeight; let i = 0;
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: n => n.nodeValue.trim() && !root.contains(n) ? 1 : 2 });
  const rg = document.createRange(); let n;
  while ((n = tw.nextNode())) { if ((++i & 31) === 0) await slice(); const pe = n.parentElement; if (!pe || pe.closest('.hfh,.header,script,style,noscript,.wa-modal,[hidden],.whatsapp-float')) continue;
    rg.selectNodeContents(n); const sx = scrollX, oy = scrollY - offY(pe); for (const r of rg.getClientRects()) if (r.width > 1 && r.height > 1) out.push([r.left + sx, r.top + oy, r.right + sx, r.bottom + oy, pe]); }
  for (const e of document.querySelectorAll(SOLID)) { if ((++i & 15) === 0) await slice();
    if (e.closest('.hfh,.header,.wa-modal,.whatsapp-float,.back-to-top') || e.closest(DECO)) continue; const r = e.getBoundingClientRect(); if (r.width < 2 || r.height < 2) continue;
    const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    const sx = scrollX, oy = scrollY - offY(e); out.push([r.left + sx, r.top + oy, r.right + sx, r.bottom + oy, e]); }
  // smaller boxes with an opaque background (cards, pills) or a background image (photos as CSS backgrounds)
  for (const e of document.querySelectorAll('main *, section *, footer *')) { if ((++i & 15) === 0) await slice(); if (e.closest('.hfh') || e.closest(DECO)) continue;
    let bk = bgCache.get(e);
    if (bk === undefined) { const cs = getComputedStyle(e), bg = cs.backgroundColor, bi = cs.backgroundImage;
      // anything you can see as a box: any tint (pills, chips, badges, quote cards), a background image or gradient, a border or a shadow
      const tinted = bg && bg !== 'transparent' && !/rgba\([^)]*,\s*0(\.0+)?\)/.test(bg), bord = ['Top', 'Right', 'Bottom', 'Left'].some(sd => parseFloat(cs['border' + sd + 'Width']) > 0 && cs['border' + sd + 'Style'] !== 'none' && !/rgba\([^)]*,\s*0(\.0+)?\)|transparent/.test(cs['border' + sd + 'Color']));
      bk = (tinted || (bi && bi !== 'none') || bord || (cs.boxShadow && cs.boxShadow !== 'none')) && cs.position !== 'fixed' ? 1 : 0; bgCache.set(e, bk); }
    if (!bk) continue; const r = e.getBoundingClientRect(); if (r.width < 4 || r.height < 4 || r.width >= vw - 2 || r.width * r.height > vw * vh * 1.2) continue;   // full-bleed section backgrounds are the floor, not obstacles
    const sx = scrollX, oy = scrollY - offY(e); out.push([r.left + sx, r.top + oy, r.right + sx, r.bottom + oy, e]); }
  // sticky boxes (e.g. article photos) slide down their whole parent while scrolling: they block that full column
  if (stickyEls === null) { stickyEls = []; for (const e of document.querySelectorAll('main *, section *, aside *')) { if ((++i & 31) === 0) await slice(); if (getComputedStyle(e).position === 'sticky') stickyEls.push(e); } }
  for (const st of stickyEls) { const pr = st.parentElement && st.parentElement.getBoundingClientRect(); if (!pr) continue; const top = pr.top + scrollY, bot = pr.bottom + scrollY;
    for (const o of out) if (o[4] && st.contains(o[4])) { o[1] = Math.min(o[1], top); o[3] = Math.max(o[3], bot); } }
  return out;
}
const RH = 200;
function indexObst() { ROWS = new Map(); for (const o of OBST) for (let r = Math.floor(o[1] / RH); r <= Math.floor(o[3] / RH); r++) { let a = ROWS.get(r); if (!a) ROWS.set(r, a = []); a.push(o); } }
// is box b (page px) within (px, py) of any obstacle?  host: the element he intentionally touches / stands inside —
// mode 'in': standing inside host (host and background panels around the box don't count, its text still does); 'out': host and everything in it ignored
function blocked(b, px, py, host, mode = 'in') { const r0 = Math.floor((b[1] - py) / RH), r1 = Math.floor((b[3] + py) / RH);
  for (let r = r0; r <= r1; r++) { const a = ROWS.get(r); if (!a) continue;
    for (const o of a) { if (!(b[0] < o[2] + px && b[2] > o[0] - px && b[1] < o[3] + py && b[3] > o[1] - py)) continue;
      if (host && o[4] && (o[4] === host || host.contains(o[4]))) { if (mode === 'out' || o[4] === host) continue; if (o[0] <= b[0] && o[2] >= b[2] && o[1] <= b[1] && o[3] >= b[3]) continue; }
      return true; } }
  return false; }
// fixed widgets (WhatsApp float, back-to-top, Happy toggle) move with the viewport: checked live, in page px
function fixedHit(b, pad = 6) { const sel = '.header,.whatsapp-float,.back-to-top,.hfh-toggle,#mainNav.open,.nav.open';
  for (const e of document.querySelectorAll(sel)) { const r = e.getBoundingClientRect(); if (!r.width || r.height < 2) continue; const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) continue;
    const o = [r.left + scrollX, r.top + scrollY, r.right + scrollX, r.bottom + scrollY]; if (b[0] < o[2] + pad && b[2] > o[0] - pad && b[1] < o[3] + pad && b[3] > o[1] - pad) return true; }
  return false; }
const BTN = 'main .btn, section .btn, .final-cta-phone, .hero-buttons a, .hero-buttons button';
const BGRP = '.hero-buttons,.final-cta-phones,.btn-row,.cta-buttons,.service-actions';
const WA = '.btn-whatsapp,[href*="wa.me"],.js-open-wa-selector';
const DECO = '.wave,.layer-stack,.logo-orbit,[class*="deco"],.blob,.hero-scroll,[class^="lb-"],[class*=" lb-"],[aria-hidden="true"]:not(i)';
const CARDS = '.acceso-card,.service-card,.location-card,.blog-card,.ba-card,.sede-mini,.testimonial-card,.symptom-card,.type-card,.why-item,.faq-item,.process-step,.stat-item,.trust-item,.contact-form';
function figBox(x, y) { const k = scaleK(), H = 372 * k, W = 256 * k; return [x - W / 2, y - H - 6, x + W / 2, y + 4]; }   // real drawn bounds (arms, toes) + a hair
function frameBox(id, x, y, dir = 1) { const f = L[id], k = scaleK(); let a = f.x, b = f.x + f.w; if (dir < 0) { const t = a; a = -b; b = -t; } return [x + a * k, y + f.y * k, x + b * k, y + (f.y + f.h) * k]; }
// text baseline per visual line: font ascent/descent from canvas metrics of each text node's own font
const fmC = new Map(); let cvs = null;
function fontM(e) { const cs = getComputedStyle(e), f = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`; let v = fmC.get(f);
  if (!v) { cvs = cvs || document.createElement('canvas').getContext('2d'); cvs.font = f; const m = cvs.measureText('Hg'); v = [m.fontBoundingBoxAscent, m.fontBoundingBoxDescent]; fmC.set(f, v); } return v; }
function textLines(h, skip) { const out = [], hy = scrollY - offY(h), sx = scrollX, rg = document.createRange();
  const tw = document.createTreeWalker(h, NodeFilter.SHOW_TEXT); let n;
  while ((n = tw.nextNode())) { if (!n.nodeValue.trim()) continue; const pe = n.parentElement; if (skip && pe.closest(skip)) continue; const [a, d] = fontM(pe); rg.selectNodeContents(n);
    for (const r of rg.getClientRects()) { if (r.width < 2) continue; const base = r.top + (r.height - a - d) / 2 + a + hy;
      const l = out.find(v => Math.abs(v.base - base) < 6);
      if (l) { l.l = Math.min(l.l, r.left + sx); l.r = Math.max(l.r, r.right + sx); l.t = Math.min(l.t, r.top + hy); l.b = Math.max(l.b, r.bottom + hy); l.base = Math.max(l.base, base); }
      else out.push({ l: r.left + sx, r: r.right + sx, t: r.top + hy, b: r.bottom + hy, base }); } }
  return out.sort((a, b) => a.base - b.base); }
const txt = e => (e && (e.getAttribute && (e.getAttribute('aria-label') || e.getAttribute('alt')) || e.textContent) || '').replace(/\s+/g, ' ').trim();
let computing = null;
function computeSpots() { if (!computing) computing = computeSpotsNow().catch(e => {  }).then(r => { computing = null; return r; }); return computing; }
function gapCtx(e) { const card = e.closest(CARDS), sec = e.closest('section,footer'), h = card ? card.querySelector('h3,h2') : sec && sec.querySelector('h1,h2');
  if (e.closest('.footer-social')) return { type: 'social', label: 'redes' };
  if (e.closest('footer')) return { type: 'footer', label: txt(h) + ' ' + txt(e).slice(0, 40) };
  if (e.matches('.btn') || e.closest('.btn')) { const b = e.closest('.btn') || e; return { type: 'button', label: txt(b), wa: b.matches(WA) }; }
  if (e.matches('img,.photo-frame,.media-frame')) return { type: 'photo', label: txt(h) + ' ' + txt(e).slice(0, 40) };
  if (card) return { type: 'card', label: txt(h) };
  if (e.closest('.trust-item,.trust-bar')) return { type: 'trust', label: txt(e.closest('.trust-item') || e) };
  return { type: 'text', label: txt(h) + ' ' + txt(e).slice(0, 60) }; }
async function computeSpotsNow() {
  const ob = await collectObstacles(); OBST = ob; indexObst(); dirty = false;
  const sx = scrollX, vw = document.documentElement.clientWidth; const out = [], seats = [], peeks = [];
  const k = scaleK(), W = 230 * k, [PX, PY] = PADS(), margin = isMobile() ? 6 : 16;
  const inView = b => b[0] >= sx + margin && b[2] <= sx + vw - margin;
  const free = (b, host, mode) => inView(b) && !blocked(b, PX, PY, host, mode);
  const room = (x, y, host, lim) => { let lo = x, hi = x;
    for (let s = 10; s < 500; s += 10) { const b = figBox(x - s, y); if (!free(b, host) || (lim && b[0] < lim[0])) break; lo = x - s; }
    for (let s = 10; s < 500; s += 10) { const b = figBox(x + s, y); if (!free(b, host) || (lim && b[2] > lim[1])) break; hi = x + s; } return [lo, hi]; };
  const footer = document.querySelector('footer');
  // 1) headings: stand on the baseline of a heading line (last line first), beside it
  const hs = [...document.querySelectorAll('main h1, main h2, h1, section h2, .page-hero h1, footer h2')].filter((h, i, a) => a.indexOf(h) === i && !h.closest('.wa-modal,.header,.hfh'));
  for (const h of hs) { await slice(); const vis = textLines(h); if (!vis.length) continue; const first = vis[0], last = vis[vis.length - 1]; let best = null;
    for (const ln of [last, first, ...vis]) { for (const side of [1, -1]) for (let d = 0; d <= 360; d += 8) { const x = side > 0 ? ln.r + PX + W / 2 + 2 + d : ln.l - PX - W / 2 - 2 - d, y = ln.base;
        if (!free(figBox(x, y))) continue; const sc = d + (ln === last ? 0 : 60) + (side > 0 ? 0 : 6); if (!best || sc < best.sc) best = { x, y, side, sc }; break; }
      if (best && best.sc <= 6) break; }
    if (!best) continue; const [lo, hi] = room(best.x, best.y);
    const inF = footer && footer.contains(h);
    out.push({ kind: 'h', el: h, x: best.x, y: best.y, side: best.side, lo, hi, tx: (first.l + first.r) / 2, ty: (first.t + last.b) / 2, hero: !!h.closest('.hero,.page-hero') || h.tagName === 'H1',
      ctx: { type: inF ? 'footer' : 'heading', label: txt(h) } }); }
  // 2) button groups: stand beside the group, feet on the buttons' bottom edge; he refers to the button right next to him
  const groups = new Set();
  for (const b of document.querySelectorAll(BTN)) { if (b.closest('.header,footer,.wa-modal,.hfh,.whatsapp-float,[class*="card"],nav')) continue;
    const r = b.getBoundingClientRect(); if (r.width < 20 || r.height < 16) continue; groups.add(b.closest(BGRP) || b); }
  for (const g of groups) { await slice(); const kids = (g.matches(BTN) ? [g] : [...g.querySelectorAll('.btn, a, button')]).filter(e => e.getBoundingClientRect().width > 20); if (!kids.length) continue;
    const rs = kids.map(rectP), ln = { l: Math.min(...rs.map(r => r.l)), r: Math.max(...rs.map(r => r.r)), t: Math.min(...rs.map(r => r.t)), b: Math.max(...rs.map(r => r.b)) };
    let best = null;
    for (const side of [1, -1]) for (let d = 0; d <= 150; d += 6) { const x = side > 0 ? ln.r + PX + 2 + W / 2 + d : ln.l - PX - 2 - W / 2 - d, y = ln.b;
      if (!free(figBox(x, y))) continue; const sc = d + (side > 0 ? 0 : 4); if (!best || sc < best.sc) best = { x, y, side, sc }; break; }
    if (!best) continue;
    // the adjacent button = nearest on his side, among those whose bottom is on his ground line
    const row = kids.map((e, i) => [e, rs[i]]).filter(([, r]) => Math.abs(r.b - ln.b) < 6); const adj = row.sort((a, b) => best.side > 0 ? b[1].r - a[1].r : a[1].l - b[1].l)[0] || [kids[0], rs[0]];
    out.push({ kind: 'b', el: g, adj: adj[0], wa: adj[0].matches(WA), x: best.x, y: best.y, side: best.side, lo: best.x, hi: best.x, tx: (adj[1].l + adj[1].r) / 2, ty: (adj[1].t + adj[1].b) / 2, hero: false,
      ctx: { type: 'button', label: txt(adj[0]), wa: adj[0].matches(WA) } }); }
  // 3) inside cards: stand in the card's free white space on the baseline of its last text line (or a button's bottom)
  const CPAD = isMobile() ? 18 : 26;
  for (const c of document.querySelectorAll(CARDS)) { await slice(); const cr = rectP(c); if (cr.w < 120) continue;
    const lines = textLines(c, '.btn'); for (const b of c.querySelectorAll('.btn')) { const r = rectP(b); if (r.w > 10) lines.push({ l: r.l, r: r.r, t: r.t, b: r.b, base: r.b }); }
    lines.sort((a, b) => b.base - a.base); const title = c.querySelector('h3,h2,.service-title'); let best = null;
    for (const ln of lines) { for (const side of [1, -1]) for (let d = 0; d <= 240; d += 6) { const x = side > 0 ? ln.r + PX + W / 2 + 2 + d : ln.l - PX - W / 2 - 2 - d, y = ln.base, b = figBox(x, y);
        if (b[2] > cr.r - CPAD || b[0] < cr.l + CPAD || b[1] < cr.t + 8 || y > cr.b - CPAD) continue; if (!free(b, c)) continue; best = { x, y }; break; } if (best) break; }
    if (!best) { const yb = Math.min(cr.b - CPAD, lines[0] ? lines[0].base : cr.b - CPAD);
      for (const y of [yb, cr.b - CPAD]) { for (let x = cr.r - CPAD - W / 2; x >= cr.l + CPAD + W / 2; x -= 6) { const b = figBox(x, y); if (b[1] < cr.t + 8) continue; if (free(b, c)) { best = { x, y }; break; } } if (best) break; } }
    if (!best) continue; const [lo, hi] = room(best.x, best.y, c, [cr.l + CPAD + 2, cr.r - CPAD - 2]); const img = c.querySelector('img'), ti = title ? rectP(title) : cr, ir = img ? rectP(img) : null;
    out.push({ kind: 'card', el: c, x: best.x, y: best.y, side: 1, lo, hi, tx: (ti.l + ti.r) / 2, ty: (ti.t + ti.b) / 2, img: ir, hero: false, ctx: { type: 'card', label: txt(title), photo: img ? txt(img) : '' } }); }
  // 4) beside photos, trust items, social icons, logos: feet on the element's bottom edge
  const SIDE = [['.page-hero .badge, .hero .badge', 'badge'], ['.photo-frame', 'photo'], ['main img, section img', 'photo'], ['.trust-item', 'trust'], ['.footer-social', 'social'], ['.footer-logo', 'logo']];
  const done = new Set();
  for (const [sel, type] of SIDE) for (const e of document.querySelectorAll(sel)) { await slice(); if (e.closest(CARDS + ',.header,.hfh,.wa-modal') || [...done].some(d => d.contains(e))) continue; done.add(e);
    const r = rectP(e); if (r.w < (type === 'social' ? 30 : 60) || r.h < (type === 'badge' ? 18 : 30)) continue; let best = null;
    for (const side of [1, -1]) for (let d = 0; d <= 160; d += 8) { const x = side > 0 ? r.r + PX + 2 + W / 2 + d : r.l - PX - 2 - W / 2 - d, y = r.b;
      if (!free(figBox(x, y))) continue; const sc = d + (side > 0 ? 0 : 4); if (!best || sc < best.sc) best = { x, y, side, sc }; break; }
    if (!best) continue; const [lo, hi] = room(best.x, best.y);
    out.push({ kind: 'side', el: e, x: best.x, y: best.y, side: best.side, lo, hi, tx: (r.l + r.r) / 2, ty: (r.t + r.b) / 2, hero: !!e.closest('.hero'), ctx: { type, label: txt(e) } }); }
  // 5) seats: sitting ON the top edge of a button / card / photo frame, pointing down at it (the one intended contact)
  for (const b of document.querySelectorAll(BTN + ',.service-actions .btn,' + CARDS + ',.photo-frame')) { await slice(); if (b.closest('.header,.wa-modal,.hfh,.whatsapp-float,nav')) continue; const r = rectP(b); if (r.w < 90 || r.h < 24) continue;
    const isBtn = b.matches(BTN + ',.btn'), cs = getComputedStyle(b), rad = Math.max(parseFloat(cs.borderTopLeftRadius) || 0, parseFloat(cs.borderTopRightRadius) || 0);
    const f = L.p_seat_point, tip = (f.x + f.w * 0.06) * k; let ok = null;
    for (const dir of [-1, 1]) { for (let u = 0.5; u <= 0.9 && !ok; u += 0.05) for (const s of [1, -1]) { const x = dir > 0 ? r.l + r.w * (s > 0 ? u : 1 - u) : r.r - r.w * (s > 0 ? u : 1 - u), y = r.t + 1;
        const fx = x + tip * dir; if (fx < r.l + 10 || fx > r.r - 10 || x < r.l + rad + 12 || x > r.r - rad - 12) continue;
        const bb = frameBox('p_seat_point', x, y, dir); if (!inView(bb) || blocked([bb[0], bb[1], bb[2], r.t - 1], PX * .7, PY * .7, b, 'out')) continue; ok = { x, y, dir }; break; } if (ok) break; }
    if (ok) seats.push({ kind: 'seat', el: b, x: ok.x, y: ok.y, dir: ok.dir, lo: ok.x, hi: ok.x, wa: b.matches(WA), ctx: { type: isBtn ? 'seat' : (b.matches(CARDS) ? 'card' : 'photo'), label: isBtn ? txt(b) : txt(b.querySelector('h3,h2') || b.querySelector('img')), wa: b.matches(WA) } }); }
  // 6) peeks from behind a card/photo side edge, and over its top edge (he is "behind" it: the sprite is cut at the edge)
  const PKSEL = CARDS + ',.photo-frame' + (isMobile() ? ',main img,main h2,main h3,.section-header,main blockquote,.media-frame,.results-photo,.testimonial-card,.ba-card' : '');
  for (const e of document.querySelectorAll(PKSEL)) { await slice(); if (e.closest('.header,.hfh,.wa-modal,.whatsapp-float,nav') || e.closest(DECO)) continue; const r = rectP(e); if (r.w < (isMobile() ? 60 : 150) || r.h < 14) continue; const cs = getComputedStyle(e);
    const rb = Math.max(parseFloat(cs.borderBottomLeftRadius) || 0, parseFloat(cs.borderBottomRightRadius) || 0), rt = Math.max(parseFloat(cs.borderTopLeftRadius) || 0, parseFloat(cs.borderTopRightRadius) || 0);
    const hd = e.matches('h2,h3,.section-header,blockquote'), ctx = { type: e.matches(CARDS) ? 'card' : hd ? 'heading' : 'photo', label: hd ? txt(e) : txt(e.querySelector('h3,h2') || e.querySelector('img') || e) };
    for (const [id, side] of [['p_peek', -1], ['p_peek2', 1]]) { const f = L[id], hk = f.h * k, y = r.b - rb - 3, vis = (side < 0 ? f.edge[0] - f.x : f.x + f.w - f.edge[0]) * k;
      if (r.h < hk + rb + rt + 8) continue; const ex = side < 0 ? r.l : r.r, bb = side < 0 ? [ex - vis, y - hk, ex - 1, y] : [ex + 1, y - hk, ex + vis, y];
      if (!inView(bb) || blocked(bb, PX * .8, PY, e, 'out')) continue; peeks.push({ kind: 'peek', id, el: e, x: ex, y, side, vis, hk, ctx }); }
    { let nl = 0; const g = L.p_ledge, gh = g.h * k; for (let x = r.l + rt + (-g.x) * k + 8; x <= r.r - rt - (g.x + g.w) * k - 8; x += 24) { const bb = [x + g.x * k, r.t - gh, x + (g.x + g.w) * k, r.t - 1];
        if (!inView(bb) || blocked(bb, PX * .8, PY, e, 'out')) continue; peeks.push({ kind: 'ledge', id: 'p_ledge', el: e, x, y: r.t + 1, side: 0, hk: gh, ctx }); if (!isMobile() || ++nl >= 2) break; x += 90; } } }
  // 7) free space anywhere: beside any text line (feet on its baseline) or beside any box (feet on its bottom edge) — margins, gaps around cards, photos, footer
  { const G = 'main p, main li, main h3, main h4, main blockquote, main figcaption, main .badge, footer p, footer li, footer h3, footer a';
    const BX = 'main img, .photo-frame, .media-frame, ' + CARDS + ', .btn, .trust-item, .footer-social, .footer-logo, .badge, .stat, [class*="stat-"], main h1, main h2, main .section-header, main .eyebrow, main [class*="feature"], main [class*="chip"], main [class*="pill"], main [class*="item"], main [class*="tag"], main label, main .label';
    const sp = isMobile() ? 44 : 105, near = (x, y) => out.some(q => Math.abs(q.x - x) < sp && Math.abs(q.y - y) < 26), lines = [];
    for (const e of document.querySelectorAll(G)) { await slice(); if (e.closest('.header,.hfh,.wa-modal,.whatsapp-float,[hidden],nav.breadcrumb-nav')) continue; for (const ln of textLines(e)) lines.push([ln.l, ln.r, ln.base, e]); }
    for (const e of document.querySelectorAll(BX)) { await slice(); if (e.closest('.header,.hfh,.wa-modal,.whatsapp-float')) continue; const r = rectP(e); if (r.w < 20 || r.h < 16) continue; lines.push([r.l, r.r, r.b, e]); }
    for (const [l, r, y, e] of lines) { await slice();
      for (const side of [1, -1]) for (let d = 0; d <= (isMobile() ? 260 : 170); d += 10) { const x = side > 0 ? r + PX + W / 2 + 2 + d : l - PX - W / 2 - 2 - d; if (near(x, y)) break; if (!free(figBox(x, y))) continue;
        const [lo, hi] = room(x, y); out.push({ kind: 'g', el: e, x, y, side, lo, hi, tx: (l + r) / 2, ty: y - 8, hero: !!e.closest('.hero,.page-hero'), ctx: gapCtx(e) }); break; } } }
  // 8) leftover pockets at the end of short title/paragraph lines: feet on that baseline, never over the glyphs
  { const G8 = 'main p, main li, main h1, main h2, main h3, main h4, main blockquote, main figcaption, main .eyebrow, main .desc, main .acceso-body p, section p, section li, section h2, section h3, .trust-item, .section-header p, footer p, footer li, footer h3, footer a, .final-cta-phones';
    const near8 = (x, y) => out.some(q => Math.abs(q.x - x) < (isMobile() ? 28 : 36) && Math.abs(q.y - y) < 18);
    for (const e of document.querySelectorAll(G8)) { await slice(); if (e.closest('.header,.hfh,.wa-modal,.whatsapp-float,[hidden],nav')) continue;
      for (const ln of textLines(e)) {
        for (const side of [1, -1]) {
          const x0 = side > 0 ? ln.r + PX + W / 2 + 2 : ln.l - PX - W / 2 - 2;
          const dir = side > 0 ? 1 : -1;
          for (let d = 0; d <= (isMobile() ? 280 : 200); d += 6) { const x = x0 + dir * d; if (near8(x, ln.base)) break; if (!free(figBox(x, ln.base))) continue;
            const [lo, hi] = room(x, ln.base); out.push({ kind: 'line', el: e, x, y: ln.base, side, lo, hi, tx: (ln.l + ln.r) / 2, ty: ln.t, hero: !!e.closest('.hero,.page-hero'), ctx: gapCtx(e) }); break; } } } } }
  // 9) stand on the TOP edge of cards, photos, images and sections (feet on the rim, body above, never covering the element)
  { const RIM = CARDS + ',.photo-frame,.media-frame,.hero-image-wrapper,.acceso-img,.ba-card,main img,section img,.trust-bar,.cta-band,footer,main section,.page-hero';
    const near9 = (x, y) => out.some(q => Math.abs(q.x - x) < 32 && Math.abs(q.y - y) < 16);
    for (const e of document.querySelectorAll(RIM)) { await slice(); if (e.closest('.header,.hfh,.wa-modal,.whatsapp-float,nav') || e.closest(DECO)) continue;
      if (e.matches('img') && e.closest(CARDS + ',.photo-frame,.hero-image-wrapper,.acceso-img')) continue;
      const r = rectP(e); if (r.w < 70 || r.h < 20) continue; const y = r.t;
      const xs = []; for (let x = r.l + W / 2 + 12; x <= r.r - W / 2 - 12; x += isMobile() ? 42 : 56) xs.push(x);
      if (!xs.length) xs.push((r.l + r.r) / 2);
      let n = 0; for (const x of xs) { const b = figBox(x, y); if (near9(x, y) || !inView(b) || !free(b, e, 'out')) continue;
        const [lo, hi] = room(x, y, e); out.push({ kind: 'rim', el: e, x, y, side: 1, lo, hi, tx: (r.l + r.r) / 2, ty: (r.t + r.b) / 2, hero: !!e.closest('.hero,.page-hero'), ctx: gapCtx(e) }); if (++n >= (isMobile() ? 3 : 4)) break; } } }
  // 10) section padding and separators: feet at the start of a section (top border) or just after its last content, if the box is free
  { const bands = [...document.querySelectorAll('main section, footer')];
    const near10 = (x, y) => out.some(q => Math.abs(q.x - x) < 36 && Math.abs(q.y - y) < 20);
    for (let i = 0; i < bands.length; i++) { await slice(); const e = bands[i], r = rectP(e); if (r.h < 40) continue;
      const host = e; const ys = [r.t];
      if (i + 1 < bands.length) { const n = rectP(bands[i + 1]); if (n.t - r.b >= 8) ys.push(r.b, (r.b + n.t) / 2, n.t); else ys.push(r.b); }
      else ys.push(r.b);
      const xs = []; for (let x = r.l + Math.max(margin + W / 2, 24); x <= r.r - Math.max(margin + W / 2, 24); x += isMobile() ? 70 : 100) xs.push(x);
      if (!xs.length) xs.push((r.l + r.r) / 2);
      let n = 0; for (const y of ys) for (const x of xs) { if (near10(x, y) || !free(figBox(x, y))) continue;
        const [lo, hi] = room(x, y); out.push({ kind: 'gap', el: e, x, y, side: 1, lo, hi, tx: x, ty: y - 8, hero: !!e.closest('.hero,.page-hero'), ctx: { type: e.tagName === 'FOOTER' ? 'footer' : 'text', label: txt(e.querySelector('h1,h2,h3') || e).slice(0, 60) } }); if (++n >= (isMobile() ? 6 : 8)) break; } } }
  for (let i = out.length - 1; i >= 0; i--) if (out.slice(0, i).some(q => Math.abs(q.x - out[i].x) < 28 && Math.abs(q.y - out[i].y) < 16)) out.splice(i, 1);
  { const hb = Math.max(headerH(), isMobile() ? 72 : 84) + 8, kk = scaleK();   // never under the fixed header at the top of the page
    for (let i = out.length - 1; i >= 0; i--) if (figBox(out[i].x, out[i].y)[1] < hb) out.splice(i, 1);
    for (let i = seats.length - 1; i >= 0; i--) if (seats[i].y - 380 * kk < hb) seats.splice(i, 1);
    for (let i = peeks.length - 1; i >= 0; i--) if (peeks[i].y - (peeks[i].hk || 0) < hb) peeks.splice(i, 1); }
  out.forEach((s, i) => s.key = s.kind + i + ':' + (s.el.id || txt(s.el).slice(0, 24)));
  // live main (cc4616b): drop the mobile CTA heading spot and the desktop gap beside «Síguenos»
  SPOTS = out.filter(s => !(isMobile() ? /^h2:Estamos listos para aten/ : /^g\d+:Síguenos/).test(s.key || ''));
  SEATS = seats; PEEKS = peeks; spotsAt = Date.now();
  if (cur.visible && !cur.busy && cur.spot && cur.spot.kind !== 'seat' && blocked(figBox(cur.x, cur.y), 2, 2)) { const n = SPOTS.find(q => q.el === cur.spot.el && q.kind === cur.spot.kind) || bestSpot(); setTimeout(() => relocate(n), 0); }
   return out;
}

function spotVisible(s, full = true) { const k = scaleK(), H = (s.hk || 360 * k), top = scrollY + headerH() + 6, bot = scrollY + innerHeight - 8;
  return full ? (s.y - H >= top && s.y <= bot) : (s.y >= top && s.y - H <= bot); }
function bestSpot() { const vis = SPOTS.filter(s => spotVisible(s) && !fixedHit(figBox(s.x, s.y))); if (!vis.length) return null;
  const target = scrollY + innerHeight * 0.45; vis.sort((a, b) => Math.abs(a.y - target) - Math.abs(b.y - target)); return vis[0]; }
const happyOnScreen = () => { if (!cur.visible) return false; const k = scaleK(), H = 360 * k; return cur.y >= scrollY + headerH() && cur.y - H <= scrollY + innerHeight; };

// ---- phase 2/3: speech bubbles, looking, excitement, inviting, hops, genie ladder, Miguel's original poses, seats and peeks
let sayAnim = null;
// bubble placements around the head; never over page content (Happy himself may be overlapped); a shorter alternate text is tried before giving up
function bubbleSpot(bw, bh, A) { const [BX, BY] = isMobile() ? [14, 13] : [22, 18], k = scaleK(), H = A && A.H || 360 * k, W = A && A.W || 230 * k, cx = A ? A.x : cur.x, cy = A ? A.y : cur.y;
  const opts = [[W * 0.36, -H * 1.02 - bh * 0.35, ''], [-W * 0.36 - bw, -H * 1.02 - bh * 0.35, 'r']];
  for (const up of [8, 20, 34]) for (const sh of [0, 20, -20, 40, -40, 60, -60, 80, -80]) opts.push([-bw / 2 + sh, -H - bh - up, 'c']);
  for (const up of [-10, 6, 22]) { opts.push([W * 0.44, -H * 0.9 - up, '']); opts.push([-W * 0.44 - bw, -H * 0.9 - up, 'r']); }
  for (const f of [.7, .55]) { opts.push([W * 0.5, -H * f - bh, '']); opts.push([-W * 0.5 - bw, -H * f - bh, 'r']); }
  for (const [dx, dy, c] of opts) { const r = [cx + dx, cy + dy, cx + dx + bw, cy + dy + bh];
    if (r[0] < scrollX + 4 || r[2] > scrollX + document.documentElement.clientWidth - 4 || r[1] < scrollY + headerH() + 4) continue; if (blocked(r, BX, BY) || fixedHit(r, 12)) continue; return [dx + cx - cur.x, dy + cy - cur.y, c]; }
  return null; }
ACT.say = (text, ms = 1700, alt, A) => { let cs = [text, alt].filter(Boolean); if (cs.length > 1 && cs[0] === lastSaid) cs = [cs[1], cs[0]]; for (const t of cs) { say.textContent = t; say.className = 'hfh-say'; say.style.opacity = 0; const bw = say.offsetWidth, bh = say.offsetHeight, p = bubbleSpot(bw, bh, A);
    if (!p) continue;
    say.style.left = p[0] + 'px'; say.style.top = p[1] + 'px'; if (p[2]) say.classList.add(p[2]);
    if (sayAnim) sayAnim.cancel();
    sayAnim = say.animate([{ opacity: 0, transform: 'scale(.55)' }, { opacity: 1, transform: 'scale(1.07)', offset: .07 }, { opacity: 1, transform: 'scale(1)', offset: .12 }, { opacity: 1, transform: 'scale(1)', offset: .9 }, { opacity: 0, transform: 'scale(.92)' }], { duration: ms, easing: 'ease-out' });
    
    lastSaid = t; return Promise.resolve(true); }
  
  return Promise.resolve(false); };
const qd = (dir, i) => dir > 0 ? i * 11.25 : 360 - i * 11.25;
// turn the head/body a few turn-frames toward dir (+1 right, -1 left), hold, come back
ACT.lookAt = (dir, hold = 700, n = 3) => { if (!TURNS() || cur.pose !== 'fw') return Promise.resolve();
  const QG = 45, t1 = (n - 1) * QG + hold;
  return clip(t1 + n * QG + 80, (tl, flip) => { const S = []; for (let i = 1; i <= n; i++) S.push([(i - 1) * QG, tid(qd(dir, i))]);
    for (let i = n - 1; i >= 1; i--) S.push([t1 + (n - i) * QG, tid(qd(dir, i))]); S.push([t1 + n * QG, 'fw']);
    flip(poseEls(), S, 'fw'); tl(shake, [[0, { transform: 'rotate(0deg)' }], [n * QG, { transform: `rotate(${dir * 2}deg)`, easing: 'ease-out' }], [t1, { transform: `rotate(${dir * 2}deg)` }], [t1 + n * QG + 60, { transform: 'rotate(0deg)' }]]); }); };
ACT.lookAround = async () => { const E = epoch; await ACT.lookAt(-1, 650, 3); await sleep(120); if (E === epoch) await ACT.lookAt(1, 650, 3); };
function popMark(tl, e, t0, dur) { tl(e, [[t0, { transform: 'translate(0px,0px) scale(0) rotate(-20deg)', opacity: 0 }], [t0 + 160, { transform: 'translate(0px,-10px) scale(1.3) rotate(8deg)', opacity: 1, easing: 'cubic-bezier(.2,.8,.3,1.4)' }],
  [t0 + 300, { transform: 'translate(0px,-6px) scale(1) rotate(0deg)', opacity: 1 }], [t0 + dur - 200, { transform: 'translate(0px,-12px) scale(1.05) rotate(-4deg)', opacity: 1 }], [t0 + dur, { transform: 'translate(0px,-30px) scale(.4) rotate(0deg)', opacity: 0 }]]); }
// one of Miguel's original full-body poses: anticipation squash, cut into the pose, hold with a little life (sway / hops), squash back to the front pose.
// Refuses (returns false) when the pose's own box (arms and props included) would touch any page content.
const IBPRE = { jump: 1, lie_sleep: 1, wave_hi: 1 };   // i2_ comes first (anticipation / first step), otherwise i_ then i2_
// while sitting: hands to the cheeks / a little cheer, through their drawn in-betweens
ACT.sitPose = (id) => { const pid = 'p_' + id, e = P[pid], ib = P['i_' + id]; if (!e || cur.pose !== 'sit' || !poseFree(pid, 1)) return Promise.resolve(false); const hold = 1700;
  return clip(hold + 360, (tl, flip) => { flip(poseEls(), ib ? [[60, 'i_' + id], [170, pid], [hold + 60, 'i_' + id], [hold + 170, 'sit']] : [[100, pid], [hold + 100, 'sit']], 'sit');
    tl(pop, [...squashF(170, .4), ...squashF(hold + 170, .35)]); }).then(ok => { cur.pose = 'sit'; return ok; }); };
ACT.seq = (frames, loops = 2, step = 170, text, home = 'fw') => { if (cur.pose !== home || !frames.every(f => P[f] && poseFree(f, 1))) return Promise.resolve(false);
  const S = []; let t = 60; for (let r = 0; r < loops; r++) for (const f of frames) { S.push([t, f]); t += step; } S.push([t, home]); if (text) ACT.say(text[0] === '@' ? ph(text.slice(1)) : text, t + 200);
  return clip(t + 200, (tl, flip) => { flip(poseEls(), S, home); const F = []; for (let i = 0; i * step < t; i++) F.push([60 + i * step, { transform: tr(i % 2 ? -4 : 0, 1, 1) }]); F.push([t + 200, { transform: tr(0, 1, 1) }]); tl(pop, F); }); };
const poseFree = (id, dir, ex) => { const b = frameBox(id, cur.x, cur.y, dir), vw = document.documentElement.clientWidth; if (b[0] < scrollX + 4 || b[2] > scrollX + vw - 4 || b[1] < scrollY + headerH()) return false; return !blocked(b, 8, 4, ex, 'out') && !fixedHit(b); };
ACT.pose = (id, o = {}) => { const pid = 'p_' + id, e = P[pid], dir = o.dir || 1; if (!e || cur.pose !== 'fw' || !poseFree(pid, dir, o.ex)) return Promise.resolve(false);
  // drawn in-betweens, in order from the front pose to the target (only those whose own box is free too)
  const ibs = (IBPRE[id] ? ['i2_', 'i_'] : ['i_', 'i2_']).map(q => q + id).filter(k => P[k] && poseFree(k, dir, o.ex)), ib = ibs.length > 0;
  e.style.transform = dir < 0 ? 'scaleX(-1)' : ''; for (const k of ibs) P[k].style.transform = e.style.transform; const T0 = 110, hold = o.hold || 1800, T1 = T0 + hold, IB = ibs.length > 1 ? 90 : 120;
  const SQ = []; ibs.forEach((k, j) => SQ.push([T0 - 40 + j * IB, k])); SQ.push([T0 - 40 + ibs.length * IB, pid]); ibs.slice().reverse().forEach((k, j) => SQ.push([T1 - (ibs.length - j) * IB, k])); SQ.push([T1, 'fw']);
  if (o.text) ACT.say(o.text, hold + 400, o.alt);
  return clip(T1 + 330, (tl, flip) => { flip(poseEls(), ib ? SQ : [[T0, pid], [T1, 'fw']], 'fw');
    const F = [...squashF(T0, .9)];
    if (o.hop) { let t = T0 + 330; for (let i = 0; i < o.hop && t + 330 < T1 - 50; i++, t += 360) F.push([t, { transform: tr(0, 1.08, .92), easing: 'ease-in' }], [t + 90, { transform: tr(-60, .95, 1.06), easing: 'ease-out' }],
        [t + 180, { transform: tr(-64, .97, 1.03), easing: 'ease-in' }], [t + 270, { transform: tr(0, 1.1, .9), easing: 'ease-out' }], [t + 340, { transform: tr(0, 1, 1) }]);
      const S = [[T0, { transform: 'scale(1)' }]]; for (let i = 0, t2 = T0 + 330; i < o.hop && t2 + 330 < T1 - 50; i++, t2 += 360) S.push([t2 + 90, { transform: 'scale(.7)' }], [t2 + 270, { transform: 'scale(1)' }]); tl(shadow, S); }
    else F.push([T0 + 320, { transform: tr(0, 1, 1) }], [T0 + 320 + (hold - 380) * .5, { transform: tr(-3, .99, 1.015), easing: 'ease-in-out' }], [T1 - 60, { transform: tr(0, 1, 1), easing: 'ease-in-out' }]);
    F.push(...squashF(T1, .5)); tl(pop, F);
    if (o.sway) tl(shake, [[T0 + 250, { transform: 'rotate(0deg)' }], [T0 + hold * .4, { transform: `rotate(${2.2 * dir}deg)`, easing: 'ease-in-out' }], [T0 + hold * .75, { transform: `rotate(${-1.6 * dir}deg)`, easing: 'ease-in-out' }], [T1, { transform: 'rotate(0deg)', easing: 'ease-in-out' }]]);
    if (o.fx === '!') popMark(tl, excl, T0, Math.min(hold, 1300)); else if (o.fx === '?') popMark(tl, qmark, T0, Math.min(hold, 1800));
    else if (o.fx === 'spark') tl(spark, [[T0 + 100, { transform: 'scale(0) rotate(0deg)', opacity: 0 }], [T0 + 260, { transform: 'scale(1.3) rotate(40deg)', opacity: 1 }], [T0 + 600, { transform: 'scale(1) rotate(80deg)', opacity: 1 }], [T0 + 1000, { transform: 'scale(.4) rotate(130deg)', opacity: 0 }]]);
  }).then(ok => { e.style.transform = ''; for (const k of ibs) P[k].style.transform = ''; return ok; }); };
// sees something he likes (the Happy Foot name): looks at it, "!" pops, then Miguel's excited jump (arms up) with two hops
ACT.excite = async (dir) => { const E = epoch; if (cur.pose !== 'fw') return; if (dir && TURNS()) await ACT.lookAt(dir, 420, 3); if (E !== epoch || cur.pose !== 'fw') return;
  if (P.p_jump && await ACT.pose('jump', { hold: 1250, hop: 2, fx: '!' })) return;
  startWaveLoop();
  return clip(1500, (tl, flip) => { const sched = RAISE(0).concat(LOWER(1180)); flip(arms, sched, cur.arm); flip({ W: armRotW }, sched, cur.arm);
    flip(mouths, [[40, 'o'], [200, 'big'], [1250, 'open']], 'open'); popMark(tl, excl, 0, 1300);
    tl(pop, [[0, { transform: tr(0, 1, 1) }], [110, { transform: tr(0, 1.13, .87), easing: 'ease-in' }], [190, { transform: tr(-70, .92, 1.1), easing: 'ease-out' }], [330, { transform: tr(0, 1.13, .87), easing: 'ease-in' }],
      [400, { transform: tr(0, 1.1, .9) }], [470, { transform: tr(-62, .93, 1.08), easing: 'ease-out' }], [610, { transform: tr(0, 1.12, .88), easing: 'ease-in' }], [720, { transform: tr(0, .97, 1.03) }], [840, { transform: tr(0, 1, 1) }]]);
    tl(shadow, [[110, { transform: 'scale(1)' }], [190, { transform: 'scale(.72)' }], [330, { transform: 'scale(1)' }], [470, { transform: 'scale(.75)' }], [610, { transform: 'scale(1)' }]]);
  }).then(ok => { if (ok) { stopWaveLoop(); cur.arm = '3'; } }); };
// points at a real button and says what it is. Desktop: turn + side point; phones: Miguel's front pointing pose (no turn frames needed)
ACT.pointAt = async (dir, text, alt) => { const E = epoch; if (cur.pose !== 'fw') return false;
  if (P.p_point_front && (isMobile() || !TURNS() || Math.random() < .45)) { if (await ACT.pose('point_front', { dir, hold: 2000, text, alt })) return true; }
  if (TURNS() && lazyBuilt.point) { if (text) ACT.say(text, 2500, alt); await ACT.point(dir); return true; }
  if (E === epoch && P.p_idea && /↑/.test((text || '') + (alt || '')) && await ACT.pose('idea', { dir, hold: 1900, text, alt })) return true;
  if (E === epoch && lazyBuilt.wink) { if (text) ACT.say(text, 2500, alt); await ACT.thumbs(); return true; } return false; };
ACT.invite = async (dir, text, sitAfter, alt) => { const E = epoch; if (cur.pose !== 'fw') return; await ACT.pointAt(dir, text, alt); if (sitAfter && lazyBuilt.rest && E === epoch) { await sleep(150); if (E === epoch) await ACT.sit(); } };
// jump (arc) to a nearby spot: dx, dy in page px. Arms out for balance in the air (the 'D' arm), big smile on landing
ACT.hopTo = (dx, dy) => { if (cur.pose !== 'fw') return Promise.resolve(false); const k = scaleK(), X = dx / k, Y = dy / k, T = Math.round(Math.min(720, 360 + Math.hypot(X, Y) * 0.35)), h = 110 + Math.max(0, -Y) * 0.25, T0 = 140;
  return clip(T0 + T + 330, (tl, flip) => { const F = [[0, { transform: 'translate(0px,0px)' }], [T0, { transform: 'translate(0px,0px)' }]];
    for (let i = 1; i <= 24; i++) { const u = i / 24; F.push([T0 + T * u, { transform: `translate(${(X * u).toFixed(1)}px,${(Y * u - 4 * h * u * (1 - u)).toFixed(1)}px)` }]); }
    tl(mover, F); flip(mouths, [[T0, 'o'], [T0 + T + 20, 'big'], [T0 + T + 300, 'open']], 'open');
    if (P.yjump1 && P.yland4 && P.yleapr3) {
      const mid = Math.abs(X) > Math.abs(Y) * .8 ? (dx < 0 ? ['yleapl2', 'yleapl3'] : ['yleapr2', 'yleapr3']) : ['yjump2', 'yjump3'];
      
      flip(poseEls(), [[T0 - 110, 'yjump1'], [T0 - 30, 'yjump2'], [T0 + T * .15, mid[0]], [T0 + T * .35, mid[1]], [T0 + T * .75, 'yland1'], [T0 + T - 10, 'yjump4'], [T0 + T + 90, 'yland4'], [T0 + T + 220, 'fw']], 'fw');
    } else if (P.hop1) { const d = dx < 0 ? 'scaleX(-1)' : ''; for (const f of SEQF.hop) P[f].style.transform = d;
      flip(poseEls(), [[T0 - 90, 'hop1'], [T0 - 10, 'hop2'], [T0 + T * .28, 'hop3'], [T0 + T * .8, 'hop2'], [T0 + T - 10, 'hop4'], [T0 + T + 140, 'fw']], 'fw'); }
    flip(arms, [[T0 - 30, '2'], [T0 + 20, 'D'], [T0 + T - 40, '2'], [T0 + T + 40, '3']], cur.arm); flip({ W: armRotW }, [[0, '3']], cur.arm);
    flip(legs, [[T0 - 40, '1'], [T0 + 30, '2'], [T0 + T - 50, '1'], [T0 + T + 10, '0']], '0');
    tl(pop, [[0, { transform: tr(0, 1, 1) }], [T0 - 20, { transform: tr(0, 1.14, .86), easing: 'ease-in' }], [T0 + 60, { transform: tr(0, .9, 1.12) }], [T0 + T - 60, { transform: tr(0, .95, 1.06) }], ...squashF(T0 + T, 1)]);
    tl(shadow, [[T0, { transform: 'scale(1)', opacity: 1 }], [T0 + T * .5, { transform: 'scale(.5)', opacity: .4 }], [T0 + T, { transform: 'scale(1)', opacity: 1 }]]);
  }).then(ok => { mover.style.transform = ''; if (P.hop1) for (const f of SEQF.hop) P[f].style.transform = ''; if (ok) { cur.arm = '3'; place(cur.x + dx, cur.y + dy); } return ok; }); };
// genie trick: a ladder pops out of a sparkle, he turns his back and really climbs: hands alternate gripping the rails (one reaches up while the other
// pulls), the opposite foot steps up a rung, the body rises on the pull. Going down is the same cycle played backwards. Then he turns to the front.
const RUNG = 52;
function climbTracks(n, TC, STEP, GR) { const A = { L: [], R: [], lL: [], lR: [], y: [], sway: [] }, rot = (a, s) => ({ transform: `rotate(${a}deg) scale(1,${s})` }), leg = (y, s) => ({ transform: `translate(0px,${y}px) scale(1,${s})` });
  const HI = [162, 1.28], MID = [128, 1.08], LO = [98, .84];            // left-arm angles (right arm mirrored): hand high on the rail / mid / low-out
  const arm = (side, st) => rot(side === 'L' ? st[0] : -st[0], st[1]);
  A.L.push([TC, rot(0, 1)], [TC + GR, arm('L', LO)]); A.R.push([TC, rot(0, 1)], [TC + GR, arm('R', MID)]);
  A.lL.push([TC, leg(0, 1)]); A.lR.push([TC, leg(0, 1)]); A.y.push([TC + GR, 0]); A.sway.push([TC + GR, { transform: 'rotate(0deg)' }]);
  for (let r = 0; r < n; r++) { const t0 = TC + GR + r * STEP, tA = t0 + STEP * .42, t1 = t0 + STEP, act = r % 2 ? 'R' : 'L', oth = act === 'L' ? 'R' : 'L', lg = act === 'L' ? 'lR' : 'lL';
    A[act].push([tA, arm(act, HI)], [t1, arm(act, MID)]);               // reach up and grip, then pull while the body rises
    A[oth].push([tA, arm(oth, MID)], [t1, arm(oth, LO)]);               // the other hand holds; relative to the rising body it ends low
    A[lg].push([t0 + STEP * .08, leg(0, 1)], [tA, leg(-30, .9)], [t1, leg(0, 1)]); // opposite foot steps up a rung, then pushes
    A.y.push([tA, -r * RUNG - 4], [t1, -(r + 1) * RUNG]);
    A.sway.push([tA, { transform: `rotate(${act === 'L' ? -2.2 : 2.2}deg)` }], [t1, { transform: 'rotate(0deg)' }]); }
  const TE = TC + GR + n * STEP; A.L.push([TE + GR, rot(0, 1)]); A.R.push([TE + GR, rot(0, 1)]); A.y.push([TE + GR, -n * RUNG]); return { A, TE: TE + GR }; }
ACT.ladder = (dy) => { if (!TURNS() || cur.pose !== 'fw') return Promise.resolve(false);
  const rig = !!(lazyBuilt.climb && P.C), k = scaleK(), Y = dy / k, up = Y < 0, n = Math.max(2, Math.round(Math.abs(Y) / RUNG)), top = up ? Y - 150 : -150, bot = up ? 10 : Y + 10;
  ladder.style.top = top + 'px'; ladder.style.height = (bot - top) + 'px'; ladder.style.transformOrigin = up ? '50% 100%' : '50% 0%';
  const SUM = 420, TB = SUM + 40, back = [2, 4, 6, 8, 10, 12, 14, 16], TC = TB + back.length * 34 + 60, STEP = 380, GR = 160;
  const { A, TE } = climbTracks(n, TC, STEP, GR), front = [18, 20, 22, 24, 26, 28, 30], TF0 = TE + 80, TFE = TF0 + front.length * 34, POOF = TFE + 200, END = POOF + 420;
  const yk = Y / (n * RUNG);                                             // exact total height
  const mapT = t => up ? t : TC + TE - t;                                // going down = the climbing cycle played backwards
  return clip(END, (tl, flip) => {
    flip(mouths, [[60, 'o'], [SUM, 'open']], 'open'); popMark(tl, spark, 0, 700);
    tl(ladder, [[0, { transform: 'scale(.2,0)', opacity: 0 }], [60, { transform: 'scale(.4,.05)', opacity: 1 }], [SUM - 80, { transform: 'scale(1.08,1.04)', opacity: 1, easing: 'cubic-bezier(.2,.8,.3,1.2)' }], [SUM, { transform: 'scale(1,1)', opacity: 1 }],
      [POOF, { transform: 'scale(1,1)', opacity: 1 }], [POOF + 120, { transform: 'scale(1.15,.96)', opacity: .9 }], [POOF + 300, { transform: 'scale(.1,.6)', opacity: 0 }], [END, { transform: 'scale(.1,.6)', opacity: 0 }]]);
    const S = []; back.forEach((i, j) => S.push([TB + j * 34, tid(i * 11.25)])); S.push([TC - 34, tid(180)]); if (rig && P.back_reach) S.push([TC - 17, 'back_reach']);
    if (rig) S.push([TC, 'climb']); else for (let r = 0; r < n; r++) S.push([TC + r * STEP, tid(r % 2 ? 191.25 : 168.75)]);
    if (rig && P.back_reach) { S.push([TE, 'back_reach']); S.push([TE + 40, tid(180)]); } else S.push([TE, tid(180)]); front.forEach((i, j) => S.push([TF0 + j * 34, tid(i * 11.25)])); S.push([TFE, 'fw']);
    flip(poseEls(), S, 'fw');
    const F = [[0, { transform: 'translate(0px,0px)' }], [TC, { transform: 'translate(0px,0px)' }]];
    for (const [t, y] of A.y) F.push([mapT(t), { transform: `translate(0px,${(up ? y * Math.abs(yk) : (y + n * RUNG) * Math.abs(yk)).toFixed(1)}px)` }]);
    F.push([END, { transform: `translate(0px,${Y.toFixed(1)}px)` }]); tl(mover, F.map(([t, v]) => [t, v]).sort((a, b) => a[0] - b[0]));
    if (rig) { const g = P.C, tr2 = arr => arr.map(([t, v]) => [mapT(t), v]);
      tl(g.armL, [[0, { transform: 'rotate(0deg) scale(1,1)' }], ...tr2(A.L)]); tl(g.armR, [[0, { transform: 'rotate(0deg) scale(1,1)' }], ...tr2(A.R)]);
      tl(g.legL, [[0, { transform: 'translate(0px,0px) scale(1,1)' }], ...tr2(A.lL), [mapT(TE), { transform: 'translate(0px,0px) scale(1,1)' }]]);
      tl(g.legR, [[0, { transform: 'translate(0px,0px) scale(1,1)' }], ...tr2(A.lR), [mapT(TE), { transform: 'translate(0px,0px) scale(1,1)' }]]);
      tl(shake, [[0, { transform: 'rotate(0deg)' }], ...tr2(A.sway), [END, { transform: 'rotate(0deg)' }]]); }
    tl(shadow, [[TC, { transform: 'scale(1)', opacity: 1 }], [TC + 120, { transform: 'scale(.4)', opacity: 0 }], [TE, { transform: 'scale(.4)', opacity: 0 }], [TE + 120, { transform: 'scale(1)', opacity: 1 }]]);
    tl(pop, squashF(TFE + 20, .6));
    spks.forEach((e, i) => { const a = i / 8 * Math.PI * 2, rr = 120 + (i % 3) * 30, yy = up ? (Y - 150 + 10) / 2 - Y : (Y + 150) / 2 - 150;
      tl(e, [[POOF + 60, { transform: `translate(0px,${yy}px) scale(0)`, opacity: 0 }], [POOF + 160, { transform: `translate(${Math.cos(a) * rr * .6}px,${yy + Math.sin(a) * rr * .9}px) scale(1.1) rotate(45deg)`, opacity: 1 }],
        [POOF + 400, { transform: `translate(${Math.cos(a) * rr}px,${yy + Math.sin(a) * rr * 1.3}px) scale(0) rotate(140deg)`, opacity: 0 }]]); });
  }).then(ok => { mover.style.transform = ''; if (ok) place(cur.x, cur.y + dy); return ok; }); };
// '¿Quieres más información?' — turns toward the menu, walks a little that way if there's room, and points at it (phones: front point at the menu button)
ACT.menu = async () => { if (cur.pose !== 'fw') return; const nav = document.querySelector(isMobile() ? '.hamburger' : '.header .nav'); if (!nav) return;
  const r = nav.getBoundingClientRect(); if (!r.width) return; const nx = (r.left + r.right) / 2 + scrollX, dir = nx > cur.x ? 1 : -1, s = cur.spot;
  const E = epoch; if (s && lazyBuilt.walk) { const room = dir > 0 ? s.hi - cur.x : cur.x - s.lo; if (room > 50) await ACT.walkBy(dir * Math.min(room, 110)); }
  if (E !== epoch) return;
  if (P.p_megaphone && Math.random() < .35 && await ACT.pose('megaphone', { dir: -dir, hold: 1900, text: ph('menu') + ' ↑', alt: '¡Menú! ↑' })) return;
  if (isMobile() || !TURNS() || !lazyBuilt.point) { await ACT.pointAt(dir, '¿Quieres más información? ↑', '¿Más info? ↑'); return; }
  ACT.say(ph('menu') + ' ↑', 2600, '¿Más info? ↑'); await ACT.lookAt(dir, 500, 2); if (E === epoch) await ACT.point(dir); };
// a nearby spot in another row: walk + ladder when a clear vertical column exists (ladder + reaching arms included), else hop, else poof
function columnClear(x, y0, y1) { const k = scaleK(), H = 360 * k, [PX, PY] = PADS(), hw = Math.max(115, 160) * k; return !blocked([x - hw, Math.min(y0, y1) - H - 6, x + hw, Math.max(y0, y1) + 4], PX, PY) && !fixedHit([x - hw, Math.min(y0, y1) - H, x + hw, Math.max(y0, y1)]); }
let lastMove = [1, 1];
// next stop: inside the viewport (nb only holds fully visible spots), preferably to the other side and the other height than the last move, within hop range
function nextSpot(nb) { if (!nb.length) return null; let best = null, bs = 1e9;
  for (const q of nb) { const dx = q.x - cur.x, dy = q.y - cur.y, d = Math.hypot(dx, dy); if (d < 36) continue;
    const dyAbs = Math.abs(dy);
    let sc = (Math.sign(dx) === -lastMove[0] ? 0 : 1.1) + (dyAbs > 28 ? (Math.sign(dy) === -lastMove[1] ? 0 : .3) : 4) + (d > 640 ? 2.4 : d < 80 ? .9 : 0) + Math.random() * .7;
    if (dyAbs > 28 && d < 640) sc -= 1.6;
    if (sc < bs) { bs = sc; best = q; } }
  return best; }
async function travel(q, hopFirst) { const s = cur.spot, E = epoch; if (!q || !s) return false; const dy = q.y - cur.y, dist = Math.hypot(q.x - cur.x, dy);
  const canHop = !!(lazyBuilt.hop || (P.yjump1 && P.yland4 && P.yleapr3));
  if ((hopFirst || Math.abs(dy) > 16) && canHop && dist < 640 && hopClear(q)) { cur.spot = q; await ACT.hopTo(q.x - cur.x, dy); return true; }
  if (hopFirst) { if (Math.abs(dy) < 3 && Math.abs(q.x - cur.x) < 200 && lazyBuilt.walk && q.x >= s.lo - 1 && q.x <= s.hi + 1) { cur.spot = q; await ACT.walkBy(q.x - cur.x); return true; } await hide(true); await showAt(q, 'poof'); return true; }
  if (Math.abs(dy) < 3) { if (Math.abs(q.x - cur.x) < 500 && lazyBuilt.walk && q.x >= s.lo - 1 && q.x <= s.hi + 1) { cur.spot = q; await ACT.walkBy(q.x - cur.x); return true; } }
  else if (TURNS() && lazyBuilt.walk) {
    const xs = Math.max(s.lo, Math.min(s.hi, q.x));
    if (Math.abs(xs - q.x) <= 14 && columnClear(xs, cur.y, q.y)) { if (Math.abs(xs - cur.x) > 20) await ACT.walkBy(xs - cur.x); if (E !== epoch) return false; cur.spot = q; await ACT.ladder(q.y - cur.y); if (E === epoch && Math.abs(q.x - cur.x) > 3) place(q.x, q.y); return true; }
    const xq = Math.max(q.lo, Math.min(q.hi, cur.x));
    if (Math.abs(xq - cur.x) <= 14 && columnClear(cur.x, cur.y, q.y)) { cur.spot = q; await ACT.ladder(q.y - cur.y); if (E === epoch && Math.abs(q.x - cur.x) > 20) await ACT.walkBy(q.x - cur.x); return E === epoch; }
  }
  if (Math.hypot(q.x - cur.x, dy) < 640 && hopClear(q)) { cur.spot = q; await ACT.hopTo(q.x - cur.x, q.y - cur.y); return true; }
  await hide(true); await showAt(q, 'poof'); return true; }
// the hop arc must not pass through content either: sample the arc
function hopClear(q) { const k = scaleK(), X = q.x - cur.x, Y = q.y - cur.y, h = (110 + Math.max(0, -Y / k) * 0.25) * k;
  for (let i = 1; i < 12; i++) { const u = i / 12, x = cur.x + X * u, y = cur.y + Y * u - 4 * h * u * (1 - u); if (blocked(figBox(x, y), 4, 4) || fixedHit(figBox(x, y))) return false; } return true; }

// ---- context: he reacts to what he is next to (heading, button, card, photo, trust item, social icons, footer)
const has = (s, re) => re.test((s || '').toLowerCase());
const short = (s, n = 22) => { s = (s || '').replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s; };
const sede = s => { const m = /(?:^|[^a-záéíóúñ])(huanta|ate vitarte|ate|santa anita)(?![a-záéíóúñ])/i.exec(s || ''); return m ? m[1].replace(/\b\w/g, c => c.toUpperCase()) : ''; };
function btnText(label, wa) { const l = (label || '').toLowerCase(), sd = sede(label);
  if (sd) return [`¡Escribe a ${sd}!`, `${sd} →`]; if (wa) return [ph('wa'), '¡Aquí!'];
  if (/conocer|tratamiento/.test(l)) return ['¡Conoce el tratamiento!', '¡Conócelo!']; if (/más información|mas informacion/.test(l)) return ['¡Más información aquí!', '¡Info aquí!'];
  if (/conoce|nosotros/.test(l)) return ['¡Conócenos!', '¡Aquí!']; if (/ver|todo|servicio/.test(l)) return ['¡Míralo aquí!', '¡Aquí!']; return ['¡Haz clic aquí!', '¡Aquí!']; }
// returns candidate reactions: [pose, options] — tried in order, the first one that fits without touching anything is played
function reactions(s) { const c = s.ctx || {}, L0 = (c.label || '').toLowerCase(), dir = s.tx != null ? (s.tx < cur.x ? -1 : 1) : (s.side > 0 ? -1 : 1), R = [];
  const add = (pose, o) => R.push([pose, Object.assign({ dir }, o)]);
  if (c.type === 'button') { const [t, a] = btnText(c.label, c.wa); add('point_front', { text: t, alt: a, hold: 2000 }); add('*point', { text: t, alt: a }); return R; }
  if (c.type === 'social') { const sw = has(L0, /instagram/) ? ph('social') : ph('social', '¡Síguenos!').replace('¡Míranos en Instagram!', '¡Síguenos!'); add('point_front', { text: sw, alt: '¡Síguenos!' }); add('heart', { text: sw, alt: '¡Síguenos!' }); return R; }
  if (c.type === 'footer') { if (has(L0, /redes/)) add('point_front', { text: '¡Síguenos!' }); add('wave_hi', { text: ph('foot'), alt: '¡Chau, chau!', sway: 1 }); add('open_arms', { text: ph('foot'), alt: '¡Gracias!' }); return R; }
  if (c.type === 'logo') { add('jump', { hop: 2, text: '¡Happy Foot!', fx: '!' }); add('heart', { text: '¡Happy Foot!' }); return R; }
  if (c.type === 'trust') { if (has(L0, /sede/)) add('open_arms', { text: '¡3 sedes para ti!', alt: '¡3 sedes!' }); else if (has(L0, /desde|20\d\d/)) add('idea', { text: '¡Desde 2021!', alt: '¡2021!', fx: 'spark' });
    else if (has(L0, /estéril|higiene/)) add('clipboard', { text: '¡Todo esterilizado!', alt: '¡Limpio!' }); else add('cheer', { text: '¡Expertos!', hop: 1 }); add('point_front', { text: '¡Mira!' }); return R; }
  if (c.type === 'photo' || (c.type === 'card' && Math.random() < .35)) { add('magnifier', { text: ph('photo', '¡Mira esto!'), alt: '¡Mira!', sway: 1 }); add('gasp', { text: ph('photo'), alt: '¡Oh!' }); }
  const t = L0;
  if (has(t, /hongo|onicomicosis/)) { add('magnifier', { text: ph('svc', '¡Adiós hongos!', '¡Adiós hongos!'), alt: '¡Adiós hongos!', sway: 1 }); add('point_front', { text: ph('svc', '¡Te ayudamos!'), alt: '¡Mira!' }); }
  if (has(t, /evoluci|resultado|cambio/)) { add('gasp', { text: ph('photo', '¡Qué cambio!'), alt: '¡Wow!' }); add('magnifier', { text: ph('photo', '¡Mira la evolución!'), alt: '¡Mira!' }); }
  if (has(t, /testimon|opini|dicen|reseñ|pacientes/)) { add('heart', { text: ph('testi'), alt: '¡Gracias!' }); add('open_arms', { text: ph('testi'), alt: '¡Gracias!' }); }
  if (has(t, /sede|encuentra|ubica/)) { add('open_arms', { text: ph('sede'), alt: '¡Ven!' }); }
  if (has(t, /cuidado|integral|servicio|quiropodia|profilaxis/)) { add('heart', { text: ph('svc', '¡Cuidamos tus pies!'), alt: '¡Con cariño!' }); add('clipboard', { text: short(c.label, 20) + ' ✓', alt: '¡Anotado!' }); }
  if (has(t, /uñero|ortonixia|extracción/)) { add('clipboard', { text: short(c.label, 20) + ' ✓', alt: '¡Anotado!' }); add('point_front', { text: ph('svc', '¿Uñero? ¡Te ayudamos!', '¡Te ayudamos!'), alt: '¡Te ayudamos!' }); }
  if (has(t, /listos|atender|contact|reserva|cita/)) { add('megaphone', { text: ph('wa'), alt: '¡Escríbenos!' }); add('open_arms', { text: ph('wa', '¡Te esperamos!'), alt: '¡Te esperamos!' }); }
  if (has(t, /\?|pregunta|duda|cómo|qué|cuál|por qué/)) { add('think', { text: '¿Tienes dudas?', alt: 'Mmm…', fx: '?' }); add('chin', { text: 'Mmm…', fx: '?' }); }
  if (has(t, /acceso/)) { add('point_front', { text: '¡Elige aquí! ↓', alt: '↓ ¡Mira!' }); }
  if (has(t, /especialista|happy foot/)) { add('cheer', { text: '¡Hola!', hop: 1 }); add('idea', { text: '¡Te ayudamos!', fx: 'spark' }); }
  if (c.type === 'card') { add('point_front', { text: short(c.label, 24), alt: '¡Mira!' }); add('book', { text: '¡Interesante!', alt: 'Mmm…' }); }
  add('book', { text: 'Leyendo…', alt: '' }); add('chin', { fx: '?' }); add('idea', { fx: 'spark' });
  return R; }
async function react(s) { const E = epoch; if (!s || cur.pose !== 'fw') return false;
  const dir = s.tx != null ? (s.tx < cur.x ? -1 : 1) : 1;
  if (TURNS() && s.ctx && (s.ctx.type === 'photo' || s.ctx.type === 'card') && Math.random() < .6) { await ACT.lookAt(dir, 520, 3); if (E !== epoch) return false; }
  for (const [p, o] of reactions(s)) { if (E !== epoch || cur.pose !== 'fw') return false;
    if (p === '*point') { if (TURNS() && lazyBuilt.point) { if (o.text) ACT.say(o.text, 2500, o.alt); await ACT.point(o.dir); return true; } continue; }
    if (await ACT.pose(p, o)) return true; }
  return false; }
// sits ON a button's top edge and points down at it (the one intended contact); then leaves
async function seatVisit(st) { if (!P.p_seat_point) return false; const sp = P.p_seat_point, sr = P.p_seat_rest;
  if (cur.visible) await hide(true); epoch++; const E = epoch;
  sp.style.transform = sr.style.transform = st.dir < 0 ? 'scaleX(-1)' : ''; if (P.seat_mid) P.seat_mid.style.transform = sp.style.transform;
  if (st.fixed) { root.style.position = 'fixed'; cur.fixed = true; cur.x = st.x + scrollX; cur.y = st.y + scrollY; root.style.transform = `translate(${st.x.toFixed(1)}px,${(st.y - SOLE * scaleK()).toFixed(1)}px)`; } else place(st.x, st.y); cur.spot = st; cur.visible = true; root.style.visibility = 'visible'; setPose('p_seat_rest'); cur.seated = true;
  const c = st.ctx || {}, lbl = st.wa ? [ph('wa') + ' ↓', '¡Aquí! ↓'] : sede(c.label) ? [`¡Escribe a ${sede(c.label)}! ↓`, '¡Aquí! ↓']
    : c.type === 'card' ? [has(c.label, /evoluci/) ? '¡Mira el cambio! ↓' : has(c.label, /sede/) ? '¡Encuentra tu sede! ↓' : has(c.label, /hongo/) ? '¡Mira este caso! ↓' : '¡Mira esto! ↓', '¡Mira! ↓']
    : c.type === 'photo' ? ['¡Mira! ↓', '↓'] : [btnText(c.label, false)[0] + ' ↓', '¡Aquí! ↓'];
  await clip(320, (tl) => { burst(tl, 25, .5, false); tl(pop, [[0, { transform: tr(-26, .3, .3) }], [70, { transform: tr(-14, .9, 1.14), easing: 'cubic-bezier(.4,0,1,1)' }], [120, { transform: tr(0, 1.14, .86), easing: 'cubic-bezier(.2,.8,.4,1)' }], [200, { transform: tr(-3, .97, 1.04) }], [320, { transform: tr(0, 1, 1) }]]);
    tl(shadow, [[0, { opacity: 0 }]]); });
  if (E !== epoch) return false; await sleep(250); if (E !== epoch) return false;
  ACT.say(lbl[0], 2700, lbl[1]);
  await clip(2900, (tl, flip) => { flip(poseEls(), P.seat_mid ? [[60, 'seat_mid'], [170, 'p_seat_point'], [2440, 'seat_mid'], [2550, 'p_seat_rest']] : [[120, 'p_seat_point'], [2500, 'p_seat_rest']], 'p_seat_rest');
    tl(pop, [...squashF(120, .5), [600, { transform: tr(0, 1, 1) }], [1000, { transform: tr(-4, 1, 1) }], [1250, { transform: tr(0, 1, 1) }], [1650, { transform: tr(-4, 1, 1) }], [1900, { transform: tr(0, 1, 1) }], ...squashF(2500, .4)]); });
  return E === epoch; }
function leaveSeat() { cur.seated = false; if (cur.fixed) { root.style.position = ''; cur.fixed = false; } if (P.p_seat_point) P.p_seat_point.style.transform = P.p_seat_rest.style.transform = ''; if (P.seat_mid) P.seat_mid.style.transform = ''; shadow.style.opacity = ''; }
// the floating WhatsApp button (fixed in the viewport): he can sit on it too — he is fixed with it, and leaves as soon as the page scrolls
function floatSeat() { const fl = document.querySelector('.whatsapp-float'); if (!fl || !P.p_seat_point) return null; const t = fl.querySelector('.whatsapp-toggle') || fl.querySelector('a,button') || fl, r = t.getBoundingClientRect();
  if (!r.width || getComputedStyle(fl).opacity === '0' || getComputedStyle(fl).visibility === 'hidden') return null;
  const k = scaleK(), f = L.p_seat_point, tip = (f.x + f.w * 0.06) * k, [PX, PY] = PADS(), vw = document.documentElement.clientWidth;
  const cx0 = (r.left + r.right) / 2, rad = r.width / 2;
  for (const dir of [-1, 1]) { const off = Math.min(rad * .55, tip * .45), x = cx0 - off * dir, y = r.top + (rad - Math.sqrt(Math.max(0, rad * rad - off * off))) + 1, bb = frameBox('p_seat_point', x + scrollX, y + scrollY, dir);
    if (bb[0] < scrollX + 4 || bb[2] > scrollX + vw - 4 || bb[1] < scrollY + headerH() + 4) continue; if (blocked([bb[0], bb[1], bb[2], bb[3] - 4], PX * .7, PY * .7)) continue;
    return { kind: 'seat', fixed: true, el: fl, x, y, dir, lo: x, hi: x, wa: true, sy: scrollY, ctx: { type: 'seat', label: 'WhatsApp', wa: true } }; } return null; }
// peeks out from behind a card/photo edge (or over its top), says something about it, hides again — then pops back to a standing spot
const PEEKW = { any: ['¡Psst! ¡Mira esto!', '¡Te veo!', '¡Cucú!', '¿Me buscabas?', '¡Aquí estoy!', '¡Hola, hola!', '¡Mira aquí!'], photo: ['¡Te veo!', '¡Cucú!', '¡Qué buena foto!', '¡Aquí estoy!', '¡Wow!', '¡Casos reales!', '¡Esto me encanta!'], testi: ['¡Lee lo que dicen!', '¡Pacientes felices!', '¡Cucú!', '¡Te veo!'],
  hongo: ['¡Adiós hongos!', '¡Uñas sanas!', '¡Te veo!', '¡Cucú!'], evol: ['¡Qué cambio!', '¡Mira la diferencia!', '¡Cucú!', '¡Mira el antes y después!', '¡Así quedó!', '¡Mira qué resultado!'], sede: ['¡Te esperamos!', '¡Ven a vernos!', '¡Cucú!'] }; let lastPeekW = '';
async function peekVisit(pk) { const w = PKS[pk.id]; if (!w) return false; if (cur.visible) await hide(true); epoch++; const E = epoch; const k = scaleK(), f = L[pk.id];
  place(pk.x, pk.y); setPose('none'); shadow.style.opacity = 0; cur.visible = true; cur.spot = pk; root.style.visibility = 'visible';
  // clip window (units, relative to the edge point) and the sprite's slide-in offset
  let bx, by, bw, bh, ax, ay, from;
  if (pk.kind === 'ledge') { bx = f.x - 10; bw = f.w + 20; by = f.y - 10; bh = -f.y + 10; ax = 0; ay = 0; from = 'translate(0px,' + (f.h + 6) + 'px)'; }
  else if (pk.side < 0) { bx = -(f.edge[0] - f.x) - 4; bw = -bx; by = f.y - 10; bh = f.h + 14; ax = -f.edge[0]; ay = 0; from = 'translate(' + (f.edge[0] - f.x + 6) + 'px,0px)'; }
  else { bx = 0; bw = f.x + f.w - f.edge[0] + 4; by = f.y - 10; bh = f.h + 14; ax = -f.edge[0]; ay = 0; from = 'translate(' + (-(f.edge[0] - f.x) - (f.x + f.w - f.edge[0]) - 6) + 'px,0px)'; }
  Object.assign(pbox.style, { left: bx + 'px', top: by + 'px', width: bw + 'px', height: bh + 'px', opacity: 1 });
  for (const n in PKS) PKS[n].style.opacity = PKS[n] === w ? 1 : 0; w.style.left = (ax - bx) + 'px'; w.style.top = (ay - by) + 'px';
  const fig = pk.kind === 'ledge' ? { x: pk.x, y: pk.y, H: pk.hk, W: f.w * k } : { x: pk.x + (pk.side < 0 ? -1 : 1) * pk.vis / 2, y: pk.y, H: pk.hk, W: pk.vis };
  const c = pk.ctx || {}, pool = c.type === 'photo' ? PEEKW.photo : has(c.label, /hongo/) ? PEEKW.hongo : has(c.label, /evoluci|resultado/) ? PEEKW.evol : has(c.label, /sede/) ? PEEKW.sede : has(c.label, /testimon|opini|dicen|pacientes/) ? PEEKW.testi : PEEKW.any;
  let wi = Math.floor(Math.random() * pool.length); if (pool[wi] === lastPeekW || pool[wi] === lastSaid) wi = (wi + 1) % pool.length; lastPeekW = pool[wi]; const words = [pool[wi], '¡Cucú!'];
  const T = 3300, bt = setTimeout(() => { if (E === epoch) ACT.say(words[0], 2400, words[1], fig); }, 420);
  const ok = await clip(T, (tl) => { tl(w, [[0, { transform: from }], [380, { transform: 'translate(0px,0px)', easing: 'cubic-bezier(.2,.9,.3,1.15)' }], [900, { transform: 'translate(0px,0px)' }],
      [1300, { transform: pk.kind === 'ledge' ? 'translate(0px,-6px)' : 'translate(' + (pk.side < 0 ? -5 : 5) + 'px,0px)', easing: 'ease-in-out' }], [1700, { transform: 'translate(0px,0px)', easing: 'ease-in-out' }],
      [2800, { transform: 'translate(0px,0px)' }], [T - 40, { transform: from, easing: 'cubic-bezier(.5,0,.8,.4)' }], [T, { transform: from }]]); });
  clearTimeout(bt);
  pbox.style.opacity = 0; shadow.style.opacity = ''; if (E !== epoch) return false;
  root.style.visibility = 'hidden'; cur.visible = false; cur.spot = null; setPose('fw'); return ok; }

// what he does when he arrives somewhere: react to what is next to him
const visited = new Set();
async function arrive(s) { cur.arrivedAt = Date.now(); cur.dwell = rnd(1600, 2500); if (!s || cur.pose !== 'fw' || cur.spot !== s || !cur.visible) return; const first = !visited.has(s.key); visited.add(s.key);
  if (s.kind === 'b') { if (first || Math.random() < .5) { const [t, a] = btnText(s.ctx.label, s.wa); await ACT.invite(s.tx < cur.x ? -1 : 1, t, !isMobile() && Math.random() < .4, a); } return; }
  if (first ? Math.random() < .85 : Math.random() < .4) await react(s); }

// ---------------------------------------------------------------- director
let lastInput = Date.now(), lastScrollT = 0, lastScrollY = scrollY, vel = 0, settleTimer = 0, idleTimer = 0, blinkTimer = 0, offscreen = false, pageHidden = document.hidden;
const scrollHist = [];
const busyRun = (fn) => { if (cur.busy) return Promise.resolve(); cur.busy = true; return Promise.resolve().then(fn).catch(e => {  }).then(r => { cur.busy = false; return r; }); };
async function showAt(s, how) {
  epoch++; mover.style.transform = ''; ladder.style.opacity = 0; pbox.style.opacity = 0; if (cur.seated) leaveSeat(); cur.spot = s; place(s.x, s.y); cur.visible = true; root.style.visibility = 'visible'; if (window.__hfLazy) window.__hfLazy();
  if (how === 'entrance') await ACT.entrance(); else if (how === 'still') { setPose('fw'); setArm('3'); await clip(260, tl => tl(pop, squashF(40, .4))); } else if (how !== 'quiet' && W2() && Math.random() < .4) await ACT.walkIn(); else await ACT.poofIn(how === 'quiet');
  if (how === 'quiet' && Math.random() < .6) ACT.say(hello(), 1900, '¡Hola!');
  save();
}
async function hide(anim = true) { if (!cur.visible) return; epoch++; abortClip(); stopWaveLoop(); if (sayAnim) { sayAnim.cancel(); sayAnim = null; } mover.style.transform = ''; ladder.style.opacity = 0; pbox.style.opacity = 0;
  if (cur.seated) { if (anim) await ACT.poofOut(); leaveSeat(); setPose('fw'); anim = false; }
  if (cur.pose === 'none') { setPose('fw'); anim = false; }
  if (anim) { if (cur.pose === 'fw' && W2() && Math.random() < .35) await ACT.walkOut(); else await ACT.poofOut(); } root.style.visibility = 'hidden'; cur.visible = false; cur.spot = null; pop.style.transform = ''; save(); }
function onScroll() {
  const now = performance.now(), dy = Math.abs(scrollY - lastScrollY), dt = Math.max(1, now - lastScrollT);
  vel = vel * 0.6 + (dy / dt) * 0.4; lastScrollY = scrollY; lastScrollT = now; lastInput = Date.now(); scrollHist.push([now, scrollY]); while (scrollHist.length && now - scrollHist[0][0] > 700) scrollHist.shift();
  if ((cur.sleeping || cur.sitting) && !cur.seated) wakeUp();
  if (cur.fixed && cur.visible && !cur.hiding && cur.spot && Math.abs(scrollY - cur.spot.sy) > 24) { cur.hiding = true; abortClip(); cur.busy = false; hide(true).then(() => { cur.hiding = false; }); }
  if (vel > (isMobile() ? 3.2 : 2.4) && cur.visible && !cur.hiding && happyOnScreen()) { cur.hiding = true; abortClip(); cur.busy = false; hide(true).then(() => { cur.hiding = false; }); }
  if (cur.visible && !cur.hiding && !cur.busy && (fixedHit(figBox(cur.x, cur.y), 2) || figBox(cur.x, cur.y)[1] < scrollY + headerH() - 2)) { clearTimeout(settleTimer); settleTimer = setTimeout(onSettle, 80); return; }
  clearTimeout(settleTimer); settleTimer = setTimeout(onSettle, isMobile() ? 320 : 260);
}
function wakeUp() { if (!cur.sitting || cur.busy) return; const was = cur.sleeping; busyRun(async () => { await ACT.wake(); if (was) ACT.say(ph('wake'), 1800, '¡Hola!'); }); }
async function relocate(s) { if (cur.busy || !cur.visible) return; await busyRun(async () => { if (!s) { await hide(true); return; }
  const dx = s.x - cur.x; if (Math.abs(s.y - cur.y) < 3 && Math.abs(dx) < 420 && lazyBuilt.walk && lazyBuilt.turn && !cur.sitting && !cur.seated) { cur.spot = s; await ACT.walkBy(dx); } else { await hide(true); await showAt(s, 'poof'); } }); }
// flicker guard: only settle once the page has really come to rest (no movement for the timer AND < 150 px moved over the last half second)
function stillEnough() { const now = performance.now(); if (now - lastScrollT < 200) return false; const old = scrollHist.find(h => now - h[0] <= 500); return !old || Math.abs(scrollY - old[1]) < 150; }
async function onSettle() {
  vel = 0; if (userOff || cur.hiding) return;
  if (!stillEnough()) { clearTimeout(settleTimer); settleTimer = setTimeout(onSettle, 200); return; }
  if (dirty) await computeSpots();                                      // only when the layout actually changed (ResizeObserver)
  const s = bestSpot();
  if (cur.visible && cur.spot && spotVisible(cur.spot)) return;           // stays where he is
  if (!s) {   // no free standing spot in view (dense card grids): sit on top of a card / button instead
    if (!(cur.visible && cur.spot && spotVisible(cur.spot)) && await fallbackVisit(true)) return;
    if (cur.visible && !happyOnScreen()) { root.style.visibility = 'hidden'; cur.visible = false; } return; }
  if (cur.busy && cur.visible && !happyOnScreen()) {         // scrolled away mid-action: drop it and come along right away
    epoch++; abortClip(); stopWaveLoop(); if (sayAnim) sayAnim.cancel(); mover.style.transform = ''; ladder.style.opacity = 0; pbox.style.opacity = 0; if (cur.seated) leaveSeat();
    if (cur.sitting) { cur.sitting = false; cur.sleeping = false; zzz.forEach(z => { if (z._a) z._a.cancel(); z._a = null; z.style.opacity = 0; }); if (P.sitSleep) P.sitSleep.style.opacity = 0; startBreath(false); }
    setPose('fw'); setArm('3'); root.style.visibility = 'hidden'; cur.visible = false; cur.busy = false; }
  if (cur.busy) { setTimeout(onSettle, 300); return; }
  await busyRun(async () => {
    if (cur.visible && happyOnScreen()) {
      const dx = s.x - cur.x, dy = s.y - cur.y;
      if (Math.abs(dy) < 3 && Math.abs(dx) < 420 && lazyBuilt.walk && lazyBuilt.turn && !cur.sitting && !cur.seated) { cur.spot = s; await ACT.walkBy(dx); await arrive(s); return; }
      await hide(true);
    }
    if (cur.sitting) { cur.sitting = false; cur.sleeping = false; setPose('fw'); }
    await showAt(s, 'poof'); await sleep(150);
    if (Math.random() < .35 && lastFast && Date.now() - lastFast < 2500) { if (P.surprise1 && await ACT.seq(['surprise1', 'surprise2', 'surprise3', 'surprise4'], 1, 260, ph('fast'))) return; if (P.p_surprised) { await ACT.pose('surprised', { text: ph('fast'), alt: '¡Uy!', hold: 1300 }); return; } }
    if (lastFast && Date.now() - lastFast < 2500 && Math.random() < .5) ACT.say(ph('fast'), 1600, '¡Ya llegué!');
    await arrive(s);
  });
}
let lastFast = 0; addEventListener('scroll', () => { if (vel > 2.4) lastFast = Date.now(); }, { passive: true });
function scheduleIdle(after) { clearTimeout(idleTimer); let d = (after === 'busy' ? rnd(500, 800) : after ? rnd(900, 2000) : rnd(1800, 3200)) * TF; if (after !== 'busy' && cur.arrivedAt && cur.visible) d = Math.min(d, Math.max(250, cur.arrivedAt + cur.dwell - Date.now())); idleTimer = setTimeout(idleTick, d); }   // short gaps: he is always up to something
let lastFloatSeat = 0; const recent = []; const remember = q => { if (!q || !q.key) return; recent.push(q.key); while (recent.length > 4) recent.shift(); };
const visibleNear = (list, s) => list.filter(q => spotVisible(q) && (!s || (Math.abs(q.y - s.y) < innerHeight * .8)));
// seats (on top of a card/button) or peeks (from behind a card edge) when there is no free standing spot in view
async function fallbackVisit(settle) { const st = P.p_seat_point ? SEATS.filter(q => !q.fixed && q !== cur.spot && spotVisible(q)) : [], pk = lazyBuilt.peek ? PEEKS.filter(q => spotVisible(q)) : [];
  if (!st.length && !pk.length) return false; if (cur.busy) { if (settle) setTimeout(onSettle, 300); return true; }
  const r = a => a[Math.floor(Math.random() * a.length)];
  await busyRun(() => st.length && (!pk.length || Math.random() < .6) ? seatVisit(r(st)) : peekVisit(r(pk))); return true; }
async function idleTick() {
  scheduleIdle(cur.busy ? 'busy' : false);
  if (!cur.visible && !cur.busy && !pageHidden && !userOff && !cur.hiding && !reduce) { const s2 = bestSpot();   // came back into a zone with room again
    if (s2) { await busyRun(async () => { await showAt(s2, 'poof'); await sleep(120); await arrive(s2); }); return; }
    await fallbackVisit(false); return; }
  if (!cur.visible || cur.busy || offscreen || pageHidden || userOff) return;
  
  const quiet = Date.now() - lastInput, s = cur.spot, m = isMobile();
  if (cur.seated) { const n = bestSpot();
    if (!n) { await fallbackVisit(false); return; }
    await busyRun(async () => { await hide(true); await showAt(n, 'poof'); await sleep(120); await arrive(n); }); return; }
  if (quiet > 60000 * TF && !cur.sitting && lazyBuilt.rest) { await busyRun(async () => { if (P.p_zen && Math.random() < .5) await ACT.pose('zen', { hold: 2600, text: ph('drowsy'), alt: '*bostezo*' }); else ACT.say(ph('drowsy'), 2200, '*bostezo*'); await ACT.sit(); }); return; }
  if (quiet > 80000 * TF && cur.sitting && !cur.sleeping) { ACT.sleep(); ACT.say(ph('sleep'), 2400, 'Zzz…'); save(); return; }
  if (cur.sleeping && Math.random() < .25) { ACT.say(ph('sleep'), 2400, 'Zzz…'); return; }
  if (cur.sitting) { const r = Math.random(); if (cur.sleeping || cur.pose !== 'sit') return;
    const xs = Object.keys(XSIT).filter(k => XSIT[k][0].every(f => P[f]));
    if (xs.length && r < .3) { const q = XSIT[xs[Math.floor(Math.random() * xs.length)]]; await busyRun(() => ACT.seq(q[0], q[1], q[2], q[3], 'sit')); return; }
    if (r < .55) await busyRun(() => ACT.sitPose(Math.random() < .5 ? 'sit_cheeks' : 'sit_cheer')); else if (r < .8) { await busyRun(() => ACT.wake()); } else ACT.say(ph('quiet'), 2200, '¿Hola?'); return; }
  const opts = [['talkWave', 1.5], ['think', 1], ['tap', .6]];
  if (s && s.ctx) opts.push(['react', 4]);
  if (quiet > 20000 * TF) opts.push(['quiet', 1.5]);
  if (scrollY + innerHeight * 2 < document.documentElement.scrollHeight) opts.push(['more', .9]);
  if (lazyBuilt.turn) opts.push(['lookAround', 1.5]);
  if (s && s.brand && spotVisible({ y: s.brand.y + 20 }, false)) opts.push(['brand', 2.5]);
  if (s && s.kind === 'b') opts.push(['inviteAgain', 2.5]);
  if (s && s.kind === 'h' && lazyBuilt.point && lazyBuilt.turn) opts.push(['present', m ? 1 : 1.5]);
  if (s && scrollY < innerHeight * .9 && (lazyBuilt.point || P.p_point_front)) opts.push(['menu', 1.2]);
  // he moves around a lot: any other visible spot (not the last few he visited) is a candidate; walk / hop / ladder / poof is chosen by travel()
  const nb = s ? SPOTS.filter(q => q !== s && spotVisible(q) && !recent.includes(q.key) && !fixedHit(figBox(q.x, q.y))) : [];
  if (nb.length) opts.push(['travel', 22]);
  const seats = P.p_seat_point ? visibleNear(SEATS, s) : []; if (seats.length) opts.push(['seat', m ? 3 : 2.5]);
  const fseat = Date.now() - lastFloatSeat > 30000 * TF ? floatSeat() : null; if (fseat) opts.push(['floatSeat', 2.5]);
  const peeks = lazyBuilt.peek ? visibleNear(PEEKS, s) : []; if (peeks.length) opts.push(['peek', m ? 4.5 : 2.2]);
  const bt = document.querySelector('.back-to-top'); if (bt && P.p_point_front && scrollY > innerHeight * 1.5) { const r = bt.getBoundingClientRect(); if (r.width && getComputedStyle(bt).opacity !== '0' && r.top < innerHeight) opts.push(['toTop', 1.5]); }
  if (lazyBuilt.turn) opts.push(['spin', m ? .6 : 1]);
  if (lazyBuilt.wink) opts.push(['thumbs', 1.5]);
  if (P.p_lie_chin && lazyBuilt.lie) opts.push(['lie', m ? .9 : .7]);
  if (P.dance1) { opts.push(['dance', 1.6]); opts.push(['clap', 1.4]); }
  for (const k in XSEQ) if (XSEQ[k][0].every(f => P[f])) opts.push(['x:' + k, .55]);
  if (P.p_book) opts.push(['book', .6]); if (P.p_shy) opts.push(['shy', .4]);
  if (s && lazyBuilt.walk && lazyBuilt.turn && s.hi - s.lo > 90 * scaleK() / 0.47) opts.push(['stroll', m ? .4 : .6]);
  let tot = opts.reduce((a, o) => a + o[1], 0), r = Math.random() * tot, pick = opts[0][0]; for (const [n, w] of opts) { if ((r -= w) < 0) { pick = n; break; } }
  // Miguel: he never stays long — after 2-4 s (action included) he hops to another visible spot, alternating left/right and higher/lower
  let next = null; if (nb.length && cur.arrivedAt && Date.now() - cur.arrivedAt > cur.dwell) { next = nextSpot(nb); if (next) pick = 'travel'; }
  if (!next && cur.arrivedAt && Date.now() - cur.arrivedAt > cur.dwell && (peeks.length || seats.length)) pick = peeks.length && (!seats.length || Math.random() < .6) ? 'peek' : 'seat';
  if (pick === 'travel' && !next) next = nextSpot(nb);
  if (!next && pick !== 'peek' && pick !== 'seat' && cur.arrivedAt && Date.now() - cur.arrivedAt > cur.dwell && !nb.length) pick = 'hopplace';   // only spot in view: hop out and back in instead of standing still
  
  await busyRun(() => runIdle(pick, s, { nb, seats, peeks, bt, fseat, next })); scheduleIdle(true);
}
async function runIdle(pick, s, o) {
    if (pick === 'stroll') { let tx = rnd(s.lo, s.hi); if (Math.abs(tx - cur.x) < 60) tx = cur.x < (s.lo + s.hi) / 2 ? s.hi : s.lo;
      await ACT.walkBy(tx - cur.x); if (Math.random() < .5) await ACT.talkWave(1100, false); return; }
    if (pick === 'react') { if (!await react(s)) await ACT.talkWave(1200); return; }
    if (pick === 'present') { await ACT.point(s.tx < cur.x ? -1 : 1); return; }
    if (pick === 'brand') { ACT.say('¡Happy Foot!', 1700); await ACT.excite(s.brand.x < cur.x ? -1 : 1); return; }
    if (pick === 'inviteAgain') { const [t, a] = btnText(s.ctx.label, s.wa); await ACT.invite(s.tx < cur.x ? -1 : 1, t, false, a); return; }
    if (pick === 'menu') { await ACT.menu(); return; }
    if (pick === 'quiet') { ACT.say(ph('quiet'), 2300, '¿Hola?'); await ACT.talkWave(1500, false); return; }
    if (pick === 'more') { ACT.say(ph('more') + ' ↓', 2300, '¡Hay más! ↓'); await ACT.talkWave(1500, false); return; }
    if (pick === 'travel') { const q = o.next || o.nb[Math.floor(Math.random() * o.nb.length)], dx = q.x - cur.x, dy = q.y - cur.y; if (await travel(q, true)) { lastMove = [Math.sign(dx), Math.sign(dy)]; remember(q); await arrive(q); } return; }
    if (pick === 'floatSeat') { lastFloatSeat = Date.now(); await seatVisit(o.fseat); return; }
    if (pick === 'seat') { const st = o.seats.sort((a, b) => Math.hypot(a.x - cur.x, a.y - cur.y) - Math.hypot(b.x - cur.x, b.y - cur.y))[0]; await seatVisit(st); return; }
    if (pick === 'hopplace') { const q = cur.spot; if (P.yjump1 && Math.random() < .5) await ACT.seq(['yjump1', 'yjump2', 'yjump3', 'yjump4', 'yland4'], 1, 130); else if (P.p_jump && Math.random() < .4) await ACT.pose('jump', { hold: 900, hop: 2 }); else if (q) { await hide(true); await sleep(500); if (spotVisible(q) && !cur.visible) await showAt(q, 'poof'); } cur.arrivedAt = Date.now(); cur.dwell = rnd(1600, 2400); return; }
    if (pick === 'peek') { const back = cur.spot, pk = o.peeks[Math.floor(Math.random() * o.peeks.length)]; await peekVisit(pk); const n = (back && spotVisible(back)) ? back : bestSpot(); if (n && !cur.visible) { await showAt(n, 'poof'); cur.arrivedAt = Date.now(); cur.dwell = rnd(1500, 2300); } return; }
    if (pick === 'toTop') { const r = o.bt.getBoundingClientRect(); await ACT.pointAt(r.left + scrollX < cur.x ? -1 : 1, ph('top') + ' ↑', '↑ ¡Arriba!'); return; }
    if (pick === 'book') { await ACT.pose('book', { hold: 2400, sway: 1 }); return; }
    if (pick === 'lie') { const id = Math.random() < .55 ? 'lie_chin' : 'lie_sleep', d = Math.random() < .5 ? -1 : 1;
      if (!await ACT.pose(id, { dir: d, hold: id === 'lie_sleep' ? 3200 : 2600, text: id === 'lie_sleep' ? ph('sleep') : '¡Qué cómodo!', alt: '' })) await ACT.pose(id, { dir: -d, hold: 2400 }); return; }
    if (pick === 'dance') { if (!await ACT.seq(['dance1', 'dance2', 'dance3', 'dance4'], 2, 190, Math.random() < .4 ? '¡A bailar!' : '')) await ACT.talkWave(1100); return; }
    if (pick === 'clap') { if (!await ACT.seq(['clap1', 'clap2', 'clap3', 'clap2'], 2, 130, Math.random() < .4 ? '¡Bravo!' : '')) await ACT.thumbs(); return; }
    if (pick.startsWith('x:')) { const q = XSEQ[pick.slice(2)]; if (!await ACT.seq(q[0], q[1], q[2], Math.random() < .5 ? q[3] : '')) await ACT.talkWave(1100); return; }
    if (pick === 'shy') { await ACT.pose('shy', { hold: 1500 }); return; }
    await ACT[pick]();
}
function scheduleBlink() { clearTimeout(blinkTimer); blinkTimer = setTimeout(async () => { scheduleBlink(); if (cur.visible && !cur.busy && !offscreen && !pageHidden && !cur.sleeping) { cur.busy = true; await ACT.blink(); cur.busy = false; } }, rnd(2200, 5200)); }
// ---- persistence across pages: remember where on the screen he was, so the next page can continue from there
function save() { if (!SS) return; try { SS.setItem('hf-happy', JSON.stringify({ v: 2, seen: true, sitting: cur.sitting, sleeping: cur.sleeping, vis: cur.visible, t: Date.now(),
  vy: cur.visible ? (cur.y - scrollY) / innerHeight : null, vx: cur.visible ? (cur.x - scrollX) / innerWidth : null })); } catch (e) { } }
function load() { try { return JSON.parse(SS && SS.getItem('hf-happy') || 'null'); } catch (e) { return null; } }

// ---- toggle
let userOff = !!(LS && LS.getItem('hf-happy-off') === '1');
const btn = el('button', 'hfh-toggle', null); btn.type = 'button';
const ICO_EYE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 5c-5 0-9.3 3.1-11 7 1.7 3.9 6 7 11 7s9.3-3.1 11-7c-1.7-3.9-6-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2.5A2.5 2.5 0 1 0 12 7a2.5 2.5 0 0 0 0 7.5z"/></svg>';
const ICO_EYE_OFF = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.3 2.3 2 3.6l3.1 3.1C3.3 8 1.8 9.8 1 12c1.7 3.9 6 7 11 7 1.8 0 3.5-.4 5-1.1l3.4 3.4 1.3-1.3L3.3 2.3zM12 17c-3.8 0-7.2-2.3-8.8-5 1-1.6 2.4-2.9 4.1-3.7l1.6 1.6A3.99 3.99 0 0 0 12 16a4 4 0 0 0 2.1-.6l1.5 1.5A8.7 8.7 0 0 1 12 17zm0-10c3.8 0 7.2 2.3 8.8 5-.5.9-1.2 1.7-2 2.4l-1.5-1.5c.4-.4.7-.9.7-1.4a4 4 0 0 0-4-4c-.5 0-1 .1-1.4.4L10.8 7C11.2 7 11.6 7 12 7z"/></svg>';
function syncBtn() { btn.innerHTML = userOff ? ICO_EYE : ICO_EYE_OFF;
  btn.setAttribute('aria-label', userOff ? 'Mostrar a Happy' : 'Ocultar a Happy'); btn.title = userOff ? 'Mostrar a Happy' : 'Ocultar a Happy'; btn.classList.toggle('off', userOff); }
btn.addEventListener('click', async () => { if (reduce) return; userOff = !userOff; if (LS) try { LS.setItem('hf-happy-off', userOff ? '1' : '0'); } catch (e) { } syncBtn();
  if (userOff) { abortClip(); cur.busy = false; await hide(true); } else { await computeSpots(); const s = bestSpot(); if (s) showAt(s, 'poof'); } });

// ---------------------------------------------------------------- boot
function decode(secs) { return Promise.all(secs.map(k => { const i = new Image(); i.decoding = 'async'; i.src = M.sections[k].src; return i.decode().catch(() => 0).then(() => i); })); }
const keep = [];
async function boot() {
  document.body.appendChild(root); document.body.appendChild(btn); syncBtn(); applyScale();
  root.style.visibility = 'hidden';
  if (reduce) {                                            // static: front pose next to the first heading, no motion at all
    root.classList.add('hfh-static'); await decode(['core']); await computeSpots(); setPose('fw'); setArm('3');
    const s = bestSpot() || SPOTS[0]; if (s && !userOff) { place(s.x, s.y); root.style.visibility = 'visible'; cur.visible = true; cur.spot = s; }
    btn.addEventListener('click', () => { userOff = !userOff; if (LS) try { LS.setItem('hf-happy-off', userOff ? '1' : '0'); } catch (e) { } syncBtn(); root.style.visibility = userOff ? 'hidden' : 'visible'; }); return;
  }
  // the loader starts this script right after first paint (low priority); the core sheet is small and decodes off the main thread
  keep.push(...await decode(['core']));
  await (document.fonts && document.fonts.ready.catch(() => 0));
  // let the page's own entrance/reveal animations settle so the free-space map is measured at the final layout
  const t0 = performance.now(); await sleep(Math.max(30, 220 - t0));
  // ...including the hero's word-by-word heading animation (its words move, and he stands on their baseline)
  const running = () => document.getAnimations().filter(a => { const t = a.effect && a.effect.target; if (!t || root.contains(t) || a.playState !== 'running') return false; return isFinite(a.effect.getComputedTiming().endTime); });
  await Promise.race([Promise.all(running().map(a => a.finished.catch(() => 0))), sleep(Math.max(0, 700 - performance.now()))]);
  
  await computeSpots();
  startBreath(false);
  const st = load(), returning = st && st.seen && Date.now() - st.t < 30 * 60 * 1000;
  addEventListener('scroll', onScroll, { passive: true });
  for (const ev of ['pointermove', 'keydown', 'touchstart']) addEventListener(ev, () => { lastInput = Date.now(); if ((cur.sleeping || cur.sitting) && !cur.seated) wakeUp(); }, { passive: true });
  // layout changes (lazy images, fonts, resize, accordions) mark the free-space map dirty; it is re-measured (time-sliced) only then
  let roT = 0, lastH = document.body.scrollHeight, lastW = innerWidth;
  let lastVH = innerHeight;
  const onLayout = () => { clearTimeout(roT); roT = setTimeout(async () => { const h = document.body.scrollHeight, w = innerWidth, vh = innerHeight; if (h === lastH && w === lastW && vh === lastVH) return; if (w !== lastW) stickyEls = null; lastH = h; lastW = w; lastVH = vh; dirty = true;
    applyScale(); await computeSpots(); if (cur.visible && cur.spot && !cur.busy) { const s = SPOTS.find(q => q.el === cur.spot.el && q.kind === cur.spot.kind); if (s) { cur.spot = s; place(s.x, s.y); } else hide(false).then(onSettle); } }, 250); };
  if ('ResizeObserver' in window) new ResizeObserver(onLayout).observe(document.body); addEventListener('resize', onLayout); addEventListener('orientationchange', onLayout);
  document.addEventListener('visibilitychange', () => { pageHidden = document.hidden; for (const a of root.getAnimations({ subtree: true })) pageHidden ? a.pause() : a.play(); });
  new IntersectionObserver(es => { offscreen = !es[0].isIntersecting; if (breathLoop) offscreen ? breathLoop.pause() : breathLoop.play(); }).observe(pop);
  addEventListener('pagehide', save);
  scheduleIdle(); scheduleBlink();
  // lazy action groups: only after Happy has actually been shown. Phones get the light set (Miguel's front poses incl. the front point; no turn/walk/ladder)
  let lazyStarted = false, afterWalk = null;
  const lazyLoad = () => { if (lazyStarted) return; lazyStarted = true;
    const ysecs = Object.keys(M.sections).filter(k => /^y\d+$/.test(k));
    const injectY = o => { const i = o.indexOf('hop'); return i < 0 ? o.concat(ysecs) : o.slice(0, i + 1).concat(ysecs, o.slice(i + 1)); };
    const order = injectY(isMobile() ? (afterWalk ? ['walk', 'turn', 'hop', 'wink', 'react', 'seat', 'peek', 'props', 'climb', 'point', 'rest', 'lie', 'walk2', 'fun'] : ['wink', 'hop', 'react', 'walk', 'turn', 'seat', 'peek', 'props', 'climb', 'point', 'rest', 'lie', 'walk2', 'fun']) : (afterWalk ? ['walk', 'turn', 'hop', 'react', 'wink', 'point', 'seat', 'props', 'peek', 'climb', 'rest', 'lie', 'walk2', 'fun'] : ['wink', 'walk', 'turn', 'hop', 'react', 'point', 'seat', 'props', 'peek', 'climb', 'rest', 'lie', 'walk2', 'fun']));
    (async () => { for (const k of [...order, ...XSECS.filter(k => /^x\d+$/.test(k))]) { const im = await decode([k]); keep.push(...im); buildLazy(k); if (afterWalk && lazyBuilt.walk && lazyBuilt.turn) { const f = afterWalk; afterWalk = null; f(); } } })(); };
  // the action sheets wait for the page's own load (hero photo = LCP) so they never compete with it; the core sheet alone is enough to appear
  const lazyGo = () => setTimeout(() => { if ('requestIdleCallback' in window) requestIdleCallback(lazyLoad, { timeout: 700 }); else lazyLoad(); }, isMobile() ? 300 : 150);
  const lazySoon = () => { if (document.readyState === 'complete') lazyGo(); else addEventListener('load', lazyGo, { once: true }); };
  window.__hfLazy = lazySoon;
  lazySoon();
  if (userOff) return;
  // page change continuity: on a returning visit he appears (no poof) where he stood on the previous page's screen, on the nearest
  // free ground line, then walks over to his spot once the walk frames are decoded
  let s0 = null, startX = null;
  if (returning && st.vy != null) { const vis = SPOTS.filter(s => spotVisible(s)); const px = st.vx != null ? scrollX + st.vx * innerWidth : null, py = scrollY + st.vy * innerHeight;
    vis.sort((a, b) => Math.hypot((px == null ? a.x : Math.max(a.lo, Math.min(a.hi, px))) - (px == null ? a.x : px), a.y - py) - Math.hypot((px == null ? b.x : Math.max(b.lo, Math.min(b.hi, px))) - (px == null ? b.x : px), b.y - py));
    s0 = vis[0] || null; if (s0 && px != null) startX = Math.max(s0.lo, Math.min(s0.hi, px)); }
  if (!s0) s0 = SPOTS.find(s => s.hero && spotVisible(s)) || bestSpot();
  if (returning) { cur.sitting = false; }
  if (s0) { cur.busy = true;
    if (returning && startX != null && Math.abs(startX - s0.x) > 30) { const tgt = s0; await showAt(Object.assign({}, s0, { x: startX }), 'still'); cur.spot = tgt;
      afterWalk = () => busyRun(async () => { if (cur.spot === tgt && cur.visible && !cur.seated) { await ACT.walkBy(tgt.x - cur.x); await arrive(tgt); } }); }
    else { await showAt(s0, returning ? 'quiet' : 'entrance'); await arrive(s0); }
    cur.busy = false; }
  else {
    // no standing room at boot: still load action sheets and try a seat/peek, then retry
    const again = async () => { await computeSpots(); const s = bestSpot(); if (s && !cur.visible && !userOff) { await busyRun(async () => { await showAt(s, 'poof'); await arrive(s); }); return; } await fallbackVisit(false); };
    setTimeout(again, 700); setTimeout(again, 1800);
  }
  
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
