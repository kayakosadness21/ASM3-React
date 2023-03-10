// hàm chuyển đổi số thành string thêm "." phân tách hàng nghìn
export function convertNumberToString(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
