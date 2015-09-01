<?xml version="1.0" encoding="UTF-8" ?> 
<Module>
<ModulePrefs title="Banner" height="300" width="960" description="Banner desarrollado por eforcers" author="Oscar Ortiz" />
	<UserPref name="tem" display_name="Tema de diseño:" default_value="0" datatype="enum" >
		<EnumValue value="0" display_value="Tema A" />
		<EnumValue value="1" display_value="Tema B" />
		<EnumValue value="2" display_value="Tema C" />
		<EnumValue value="3" display_value="Tema D" />
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
	<UserPref name="rdh" display_name="Posición horizontal para los botones de indice:" default_value="cn" datatype="enum" >
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
	<UserPref name="fr" display_name="Tipo de forma:" default_value="0" datatype="enum" >
		<EnumValue value="0" display_value="Forma cuadrada" />
		<EnumValue value="1" display_value="Forma redondeada" />
		<EnumValue value="2" display_value="Forma circular" />
		<EnumValue value="3" display_value="Forma ovalada" />
	</UserPref>
	<UserPref name="time" display_name="Tiempo de transición (segundos):" default_value="3"/>
	<UserPref name="auto" display_name="Autoreproducir:" datatype="bool" default_value="true"/>
	<UserPref name="imgs" display_name="Url de las imágenes/vídeos públicos separadas por comas. Max. 5 (Puede utilizar Google Shortener para adicionar hasta 20 imágenes y vínculos):" default_value=""/>
	<UserPref name="lnks" display_name="Vínculos correspondiente a cada imagen separados por comas. (Finalice cada vínculo con #_blank para abrirlo en una nueva pestaña):" default_value=""/>
	<UserPref name="txts" display_name="Descripción de cada imagen separada por comas. Max.100 caracteres por cada una (Se relacionan en el mismo orden en cual se añadieron las imágenes y vínculos):" default_value=""/>
	<Content type="html"><![CDATA[
		<link rel="stylesheet" href="https://googledrive.com/host/0B18yLgsGq8-xfklXcjBuYWk5UGUtRWVDOV9ORGhGRVFhaDFEU1EzeENJcVVjR2R2LS1OTmM/banner.css">
		<?php include('body.xml');?>
		<script src="https://googledrive.com/host/0B18yLgsGq8-xfklXcjBuYWk5UGUtRWVDOV9ORGhGRVFhaDFEU1EzeENJcVVjR2R2LS1OTmM/banner.js"></script>
		]]> 
	</Content>
</Module>
