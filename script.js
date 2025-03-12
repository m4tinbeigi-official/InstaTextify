document.addEventListener('DOMContentLoaded', () => {
    const userText = document.getElementById('userText');
    const fontSelect = document.getElementById('fontSelect');
    const fontSize = document.getElementById('fontSize');
    const fontColor = document.getElementById('fontColor');
    const preview = document.getElementById('preview');
    const copyImageButton = document.getElementById('copyImageButton');
    const downloadImageButton = document.getElementById('downloadImageButton');
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

    // تابع مشترک برای تولید تصویر
    function generateImage(callback) {
        html2canvas(preview, {
            backgroundColor: null, // پس‌زمینه شفاف
            scale: 2, // کیفیت بالاتر
            useCORS: true, // برای لود فونت‌ها
            logging: false
        }).then(canvas => {
            canvas.toBlob(blob => {
                callback(blob, canvas.toDataURL('image/png'));
            }, 'image/png');
        }).catch(err => {
            console.error('خطا در تولید عکس: ', err);
            alert('مشکلی در تولید عکس پیش اومد. لطفاً دوباره امتحان کن.');
        });
    }

    // کپی به کلیپ‌بورد
    copyImageButton.addEventListener('click', () => {
        generateImage((blob, url) => {
            const item = new ClipboardItem({ 'image/png': blob });
            navigator.clipboard.write([item]).then(() => {
                copyMessage.style.display = 'block';
                downloadLink.style.display = 'none';
                setTimeout(() => {
                    copyMessage.style.display = 'none';
                }, 2000);
            }).catch(err => {
                console.error('خطا در کپی: ', err);
                downloadAnchor.href = url;
                downloadLink.style.display = 'block';
            });
        });
    });

    // دانلود عکس
    downloadImageButton.addEventListener('click', () => {
        generateImage((blob, url) => {
            downloadAnchor.href = url;
            downloadAnchor.click(); // دانلود خودکار
            downloadLink.style.display = 'none';
        });
    });

    // آپدیت اولیه
    updatePreview();
});