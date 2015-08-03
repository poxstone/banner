<?xml version="1.0" encoding="UTF-8" ?> 
<Module>
<ModulePrefs title="Banner" height="300" width="960" description="Banner desarrollado por eforcers" author="Oscar Ortiz" />
	<UserPref name="tem" display_name="Tema de diseño:" default_value="0" datatype="enum" >
		<EnumValue value="0" display_value="Tema A" />
		<EnumValue value="1" display_value="Tema B" />
		<EnumValue value="2" display_value="Tema C" />
	</UserPref>
	<UserPref name="imgsize" display_name="Tamaño de la imagen:" default_value="rl" datatype="enum" >
		<EnumValue value="rl" display_value="Imagen rellenar" />
		<EnumValue value="or" display_value="Imagen en tamaño original" />
		<EnumValue value="ex" display_value="Imagen se estira" />
		<EnumValue value="aw" display_value="Imagen se ajustar al ancho" />
		<EnumValue value="ah" display_value="Imagen se ajustar al alto" />
		<EnumValue value="ms" display_value="Imagen tipo mosaico" />
	</UserPref>
	<UserPref name="imgpos" display_name="Posición de la imagen:" default_value="cn" datatype="enum" >
		<EnumValue value="cn" display_value="Imagen centrada" />
		<EnumValue value="up" display_value="Imagen arriba" />
		<EnumValue value="dw" display_value="Imagen abajo" />
	</UserPref>
	<UserPref name="cmt" display_name="Visualización de commentarios:" default_value="dw" datatype="enum" >
		<EnumValue value="no" display_value="No mostrar comentarios" />
		<EnumValue value="up" display_value="Comentario arriba" />
		<EnumValue value="dw" display_value="Comentario abajo" />
	</UserPref>
	<UserPref name="rdv" display_name="Posición vertical para los botones de indice:" default_value="dw" datatype="enum" >
		<EnumValue value="no" display_value="No mostrar botones de indice" />
		<EnumValue value="up" display_value="Botones de indice arriba" />
		<EnumValue value="dw" display_value="Botones de indice abajo" />
	</UserPref>
	<UserPref name="rdh" display_name="Posiciónd horizontal para los botones de indice:" default_value="cn" datatype="enum" >
		<EnumValue value="cn" display_value="Botones de indice centrados" />
		<EnumValue value="lf" display_value="Botones de indice a la izquierda" />
		<EnumValue value="rg" display_value="Botones de indice a la derecha" />
	</UserPref>
	<UserPref name="flc" display_name="Mostrar flechas Anterior/Siguiente:" default_value="si" datatype="enum" >
		<EnumValue value="si" display_value="Mostrar flechas" />
		<EnumValue value="no" display_value="No mostrar flechas" />
	</UserPref>
	<UserPref name="tr" display_name="Tipo de transición:" default_value="0" datatype="enum" >
		<EnumValue value="0" display_value="Transición de atenuación" />
		<EnumValue value="1" display_value="Transición de desplazamiento" />
	</UserPref>
	<UserPref name="time" display_name="Tiempo de transición (segundos):" default_value="3"/>
	<UserPref name="auto" display_name="Autoreproducir:" datatype="bool" default_value="true"/>
	<UserPref name="imgs" display_name="Url de imagenes/videos separadas por comas max. 5:" default_value=""/>
	<UserPref name="txts" display_name="Descripción de imagenes separados por comas max.100 caracteres:" default_value=""/>
	<UserPref name="lnks" display_name="Vinculos donde dirigirá la imagen separados por comas max. 5:" default_value=""/>
	<Content type="html"><![CDATA[
		<?php include('body.html');?>
		<style>
			<?php include('css/portal_general.css');?>
		</style>
		<script>

			<?php include('js/portal_diseno.js');?>
		</script>
		]]>  
	</Content>
</Module>
