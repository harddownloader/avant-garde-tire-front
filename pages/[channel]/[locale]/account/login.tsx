import { useAuth, useAuthState } from "@saleor/sdk";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";

import { Button } from "@/components/Button";
import { messages } from "@/components/translations";
import { DEMO_MODE } from "@/lib/const";
import { usePaths } from "@/lib/paths";

export type OptionalQuery = {
  next?: string;
};

export interface LoginFormData {
  email: string;
  password: string;
}

function LoginPage() {
  const router = useRouter();
  const paths = usePaths();
  const t = useIntl();

  const { login } = useAuth();
  const { authenticated } = useAuthState();

  const defaultValues = DEMO_MODE
    ? {
        email: "admin@example.com",
        password: "admin",
      }
    : {};

  const {
    register: registerForm,
    handleSubmit: handleSubmitForm,
    formState: { errors: errorsForm },
    setError: setErrorForm,
  } = useForm<LoginFormData>({ defaultValues });

  const redirectURL = router.query.next?.toString() || paths.$url();

  const handleLogin = handleSubmitForm(async (formData: LoginFormData) => {
    const { data } = await login({
      email: formData.email,
      password: formData.password,
    });

    if (data?.tokenCreate?.errors[0]) {
      // Unable to sign in.
      setErrorForm("email", { message: "Invalid credentials" });
    }
  });
  if (authenticated) {
    // User signed in successfully.
    router.push(redirectURL);
    return null;
  }

  return (
    <div className="min-h-screen bg-no-repeat bg-cover bg-center bg-gradient-to-r from-red-100 to-action-1">
      <div className="block md:flex md:justify-end">
        <div
          className={clsx(
            "bg-white min-h-screen w-full flex justify-center items-center",
            "dark:bg-black",
            "md:w-1/2"
          )}
        >
          <div>
            <form onSubmit={handleLogin}>
              <div>
                <span className="text-sm text-gray-900 dark:text-neutral-300">
                  {t.formatMessage(messages.loginWelcomeMessage)}
                </span>
                <h1 className="text-2xl font-bold">{t.formatMessage(messages.loginHeader)}</h1>
              </div>

              <div className="my-3">
                <label htmlFor="email" className="block text-md mb-2">
                  {t.formatMessage(messages.loginEmailFieldLabel)}
                </label>
                <input
                  className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                  type="email"
                  id="email"
                  {...registerForm("email", {
                    required: true,
                  })}
                />
              </div>
              <div className="mt-5">
                <label htmlFor="password" className="block text-md mb-2">
                  {t.formatMessage(messages.loginPasswordFieldLabel)}
                </label>
                <input
                  className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                  type="password"
                  id="password"
                  {...registerForm("password", {
                    required: true,
                  })}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700 hover:underline cursor-pointer pt-2">
                  {t.formatMessage(messages.loginRemindPasswordButtonLabel)}
                </span>
              </div>
              <div className="">
                <Button className="mt-4 w-full duration-100">
                  {t.formatMessage(messages.logIn)}
                </Button>
                {!!errorsForm.email && (
                  <p className="text-sm text-red-500 pt-2">{errorsForm.email?.message}</p>
                )}
              </div>
            </form>
            <p className="mt-8">
              <Link href={paths.account.register.$url()} passHref>
                <a href="pass">{t.formatMessage(messages.createAccount)}</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
