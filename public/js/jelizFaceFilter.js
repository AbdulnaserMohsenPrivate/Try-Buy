 /**
  * Jeeliz Face Filter - https://github.com/jeeliz/jeelizFaceFilter
  *
  * Copyright 2018 Jeeliz ( https://jeeliz.com )
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  * http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
 var JEEFACEFILTERAPI = (function() {
     function oa(b, d, e) {
         return b * (1 - e) + d * e
     }

     function Aa(b, d) {
         var e = new XMLHttpRequest;
         e.open("GET", b, !0);
         e.withCredentials = !1;
         e.onreadystatechange = function() {
             4 !== e.readyState || 200 !== e.status && 0 !== e.status || d(e.responseText)
         };
         e.send()
     }

     function Da(b, d, e) {
         return Math.min(Math.max((e - b) / (d - b), 0), 1)
     }

     function Fa(b) {
         switch (b) {
             case "relu":
                 return "gl_FragColor=max(vec4(0.,0.,0.,0.),gl_FragColor);";
             case "elu":
                 return "gl_FragColor=mix(exp(-abs(gl_FragColor))-vec4(1.,1.,1.,1.),gl_FragColor,step(0.,gl_FragColor));";
             case "elu01":
                 return "gl_FragColor=mix(0.1*exp(-abs(gl_FragColor))-vec4(0.1,0.1,0.1,0.1),gl_FragColor,step(0.,gl_FragColor));";
             case "arctan":
                 return "gl_FragColor=atan(3.14159265359*texture2D(u0,vUV))/3.14159265359;";
             case "copy":
                 return "";
             default:
                 return !1
         }
     }

     function Ga(b, d) {
         var e = d % 8;
         return b[(d - e) / 8] >> 7 - e & 1
     }

     function Ia(b) {
         var d = JSON.parse(b);
         b = d.ne;
         var e = d.nf,
             k = d.n,
             l = "undefined" === typeof btoa ? Buffer.from(d.data, "base64").toString("latin1") : atob(d.data),
             m = l.length,
             n;
         d = new Uint8Array(m);
         for (n = 0; n < m; ++n) d[n] = l.charCodeAt(n);
         l = new Float32Array(k);
         m = new Float32Array(e);
         n = b + e + 1;
         var q, t;
         for (q = 0; q < k; ++q) {
             var h = n * q;
             var u = 0 === Ga(d, h) ? 1 : -1;
             var v = h + 1;
             var C = 1,
                 H = 0;
             for (t = v + b - 1; t >= v; --t) H += C * Ga(d, t), C *= 2;
             t = H;
             v = d;
             C = h + 1 + b;
             H = m;
             var E = 0,
                 O = H.length;
             for (h = C; h < C + O; ++h) H[E] = Ga(v, h), ++E;
             for (h = v = 0; h < e; ++h) v += m[h] * Math.pow(2, -h -
                 1);
             u = 0 === v && 0 === t ? 0 : u * (1 + v) * Math.pow(2, 1 + t - Math.pow(2, b - 1));
             l[q] = u
         }
         return l
     }
     var w = function() {
             function b(f, A) {
                 f = a.createShader(f);
                 a.shaderSource(f, A);
                 a.compileShader(f);
                 return a.getShaderParameter(f, a.COMPILE_STATUS) ? f : !1
             }

             function d(f, A) {
                 f = b(a.VERTEX_SHADER, f);
                 A = b(a.FRAGMENT_SHADER, A);
                 var B = a.createProgram();
                 a.attachShader(B, f);
                 a.attachShader(B, A);
                 a.linkProgram(B);
                 return B
             }

             function e(f) {
                 void 0 === f.Y && (f.Y = "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}");
                 void 0 === f.sa && (f.sa = ["a0"]);
                 void 0 === f.da && (f.da = [2]);
                 if (void 0 === f.precision || "highp" === f.precision) f.precision = t;
                 f.id = n++;
                 void 0 !== f.Tc && f.Tc.forEach(function(B, ea) {
                     f.c = f.c.replace(B, f.Da[ea])
                 });
                 f.cb = 0;
                 f.da.forEach(function(B) {
                     f.cb += 4 * B
                 });
                 f.Ca = d(f.Y, "precision " + f.precision + " float;\n" + f.c);
                 f.l = {};
                 f.f.forEach(function(B) {
                     f.l[B] = a.getUniformLocation(f.Ca, B)
                 });
                 f.attributes = {};
                 f.ea = [];
                 f.sa.forEach(function(B) {
                     var ea = a.getAttribLocation(f.Ca, B);
                     f.attributes[B] = ea;
                     f.ea.push(ea)
                 });
                 if (f.h) {
                     a.useProgram(f.Ca);
                     m = f;
                     l = f.id;
                     for (var A in f.h) a.uniform1i(f.l[A],
                         f.h[A])
                 }
                 f.Nd = !0
             }

             function k(f) {
                 Ja.Zc(M);
                 l !== f.id && (M.pa(), l = f.id, m = f, a.useProgram(f.Ca), f.ea.forEach(function(A) {
                     0 !== A && a.enableVertexAttribArray(A)
                 }))
             }
             var l = -1,
                 m = !1,
                 n = 0,
                 q = !1,
                 t = "highp",
                 h = ["u1"],
                 u = ["u0"],
                 v = {
                     u1: 0
                 },
                 C = {
                     u0: 0
                 },
                 H = {
                     u1: 0,
                     u2: 1
                 },
                 E = {
                     u3: 0
                 },
                 O = {
                     s0: {
                         c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                         f: h,
                         h: v
                     },
                     s1: {
                         c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                         f: h,
                         h: v,
                         precision: "lowp"
                     },
                     s2: {
                         c: "uniform sampler2D u1,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a*b;}",
                         f: ["u1", "u2"],
                         h: H
                     },
                     s3: {
                         c: "uniform sampler2D u1;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a.r*f;}",
                         f: h,
                         h: v
                     },
                     s4: {
                         c: "uniform sampler2D u1,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a.a*b.r*f;}",
                         f: ["u1", "mask"],
                         h: H
                     },
                     s5: {
                         c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(1.-vv0.x,vv0.y));}",
                         f: h,
                         h: v
                     },
                     s6: {
                         c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(vv0.x,1.-vv0.y));}",
                         f: h,
                         h: v
                     },
                     s7: {
                         c: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*u4;}",
                         f: ["u0", "u4"],
                         h: C
                     },
                     s8: {
                         c: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;const vec4 g=vec4(.25,.25,.25,.25),e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);float b=dot(a*u4,g);gl_FragColor=b*e;}",
                         f: ["u0", "u4"],
                         h: C
                     },
                     s9: {
                         c: "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u1,vv0));gl_FragColor=a*e;}",
                         f: h,
                         h: v
                     },
                     s10: {
                         c: "uniform sampler2D u1,u5;uniform float u6;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u5,vv0);gl_FragColor=mix(b,a,u6*f);}",
                         f: ["u1", "u5", "u6"],
                         h: {
                             u1: 0,
                             u5: 1
                         }
                     },
                     s11: {
                         c: "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u1,vv0+u7)+texture2D(u1,vv0+u7*vec2(1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,1.)));}",
                         f: ["u1", "u7"],
                         h: v
                     },
                     s12: {
                         c: "uniform sampler2D u1;uniform vec4 u8;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 k(float a){if(a==0.)return vec4(0.,0.,0.,0.);float l=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),m=c+127.,b=(a/exp2(c)-1.)*8388608.,d=m/2.,n=fract(d)*2.,o=floor(d),p=e(b,0.,8.),q=e(b,8.,16.),r=n*128.+e(b,16.,23.),j=l+o;return vec4(p,q,r,j)/255.;}void main(){float a=dot(texture2D(u1,vv0),u8);gl_FragColor=k(a);}",
                         f: ["u1", "u8"],
                         h: v
                     },
                     s13: {
                         c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=e/(e+exp(-a));gl_FragColor=b;}",
                         f: u,
                         h: C
                     },
                     s14: {
                         c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(0.,0.,0.,0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=max(e,a);}",
                         f: u,
                         h: C
                     },
                     s15: {
                         c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=mix(exp(-abs(a))-e,a,step(0.,a));}",
                         f: u,
                         h: C
                     },
                     s16: {
                         c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=exp(-abs(a))-e;gl_FragColor=mix(.1*b,a,step(0.,a));}",
                         f: u,
                         h: C
                     },
                     s17: {
                         c: "uniform sampler2D u0,u6,u9;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),c=texture2D(u6,vv0),d=texture2D(u9,vv0),b=a/d;gl_FragColor=c*mix(exp(-abs(b))-f,b,step(0.,a));}",
                         f: ["u0", "u6", "u9"],
                         h: {
                             u0: 0,
                             u6: 1,
                             u9: 2
                         }
                     },
                     s18: {
                         c: "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=atan(e*texture2D(u0,vv0))/e;}",
                         f: u,
                         h: C
                     },
                     s19: {
                         c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(.5,.5,.5,.5);void main(){vec4 a=texture2D(u0,vv0),b=log(e+a);gl_FragColor=b;}",
                         f: u,
                         h: C
                     },
                     s20: {
                         c: "uniform sampler2D u0;uniform float gain;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=exp(a);}",
                         f: ["u0", "u10"],
                         h: C
                     },
                     s21: {
                         c: "uniform sampler2D u0,u11;uniform float u12;const vec2 f=vec2(.5,.5);const float g=1e-5;const vec4 h=vec4(1.,1.,1.,1.),i=vec4(0.,0.,0.,0.);varying vec2 vv0;void main(){vec4 a=texture2D(u11,f);float b=u12*u12;vec4 c=max(b*a,g*h);gl_FragColor=texture2D(u0,vv0)/c;}",
                         f: ["u0", "u13", "u12"],
                         h: {
                             u0: 0,
                             u13: 1
                         }
                     },
                     s22: {
                         c: "uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;void main(){float a=u14.x*u14.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u14.y),g=floor(u14.x*fract(b*u14.y)),f=(g*u14.y+d)/a;gl_FragColor=texture2D(u1,f+c/a);}",
                         f: ["u1", "u14"],
                         h: v
                     },
                     s23: {
                         c: "uniform sampler2D u15,u16,u17;varying vec2 vv0;void main(){vec4 a=texture2D(u17,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u15,b),e=texture2D(u16,c);gl_FragColor=d*e;}",
                         f: ["u15", "u16", "u17"],
                         h: {
                             u16: 0,
                             u15: 1,
                             u17: 2
                         }
                     },
                     s24: {
                         c: "uniform float u18;uniform sampler2D u15,u16;varying vec2 vv0;void main(){vec2 a=fract(vv0*u18);vec4 b=texture2D(u15,vv0),c=texture2D(u16,a);gl_FragColor=b*c;}",
                         f: ["u16", "u15", "u18"],
                         h: {
                             u16: 0,
                             u15: 1
                         }
                     },
                     s25: {
                         c: "uniform float u18;uniform sampler2D u15,u16,u19,u20,u21,u22;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 i=vv0*u18,m=floor(i),c=i-m;vec4 n=texture2D(u15,vv0),d=texture2D(u16,c),a=texture2D(u22,vv0);a=a*255.;vec4 o=texture2D(u19,c),p=texture2D(u20,c),q=texture2D(u21,c),j=step(-g,-a),b=e-j,k=b*step(-e-g,-a);b*=e-k;vec4 h=b*step(-2.*e-g,-a);b*=e-h;vec4 l=b;d=j*d+k*o+h*p+l*q,gl_FragColor=n*d;}",
                         f: "u15 u16 u18 u22 u19 u20 u21".split(" "),
                         h: {
                             u16: 0,
                             u15: 1,
                             u22: 3,
                             u19: 4,
                             u20: 5,
                             u21: 6
                         }
                     },
                     s26: {
                         c: "uniform sampler2D u15,u16,u23;uniform float u18,u24,u25,u26;varying vec2 vv0;const vec2 j=vec2(1.,1.);void main(){vec2 a=floor(u24*vv0),g=u24*vv0-a;float b=u18/u24;vec2 c=floor(g*b),d=g*b-c,h=(a+d)/u24;float l=u24*u26/u18;vec2 m=l*c,i=(m+d*u25)/u26,e=step(i,j);vec4 n=texture2D(u15,h),o=texture2D(u16,i),p=n*o*e.x*e.y,k=texture2D(u23,h);gl_FragColor=p*u25*u25+k;}",
                         f: "u15 u16 u18 u24 u25 u26 u23".split(" "),
                         h: {
                             u16: 0,
                             u15: 1,
                             u23: 2
                         }
                     },
                     s27: {
                         c: "uniform sampler2D u15,u16;varying vec2 vv0;void main(){vec4 a=texture2D(u15,vv0),b=texture2D(u16,vv0);gl_FragColor=a*b;}",
                         f: ["u15", "u16"],
                         h: {
                             u16: 0,
                             u15: 1
                         }
                     },
                     s28: {
                         c: "uniform sampler2D u1,u23;uniform float u27;varying vec2 vv0;void main(){gl_FragColor=texture2D(u23,vv0)+u27*texture2D(u1,vv0);}",
                         f: ["u1", "u23", "u27"],
                         h: {
                             u1: 0,
                             u23: 1
                         }
                     },
                     s29: {
                         c: "varying vec2 vv0;uniform sampler2D u1;const vec4 g=vec4(1.,1.,1.,1.),e=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=dot(a,e)*g;}",
                         f: h,
                         h: v,
                         precision: "lowp"
                     },
                     s30: {
                         c: "varying vec2 vv0;uniform sampler2D u1;uniform float u28;const vec3 e=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u28)).rgb,c=texture2D(u1,vv0+vec2(u28,u28)).rgb,d=texture2D(u1,vv0+vec2(u28,0.)).rgb;gl_FragColor=vec4(dot(a,e),dot(b,e),dot(c,e),dot(d,e));}",
                         f: ["u1", "u28"],
                         h: v,
                         precision: "lowp"
                     },
                     s31: {
                         c: "varying vec2 vv0;uniform sampler2D u1;uniform float u28;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u28)).rgb,c=texture2D(u1,vv0+vec2(u28,u28)).rgb,d=texture2D(u1,vv0+vec2(u28,0.)).rgb;gl_FragColor=vec4(a.r,b.g,c.b,dot(d,f));}",
                         f: ["u1", "u28"],
                         h: v,
                         precision: "lowp"
                     },
                     s32: {
                         c: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u29;const vec4 g=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u29,vv0.y-u29))*1.,a-=texture2D(u1,vec2(vv0.x-u29,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u29,vv0.y+u29))*1.,a+=texture2D(u1,vec2(vv0.x+u29,vv0.y-u29))*1.,a+=texture2D(u1,vec2(vv0.x+u29,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u29,vv0.y+u29))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u29,vv0.y-u29))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u29))*2.,b-=texture2D(u1,vec2(vv0.x+u29,vv0.y-u29))*1.,b+=texture2D(u1,vec2(vv0.x-u29,vv0.y+u29))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u29))*2.,b+=texture2D(u1,vec2(vv0.x+u29,vv0.y+u29))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u1,vv0).a),f=texture2D(u2,vv0);gl_FragColor=f.a*e.r*g;}",
                         f: ["u1", "u2", "u29"],
                         h: H
                     },
                     s33: {
                         c: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u29;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float i=0.;vec2 l=k*u29,b,c;float d,a,g=0.;for(float f=-4.;f<=4.;f+=1.)for(float e=-4.;e<=4.;e+=1.)b=vec2(f,e),d=length(b)/2.,a=exp(-d*d),c=vv0+l*b,a=1.,i+=a*texture2D(u1,c).r,g+=a;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u1,c).r-i/g)*j;}",
                         f: ["u1", "u2", "u29"],
                         h: H
                     },
                     s34: {
                         c: "uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 h=vec2(.5,.5),i=vec2(1.,0.),j=vec2(0.,1.);void main(){vec2 a=vv0-u7*h;vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*i),d=texture2D(u3,a+u7*j),k=texture2D(u3,a+u7),l=e(b,c),g=e(d,k);gl_FragColor=e(l,g);}",
                         f: ["u3", "u7"],
                         h: E
                     },
                     s35: {
                         c: "uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;const vec2 j=vec2(1.,0.),k=vec2(0.,1.),l=vec2(2.,0.),m=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*j),d=texture2D(u3,a+u7*k),g=texture2D(u3,a+u7),i=e(b,c),h=e(d,g);return e(i,h);}void main(){vec2 a=vv0+u7*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u7*l),d=f(a+u7*2.),g=f(a+u7*m),i=e(b,c),h=e(d,g);gl_FragColor=e(i,h);}",
                         f: ["u3", "u7"],
                         h: E
                     },
                     s36: {
                         c: "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*a;}",
                         f: ["u1"],
                         h: v,
                         precision: "lowp"
                     },
                     s37: {
                         c: "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;const float d=15444.;void main(){vec4 a=1001./d*texture2D(u1,vv0-3.*u7)+2002./d*texture2D(u1,vv0-2.*u7)+3003./d*texture2D(u1,vv0-u7)+3432./d*texture2D(u1,vv0)+3003./d*texture2D(u1,vv0+u7)+2002./d*texture2D(u1,vv0+2.*u7)+1001./d*texture2D(u1,vv0+3.*u7);gl_FragColor=a;}",
                         f: ["u7", "u1"],
                         h: v,
                         precision: "lowp"
                     },
                     s38: {
                         c: "uniform sampler2D u1,u30,u31;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float h=.1;void main(){vec4 a=texture2D(u30,vv0),b=texture2D(u31,vv0),c=texture2D(u1,vv0),d=max(g*h,b-a*a),f=sqrt(d);gl_FragColor=(c-a)/f;}",
                         f: ["u1", "u30", "u31"],
                         h: {
                             u1: 0,
                             u30: 1,
                             u31: 2
                         }
                     }
                 },
                 S = {
                     s39: {
                         c: "uniform float u18,u32;uniform sampler2D u15,u16,u23;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-5,1e-5);void main(){vec4 sum=texture2D(u23,vv0);float toSparsity=1.1111;vec2 uvFrom,uvWeight,xyPatch=ZERO2,eps2=EPS2/u18,xyTo=floor(vv0*u18+eps2);float weightSize=toSparsity*u18;vec2 halfFromSparsity=ONE2*(toSparsity-1.)/2.;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.)xyPatch.y=patch_y,uvFrom=(xyTo+HALF2+u32*(xyPatch-halfFromSparsity))/u18,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),uvWeight=(xyTo*toSparsity+xyPatch+HALF2)/weightSize,sum+=texture2D(u15,uvWeight)*texture2D(u16,uvFrom);}gl_FragColor=sum,gl_FragColor*=2.2222;}",
                         f: ["u18", "u15", "u16", "u23", "u32"],
                         Da: ["1.1111", "gl_FragColor\\*=2.2222;"]
                     },
                     s40: {
                         c: "uniform float u18,u32,u26;uniform sampler2D u15,u16,u23;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-4,1e-4);void main(){vec4 sum=texture2D(u23,vv0);float fromSparsity=1.1111,shrinkFactor=3.3333;vec2 uvFrom,uvWeight,xyFrom,xyPatchTo,xyPatch=ZERO2,xyShrink=ZERO2,eps2=EPS2/u26,xyTo=floor(vv0*u18+eps2);float weightSize=fromSparsity*u26;vec2 halfFromSparsity=ONE2*(fromSparsity-1.)/2.;float toSparsity=weightSize/u18;vec2 xyFrom0=xyTo*shrinkFactor;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.){xyPatch.y=patch_y;for(float shrink_x=0.;shrink_x<3.3333;shrink_x+=1.){xyShrink.x=shrink_x;for(float shrink_y=0.;shrink_y<3.3333;shrink_y+=1.)xyShrink.y=shrink_y,xyFrom=xyFrom0+xyShrink+shrinkFactor*u32*(xyPatch-halfFromSparsity),uvFrom=(xyFrom+HALF2)/u26,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),xyPatchTo=xyPatch*shrinkFactor+xyShrink,uvWeight=(xyTo*toSparsity+xyPatchTo+HALF2)/weightSize,sum+=texture2D(u15,uvWeight)*texture2D(u16,uvFrom);}}}gl_FragColor=sum,gl_FragColor*=2.2222;}",
                         f: "u18 u26 u15 u16 u23 u32".split(" "),
                         Da: ["1.1111", "gl_FragColor\\*=2.2222;", "3.3333"]
                     }
                 },
                 M = {
                     Wa: function() {
                         return q
                     },
                     m: function() {
                         if (!q) {
                             t = "highp";
                             for (var f in O) e(O[f], f);
                             w.set("s0");
                             a.enableVertexAttribArray(0);
                             f = Ka.m();
                             q = !0;
                             return f
                         }
                     },
                     $b: function(f) {
                         f.forEach(function(A) {
                             M.gb(A)
                         })
                     },
                     gb: function(f) {
                         O[f.id] = f;
                         e(f, f.id)
                     },
                     wb: function(f, A, B) {
                         A || (A = f);
                         O[A] = Object.create(S[f]);
                         S[f].Da && S[f].Da.forEach(function(ea, xa) {
                             O[A].c = O[A].c.replace(new RegExp(ea, "g"), B[xa])
                         });
                         e(O[A], A)
                     },
                     set: function(f) {
                         k(O[f])
                     },
                     uc: function(f) {
                         return "undefined" !== typeof O[f]
                     },
                     yd: function() {
                         return m.vd
                     },
                     pa: function() {
                         -1 !== l && (l = -1, m.ea.forEach(function(f) {
                             0 !== f && a.disableVertexAttribArray(f)
                         }))
                     },
                     ab: function() {
                         var f = 0;
                         m.ea.forEach(function(A, B) {
                             B = m.da[B];
                             a.vertexAttribPointer(A, B, a.FLOAT, !1, m.cb, f);
                             f += 4 * B
                         })
                     },
                     nb: function() {
                         a.enableVertexAttribArray(0)
                     },
                     ma: function() {
                         a.vertexAttribPointer(m.ea[0], 2, a.FLOAT, !1, 8, 0)
                     },
                     Sb: function(f, A) {
                         a.uniform1i(m.l[f], A)
                     },
                     v: function(f, A) {
                         a.uniform1f(m.l[f], A)
                     },
                     la: function(f, A, B) {
                         a.uniform2f(m.l[f],
                             A, B)
                     },
                     Zd: function(f, A) {
                         a.uniform2fv(m.l[f], A)
                     },
                     $d: function(f, A) {
                         a.uniform3fv(m.l[f], A)
                     },
                     $c: function(f, A, B, ea) {
                         a.uniform3f(m.l[f], A, B, ea)
                     },
                     Tb: function(f, A) {
                         a.uniform4fv(m.l[f], A)
                     },
                     ae: function(f, A) {
                         a.uniformMatrix2fv(m.l[f], !1, A)
                     },
                     be: function(f, A) {
                         a.uniformMatrix3fv(m.l[f], !1, A)
                     },
                     ce: function(f, A) {
                         a.uniformMatrix4fv(m.l[f], !1, A)
                     },
                     H: function(f, A) {
                         M.set(f);
                         A.forEach(function(B) {
                             switch (B.type) {
                                 case "4f":
                                     a.uniform4fv(m.l[B.name], B.value);
                                     break;
                                 case "3f":
                                     a.uniform3fv(m.l[B.name], B.value);
                                     break;
                                 case "2f":
                                     a.uniform2fv(m.l[B.name],
                                         B.value);
                                     break;
                                 case "1f":
                                     a.uniform1f(m.l[B.name], B.value);
                                     break;
                                 case "1i":
                                     a.uniform1i(m.l[B.name], B.value);
                                     break;
                                 case "mat2":
                                     a.uniformMatrix2fv(m.l[B.name], !1, B.value);
                                     break;
                                 case "mat3":
                                     a.uniformMatrix3fv(m.l[B.name], !1, B.value);
                                     break;
                                 case "mat4":
                                     a.uniformMatrix4fv(m.l[B.name], !1, B.value)
                             }
                         })
                     },
                     Hd: function() {
                         return "lowp"
                     }
                 };
             return M
         }(),
         a = !1,
         Ma = function() {
             function b(h) {
                 console.log("ERROR in ContextFeedForward : ", h);
                 return !1
             }

             function d() {
                 if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
                     var h =
                         navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                     h = 2 < h.length ? [parseInt(h[1], 10), parseInt(h[2], 10), parseInt(h[3] || 0, 10)] : [0, 0, 0];
                     return 12 === h[0] || 13 === h[0] ? !0 : !1
                 }
                 return /(Mac)/i.test(navigator.platform) && ((h = navigator.userAgent) ? (h = h.match(/Mac OS X (\d+)_(\d+)/) || h.match(/Mac OS X (\d+).(\d+)/), h = !h || 3 > h.length ? !1 : [parseInt(h[1], 10), parseInt(h[2], 10)]) : h = !1, h && 10 === h[0] && 15 === h[1]) ? !0 : !1
             }
             var e = !1,
                 k = !1,
                 l = !1,
                 m = !1,
                 n = !0,
                 q = !1,
                 t = {
                     A: function() {
                         return e.width
                     },
                     L: function() {
                         return e.height
                     },
                     zd: function() {
                         return e
                     },
                     xd: function() {
                         return a
                     },
                     u: function() {
                         return n
                     },
                     flush: function() {
                         a.flush()
                     },
                     zc: function() {
                         q || (q = new Uint8Array(e.width * e.height * 4));
                         a.readPixels(0, 0, e.width, e.height, a.RGBA, a.UNSIGNED_BYTE, q);
                         return q
                     },
                     Bd: function() {
                         return e.toDataURL("image/jpeg")
                     },
                     Cd: function() {
                         I.J();
                         k || (k = document.createElement("canvas"), l = k.getContext("2d"));
                         k.width = e.width;
                         k.height = e.height;
                         var h = t.zc(),
                             u = l.createImageData(k.width, k.height),
                             v, C, H = k.width,
                             E = k.height,
                             O = u.data;
                         for (C = 0; C < E; ++C) {
                             var S = E - C - 1;
                             for (v = 0; v < H; ++v) {
                                 var M =
                                     4 * (C * H + v);
                                 var f = 4 * (S * H + v);
                                 O[M] = h[f];
                                 O[M + 1] = h[f + 1];
                                 O[M + 2] = h[f + 2];
                                 O[M + 3] = h[f + 3]
                             }
                         }
                         l.putImageData(u, 0, 0);
                         return k.toDataURL("image/png")
                     },
                     Ad: function(h) {
                         !k && h && (k = document.createElement("canvas"), l = k.getContext("2d"));
                         var u = h ? k : document.createElement("canvas");
                         u.width = e.width;
                         u.height = e.height;
                         (h ? l : u.getContext("2d")).drawImage(e, 0, 0);
                         return u
                     },
                     m: function(h) {
                         h.nc && !h.Ja ? e = document.getElementById(h.nc) : h.Ja && (e = h.Ja);
                         e || (e = document.createElement("canvas"));
                         e.width = h && void 0 !== h.width ? h.width : 512;
                         e.height =
                             h && void 0 !== h.height ? h.height : 512;
                         "undefined" === typeof h && (h = {});
                         void 0 === h.premultipliedAlpha && (h.premultipliedAlpha = !1);
                         void 0 === h.zb && (h.zb = !0);
                         void 0 === h.antialias && (h.antialias = !1);
                         var u = {
                             antialias: h.antialias,
                             alpha: !0,
                             preserveDrawingBuffer: !0,
                             premultipliedAlpha: h.premultipliedAlpha,
                             stencil: !1,
                             depth: h.zb
                         };
                         d() || (a = e.getContext("webgl2", u));
                         a ? n = !0 : ((a = e.getContext("webgl", u)) || (a = e.getContext("experimental-webgl", u)), n = !1);
                         if (!a) return b("WebGL is not enabled");
                         (m = a.getExtension("WEBGL_lose_context")) &&
                         e.addEventListener("webglcontextlost", h.Oc, !1);
                         if (!La.m()) return b("Not enough capabilities");
                         if (!La.ic() && n) return b("Your configuration cannot process color buffer float");
                         a.clearColor(0, 0, 0, 0);
                         a.disable(a.DEPTH_TEST);
                         a.disable(a.BLEND);
                         a.disable(a.DITHER);
                         a.disable(a.STENCIL_TEST);
                         a.disable(a.SCISSOR_TEST);
                         a.GENERATE_MIPMAP_HINT && a.hint(a.GENERATE_MIPMAP_HINT, a.FASTEST);
                         a.disable(a.SAMPLE_ALPHA_TO_COVERAGE);
                         a.disable(a.SAMPLE_COVERAGE);
                         return !0
                     },
                     Fc: function() {
                         if (!w.m()) return !1;
                         a.depthFunc(a.LEQUAL);
                         a.clearDepth(1);
                         return !0
                     }
                 };
             return t
         }(),
         Ja = function() {
             var b = "undefined" === typeof w ? JEShaders : w;
             return {
                 Zc: function(d) {
                     b !== d && (b.pa(), b = d)
                 },
                 Wa: function() {
                     return b.Wa()
                 },
                 ma: function() {
                     b.ma()
                 },
                 ab: function() {
                     b.ab()
                 },
                 pa: function() {
                     b.pa()
                 },
                 set: function(d) {
                     b.set(d)
                 }
             }
         }(),
         N = function() {
             var b, d, e = 0,
                 k = -2,
                 l = -2,
                 m = !1,
                 n = {
                     reset: function() {
                         l = k = -2
                     },
                     m: function() {
                         m || (b = a.createBuffer(), a.bindBuffer(a.ARRAY_BUFFER, b), a.bufferData(a.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), a.STATIC_DRAW), d = a.createBuffer(), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,
                             d), a.bufferData(a.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), a.STATIC_DRAW), n.fa(), m = !0)
                     },
                     a: function(q) {
                         var t = e++,
                             h = q.U ? q.U.length : 0,
                             u = "undefined" === typeof q.mode ? a.STATIC_DRAW : q.mode,
                             v = a.createBuffer();
                         a.bindBuffer(a.ARRAY_BUFFER, v);
                         a.bufferData(a.ARRAY_BUFFER, q.Wb instanceof Float32Array ? q.Wb : new Float32Array(q.Wb), u);
                         k = t;
                         if (q.U) {
                             var C = a.createBuffer();
                             a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, C);
                             if (65536 > q.U.length) {
                                 var H = Uint16Array;
                                 var E = a.UNSIGNED_SHORT;
                                 var O = 2
                             } else H = Uint32Array, E = a.UNSIGNED_INT,
                                 O = 4;
                             a.bufferData(a.ELEMENT_ARRAY_BUFFER, q.U instanceof H ? q.U : new H(q.U), u);
                             l = t
                         }
                         var S = {
                             hc: function(M) {
                                 k !== t && (a.bindBuffer(a.ARRAY_BUFFER, v), k = t);
                                 M && Ja.ab()
                             },
                             fc: function() {
                                 l !== t && (a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, C), l = t)
                             },
                             bind: function(M) {
                                 S.hc(M);
                                 S.fc()
                             },
                             td: function() {
                                 a.drawElements(a.TRIANGLES, h, E, 0)
                             },
                             ud: function(M, f) {
                                 a.drawElements(a.TRIANGLES, M, E, f * O)
                             },
                             remove: function() {
                                 a.deleteBuffer(v);
                                 q.U && a.deleteBuffer(C);
                                 S = null
                             }
                         };
                         return S
                     },
                     fa: function() {
                         -1 !== k && (a.bindBuffer(a.ARRAY_BUFFER, b), k = -1); - 1 !==
                             l && (a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, d), l = -1)
                     },
                     g: function(q, t) {
                         q && N.fa();
                         t && Ja.ma();
                         a.drawElements(a.TRIANGLES, 3, a.UNSIGNED_SHORT, 0)
                     },
                     yc: function() {
                         a.deleteBuffer(b);
                         a.deleteBuffer(d)
                     }
                 };
             return n
         }(),
         I = function() {
             var b, d, e, k = !1,
                 l = {
                     w: -2,
                     wc: 1
                 };
             return {
                 m: function() {
                     if (!k) {
                         b = a.createFramebuffer();
                         var m = La.u();
                         d = m && a.DRAW_FRAMEBUFFER ? a.DRAW_FRAMEBUFFER : a.FRAMEBUFFER;
                         e = m && a.READ_FRAMEBUFFER ? a.READ_FRAMEBUFFER : a.FRAMEBUFFER;
                         k = !0
                     }
                 },
                 Ed: function() {
                     return d
                 },
                 Sa: function() {
                     return e
                 },
                 aa: function() {
                     return a.FRAMEBUFFER
                 },
                 Id: function() {
                     return l
                 },
                 wd: function() {
                     return b
                 },
                 a: function(m) {
                     void 0 === m.yb && (m.yb = !1);
                     var n = m.na ? m.na : !1,
                         q = m.width,
                         t = void 0 !== m.height ? m.height : m.width,
                         h = b,
                         u = !1,
                         v = !1,
                         C = 0;
                     n && (q = q ? q : n.A(), t = t ? t : n.L());
                     var H = {
                         Rb: function() {
                             v || (h = a.createFramebuffer(), v = !0, C = l.wc++)
                         },
                         Zb: function() {
                             H.Rb();
                             H.j();
                             u = a.createRenderbuffer();
                             a.bindRenderbuffer(a.RENDERBUFFER, u);
                             a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_COMPONENT16, q, t);
                             a.framebufferRenderbuffer(d, a.DEPTH_ATTACHMENT, a.RENDERBUFFER, u);
                             a.clearDepth(1)
                         },
                         bind: function(E,
                             O) {
                             C !== l.w && (a.bindFramebuffer(d, h), l.w = C);
                             n && n.j();
                             O && a.viewport(0, 0, q, t);
                             E && a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT)
                         },
                         md: function() {
                             C !== l.w && (a.bindFramebuffer(d, h), l.w = C)
                         },
                         clear: function() {
                             a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT)
                         },
                         pd: function() {
                             a.clear(a.COLOR_BUFFER_BIT)
                         },
                         qd: function() {
                             a.clear(a.DEPTH_BUFFER_BIT)
                         },
                         ad: function() {
                             a.viewport(0, 0, q, t)
                         },
                         j: function() {
                             C !== l.w && (a.bindFramebuffer(d, h), l.w = C)
                         },
                         rtt: function(E) {
                             n = E;
                             l.w !== C && (a.bindFramebuffer(a.FRAMEBUFFER, h), l.w = C);
                             E.j()
                         },
                         J: function() {
                             a.bindFramebuffer(d,
                                 null);
                             l.w = -1
                         },
                         resize: function(E, O) {
                             q = E;
                             t = O;
                             u && (a.bindRenderbuffer(a.RENDERBUFFER, u), a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_COMPONENT16, q, t))
                         },
                         remove: function() {
                             a.bindFramebuffer(d, h);
                             a.framebufferTexture2D(d, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, null, 0);
                             u && a.framebufferRenderbuffer(d, a.DEPTH_ATTACHMENT, a.RENDERBUFFER, null);
                             a.bindFramebuffer(d, null);
                             a.deleteFramebuffer(h);
                             u && a.deleteRenderbuffer(u);
                             H = null
                         }
                     };
                     m.yb && H.Zb();
                     return H
                 },
                 J: function() {
                     a.bindFramebuffer(d, null);
                     l.w = -1
                 },
                 gd: function() {
                     a.bindFramebuffer(d,
                         null);
                     a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                     a.viewport(0, 0, La.A(), La.L());
                     l.w = -1
                 },
                 reset: function() {
                     l.w = -2
                 },
                 S: function() {
                     0 !== l.w && (a.bindFramebuffer(d, b), l.w = 0)
                 },
                 clear: function() {
                     a.viewport(0, 0, La.A(), La.L());
                     a.clear(a.COLOR_BUFFER_BIT)
                 }
             }
         }(),
         Z = function() {
             function b(c) {
                 a.bindTexture(a.TEXTURE_2D, c)
             }

             function d(c) {
                 xa[0] = c;
                 c = Ea[0];
                 var F = c >> 16 & 32768,
                     L = c >> 12 & 2047,
                     T = c >> 23 & 255;
                 return 103 > T ? F : 142 < T ? F | 31744 | ((255 == T ? 0 : 1) && c & 8388607) : 113 > T ? (L |= 2048, F | (L >> 114 - T) + (L >> 113 - T & 1)) : F = (F | T - 112 << 10 | L >> 1) + (L &
                     1)
             }

             function e(c) {
                 var F = new Uint16Array(c.length);
                 c.forEach(function(L, T) {
                     F[T] = d(L)
                 });
                 return F
             }

             function k() {
                 if (null !== ua.Ta) return ua.Ta;
                 var c = m(e([1, 1, 1, 1]));
                 return null === c ? !0 : ua.Ta = c
             }

             function l() {
                 if (null !== ua.Ua) return ua.Ua;
                 var c = m(new Uint8Array([255, 255, 255, 255]));
                 return null === c ? !0 : ua.Ua = c
             }

             function m(c) {
                 if (!Ja.Wa() || !E) return null;
                 try {
                     var F = a.getError(),
                         L = da.a({
                             isFloat: !1,
                             I: !0,
                             array: c,
                             width: 1
                         });
                     F = a.getError();
                     if (F !== a.NO_ERROR) return !1
                 } catch (T) {
                     return !1
                 }
                 I.J();
                 a.viewport(0, 0, 1, 1);
                 a.clearColor(0,
                     0, 0, 0);
                 a.clear(a.COLOR_BUFFER_BIT);
                 Ja.set("s0");
                 L.ib(0);
                 N.g(!1, !0);
                 c = new Uint8Array(4);
                 a.readPixels(0, 0, 1, 1, a.RGBA, a.UNSIGNED_BYTE, c);
                 c = .9 < c[0];
                 L.remove();
                 I.S();
                 return c
             }
             var n = 0,
                 q, t = 0,
                 h, u = !1,
                 v, C, H, E = !1,
                 O = !1,
                 S, M, f, A = [
                     [1, 0, 0, 0],
                     [0, 1, 0, 0],
                     [0, 0, 1, 0],
                     [0, 0, 0, 1]
                 ],
                 B = !1,
                 ea = !1,
                 xa = new Float32Array(1),
                 Ea = new Int32Array(xa.buffer),
                 ua = {
                     Ta: null,
                     Ua: null
                 },
                 da = {
                     m: function() {
                         if (!E) {
                             C = [a.RGB, !1, a.RGB, a.RGBA];
                             H = [a.RGB, !1, a.RGB, a.RGBA];
                             q = [a.TEXTURE0, a.TEXTURE1, a.TEXTURE2, a.TEXTURE3, a.TEXTURE4, a.TEXTURE5, a.TEXTURE6, a.TEXTURE7];
                             B = "undefined" !== typeof JEContext;
                             ea = "undefined" !== typeof La;
                             B && JEContext.Ud() && q.push(a.TEXTURE8, a.TEXTURE9);
                             h = [-1, -1, -1, -1, -1, -1, -1, -1];
                             v = [a.UNSIGNED_BYTE, a.FLOAT, a.FLOAT];
                             if (!u) {
                                 for (var c = new Float32Array(16384), F = 0; 16384 > F; ++F) c[F] = 2 * Math.random() - 1;
                                 u = {
                                     random: da.a({
                                         isFloat: !0,
                                         isPot: !0,
                                         array: c,
                                         width: 64
                                     }),
                                     Vb: da.a({
                                         isFloat: !1,
                                         isPot: !0,
                                         width: 1,
                                         array: new Uint8Array([0, 0, 0, 0])
                                     })
                                 }
                             }
                             E = !0
                         }
                     },
                     Ec: function() {
                         da.hd()
                     },
                     Ld: function() {
                         return u.Vb
                     },
                     hd: function() {
                         v[1] = La.va()
                     },
                     Vc: function() {
                         H = C = [a.RGBA, a.RGBA, a.RGBA,
                             a.RGBA
                         ]
                     },
                     Vd: function(c, F) {
                         w.set("s1");
                         I.J();
                         var L = c.A(),
                             T = c.L();
                         a.viewport(0, 0, L, T);
                         c.b(0);
                         N.g(!1, !1);
                         a.readPixels(0, 0, L, T, a.RGBA, a.UNSIGNED_BYTE, F)
                     },
                     xc: function(c, F, L) {
                         a.activeTexture(a.TEXTURE0);
                         n = 0;
                         var T = a.createTexture();
                         b(T);
                         var ia = La.u() && a.RGBA32F ? a.RGBA32F : a.FLOAT;
                         F = F instanceof Float32Array ? F : new Float32Array(F);
                         var fa = Math.log2(F.length);
                         fa !== Math.floor(fa) && (a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE));
                         a.texParameteri(a.TEXTURE_2D,
                             a.TEXTURE_MAG_FILTER, a.NEAREST);
                         a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST);
                         a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, L);
                         a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, c.A(), c.L(), 0, a.RGBA, ia, F);
                         b(null);
                         a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1);
                         I.S();
                         w.set("s0");
                         c.C();
                         a.clearColor(0, 0, 0, 0);
                         a.clear(a.COLOR_BUFFER_BIT);
                         b(T);
                         N.g(!0, !1);
                         a.deleteTexture(T)
                     },
                     a: function(c) {
                         function F() {
                             b(ka);
                             pa && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, pa);
                             c.isPot ? (a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, c.Cb ? a.MIRRORED_REPEAT :
                                 a.REPEAT), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, c.V ? a.MIRRORED_REPEAT : a.REPEAT)) : (a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE));
                             c.xa && "undefined" !== typeof JESETTINGS && a.texParameterf(a.TEXTURE_2D, JEContext.Dd().TEXTURE_MAX_ANISOTROPY_EXT, JESETTINGS.kd);
                             a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, c.isLinear ? a.LINEAR : a.NEAREST);
                             c.isLinear ? a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, c.isMipmap && !wa ? a.NEAREST_MIPMAP_LINEAR :
                                 a.LINEAR) : a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, c.isMipmap && !wa ? a.NEAREST_MIPMAP_NEAREST : a.NEAREST);
                             la = C[c.ja - 1];
                             ba = H[c.ja - 1];
                             ca = v[L];
                             if (La.u()) {
                                 var x = a.RGBA32F;
                                 la === a.RGBA && ca === a.FLOAT && x && (ba = x);
                                 la === a.RGB && ca === a.FLOAT && x && (ba = x, la = a.RGBA)
                             }
                             if (c.I && !c.isFloat || c.isFloat && c.isMipmap && Ka.Hc())(x = a.RGBA16F) && (ba = x), ca = La.va();
                             c.Fb && "undefined" !== typeof a.texStorage2D && (Ba = c.Fb);
                             c.Db && 4 === c.ja && (la = JEContext.Jd());
                             if (c.D) a.texImage2D(a.TEXTURE_2D, 0, ba, la, ca, c.D);
                             else if (c.url) a.texImage2D(a.TEXTURE_2D,
                                 0, ba, la, ca, va);
                             else if (X) {
                                 try {
                                     a.getError(), a.texImage2D(a.TEXTURE_2D, 0, ba, K, r, 0, la, ca, X), a.getError() !== a.NO_ERROR && (a.texImage2D(a.TEXTURE_2D, 0, ba, K, r, 0, la, ca, null), a.getError() !== a.NO_ERROR && a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, K, r, 0, a.RGBA, a.UNSIGNED_BYTE, null))
                                 } catch (qa) {
                                     a.texImage2D(a.TEXTURE_2D, 0, ba, K, r, 0, la, ca, null)
                                 }
                                 c.isKeepArray || (X = null)
                             } else a.texImage2D(a.TEXTURE_2D, 0, ba, K, r, 0, la, ca, null);
                             if (c.isMipmap)
                                 if (!wa && Y) Y.Ra(), Ca = !0;
                                 else if (wa) {
                                 x = Math.log(Math.min(K, r)) / Math.log(2);
                                 var Q;
                                 ya = Array(1 +
                                     x);
                                 ya[0] = ka;
                                 for (Q = 1; Q <= x; ++Q) {
                                     var ha = Math.pow(2, Q);
                                     var D = K / ha;
                                     ha = r / ha;
                                     var G = a.createTexture();
                                     b(G);
                                     a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST);
                                     a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST);
                                     a.texImage2D(a.TEXTURE_2D, 0, ba, D, ha, 0, la, ca, null);
                                     b(null);
                                     ya[Q] = G
                                 }
                                 Ca = !0
                             }
                             b(null);
                             h[n] = -1;
                             pa && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1);
                             P = !0;
                             ja && Y && (ja(Y), ja = !1)
                         }
                         "undefined" === typeof c.isFloat && (c.isFloat = !1);
                         "undefined" === typeof c.I && (c.I = !1);
                         "undefined" === typeof c.isPot && (c.isPot = !0);
                         "undefined" === typeof c.isLinear && (c.isLinear = !1);
                         "undefined" === typeof c.isMipmap && (c.isMipmap = !1);
                         "undefined" === typeof c.Ha && (c.Ha = !1);
                         void 0 === c.xa && (c.xa = !1);
                         void 0 === c.V && (c.V = !1);
                         void 0 === c.Cb && (c.Cb = !1);
                         void 0 === c.Db && (c.Db = !1);
                         void 0 === c.ja && (c.ja = 4);
                         void 0 === c.Ab && (c.Ab = !1);
                         "undefined" === typeof c.isFlipY && (c.isFlipY = c.url || c.array ? !0 : !1);
                         "undefined" === typeof c.isKeepArray && (c.isKeepArray = !1);
                         c.data && (c.array = "string" === typeof c.data ? Ia(c.data) : c.isFloat ? new Float32Array(c.data) : new Uint8Array(c.data),
                             c.isFlipY = !1);
                         var L = 0,
                             T = c.D ? !0 : !1,
                             ia = null,
                             fa = null,
                             ma = !1,
                             ra = null;
                         c.isFloat && (c.I = !0);
                         c.I && (L = 1);
                         c.Ab || La.u() || !c.isFloat || !ea || La.kb() || (c.isFloat = !1);
                         c.isFloat && (L = 2);
                         c.xa && B && !JEContext.Pd() && (c.xa = !1);
                         var ka = a.createTexture(),
                             ja = c.Ha,
                             va = null,
                             X = !1,
                             K = 0,
                             r = 0,
                             P = !1,
                             U = t++,
                             aa = !1,
                             y, J, za, W, ba, la, ca, pa = c.isFlipY,
                             wa = c.I && c.isMipmap && "undefined" !== typeof Ka && !Ka.kc() ? !0 : !1,
                             ya, Ba = -1,
                             Ca = !1;
                         "undefined" !== typeof c.width && c.width && (K = c.width, r = "undefined" !== typeof c.height && c.height ? c.height : K);
                         var Y = {
                             get: function() {
                                 return ka
                             },
                             A: function() {
                                 return K
                             },
                             L: function() {
                                 return r
                             },
                             Md: function() {
                                 return c.url
                             },
                             Qd: function() {
                                 return c.isFloat
                             },
                             Sd: function() {
                                 return c.I
                             },
                             Td: function() {
                                 return c.isLinear
                             },
                             Ra: function() {
                                 a.generateMipmap(a.TEXTURE_2D)
                             },
                             jb: function(x, Q) {
                                 wa ? (x || (x = Y.sb()), Y.Fa(Q), b(ya[x]), h[Q] = -1) : Y.b(Q)
                             },
                             sb: function() {
                                 -1 === Ba && (Ba = Math.log(K) / Math.log(2));
                                 return Ba
                             },
                             qb: function(x) {
                                 if (wa) {
                                     x || (x = Y.sb());
                                     w.set("s11");
                                     Y.Fa(0);
                                     var Q, ha = K,
                                         D = r;
                                     for (Q = 1; Q <= x; ++Q) ha /= 2, D /= 2, w.la("u7", .25 / ha, .25 / D), a.viewport(0, 0, ha, D), b(ya[Q - 1]), a.framebufferTexture2D(I.aa(),
                                         a.COLOR_ATTACHMENT0, a.TEXTURE_2D, ya[Q], 0), N.g(!1, 1 === Q);
                                     h[0] = -1
                                 } else Y.Ra()
                             },
                             Fa: function(x) {
                                 x !== n && (a.activeTexture(q[x]), n = x)
                             },
                             b: function(x) {
                                 if (!P) return !1;
                                 Y.Fa(x);
                                 if (h[x] === U) return !1;
                                 b(ka);
                                 h[x] = U;
                                 return !0
                             },
                             ib: function(x) {
                                 a.activeTexture(q[x]);
                                 n = x;
                                 b(ka);
                                 h[x] = U
                             },
                             j: function() {
                                 a.framebufferTexture2D(I.aa(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, ka, 0)
                             },
                             C: function() {
                                 a.viewport(0, 0, K, r);
                                 a.framebufferTexture2D(I.aa(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, ka, 0)
                             },
                             fe: function() {
                                 a.framebufferTexture2D(I.aa(), a.COLOR_ATTACHMENT0,
                                     a.TEXTURE_2D, null, 0)
                             },
                             resize: function(x, Q) {
                                 K = x;
                                 r = Q;
                                 F()
                             },
                             clone: function(x) {
                                 x = da.a({
                                     width: K,
                                     height: r,
                                     I: c.I,
                                     isFloat: c.isFloat,
                                     isLinear: c.isLinear,
                                     V: c.V,
                                     isFlipY: x ? !pa : pa,
                                     isPot: c.isPot
                                 });
                                 Ja.set("s0");
                                 I.S();
                                 x.j();
                                 a.viewport(0, 0, K, r);
                                 Y.b(0);
                                 N.g(!0, !0);
                                 return x
                             },
                             ad: function() {
                                 a.viewport(0, 0, K, r)
                             },
                             remove: function() {
                                 a.deleteTexture(ka);
                                 Y = null
                             },
                             refresh: function() {
                                 Y.ib(0);
                                 pa && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !0);
                                 T ? a.texImage2D(a.TEXTURE_2D, 0, ba, la, a.UNSIGNED_BYTE, c.D) : a.texImage2D(a.TEXTURE_2D, 0, ba, K, r, 0,
                                     la, ca, X);
                                 pa && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1)
                             },
                             lb: function() {
                                 var x = K * r * 4;
                                 J = [new Uint8Array(x), new Uint8Array(x), new Uint8Array(x), new Uint8Array(x)];
                                 y = [new Float32Array(J[0].buffer), new Float32Array(J[1].buffer), new Float32Array(J[2].buffer), new Float32Array(J[3].buffer)];
                                 za = new Uint8Array(4 * x);
                                 W = new Float32Array(za.buffer);
                                 aa = !0
                             },
                             Qb: function() {
                                 aa || Y.lb();
                                 a.readPixels(0, 0, K, 4 * r, a.RGBA, a.UNSIGNED_BYTE, za);
                                 var x, Q = K * r,
                                     ha = 2 * Q,
                                     D = 3 * Q;
                                 for (x = 0; x < Q; ++x) y[0][x] = W[x], y[1][x] = W[x + Q], y[2][x] = W[x + ha], y[3][x] =
                                     W[x + D];
                                 return y
                             },
                             mb: function() {
                                 I.J();
                                 w.set("s12");
                                 Y.b(0);
                                 for (var x = 0; 4 > x; ++x) a.viewport(0, r * x, K, r), w.Tb("u8", A[x]), N.g(!1, 0 === x)
                             },
                             ge: function(x) {
                                 var Q = ca === v[0] && !l();
                                 b(ka);
                                 pa && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, pa);
                                 Q ? (ma || (ia = document.createElement("canvas"), ia.width = K, ia.height = r, fa = ia.getContext("2d"), ra = fa.createImageData(K, r), ma = !0), ra.data.set(x), fa.putImageData(ra, 0, 0), a.texImage2D(a.TEXTURE_2D, 0, ba, la, ca, ia)) : a.texImage2D(a.TEXTURE_2D, 0, ba, K, r, 0, la, ca, x);
                                 h[n] = U;
                                 pa && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,
                                     !1)
                             },
                             he: function(x, Q) {
                                 b(ka);
                                 a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, Q);
                                 a.texImage2D(a.TEXTURE_2D, 0, ba, la, ca, x);
                                 h[n] = U;
                                 Q && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1)
                             },
                             Xd: function(x, Q) {
                                 var ha = K * r,
                                     D = 4 * ha;
                                 x = c.I ? x ? "RGBE" : "JSON" : "RGBA";
                                 Q && (x = Q);
                                 Q = La.u() && !1;
                                 switch (x) {
                                     case "RGBE":
                                         var G = "s41";
                                         break;
                                     case "JSON":
                                         G = Q ? "s0" : "s12";
                                         break;
                                     case "RGBA":
                                     case "RGBAARRAY":
                                         G = "s6"
                                 }
                                 aa || ("RGBA" === x || "RGBE" === x || "RGBAARRAY" === x ? (J = new Uint8Array(D), aa = !0) : "JSON" !== x || Q || Y.lb());
                                 I.J();
                                 w.set(G);
                                 Y.b(0);
                                 if ("RGBA" === x || "RGBE" === x || "RGBAARRAY" ===
                                     x) {
                                     a.viewport(0, 0, K, r);
                                     N.g(!0, !0);
                                     a.readPixels(0, 0, K, r, a.RGBA, a.UNSIGNED_BYTE, J);
                                     if ("RGBAARRAY" === x) return {
                                         data: J
                                     };
                                     O || (S = document.createElement("canvas"), M = S.getContext("2d"), O = !0);
                                     S.width = K;
                                     S.height = r;
                                     f = M.createImageData(K, r);
                                     f.data.set(J);
                                     M.putImageData(f, 0, 0);
                                     var qa = S.toDataURL("image/png")
                                 } else if ("JSON" === x)
                                     if (Q) qa = new Float32Array(ha), a.viewport(0, 0, K, r), N.g(!0, !0), a.readPixels(0, 0, K, r, a.RGBA, a.FLOAT, qa);
                                     else {
                                         for (qa = 0; 4 > qa; ++qa) a.viewport(0, r * qa, K, r), w.Tb("u8", A[qa]), N.g(!qa, !qa);
                                         Y.Qb();
                                         qa =
                                             Array(ha);
                                         for (G = 0; G < ha; ++G) qa[4 * G] = y[0][G], qa[4 * G + 1] = y[1][G], qa[4 * G + 2] = y[2][G], qa[4 * G + 3] = y[3][G]
                                     } return {
                                     format: x,
                                     data: qa,
                                     width: K,
                                     height: r,
                                     isMirrorY: c.V,
                                     isFlipY: "RGBA" === x ? c.isFlipY : !c.isFlipY
                                 }
                             }
                         };
                         c.isMipmap && !wa && P && !Ca && (Y.Ra(), Ca = !0);
                         if (c.url) b(ka), a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, 1, 1, 0, a.RGBA, a.UNSIGNED_BYTE, null), va = new Image, va.sd = "Anonymous", va.crossOrigin = "Anonymous", va.src = c.url, va.onload = function() {
                             K = va.width;
                             r = va.height;
                             F()
                         };
                         else if (c.D) {
                             var sa = function() {
                                 K = void 0 !== c.D.videoWidth ? c.D.videoWidth :
                                     c.D.width;
                                 r = void 0 !== c.D.videoHeight ? c.D.videoHeight : c.D.height;
                                 K ? F() : setTimeout(sa, 1)
                             };
                             sa()
                         } else c.array ? (c.I && !c.isFloat ? c.array instanceof Uint16Array ? (X = c.array, F()) : k() ? (X = e(c.array), F()) : (F(), da.xc(Y, c.array, pa)) : (X = c.isFloat ? c.array instanceof Float32Array ? c.array : new Float32Array(c.array) : c.array instanceof Uint8Array ? c.array : new Uint8Array(c.array), F()), c.isKeepArray || (X && X !== c.array && (X = null), delete c.array)) : F();
                         Y.Cc = Y.A;
                         ja && P && (ja(Y), ja = !1);
                         return Y
                     },
                     J: function(c) {
                         c !== n && (a.activeTexture(q[c]),
                             n = c);
                         h[c] = -1;
                         b(null)
                     },
                     nd: function(c) {
                         u.random.b(c)
                     },
                     reset: function() {
                         for (var c = 0; c < q.length; ++c) h[c] = -1;
                         n = -1
                     },
                     Wd: function() {
                         n = -1
                     },
                     de: function() {
                         for (var c = 0; c < q.length; ++c) da.J(c)
                     },
                     yc: function() {
                         u && (u.random.remove(), u.Vb.remove())
                     },
                     ee: function(c, F) {
                         if ("RGBA" === c.format || "RGBE" === c.format) {
                             var L = new Image;
                             L.src = c.data;
                             L.onload = function() {
                                 da.a({
                                     V: c.isMirrorY,
                                     isFlipY: c.isFlipY,
                                     isFloat: !1,
                                     D: L,
                                     Ha: function(T) {
                                         if ("RGBA" === c.format) F(T);
                                         else {
                                             var ia = c.width,
                                                 fa = c.height,
                                                 ma = da.a({
                                                     V: c.isMirrorY,
                                                     isFloat: !0,
                                                     width: ia,
                                                     height: fa,
                                                     isFlipY: c.isFlipY
                                                 });
                                             I.S();
                                             a.viewport(0, 0, ia, fa);
                                             w.set("s42");
                                             ma.j();
                                             T.b(0);
                                             N.g(!0, !0);
                                             da.J(0);
                                             F(ma);
                                             a.flush();
                                             setTimeout(T.remove, 50)
                                         }
                                     }
                                 })
                             }
                         } else "JSON" === c.format ? F(da.a({
                             isFloat: !0,
                             isFlipY: c.isFlipY,
                             width: c.width,
                             height: c.height,
                             array: new Float32Array(c.data)
                         })) : F(!1)
                     }
                 };
             return da
         }(),
         Na = {
             a: function(b) {
                 var d = [Z.a(b), Z.a(b)],
                     e = [d[1], d[0]],
                     k = e,
                     l = {
                         Yc: function(m) {
                             k[1].j();
                             k[0].b(m);
                             l.Ub()
                         },
                         Yd: function(m) {
                             k[1].C();
                             k[0].b(m);
                             l.Ub()
                         },
                         Ub: function() {
                             k = k === d ? e : d
                         },
                         refresh: function() {
                             k[0].refresh();
                             k[1].refresh()
                         },
                         b: function(m) {
                             k[0].b(m)
                         },
                         Fd: function() {
                             return k[0]
                         }
                     };
                 return l
             }
         },
         La = function() {
             function b() {
                 d = "undefined" === typeof Ma ? JEContext : Ma;
                 e = !0
             }
             var d = null,
                 e = !1,
                 k = !1,
                 l = !1,
                 m = !1,
                 n = !1,
                 q = !1,
                 t = !1,
                 h = !1,
                 u = !1,
                 v = !1,
                 C = !1,
                 H = !0,
                 E = !0,
                 O = !0,
                 S = null,
                 M = "undefined" === typeof window ? {} : window,
                 f = {
                     m: function() {
                         if (e) return !0;
                         b();
                         f.ob();
                         f.Qa();
                         f.sc();
                         f.tc();
                         I.m();
                         Z.m();
                         if (!f.oc()) return !1;
                         N.m();
                         Z.Ec();
                         return !0
                     },
                     A: function() {
                         e || b();
                         return d.A()
                     },
                     L: function() {
                         e || b();
                         return d.L()
                     },
                     u: function() {
                         e || b();
                         return d.u()
                     },
                     sc: function() {
                         C = (v =
                             a.getExtension("EXT_color_buffer_float") || a.getExtension("WEBGL_color_buffer_float") || a.getExtension("OES_color_buffer_float")) ? !0 : !1;
                         M.GL_EXT_COLORBUFFERFLOAT = v
                     },
                     tc: function() {
                         a.getExtension("EXT_color_buffer_half_float") || a.getExtension("WEBGL_color_buffer_half_float") || a.getExtension("OES_color_buffer_half_float")
                     },
                     ob: function() {
                         if (!k) {
                             this.u() || (l = a.getExtension("OES_texture_float") || a.getExtension("MOZ_OES_texture_float") || a.getExtension("WEBKIT_OES_texture_float"), n = (M.GL_EXT_FLOAT = l) ? !0 : !1);
                             if (n || this.u()) m = a.getExtension("OES_texture_float_linear") || a.getExtension("MOZ_OES_texture_float_linear") || a.getExtension("WEBKIT_OES_texture_float_linear"), M.GL_EXT_FLOATLINEAR = m;
                             k = !0
                         }
                     },
                     Qa: function() {
                         if (!u) {
                             if (!this.u()) {
                                 if (q = a.getExtension("OES_texture_half_float") || a.getExtension("MOZ_OES_texture_half_float") || a.getExtension("WEBKIT_OES_texture_half_float")) S = q.HALF_FLOAT_OES, t = !0;
                                 !S && a.HALF_FLOAT && (S = a.HALF_FLOAT);
                                 !S && a.FLOAT && (S = a.FLOAT);
                                 M.GL_EXT_HALFFLOAT = q
                             }
                             if (t || this.u()) h = a.getExtension("OES_texture_half_float_linear") ||
                                 a.getExtension("MOZ_OES_texture_half_float_linear") || a.getExtension("WEBKIT_OES_texture_half_float_linear"), M.GL_EXT_HALFFLOATLINEAR = h;
                             u = !0
                         }
                     },
                     va: function() {
                         if (f.u()) return a.HALF_FLOAT;
                         f.Qa();
                         return t ? S : a.FLOAT
                     },
                     kb: function() {
                         return H
                     },
                     jc: function() {
                         return E
                     },
                     od: function() {
                         return O
                     },
                     ic: function() {
                         return C
                     },
                     qc: function() {
                         E = H = !0;
                         var A = a.createFramebuffer();
                         a.bindFramebuffer(a.FRAMEBUFFER, A);
                         var B = a.createTexture();
                         a.bindTexture(a.TEXTURE_2D, B);
                         a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST);
                         a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST);
                         a.texImage2D(a.TEXTURE_2D, 0, f.u() && a.RGBA32F ? a.RGBA32F : a.RGBA, 1, 1, 0, a.RGBA, a.FLOAT, null);
                         a.framebufferTexture2D(I.aa(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, B, 0);
                         var ea = a.checkFramebufferStatus(I.Sa());
                         ea !== a.FRAMEBUFFER_COMPLETE && (H = !1);
                         a.texImage2D(a.TEXTURE_2D, 0, f.u() && a.RGBA16F ? a.RGBA16F : a.RGBA, 1, 1, 0, a.RGBA, f.va(), null);
                         a.framebufferTexture2D(I.aa(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, B, 0);
                         ea = a.checkFramebufferStatus(I.Sa());
                         ea !== a.FRAMEBUFFER_COMPLETE &&
                             (E = !1);
                         a.bindTexture(a.TEXTURE_2D, null);
                         a.bindFramebuffer(a.FRAMEBUFFER, null);
                         a.deleteTexture(B);
                         a.deleteFramebuffer(A)
                     },
                     pc: function() {
                         var A = I.a({
                             width: 1
                         });
                         A.Rb();
                         var B = Z.a({
                             width: 1,
                             isFloat: !0,
                             ja: 3
                         });
                         A.j();
                         B.j();
                         a.flush();
                         a.checkFramebufferStatus(I.Sa()) !== a.FRAMEBUFFER_COMPLETE ? (Z.Vc(), O = !1) : O = !0;
                         A.remove();
                         B.remove()
                     },
                     oc: function() {
                         f.qc();
                         if (!H && !E) return !1;
                         f.pc();
                         return !0
                     }
                 };
             return f
         }(),
         Ka = function() {
             function b(E, O, S, M) {
                 a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, M ? a.NEAREST_MIPMAP_NEAREST :
                     a.LINEAR);
                 try {
                     var f = a.getError();
                     f !== a.NO_ERROR && console.log("GLERR in test_mipmapping() :", f);
                     a.texImage2D(a.TEXTURE_2D, 0, E, 2, 2, 0, a.RGBA, O, S);
                     f = a.getError();
                     if (f !== a.NO_ERROR) return !1
                 } catch (A) {
                     return !1
                 }
                 M && a.generateMipmap(a.TEXTURE_2D);
                 N.fa();
                 N.g(!1, !0);
                 a.readPixels(0, 0, 1, 1, a.RGBA, a.UNSIGNED_BYTE, q);
                 f = a.getError();
                 f === a.INVALID_OPERATION && "undefined" !== typeof a.PIXEL_PACK_BUFFER && (a.bindBuffer(a.PIXEL_PACK_BUFFER, null), a.readPixels(0, 0, 1, 1, a.RGBA, a.UNSIGNED_BYTE, q), f = a.getError());
                 return f !== a.NO_ERROR ?
                     !1 : 0 !== q[0]
             }

             function d(E) {
                 return La.kb() && b(v, a.FLOAT, new Float32Array(h), E) ? (m = l.fb, !0) : !1
             }

             function e(E) {
                 return La.jc() ? b(C, La.va(), new Uint16Array(h), E) || b(C, a.FLOAT, new Float32Array(h), E) ? (m = l.Ea, !0) : !1 : !1
             }
             var k = !1,
                 l = {
                     fb: 3,
                     Ea: 2,
                     RGBA8: 0
                 },
                 m = l.RGBA8,
                 n, q = new Uint8Array(4),
                 t = [.8, 1, .8, 1],
                 h = t.concat(t, t, t),
                 u = !0,
                 v, C, H = {
                     m: function() {
                         La.ob();
                         La.Qa();
                         C = v = a.RGBA;
                         if (Ma.u()) {
                             var E = a.RGBA32F;
                             E && (v = E);
                             (E = a.RGBA16F) && (C = E)
                         }
                         N.m();
                         I.reset();
                         I.J();
                         a.viewport(0, 0, 1, 1);
                         w.set("s0");
                         k = !0;
                         n = a.createTexture();
                         a.activeTexture(a.TEXTURE0);
                         a.bindTexture(a.TEXTURE_2D, n);
                         a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.REPEAT);
                         a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.REPEAT);
                         a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST);
                         if (e(!0) || d(!0)) return !0;
                         u = !1;
                         if (e(!1) || d(!1)) return !0;
                         if (Ma.u()) {
                             C = v = a.RGBA;
                             if (e(!0) || d(!0)) return !0;
                             u = !1;
                             if (e(!1) || d(!1)) return !0
                         }
                         return !1
                     },
                     kc: function() {
                         return u
                     },
                     Gd: function() {
                         return m
                     },
                     Rd: function() {
                         k || H.m();
                         return m === l.fb
                     },
                     Hc: function() {
                         k || H.m();
                         return m === l.Ea
                     }
                 };
             return H
         }(),
         Oa = {
             a: function(b) {
                 var d =
                     Z.a(b.alpha),
                     e = Z.a(b.beta);
                 return {
                     rc: function() {
                         d.b(1);
                         e.b(2)
                     }
                 }
             }
         },
         Ra = {
             a: function(b) {
                 var d = b.cd;
                 d.index = b.index;
                 d.W = b.W;
                 d.parent = b.parent;
                 switch (d.type) {
                     case "input":
                         b = Pa.a(d);
                         break;
                     default:
                         b = Qa.a(d)
                 }
                 return b
             }
         },
         Pa = {
             a: function(b) {
                 var d = null,
                     e = !1,
                     k = !1,
                     l = !1,
                     m = !1,
                     n = null,
                     q = "undefined" === typeof b.preprocessing ? !1 : b.preprocessing,
                     t = "undefined" === typeof b.preprocessingSize ? b.size : b.preprocessingSize;
                 b.mask && (e = !0, SETTINGS && void 0 !== SETTINGS.ec && (b.mask = SETTINGS.ec + b.mask), d = Z.a({
                     isFloat: !1,
                     url: b.mask
                 }));
                 var h = !1;
                 b.customInputShader && (h = "s43", w.gb({
                     name: "_",
                     id: h,
                     c: b.customInputShader,
                     f: ["uSource"],
                     precision: "lowp"
                 }), w.H(h, [{
                     type: "1i",
                     name: "_",
                     value: 0
                 }]));
                 switch (q) {
                     case "sobel":
                         n = "s32";
                         l = !0;
                         break;
                     case "meanNormalization":
                         n = "s33";
                         l = !0;
                         break;
                     case "grayScale":
                         n = "s29";
                         l = !1;
                         break;
                     case "grayScaleTilt":
                         n = "s30";
                         m = !0;
                         l = !1;
                         break;
                     case "rgbGrayTilt":
                         n = "s31";
                         m = !0;
                         l = !1;
                         break;
                     case "copy":
                         n = h ? h : "s0";
                         break;
                     case "inputLightRegulation":
                         n = h ? h : "s29";
                         Sa.m({
                             xb: t,
                             Nb: b.size,
                             Hb: b.nBlurPass,
                             Gc: !1
                         });
                         k = !0;
                         break;
                     case "direct":
                     case "none":
                         n = !1;
                         break;
                     default:
                         n = "s3"
                 }
                 m && w.H(n, [{
                     name: "u28",
                     type: "1f",
                     value: b.tilt
                 }]);
                 e && (n += "Mask");
                 var u = Z.a({
                         isFloat: !1,
                         isPot: !1,
                         width: b.size
                     }),
                     v = {
                         A: function() {
                             return t
                         },
                         wa: function() {
                             return v.A()
                         },
                         Bc: function() {
                             return k ? Sa.ub() : u
                         },
                         F: function() {
                             I.S();
                             n && (w.set(n), l && w.v("u29", 1 / b.size), u.C(), e && d.b(1), N.g(!1, !1), u.b(0), k && Sa.Qc(u))
                         }
                     };
                 return v
             }
         },
         Qa = {
             a: function(b) {
                 "undefined" === typeof b.disableNormalize && (b.disableNormalize = !1);
                 var d = [],
                     e = [],
                     k, l, m = !1,
                     n, q = !0,
                     t, h, u = b.isReorganize ? b.isReorganize : !1,
                     v = b.kernelsNumber ?
                     !0 : !1,
                     C = b.dynPelu ? Oa.a(b.dynPelu) : !1,
                     H = C ? !0 : !1,
                     E = {
                         isEnabled: !1
                     },
                     O;
                 if ("softmax" === b.type) {
                     b.activation = "softmax";
                     b.size = Math.pow(2, Math.ceil(Math.log2(Math.sqrt(b.num_classes))));
                     b.sparsity = "undefined" !== typeof b.sparsity ? b.sparsity : b.W.wa();
                     b.gain = "undefined" !== typeof b.gain ? b.gain : 1;
                     w.H("s20", [{
                         type: "1f",
                         name: "u10",
                         value: b.gain
                     }]);
                     var S = Z.a({
                             isFloat: !0,
                             isPot: !1,
                             width: b.size
                         }),
                         M = Z.a({
                             isFloat: !0,
                             isPot: !1,
                             width: b.size,
                             isMipmap: !0
                         });
                     q = !1;
                     var f = new Uint8Array(Math.pow(4 * b.size, 2)),
                         A;
                     for (A = 0; A < b.size *
                         b.size; ++A) {
                         var B = A < b.num_classes ? 255 : 0;
                         f[4 * A] = B;
                         f[4 * A + 1] = B;
                         f[4 * A + 2] = B;
                         f[4 * A + 3] = B
                     }
                     var ea = Z.a({
                         isFloat: !1,
                         isPot: !1,
                         width: b.size,
                         array: f
                     })
                 } else b.cost ? (b.sparsity = "undefined" !== typeof b.sparsity ? b.sparsity : b.W.wa(), q = !1) : "full" === b.connectivityUp && (b.sparsity = b.W.wa());
                 var xa = {
                         elu: "s15",
                         elu01: "s16",
                         relu: "s14",
                         arctan: "s18",
                         sigmoid: "s13",
                         copy: "s0",
                         softplus: "s19",
                         softmax: "s20",
                         dynPelu: "s17"
                     } [b.activation],
                     Ea = b.sparsity * b.sparsity,
                     ua = !1,
                     da = b.size;
                 if (b.maxPooling) {
                     switch (b.maxPooling.size) {
                         case 2:
                             var c =
                                 "s34";
                             break;
                         case 4:
                             c = "s35"
                     }
                     ua = !0;
                     da /= b.maxPooling.size;
                     var F = Z.a({
                         isFloat: !0,
                         isPot: !1,
                         width: da
                     })
                 }
                 var L = void 0 !== b.Nc && b.Nc ? !0 : !1,
                     T = null,
                     ia = null,
                     fa = null;
                 L && (T = "s44" + b.index.toString(), w.wb("s44", T, [((b.normalization.n - 1) / 2).toFixed(1)]), w.H(T, [{
                         type: "1i",
                         name: "u1",
                         value: 0
                     }, {
                         type: "2f",
                         name: "u7",
                         value: [1 / b.size, 1 / b.size]
                     }, {
                         type: "1f",
                         name: "u6",
                         value: b.normalization.alpha
                     }, {
                         type: "1f",
                         name: "u9",
                         value: b.normalization.beta
                     }, {
                         type: "1f",
                         name: "u33",
                         value: b.normalization.k
                     }]), ia = Z.a({
                         isFloat: !0,
                         isPot: !0,
                         width: b.size
                     }),
                     fa = Z.a({
                         isFloat: !0,
                         isPot: !0,
                         width: b.size
                     }));
                 var ma, ra, ka, ja;
                 q && (ja = Z.a({
                     isFloat: !0,
                     isPot: !1,
                     width: b.size
                 }));
                 var va = Z.a(b.bias),
                     X, K = {
                         A: function() {
                             return b.size
                         },
                         wa: function() {
                             return da
                         },
                         tb: function() {
                             return b.num_classes
                         },
                         gc: function(r) {
                             O.b(r)
                         },
                         Rc: function() {
                             b.remap && b.remap.isEnabled && (E = {
                                 isEnabled: !0,
                                 Jc: Z.a({
                                     isFloat: !1,
                                     isFlipY: !1,
                                     array: new Uint8Array(b.remap.maskTexture.data),
                                     width: b.remap.maskTexture.width,
                                     isPot: !1
                                 }),
                                 layers: b.remap.layers.map(function(r) {
                                     return b.parent.Ac(r)
                                 }),
                                 depth: b.remap.depth
                             })
                         },
                         Xc: function() {
                             switch (b.connectivityUp) {
                                 case "gaussian":
                                     X = Ua.a(b.connectivity);
                                     break;
                                 case "direct":
                                     X = Va.a(b.connectivity);
                                     break;
                                 case "square":
                                     X = Wa.a(b.connectivity);
                                     break;
                                 case "squareFast":
                                     X = Xa.a(b.connectivity, b.activation);
                                     break;
                                 case "full":
                                     X = Ya.a(b.connectivity);
                                     break;
                                 case "conv":
                                     h = b.kernelsNumber, X = Za.a(b.connectivity), u && (t = Z.a({
                                         width: da,
                                         isFloat: !0,
                                         isFlipY: !1,
                                         isPot: !1
                                     }))
                             }
                             if (X.X) {
                                 var r = b.size * b.sparsity;
                                 ra = Math.log(r / b.size) / Math.log(2);
                                 ma = Z.a({
                                     isMipmap: !0,
                                     isFloat: !0,
                                     isPot: !0,
                                     width: r,
                                     Fb: ra
                                 });
                                 ka =
                                     Z.a({
                                         isFloat: !0,
                                         isPot: !0,
                                         width: b.size
                                     })
                             }
                         },
                         F: function(r, P) {
                             O = r;
                             X.X ? (ma.C(), v && va.b(2), X.F(E), ma.b(0), ma.qb(ra), ka.C(), v ? w.set("s0") : (w.set("s28"), w.v("u27", Ea), va.b(1)), ma.jb(ra, 0), N.g(!1, !1), w.set(xa), L ? ia.j() : ja.j(), ka.b(0), H && C.rc(), N.g(!1, !1)) : (ja.C(), va.b(1), X.F());
                             L && (w.set(T), fa.j(), ia.b(0), N.g(!1, !1), w.set("s45"), w.v("u6", 1), ja.j(), fa.b(1), N.g(!1, !1));
                             if (q) return ua ? (F.C(), ja.b(0), w.set(c), w.la("u7", 1 / b.size, 1 / b.size), N.g(!1, !1), P = F) : P = ja, P.b(0), u && (t.j(), w.set("s22"), w.la("u14", h, da / h), N.g(!1,
                                 !1), P = t, t.b(0)), P;
                             if ("softmax" === b.type) {
                                 w.set("s20");
                                 ja.b(0);
                                 S.j();
                                 N.g(!1, !1);
                                 b.disableNormalize ? r = S : (w.set("s2"), S.b(0), ea.b(1), M.j(), N.g(!1, !1), w.set("s0"), l.C(), M.b(0), M.qb(!1), N.g(!1, !1), w.set("s21"), k.C(), M.jb(!1, 0), w.v("u12", ja.Cc()), l.b(1), N.g(!1, !1), r = k);
                                 if (P) {
                                     switch (m) {
                                         case "cpuRGBAAvg":
                                             break;
                                         default:
                                             var U = K.Pb(r)
                                     }
                                     return U
                                 }
                                 return !1
                             }
                             if (b.cost) {
                                 w.set("gpuRawAvg" === m ? "s8" : "s7");
                                 P = ja;
                                 b.disableNormalize || (w.v("u4", 1 / b.size), k.C(), ja.b(0), N.g(!1, !1), P = k);
                                 switch (m) {
                                     case "cpuRGBA2Float":
                                         P.mb();
                                         U = K.Pb(P);
                                         n(U);
                                         break;
                                     case "gpuRawAvg":
                                     case "gpuRaw":
                                         P.b(0), n(P)
                                 }
                                 return !1
                             }
                         },
                         mc: function(r) {
                             r && "undefined" !== typeof r.Mb && (m = r.Mb, n = r.Pc);
                             ja = Z.a({
                                 isFloat: !0,
                                 isPot: !0,
                                 isMipmap: "softmax" === b.type,
                                 width: b.size
                             });
                             "softmax" === b.type && (l = Z.a({
                                 isFloat: !0,
                                 isPot: !0,
                                 width: 1
                             }));
                             var P = 0,
                                 U = 0,
                                 aa = "undefined" !== typeof b.num_classes && b.num_classes ? b.num_classes : b.size * b.size;
                             for (r = 0; r < aa; ++r) d.push(P + (b.size - 1 - U) * b.size), e.push([-1, -1, -1, -1]), ++P, P === b.size && (P = 0, ++U);
                             b.disableNormalize || (k = Z.a({
                                 isFloat: !0,
                                 isPot: !0,
                                 width: b.size
                             }))
                         },
                         Pb: function(r) {
                             r.mb();
                             var P = r.Qb();
                             d.forEach(function(U, aa) {
                                 e[aa][0] = P[0][U];
                                 e[aa][1] = P[1][U];
                                 e[aa][2] = P[2][U];
                                 e[aa][3] = P[3][U]
                             });
                             return e
                         }
                     };
                 b.W && K.Xc(b.W);
                 return K
             }
         };

     function $a() {
         var b = {
                 Od: !1
             },
             d, e, k;
         b || (b = {});
         this.Ac = function(l) {
             return d[l]
         };
         this.Uc = function(l) {
             var m = !1;
             d = l.map(function(n, q) {
                 return m = n = Ra.a({
                     index: q,
                     parent: this,
                     cd: n,
                     W: m
                 })
             });
             e = d[0];
             k = d[d.length - 1];
             d.forEach(function(n, q) {
                 0 !== q && n.Rc()
             })
         };
         this.F = function(l, m) {
             var n = m;
             d.forEach(function(q) {
                 n = q.F(n, l)
             });
             return n
         };
         this.rb = function() {
             return e.A()
         };
         this.ub = function() {
             return k.Bc()
         };
         this.Wc = function(l) {
             k.mc(l)
         };
         this.tb = function() {
             return k.tb()
         }
     }
     var Va = {
             a: function(b) {
                 var d = Z.a(b.weights);
                 delete b.weights.data;
                 return {
                     X: !0,
                     ia: function() {
                         return 1
                     },
                     Dc: function() {
                         return d
                     },
                     F: function() {
                         w.set("s27");
                         d.b(1);
                         N.g(!1, !1)
                     }
                 }
             }
         },
         Ya = {
             a: function(b) {
                 var d = b.fromLayerSize,
                     e = Z.a(b.weights);
                 return {
                     X: !0,
                     ia: function() {
                         return d
                     },
                     F: function(k) {
                         if (k.isEnabled) {
                             w.set("s25");
                             k.Jc.b(3);
                             var l, m = Math.min(k.layers.length, k.depth);
                             for (l = 0; l < m; ++l) k.layers[l].gc(4 + l)
                         } else w.set("s24");
                         w.v("u18", b.toLayerSize);
                         e.b(1);
                         N.g(!1, !1)
                     }
                 }
             }
         },
         Ua = {
             a: function(b) {
                 var d = b.toSparsity * b.toLayerSize,
                     e = d / b.fromLayerSize,
                     k = Z.a(b.weights);
                 Z.a({
                     width: d,
                     isFloat: !0,
                     array: new Float32Array(b.fromBindings),
                     isPot: !0
                 });
                 var l = Z.a({
                     width: d,
                     isFloat: !0,
                     array: new Float32Array(b.toBindings),
                     isPot: !0
                 });
                 return {
                     X: !0,
                     ia: function() {
                         return e
                     },
                     F: function() {
                         w.set("s23");
                         k.b(1);
                         l.b(2);
                         N.g(!1, !0)
                     }
                 }
             }
         },
         Wa = {
             a: function(b) {
                 var d = b.fromLayerSize,
                     e = b.toLayerSize,
                     k = b.toSparsity,
                     l = k * e,
                     m = l / d,
                     n = d / e,
                     q, t, h, u, v = 0,
                     C = 0,
                     H = 0,
                     E = Array(k * e * k * e * 4),
                     O = Array(k * e * k * e * 4),
                     S = Array(d * d);
                 for (q = 0; q < S.length; ++q) S[q] = 0;
                 var M = Math.floor(k / 2),
                     f = .5 / e,
                     A =
                     .5 / d,
                     B = .5 / l;
                 for (q = 0; q < e; ++q)
                     for (t = 0; t < e; ++t) {
                         var ea = Math.round(q * n);
                         var xa = Math.round(t * n);
                         var Ea = q / e;
                         var ua = t / e;
                         Ea += f;
                         ua += f;
                         for (h = 0; h < k; ++h)
                             for (u = 0; u < k; ++u) {
                                 var da = v / l;
                                 var c = C / l;
                                 var F = ea + h - M;
                                 var L = xa + u - M;
                                 0 > F && (F += d);
                                 0 > L && (L += d);
                                 F >= d && (F -= d);
                                 L >= d && (L -= d);
                                 var T = F / d;
                                 var ia = L / d;
                                 c = 1 - c - 1 / l;
                                 T += A;
                                 ia += A;
                                 da += B;
                                 c += B;
                                 var fa = q * k + h,
                                     ma = t * k + u;
                                 ma = e * k - ma - 1;
                                 fa = ma * e * k + fa;
                                 E[4 * fa] = da;
                                 E[4 * fa + 1] = c;
                                 E[4 * fa + 2] = T;
                                 E[4 * fa + 3] = ia;
                                 T = S[L * d + F]++;
                                 ia = T % m;
                                 F = F * m + ia;
                                 L = L * m + (T - ia) / m;
                                 L = d * m - 1 - L;
                                 L = L * d * m + F;
                                 O[4 * L] = da;
                                 O[4 * L + 1] = c;
                                 O[4 * L + 2] = Ea;
                                 O[4 *
                                     L + 3] = ua;
                                 ++v >= l && (v = 0, ++C);
                                 ++H
                             }
                     }
                 var ra = Z.a(b.weights);
                 Z.a({
                     width: l,
                     isFloat: !0,
                     array: new Float32Array(O),
                     isPot: !0
                 });
                 O = null;
                 var ka = Z.a({
                     width: l,
                     isFloat: !0,
                     array: new Float32Array(E),
                     isPot: !0
                 });
                 E = null;
                 return {
                     X: !0,
                     ia: function() {
                         return m
                     },
                     F: function() {
                         w.set("s23");
                         ra.b(1);
                         ka.b(2);
                         N.g(!1, !1)
                     }
                 }
             }
         },
         Za = {
             a: function(b) {
                 var d = b.kernelsNumber,
                     e = b.toSparsity,
                     k = e * b.toLayerSize / b.fromLayerSize,
                     l = Z.a(b.weights);
                 return {
                     X: !0,
                     ia: function() {
                         return k
                     },
                     Kd: function() {
                         return e
                     },
                     Dc: function() {
                         return l
                     },
                     F: function() {
                         w.set("s26");
                         w.v("u24", d);
                         w.v("u25", e);
                         w.v("u18", b.toLayerSize);
                         w.v("u26", b.fromLayerSize);
                         l.b(1);
                         N.g(!1, !1)
                     }
                 }
             }
         },
         Xa = {
             a: function(b, d) {
                 var e = b.fromLayerSize,
                     k = b.toLayerSize,
                     l = b.toSparsity,
                     m = b.stride ? b.stride : 1,
                     n = l * k / e,
                     q = k < e,
                     t = e / k,
                     h = Z.a(b.weights),
                     u = "s46" + [e.toString(), k.toString(), l.toString(), m.toString(), d].join("_");
                 w.uc(u) || (b = Fa(d), k = [{
                     type: "1f",
                     name: "u18",
                     value: k
                 }, {
                     type: "1f",
                     name: "u32",
                     value: m
                 }], q && k.push({
                     type: "1f",
                     name: "u26",
                     value: e
                 }), e = [(q ? n : l).toFixed(1), b], q && e.push(t.toFixed(1)), w.wb(q ? "s40" : "s39", u,
                     e), w.H(u, k.concat([{
                     type: "1i",
                     name: "u16",
                     value: 0
                 }, {
                     type: "1i",
                     name: "u23",
                     value: 1
                 }, {
                     type: "1i",
                     name: "u15",
                     value: 3
                 }])));
                 return {
                     X: !1,
                     ia: function() {
                         return n
                     },
                     F: function() {
                         w.set(u);
                         h.b(3);
                         N.g(!1, !1)
                     }
                 }
             }
         },
         Sa = function() {
             var b = -1,
                 d = -1,
                 e = -1,
                 k = -1,
                 l = !1,
                 m = null,
                 n = null,
                 q = null,
                 t = null,
                 h = null;
             return {
                 m: function(u) {
                     b = u.Hb ? u.Hb : 3;
                     d = u.xb ? u.xb : 64;
                     e = u.Nb ? u.Nb : 64;
                     l = u.Gc ? !0 : !1;
                     u = {
                         isFloat: !1,
                         width: d,
                         isPot: !1,
                         isFlipY: !1
                     };
                     m = Z.a(u);
                     n = Z.a(u);
                     q = Z.a(u);
                     t = Z.a(u);
                     h = Z.a({
                         isFloat: !0,
                         width: e,
                         isPot: !1,
                         isFlipY: !1
                     });
                     k = 1 / d
                 },
                 Qc: function(u) {
                     w.set("s36");
                     t.j();
                     N.g(l, !1);
                     w.set("s37");
                     for (var v = 0; v < b; ++v) m.j(), w.la("u7", k, 0), N.g(l, !1), q.j(), t.b(0), N.g(l, !1), n.j(), m.b(0), w.la("u7", 0, k), N.g(l, !1), t.j(), q.b(0), N.g(l, !1), v !== b - 1 && n.b(0);
                     w.set("s38");
                     h.j();
                     u.b(0);
                     n.b(1);
                     t.b(2);
                     N.g(l, !1);
                     h.b(0)
                 },
                 ub: function() {
                     return h
                 }
             }
         }();

     function ab(b, d) {
         b[d] = !0;
         b.setAttribute(d, "true")
     }

     function bb() {
         return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
     }

     function cb() {
         var b = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
         return 2 < b.length ? [parseInt(b[1], 10), parseInt(b[2], 10), parseInt(b[3] || 0, 10)] : [0, 0, 0]
     }

     function db() {
         var b = navigator.userAgent.toLowerCase();
         return -1 !== b.indexOf("safari") && -1 === b.indexOf("chrome") ? !0 : !1
     }

     function eb() {
         return navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? !0 : !1
     }

     function fb(b) {
         if (!b) return b;
         var d = !1;
         if (b.video) {
             var e = function(k) {
                 var l = {};
                 "undefined" !== typeof k.min && (l.min = k.min);
                 "undefined" !== typeof k.max && (l.max = k.max);
                 "undefined" !== typeof k.ideal && (l.ideal = k.ideal);
                 return l
             };
             d = {};
             "undefined" !== typeof b.video.width && (d.width = e(b.video.width));
             "undefined" !== typeof b.video.height && (d.height = e(b.video.height));
             "undefined" !== typeof b.video.facingMode && (d.facingMode = b.video.facingMode)
         }
         d = {
             audio: b.audio,
             video: d
         };
         "undefined" !== typeof b.deviceId && (d.deviceId = b.deviceId);
         return d
     }

     function gb(b) {
         var d = b.video.width;
         b.video.width = b.video.height;
         b.video.height = d;
         return b
     }

     function hb(b) {
         function d(v) {
             return [480, 576, 640, 648, 720, 768, 800, 960, 1080, 1152, 1280, 1366, 1920].sort(function(C, H) {
                 return Math.abs(C - v) - Math.abs(H - v)
             })
         }

         function e(v) {
             var C = fb(b);
             k.push(v(C))
         }
         var k = [];
         if (!b || !b.video) return k;
         if (b.video.width && b.video.height) {
             if (b.video.width.ideal && b.video.height.ideal) {
                 var l = d(b.video.width.ideal).slice(0, 3),
                     m = d(b.video.height.ideal).slice(0, 3),
                     n = {},
                     q = 0;
                 for (n.R = void 0; q < l.length; n = {
                         R: n.R
                     }, ++q) {
                     n.R = l[q];
                     var t = {},
                         h = 0;
                     for (t.P = void 0; h < m.length; t = {
                             P: t.P
                         }, ++h)
                         if (t.P = m[h],
                             n.R !== b.video.width.ideal || t.P !== b.video.height.ideal) {
                             var u = Math.max(n.R, t.P) / Math.min(n.R, t.P);
                             u < 4 / 3 - .1 || u > 16 / 9 + .1 || e(function(v, C) {
                                 return function(H) {
                                     H.video.width.ideal = v.R;
                                     H.video.height.ideal = C.P;
                                     return H
                                 }
                             }(n, t))
                         }
                 }
             }
             e(function(v) {
                 return gb(v)
             })
         }
         b.video.width && b.video.height && (b.video.width.ideal && b.video.height.ideal && e(function(v) {
             delete v.video.width.ideal;
             delete v.video.height.ideal;
             return v
         }), e(function(v) {
             delete v.video.width;
             delete v.video.height;
             return v
         }));
         b.video.facingMode && (e(function(v) {
             delete v.video.facingMode;
             return v
         }), b.video.width && b.video.height && e(function(v) {
             gb(v);
             delete v.video.facingMode;
             return v
         }));
         k.push({
             audio: b.audio,
             video: !0
         });
         return k
     }

     function ib(b) {
         try {
             var d = window.matchMedia("(orientation: portrait)").matches ? !0 : !1
         } catch (k) {
             d = window.innerHeight > window.innerWidth
         }
         if (d && b && b.video) {
             d = b.video.width;
             var e = b.video.height;
             d && e && d.ideal && e.ideal && d.ideal > e.ideal && (b.video.height = d, b.video.width = e)
         }
     }

     function jb(b) {
         b.volume = 0;
         ab(b, "muted");
         if (db()) {
             if (1 === b.volume) {
                 var d = function() {
                     b.volume = 0;
                     window.removeEventListener("mousemove", d, !1);
                     window.removeEventListener("touchstart", d, !1)
                 };
                 window.addEventListener("mousemove", d, !1);
                 window.addEventListener("touchstart", d, !1)
             }
             setTimeout(function() {
                 b.volume = 0;
                 ab(b, "muted")
             }, 5)
         }
     }

     function kb(b, d, e) {
         return new Promise(function(k, l) {
             if (b.srcObject && b.srcObject.getVideoTracks) {
                 var m = b.srcObject.getVideoTracks();
                 1 !== m.length ? l("INVALID_TRACKNUMBER") : (m = m[0], d ? lb(b, k, l, e) : (m.stop(), k()))
             } else l("BAD_IMPLEMENTATION")
         })
     }

     function mb(b, d, e, k) {
         function l(n) {
             m || (m = !0, e(n))
         }
         var m = !1;
         navigator.mediaDevices.getUserMedia(k).then(function(n) {
             function q() {
                 setTimeout(function() {
                     if (b.currentTime) {
                         var t = b.videoWidth,
                             h = b.videoHeight;
                         if (0 === t || 0 === h) l("VIDEO_NULLSIZE");
                         else {
                             t && (b.style.width = t.toString() + "px");
                             h && (b.style.height = h.toString() + "px");
                             t = {
                                 lc: null,
                                 bd: null,
                                 Kc: null
                             };
                             try {
                                 var u = n.getVideoTracks()[0];
                                 u && (t.Kc = u, t.lc = u.getCapabilities(), t.bd = u.getSettings())
                             } catch (v) {}
                             db() || bb() ? b.parentNode && null !== b.parentNode ? (m || d(b, n,
                                 t), setTimeout(function() {
                                 b.play()
                             }, 100)) : (document.body.appendChild(b), jb(b), m || d(b, n, t), setTimeout(function() {
                                 b.style.transform = "scale(0.0001,0.0001)";
                                 b.style.position = "fixed";
                                 b.style.bottom = "0px";
                                 b.style.right = "0px";
                                 jb(b);
                                 setTimeout(function() {
                                     b.play()
                                 }, 100)
                             }, 80)) : m || d(b, n, t)
                         }
                     } else l("VIDEO_NOTSTARTED")
                 }, 700)
             }
             "undefined" !== typeof b.srcObject ? b.srcObject = n : (b.src = window.URL.createObjectURL(n), b.videoStream = n);
             jb(b);
             b.addEventListener("loadeddata", function() {
                 var t = b.play();
                 jb(b);
                 "undefined" === typeof t ?
                     q() : t.then(function() {
                         q()
                     }).catch(function() {
                         l("VIDEO_PLAYPROMISEREJECTED")
                     })
             }, !1)
         }).catch(function(n) {
             l(n)
         })
     }

     function lb(b, d, e, k) {
         if (b)
             if (eb()) {
                 if (k && k.video) {
                     if (bb()) {
                         var l = cb();
                         (12 > l[0] || 12 === l[0] && 2 > l[1]) && ib(k)
                     }
                     k.video.width && k.video.width.ideal && (b.style.width = k.video.width.ideal + "px");
                     k.video.height && k.video.height.ideal && (b.style.height = k.video.height.ideal + "px")
                 }
                 ab(b, "autoplay");
                 ab(b, "playsinline");
                 k && k.audio ? b.volume = 0 : ab(b, "muted");
                 mb(b, d, function() {
                     function m(q) {
                         if (0 === q.length) e("INVALID_FALLBACKCONSTRAINTS");
                         else {
                             var t = q.shift();
                             mb(b, d, function() {
                                 m(q)
                             }, t)
                         }
                     }
                     var n = hb(k);
                     m(n)
                 }, k)
             } else e && e("MEDIASTREAMAPI_NOTFOUND");
         else e && e("VIDEO_NOTPROVIDED")
     }

     function nb(b) {
         if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return b(!1, "NOTSUPPORTED"), !1;
         navigator.mediaDevices.enumerateDevices().then(function(d) {
             (d = d.filter(function(e) {
                 return e.kind && -1 !== e.kind.toLowerCase().indexOf("video") && e.label && e.deviceId
             })) && d.length && 0 < d.length ? b(d, !1) : b(!1, "NODEVICESFOUND")
         }).catch(function() {
             b(!1, "PROMISEREJECTED")
         })
     }
     window.JEEFACEFILTERAPI = function() {
         var b, d, e, k, l, m, n, q, t, h, u, v, C, H;

         function E() {
             return -1 !== [U.play, U.pause].indexOf(aa)
         }

         function O(g) {
             if (aa !== U.pause) {
                 var p = aa === U.play ? J.ra : r.dc;
                 x = setTimeout(A.bind(null, g), p)
             }
         }

         function S() {
             if (aa === U.play) return !1;
             aa = U.play;
             G.timestamp = Date.now();
             Q && window.cancelAnimationFrame(Q);
             A(0)
         }

         function M(g, p, z, V, R) {
             g = 4 * (3 * p + g) + z;
             return V + (Ca[g] / 255 + Ca[g + 12] / 65025) * (R - V)
         }

         function f() {
             I.S();
             N.reset();
             Z.reset();
             w.pa();
             w.nb();
             a.disable(a.DEPTH_TEST);
             a.disable(a.BLEND);
             N.fa();
             w.ma()
         }

         function A() {
             if (aa !== U.pause) {
                 w.nb();
                 N.reset();
                 N.fa();
                 a.disable(a.DEPTH_TEST);
                 I.S();
                 w.ma();
                 if (!y.Va) {
                     var g = y.element.currentTime - y.Ba;
                     0 > g && (y.Ba = y.element.currentTime);
                     1E3 * g < r.jd || (y.na.refresh(), y.Ba += g, w.set("s49"), y.oa.C(), y.na.b(0), N.g(!1, !1))
                 }
                 if (D.K.length > G.G) D.K.splice(0, D.K.length - G.G);
                 else
                     for (; D.K.length < G.G;) D.K.push(0);
                 if (1 !== D.i)
                     if (sa.every(c)) {
                         for (var p = 0, z = g = 0; z < sa.length; ++z) sa[z].detected > p && (p = sa[z].detected, g = 0);
                         for (p = 0; p < G.G; ++p) D.K[p] = g
                     } else {
                         p = 0;
                         g = !1;
                         for (z = D.Eb; p < G.G; ++p) {
                             if (c(sa[z]))
                                 if (g) {
                                     do ++z ===
                                         D.i && (z = 0); while (c(sa[z]))
                                 } else g = !0;
                             D.K[p] = z++;
                             z >= D.i && (z = 0)
                         }
                         D.Eb = z
                     } for (g = 0; g < G.G; ++g) D.T = D.K[g], D.Ya = (.5 + D.T) / D.i, D.Bb = D.K.lastIndexOf(D.T) === g, w.set("s50"), J.$ && w.v("u38", sa[D.T].rz), 1 !== D.i && w.v("u37", D.Ya), ya.C(), y.oa.b(0), Ba.b(1), N.g(!1, !1), ya.b(0), za.F(!1, ya);
                 g = Date.now();
                 G.ha = g - G.timestamp;
                 G.timestamp = g; - 1 !== W.nDetectsPerLoop ? G.G = W.nDetectsPerLoop : (g = r.Ga, G.Jb = G.Ib / G.ha, G.Kb = G.Jb * g + G.Kb * (1 - g), G.Lb = 1E3 / G.ha, G.ba = G.Lb * r.Ga + G.ba * (1 - r.Ga), G.ba > r.Z[1] ? (g = r.qa[1], 1 < D.i && (++g, p = sa.filter(F).length,
                     g *= Math.max(1, p)), G.G = Math.min(G.G + 1, g), G.ba = (r.Z[0] + r.Z[1]) / 2) : G.ba < r.Z[0] && (G.G = Math.max(G.G - 1, r.qa[0]), G.ba = (r.Z[0] + r.Z[1]) / 2));
                 I.J();
                 a.viewport(0, 0, 3, 2 * D.i);
                 w.set("s48");
                 Ba.b(0);
                 N.g(!1, !1);
                 a.readPixels(0, 0, 3, 2 * D.i, a.RGBA, a.UNSIGNED_BYTE, Ca);
                 for (g = 0; g < D.i; ++g)
                     if (-1 !== D.K.indexOf(g)) {
                         var V = g;
                         p = Y[V];
                         var R = [V];
                         z = sa[V];
                         var na = qa[V],
                             ta = 2 * V;
                         p.ua = M(1, ta, 3, 0, 1);
                         z.detected = oa(z.detected, p.ua, r.ac);
                         if (p.ua < r.Xa) J.$ && (z.rz = 0);
                         else {
                             p.x = M(0, ta, 1, -1, 1);
                             p.y = M(0, ta, 2, -1, 1);
                             p.M = M(0, ta, 3, 0, 1);
                             p.Za = M(1, ta, 0, -ha[0],
                                 ha[0]);
                             p.$a = M(1, ta, 1, -ha[1], ha[1]);
                             p.ka = M(1, ta, 2, -ha[2], ha[2]);
                             for (var Ha = 0; Ha < r.Aa; ++Ha) p.pb[Ha] = r.vc[Ha](M(2, ta, Ha, 0, 1));
                             R.Oa = p.x - z.x;
                             R.Pa = p.y - z.y;
                             R.Na = p.M - z.s;
                             R.Ka = p.Za - z.rx;
                             R.La = p.$a - z.ry;
                             R.Ma = J.$ ? p.ka : p.ka - z.rz;
                             ta = Math.sqrt(R.Oa * R.Oa + R.Pa * R.Pa + R.Na * R.Na) / G.ha;
                             R = Math.sqrt(R.Ka * R.Ka + R.La * R.La + R.Ma * R.Ma) / G.ha;
                             ta = 1 - Da(ba.translationFactorRange[0], ba.translationFactorRange[1], ta);
                             R = 1 - Da(ba.rotationFactorRange[0], ba.rotationFactorRange[1], R);
                             R = ta * R * Da(ba.qualityFactorRange[0], ba.qualityFactorRange[1],
                                 p.ua);
                             V = na[++Ta[V] % na.length] = R;
                             for (ta = 0; ta < na.length; ++ta) V = Math.min(V, na[ta]);
                             V = Math.max(.5, V);
                             R = Math.min(V, R);
                             na = oa(ba.alphaRange[1], ba.alphaRange[0], Math.pow(R, r.cc));
                             z.x = oa(z.x, p.x, na);
                             z.y = oa(z.y, p.y, na);
                             z.s = oa(z.s, p.M, na);
                             z.rx = oa(z.rx, p.Za, na);
                             z.ry = oa(z.ry, p.$a, na);
                             z.rz = J.$ ? z.rz + na * p.ka : oa(z.rz, p.ka, na);
                             na = Math.max(na, r.bc);
                             for (V = 0; V < r.Aa; ++V) z.expressions[V] = oa(z.expressions[V], p.pb[V], na);
                             ++p.za
                         }
                     } I.gd();
                 I.reset();
                 Z.reset();
                 a.enable(a.DEPTH_TEST);
                 J.ta && (1 === D.i ? J.ta(sa[0]) : J.ta(sa));
                 a.disable(a.BLEND);
                 aa === U.play && (Q = window.requestAnimationFrame(O))
             }
         }

         function B() {
             function g(z) {
                 for (var V = [], R = 0; R < D.i; ++R) V.push(Object.assign({}, z));
                 return V
             }
             y.oa = Z.a({
                 isPot: !1,
                 isLinear: !0,
                 isFloat: !1,
                 width: ca,
                 height: pa
             });
             ya = Z.a({
                 isPot: !0,
                 isFloat: !1,
                 width: za.rb()
             });
             var p = {
                 width: 3,
                 height: D.i,
                 isFloat: !0,
                 isPot: !1,
                 array: function(z) {
                     for (var V = new Float32Array(z.length * D.i), R = 0, na; R < D.i; ++R)
                         for (na = 0; na < z.length; ++na) V[R * z.length + na] = z[na];
                     return V
                 }(new Float32Array([0, W.borderWidth, W.borderHeight, 0, 0, 0, 0, 0, 0, 0, 0, 0]))
             };
             Ba =
                 Na.a(p);
             Ca = new Uint8Array(8 * p.width * D.i);
             Y = g({
                 ua: 0,
                 x: 0,
                 y: 0,
                 M: 1,
                 Za: 0,
                 $a: 0,
                 ka: 0,
                 pb: new Float32Array(r.Aa),
                 za: 0
             });
             sa = g({
                 detected: 0,
                 x: 0,
                 y: 0,
                 s: 1,
                 rx: 0,
                 ry: 0,
                 rz: 0,
                 expressions: new Float32Array(r.Aa)
             });
             g({
                 Oa: 0,
                 Pa: 0,
                 Na: 0,
                 Ka: 0,
                 La: 0,
                 Ma: 0
             })
         }

         function ea() {
             w.H("s50", [{
                 type: "1i",
                 name: "u1",
                 value: 0
             }, {
                 type: "1i",
                 name: "u35",
                 value: 1
             }, {
                 type: "2f",
                 name: "u36",
                 value: wa
             }, {
                 type: "1f",
                 name: "u37",
                 value: .5
             }, {
                 type: "1f",
                 name: "u38",
                 value: 0
             }]);
             w.H("s51", [{
                 type: "1i",
                 name: "u39",
                 value: 0
             }, {
                 type: "1i",
                 name: "u35",
                 value: 1
             }, {
                 type: "1f",
                 name: "u42",
                 value: r.fd
             }, {
                 type: "1f",
                 name: "u43",
                 value: r.Yb
             }, {
                 type: "1f",
                 name: "u44",
                 value: r.Xb
             }, {
                 type: "3f",
                 name: "u41",
                 value: [r.bb[0] * wa[0], r.bb[1] * wa[1], r.bb[2]]
             }, {
                 type: "1f",
                 name: "u37",
                 value: .5
             }, {
                 type: "1f",
                 name: "u45",
                 value: 1
             }, {
                 type: "1f",
                 name: "u38",
                 value: 0
             }]);
             var g = [{
                 type: "1i",
                 name: "u39",
                 value: 0
             }];
             w.H("s52", g);
             w.H("s53", g);
             w.H("s48", [{
                 type: "1i",
                 name: "u35",
                 value: 0
             }, {
                 type: "1f",
                 name: "u48",
                 value: wa[0]
             }, {
                 type: "2f",
                 name: "u47",
                 value: [0, .5 / D.i]
             }])
         }

         function xa() {
             var g = za.rb(),
                 p = ca / g;
             m = W.minScale * p;
             n = W.maxScale * p;
             q = (1 - 2 * W.borderWidth) /
                 W.nStepsX;
             t = (1 - 2 * W.borderHeight) / W.nStepsY;
             h = (n - m) / W.nStepsScale;
             u = W.borderWidth;
             v = W.borderHeight;
             C = 1 - W.borderWidth;
             H = 1 - W.borderHeight;
             wa = [g / ca, g / pa];
             b = W.borderWidth;
             d = W.borderHeight;
             e = m;
             k = W.borderWidth;
             l = W.borderHeight;
             la = m
         }

         function Ea(g) {
             if (J.ca) ua("string" === typeof J.ca ? JSON.parse(J.ca) : J.ca, g);
             else {
                 var p = J.eb;
                 "JSON" !== p.toUpperCase().split(".").pop() && (p += r.save);
                 Aa(p, function(z) {
                     z = JSON.parse(z);
                     ua(z, g)
                 })
             }
         }

         function ua(g, p) {
             g.exportData && g.exportData.thetaXYZfactor && (ha = g.exportData.thetaXYZfactor);
             p(g)
         }

         function da() {
             if (Ma.m({
                     Ja: J.N,
                     width: ca,
                     height: pa,
                     debug: !1,
                     Oc: function() {
                         X("GLCONTEXT_LOST")
                     },
                     antialias: !0,
                     premultipliedAlpha: !0
                 })) {
                 if (Ma.Fc()) return !0;
                 X("GL_INCOMPATIBLE");
                 return !1
             }
             X("GL_INCOMPATIBLE");
             return !1
         }

         function c(g) {
             return g.detected < r.Xa
         }

         function F(g) {
             return g.detected > r.Xa
         }

         function L(g, p, z, V) {
             return z > g ? Math.max(0, g + p / 2 - (z - V / 2)) : Math.max(0, z + V / 2 - (g - p / 2))
         }

         function T() {
             return Y.some(function(g, p) {
                 if (p === D.T) return !1;
                 p = Y[D.T];
                 if (p.za > g.za || 3 > g.za || L(p.x / 2, p.M, g.x / 2, g.M) < r.Gb * p.M) return !1;
                 var z = ca / pa;
                 return L(p.y / 2, p.M * z, g.y / 2, g.M * z) > r.Gb * p.M * z
             })
         }

         function ia() {
             var g = D.T;
             Ba.Yc(1);
             1 !== D.i && (a.viewport(0, 0, 3, D.i), w.set("s0"), w.Sb("u1", 1), N.g(!1, !1), w.Sb("u1", 0));
             a.viewport(0, g, 1, 1);
             w.set("s51");
             J.$ && w.v("u38", sa[g].rz);
             1 !== D.i && w.v("u37", D.Ya);
             if (1 < D.i) {
                 var p = T() ? 0 : 1;
                 w.v("u45", p)
             }
             w.$c("u40", k, l, la);
             N.g(!1, !1);
             D.Bb && (a.viewport(1, g, 1, 1), w.set("s52"), N.g(!1, !1), a.viewport(2, g, 1, 1), w.set("s53"), N.g(!1, !1));
             e += h;
             e > n && (b += q, e = m, b > C && (b = u, d += t, d > H && (d = v)));
             k = b + .8 * (Math.random() - .5) * q;
             l = d + .8 *
                 (Math.random() - .5) * t;
             la = e + .8 * (Math.random() - .5) * h
         }

         function fa() {
             y.na = Z.a({
                 D: y.element,
                 isPot: !1,
                 isFloat: !1,
                 isFlipY: !0
             })
         }

         function ma() {
             w.H("s49", [{
                 type: "1i",
                 name: "u1",
                 value: 0
             }, {
                 type: "mat2",
                 name: "u34",
                 value: y.o
             }])
         }

         function ra() {
             y.B[0] = .5;
             y.B[1] = .5;
             var g = y.O[1] / y.O[0],
                 p = Ma.L() / Ma.A();
             90 === Math.abs(P.rotate) && (g = 1 / g);
             g > p ? y.B[1] *= p / g : y.B[0] *= g / p;
             w.H("s51", [{
                 name: "u46",
                 type: "1f",
                 value: p
             }]);
             y.o[0] = 0;
             y.o[1] = 0;
             y.o[2] = 0;
             y.o[3] = 0;
             switch (P.rotate) {
                 case 0:
                     y.o[0] = y.B[0];
                     y.o[3] = y.B[1];
                     break;
                 case 180:
                     y.o[0] = -y.B[0];
                     y.o[3] = -y.B[1];
                     break;
                 case 90:
                     y.o[1] = y.B[0];
                     y.o[2] = -y.B[1];
                     break;
                 case -90:
                     y.o[1] = -y.B[0], y.o[2] = y.B[1]
             }
             P.flipX && (y.o[0] *= -1, y.o[2] *= -1)
         }

         function ka() {
             var g = y.element.videoWidth,
                 p = y.element.videoHeight,
                 z = y.O[0] !== g || y.O[1] !== p;
             z && (y.O[0] = g, y.O[1] = p);
             return z
         }

         function ja(g, p) {
             if (aa === U.error) return !1;
             y.element = g;
             ka();
             p && p();
             return !0
         }

         function va(g, p, z) {
             g && g();
             y.Ia = {
                 video: {
                     facingMode: {
                         ideal: P.facingMode
                     },
                     width: {
                         min: P.minWidth,
                         max: P.maxWidth,
                         ideal: P.idealWidth
                     },
                     height: {
                         min: P.minHeight,
                         max: P.maxHeight,
                         ideal: P.idealHeight
                     }
                 },
                 audio: !1
             };
             P.deviceId && (constraints.deviceId = P.deviceId);
             lb(eb() ? document.createElement("video") : !1, function(V) {
                 p && p(V);
                 z(V)
             }, function() {
                 X("WEBCAM_UNAVAILABLE")
             }, y.Ia)
         }

         function X(g) {
             aa !== U.error && (aa = U.error, J.ga_ && J.ga_(g))
         }

         function K(g, p) {
             for (var z in g) "undefined" !== typeof p[z] && (g[z] = p[z]);
             p === W && W.nDetectsPerLoop && (G.G = W.nDetectsPerLoop, G.Ib = W.nDetectsPerLoop)
         }
         var r = {
                 save: "NNC.json",
                 hb: 0,
                 dc: 25,
                 Ga: .2,
                 Z: [45, 55],
                 ld: 1 / 3.5,
                 qa: [2, 7],
                 Sc: {
                     minScale: .15,
                     maxScale: .6,
                     borderWidth: .2,
                     borderHeight: .2,
                     nStepsX: 6,
                     nStepsY: 5,
                     nStepsScale: 3,
                     nDetectsPerLoop: -1
                 },
                 bb: [.092, .092, .3],
                 fd: 50,
                 Gb: .12,
                 Xa: .6,
                 Lc: 8,
                 Yb: .75,
                 Xb: 1,
                 dd: {
                     translationFactorRange: [.0015, .005],
                     rotationFactorRange: [.003, .02],
                     qualityFactorRange: [.9, .98],
                     alphaRange: [.05, 1]
                 },
                 ed: [.65, 1, .262],
                 ac: .2,
                 cc: 2,
                 bc: .1,
                 Mc: 8,
                 Aa: 1,
                 vc: [Da.bind(null, .3, .75)],
                 jd: 20
             },
             P = {
                 facingMode: "user",
                 idealWidth: 800,
                 idealHeight: 600,
                 minWidth: 480,
                 maxWidth: 1280,
                 minHeight: 480,
                 maxHeight: 1280,
                 rotate: 0,
                 flipX: !1
             },
             U = {
                 Ic: -1,
                 error: -2,
                 vb: 0,
                 play: 1,
                 pause: 2
             },
             aa = U.vb,
             y = {
                 Va: !1,
                 element: !1,
                 na: !1,
                 oa: !1,
                 O: [0, 0],
                 B: [.5, .5],
                 o: [.5, 0, 0, .5],
                 Ba: 0,
                 Ia: null
             },
             J = {
                 ga_: !1,
                 ta: !1,
                 eb: "./",
                 ca: !1,
                 N: !1,
                 ra: r.hb,
                 Ob: r.hb,
                 ya: !1,
                 $: !1
             },
             za, W = Object.create(r.Sc),
             ba = Object.create(r.dd);
         var la = e = l = k = d = b = n = m = H = C = v = u = h = t = q = 0;
         var ca, pa, wa, ya, Ba, Ca, Y, sa, x = !1,
             Q = !1,
             ha = r.ed,
             D = {
                 i: 1,
                 T: 0,
                 K: [0],
                 Bb: !1,
                 Eb: 0,
                 Ya: 0
             },
             G = {
                 ha: 0,
                 timestamp: 0,
                 Jb: 0,
                 Kb: 0,
                 G: r.qa[0],
                 Ib: r.qa[0],
                 Lb: 0,
                 ba: 0,
                 rd: 1
             },
             qa = [],
             Ta = [];
         return {
             init: function(g) {
                 function p() {
                     aa !== U.error && 2 === ++V && (ra(), fa(), ma(), J.ga_ && (J.ga_(!1, {
                         GL: a,
                         canvasElement: J.N,
                         videoTexture: y.oa.get(),
                         maxFacesDetected: D.i,
                         videoElement: y.element
                     }), f()), S())
                 }
                 if (aa !== U.vb) return g.callbackReady && g.callbackReady("ALREADY_INITIALIZED"), !1;
                 aa = U.Ic;
                 g.callbackReady && (J.ga_ = g.callbackReady);
                 g.callbackTrack && (J.ta = g.callbackTrack);
                 "undefined" !== typeof g.animateDelay && (J.ra = g.animateDelay);
                 "undefined" !== typeof g.NNCpath && (J.eb = g.NNCpath);
                 "undefined" !== typeof g.NNC && (J.ca = g.NNC);
                 "undefined" !== typeof g.maxFacesDetected && (D.i = Math.max(1, g.maxFacesDetected));
                 "undefined" !== typeof g.followZRot && (J.$ = g.followZRot ?
                     !0 : !1);
                 if (D.i > r.Lc) return X("MAXFACES_TOOHIGH"), !1;
                 if (!g.canvasId && !g.canvas) return X("NO_CANVASID"), !1;
                 J.N = g.canvas ? g.canvas : document.getElementById(g.canvasId);
                 if (!J.N) return X("INVALID_CANVASID"), !1;
                 ca = J.N.width;
                 pa = J.N.height;
                 if (!ca || !pa) return X("INVALID_CANVASDIMENSIONS"), !1;
                 for (var z = 0; z < D.i; ++z) qa.push(new Float32Array(r.Mc)), Ta.push(0);
                 g.scanSettings && K(W, g.scanSettings);
                 g.stabilizationSettings && K(ba, g.stabilizationSettings);
                 var V = 0;
                 g.videoSettings && g.videoSettings.videoElement ? ja(g.videoSettings.videoElement,
                     p) : (g.videoSettings && K(P, g.videoSettings), va(g.onWebcamAsk, g.onWebcamGet, function(R) {
                     ja(R, p)
                 }));
                 Ea(function(R) {
                     if (!da()) return !1;
                     za = new $a;
                     za.Uc(R.layers);
                     za.Wc({
                         Mb: "gpuRawAvg",
                         Pc: ia
                     });
                     w.$b([{
                         id: "s49",
                         name: "_",
                         Y: "attribute vec2 a0;uniform mat2 u34;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=vec2(.5,.5)+u34*a0;}",
                         sa: ["a0"],
                         da: [2],
                         c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                         f: ["u1", "u34"],
                         precision: "lowp"
                     }, {
                         id: "s50",
                         name: "_",
                         c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                         Y: "attribute vec2 a0;uniform sampler2D u35;uniform vec2 u36;uniform float u37,u38;varying vec2 vv0;void main(){vec4 a=texture2D(u35,vec2(.17,u37));vec2 d=a.gb,e=a.a*u36;float b=cos(u38),c=sin(u38);vec2 g=mat2(b,c,-c,b)*a0;vv0=d+g*.5*e,gl_Position=vec4(a0,0.,1.);}",
                         sa: ["a0"],
                         da: [2],
                         f: ["u1", "u35", "u36", "u37", "u38"],
                         precision: "lowp"
                     }, {
                         id: "s51",
                         name: "_",
                         c: "uniform sampler2D u39,u35;uniform vec3 u40,u41;uniform float u42,u43,u44,u37,u45,u38,u46;const vec4 n=vec4(1.,1.,1.,1.),o=vec4(0.,0.,0.,0.),e=vec4(.25,.25,.25,.25);void main(){vec4 g=texture2D(u39,vec2(.625,.625)),h=texture2D(u39,vec2(.875,.625)),a=texture2D(u35,vec2(.17,u37));float b=dot(g,e),i=dot(h,e);bool j=b>u43&&b>i+u44;j?a.r=2.:a.r>u42?a.r=0.:a.r>1.9?a.r+=1.:0.,a.r*=u45;if(a.r<.9)a=vec4(1.,u40);else{a.r*=step(1.9,a.r);float k=dot(e,texture2D(u39,vec2(.875,.875))),l=dot(e,texture2D(u39,vec2(.125,.625))),m=dot(e,texture2D(u39,vec2(.375,.625))),c=cos(u38),d=sin(u38);vec2 f=mat2(c,d*u46,-d/u46,c)*vec2(k,l);a.gba+=vec3(f,m)*u41*a.a;}gl_FragColor=a;}",
                         Y: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                         f: "u39 u35 u40 u42 u41 u45 u38 u46 u43 u44 u37".split(" ")
                     }, {
                         id: "s52",
                         name: "_",
                         Y: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                         c: "uniform sampler2D u39;const vec4 e=vec4(.25,.25,.25,.25);const vec3 g=vec3(.5,.5,.5);void main(){float a=dot(e,texture2D(u39,vec2(.125,.875))),b=dot(e,texture2D(u39,vec2(.375,.875))),c=dot(e,texture2D(u39,vec2(.625,.875))),d=dot(e,texture2D(u39,vec2(.625,.625)));vec3 f=vec3(a,b,c)*.5+g;gl_FragColor=vec4(f,d);}",
                         f: ["u39"]
                     }, {
                         id: "s53",
                         name: "_",
                         Y: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                         c: "uniform sampler2D u39;const vec4 e=vec4(.25,.25,.25,.25);void main(){float a=dot(e,texture2D(u39,vec2(.25,.25)));gl_FragColor=vec4(a,0.,0.,0.);}",
                         f: ["u39"]
                     }, {
                         id: "s48",
                         name: "_",
                         c: "uniform sampler2D u35;uniform vec2 u47;uniform float u48;varying vec2 vv0;void main(){float g=step(.5,mod(gl_FragCoord.y+1.5,2.)),c=step(.33,vv0.x);vec4 a=texture2D(u35,vv0+u47);a.a=mix(a.a*u48,a.a,c);vec4 d=floor(255.*a),f=255.*(255.*a-d),b=mix(d,f,g)/255.;b.x=mix(step(a.x,1.5),b.x,c),gl_FragColor=b;}",
                         f: ["u35", "u48", "u47"]
                     }]);
                     B();
                     xa();
                     ea();
                     p()
                 });
                 return !0
             },
             toggle_pause: function(g, p) {
                 if (E()) return p = p ? kb(y.element, !g, y.Ia) : Promise.resolve(), g ? aa === U.play && (x && (clearTimeout(x), x = !1), Q && (window.cancelAnimationFrame(Q), Q = !1), aa = U.pause) : S(), p
             },
             toggle_slow: function(g) {
                 E() && aa === U.play && (g && !J.ya ? (J.Ob = J.ra, W.nDetectsPerLoop = 1, this.set_animateDelay(100), J.ya = !0) : !g && J.ya && (W.nDetectsPerLoop = -1, this.set_animateDelay(J.Ob), J.ya = !1))
             },
             set_animateDelay: function(g) {
                 J.ra = g
             },
             resize: function() {
                 var g = J.N.width,
                     p = J.N.height;
                 if (!ka() && g === ca && p === pa) return !1;
                 ca = g;
                 pa = p;
                 xa();
                 ea();
                 ra();
                 ma();
                 return !0
             },
             set_inputTexture: function(g, p, z) {
                 y.O[0] = p;
                 y.O[1] = z;
                 y.Va = !0;
                 ra();
                 f();
                 ma();
                 w.set("s49");
                 y.oa.C();
                 a.activeTexture(a.TEXTURE0);
                 a.bindTexture(a.TEXTURE_2D, g);
                 N.g(!0, !0)
             },
             reset_inputTexture: function() {
                 ka();
                 y.Va = !1;
                 ra();
                 ma()
             },
             get_videoDevices: function(g) {
                 return nb(g)
             },
             set_scanSettings: function(g) {
                 K(W, g);
                 xa();
                 ea()
             },
             set_stabilizationSettings: function(g) {
                 K(ba, g)
             },
             set_videoOrientation: function(g, p) {
                 E() && (P.flipX = p, P.rotate =
                     g, ra(), ma())
             },
             update_videoElement: function(g, p) {
                 ja(g, function() {
                     fa();
                     ra();
                     p && p()
                 })
             }
         }
     }();;
     return JEEFACEFILTERAPI;
 })();