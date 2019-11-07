/*anim = function () {
  this.divo = document.getElementById('exp1');
  var offset = this.divo.offset();
  this.X = offset.left;
  this.Y = offset.top;
  this.W = this.divo.offsetWidth;
  this.H = this.divo.offsetHeight;
  console.log(this.X + '  ' + this.Y + '  ' + this.W + '   ' + this.H);
  this.canvasVitre = document.getElementById('vitre');
  this.canvasVitre.style.top = this.Y + 'px';
  this.canvasVitre.style.left = this.X + 'px';
  this.canvasVitre.style.width = this.W + 'px';
  this.canvasVitre.style.height = this.H + 'px';

  this.ctxVitre = this.canvasVitre.getContext('2d');
  this.imgVitre = new Image();
  this.imgVitre = document.getElementById("source");
  $(this.canvasVitre).attr('width', this.W);
  $(this.canvasVitre).attr('height', this.H);
  this.ctxVitre.drawImage(this.imgVitre, 0, 0, this.W, this.H);
  window.addEventListener('mousedown', function (e) {
    console.log(e);
  }, true);
};*/
canvasFgd = function (_idCible, _adrFond,_calque,_positionStyle) {
  this.cible = $('#'+_idCible);
  this.cibleOffset=this.cible.offset();
  this.cible.x=this.cibleOffset.left;
  this.cible.y=this.cibleOffset.top;
  this.cible.w=document.getElementById(_idCible).offsetWidth;
  this.cible.h=document.getElementById(_idCible).offsetHeight;
 
  this.fgd = {
    ID : _idCible+'ZIndex'+_calque,
    img : new Image()
  }
  
  $("body").append("<canvas id=\""+this.fgd.ID+"\" class=\"fgdCanvas\"></canvas>");
   
  this.fgd.img.src =_adrFond;
  $('#'+this.fgd.ID).css('z-index',_calque);
  $('#'+this.fgd.ID).css('position',_positionStyle);
  $('#'+this.fgd.ID).css('width',this.cible.w+'px');
  $('#'+this.fgd.ID).css('height',this.cible.h+'px');
  $('#'+this.fgd.ID).css('left',this.cible.x+'px');
  $('#'+this.fgd.ID).css('top',this.cible.y+'px');
  //$("#principale").css('background-image','url('+_adrFond+')');
  //$("#principale").css('background-size','cover');
  this.fgd.canvas=document.getElementById(this.fgd.ID);
  
  this.fgd.ctx = this.fgd.canvas.getContext('2d');
  $(this.fgd.canvas).attr('width', this.fgd.img.width);
  $(this.fgd.canvas).attr('height', this.fgd.img.height);
  var _ctx = this.fgd.ctx;
  var _img = this.fgd.img;
  _img.addEventListener('load', function() {
    _ctx.drawImage(_img,0,0);
  }, false);
    console.log(this.fgd.img.width+'  '+this.fgd.img.height);
   
}
