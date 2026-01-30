# JavaScript Cơ Bản Cho Todo App (React Native – Beginner)

> Mục tiêu của phần này:
> - Hiểu dữ liệu Todo được lưu như thế nào
> - Hiểu cách React Native xử lý danh sách
> - Chuẩn bị nền tảng để làm Add / Toggle / Delete Todo

---

## 1. Array & Object – Nền tảng dữ liệu của Todo App

### Vì sao cần học?
Trong Todo App:
- **Mỗi công việc** là một **object**
- **Danh sách công việc** là một **array các object**

Nếu không hiểu array & object:
- Bạn sẽ không hiểu todo được lưu ở đâu
- Không biết toggle / delete hoạt động thế nào
- Không đọc nổi code React Native

---

### Object là gì trong Todo App?
- Object đại diện cho **1 todo**
- Chứa toàn bộ thông tin của todo đó

Một todo cần hiểu rõ các thuộc tính:
- `id`: để phân biệt các todo
- `title`: nội dung chính (bắt buộc)
- `description`: mô tả (không bắt buộc)
- `status` / `done`: trạng thái hoàn thành

👉 Tư duy quan trọng:
- **Không thao tác trực tiếp trên UI**
- **Luôn thao tác trên object trước, UI tự cập nhật**

---

### Array là gì trong Todo App?
- Array là nơi lưu **toàn bộ danh sách todo**
- React Native render giao diện dựa trên array này

👉 Tư duy quan trọng:
- Thêm todo = thêm phần tử vào array
- Xoá todo = loại phần tử khỏi array
- Toggle todo = cập nhật phần tử trong array

---

### THỰC HÀNH – Array & Object
- Viết ra cấu trúc dữ liệu cho 1 todo
- Viết ra danh sách 3–5 todo giả
- Xác định:
  - Thuộc tính nào là bắt buộc
  - Thuộc tính nào là optional
- Tự hỏi:
  - Khi bấm xoá → todo biến mất ở đâu?
  - Khi bấm done → thuộc tính nào thay đổi?

---

## 2. Arrow Function – Cách viết hàm trong React Native

### Vì sao cần học?
React Native:
- Gần như **100% logic dùng arrow function**
- Event (onPress, onChangeText) đều dùng arrow function

Nếu không quen:
- Bạn sẽ không hiểu callback
- Không hiểu vì sao hàm được gọi khi bấm nút

---

### Arrow function dùng để làm gì trong Todo App?
Arrow function dùng để:
- Xử lý sự kiện (bấm nút, nhập text)
- Thao tác với todo list
- Truyền logic từ component cha xuống component con

👉 Tư duy quan trọng:
- **Hàm = hành động của người dùng**
- Người dùng bấm → arrow function chạy

---

### THỰC HÀNH – Arrow Function
- Viết các hành động bằng lời:
  - Thêm todo
  - Xoá todo
  - Toggle trạng thái
- Với mỗi hành động, xác định:
  - Cần nhận tham số gì? (id, title, description)
  - Hàm này sẽ tác động tới **todo nào**
- Tập đọc code:
  - Khi thấy `() => ...` → hiểu là “khi người dùng làm gì đó”

---

## 3. map() – Cập nhật Todo (Toggle Status)

### Vì sao cần học?
Trong Todo App:
- Bạn **không bao giờ** sửa trực tiếp 1 todo
- Mỗi lần thay đổi → tạo **danh sách mới**

👉 map() là công cụ:
- Duyệt từng todo
- Chỉ sửa todo cần sửa
- Giữ nguyên todo còn lại

---

### map() hoạt động thế nào trong Todo App?
- Đi qua từng todo trong danh sách
- So sánh `id`
- Nếu đúng todo cần sửa → tạo object mới
- Nếu không → giữ nguyên

👉 map() dùng cho:
- Toggle done / not done
- Update title, description (sau này)

---

### THỰC HÀNH – map()
- Vẽ sơ đồ:
  - Danh sách todo cũ
  - Danh sách todo mới
- Xác định:
  - Todo nào bị thay đổi?
  - Todo nào giữ nguyên?
- Tập đọc logic:
  - “Nếu id trùng → thay đổi”
  - “Nếu không trùng → giữ nguyên”

---

## 4. filter() – Xoá Todo

### Vì sao cần học?
Xoá todo:
- Không phải “xoá trên UI”
- Mà là **loại bỏ phần tử khỏi array**

👉 filter() giúp:
- Giữ lại những todo hợp lệ
- Loại bỏ todo cần xoá

---

### filter() hoạt động thế nào?
- Duyệt qua từng todo
- Kiểm tra điều kiện
- Todo nào **không thoả điều kiện** → bị loại

👉 filter() dùng cho:
- Delete todo
- Filter theo status (done / not done – nâng cao)

---

### THỰC HÀNH – filter()
- Viết ra danh sách todo ban đầu
- Chọn 1 todo cần xoá
- Xác định:
  - Todo nào bị loại?
  - Todo nào còn lại?
- Tập suy nghĩ:
  - “Xoá” = “không đưa vào danh sách mới”

---

## 5. Tư duy quan trọng: Không mutate dữ liệu

### Vì sao React bắt buộc?
- React chỉ render lại khi **dữ liệu mới**
- Nếu sửa trực tiếp → React không nhận ra

👉 Nguyên tắc:
- ❌ Không sửa trực tiếp array / object
- ✅ Luôn tạo array / object mới

---

### THỰC HÀNH – Tư duy immutable
- Với mỗi hành động (add, toggle, delete):
  - Hỏi: “Danh sách mới trông như thế nào?”
- Không nghĩ:
  - “Sửa todo này”
- Mà nghĩ:
  - “Tạo danh sách todo mới”

---

## 6. Tổng kết phần JavaScript cho Todo App

### Bạn cần nắm chắc
- Object = 1 todo
- Array = danh sách todo
- Arrow function = hành động người dùng
- map() = cập nhật todo
- filter() = xoá todo

---

## 7. Khi nào bạn sẵn sàng học tiếp React Native?
Bạn đã sẵn sàng khi:
- Nhìn vào danh sách todo và hiểu dữ liệu
- Biết toggle / delete ảnh hưởng tới đâu
- Không còn sợ `map()` và `filter()`

👉 **Bước tiếp theo đề xuất:**
- `useState` & cách React quản lý state
- Props & TodoItem component
