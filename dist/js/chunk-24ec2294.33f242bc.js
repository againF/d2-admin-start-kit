(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-24ec2294"],{"48aa":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"panel-search",attrs:{flex:"dir:top"}},[s("div",{staticClass:"panel-search__input-group",attrs:{"flex-box":"0",flex:"dir:top main:center cross:center"},on:{click:function(e){return e.target!==e.currentTarget?null:t.handlePanelClick.apply(null,arguments)}}},[s("d2-icon-svg",{staticClass:"panel-search__logo",attrs:{name:"d2-admin-text"}}),s("el-autocomplete",{ref:"input",staticClass:"panel-search__input",attrs:{"suffix-icon":"el-icon-search",placeholder:"搜索页面","fetch-suggestions":t.querySearch,"trigger-on-focus":!1,clearable:!0},on:{select:t.handleSelect},nativeOn:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])?null:t.handleEsc.apply(null,arguments)}},scopedSlots:t._u([{key:"default",fn:function(t){var e=t.item;return s("d2-panel-search-item",{attrs:{item:e}})}}]),model:{value:t.searchText,callback:function(e){t.searchText=e},expression:"searchText"}}),s("div",{staticClass:"panel-search__tip"},[t._v(" 您可以使用快捷键 "),s("span",{staticClass:"panel-search__key"},[t._v(t._s(t.hotkey.open))]),t._v(" 唤醒搜索面板，按 "),s("span",{staticClass:"panel-search__key"},[t._v(t._s(t.hotkey.close))]),t._v(" 关闭 ")])],1),t.resultsList.length>0?s("div",{staticClass:"panel-search__results-group",attrs:{"flex-box":"1"}},[s("el-card",{attrs:{shadow:"never"}},[s("div",{staticClass:"panel-search__results-group-inner"},t._l(t.resultsList,(function(e,n){return s("d2-panel-search-item",{key:n,attrs:{item:e,"hover-mode":!0},nativeOn:{click:function(s){return t.handleResultsGroupItemClick(e.path)}}})})),1)])],1):t._e()])},i=[],r=s("ed3b"),c=s("fd6a");s("e186"),s("1576"),s("f56c"),s("a64e"),s("5408"),s("bb4d"),s("b7dd");const a=1/0,h=t=>Array.isArray?Array.isArray(t):"[object Array]"===Object.prototype.toString.call(t),o=t=>{if("string"==typeof t)return t;let e=t+"";return"0"==e&&1/t==-a?"-0":e},l=t=>null==t?"":o(t),u=t=>"string"===typeof t,d=t=>"number"===typeof t,f=t=>void 0!==t&&null!==t,p=t=>!t.trim().length;function g(t,e){let s=[],n=!1;const i=(t,e)=>{if(e){const r=e.indexOf(".");let c=e,a=null;-1!==r&&(c=e.slice(0,r),a=e.slice(r+1));const o=t[c];if(f(o))if(a||!u(o)&&!d(o))if(h(o)){n=!0;for(let t=0,e=o.length;t<e;t+=1)i(o[t],a)}else a&&i(o,a);else s.push(l(o))}else s.push(t)};return i(t,e),n?s:s[0]}const m={includeMatches:!1,findAllMatches:!1,minMatchCharLength:1},x={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(t,e)=>t.score===e.score?t.idx<e.idx?-1:1:t.score<e.score?-1:1},y={location:0,threshold:.6,distance:100},M={useExtendedSearch:!1,getFn:g};var k={...x,...m,...y,...M};function _(t,{errors:e=0,currentLocation:s=0,expectedLocation:n=0,distance:i=k.distance}={}){const r=e/t.length,c=Math.abs(n-s);return i?r+c/i:c?1:r}function v(t=[],e=k.minMatchCharLength){let s=[],n=-1,i=-1,r=0;for(let c=t.length;r<c;r+=1){let c=t[r];c&&-1===n?n=r:c||-1===n||(i=r-1,i-n+1>=e&&s.push([n,i]),n=-1)}return t[r-1]&&r-n>=e&&s.push([n,r-1]),s}const w=32;function S(t,e,s,{location:n=k.location,distance:i=k.distance,threshold:r=k.threshold,findAllMatches:c=k.findAllMatches,minMatchCharLength:a=k.minMatchCharLength,includeMatches:h=k.includeMatches}={}){if(e.length>w)throw new Error(`Pattern length exceeds max of ${w}.`);const o=e.length,l=t.length,u=Math.max(0,Math.min(n,l));let d=r,f=u;const p=[];if(h)for(let k=0;k<l;k+=1)p[k]=0;let g;while((g=t.indexOf(e,f))>-1){let t=_(e,{currentLocation:g,expectedLocation:u,distance:i});if(d=Math.min(t,d),f=g+o,h){let t=0;while(t<o)p[g+t]=1,t+=1}}f=-1;let m=[],x=1,y=o+l;const M=1<<(o<=w-1?o-1:w-2);for(let k=0;k<o;k+=1){let n=0,r=y;while(n<r){const t=_(e,{errors:k,currentLocation:u+r,expectedLocation:u,distance:i});t<=d?n=r:y=r,r=Math.floor((y-n)/2+n)}y=r;let a=Math.max(1,u-r+1),g=c?l:Math.min(u+r,l)+o,v=Array(g+2);v[g+1]=(1<<k)-1;for(let c=g;c>=a;c-=1){let n=c-1,r=s[t.charAt(n)];if(r&&h&&(p[n]=1),v[c]=(v[c+1]<<1|1)&r,0!==k&&(v[c]|=(m[c+1]|m[c])<<1|1|m[c+1]),v[c]&M&&(x=_(e,{errors:k,currentLocation:n,expectedLocation:u,distance:i}),x<=d)){if(d=x,f=n,f<=u)break;a=Math.max(1,2*u-f)}}const w=_(e,{errors:k+1,currentLocation:u,expectedLocation:u,distance:i});if(w>d)break;m=v}let S={isMatch:f>=0,score:x||.001};return h&&(S.matchedIndices=v(p,a)),S}function C(t){let e={},s=t.length;for(let n=0;n<s;n+=1)e[t.charAt(n)]=0;for(let n=0;n<s;n+=1)e[t.charAt(n)]|=1<<s-n-1;return e}class b{constructor(t,{location:e=k.location,threshold:s=k.threshold,distance:n=k.distance,includeMatches:i=k.includeMatches,findAllMatches:r=k.findAllMatches,minMatchCharLength:c=k.minMatchCharLength,isCaseSensitive:a=k.isCaseSensitive}={}){this.options={location:e,threshold:s,distance:n,includeMatches:i,findAllMatches:r,minMatchCharLength:c,isCaseSensitive:a},this.pattern=a?t:t.toLowerCase(),this.chunks=[];let h=0;while(h<this.pattern.length){let t=this.pattern.substring(h,h+w);this.chunks.push({pattern:t,alphabet:C(t)}),h+=w}}searchIn(t){let e=t.$;return this.searchInString(e)}searchInString(t){const{isCaseSensitive:e,includeMatches:s}=this.options;if(e||(t=t.toLowerCase()),this.pattern===t){let e={isMatch:!0,score:0};return s&&(e.matchedIndices=[[0,t.length-1]]),e}const{location:n,distance:i,threshold:r,findAllMatches:c,minMatchCharLength:a}=this.options;let h=[],o=0,l=!1;for(let d=0,f=this.chunks.length;d<f;d+=1){let{pattern:e,alphabet:u}=this.chunks[d],f=S(t,e,u,{location:n+w*d,distance:i,threshold:r,findAllMatches:c,minMatchCharLength:a,includeMatches:s});const{isMatch:p,score:g,matchedIndices:m}=f;p&&(l=!0),o+=g,p&&m&&(h=[...h,...m])}let u={isMatch:l,score:l?o/this.chunks.length:1};return l&&s&&(u.matchedIndices=h),u}}class ${constructor(t){this.pattern=t}static isMultiMatch(t){return I(t,this.multiRegex)}static isSingleMatch(t){return I(t,this.singleRegex)}search(){}}function I(t,e){const s=t.match(e);return s?s[1]:null}class L extends ${constructor(t){super(t)}static get type(){return"exact"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(t){let e,s=0;const n=[],i=this.pattern.length;while((e=t.indexOf(this.pattern,s))>-1)s=e+i,n.push([e,s-1]);const r=!!n.length;return{isMatch:r,score:r?1:0,matchedIndices:n}}}class A extends ${constructor(t){super(t)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(t){const e=t.indexOf(this.pattern),s=-1===e;return{isMatch:s,score:s?0:1,matchedIndices:[0,t.length-1]}}}class O extends ${constructor(t){super(t)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(t){const e=t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,matchedIndices:[0,this.pattern.length-1]}}}class R extends ${constructor(t){super(t)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(t){const e=!t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,matchedIndices:[0,t.length-1]}}}class E extends ${constructor(t){super(t)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(t){const e=t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,matchedIndices:[t.length-this.pattern.length,t.length-1]}}}class j extends ${constructor(t){super(t)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(t){const e=!t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,matchedIndices:[0,t.length-1]}}}class T extends ${constructor(t,{location:e=k.location,threshold:s=k.threshold,distance:n=k.distance,includeMatches:i=k.includeMatches,findAllMatches:r=k.findAllMatches,minMatchCharLength:c=k.minMatchCharLength,isCaseSensitive:a=k.isCaseSensitive}={}){super(t),this._bitapSearch=new b(t,{location:e,threshold:s,distance:n,includeMatches:i,findAllMatches:r,minMatchCharLength:c,isCaseSensitive:a})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(t){return this._bitapSearch.searchInString(t)}}const N=[L,O,R,j,E,A,T],F=N.length,P=/ +(?=([^\"]*\"[^\"]*\")*[^\"]*$)/,q="|";function J(t,e={}){return t.split(q).map(t=>{let s=t.trim().split(P).filter(t=>t&&!!t.trim()),n=[];for(let i=0,r=s.length;i<r;i+=1){const t=s[i];let r=!1,c=-1;while(!r&&++c<F){const s=N[c];let i=s.isMultiMatch(t);i&&(n.push(new s(i,e)),r=!0)}if(!r){c=-1;while(++c<F){const s=N[c];let i=s.isSingleMatch(t);if(i){n.push(new s(i,e));break}}}}return n})}const W=new Set([T.type,L.type]);class z{constructor(t,{isCaseSensitive:e=k.isCaseSensitive,includeMatches:s=k.includeMatches,minMatchCharLength:n=k.minMatchCharLength,findAllMatches:i=k.findAllMatches,location:r=k.location,threshold:c=k.threshold,distance:a=k.distance}={}){this.query=null,this.options={isCaseSensitive:e,includeMatches:s,minMatchCharLength:n,findAllMatches:i,location:r,threshold:c,distance:a},this.pattern=e?t:t.toLowerCase(),this.query=J(this.pattern,this.options)}static condition(t,e){return e.useExtendedSearch}searchIn(t){const e=this.query;if(!e)return{isMatch:!1,score:1};let s=t.$;const{includeMatches:n,isCaseSensitive:i}=this.options;s=i?s:s.toLowerCase();let r=0,c=[],a=0;for(let h=0,o=e.length;h<o;h+=1){const t=e[h];c.length=0,r=0;for(let e=0,i=t.length;e<i;e+=1){const i=t[e],{isMatch:h,matchedIndices:o,score:l}=i.search(s);if(!h){a=0,r=0,c.length=0;break}if(r+=1,a+=l,n){const t=i.constructor.type;W.has(t)?c=[...c,...o]:c.push(o)}}if(r){let t={isMatch:!0,score:a/r};return n&&(t.matchedIndices=c),t}}return{isMatch:!1,score:1}}}const G=/[^ ]+/g;function K(t,e,{getFn:s=k.getFn}={}){let n=[];if(u(e[0]))for(let i=0,r=e.length;i<r;i+=1){const t=e[i];if(f(t)&&!p(t)){let e={$:t,idx:i,t:t.match(G).length};n.push(e)}}else{const i=t.length;for(let r=0,c=e.length;r<c;r+=1){let c=e[r],a={idx:r,$:{}};for(let e=0;e<i;e+=1){let n=t[e],i=s(c,n);if(f(i))if(h(i)){let t=[];const e=[{arrayIndex:-1,value:i}];while(e.length){const{arrayIndex:s,value:n}=e.pop();if(f(n))if(u(n)&&!p(n)){let e={$:n,idx:s,t:n.match(G).length};t.push(e)}else if(h(n))for(let t=0,i=n.length;t<i;t+=1)e.push({arrayIndex:t,value:n[t]})}a.$[n]=t}else if(!p(i)){let t={$:i,t:i.match(G).length};a.$[n]=t}}n.push(a)}}return n}class U{constructor(t){if(this._keys={},this._keyNames=[],this._length=t.length,t.length&&u(t[0]))for(let e=0;e<this._length;e+=1){const s=t[e];this._keys[s]={weight:1},this._keyNames.push(s)}else{let e=0;for(let s=0;s<this._length;s+=1){const n=t[s];if(!Object.prototype.hasOwnProperty.call(n,"name"))throw new Error('Missing "name" property in key object');const i=n.name;if(this._keyNames.push(i),!Object.prototype.hasOwnProperty.call(n,"weight"))throw new Error('Missing "weight" property in key object');const r=n.weight;if(r<=0||r>=1)throw new Error('"weight" property in key must be in the range of (0, 1)');this._keys[i]={weight:r},e+=r}for(let t=0;t<this._length;t+=1){const s=this._keyNames[t],n=this._keys[s].weight;this._keys[s].weight=n/e}}}get(t,e){return this._keys[t]?this._keys[t][e]:-1}keys(){return this._keyNames}count(){return this._length}toJSON(){return JSON.stringify(this._keys)}}function B(t,e){const s=t.matches;if(e.matches=[],f(s))for(let n=0,i=s.length;n<i;n+=1){let t=s[n];if(!f(t.indices)||0===t.indices.length)continue;let i={indices:t.indices,value:t.value};t.key&&(i.key=t.key),t.idx>-1&&(i.refIndex=t.idx),e.matches.push(i)}}function D(t,e){e.score=t.score}const H=[];function Q(...t){H.push(...t)}class V{constructor(t,e={},s=null){this.options={...k,...e},this._processKeys(this.options.keys),this.setCollection(t,s)}setCollection(t,e=null){this.list=t,this.listIsStringArray=u(t[0]),e?this.setIndex(e):this.setIndex(this._createIndex())}setIndex(t){this._indexedList=t}_processKeys(t){this._keyStore=new U(t)}_createIndex(){return K(this._keyStore.keys(),this.list,{getFn:this.options.getFn})}search(t,e={limit:!1}){if(t=t.trim(),!t.length)return[];const{shouldSort:s}=this.options;let n=null;for(let r=0,c=H.length;r<c;r+=1){let e=H[r];if(e.condition(t,this.options)){n=new e(t,this.options);break}}n||(n=new b(t,this.options));let i=this._searchUsing(n);return this._computeScore(i),s&&this._sort(i),e.limit&&d(e.limit)&&(i=i.slice(0,e.limit)),this._format(i)}_searchUsing(t){const e=this._indexedList,s=[],{includeMatches:n}=this.options;if(this.listIsStringArray)for(let i=0,r=e.length;i<r;i+=1){let r=e[i],{$:c,idx:a,t:h}=r;if(!f(c))continue;let o=t.searchIn(r);const{isMatch:l,score:u}=o;if(!l)continue;let d={score:u,value:c,t:h};n&&(d.indices=o.matchedIndices),s.push({item:c,idx:a,matches:[d]})}else{const i=this._keyStore.keys(),r=this._keyStore.count();for(let c=0,a=e.length;c<a;c+=1){let{$:a,idx:o}=e[c];if(!f(a))continue;let l=[];for(let e=0;e<r;e+=1){let s=i[e],r=a[s];if(f(r))if(h(r))for(let e=0,i=r.length;e<i;e+=1){let i=r[e];const{$:c,idx:a,t:h}=i;if(!f(c))continue;let o=t.searchIn(i);const{isMatch:u,score:d}=o;if(!u)continue;let p={score:d,key:s,value:c,idx:a,t:h};n&&(p.indices=o.matchedIndices),l.push(p)}else{const{$:e,t:i}=r;let c=t.searchIn(r);const{isMatch:a,score:h}=c;if(!a)continue;let o={score:h,key:s,value:e,t:i};n&&(o.indices=c.matchedIndices),l.push(o)}}l.length&&s.push({idx:o,item:a,matches:l})}}return s}_computeScore(t){const e=t.length;for(let s=0;s<e;s+=1){const e=t[s],n=e.matches,i=n.length;let r=1;for(let t=0;t<i;t+=1){const e=n[t],{key:s,t:i}=e,c=this._keyStore.get(s,"weight"),a=c>-1?c:1,h=0===e.score&&c>-1?Number.EPSILON:e.score,o=1/Math.sqrt(i);r*=Math.pow(h,a*o)}e.score=r}}_sort(t){t.sort(this.options.sortFn)}_format(t){const e=[],{includeMatches:s,includeScore:n}=this.options;let i=[];s&&i.push(B),n&&i.push(D);for(let r=0,c=t.length;r<c;r+=1){const s=t[r],{idx:n}=s,c={item:this.list[n],refIndex:n};if(i.length)for(let t=0,e=i.length;t<e;t+=1)i[t](s,c);e.push(c)}return e}}Q(z),V.version="5.2.3",V.createIndex=K,V.config=k;var X=V,Y=s("7736"),Z=s("b55f"),tt={mixins:[Z["a"]],components:{"d2-panel-search-item":function(){return s.e("chunk-1da4d84d").then(s.bind(null,"f1ee"))}},data:function(){return{searchText:"",results:[]}},computed:Object(c["a"])(Object(c["a"])({},Object(Y["e"])("d2admin/search",["hotkey","pool"])),{},{resultsList:function(){return 0===this.results.length&&""===this.searchText?this.pool.map((function(t){return Object(c["a"])({value:t.fullTitle},t)})):this.results},fuse:function(){return new X(this.pool,{shouldSort:!0,tokenize:!0,threshold:.6,location:0,distance:100,maxPatternLength:32,minMatchCharLength:1,keys:["fullTitle","path"]})}}),methods:{querySearch:function(t,e){var s=this.fuse.search(t).map((function(t){return t.item}));this.results=s,e(s)},focus:function(){var t=this;this.input="",setTimeout((function(){t.$refs.input&&t.$refs.input.focus(),t.searchText="",t.results=[]}),500)},handleResultsGroupItemClick:function(t){t!==this.$route.path?this.handleMenuSelect(t):this.handleEsc()},handleSelect:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function s(){var n;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(n=t.path,n!==e.$route.path){s.next=4;break}return e.handleEsc(),s.abrupt("return");case 4:return s.next=6,e.$nextTick();case 6:e.handleMenuSelect(n);case 7:case"end":return s.stop()}}),s)})))()},closeSuggestion:function(){this.$refs.input.activated&&(this.$refs.input.suggestions=[],this.$refs.input.activated=!1)},handlePanelClick:function(){this.handleEsc()},handleEsc:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.closeSuggestion(),e.next=3,t.$nextTick();case 3:t.$emit("close");case 4:case"end":return e.stop()}}),e)})))()}}},et=tt,st=(s("92d6"),s("cba8")),nt=Object(st["a"])(et,n,i,!1,null,"37377ffe",null);e["default"]=nt.exports},"92d6":function(t,e,s){"use strict";s("bda9")},bda9:function(t,e,s){}}]);