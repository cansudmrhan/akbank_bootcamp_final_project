import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError() as {
    statusText?: string;
    message?: string;
  };

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
      <Link to="/">Home</Link>
    </div>
  );
}

export default ErrorPage;
