window.addEventListener('load', function() {
    setTimeout(function() {
        const inputElement = document.querySelector('input, textarea, [contenteditable]');
        if (inputElement) {
            inputElement.focus();
        } else {
            document.body.focus();
        }
    }, 0);
});
