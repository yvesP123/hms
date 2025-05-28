from app import app
from flask import render_template, session, redirect, url_for

@app.route('/profile')
def profile():
    if 'user' not in session:
        return redirect(url_for('login'))
    
    user = session['user']
    return render_template('profile.html', user=user)

@app.route('/settings')
def settings():
    if 'user' not in session:
        return redirect(url_for('login'))
    
    user = session['user']
    return render_template('settings.html', user=user)
