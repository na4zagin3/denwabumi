(this.webpackJsonpdenbun=this.webpackJsonpdenbun||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n(1),o=n.n(i),c=n(7),r=n.n(c),s=(n(14),n(2)),u=(n.p,n(15),n(8)),l=new(window.AudioContext||window.webkitAudioContext),d=new function e(t){var a=this;Object(u.a)(this,e),this.onDecode=void 0,this.onDecode=t;var i=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;i?i.call(navigator,{audio:!0},(function(e){var t=n(16),i=n(6),o=l.createGain();l.createMediaStreamSource(e).connect(o);var c=l.createScriptProcessor(512,1,1),r=new t({sampleRate:l.sampleRate,repeatMin:6,downsampleRate:1,energyThreshold:.005,filter:function(e){return!i.Utilities.doublePeakFilter(e.energies.high,e.energies.low,1.4)}});r.on("decode",(function(e){null!=e&&a.onDecode(e)})),c.onaudioprocess=function(e){var t=e.inputBuffer.getChannelData(0);r.processBuffer(t)},o.connect(c),c.connect(l.destination)}),(function(e){alert("Error capturing audio.")})):alert("getUserMedia not supported in this browser.")}((function(){})),b=function(e){Object(i.useEffect)((function(){d.onDecode=e}),[e])},j=697,f=770,v=852,g=941,h=1209,p=1336,O=1477,m=1633,x={1:[j,h],2:[j,p],3:[j,O],A:[j,m],4:[f,h],5:[f,p],6:[f,O],B:[f,m],7:[v,h],8:[v,p],9:[v,O],C:[v,m],"*":[g,h],0:[g,p],"#":[g,O],D:[g,m]};function C(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:.1,i=l.createOscillator();i.type="sine",i.frequency.value=e;var o=l.createGain();o.gain.value=a,i.connect(o),o.connect(l.destination);var c=void 0===n?l.currentTime:n;return i.start(c),i.stop(c+t),i}function D(e,t){var n=t.duration,a=t.interval,i=t.gain,o=l.currentTime;e.split("").forEach((function(e,t){!function(e,t,n){var a=C(e[0],t,n.startTime,n.gain);C(e[1],t,n.startTime,n.gain),void 0!==n.onEnd&&(a.onended=n.onEnd)}(x[e],n,{startTime:o+t*(n+a),gain:i,onEnd:function(){console.log("end sound")}})}))}var w=function(e){var t=Object(i.useState)(""),n=Object(s.a)(t,2),o=n[0],c=n[1],r=Object(i.useState)("0.1"),u=Object(s.a)(r,2),l=u[0],d=u[1],b=Object(i.useState)("0.05"),j=Object(s.a)(b,2),f=j[0],v=j[1],g=Object(i.useCallback)((function(e){c(e.target.value)}),[c]),h=Object(i.useCallback)((function(e){d(e.target.value)}),[d]),p=Object(i.useCallback)((function(e){v(e.target.value)}),[v]),O=parseFloat(l),m=parseFloat(f),x=Object(i.useCallback)((function(){console.log(o),D(o,{duration:O,interval:m,onFinish:function(){console.log("transmission completed")}})}),[O,m,o]);return Object(a.jsxs)("div",{children:[Object(a.jsx)("label",{htmlFor:"dtmfDuration",children:"Duration [s]"}),Object(a.jsx)("input",{type:"text",value:l,onChange:h}),Object(a.jsx)("label",{htmlFor:"dtmfInterval",children:"Interval [s]"}),Object(a.jsx)("input",{type:"text",value:f,onChange:p}),Object(a.jsx)("label",{htmlFor:"dtmfMessage",children:"DTMF Message"}),Object(a.jsx)("input",{name:"dtmfMessage",type:"text",value:o,onChange:g}),Object(a.jsx)("button",{onClick:x,children:"Send DTMF"})]})};var F=function(){var e=Object(i.useState)(""),t=Object(s.a)(e,2),n=t[0],o=t[1],c=Object(i.useCallback)((function(e){o(n+e)}),[n,o]);return b(c),Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)("header",{className:"App-header",children:"Data transmitter via audio (under construction)"}),Object(a.jsx)(w,{}),Object(a.jsxs)("div",{className:"Decoder",children:["DTMF Decoded: ",n]})]})},M=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,20)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,o=t.getLCP,c=t.getTTFB;n(e),a(e),i(e),o(e),c(e)}))};r.a.render(Object(a.jsx)(o.a.StrictMode,{children:Object(a.jsx)(F,{})}),document.getElementById("root")),M()}},[[19,1,2]]]);
//# sourceMappingURL=main.8d4c05a1.chunk.js.map