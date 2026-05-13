from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Region(db.Model):
    __tablename__ = 'region'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200), nullable=False)
    comunas = db.relationship('Comuna', backref='region', lazy=True)


class Comuna(db.Model):
    __tablename__ = 'comuna'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200), nullable=False)
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'), nullable=False)
    miembros = db.relationship('Miembro', backref='comuna', lazy=True)


class Miembro(db.Model):
    __tablename__ = 'miembro'
    id = db.Column(db.Integer, primary_key=True)
    rut = db.Column(db.String(15), nullable=False)
    nombre = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    telefono = db.Column(db.String(15))
    direccion = db.Column(db.String(255))
    tipo = db.Column(
        db.Enum('pregrado', 'postgrado', 'funcionario', 'academico'),
        nullable=False
    )
    fecha_registro = db.Column(db.DateTime, nullable=False)
    comuna_id = db.Column(db.Integer, db.ForeignKey('comuna.id'), nullable=False)
    carrera = db.Column(db.String(255))
    anio_ingreso = db.Column(db.Integer)
    programa = db.Column(db.String(50))
    tutor = db.Column(db.String(255))
    area = db.Column(db.String(255))
    cargo = db.Column(db.String(255))
    jerarquia = db.Column(db.String(50))
    departamento = db.Column(db.String(255))
    actividades = db.relationship('Actividad', backref='miembro', lazy=True)


class Actividad(db.Model):
    __tablename__ = 'actividad'
    id = db.Column(db.Integer, primary_key=True)
    miembro_id = db.Column(db.Integer, db.ForeignKey('miembro.id'), nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    tipo = db.Column(
        db.Enum('arte', 'deporte', 'tecnología', 'social', 'recreación', 'otra'),
        nullable=False
    )
    descripcion = db.Column(db.Text)
    enlace = db.Column(db.String(500))
    dia = db.Column(
        db.Enum('lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'),
        nullable=False
    )
    hora_inicio = db.Column(db.String(5), nullable=False)
    hora_fin = db.Column(db.String(5), nullable=False)
    fotos = db.relationship('Foto', backref='actividad', lazy=True)


class Foto(db.Model):
    __tablename__ = 'foto'
    id = db.Column(db.Integer, primary_key=True)
    ruta_archivo = db.Column(db.String(300), nullable=False)
    nombre_archivo = db.Column(db.String(300), nullable=False)
    actividad_id = db.Column(db.Integer, db.ForeignKey('actividad.id'), nullable=False)
