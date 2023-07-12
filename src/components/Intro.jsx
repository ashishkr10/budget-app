import React from "react";
import { useFetcher, useNavigate } from "react-router-dom";

//library
import { UserPlusIcon } from "@heroicons/react/24/solid";

//assests
import illustration from "../assets/illustration.jpg";

//library
import { toast } from "react-toastify";

//Firebase imports
import { signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../firebase";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { fetchPost } from "../helpers";

const Intro = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("userName", JSON.stringify(user.displayName));
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
          created: Timestamp.now(),
        });
      }

      await fetchPost();
      toast.success("You’ve login your account!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="intro">
      <div>
        <h2>
          Take Control of <span className="accent">Your Money</span>
        </h2>
        <p>
          Personal budgeting is the secret to financial freedom. Start your
          journey today.
        </p>
        <fetcher.Form method="post">
          <input
            type="text"
            name="userName"
            placeholder="What is your name?"
            required
            aria-label="Your Name"
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button
            type="submit"
            className="btn btn--dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Account creating...</span>
            ) : (
              <>
                <span>Demo Account</span>
                <UserPlusIcon width={20} />
              </>
            )}
          </button>
        </fetcher.Form>
        <div>
          <p>Login with account</p>
          <button className="google-btn" onClick={handleGoogle}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </button>
        </div>
      </div>
      <img src={illustration} alt="Person with money" width={600} />
    </div>
  );
};

export default Intro;
