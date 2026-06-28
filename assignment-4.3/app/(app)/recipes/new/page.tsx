import RecipeSubmissionForm from "../../../components/RecipeSubmissionForm";

export default function NewRecipePage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Submit a Recipe
      </h1>

      <RecipeSubmissionForm />
    </main>
  );
}