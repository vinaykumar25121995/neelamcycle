document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon (optional)
            if (navLinks.classList.contains('active')) {
                hamburger.innerHTML = '&#10005;'; // Close icon
            } else {
                hamburger.innerHTML = '&#9776;'; // Hamburger icon
            }
        });
    }

    // Set Active State on Navigation Links
    const currentLocation = location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentLocation) {
            item.classList.add('active');
        }
    });

    // Form Submission Handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            
            if (btn) {
                const originalText = btn.textContent;
                btn.textContent = 'Submitting...';
                btn.disabled = true;
                
                // If form has an action (like FormSubmit), send AJAX request
                if (form.getAttribute('action')) {
                    const formData = new FormData(form);
                    
                    fetch(form.getAttribute('action'), {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        btn.textContent = 'Submitted Successfully!';
                        btn.style.backgroundColor = '#10B981'; // Success green
                        form.reset();
                        
                        setTimeout(() => {
                            btn.textContent = originalText;
                            btn.disabled = false;
                            btn.style.backgroundColor = '';
                        }, 3000);
                    })
                    .catch(error => {
                        btn.textContent = 'Error! Please try again.';
                        btn.style.backgroundColor = '#ef4444'; // Red error
                        console.error('Error submitting form:', error);
                        
                        setTimeout(() => {
                            btn.textContent = originalText;
                            btn.disabled = false;
                            btn.style.backgroundColor = '';
                        }, 3000);
                    });
                } else {
                    // Fallback Mock for forms without action
                    setTimeout(() => {
                        btn.textContent = 'Submitted Successfully!';
                        btn.style.backgroundColor = '#10B981'; // Success green
                        form.reset();
                        
                        setTimeout(() => {
                            btn.textContent = originalText;
                            btn.disabled = false;
                            btn.style.backgroundColor = '';
                        }, 3000);
                    }, 1500);
                }
            }
        });
    });

    // Simple smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.innerHTML = '&#9776;';
                }
            }
        });
    });

    // Toggle detailed specs for Passenger E-Rickshaw
    const togglePassengerSpecs = document.getElementById('toggle-passenger-specs');
    const passengerHiddenSpecs = document.getElementById('passenger-hidden-specs');

    if (togglePassengerSpecs && passengerHiddenSpecs) {
        togglePassengerSpecs.addEventListener('click', () => {
            if (passengerHiddenSpecs.style.display === 'none') {
                passengerHiddenSpecs.style.display = 'block';
                togglePassengerSpecs.textContent = 'Hide Detailed Specs';
            } else {
                passengerHiddenSpecs.style.display = 'none';
                togglePassengerSpecs.textContent = 'View Detailed Specs';
            }
        });
    }

    // Toggle detailed specs for Cargo E-Rickshaw
    const toggleCargoSpecs = document.getElementById('toggle-cargo-specs');
    const cargoHiddenSpecs = document.getElementById('cargo-hidden-specs');

    if (toggleCargoSpecs && cargoHiddenSpecs) {
        toggleCargoSpecs.addEventListener('click', () => {
            if (cargoHiddenSpecs.style.display === 'none') {
                cargoHiddenSpecs.style.display = 'block';
                toggleCargoSpecs.textContent = 'Hide Detailed Specs';
            } else {
                cargoHiddenSpecs.style.display = 'none';
                toggleCargoSpecs.textContent = 'View Detailed Specs';
            }
        });
    }

    // Floating Phone Button Logic
    const floatingPhoneBtn = document.getElementById('floating-phone-btn');
    if (floatingPhoneBtn) {
        floatingPhoneBtn.addEventListener('click', (e) => {
            if (!floatingPhoneBtn.classList.contains('expanded')) {
                e.preventDefault(); // Prevent dialing on first click
                floatingPhoneBtn.classList.add('expanded');
            }
        });
    }
});

// Google Translate Toggle Language
window.toggleLanguage = function(e) {
    if (e) e.preventDefault();
    var select = document.querySelector('select.goog-te-combo');
    if (select) {
        select.value = select.value === 'hi' ? 'en' : 'hi';
        select.dispatchEvent(new Event('change'));
    } else {
        setTimeout(function() { window.toggleLanguage(e); }, 500);
    }
};
