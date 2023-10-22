export function showNotification(text) {
    var topNotification = document.getElementById("top-notification");
    topNotification.innerHTML = text;
    topNotification.className = "show";
    setTimeout(function () { topNotification.className = topNotification.className.replace("show", ""); }, 6000);
}

export function cleanAllInputsWithCleanClass(){
    const inputs = document.querySelectorAll(".clean-before-show");
    inputs.forEach((input_element) => {
        input_element.value = '';
    });
}