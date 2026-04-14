# Decisiones de diseño

Este archivo markdown contiene informacion sobre las decisiones de diseño consideradas al realizar este codigo.

## HTML:

### index.html:

Este es nuestro homepage, se crea un ***header*** que repetiremos en los otros archivos ***html***. Este header contiene nuestro navbar, una lista con referencias a los otros archivos.

Posteriormente en ***main***, se define la clase ***contentedor*** para estilizarla en el css, en este contenedor, hay 2 secciones, una para un texto que introduce al usuario a la funcionalidad de la pagina, y otra que contiene accesos rapidas a las funcionalidades explicadas previamente.

Los accesos rapidos son hiperviculos contenidos en otra clase ***tarjeta***, que permite ordernarlos horizontalmente y que esten dentro de rectangulos regulares.

Finalmente agrego un ***footer*** para estilizar la pagina.

### registro.html:

Este archivo contiene el ***navbar*** previamente mencionado.
Luego en ***main***, se utiliza un ***contenedor*** para ordernar en el nuestro ***form-registro***.

El ***form-registro*** esta compuesto de ***fieldsets*** que separan los datos que se le piden al usuario; Datos personales, Tipo de miembro y Datos Especificos por miembro. 

Los espacios especificos con los que interactua el usuario son manejados por la clase ***campo***. 

En registro tambien se crean y utilizan las clases ***aviso***, ***obligatorio***, ***opcional***, ***oculto***, ***mensaje-error*** y ***btn primario***.

### actividades.html:

El ***main*** de este archivo es similar al anterior, contiene el ***form-actividad***.

El form se maneja practicamente igual que el anterior, exceptuando el fieldset de horarios. Que contiene el id ***"lista-horarios"***, la funcionalidad de esta lista se maneja dentro del archivo js, considere que era lo apropiado para mantener la simplicidad del html.

Se agregan algunos botones para poder manejar los clicks del usuario al agregar archivos, horarios y mandar el form.

### miembros.html:

El ***contenedor*** principal de este archivo (Listados de miembros), contiene dos secciones; Filtrar y Tabla.

Filtrar esta contenido en la clase ***controles***, dentro de esta utilizo ***campo*** para entregarle una lista al usuario sobre la cual eligira algun tipo de miembro.

Tabla es una distribucion en forma de tabla, las filas son manejadas por el js de forma dinamica, segun el filtro escogido.

La cantidad de filas que se generan esta limitada para que no se use todo el espacio en pantalla del usuario, por esto, se agrega un clase nav ***paginacion***, que permite cambiar los datos mostrados en la tabla.

### metricas.html:

***contenedor*** main contiene una seccion con el resumen general de los indicadores, la idea es que sea un dash-board con datos importantes.

Se crea la clase ***resumen-indicadores***, que dentro de ella contiene multiples clases ***indicador***, estos indicadores contienen los datos relevantes asociados estadisiticas de los datos recibidos con el form.

Ademas se crean las clases ***numero*** y ***etiqueta***, para estilizar los parrafos de estos indicadores.

## JS:

### registro.js:

El javascript de registro contiene dos funcionalidades importantes; Manejar los datos que se solicitan segun la eleccion del tipo de miembro y validar el formulario.

Previamente en el form, los fieldset con id ***"campos-pregado"*** y sus pares, contienen la clase ***oculto***. Dependiendo de la eleccion del usuario esta clase se elimina del fieldset, y se le muestra al usuario.

Se definen diferentes funciones para validar los datos introducidos por el usuarios, las validaciones son debiles y pueden ser escaladas, ademas de funciones que permiten mostrar errores en el formulario al usuario.

Si el formulario es correcto, entonces se resetean los fields del formulario, asi como los estados originales ocultos de los fieldsets relacionados a la informacion especifica de un tipo de usuario.

### actividades.js

Este archivo contienen la logica para agregar y eliminar bloques de horario dinamicamente, para esto se inicia un bloque de horarios vacio por defecto al cargar la pagina.

La idea es que los horarios de la actividad puedan ser manejados de manera independiente el uno del otro, asi en caso de una actividad con multiples horarios, se pueden editar/eliminar de manera sencilla.

Ademas se realizan validaciones respecto a los bloques de horarios y a los archivos entregados.

Si las validaciones son correctas se resetea el formulario y el contador de horarios.

### miembros.js:

Este archivo contiene datos simulados, para poder testear las funcionalidades que se esperan de la tabla.

Como se menciona en *miembros.html* este javascript se encarga de configurar como se muestran las filas de datos al usuario. Por tanto, se define la funcion filtrar miembros, que permite mostrar unicamente los miembros que son del tipo seleccionado.

Para renderizar la tabla se define la funcion *renderizarTabla()*, que lee la variable ***paginaActual*** de la pagina para saber que pagina hay que mostrar, esto lo hace a traves de la clase nav ***paginacion***. Finalmente se agregan acciones para los botones definidos en el html del mismo nombre

### metricas.js: 

Este archivo contiene datos simulados de miembros y actividades, para poder testear las funcionalidades del dashboard. Se define la funcion generica ***contarPorCampo(array, campo)***, que permite contar las ocurrencias de cada valor en un campo especifico de cualquier arreglo, evitando duplicar logica entre miembros y actividades. 

A partir de este conteo, ***valorMasFrecuente()*** determina el valor con mayor ocurrencia. Los indicadores se calculan y renderizan directamente al cargar la pagina, sin requerir interaccion del usuario