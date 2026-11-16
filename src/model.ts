export type Tool = 'select' | 'rect' | 'ellipse' | 'text';
export type Shape = { id:string; name:string; type:'rect'|'ellipse'|'text'; x:number; y:number; width:number; height:number; fill:string; text?:string; fontSize?:number; componentId?:string; overrides?:string[]; prototypeTo?:string };
export type Frame = { id:string; name:string; width:number; height:number; background:string; objects:Shape[] };
export type Comment = { id:string; author:string; text:string; createdAt:string };
export type DesignFile = { id:string; name:string; modified:string; frames:Frame[]; activeFrame:string; components:Record<string,Partial<Shape>>; comments:Comment[]; permissions:{people:{email:string;role:'view'|'edit'}[]; link:'restricted'|'view'|'edit'} };
const uid=()=>Math.random().toString(36).slice(2,9);
export const newFrame=(name='Home'):Frame=>({id:uid(),name,width:960,height:600,background:'#ffffff',objects:[]});
export const starterFile=():DesignFile=>{ const frame=newFrame('Landing page'); frame.objects=[{id:uid(),name:'Hero background',type:'rect',x:54,y:48,width:852,height:504,fill:'#f5f3ff'},{id:uid(),name:'Accent orb',type:'ellipse',x:688,y:108,width:142,height:142,fill:'#c4b5fd'},{id:uid(),name:'Welcome headline',type:'text',x:112,y:166,width:500,height:68,fill:'#201b36',text:'Make room for ideas',fontSize:42},{id:uid(),name:'Supporting text',type:'text',x:114,y:250,width:400,height:48,fill:'#716b80',text:'A little canvas for your next big thing.',fontSize:18},{id:uid(),name:'Get started button',type:'rect',x:112,y:334,width:154,height:48,fill:'#7047eb'}];return{id:uid(),name:'Untitled design',modified:new Date().toISOString(),frames:[frame],activeFrame:frame.id,components:{},comments:[],permissions:{people:[],link:'restricted'}}; };
export const createFile=(name='Untitled design'):DesignFile=>({...starterFile(),name});
const STORAGE='mini-figma-files-v1';
export function loadFiles():DesignFile[]{try{const raw=localStorage.getItem(STORAGE);if(raw){const value=JSON.parse(raw) as DesignFile[];if(Array.isArray(value)&&value.length)return value;}}catch{}const initial=[starterFile(),createFile('Mobile app concept')];initial[1].frames[0].name='Screen 1';saveFiles(initial);return initial;}
export function saveFiles(files:DesignFile[]){localStorage.setItem(STORAGE,JSON.stringify(files));}
export const makeId=uid;
