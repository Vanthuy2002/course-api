# Logic update

1. Tạo biến updateId = null, sau khi click vào btn-edit thì gán id của item cho updateId
2. O sự kiện submit, xét nếu updateId đã có (!== null) thì gọi fn updateCourse
3. updateCoures({ id: updateId, ...courses }), với đối số là object chứa thông tin ,
4. id : updateId, dùng rest để rải phần tử còn lại của course vào object

# Logic GET

1. Tạo fn getCourses với parameters là một hàm callback
2. fn này gọi api và trả về hàm callback với parameter là data khi gọi Api
3. Tạo fn render để có thể render data ra views UI
4. Gọi fn getCourses(render) -> do cả hai đều có chung parameter

# Logic Post

1. Tạo form để nhập thông tin
2. Lấy tất cả thông tin sau khi nhập vào
3. Tạo fn addCourse để có thể post data đã nhập về db
4. Bắt sự kiện submit để lưu data vào db, sau đó render ra views,
5. Clear toàn bộ trường nhập dữ liệu mỗi khi submit

# Logic DELETE

1. Lấy ra id của từng item muốn xóa
2. Tạo hàm removeCourse với tham số là id của item
   2.1. Để có thể lấy ra được item muốn xóa
3. Xóa khỏi DOM, sau đó gọi hàm removeCourse mà không cần phải render lại
