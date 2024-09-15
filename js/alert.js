document.addEventListener("DOMContentLoaded", () => {
    fetch('json/alert.json')
        .then(response => response.json())
        .then(data => {
            const notification = document.querySelector('.notification');
            if (data.alertActive) {
                notification.style.backgroundColor = data.backgroundColor;
                notification.style.color = data.fontColor;
                notification.innerHTML = data.text; // Insert HTML directly from JSON
                notification.style.display = 'block'; // Show the notification
            } else {
                notification.style.display = 'none'; // Hide the notification
            }
        })
        .catch(error => console.error('Error fetching alert.json:', error));
});
