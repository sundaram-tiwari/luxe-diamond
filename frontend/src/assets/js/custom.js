/* Wow Js */
new WOW().init();

//Loader
jQuery(document).ready(function() {
    $('.loader').fadeOut("slow");
});


// email subscribe model
$(window).on('load', function() {
    $('#emailSubscribe').modal('show');
});


// Admin Panel sidebar
window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('cat|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('cat-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('cat-sidenav-toggled');
            localStorage.setItem('cat|sidebar-toggle', document.body.classList.contains('cat-sidenav-toggled'));
        });
    }
});