// Buddhist Reading Plans CMS - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Add click handlers for interactive elements
    setupEventListeners();
    
    // Add hover effects and animations
    setupAnimations();
    
    // Initialize any dynamic content
    updateDashboardStats();
}

function setupEventListeners() {
    // User menu dropdown
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.addEventListener('click', toggleUserDropdown);
    }
    
    // Action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', handleActionClick);
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Stat cards click handlers
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', handleStatCardClick);
    });
    
    // Activity items
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
        item.addEventListener('click', handleActivityClick);
    });
}

function setupAnimations() {
    // Add entrance animations for cards
    const cards = document.querySelectorAll('.stat-card, .activity-item');
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

function toggleUserDropdown(event) {
    event.preventDefault();
    
    // Create dropdown if it doesn't exist
    let dropdown = document.querySelector('.user-dropdown');
    if (!dropdown) {
        dropdown = createUserDropdown();
        event.currentTarget.appendChild(dropdown);
    }
    
    // Toggle visibility
    dropdown.classList.toggle('show');
}

function createUserDropdown() {
    const dropdown = document.createElement('div');
    dropdown.className = 'user-dropdown';
    dropdown.innerHTML = `
        <div class="dropdown-item">
            <i class="fas fa-user"></i>
            <span>Profile Settings</span>
        </div>
        <div class="dropdown-item">
            <i class="fas fa-bell"></i>
            <span>Notifications</span>
        </div>
        <div class="dropdown-item">
            <i class="fas fa-cog"></i>
            <span>Preferences</span>
        </div>
        <div class="dropdown-divider"></div>
        <div class="dropdown-item">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
        </div>
    `;
    
    // Add styles
    dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border: 1px solid var(--gray-200);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-modal);
        min-width: 200px;
        z-index: 1000;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.2s ease;
        pointer-events: none;
    `;
    
    return dropdown;
}

function handleActionClick(event) {
    const button = event.currentTarget;
    const action = button.textContent.trim();
    
    // Add loading state
    button.style.opacity = '0.7';
    button.style.pointerEvents = 'none';
    
    // Simulate action
    setTimeout(() => {
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';
        
        // Show notification
        showNotification(`${action} clicked!`, 'info');
    }, 500);
    
    // Handle specific actions
    switch(action) {
        case 'Create New Plan':
            // Navigate to plan creation
            console.log('Navigating to plan creation...');
            break;
        case 'Media Library':
            // Navigate to media library
            console.log('Opening media library...');
            break;
        case 'View All Plans':
            // Navigate to plans list
            console.log('Navigating to plans list...');
            break;
    }
}

function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    console.log('Searching for:', query);
    
    // Add search suggestions (mock)
    if (query.length > 2) {
        showSearchSuggestions(query);
    } else {
        hideSearchSuggestions();
    }
}

function showSearchSuggestions(query) {
    // Mock search suggestions
    const suggestions = [
        'Mindfulness Basics',
        'Buddhist Ethics',
        'Loving Kindness Meditation',
        'Zen Philosophy',
        'Meditation Techniques'
    ].filter(item => item.toLowerCase().includes(query));
    
    console.log('Search suggestions:', suggestions);
}

function hideSearchSuggestions() {
    // Hide suggestions
    console.log('Hiding search suggestions');
}

function handleStatCardClick(event) {
    const card = event.currentTarget;
    const label = card.querySelector('.stat-label').textContent;
    
    // Add click animation
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
        card.style.transform = 'scale(1)';
    }, 150);
    
    // Handle navigation based on card type
    switch(label) {
        case 'My Plans':
            console.log('Navigating to My Plans...');
            break;
        case 'Assigned to Me':
            console.log('Showing assigned plans...');
            break;
        case 'Featured Plans':
            console.log('Showing featured plans...');
            break;
        case 'Total Enrollments':
            console.log('Opening analytics...');
            break;
    }
    
    showNotification(`Opening ${label}...`, 'info');
}

function handleActivityClick(event) {
    const item = event.currentTarget;
    const title = item.querySelector('.activity-title').textContent;
    
    console.log('Activity clicked:', title);
    showNotification('Opening activity details...', 'info');
}

function updateDashboardStats() {
    // Simulate real-time updates
    const statValues = document.querySelectorAll('.stat-value');
    
    // Add counting animation
    statValues.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        animateCounter(stat, 0, finalValue, 1000);
    });
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'info' ? 'var(--primary-blue)' : 'var(--success-green)'};
        color: white;
        padding: 12px 24px;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-modal);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-size: 14px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for dropdown when shown
document.addEventListener('click', function(event) {
    const userMenu = document.querySelector('.user-menu');
    const dropdown = document.querySelector('.user-dropdown');
    
    if (dropdown && !userMenu.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

// Add dynamic styles
const style = document.createElement('style');
style.textContent = `
    .user-dropdown.show {
        opacity: 1 !important;
        transform: translateY(0) !important;
        pointer-events: auto !important;
    }
    
    .dropdown-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        cursor: pointer;
        transition: background-color 0.2s;
        font-size: 14px;
        color: var(--gray-700);
    }
    
    .dropdown-item:hover {
        background-color: var(--gray-50);
    }
    
    .dropdown-item i {
        width: 16px;
        color: var(--gray-500);
    }
    
    .dropdown-divider {
        height: 1px;
        background: var(--gray-200);
        margin: 8px 0;
    }
    
    .stat-card {
        cursor: pointer;
    }
    
    .activity-item {
        cursor: pointer;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease forwards;
    }
`;

document.head.appendChild(style);
