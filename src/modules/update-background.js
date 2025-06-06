// update-background.js
export function updateBackground(iconName, isDaytime) {
    const background = document.getElementById('background');
    background.classList.add('fade-out');

    setTimeout(() => {
        background.classList.remove(
            "bg-default",
            "bg-day-clear",
            "bg-night-clear",
            "bg-rain",
            "bg-snow",
            "bg-fog"    
        );

        background.classList.add("fade-transition");

        if (iconName.includes("rain")) {
            background.classList.add("bg-rain");
        } else if (iconName.includes("snow")) {
            background.classList.add("bg-snow");
        } else if (iconName.includes("fog")) {
            background.classList.add("bg-fog");
        } else if (iconName.includes("clear")) {
            background.classList.add(isDaytime ? "bg-day-clear" : "bg-night-clear");
        } else {
            background.classList.add(isDaytime ? "bg-day-clear" : "bg-night-clear");
        }

        background.classList.remove('fade-out');    
    }, 300);
}