/* Place readable object labels outside the task panel and touch controls. */
(function(root){
 'use strict';
 function overlaps(a,b,gap=5){return a.x<b.x+b.w+gap&&a.x+a.w+gap>b.x&&a.y<b.y+b.h+gap&&a.y+a.h+gap>b.y;}
 function place(x,y,w,h,bounds,blocks){
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const xs=[x-w/2,bounds.x,bounds.x+bounds.w-w],ys=[y-h,bounds.y,bounds.y+bounds.h-h];
  for(const b of blocks){xs.push(b.x-w-6,b.x+b.w+6);ys.push(b.y-h-6,b.y+b.h+6);}
  let best=null,score=Infinity;
  for(const xx of xs)for(const yy of ys){
   const r={x:clamp(xx,bounds.x,bounds.x+bounds.w-w),y:clamp(yy,bounds.y,bounds.y+bounds.h-h),w,h};
   if(w>bounds.w||h>bounds.h||blocks.some(b=>overlaps(r,b)))continue;
   const d=(r.x+w/2-x)**2+(r.y+h-y)**2;
   if(d<.01)return r;
   if(d<score){score=d;best=r;}
  }
  return best;
 }
 const api={place,overlaps};if(typeof module==='object'&&module.exports)module.exports=api;else root.WordIsland24Layout=api;
})(typeof window==='object'?window:globalThis);
