import { readFile, writeFile } from "fs/promises";

export default class Employee {
  public login = false;
  public constructor(public username: string, public password: string, public position: "doctor" | "admin") {}

  public static async register(username: string, password: string, position: "doctor" | "admin"): Promise<[Employee, number]> {
    const employee = await Employee.findAll();
    if (typeof employee.find(x => x.username === username) !== "undefined") throw "Username telah terdaftar!";
    const newEmployee = new Employee(username, password, position);
    employee.push(newEmployee);
    await Employee.writeFile(employee);
    return [newEmployee, employee.length];
  }

  public static async login(username: string, password: string) {
    const employee = await Employee.findAll();
    const isLogin = await Employee.loginInfo(employee);
    if (typeof isLogin !== "undefined") throw "Sedang login ! Silahkan Logout terlebih dahulu";
    const em = employee.find(x => x.username === username && x.password === password);
    if (!em) throw "Username atau password tidak terigristrasi";
    em.login = true;
    await Employee.writeFile(employee);
    return em;
  }

  public static async loginInfo(employee?: Employee[]) {
    if(!employee) employee = await Employee.findAll();
    return employee.find(x => x.login);
  }

  public static async logout() {
    const employee = await Employee.findAll();
    const em = employee.find(x => x.login);
    if (typeof em !== "undefined") {
      em.login = false;
      Employee.writeFile(employee);
    }
  }

  public static async list() {
    const employee = await Employee.findAll();
    const login = await Employee.loginInfo(employee);
    if (login?.position !== "admin") throw "Anda bukanlah admin";
    return employee;
  }

  private static async findAll() {
    let data: any = [];
    try {
      data = JSON.parse(await readFile("./employee.json").then(f => f.toString()));
    } catch {}
    return data as Employee[];
  }

  private static async writeFile(datas: Employee[]) {
    return await writeFile("./employee.json", JSON.stringify(datas, null, 2));
  }
}
