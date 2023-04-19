// import useSWR from "swr";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

import useSWRMutation from "swr/mutation";

async function sendRequest(url, { arg }) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.error("Something went wrong");
  }
}

export default function JokeForm() {
  //   const { mutate } = useSWR("/api/jokes", fetcher);
  const { trigger } = useSWRMutation("/api/jokes", sendRequest);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const jokeData = Object.fromEntries(formData);

    trigger(jokeData);

    // const response = await fetch("/api/jokes", {
    //   method: "POST",
    //   body: JSON.stringify(jokeData),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // if (!response.ok) {
    //   console.error("Something went wrong");
    // } else {
    //   const data = await response.json();
    //   mutate();
    //   console.log("Everything worked");
    // }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="joke-input">Enter a new joke</label>
      <input type="text" id="joke-input" name="joke" />
      <button type="submit">Submit</button>
    </form>
  );
}
