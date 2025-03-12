document.addEventListener('DOMContentLoaded', () => {
    const userText = document.getElementById('userText');
    const fontSelect = document.getElementById('fontSelect');
    const fontSize = document.getElementById('fontSize');
    const fontColor = document.getElementById('fontColor');
    const preview = document.getElementById('preview');
    const copyImageButton = document.getElementById('copyImageButton');
    const copyMessage = document.getElementById('copyMessage');
    const downloadLink = document.getElementById('downloadLink');
    const downloadAnchor = document.getElementById('downloadAnchor');

    // آپدیت پیش‌نمایش
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

    // تبدیل به عکس و کپی
    copyImageButton.addEventListener('click', () => {
        html2canvas(preview, {
            backgroundColor: null, // پس‌زمینه شفاف
            scale: 2 // کیفیت بالاتر
        }).then(canvas => {
            // تبدیل کانواس به blob
            canvas.toBlob(blob => {
                // کپی به کلیپ‌بورد
                const item = new ClipboardItem({ 'image/png': blob });
                navigator.clipboard.write([item]).then(() => {
                    copyMessage.style.display = 'block';
                    downloadLink.style.display = 'none';
                    setTimeout(() => {
                        copyMessage.style.display = 'none';
                    }, 2000);
                }).catch(err => {
                    console.error('خطا در کپی: ', err);
                    // در صورت خطا، لینک دانلود نشون داده بشه
                    const url = URL.createObjectURL(blob);
                    downloadAnchor.href = url;
                    downloadLink.style.display = 'block';
                });
            }, 'image/png');
        });
    });

    // آپدیت اولیه
    updatePreview();
});