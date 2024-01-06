// In the case we access protected resources, the HTTP request needs Authorization header.
export default function authHeader(headers?:{[key:string]:any}) {
  const u = localStorage.getItem("user");
  if (!u) return;
  const user = JSON.parse(u);
  if (user && user.token) {
    return { Authorization: "easyClub " + user.token };
  } else {
    return {};
  }
}
