document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
    const sidebarIsOpen = document.getElementById('sidebar').classList.contains('open-sidebar');
    localStorage.setItem('sidebarOpen', document.getElementById('sidebar').classList.contains('open-sidebar'));
});

function setActiveItem(event) {
   
    document.querySelectorAll('.side-item').forEach(item => {
        item.classList.remove('active');
    });
    
    event.currentTarget.classList.add('active');

    localStorage.setItem('activeItem', event.currentTarget.id);
}

document.querySelectorAll('.side-item').forEach(item => {
    item.addEventListener('click', setActiveItem);
});

window.onload = function() {
    const activeItem = localStorage.getItem('activeItem');
    const sidebarOpen = localStorage.getItem('sidebarOpen') === 'true';

    document.querySelectorAll('.side-item').forEach(item => {
    item.classList.remove('active');
    });

    if (activeItem) {
        document.getElementById(activeItem).classList.add('active');
    }
    if (sidebarOpen) {
        document.getElementById('sidebar').classList.add('open-sidebar');
    }
};




