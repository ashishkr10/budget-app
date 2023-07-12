//Firebase import
import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const wait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 1000));

//color
const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

//Get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

//Delete item from local storage
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

//create budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    amount: +amount,
    color: generateRandomColor(),
    createdAt: Date.now(),
  };
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

//create expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    amount: +amount,
    budgetId: budgetId,
    createdAt: Date.now(),
  };
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if expense.id === budgetId I passed in
    if (expense.budgetId !== budgetId) return acc;

    // add the current amount to my total
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

// FORMATTING
export const formatDate = (epoch) => new Date(epoch).toLocaleDateString();

// Formating percentages
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// Format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
  });
};

//Get Firebase data
export const fetchPost = async () => {
  const uid = localStorage.getItem("uid");
  let items = [];
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const docs = await getDocs(q);
  docs.forEach((doc) => {
    items.push(doc.data());
  });
  // console.log(items);
  if (items[0].data) {
    items?.map((service) => {
      localStorage.setItem("budgets", JSON.stringify(service.data.budgets));
      localStorage.setItem("expenses", JSON.stringify(service.data.expenses));
    });
  }
};
