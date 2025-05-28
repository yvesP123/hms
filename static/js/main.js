// Hospital Management System - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize application
    initializeApp();
});

function initializeApp() {
    // Handle login form
    handleLoginForm();
    
    // Handle dashboard interactions
    handleDashboardCards();
    
    // Initialize calendar if present
    initializeCalendar();
    
    // Handle sidebar navigation
    handleSidebarNavigation();
    
    // Handle responsive sidebar
    handleResponsiveSidebar();
}

function handleLoginForm() {
    const loginForm = document.querySelector('form');
    const roleSelect = document.querySelector('select[name="role"]');
    const emailInput = document.querySelector('input[name="email"]');
    
    if (!roleSelect || !emailInput) return;
    
    // Predefined user credentials for demo purposes
    const userCredentials = {
        'admin': {
            email: 'admin@mail.com',
            password: 'Password@123'
        },
        'doctor': {
            email: 'davidmur@mail.com',
            password: 'password123'
        },
        'accountant': {
            email: 'danny@mail.com',
            password: 'acc8520'
        },
        'pharmacist': {
            email: 'campb@mail.com',
            password: 'pharmacist13313'
        },
        'nurse': {
            email: 'barbarajo@mail.com',
            password: 'nurse6990'
        },
        'patient': {
            email: 'marc@mail.com',
            password: 'patient13309'
        },
        'lab': {
            email: 'mrj@mail.com',
            password: 'lab789'
        }
    };
    
    // Auto-fill email when role is selected
    roleSelect.addEventListener('change', function() {
        const selectedRole = this.value;
        if (selectedRole && userCredentials[selectedRole]) {
            emailInput.value = userCredentials[selectedRole].email;
            emailInput.placeholder = userCredentials[selectedRole].email;
        } else {
            emailInput.value = '';
            emailInput.placeholder = 'Enter email address';
        }
    });
    
    // Form validation
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const role = roleSelect.value;
            const email = emailInput.value;
            const password = document.querySelector('input[name="password"]').value;
            
            if (!role) {
                e.preventDefault();
                showAlert('Please select a role', 'error');
                return;
            }
            
            if (!email || !password) {
                e.preventDefault();
                showAlert('Please fill in all fields', 'error');
                return;
            }
        });
    }
}

function handleDashboardCards() {
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    
    dashboardCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardText = this.querySelector('span').textContent.trim();
            handleCardClick(cardText);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        });
    });
}

function handleCardClick(cardName) {
    // Handle different card clicks based on card name
    console.log(`Card clicked: ${cardName}`);
    
    // You can implement specific functionality for each card here
    switch(cardName.toLowerCase()) {
        case 'doctor':
            showNotification('Doctor management feature coming soon');
            break;
        case 'patient':
            showNotification('Patient management feature coming soon');
            break;
        case 'appointment':
            showNotification('Appointment management feature coming soon');
            break;
        case 'prescription':
            showNotification('Prescription management feature coming soon');
            break;
        case 'blood bank':
            showNotification('Blood bank management feature coming soon');
            break;
        case 'medicine':
            showNotification('Medicine management feature coming soon');
            break;
        default:
            showNotification(`${cardName} feature coming soon`);
    }
}

function initializeCalendar() {
    const calendarDates = document.querySelector('.calendar-dates');
    const currentMonth = document.querySelector('.calendar-nav span');
    const prevBtn = document.querySelector('.calendar-nav .btn:first-child');
    const nextBtn = document.querySelector('.calendar-nav .btn:last-child');
    
    if (!calendarDates) return;
    
    let currentDate = new Date();
    
    function updateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Update month display
        if (currentMonth) {
            const monthNames = ["January", "February", "March", "April", "May", "June",
                              "July", "August", "September", "October", "November", "December"];
            currentMonth.textContent = `${monthNames[month]} ${year}`;
        }
        
        // Clear existing dates
        calendarDates.innerHTML = '';
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Add empty cells for days before first day of month
        for (let i = 0; i < firstDay; i++) {
            const emptyDate = document.createElement('div');
            emptyDate.className = 'date';
            calendarDates.appendChild(emptyDate);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateElement = document.createElement('div');
            dateElement.className = 'date';
            dateElement.textContent = day;
            
            // Highlight current day
            const today = new Date();
            if (year === today.getFullYear() && 
                month === today.getMonth() && 
                day === today.getDate()) {
                dateElement.style.backgroundColor = '#28a745';
                dateElement.style.color = 'white';
                dateElement.style.fontWeight = 'bold';
            }
            
            calendarDates.appendChild(dateElement);
        }
    }
    
    // Navigation event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendar();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateCalendar();
        });
    }
    
    // Initialize calendar
    updateCalendar();
}

function handleSidebarNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Handle navigation based on the clicked item
            const itemText = this.textContent.trim();
            console.log(`Navigation clicked: ${itemText}`);
            
            // You can implement page switching logic here
            handleNavigation(itemText);
        });
    });
}

function handleNavigation(navItem) {
    // Handle different navigation items
    switch(navItem.toLowerCase()) {
        case 'dashboard':
            showNotification('You are already on the dashboard');
            break;
        case 'profile':
            showNotification('Profile page coming soon');
            break;
        case 'settings':
            showNotification('Settings page coming soon');
            break;
        default:
            showNotification(`${navItem} page coming soon`);
    }
}

function handleResponsiveSidebar() {
    // Handle responsive sidebar for mobile devices
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth <= 768) {
        // Add mobile sidebar functionality
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && window.innerWidth <= 768) {
                // Hide sidebar when clicking outside on mobile
                sidebar.style.transform = 'translateX(-100%)';
            }
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && sidebar) {
            sidebar.style.transform = 'translateX(0)';
        }
    });
}

function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert at the top of the form or page
    const form = document.querySelector('form');
    const container = form || document.querySelector('.login-panel') || document.body;
    
    if (container) {
        container.insertBefore(alert, container.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }
}

function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        font-size: 14px;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Utility functions
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Export functions for external use if needed
window.HMS = {
    showNotification,
    showAlert,
    handleCardClick,
    formatDate,
    validateEmail
};
