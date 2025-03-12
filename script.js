document.addEventListener('DOMContentLoaded', () => {
    const userText = document.getElementById('userText');
    const fontSelect = document.getElementById('fontSelect');
    const fontSize = document.getElementById('fontSize');
    const fontColor = document.getElementById('fontColor');
    const preview = document.getElementById('preview');
    const copyButton = document.getElementById('copyButton');
    const copyMessage = document.getElementById('copyMessage');

    // آپدیت پیش‌نمایش با هر تغییر
    function updatePreview() {
        const text = userText.value || 'متن اینجا نمایش داده میشه';
        preview.textContent = text;
        preview.style.fontFamily = fontSelect.value;
        preview.style.fontSize = `${fontSize.value}px`;
        preview.style.color = fontColor.value;
    }

    // رویدادهای تغییر
    userText.addEventListener('input', updatePreview);
    fontSelect.addEventListener('change', updatePreview);
    fontSize.addEventListener('input', updatePreview);
    fontColor.addEventListener('change', updatePreview);

    // کپی به کلیپ‌بورد
    copyButton.addEventListener('click', () => {
        const textToCopy = userText.value || '';
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyMessage.style.display = 'block';
            setTimeout(() => {
                copyMessage.style.display = 'none';
            }, 2000);
        }).catch(err => {
            console.error('خطا در کپی: ', err);
        });
    });

    // آپدیت اولیه
    updatePreview();
});