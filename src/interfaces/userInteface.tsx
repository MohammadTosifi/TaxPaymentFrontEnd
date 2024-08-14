export interface IActor {
  _id: string;
  username: string;
  role: "Sysadmin" | "Staff" | "User";
  password: string;
  passwordConfirm: string | undefined;
}

// export interface ITaxRecord {
//     id: string;
//     userId: string;
//     taxYear: number;
//     income: number;
//     deductions: number;
//     taxOwed: number;
//   }
