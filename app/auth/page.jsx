import AuthForm from "../components/auth/AuthForm";
import WelcomePanel from "../components/auth/WelcomePanel";

export default function AuthPage() {
  return (
    <section className="min-h-screen flex overflow-hidden">
      <div className="w-full flex flex-col lg:flex-row">
        <WelcomePanel />
        <AuthForm />
      </div>
    </section>
  );
}
