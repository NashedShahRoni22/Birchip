import AuthForm from "./AuthForm";
import WelcomePanel from "./WelcomePanel";

export default function Auth() {
  return (
    <section className="flex min-h-screen overflow-hidden">
      <div className="flex w-full flex-col lg:flex-row">
        <WelcomePanel />
        <AuthForm />
      </div>
    </section>
  );
}
