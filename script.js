document.addEventListener('DOMContentLoaded', () => {
    const userText = document.getElementById('userText');
    const fontSelect = document.getElementById('fontSelect');
    const fontSize = document.getElementById('fontSize');
    const fontColor = document.getElementById('fontColor');
    const preview = document.getElementById('preview');
    const generateImageButton = document.getElementById('generateImageButton');
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

    // تبدیل به عکس و ارائه لینک دانلود
    generateImageButton.addEventListener('click', () => {
        html2canvas(preview, {
            backgroundColor: null, // پس‌زمینه شفاف
            scale: 2, // کیفیت بالاتر
            useCORS: true, // برای لود فونت‌ها
            logging: false // جلوگیری از لاگ اضافی
        }).then(canvas => {
            const url = canvas.toDataURL('image/png');
            downloadAnchor.href = url;
            downloadLink.style.display = 'block';
        }).catch(err => {
            console.error('خطا در تولید عکس: ', err);
            alert('مشکلی در تولید عکس پیش اومد. لطفاً دوباره امتحان کن.');
        });
    });

    // آپدیت اولیه
    updatePreview();
});