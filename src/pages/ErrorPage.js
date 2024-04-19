import { useRouteError } from "react-router-dom";

export default function ErrorPage({fileName}) {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred in {fileName}.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}