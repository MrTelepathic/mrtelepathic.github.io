document.addEventListener('DOMContentLoaded', function() {
    // بررسی اینکه در کدام صفحه هستیم
    if (document.getElementById('loginForm')) {
        handleLoginPage();
    } else if (document.querySelector('.admin-panel')) {
        handleAdminPage();
    }
});

// --- منطق صفحه لاگین ---
function handleLoginPage() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // جلوگیری از ارسال فرم

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // نام کاربری و رمز عبور پیش‌فرض - اینها را می‌توانید تغییر دهید
        const correctUsername = "admin";
        const correctPassword = "123";

        if (username === correctUsername && password === correctPassword) {
            // انتقال به صفحه پنل ادمین
            window.location.href = "admin.html";
        } else {
            alert("نام کاربری یا رمز عبور اشتباه است!");
        }
    });
}


// --- منطق صفحه پنل ادمین ---
function handleAdminPage() {
    const fileInput = document.getElementById('fileInput');
    const saveButton = document.getElementById('saveButton');
    let selectedFileContent = null;

    // وقتی کاربر فایلی را انتخاب می‌کند
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                selectedFileContent = e.target.result;
                saveButton.disabled = false; // فعال کردن دکمه ذخیره
            };
            
            reader.readAsText(file); // محتوای فایل را به صورت متن می‌خواند
        } else {
            selectedFileContent = null;
            saveButton.disabled = true; // غیرفعال کردن دکمه اگر فایلی انتخاب نشده باشد
        }
    });

    // وقتی روی دکمه ذخیره کلیک می‌شود
    saveButton.addEventListener('click', function() {
        if (selectedFileContent) {
            // ایجاد یک Blob (یک شیء شبه-فایل) با محتوای خوانده شده
            const blob = new Blob([selectedFileContent], { type: 'text/plain' });
            
            // ایجاد یک لینک موقت برای دانلود فایل
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'sub.txt'; // نام فایل برای دانلود
            
            // شبیه‌سازی کلیک روی لینک برای شروع دانلود
            document.body.appendChild(a);
            a.click();
            
            // حذف لینک موقت
            document.body.removeChild(a);

            alert('فایل با نام sub.txt برای دانلود آماده شد و جایگزین فایل قبلی می‌شود.');
        } else {
            alert('لطفاً ابتدا یک فایل را انتخاب کنید.');
        }
    });
}
