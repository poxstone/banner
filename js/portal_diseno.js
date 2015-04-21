;// JavaScript Document
var banner = {
	prepare : function(){

	},
	ini: function(){
		var vars = {};
		vars.imagenes = ['banners/bg1.jpg','https://www.youtube.com/embed/wtLJPvx7-ys','banners/bg2.jpg'];
		vars.textos = ['texto 1','texto 2','texto 3'];
		vars.vinculos = ['#1','#2','#3'];
		if(vars.imagenes.length > 0){
			banner.prepare();
		}
	}
};banner.ini();