export const timeAgo = (x) => {
  x = x / 1000;
  const current = Math.trunc(Date.now() / 1000);
  const ago = current - x;
  if (ago < 60) {
    return 'Vừa xong';
  } else if (ago < 3600) {
    return `${Math.trunc(ago / 60)} phút`;
  } else if (ago < 86400) {
    return `${Math.trunc(ago / 3600)} giờ`;
  } else if (ago < 86400 * 30) {
    return `${Math.trunc(ago / 86400)} ngày`;
  } else if (ago < 86400 * 365) {
    return `${Math.trunc(ago / (86400 * 30))} tháng`;
  } else {
    return `${Math.trunc(ago / (86400 * 365))} năm`;
  }
};
