function sendMessage() {
    const comp1input = document.getElementById('computer1Input');
    const comp2input = document.getElementById('computer2Input');
    comp2input.style.display = 'none';
    document.getElementById('output').textContent = comp1input.value;
}