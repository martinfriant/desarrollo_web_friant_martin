import os
import re
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, flash
from werkzeug.utils import secure_filename
from sqlalchemy import func
from models import db, Region, Comuna, Miembro, Actividad, Foto

app = Flask(__name__)
app.secret_key = 'k9d2h8fa83b1'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2?charset=utf8mb4'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'static', 'uploads')
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024

EXTENSIONES_PERMITIDAS = {'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'mp4', 'webm', 'ogg', 'mov', 'avi'}
TIPOS_MIEMBRO = ['pregrado', 'postgrado', 'funcionario', 'academico']
TIPOS_ACTIVIDAD = ['arte', 'deporte', 'tecnología', 'social', 'recreación', 'otra']
DIAS_VALIDOS = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']

db.init_app(app)

def extension_permitida(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in EXTENSIONES_PERMITIDAS

def validar_email(email):
    return bool(re.match(r'^[^@\s]+@[^@\s]+\.[^@\s]+$', email))

def validar_telefono(telefono):
    return bool(re.fullmatch(r'\+569\d{8}', telefono))

@app.route('/')
def index():
    ultimos = Miembro.query.order_by(Miembro.fecha_registro.desc()).limit(5).all()
    return render_template('index.html', ultimos=ultimos)

@app.route('/registro', methods=['GET', 'POST'])
def registro():
    regiones = Region.query.order_by(Region.nombre).all()

    anio_actual = datetime.now().year

    if request.method == 'GET':
        return render_template('registro.html', regiones=regiones, errores={}, datos={},
                               horarios=[], anio_actual=anio_actual)

    datos = {
        'rut': request.form.get('rut', '').strip(),
        'nombre': request.form.get('nombre', '').strip(),
        'email': request.form.get('email', '').strip(),
        'telefono': request.form.get('telefono', '').strip(),
        'direccion': request.form.get('direccion', '').strip(),
        'tipo': request.form.get('tipo', '').strip(),
        'carrera': request.form.get('carrera', '').strip(),
        'anio_ingreso': request.form.get('anio-ingreso', '').strip(),
        'programa': request.form.get('programa', '').strip(),
        'tutor': request.form.get('tutor', '').strip(),
        'area': request.form.get('area', '').strip(),
        'cargo': request.form.get('cargo', '').strip(),
        'jerarquia': request.form.get('jerarquia', '').strip(),
        'departamento': request.form.get('departamento', '').strip(),
        'comuna_id': request.form.get('comuna_id', '').strip(),
        'nombre_actividad': request.form.get('nombre-actividad', '').strip(),
        'tipo_actividad': request.form.get('tipo-actividad', '').strip(),
        'descripcion': request.form.get('descripcion', '').strip(),
        'enlace': request.form.get('enlace', '').strip(),
    }

    horario_dias = request.form.getlist('horario_dia[]')
    horario_inicios = request.form.getlist('horario_inicio[]')
    horario_fins = request.form.getlist('horario_fin[]')
    horarios = list(zip(horario_dias, horario_inicios, horario_fins))

    errores = {}

    if not datos['rut']:
        errores['rut'] = 'Falta el RUT'

    if not datos['nombre']:
        errores['nombre'] = 'Ingresa tu nombre'

    if not datos['email']:
        errores['email'] = 'Falta el correo'
    elif not validar_email(datos['email']):
        errores['email'] = 'Correo inválido'

    if datos['telefono'] and not validar_telefono(datos['telefono']):
        errores['telefono'] = 'Formato: +56912345678'

    if not datos['tipo']:
        errores['tipo'] = 'Selecciona un tipo'
    elif datos['tipo'] not in TIPOS_MIEMBRO:
        errores['tipo'] = 'tipo inválido'

    if datos['tipo'] == 'pregrado':
        if not datos['carrera']:
            errores['carrera'] = 'Falta la carrera'
        if not datos['anio_ingreso']:
            errores['anio_ingreso'] = 'Falta año de ingreso'
        else:
            try:
                anio = int(datos['anio_ingreso'])
                if not (2000 <= anio <= anio_actual):
                    errores['anio_ingreso'] = f'Año entre 2000 y {anio_actual}'
            except ValueError:
                errores['anio_ingreso'] = 'Año no válido'

    if datos['tipo'] == 'postgrado':
        if not datos['programa']:
            errores['programa'] = 'Selecciona programa'

    if datos['tipo'] == 'funcionario':
        if not datos['area']:
            errores['area'] = 'Falta el área'
        if not datos['cargo']:
            errores['cargo'] = 'Falta el cargo'

    if datos['tipo'] == 'academico':
        if not datos['jerarquia']:
            errores['jerarquia'] = 'Selecciona la jerarquía'
        if not datos['departamento']:
            errores['departamento'] = 'Falta el departamento'

    if not datos['comuna_id']:
        errores['comuna_id'] = 'Selecciona una comuna'
    else:
        try:
            comuna_id = int(datos['comuna_id'])
            if not db.session.get(Comuna, comuna_id):
                errores['comuna_id'] = 'Comuna no válida'
        except ValueError:
            errores['comuna_id'] = 'Comuna no válida'

    if not datos['nombre_actividad']:
        errores['nombre_actividad'] = 'Falta el nombre de la actividad'
    elif len(datos['nombre_actividad']) > 100:
        errores['nombre_actividad'] = 'Máximo 100 caracteres'

    if not datos['tipo_actividad']:
        errores['tipo_actividad'] = 'Selecciona el tipo de actividad'
    elif datos['tipo_actividad'] not in TIPOS_ACTIVIDAD:
        errores['tipo_actividad'] = 'tipo inválido'

    if not datos['descripcion']:
        errores['descripcion'] = 'Falta la descripción'
    elif len(datos['descripcion']) < 20:
        errores['descripcion'] = 'Mínimo 20 caracteres'

    if not datos['enlace']:
        errores['enlace'] = 'Falta el enlace'
    elif not (datos['enlace'].startswith('http://') or datos['enlace'].startswith('https://')):
        errores['enlace'] = 'URL debe empezar con http:// o https://'

    if not horarios:
        errores['horarios'] = 'Agrega al menos un horario'
    else:
        for i, (dia, inicio, fin) in enumerate(horarios, 1):
            if not dia or dia not in DIAS_VALIDOS:
                errores['horarios'] = f'Horario {i}: día inválido'
                break
            if not inicio or not fin:
                errores['horarios'] = f'Horario {i} incompleto'
                break
            if fin <= inicio:
                errores['horarios'] = f'Horario {i}: la hora fin debe ser mayor que inicio'
                break

    archivos = request.files.getlist('archivos')
    archivos_validos = [f for f in archivos if f.filename]

    if not archivos_validos:
        errores['archivos'] = 'Adjunta al menos un archivo'
    else:
        for archivo in archivos_validos:
            if not extension_permitida(archivo.filename):
                errores['archivos'] = 'Solo se permiten imágenes (jpg, png, gif, webp) o videos (mp4, webm, ogg, mov, avi)'
                break

    if errores:
        return render_template('registro.html', regiones=regiones, errores=errores,
                               datos=datos, horarios=horarios, anio_actual=anio_actual)

    try:
        miembro = Miembro(
            rut=datos['rut'],
            nombre=datos['nombre'],
            email=datos['email'],
            telefono=datos['telefono'] or None,
            direccion=datos['direccion'] or None,
            tipo=datos['tipo'],
            fecha_registro=datetime.now(),
            comuna_id=int(datos['comuna_id']),
            carrera=datos['carrera'] or None,
            anio_ingreso=int(datos['anio_ingreso']) if datos['anio_ingreso'] else None,
            programa=datos['programa'] or None,
            tutor=datos['tutor'] or None,
            area=datos['area'] or None,
            cargo=datos['cargo'] or None,
            jerarquia=datos['jerarquia'] or None,
            departamento=datos['departamento'] or None,
        )
        db.session.add(miembro)
        db.session.flush()

        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        archivos_guardados = []
        for archivo in archivos_validos:
            nombre_seguro = secure_filename(archivo.filename)
            nombre_unico = f"{datetime.now().strftime('%Y%m%d%H%M%S%f')}_{nombre_seguro}"
            ruta_disco = os.path.join(app.config['UPLOAD_FOLDER'], nombre_unico)
            archivo.save(ruta_disco)
            archivos_guardados.append((f'uploads/{nombre_unico}', nombre_seguro))

        primera_actividad_id = None
        for dia, inicio, fin in horarios:
            actividad = Actividad(
                miembro_id=miembro.id,
                nombre=datos['nombre_actividad'],
                tipo=datos['tipo_actividad'],
                descripcion=datos['descripcion'],
                enlace=datos['enlace'] or None,
                dia=dia,
                hora_inicio=inicio,
                hora_fin=fin,
            )
            db.session.add(actividad)
            db.session.flush()
            if primera_actividad_id is None:
                primera_actividad_id = actividad.id

        for ruta, nombre in archivos_guardados:
            db.session.add(Foto(
                ruta_archivo=ruta,
                nombre_archivo=nombre,
                actividad_id=primera_actividad_id,
            ))

        db.session.commit()
        flash('Miembro y actividades registradas!', 'exito')
        return redirect(url_for('index'))

    except Exception as e:
        db.session.rollback()
        errores['general'] = f'Error al guardar: {e}'
        return render_template('registro.html', regiones=regiones, errores=errores,
                               datos=datos, horarios=horarios, anio_actual=anio_actual)


@app.route('/miembros')
def miembros():
    POR_PAGINA = 8
    page = request.args.get('page', 1, type=int)
    tipo = request.args.get('tipo', '')

    query = Miembro.query
    if tipo and tipo in TIPOS_MIEMBRO:
        query = query.filter_by(tipo=tipo)

    paginacion = query.order_by(Miembro.nombre).paginate(
        page=page, per_page=POR_PAGINA, error_out=False
    )
    return render_template('miembros.html', miembros=paginacion.items,
                           paginacion=paginacion, tipo=tipo)


@app.route('/miembros/<int:id>')
def miembro_detalle(id):
    miembro = db.get_or_404(Miembro, id)
    actividades = Actividad.query.filter_by(miembro_id=id).all()
    return render_template('miembro_detalle.html', miembro=miembro, actividades=actividades)


@app.route('/metricas')
def metricas():
    total_miembros = Miembro.query.count()
    total_actividades = Actividad.query.count()

    fila_tipo_miembro = (
        db.session.query(Miembro.tipo, func.count(Miembro.tipo).label('cnt'))
        .group_by(Miembro.tipo)
        .order_by(func.count(Miembro.tipo).desc())
        .first()
    )
    tipo_miembro_frecuente = fila_tipo_miembro[0] if fila_tipo_miembro else '-'

    fila_tipo_actividad = (
        db.session.query(Actividad.tipo, func.count(Actividad.tipo).label('cnt'))
        .group_by(Actividad.tipo)
        .order_by(func.count(Actividad.tipo).desc())
        .first()
    )
    tipo_actividad_frecuente = fila_tipo_actividad[0] if fila_tipo_actividad else '-'

    return render_template(
        'metricas.html',
        total_miembros=total_miembros,
        total_actividades=total_actividades,
        tipo_miembro_frecuente=tipo_miembro_frecuente,
        tipo_actividad_frecuente=tipo_actividad_frecuente,
    )

if __name__ == '__main__':
    app.run(debug=True)
