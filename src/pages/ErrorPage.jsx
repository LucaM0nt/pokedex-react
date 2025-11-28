import { Link } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";

export default function ErrorPage() {
  return (
    <EmptyState
      marginTop={true}
      icon="404"
      title="WILD MISSINGNO. APPEARED!"
      message={
        <>
          <p className="text-lg font-medium">
            Oh no! This page doesn't exist in this region!
          </p>
          <p className="text-sm text-gray-600">
            The route you're trying to reach hasn't been discovered yet, or it
            might have been removed by a wild Pokémon.
          </p>
          <p className="text-xs text-gray-500 mt-4">
            Tip: Try checking the URL or use the navigation menu
          </p>
        </>
      }
      actions={
        <>
          <Link to="/">
            <Button>← Return to Pokédex</Button>
          </Link>
          <Button variant="secondary" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </>
      }
    />
  );
}
