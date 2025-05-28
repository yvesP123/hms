from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import logging

logger = logging.getLogger(__name__)

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

def index(request):
    return redirect('login')

def login_view(request):
    if request.method == 'POST':
        role = request.POST.get('role')
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        # Validate credentials
        if role in USERS:
            user = USERS[role]
            if user['email'] == email and user['password'] == password:
                # Store user info in session
                request.session['user'] = user
                request.session['role'] = role
                return redirect('dashboard')
            else:
                messages.error(request, 'Invalid email or password')
        else:
            messages.error(request, 'Invalid role selected')
    
    return render(request, 'hms/login.html')

def dashboard(request):
    if 'user' not in request.session:
        return redirect('login')
    
    role = request.session['role']
    user = request.session['user']
    stats = ROLE_STATS.get(role, {})
    
    template_map = {
        'admin': 'hms/admin_dashboard.html',
        'doctor': 'hms/doctor_dashboard.html',
        'accountant': 'hms/accountant_dashboard.html',
        'pharmacist': 'hms/pharmacist_dashboard.html',
        'nurse': 'hms/nurse_dashboard.html',
        'patient': 'hms/patient_dashboard.html',
        'lab': 'hms/lab_dashboard.html'
    }
    
    template = template_map.get(role, 'hms/login.html')
    
    context = {
        'user': user,
        'stats': stats,
        'role': role
    }
    
    return render(request, template, context)

def logout_view(request):
    request.session.flush()
    return redirect('login')

def profile(request):
    if 'user' not in request.session:
        return redirect('login')
    
    user = request.session['user']
    return render(request, 'hms/profile.html', {'user': user})

def settings(request):
    if 'user' not in request.session:
        return redirect('login')
    
    user = request.session['user']
    return render(request, 'hms/settings.html', {'user': user})