export function renderSpinner(spinnerContainer) {
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    spinnerContainer.append(spinner);
}
export function hideSpinner(spinnerContainer) {
    spinnerContainer.innerHTML = '';
}