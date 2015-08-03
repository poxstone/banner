;// JavaScript Document
var banner = {
	vars : {},//variable global
	tempo: undefined,
	objeto : function(url){//crea el objeto segun su url
		if( url!='' ){
			
			var obj_html = '';
			var typo = 'image';
			//si es de youtube
			if( url.match(/https:\/\/((www\.youtube\.com)|(youtu\.be))\//i) ){
				url = url.substr(url.lastIndexOf('/'));
				url = url.replace('watch?v=','');
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
	findClass : function(objetos,clase){
		var claseNombre = new RegExp(clase);
		var lis = objetos;
		var objts=[];
		var indx = [];
		for(var i=0; i<lis.length; i++){
			if( lis[i].className.match(claseNombre) ){
				objts.push(lis[i]);//guardará objeto
				indx.push(i);//mostrará el indice
			}
		}
		return {'objetos':objts,'indices':indx};
	},
	pasar : function(dir){
		var lis = banner.vars.li;
		//selecciono actual y siguiente
		var class_result = banner.findClass(banner.vars.li,'show');
		var li_actual = class_result.objetos[0];
		var li_actual_ind = class_result.indices[0];//se utiliza para hover a radios
		var tipo_obj = typeof(dir);
		var li_sigu;
		var num_siguiente;

		if( tipo_obj=='object' ){//es el radbutton
			var num = dir.getAttribute('href').match(/\d{0,}$/);
			li_sigu = lis[num[0]];
			num_siguiente = num[0];
			
		}else{
			if(dir=='next'){
				if( li_actual.nextSibling && li_actual.nextSibling.tagName.match(/li/i) ){
					li_sigu = li_actual.nextSibling;
					num_siguiente = li_actual_ind+1;
				}else{
					li_sigu = lis[0];
					num_siguiente = 0;
				}
			}else if(dir=='prev'){
				if(li_actual.previousSibling && li_actual.previousSibling.tagName.match(/li/i) ){
					li_sigu = li_actual.previousSibling;
					num_siguiente = li_actual_ind-1;
				}else{
					li_sigu = lis[lis.length-1];
					num_siguiente = lis.length-1;
				}
			}
		}

		//cambia la clase activo
		li_actual.className = li_actual.className.replace(/ show/,' hide');

		//cambia la clase siguiente
		li_sigu.className = li_actual.className.replace(/ hide/,' show');

		//quitar active a radios
		var rad_active = banner.findClass(banner.vars.rads,' active').objetos[0];
		if(rad_active){
			rad_active.className = rad_active.className.replace(/ active/,'');
		}
		//añade clase active a radios
		var rad_pulse = banner.vars.rads[num_siguiente];
		if(rad_pulse){
			rad_pulse.className = rad_pulse.className+' active';
		}

		

		//reinicia tiempo
		clearInterval(banner.tempo);
		banner.timer( );

	},
	timer: function(){

		//valida tiempo y establece minimo
		var duracion = parseInt(banner.vars.tiem);

		if( duracion!='' ){

			if( duracion>0 ){
				duracion = duracion*1000;
			}else{
				duracion = 500;
			}
		}

		
		banner.tempo = setInterval(function() {

			//declara evento para deterne si hay iframe
			banner.vars.contGen.onmousemove = function(e){
				var class_result = banner.findClass(banner.vars.li,'show');
				banner.vars.ifrm = class_result.objetos[0].getElementsByTagName('iframe').length;
			}
			//valido si está sobre un iframe apartir del mouseover
			if(!banner.vars.ifrm){

				//click automatico para cambiar
				banner.vars.rightArr.click();
			
				banner.vars.contGen.onmouseover = function(e){
					clearInterval(banner.tempo);
					banner.tempo = undefined;

						//se vuelve a activar por tiempo si no es iframe
						setTimeout(function() {
							if( !banner.tempo ){
								banner.timer();
							}
						}, 5000);
						//se vuelve a activar por salir
						banner.vars.contGen.onmouseout = function(e){
						if( !banner.tempo ){
								banner.timer();
						}
					}
						
				}
			}
		}, duracion);
	},
	lnk : function(uri,evento){
		//validamos si el elemento al que se le dió click es la imagen y no el texto descriptivo
		var pick = evento.target;
		var pick_class = pick.getAttribute('class');

		pick_class = pick_class || '';

		if( pick_class.match(/item-cont/) && uri!=''){
			//cambiamos la página
			top.location.href = uri;
		}

	},
	prepare : function(bars){
		var vars = bars;
		//elije uno u otro para pruebas locales
		if( location.href.match(/localhost\//i) || !document.getElementById('banner-google') ){
			vars.contGen = document.getElementById('banner-local');
			if( vars.contGen ){
				console.log(1231);
				vars.contGen.style.display='block';
				var contGoogle = document.getElementById('banner-google');
				if( contGoogle ){
					contGoogle.style.display='none';
				}
			}
		}else{
			vars.contGen = document.getElementById('banner-google');
		}
		if(vars.contGen){
			vars.li = [];//guardará todos los li creados
			vars.rads = [];//guardará todos los li creados
			var img_length = vars.imagenes.length;

			for(var i=0; i<img_length ;i++){
				//validar si es de tipo imagen o iframe
				var image_o_iframe = banner.objeto(vars.imagenes[i]);
				var bg = '';
				var vinculo_attr = '';

				//valida existencia
				if(image_o_iframe){
					
					//crea elemento li
					var li = document.createElement('li');
					li.id='itm_'+i;//asigna id
					li.setAttribute('class','item');
					if(i==0){
						li.className = li.className+' show';
					}else{
						li.className = li.className+' hide';
					}

					//si hay imagen crea como background
					if(image_o_iframe.tipo=='image'){
						bg = 'background-image:url('+image_o_iframe.url+');';
					}
					//si hay vinculo
					if( vars.vinculos[i] && vars.vinculos[i]!='' ){
						vinculo_attr = 'onclick="banner.lnk(\''+vars.vinculos[i]+'\',event)"';
					}

					//si es el primero añade clase active
					var	html= '<div class="item-cont" style="'+bg+'" '+vinculo_attr+' >';
							html+= image_o_iframe.obj;
							//si hay texto lo crea
							if(vars.textos[i] && vars.textos[i]!='' ){
								html+= '<div class="detalle">';
									html+= '<p>';
										html+= vars.textos[i];
										if(vars.vinculos[i] && vars.vinculos[i]!='' ){
											html+= '<a class="btn" '+vinculo_attr+'>Ver más</a>';
										}
									html+= '</p>';
								html+= '</div>';
							}
						html+= '</div>';

					//colocar vinculo en li
					

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
						if(i==0){
							rad.className = rad.className+' active';
						}

						//añade radios
						vars.contRadios.appendChild(rad);

						//añade funcion a radio

						rad.addEventListener('click',function(e){
							banner.pasar( this );
						});

						//guarda los radios
						vars.rads[i]=rad;

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

			//asignar eventos
			vars.leftArr.addEventListener('click',function(e){
				banner.pasar('prev');
			});
			vars.rightArr.addEventListener('click',function(e){
				banner.pasar('next');
			});

			//temporizador
			if(vars.auto){
				
				banner.timer();
			}
		}else{
			console.log('no hay contenedor de banner');
		}

	},
	trim : function(str, url){
		var cad = str;
		cad = (cad).replace(/ {0,}, {0,}/g,',').replace(/, {0,}$/,'');

		if(url && (url=='vinculos' || url=='imagenes') ){
			cad = (cad).replace(/ /g,'');
		}

		cad =  cad.split(',');
		return cad;
	},
	ini: function(){
		var vars = banner.vars;
		try{
			var prefs = new gadgets.Prefs();
			vars.imagenes = banner.trim( prefs.getString("imgs"), 'imagenes' );
			vars.textos = banner.trim( prefs.getString("txts"), 'textos' );
			vars.vinculos = banner.trim( prefs.getString("lnks"), 'vinculos' );
			vars.auto = prefs.getBool("auto");
			vars.tiem = prefs.getInt("time");//se convierte a segundos
		}catch(err){
			vars.imagenes = banner.trim( "https://googledrive.com/host/0B18yLgsGq8-xfklXcjBuYWk5UGUtRWVDOV9ORGhGRVFhaDFEU1EzeENJcVVjR2R2LS1OTmM/bg1.jpg,https://youtu.be/wtLJPvx7-ys,https://googledrive.com/host/0B18yLgsGq8-xfklXcjBuYWk5UGUtRWVDOV9ORGhGRVFhaDFEU1EzeENJcVVjR2R2LS1OTmM/bg2.jpg", 'imagenes' );
			vars.textos = banner.trim( "perro 01,perro 02, perro 03,", 'textos' );
			vars.vinculos = banner.trim( "", 'vinculos' );
			vars.auto = true;
			vars.tiem = 3;
		}
		if(vars.imagenes.length > 0){
			banner.prepare(vars);
		}
	}
};
try{
	//valida jquery para cargar
	$(function(){
		banner.ini();
	})
}catch(error){
	banner.ini();
}