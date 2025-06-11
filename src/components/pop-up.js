// pop-up.js
export function showPopUp(message, timeOut) {
    const popUp = document.createElement('div');
    popUp.id = 'pop-up';
    popUp.textContent = message;

    document.body.appendChild(popUp);

    setTimeout(() => {
        popUp.remove(); // Clean up after timeout
    }, timeOut);
}