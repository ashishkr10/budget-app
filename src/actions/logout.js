import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
import { fetchData } from "../helpers";

//Firebase import
import { db } from "../firebase";
import {
  doc,
  collection,
  updateDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore";

const logout = async () => {
  let uid = localStorage.getItem("uid");
  let budgets = fetchData("budgets");
  let expenses = fetchData("expenses");

  if (uid) {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    let docID = "";
    querySnapshot.forEach((doc) => {
      docID = doc.id;
    });
    const user = doc(db, "users", docID);

    await updateDoc(user, {
      data: {
        budgets: budgets,
        expenses: expenses,
      },
    });
  }
  localStorage.clear();
};

export async function logoutAction() {
  logout();
  toast.success("You’ve logout your account!");
  return redirect("/login");
}
