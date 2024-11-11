from flask import Flask, render_template, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'mysecretkey'
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)


login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    userEmail = db.Column(db.String(50), unique=True, nullable=False)
    userpassword = db.Column(db.String(80), nullable=False)

    def __init__(self, username, userEmail, userpassword):
        self.username = username
        self.userEmail = userEmail
        self.userpassword = userpassword
  
class RegisterForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired(), Length(min=4, max=20)], render_kw={'placeholder': 'Username'})
    userEmail = StringField('Email', validators=[InputRequired()], render_kw={'placeholder': 'E-mail'})
    userpassword = PasswordField('Password', validators=[InputRequired(), Length(min=8, max=20)], render_kw={'placeholder': 'Password'})
    submit = SubmitField('Register')

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError('El nombre de usuario elegido ya esta en uso')

    def validate_email(self, userEmail):
        user = User.query.filter_by(userEmail=userEmail.data).first()
        if user:
            raise ValidationError('El correo elegido ya esta en uso ')
        
class LoginForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired(), Length(min=4, max=20)], render_kw={'placeholder': 'Username'})
    userpassword = PasswordField('Password', validators=[InputRequired(), Length(min=8, max=20)], render_kw={'placeholder': 'Password'})
    submit = SubmitField('Login')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/menu')
def menu():
    return render_template('menu.html')

@app.route('/reservas')
def reservas():
    return render_template('reservas.html')

@app.route('/reseñas')
def reseñas():
    return render_template('reseñas.html')


@app.route('/registro', methods=['GET', 'POST'])  # Especificamos que esta ruta puede manejar tanto GET como POST
def registro():
    register_form = RegisterForm()  # Creamos una instancia del formulario
    if register_form.validate_on_submit():  # Flask-WTF verifica si el formulario fue enviado correctamente
        # Si el formulario es válido, procesamos los datos (por ejemplo, guardar en la base de datos)
        hashed_password = bcrypt.generate_password_hash(register_form.userpassword.data).decode('utf-8')
        new_user = User(username=register_form.username.data, userEmail=register_form.userEmail.data, userpassword=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))  # Redirigimos al login después del registro

    # Si el método es GET o si el formulario no es válido, volvemos a mostrar el formulario vacío
    return render_template('registro.html', form=register_form)



@app.route('/login', methods=['GET', 'POST'])
def login():
    login_form = LoginForm()
    if login_form.validate_on_submit():
        #buscar usuaario por correo electronico
        user = User.query.filter_by(userEmail=login_form.username.data).first()  # Se usa email en lugar de username
        if user and bcrypt.check_password_hash(user.userpassword, login_form.userpassword.data):
            login_user(user)
            return redirect(url_for('dashboard'))  # Redirigir a una página protegida
        else:
            # agregar alerta si el login no funciona
            return render_template('registro.html', form=login_form, error="Credenciales incorrectas")
    
    return render_template('registro.html', form=login_form)

@app.route('/dashboard')
@login_required  #solo los usuarios logueados accedan
def dashboard():
    return render_template('dashboard.html')
    
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

