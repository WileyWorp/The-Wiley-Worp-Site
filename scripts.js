// Get the current date and format it as "Month Day, Year"
function getCurrentDate() {
    const currentDate = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return currentDate.toLocaleDateString('en-US', options);
}

// Update the published date of each blog post
function updatePublishedDates() {
    const postDates = document.querySelectorAll('article time');
    postDates.forEach(date => {
        const publishedDate = date.getAttribute('datetime');
        date.textContent = getCurrentDate(publishedDate);
    });
}

// Add an event listener to the window's load event
window.addEventListener('load', () => {
    updatePublishedDates();
});
