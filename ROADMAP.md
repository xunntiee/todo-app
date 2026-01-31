# 🚀 Roadmap Chi Tiết: Xây Dựng Todo & Habit Tracker App (React Native)

Chào bạn! Với vai trò là người mới bắt đầu, lộ trình này được thiết kế để giúp bạn không bị "ngợp" bằng cách chia nhỏ các kiến thức cần học theo từng giai đoạn thực chiến.

---

## 🟢 PHẦN 1: KIẾN THỨC CẦN HỌC TRƯỚC (PREREQUISITES)

Trước khi chạm vào React Native, bạn cần nắm vững "vũ khí" JavaScript và tư duy React.

### 1. JavaScript (ES6+) - Nền tảng quan trọng nhất

Đừng học hết JavaScript, chỉ cần tập trung vào các phần này cho dự án Todo:

- **Object & Array:** Cách lưu dữ liệu 1 Todo (Object) và Danh sách Todo (Array).
- **Arrow Functions:** Cách viết hàm xử lý khi bấm nút (onPress).
- **Array Methods:**
  - `map()`: Để hiển thị danh sách và Update trạng thái todo.
  - `filter()`: Để Xóa todo khỏi danh sách.
- **Destructuring:** Giúp code sạch hơn khi lấy dữ liệu từ Object.

### 2. React Core Concepts

- **JSX:** Cách viết giao diện giống HTML trong JavaScript.
- **State (`useState`):** Để lưu danh sách Todo. Khi State thay đổi, màn hình tự cập nhật.
- **Props:** Cách truyền dữ liệu từ màn hình Danh sách xuống từng Item Todo nhỏ.
- **Component:** Chia nhỏ giao diện (Vd: `TodoItem.tsx`, `Header.tsx`).

---

## 🟡 PHẦN 2: LỘ TRÌNH XÂY DỰNG DỰ ÁN (BUILDING STEPS)

Dưới đây là các bước thực hiện chi tiết cho yêu cầu của bạn:

### Bước 1: Setup Giao diện & Core Components

- **Học:** `View`, `Text`, `StyleSheet`, `SafeAreaView`.
- **Làm:** Tạo 2 file màn hình trống: `TodoListScreen.tsx` và `AddTodoScreen.tsx`. Thử tạo 1 "Card" hiển thị 1 Todo mẫu bằng `StyleSheet`.

### Bước 2: Hiển thị Danh sách (List)

- **Học:** `FlatList` (Tốt hơn `ScrollView` vì nó mượt hơn khi danh sách dài).
- **Làm:** Sử dụng `mock_data` để render danh sách Todo lên màn hình. Mỗi Todo có: Title, Description, Status.

### Bước 3: Điều hướng màn hình (Navigation)

- **Học:** `@react-navigation/native` và `@react-navigation/stack`.
- **Làm:** Cài đặt thư viện, tạo Stack Navigator để chuyển qua lại giữa màn hình "Danh sách" và "Thêm mới".

### Bước 4: Chức năng Thêm mới & Validation (Form)

- **Học:** `TextInput`, `Button`, và Logic Validate (If/Else).
- **Làm:**

* Tại màn hình 2: Tạo ô nhập Title và Description.
* Viết logic kiểm tra: Nếu Title rỗng -> Hiện cảnh báo (Alert) -> Không cho lưu.
* Nếu hợp lệ -> Gọi hàm thêm Todo.

### Bước 5: Logic Toggle & Xóa (Interaction)

- **Học:** `Alert.alert()` (Để làm Modal confirm xóa).
- **Làm:**

* **Toggle:** Khi bấm vào Todo -> Dùng `map()` để đổi `isDone: true <-> false`.
* **Delete:** Khi bấm nút Xóa -> Hiện Modal `Confirm?` -> Nếu OK thì dùng `filter()` để loại bỏ Todo đó.

### Bước 6: Quản lý trạng thái Global (State Management)

- **Học:** `Zustand` (Khuyên dùng cho người mới vì cực kỳ dễ hiểu hơn Redux).
- **Làm:** Tạo 1 "Store" chung để lưu danh sách Todo. Nhờ đó, khi bạn Thêm ở màn hình 2, màn hình 1 sẽ tự cập nhật ngay lập tức.

### Bước 7: Lưu trữ lâu dài (Local Storage)

- **Học:** `AsyncStorage` (hoặc MMKV).
- **Làm:** Lưu danh sách Todo xuống bộ nhớ máy. Khi tắt app mở lại, dữ liệu vẫn còn đó.

---

## 🔵 PHẦN 3: YÊU CẦU KỸ THUẬT CỤ THỂ (Dành cho bạn)

| Tính năng           | Thành phần cần dùng                   | Lưu ý cho người mới                                           |
| :------------------ | :------------------------------------ | :------------------------------------------------------------ |
| **Màn 1: Hiển thị** | `FlatList`                            | Nên chia nhỏ component `TodoItem` để dễ quản lý.              |
| **Màn 2: Thêm mới** | `TextInput`, `useState`               | Dùng `trim()` khi validate title để tránh nhập toàn dấu cách. |
| **Toggle Status**   | `isDone ? "Strikethrough" : "Normal"` | Dùng Style conditional để gạch ngang text khi xong.           |
| **Delete Todo**     | `Alert.alert`                         | Luôn hỏi người dùng trước khi thực hiện hành động hủy diệt.   |
| **Lưu dữ liệu**     | `useEffect`                           | Tự động Save mỗi khi danh sách Todo thay đổi.                 |

---

## 🚩 GỢI Ý CÁC THƯ VIỆN NÊN DÙNG (TECH STACK)

1.  **Navigation:** `react-navigation`
2.  **State:** `Zustand` (Dễ học nhất)
3.  **Storage:** `@react-native-async-storage/async-storage`
4.  **Icon:** `lucide-react-native` hoặc `expo-vector-icons`

---

**Bạn muốn tôi bắt đầu hướng dẫn chi tiết Bước 1 (Setup dự án & Giao diện cơ bản) ngay bây giờ không?**
