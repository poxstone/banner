;
var remEvent = {
    //remEvent.del(event);
    del: function (evento) {
        if (event) {
        } else {
            var event = evento
        }
        (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
    }
};
function gadget_start(){//emulate the widget de google apps widget
    
    gadgets = {
        Prefs : function(){
            var contgen = document.getElementById('banner-local-html');
            if(contgen){
                //funciones emulan GoogleWidget
                //get boolean options 
                this.getBool = function(str){
                    if(contgen.getAttribute('data-auto')){
                        var auto = ( contgen.getAttribute('data-auto').match(/true/i) ) ? true:false;
                    }
                    
                    if(str=='auto'){
                        return auto;
                    }
                };
                //get time
                this.getInt = function(str){
                    var time = parseInt(contgen.getAttribute('data-time'));
                    if(str=='time'){
                        return time;
                    }
                };
                //images and times
                this.getString = function(str){

                    var imgs = [];
                    var txts = [];
                    var lnks = [];

                    //i tag is a each content slides
                    var lis = contgen.getElementsByTagName('i');
                    for( var li=0; li<lis.length; li++ ){
                        var li_this = lis[li];

                        //set images
                        var img = li_this.getElementsByTagName('img');
                        if( img.length ){
                            var img_src = img[0].src || '';
                            imgs.push( img_src );
                        }

                        //get text comments
                        var texts = li_this.getElementsByTagName('span');
                        if( texts.length ){
                            var text_src = texts[0].textContent || '';
                            txts.push( text_src.replace(',','') );
                        }
                        //get links
                        var links = li_this.getElementsByTagName('a');
                        if( links.length ){
                            var link_src = links[0].href || '';
                            lnks.push( link_src.replace(',','') );
                        }

                    }
                    //unen en encadena
                    if(str=='imgs'){
                        return (imgs.join());
                    }else if(str=='txts'){
                        return (txts.join());
                    }else if(str=='lnks'){
                        return (lnks.join());
                    }
                };
            }

        }
    };
};

var banner = {
    vars : {},//variable global
    tempo: undefined,
    objeto : function(url){//crea el objeto segun su url
        if( url!='' ){
            
            var obj_html = '';
            var typo = 'image';
            console.log('URL:' ,url);
            lol = url;
            if( url.match(/https:\/\/((www\.youtube\.com)|(youtu\.be))\//i) ){
                //si es de youtube
                url = url.substr(url.lastIndexOf('/'));
                url = url.replace('watch?v=','');
                url =  'https://www.youtube.com/embed'+url;
                obj_html = '<iframe class="iframe" src="'+url+'" frameborder="0" allowfullscreen></iframe>';
                typo = 'iframe';
            }else if( url.match(/https:\/\/(www\.)?drive\.google\.com\/((open\?id=)|(file\/d\/))/i) ){
                //si es video de drive
                //extrae e id
                var id;
                if(  url.match(/open\?id=/i) ){
                    //https://drive.google.com/open?id=0B18yLgsGq8-xcmtkSGF6NDlYVjg
                    id = url.substr(url.lastIndexOf('id=')+3);
                }else if(url.match(/file\/d\//i)){
                    //https://drive.google.com/file/d/0B18yLgsGq8-xcmtkSGF6NDlYVjg/view?usp=sharing
                    id = url.substr(url.lastIndexOf('/d/')+3);
                }
                //recorta parametros si vienen
                id = (id.match(/\//))? id.substr(0,id.lastIndexOf('/')): id;
                //concat video and id parameters
                url = 'https://docs.google.com/file/d/'+id+'/preview';
                obj_html = '<iframe class="iframe" src="'+url+'" frameborder="0" allowfullscreen></iframe>';
                typo = 'iframe';
            }else{
                //si es una imagen
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
        //aÃ±ade clase active a radios
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
        //validamos si el elemento al que se le da click es la imagen y no el texto descriptivo
        var pick = evento.target;
        var pick_class = pick.getAttribute('class');

        pick_class = pick_class || '';

        if( pick_class.match(/item-cont/) && uri!=''){
            //cambiamos la página
            if( uri.match(/#_blank$/) ){//abre nueva pestaña
                window.open(uri);
            }else{
                //abre nueva ventana
                top.location.href = uri;
            }
        }

    },
    prepare : function(bars){
        var vars = bars;
            vars.contHtml = document.getElementById('banner-local-html');
            vars.contGoogle = document.getElementById('banner-google');
            vars.is_html = (vars.contHtml)?vars.contHtml.attributes['google-gadget'] : false;
        
        //is not google gadget?
        if( !vars.is_html || vars.is_html=='false' ){
            //is local or is sities
            if( location.href.match(/localhost\//i) || !document.getElementById('banner-google') ){
                vars.contGen = vars.contHtml;
                if( vars.contGen ){
                    if( vars.contGoogle ){
                        vars.contGoogle.style.display='none';
                    }
                }
            }else{
                vars.contGen = document.getElementById('banner-google');
            }
        }else{
            vars.contGen = vars.contHtml;
            if(vars.contGoogle){
                vars.contGoogle.style.display='none';
            }
        }
        vars.contGen.style.display='block';

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

                    //si es el primero aÃ±ade clase active
                    var html= '<div class="item-cont" style="'+bg+'" '+vinculo_attr+' >';
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
                        //prevent change page on cloudkey and others
                        rad.addEventListener('click',function(evento){
                            remEvent.del(evento);
                        });
                        if(i==0){
                            rad.className = rad.className+' active';
                        }

                        //aÃ±ade radios
                        vars.contRadios.appendChild(rad);

                        //aÃ±ade funcion a radio

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
        var prefs;//contendrá google gadget de Google o de la función que emula
        try{
            prefs = new gadgets.Prefs();
        }catch(err){
            gadget_start();
            prefs = new gadgets.Prefs();
        }
        
        //utiliza los metodos para estraer los datos
        vars.imagenes = banner.trim( prefs.getString("imgs"), 'imagenes' );
        vars.textos = banner.trim( prefs.getString("txts"), 'textos' );
        vars.vinculos = banner.trim( prefs.getString("lnks"), 'vinculos' );
        vars.auto = prefs.getBool("auto");
        vars.tiem = prefs.getInt("time") | 3;//se convierte a segundos

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