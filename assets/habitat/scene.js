/* Shared presentation and placement geometry. No account, reward or currency writes. */
(function (global) {
  'use strict';
  var root = 'assets/habitat/';
  var garden = {cabin:'cottage',windmill:'windmill-body',gazebo:'gazebo',fountain:'fountain',treehouse:'treehouse',pond:'pond',lamp:'lamp',flowerpot:'flowers',rabbit:'rabbit'};
  var town = {home_1:'cottage',school_1:'school',shop_1:'shop',fountain:'fountain',wind_body:'windmill-body',wind_blade:'windmill-rotor',planter2:'flowers',lion_statue:'guardian'};
  function art(name) { return root + name + '.webp'; }
  function grid(points, n, extra) {
    var t=points[0],r=points[1],l=points[2],path='';
    function p(u,v) { return (t[0]+u*(r[0]-t[0])+v*(l[0]-t[0])).toFixed(2)+','+(t[1]+u*(r[1]-t[1])+v*(l[1]-t[1])).toFixed(2); }
    for(var i=0;i<=n;i++){var q=i/n;path+='M'+p(q,0)+'L'+p(q,1)+'M'+p(0,q)+'L'+p(1,q);}
    return '<svg class="hab-grid '+(extra||'')+'" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="'+path+'"/></svg>';
  }
  function ambient() {
    return '<div class="hab-atmosphere" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>';
  }
  function radius(d){return d.c==='k'||d.mv==='fly'?0:d.c==='s'?.14:d.k==='pond'?.14:d.c==='a'?.055:.075;}
  function fits(uv,d,items,plants,skip) {
    var size=radius(d);
    if(uv[0]<.06||uv[0]>.94||uv[1]<.06||uv[1]>.94)return false;
    if(!size)return true;
    for(var i=0;i<items.length;i++){
      if(i===skip||!items[i].def)continue;
      var other=radius(items[i].def);
      if(other&&Math.hypot(uv[0]-items[i].uv[0],uv[1]-items[i].uv[1])<size+other)return false;
    }
    return !plants.some(function(p){return Math.hypot(uv[0]-p[0],uv[1]-p[1])<size+.065;});
  }
  function freeSpot(d,items,plants) {
    // Stable choices form neighbourhoods instead of piling every new purchase at the centre.
    var preferred=d.c==='s'?[[.25,.25],[.7,.25],[.25,.7],[.7,.7]]:d.c==='a'?[[.45,.6],[.6,.45]]:[[.5,.5],[.4,.7],[.7,.4]];
    var positions=preferred.slice();
    for(var y=1;y<15;y++)for(var x=1;x<15;x++)positions.push([x/16,y/16]);
    return positions.filter(function(p){return fits(p,d,items,plants,-1);})[0]||null;
  }
  global.HabitatView={art:art,garden:garden,town:town,grid:grid,ambient:ambient,fits:fits,freeSpot:freeSpot};
})(window);
