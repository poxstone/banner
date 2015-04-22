;// JavaScript Document
var banner = {
	vars : {},//variable global
	objeto : function(url){//crea el objeto segun su url
		if( url!='' ){
			
			var obj_html = '';
			var typo = 'image';
			//si es de youtube
			if( url.match(/https:\/\/((www\.youtube\.com)|(youtu\.be))\//i) ){
				url = url.substr(url.lastIndexOf('/'));
				url =  'https://www.youtube.com/embed'+url;
				obj_html = '<iframe class="iframe" src="'+url+'" frameborder="0" allowfullscreen></iframe>';
				typo = 'iframe';
			}else{//si es una imagen
				obj_html = '<img border="none" src="'+url+'" />';
			}

			return {'obj':obj_html,'tipo':typo,'url':url};

		}else{
			return 'none';
		}
	},
	prepare : function(bars){
		var vars = bars;
		vars.contGen = document.getElementById('banner');
		vars.li = [];//guardará todos los li creados
		var img_length = vars.imagenes.length;

		for(var i=0; i<img_length ;i++){
			//validar si es de tipo imagen o iframe
			var image_o_iframe = banner.objeto(vars.imagenes[i]);
			var bg = '';

			//valida existencia
			if(image_o_iframe){
				
				//crea elemento li
				var li = document.createElement('li');
				li.id='itm_'+i;//asigna id
				li.setAttribute('class','item');

				//si hay imagen crea como background
				if(image_o_iframe.tipo=='image'){
					bg = 'background-image:url('+image_o_iframe.url+');'
				}


				var	html= '<div class="item-cont" style="'+bg+'">';
						html+= image_o_iframe.obj;
						//si hay texto lo crea
						if(vars.textos[i] && vars.textos[i]!='' ){
							html+= '<div class="detalle">';
								html+= '<p>';
									html+= vars.textos[i];
									if(vars.vinculos[i] && vars.vinculos[i]!='' ){
										html+= '<a class="btn" target="_top" href="'+vars.vinculos[i]+'">Ver más</a>';
									}
								html+= '</p>';
							html+= '</div>';
						}
					html+= '</div>';

				//colocar vinculo en li
				if( (vars.vinculos[i] && vars.vinculos[i]!='') && (!vars.textos[i] && vars.textos[i]=='') && (image_o_iframe.tipo!='iframe') ){
					li.setAttribute('onclick','top.location.href=\''+vars.vinculos[i]+'\'');
				}

				li.innerHTML = html;//coloca html en li

				vars.contGen.appendChild(li);//pega li
				vars.li[i] = li;//guarda li

				//valida creacion de radios
				if( img_length>1 ){
					if( i==0 ){
						vars.contRadios = document.createElement('div');
						vars.contRadios.setAttribute('class','radios');
					}

					//crea radio
					var rad = document.createElement('a');
					rad.setAttribute('class','item-lnk');
					rad.setAttribute('href','#'+li.id);

					//añade radios
					vars.contRadios.appendChild(rad);

				}

			}
		}

		//pega radios
		if( vars.contRadios ){
			vars.contGen.appendChild(vars.contRadios);
		}

		//crea las flechas
		vars.leftArr = document.createElement('a');
		vars.leftArr.setAttribute('class','arr left');
		vars.leftArr.innerHTML='<span class="icon"><i></i></span>';
		vars.rightArr = document.createElement('a');
		vars.rightArr.setAttribute('class','arr right');
		vars.rightArr.innerHTML='<span class="icon"><i></i></span>';

		vars.contGen.appendChild(vars.leftArr);
		vars.contGen.appendChild(vars.rightArr);

	},
	ini: function(){
		var vars = banner.vars;
		vars.imagenes = ['banners/bg1.jpg','https://www.youtube.com/embed/wtLJPvx7-ys','banners/bg2.jpg'];
		vars.textos = ['','texto 2','texto 3'];
		vars.vinculos = ['#1','#2','#3'];
		if(vars.imagenes.length > 0){
			banner.prepare(vars);
		}
	}
};banner.ini();