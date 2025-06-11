// pop-up.js
export function renderPopUp(message) {
    const popUp = document.createElement('div');
    popUp.className = 'pop-up';
    popUp.textContent = message;

    return popUp;
}