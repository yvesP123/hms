import os
import logging
from flask import Flask, render_template, request, redirect, url_for, session, flash

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create the app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "hospital-management-secret-key")

# User credentials for different roles
USERS = {
    'admin': {
        'email': 'admin@mail.com',
        'password': 'Password@123',
        'role': 'admin',
        'name': 'Admin User'
    },
    'doctor': {
        'email': 'davidmur@mail.com',
        'password': 'password123',
        'role': 'doctor',
        'name': 'Dr. David Murray'
    },
    'accountant': {
        'email': 'danny@mail.com',
        'password': 'acc8520',
        'role': 'accountant',
        'name': 'Danny Williams'
    },
    'pharmacist': {
        'email': 'campb@mail.com',
        'password': 'pharmacist13313',
        'role': 'pharmacist',
        'name': 'Campbell Johnson'
    },
    'nurse': {
        'email': 'barbarajo@mail.com',
        'password': 'nurse6990',
        'role': 'nurse',
        'name': 'Barbara Johnson'
    },
    'patient': {
        'email': 'marc@mail.com',
        'password': 'patient13309',
        'role': 'patient',
        'name': 'Marc Patient'
    },
    'lab': {
        'email': 'mrj@mail.com',
        'password': 'lab789',
        'role': 'lab',
        'name': 'Mr. Johnson Lab'
    }
}

# Statistics data for each role
ROLE_STATS = {
    'admin': {'Doctor': 13, 'Patient': 15, 'Nurse': 17, 'Pharmacist': 4, 'Laboratorist': 6, 'Accountant': 5},
    'doctor': {'Doctor': 13, 'Patient': 15, 'Nurse': 17, 'Pharmacist': 4, 'Laboratorist': 6, 'Accountant': 5},
    'accountant': {'Doctor': 13, 'Patient': 15, 'Nurse': 17, 'Pharmacist': 4, 'Laboratorist': 6, 'Accountant': 5},
    'pharmacist': {'Doctor': 13, 'Patient': 15, 'Nurse': 17, 'Pharmacist': 4, 'Laboratorist': 6, 'Accountant': 5},
    'nurse': {'Doctor': 13, 'Patient': 15, 'Nurse': 17, 'Pharmacist': 4, 'Laboratorist': 6, 'Accountant': 5},
    'patient': {'Doctor': 13, 'Patient': 15, 'Nurse': 17, 'Pharmacist': 4, 'Laboratorist': 6, 'Accountant': 5},
    'lab': {'Doctor': 13, 'Patient': 15, 'Nurse': 17, 'Pharmacist': 4, 'Laboratorist': 6, 'Accountant': 5}
}

@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        role = request.form.get('role')
        email = request.form.get('email')
        password = request.form.get('password')
        
        # Validate credentials
        if role in USERS:
            user = USERS[role]
            if user['email'] == email and user['password'] == password:
                session['user'] = user
                session['role'] = role
                return redirect(url_for('dashboard'))
            else:
                flash('Invalid email or password', 'error')
        else:
            flash('Invalid role selected', 'error')
    
    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect(url_for('login'))
    
    role = session['role']
    user = session['user']
    stats = ROLE_STATS.get(role, {})
    
    template_map = {
        'admin': 'admin_dashboard.html',
        'doctor': 'doctor_dashboard.html',
        'accountant': 'accountant_dashboard.html',
        'pharmacist': 'pharmacist_dashboard.html',
        'nurse': 'nurse_dashboard.html',
        'patient': 'patient_dashboard.html',
        'lab': 'lab_dashboard.html'
    }
    
    template = template_map.get(role, 'login.html')
    
    return render_template(template, user=user, stats=stats, role=role)

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
