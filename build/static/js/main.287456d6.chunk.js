(this["webpackJsonpthe-phone-book"]=this["webpackJsonpthe-phone-book"]||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(14),u=t.n(c),o=t(4),l=t(2),i=function(e){var n=e.searchTerm,t=e.searchTermUpdate;return r.a.createElement(a.Fragment,null,r.a.createElement("label",{htmlFor:"search"},"Filter shown with  "),r.a.createElement("input",{type:"text",placeholder:"enter search term",value:n,onChange:t,id:"search"}))},m=function(e){var n=e.person,t=e.handleDelete;return r.a.createElement("div",null,r.a.createElement("span",null,n.name," ","".concat(n.number," ")),r.a.createElement("button",{onClick:function(){return t(n.id)}},"delete"))},s=function(e){var n=e.persons,t=e.filteredPersons,a=e.handleDelete;return t.length<=0?n.map((function(e){return r.a.createElement(m,{key:e.name,person:e,handleDelete:a})})):t.map((function(e){return r.a.createElement(m,{key:e.name,person:e,handleDelete:a})}))},f=function(e){var n=e.formSubmit,t=e.newName,a=e.nameChange,c=e.newNumber,u=e.numberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{type:"text",placeholder:"Please enter name",value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{type:"tel",placeholder:"Please enter phone #",value:c,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},d=t(3),h=t.n(d),b="/api/persons",p=function(){return h.a.get(b).then((function(e){return e.data}))},v=function(e){return h.a.post(b,e).then((function(e){return e.data}))},E=function(e){return h.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.data}))},g=function(e,n){return h.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))},j=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"message"},n)},O=function(e){var n=e.message;return r.a.createElement("div",{className:"error"},n)},w=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),m=Object(l.a)(u,2),d=m[0],h=m[1],b=Object(a.useState)(""),w=Object(l.a)(b,2),S=w[0],y=w[1],C=Object(a.useState)(""),k=Object(l.a)(C,2),T=k[0],D=k[1],N=Object(a.useState)([]),U=Object(l.a)(N,2),P=U[0],x=U[1],F=Object(a.useState)(null),A=Object(l.a)(F,2),J=A[0],q=A[1],B=Object(a.useState)(null),I=Object(l.a)(B,2),M=I[0],z=I[1];Object(a.useEffect)((function(){p().then((function(e){c(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement(j,{message:J}),null!==M&&r.a.createElement(O,{message:M}),r.a.createElement("h1",null,"Phonebook"),r.a.createElement(i,{searchTerm:T,searchTermUpdate:function(e){var n=e.target.value.trimStart();D(n);var a=t.map((function(e){return{name:e.name.toUpperCase(),number:e.number}})),r=n.toUpperCase(),c=a.filter((function(e){return e.name===r}));x(c.length>0?c:[])}}),r.a.createElement("h2",null,"add a new"),r.a.createElement(f,{newName:d,nameChange:function(e){var n=e.target.value.trimStart();h(n)},formSubmit:function(e){e.preventDefault();var n=t.map((function(e){return Object(o.a)(Object(o.a)({},e),{},{name:e.name.toUpperCase()})})),a=d.toUpperCase(),r=n.filter((function(e){return e.name===a})),u=r.map((function(e){return e.name}));console.log(n),console.log(r),console.log(u);var l={name:d,number:S};if(u.includes(a))if(""!==l.number){if(window.confirm("".concat(l.name," is already added to the phonebook, replace the old number with a new one?"))){var i=n.find((function(e){return e.name===a})),m=t.find((function(e){return e.id===i.id})),s=m.id,f=Object(o.a)(Object(o.a)({},m),{},{number:l.number});g(s,f).then((function(e){c(t.map((function(n){return n.id===s?e:n}))),q("Added phone number for ".concat(e.name)),setTimeout((function(){q(null)}),5e3)})).catch((function(e){z("Cannot add phone number since ".concat(f.name," has already been deleted from server.")),c(t.filter((function(e){return e.id!==f.id}))),setTimeout((function(){z(null)}),5e3)}))}}else alert("Sorry ".concat(l.name," has already been added to the phonebook!"));else v(l).then((function(e){c(t.concat(e)),q("Added ".concat(e.name)),setTimeout((function(){q(null)}),5e3)})).catch((function(e){return alert("Unable to complete request, please try again!")}));h(""),y("")},newNumber:S,numberChange:function(e){var n=e.target.value.trimStart();y(n)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(s,{persons:t,filteredPersons:P,handleDelete:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&E(e).then((function(n){c(t.filter((function(n){return n.id!==e}))),q("Deleted ".concat(n.name)),setTimeout((function(){q(null)}),5e3)})).catch((function(e){z("".concat(n.name," has already been removed from server.")),c(t.filter((function(e){return e.id!==n.id}))),setTimeout((function(){z(null)}),5e3)}))}}))};t(37);u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.287456d6.chunk.js.map