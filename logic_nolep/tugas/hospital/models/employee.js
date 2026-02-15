import { createHash, randomBytes } from "node:crypto";
import {
  readFile,
  writeFile,
  readFileSync,
  writeFileSync,
  unlinkSync,
} from "node:fs";
import { readFile as readFileAsync } from "node:fs/promises";

const EMP_PATH = "./data/employee.json";
const SESSION_PATH = "./data/session.txt";

class Employee {
  constructor(username, password, position) {
    this.username = username;
    this.password = password;
    this.position = position;
    this.sessionToken = null;
    this.isLogin = false;
  }

  // Hash original password
  static #hashPassword(plainPassword) {
    return createHash("sha256").update(plainPassword).digest("hex");
  }
  // Create session token
  static #createToken() {
    return randomBytes(16).toString("hex");
  }

  // Validate session (Asynchonous)
  static async validateSession() {
    try {
      const token = await readFileAsync(SESSION_PATH, "utf-8");
      const employees = await this.findAllAsync();

      const active = employees.find((emp) => emp.sessionToken === token);

      if (!active) throw new Error("Session invalid");

      return active;
    } catch (err) {
      throw new Error("Please login first!");
    }
  }

  // Register (Callback)
  static register(name, password, role, handleRegister) {
    const roles = ["admin", "doctor", "super"];
    if (!roles.includes(role.toLowerCase()))
      return handleRegister("Invalid Role!");

    const handleFindAll = (err, data) => {
      if (err) return handleRegister(err, null);
      else {
        const hashedPassword = this.#hashPassword(password);

        let obj = new Employee(name, hashedPassword, role);
        let newData = data;
        newData.push(obj);

        let objArr = [];
        objArr.push(obj);
        objArr.push(newData.length);

        const handleAddEmployee = (err) =>
          err ? handleRegister(err, null) : handleRegister(err, objArr);

        writeFile(EMP_PATH, JSON.stringify(newData), handleAddEmployee);
      }
    };

    this.findAll(handleFindAll);
  }

  // Login (Callback)
  static login(name, password, handleLogin) {
    // Check if already logged in
    this.validateSession()
      .then((activeUser) => {
        return handleLogin(
          `You're currently logged in as ${activeUser.position} ${activeUser.username}`,
        );
      })
      .catch(() => {
        const handleData = (err, data) => {
          if (err) return handleLogin(err);
          else {
            const hashedPassword = this.#hashPassword(password);

            const newData = data;
            const employee = newData.find(
              (emp) => emp.username === name && emp.password === hashedPassword,
            );
            if (!employee) {
              return handleLogin("Invalid username or password!");
            }

            const token = this.#createToken();
            employee.sessionToken = token;
            employee.isLogin = true;

            writeFile(EMP_PATH, JSON.stringify(newData), (err) => {
              if (err) handleLogin(err);

              try {
                writeFileSync(SESSION_PATH, employee.sessionToken, "utf-8");
                handleLogin(null, employee);
                console.log("session save sucessfully");
              } catch (error) {
                console.error("Failed to save session locally: ", error);
              }
            });
          }
        };
        this.findAll(handleData);
      });
  }

  // Logout Synchronous
  static logout(handleLogout) {
    const token = readFileSync(SESSION_PATH, "utf-8");
    const handleLogged = (err, data) => {
      if (err) return handleLogout(err);

      const index = data.findIndex((emp) => emp.sessionToken === token);

      if (index !== -1) {
        data[index].isLogin = false;
        data[index].sessionToken = null;

        writeFile(EMP_PATH, JSON.stringify(data), (err) => {
          if (err) return handleLogout(err);

          unlinkSync(SESSION_PATH);
          handleLogout(null, "Successfuly logged out");
        });
      } else {
        unlinkSync(SESSION_PATH);
        handleLogout(null, "Session invalid clean up local");
      }
    };
    this.findAll(handleLogged);
  }

  //Get all employees list (Asynchronous)
  static async findAllAsync() {
    try {
      const employees = await readFileAsync(EMP_PATH, "utf-8");
      return JSON.parse(employees || "[]");
    } catch (error) {
      return { error: error.message };
    }
  }

  // Get all employees list (Callback)
  static findAll(cb) {
    readFile("./data/employee.json", "utf8", (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(null, JSON.parse(data || "[]"));
      }
    });
  }
}

export default Employee;
