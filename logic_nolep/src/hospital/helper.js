export function autoIncrement(objArr) {
  return objArr.length > 0 ? Math.max(...objArr.map((e) => e.id)) + 1 : 1;
}
