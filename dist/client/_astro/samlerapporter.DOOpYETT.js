import{u as n,f as r,j as t}from"./api.client.C1cBXBsd.js";import{a}from"./urls.D33HFj31.js";import{L as m}from"./Link.BWC11UZq.js";import"./index.CfLG8xVc.js";const d="_styledList_49950_1",o="_styledlistItem_49950_15",c="_styledListItem_49950_34",l={styledList:d,styledlistItem:o,styledListItem:c},f=()=>{const{data:e,isLoading:i}=n({url:`${a}/reports/summary`},r);return console.log(e),i?null:t.jsx("div",{children:t.jsx("ul",{className:l.styledList,children:e.map(s=>t.jsx("li",{className:l.styledlistItem,children:t.jsx(m,{href:s.url,variant:"action",children:s.navn})},s.navn))})})};export{f as default};
