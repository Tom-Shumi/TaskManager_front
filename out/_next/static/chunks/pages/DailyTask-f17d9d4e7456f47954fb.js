_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[13],{BQLc:function(e,t,a){e.exports={daily_task_list:"DailyTaskList_daily_task_list__KHyKm"}},P8ZN:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/DailyTask",function(){return a("wAn+")}])},ZPqy:function(e,t,a){e.exports={daily_task_item:"DailyTaskItem_daily_task_item__3bhXu",title:"DailyTaskItem_title__1Dk8U",done_time_textbox:"DailyTaskItem_done_time_textbox__2MEr_",done_time_button:"DailyTaskItem_done_time_button__31rSh",label:"DailyTaskItem_label__3AJy-",quota_label:"DailyTaskItem_quota_label__2-1uk",icon:"DailyTaskItem_icon__34bBV"}},vpEI:function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return s}));var i=function(e){if(null==e)return"0 m";var t=Math.floor(e/60),a=e%60,i="";return t<0?"0 m":(0!=t&&(i+="".concat(t," h")),0!=a&&(i=""==i?i:i+" ",i+="".concat(a," m")),""==i?"0 m":i)},n=function(e,t){return i(null==t?e:e-t)},s=function(e){return/^[+,-]?([1-9]\d*|0)$/.test(e)}},"wAn+":function(e,t,a){"use strict";a.r(t);var i=a("o0o1"),n=a.n(i),s=a("HaE+"),l=a("nKUr"),c=a("q1tI"),r=a.n(c),o=a("+o6H"),d=a("MYhE"),u=a("Vvt1"),j=a.n(u),b=a("cWnB"),p=a("gHQx"),h=a("ZPqy"),y=a.n(h),O=a("3Z9Z"),_=a("JI6e"),x=a("QojX"),m=a("GA0N"),k=a("vpEI"),f=a("YtlW"),T=a("20a2"),g=a.n(T),D=function(e){var t=Object(c.useState)(""),a=t[0],i=t[1],n=k.a(e.dailyTask.quota),s=k.a(e.dailyTask.doneTime),r=k.b(e.dailyTask.quota,e.dailyTask.doneTime),o=f.d(e.dailyTask.quota,e.dailyTask.doneTime,e.dailyTask.deleteFlg),u=1==e.dailyTask.deleteFlg?"\u3010"+o.str+"\u3011":"",j=o.color,p=Object(d.b)();return Object(l.jsxs)("div",{className:y.a.daily_task_item+" "+j,children:[Object(l.jsxs)("div",{className:y.a.title,onClick:function(){return e.showDailyTaskEditModal(e.dailyTask)},children:[e.dailyTask.title,u,1==e.dailyTask.deleteFlg&&Object(l.jsx)("p",{className:y.a.icon,children:Object(l.jsx)("i",{onClick:function(t){confirm("Do you want to delete it?")&&p.delete("http://localhost:8080/api/daily_task/"+e.dailyTask.id).then((function(){e.setInitDispFlg(!0)})).catch((function(){g.a.push("/Error?400")})),t.stopPropagation()},className:"fa fa-trash faa-wrench animated-hover"})})]}),Object(l.jsxs)(O.a,{children:[Object(l.jsxs)(_.a,{xs:2,className:y.a.quota_label,children:["Quota: ",n]}),Object(l.jsxs)(_.a,{xs:2,className:y.a.label,children:["Done: ",s]}),Object(l.jsxs)(_.a,{xs:3,className:y.a.label,children:["Remaining: ",r]}),Object(l.jsxs)(_.a,{xs:5,children:["logged:",Object(l.jsx)(x.a.Control,{type:"text",value:a,className:y.a.done_time_textbox,onChange:function(e){i(e.target.value)},disabled:1==e.dailyTask.deleteFlg})," m",Object(l.jsx)(b.a,{variant:"primary",className:y.a.done_time_button,onClick:function(){if(k.c(a)){var t={daily_task_id:e.dailyTask.id,done_time:a,quota:e.dailyTask.quota},n=JSON.stringify(t);i(""),p.post("http://localhost:8080/api/daily_task_history",n,{headers:{"content-type":"application/json"}}).then((function(){e.setInitDispFlg(!0)})).catch((function(){g.a.push("/Error?400")}))}else i("")},children:"Done"})]})]})]})},v=a("BQLc"),F=a.n(v),N=function(e){return Object(l.jsx)("div",{className:F.a.daily_task_list,children:e.dailyTaskList.map((function(t){return Object(l.jsx)(D,{dailyTask:t,setInitDispFlg:e.setInitDispFlg,showDailyTaskEditModal:e.showDailyTaskEditModal},"DailyTaskItem"+t.id)}))})},w=a("JEhF"),C=a("qJlv");function E(){return(E=Object(s.a)(n.a.mark((function e(t){var a,i;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=[],e.prev=1,e.next=4,Object(d.b)().get("/api/daily_task",{params:{includeDeleteFlg:t}});case 4:i=e.sent,a=I(i.data),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),g.a.push("/Error?400");case 11:return e.abrupt("return",a);case 12:case"end":return e.stop()}}),e,null,[[1,8]])})))).apply(this,arguments)}function I(e){for(var t=e.length,a=[],i=0;i<t;i++){var n=new m.a(e[i].id,e[i].username,e[i].title,e[i].description,e[i].priority,e[i].quota,e[i].deleteFlg,e[i].createDate,e[i].deleteDate,e[i].doneDate,e[i].doneTime);a.push(n)}return a}var q=function(e){var t=Object(c.useState)([]),a=t[0],i=t[1];Object(c.useEffect)((function(){e.setInitDispFlg(!1),n()}),[e.initDispFlg,e.includeDeleteFlg]);var n=function(){(function(e){return E.apply(this,arguments)})(e.includeDeleteFlg).then((function(t){i(t);for(var a=0,n=0,s=0,l=0;l<t.length;l++)1!=t[l].deleteFlg?(t[l].quota<=t[l].doneTime&&a++,n+=t[l].doneTime):s++;e.setTotalTaskCount(t.length-s),e.setDoneTaskCount(a),e.setTotalDoneTime(k.a(n))}))};return Object(l.jsx)("div",{children:Object(l.jsx)(w.a,{backend:C.a,children:Object(l.jsx)(N,{dailyTaskList:a,setInitDispFlg:e.setInitDispFlg,showDailyTaskEditModal:e.showDailyTaskEditModal},"DailyTaskList")})})},P=a("rePB"),S=a("zM5D");a("5Buo");function M(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function H(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?M(Object(a),!0).forEach((function(t){Object(P.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):M(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var B=function(e){var t=Object(c.useState)({id:-1,title:"",description:"",priority:1,quota:"",deleteFlg:0}),a=t[0],i=t[1];Object(c.useEffect)((function(){null!=e.dailyTask&&i({id:e.dailyTask.id,title:e.dailyTask.title,description:e.dailyTask.description,priority:e.dailyTask.priority,quota:e.dailyTask.quota.toString(),deleteFlg:e.dailyTask.deleteFlg})}),[]);var n,s,o=function(e){return function(t){return i(H(H({},a),{},Object(P.a)({},e,t.target.value)))}},u=Object(d.b)(),j=function(){var t={title:a.title,description:a.description,priority:a.priority,quota:a.quota,deleteFlg:a.deleteFlg,createDate:null==e.dailyTask?"":e.dailyTask.createDate,deleteDate:null==e.dailyTask?"":e.dailyTask.deleteDate};return JSON.stringify(t)},p=function(){return""!=a.title&&!(""==a.quota||!k.c(a.quota))};return null==e.dailyTask?(n="Create Daily Task",s=function(){if(!p())return!1;var t=j();u.post("http://localhost:8080/api/daily_task",t,{headers:{"content-type":"application/json"}}).then((function(){e.setInitDispFlg(!0),e.close()})).catch((function(){g.a.push("/Error?400")}))}):(n="Update Daily Task",s=function(){if(!p())return!1;var t=j();u.put("http://localhost:8080/api/daily_task/"+e.dailyTask.id,t,{headers:{"content-type":"application/json"}}).then((function(){e.setInitDispFlg(!0),e.close()})).catch((function(){g.a.push("/Error?400")}))}),Object(l.jsxs)(S.a,{show:!0,onHide:e.close,children:[Object(l.jsx)(S.a.Header,{closeButton:!0,children:Object(l.jsx)(S.a.Title,{children:n})}),Object(l.jsx)(S.a.Body,{children:Object(l.jsx)(x.a,{children:Object(l.jsxs)(O.a,{children:[Object(l.jsx)(_.a,{xs:4,className:"modal_label",children:Object(l.jsx)("strong",{children:"Title"})}),Object(l.jsx)(_.a,{xs:8,className:"modal_input",children:Object(l.jsx)(x.a.Control,{type:"text",value:a.title,onChange:o("title")})}),Object(l.jsx)("hr",{}),Object(l.jsx)(_.a,{xs:4,className:"modal_label",children:Object(l.jsx)("strong",{children:"Description"})}),Object(l.jsx)(_.a,{xs:8,className:"modal_input",children:Object(l.jsx)(x.a.Control,{as:"textarea",rows:2,cols:40,value:a.description,onChange:o("description")})}),Object(l.jsx)("hr",{}),Object(l.jsx)(_.a,{xs:4,className:"modal_label",children:Object(l.jsx)("strong",{children:"Priority"})}),Object(l.jsx)(_.a,{xs:8,className:"modal_input",children:Object(l.jsxs)(x.a.Control,{as:"select",value:a.priority,onChange:o("priority"),children:[Object(l.jsx)("option",{value:"1",children:"LOW"},"priority1"),Object(l.jsx)("option",{value:"2",children:"MEDIUM"},"priority2"),Object(l.jsx)("option",{value:"3",children:"HIGH"},"priority3")]})}),Object(l.jsx)("hr",{}),Object(l.jsx)(_.a,{xs:4,className:"modal_label",children:Object(l.jsx)("strong",{children:"Quota"})}),Object(l.jsxs)(_.a,{xs:8,className:"modal_input",children:[Object(l.jsx)(x.a.Control,{type:"text",className:"modal_input_num display_inline",value:a.quota,onChange:o("quota")})," m"]}),Object(l.jsx)("hr",{}),Object(l.jsx)(_.a,{xs:4,className:"modal_label",children:Object(l.jsx)("strong",{children:"Delete Flg"})}),Object(l.jsxs)(_.a,{xs:8,className:"modal_input padding_top_10",children:[Object(l.jsx)(x.a.Check,{inline:!0,type:"radio",id:"deleteFlg_ON",name:"deleteFlg",checked:1==a.deleteFlg,value:"1",label:"ON",onChange:o("deleteFlg")}),Object(l.jsx)(x.a.Check,{inline:!0,type:"radio",id:"deleteFlg_OFF",name:"deleteFlg",checked:0==a.deleteFlg,value:"0",label:"OFF",onChange:o("deleteFlg")})]}),null!=e.dailyTask&&Object(l.jsxs)(r.a.Fragment,{children:[Object(l.jsx)("hr",{}),Object(l.jsx)(_.a,{xs:4,className:"modal_label",children:Object(l.jsx)("strong",{children:"Create Date"})}),Object(l.jsx)(_.a,{xs:8,className:"modal_input padding_top_10",children:e.dailyTask.createDate}),Object(l.jsx)("hr",{}),Object(l.jsx)(_.a,{xs:4,className:"modal_label",children:Object(l.jsx)("strong",{children:"Delete Date"})}),Object(l.jsx)(_.a,{xs:8,className:"modal_input padding_top_10",children:""!=e.dailyTask.deleteDate?e.dailyTask.deleteDate:"-"})]})]})})}),Object(l.jsxs)(S.a.Footer,{children:[Object(l.jsx)(b.a,{variant:"primary",onClick:function(){s()},className:"button_sm",children:"execute"}),Object(l.jsx)(b.a,{variant:"dark",onClick:e.close,className:"button_sm",children:"close"})]})]},"dailyTaskEditModal")},J=a("YFqc"),L=a.n(J),Q=function(){var e=Object(c.useState)(!0),t=e[0],a=e[1],i=Object(c.useState)(0),n=i[0],s=i[1],r=Object(c.useState)(0),u=r[0],j=r[1],h=Object(c.useState)(""),y=h[0],O=h[1],_=Object(c.useState)(!1),x=_[0],m=_[1],k=Object(c.useState)(null),f=k[0],T=k[1],g=Object(c.useState)(0),D=g[0],v=g[1];Object(d.a)();var F=function(e){T(e),m(!0)};return Object(l.jsxs)(o.a,{title:"Daily Task : "+p.a()+".",children:[Object(l.jsx)(b.a,{variant:"primary",className:"button_md margin_side_10",onClick:function(){return F(null)},children:"Create Task"},"create"),Object(l.jsx)(L.a,{href:"/DailyTaskHistory",children:Object(l.jsx)(b.a,{variant:"success",className:"button_md",children:"History \uff1e"},"history")}),Object(l.jsxs)("div",{className:"display_inline margin_side_10",children:["Achievement: ",u," of ",n]}),Object(l.jsxs)("div",{className:"display_inline margin_side_10",children:["Total Done Time: ",y]}),Object(l.jsx)("div",{className:"display_inline margin_side_10",children:Object(l.jsxs)("label",{children:[Object(l.jsx)("input",{type:"checkbox",name:"includeDeleteTask",id:"includeDeleteTask",value:D,checked:1==D,onChange:function(){var e=0==D?1:0;return function(){return v(e)}}()})," Include Delete Task"]})}),Object(l.jsx)(q,{initDispFlg:t,includeDeleteFlg:D,setInitDispFlg:a,setTotalTaskCount:s,setDoneTaskCount:j,setTotalDoneTime:O,showDailyTaskEditModal:F}),x&&Object(l.jsx)(B,{close:function(){m(!1)},setInitDispFlg:a,dailyTask:f})]})},Z=j()({loader:function(){var e=Object(s.a)(n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Q);case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{ssr:!1});t.default=Z}},[["P8ZN",0,2,5,6,1,3,4,7,9,8,10]]]);