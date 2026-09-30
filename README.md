# huyhn1119.github.io

Portfolio cá nhân của Hà Nam Huy · Merchandise Planning & Supply Manager.
Site tĩnh (HTML, CSS, JS thuần), song ngữ VI/EN, chạy trên GitHub Pages.

## Cấu trúc

| File | Nội dung |
| --- | --- |
| `index.html` | Trang chủ: Hero, con số chính, 5 nguyên tắc, cách làm việc, dự án (tab), về tôi, liên hệ |
| `case-ibp.html` | Case 1 · IBP 5 bước + dự báo ML (TORANO) |
| `case-fulfillment.html` | Case 2 · Thiết kế lại luồng kho vận (TORANO) |
| `case-spx.html` | Case 3 · Vận hành cao điểm 4 SOC (SPX Express) |
| `case-lgv.html` | Case 4 · VRP và milk-run (LGV) |
| `style.css` | Toàn bộ giao diện; màu và font khai báo một lần ở `:root` |
| `main.js` | Chuyển ngôn ngữ, tab dự án, nút chép email |
| `portrait.jpg` | Ảnh chân dung |

## Sửa nội dung

Mỗi đoạn chữ có hai bản đặt cạnh nhau:

```html
<span class="vi">Chữ tiếng Việt</span><span class="en">English text</span>
```

Sửa bản nào thì sửa trong thẻ `class="vi"` hoặc `class="en"`. Trang mở mặc định bằng tiếng Việt.

## Thêm file CV

1. Tải file PDF lên thư mục gốc của repo, đặt tên `HaNamHuy-CV-VI.pdf`.
2. Trong `index.html`, tìm dòng `To offer the CV` và bỏ cặp `<!--` `-->` bao quanh nút "Tải CV".

Lưu ý: file CV trên site công khai ai cũng tải được, nên cân nhắc trước khi để số điện thoại, ngày sinh và tên người tham chiếu trong bản PDF này.

## Xuất bản

Repo tên `huyhn1119.github.io` là user site của tài khoản `HuyHN1119`. GitHub Pages xuất bản từ nhánh `main`, thư mục gốc (Settings → Pages).
