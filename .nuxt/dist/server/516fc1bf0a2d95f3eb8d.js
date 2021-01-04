exports.ids=[6],exports.modules={36:function(e,t,d){"use strict";d.r(t);var c=d(3),l=d.n(c);const v=e=>Array.apply(null,{length:e}).map((e,i)=>i+1);var r=async function(e,t){const d=l.a.create({headers:{Accept:"application/vnd.github.v3.star+json",Authorization:t?"token "+t:void 0}}),{sampleUrls:c,pageIndexes:r,firstPage:n}=await async function(e){const t=`https://api.github.com/repos/${e}/stargazers`,c=await d.get(t),link=c.headers.link,l=link?/next.*?page=(\d*).*?last/.exec(link)[1]:1,r=l<=15?v(l).slice(1,l):v(15).map(e=>Math.round(e/15*l)-1);return{firstPage:c,sampleUrls:r.map(e=>`${t}?page=${e}`),pageIndexes:r}}(e),o=[n].concat(c.map(e=>d.get(e))),h=await Promise.all(o);let _=null;if(r[r.length-1]>15)_=r.map((p,i)=>({date:h[i+1].data[0].starred_at.slice(0,10),starNum:30*((0===p?1:p)-1)}));else{const e=h.reduce((e,t)=>e.concat(t.data),[]),t=new Date(e[0].starred_at),d=Math.round(new Date-t)/864e5;_=Array.from(new Array(50)).map((e,i)=>{const c=new Date(t);return c.setDate(c.getDate()+Math.floor(d/50*(i+1))),c.toISOString().slice(0,10)},[]).map((t,i)=>{let d=0;const c=e.find((e,i)=>e.starred_at.slice(0,10)>=t&&(d=i+1,!0));return c&&{date:c.starred_at.slice(0,10),starNum:d}}).filter(e=>e)}const m=(await d.get("https://api.github.com/repos/"+e)).data.stargazers_count,f=(new Date).toISOString().slice(0,10);return _.push({date:f,starNum:m}),_},n={name:"ProjectOverview",props:{repo:{}},data:()=>({downloads:[],stars:[]}),methods:{cc(e){let t=100*this.score.detail[e].toFixed(2),d={},c={},l={transform:`rotate(${3.6*t}deg)`};return t<=50?c.display="none":(c.transform="rotate(180deg)",d.clip="rect(auto, auto, auto, auto)"),{r:c,l:l,c:d}},fetchDownload(){this.$axios.get("https://api.npmjs.org/downloads/range/last-month/"+this.repo.title).then(e=>{if(e){let data=e.data.downloads.map(e=>({label:e.day,count:e.downloads}));this.downloads=data.splice(15,30)}})},async fetchStar(){if(this.repo.meta.full_name){const e=await r(""+this.repo.meta.full_name,null).catch(e=>{});if(e){let t=e.map(e=>({label:e.date,count:e.starNum}));this.stars=t.splice(t.length-15,t.length)}}}},async created(){await this.fetchStar(),await this.fetchDownload()},computed:{data_meta(){return this.repo.meta.data_meta},data_npm(){return this.repo.meta.data_npm},data_github(){return this.repo.meta.data_github},score(){return this.repo.meta.score}}},o=d(1);var component=Object(o.a)(n,(function(){var e=this,t=e.$createElement,d=e._self._c||t;return d("div",[e._ssrNode((e.score?'<div class="widget" data-v-5e8e06ca><div class="widget_title tag" data-v-5e8e06ca>Rating</div> <div class="columns" data-v-5e8e06ca><div class="column" data-v-5e8e06ca><div class="card" data-v-5e8e06ca><div class="card-content" data-v-5e8e06ca><div class="level is-mobile" data-v-5e8e06ca><div class="level-left" data-v-5e8e06ca><h4 class="widget_title" data-v-5e8e06ca>Maintenance</h4></div> <div class="level-right" data-v-5e8e06ca><div class="set-size charts-container" data-v-5e8e06ca><div class="pie-wrapper style-2" data-v-5e8e06ca><span class="label" data-v-5e8e06ca>'+e._ssrEscape(e._s(100*e.score.detail.maintenance.toFixed(2)))+'<span class="smaller" data-v-5e8e06ca>%</span></span> <div class="pie"'+e._ssrStyle(null,e.cc("maintenance").c,null)+' data-v-5e8e06ca><div class="left-side half-circle"'+e._ssrStyle(null,e.cc("maintenance").l,null)+' data-v-5e8e06ca></div> <div class="right-side half-circle"'+e._ssrStyle(null,e.cc("maintenance").r,null)+' data-v-5e8e06ca></div></div> <div class="shadow" data-v-5e8e06ca></div></div></div></div></div></div></div></div> <div class="column" data-v-5e8e06ca><div class="card" data-v-5e8e06ca><div class="card-content" data-v-5e8e06ca><div class="level is-mobile" data-v-5e8e06ca><div class="level-left" data-v-5e8e06ca><h4 class="widget_title" data-v-5e8e06ca>Popularity</h4></div> <div class="level-right" data-v-5e8e06ca><div class="set-size charts-container" data-v-5e8e06ca><div class="pie-wrapper progress-45 style-2" data-v-5e8e06ca><span class="label" data-v-5e8e06ca>'+e._ssrEscape(e._s(100*e.score.detail.popularity.toFixed(2)))+'<span class="smaller" data-v-5e8e06ca>%</span></span> <div class="pie"'+e._ssrStyle(null,e.cc("popularity").c,null)+' data-v-5e8e06ca><div class="left-side half-circle"'+e._ssrStyle(null,e.cc("popularity").l,null)+' data-v-5e8e06ca></div> <div class="right-side half-circle"'+e._ssrStyle(null,e.cc("popularity").r,null)+' data-v-5e8e06ca></div></div> <div class="shadow" data-v-5e8e06ca></div></div></div></div></div></div></div></div> <div class="column" data-v-5e8e06ca><div class="card" data-v-5e8e06ca><div class="card-content" data-v-5e8e06ca><div class="level is-mobile" data-v-5e8e06ca><div class="level-left" data-v-5e8e06ca><h4 class="widget_title" data-v-5e8e06ca>Quality</h4></div> <div class="level-right" data-v-5e8e06ca><div class="set-size charts-container" data-v-5e8e06ca><div class="pie-wrapper progress-45 style-2" data-v-5e8e06ca><span class="label" data-v-5e8e06ca>'+e._ssrEscape(e._s(100*e.score.detail.quality.toFixed(2)))+'<span class="smaller" data-v-5e8e06ca>%</span></span> <div class="pie"'+e._ssrStyle(null,e.cc("quality").c,null)+' data-v-5e8e06ca><div class="left-side half-circle"'+e._ssrStyle(null,e.cc("quality").l,null)+' data-v-5e8e06ca></div> <div class="right-side half-circle"'+e._ssrStyle(null,e.cc("quality").r,null)+' data-v-5e8e06ca></div></div> <div class="shadow" data-v-5e8e06ca></div></div></div></div></div></div></div></div></div></div>':"\x3c!----\x3e")+" "),e._ssrNode('<div class="widget" data-v-5e8e06ca>',"</div>",[e._ssrNode('<div class="columns" data-v-5e8e06ca>',"</div>",[e._ssrNode('<div class="column is-8" data-v-5e8e06ca>',"</div>",[e._ssrNode('<h2 class="widget_title tag" data-v-5e8e06ca>Weekly Downloads</h2> '),d("chart",{attrs:{type:"line",label:e.repo.title,data:e.downloads}})],2),e._ssrNode(' <div class="column" data-v-5e8e06ca><div class="statistic" data-v-5e8e06ca><div class="widget_title tag" data-v-5e8e06ca>Information</div> <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" data-v-5e8e06ca><tbody data-v-5e8e06ca>'+(e.data_npm?"<tr data-v-5e8e06ca><th data-v-5e8e06ca>Downloads</th> <td data-v-5e8e06ca>"+e._ssrEscape(e._s(e.getSD(e.data_npm,"download")))+"</td></tr>":"\x3c!----\x3e")+" "+(e.data_npm?"<tr data-v-5e8e06ca><th data-v-5e8e06ca>Stars</th> <td data-v-5e8e06ca>"+e._ssrEscape(e._s(e.getSD(e.data_github,"star")))+"</td></tr>":"\x3c!----\x3e")+" "+(e.data_github&&e.data_github.issues?"<tr data-v-5e8e06ca><th data-v-5e8e06ca>Issues</th> <td data-v-5e8e06ca>"+e._ssrEscape(e._s(e.data_github.issues.count))+"</td></tr>":"\x3c!----\x3e")+" "+(e.data_meta?"<tr data-v-5e8e06ca><th data-v-5e8e06ca>Version</th> <td data-v-5e8e06ca>"+e._ssrEscape(e._s(e.data_meta.version))+"</td></tr>":"\x3c!----\x3e")+" "+(e.data_meta?"<tr data-v-5e8e06ca><th data-v-5e8e06ca>License</th> <td data-v-5e8e06ca>"+e._ssrEscape(e._s(e.data_meta.license))+"</td></tr>":"\x3c!----\x3e")+" "+(e.data_github?"<tr data-v-5e8e06ca><th data-v-5e8e06ca>Updated</th> <td data-v-5e8e06ca>"+e._ssrEscape(e._s(e.formatDate(e.data_github.updated_at)))+"</td></tr>":"\x3c!----\x3e")+" "+(e.data_github?"<tr data-v-5e8e06ca><th data-v-5e8e06ca>Created</th> <td data-v-5e8e06ca>"+e._ssrEscape(e._s(e.formatDate(e.data_github.created_at)))+"</td></tr>":"\x3c!----\x3e")+"</tbody></table></div></div>")],2)]),e._ssrNode(" "+(e.data_meta&&e.data_meta.dependencies?'<div class="widget" data-v-5e8e06ca><div class="widget_title tag" data-v-5e8e06ca>Dependencies</div> <div class="columns is-multiline" data-v-5e8e06ca>'+e._ssrList(e.data_meta.dependencies,(function(t,d){return'<div class="column is-4" data-v-5e8e06ca><div class="card" data-v-5e8e06ca><div class="card-content" data-v-5e8e06ca><div class="media" data-v-5e8e06ca><div class="media-content is-bold" data-v-5e8e06ca>'+e._ssrEscape(e._s(d))+'</div> <div class="media-right" data-v-5e8e06ca><div class="tag" data-v-5e8e06ca>'+e._ssrEscape(e._s(t))+"</div></div></div></div></div></div>"}))+"</div></div>":"\x3c!----\x3e"))],2)}),[],!1,(function(e){}),"5e8e06ca","7e385f1c");t.default=component.exports}};