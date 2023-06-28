import React from "react";
import { Form, useFetcher } from "react-router-dom";

//library
import { UserPlusIcon } from "@heroicons/react/24/solid";

//assests
import illustration from "../assets/illustration.jpg";

const Intro = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
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
                <span>Create Account</span>
                <UserPlusIcon width={20} />
              </>
            )}
          </button>
        </fetcher.Form>
      </div>
      <img src={illustration} alt="Person with money" width={600} />
    </div>
  );
};

export default Intro;
