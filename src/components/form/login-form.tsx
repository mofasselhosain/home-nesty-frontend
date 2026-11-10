
"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Eye,
  EyeOff,
  ShieldCheck,
  UserRound,
  Building2,
  Check,
} from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";

import { loginSchema } from "@/validation";
import { useLogin } from "@/hooks";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import GoogleLoginComponent from "../modules/google-login/google-login";

// User roles
const roles = [
  {
    id: "customer",
    title: "Customer",
    description: "Find your dream home",
    icon: UserRound,
    email: "customer@gmail.com",
    password: "",
  },
  {
    id: "provider",
    title: "Provider",
    description: "Manage your properties",
    icon: Building2,
    email:"mofassel6146@gmail.com",
    password: "Hafiz123@",
  },
  {
    id: "admin",
    title: "Admin",
    description: "Manage the platform",
    icon: ShieldCheck,
    email: "mofassel6145@gmail.com",
    password: "M1@mi-3455",
  },
] as const;

type UserRole = (typeof roles)[number]["id"];

const dashboardRoutes: Record<UserRole, string> = {
  customer: "/customer",
  provider: "/provider",
  admin: "/admin",
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  // Customer is the default role
  const [selectedRole, setSelectedRole] =
    useState<UserRole>("customer");

  const router = useRouter();

  const { mutate: login, isPending: loginPending } = useLogin();

  const form = useForm({
    defaultValues: {
      email: "customer@gmail.com",
      password: "",
    },

    validators: {
      onSubmit: loginSchema,
    },

    onSubmit: ({ value }) => {
      login(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: (res) => {
            toast.add({
              title: "Login Successful",
              description: `Welcome back!`,
              type: "success",
            });

            router.push(dashboardRoutes[selectedRole]);
          },

          onError: (err) => {
            toast.add({
              title: "Authorization Failed",
              description:
                err.message ||
                "Something went wrong. Please try again.",
              type: "error",
            });
          },
        }
      );
    },
  });

  // Automatically fill credentials when selecting a role
  const handleRoleChange = (role: UserRole) => {
    const selected = roles.find((item) => item.id === role);

    if (!selected) return;

    setSelectedRole(role);

    form.setFieldValue("email", selected.email);
    form.setFieldValue("password", selected.password);
  };

  return (
    <div className="w-full space-y-6">

      {/* Header */}
      <div className="space-y-2 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10">
          <Building2 className="size-7 text-primary" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight">
          Welcome Back
        </h1>

        <p className="text-sm text-muted-foreground">
          Sign in to your housing account
        </p>
      </div>

      {/* Role Selection */}
      <div className="space-y-3">
        <div>
          <h2 className="text-sm font-semibold">
            Choose your account type
          </h2>
          <p className="text-xs text-muted-foreground">
            Select a role to continue
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <button
                key={role.id}
                type="button"
                onClick={() => handleRoleChange(role.id)}
                className={`
                  relative flex min-h-28 flex-col items-center
                  justify-center gap-2 rounded-xl border p-3
                  text-center transition-all duration-200
                  ${
                    isSelected
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border bg-card hover:border-primary/50 hover:bg-muted/50"
                  }
                `}
              >
                {isSelected && (
                  <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3" />
                  </span>
                )}

                <div
                  className={`flex size-10 items-center justify-center rounded-xl ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="size-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    {role.title}
                  </p>
                  <p className="mt-1 text-[10px] leading-tight text-muted-foreground">
                    {role.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Login Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-4">

          {/* Email */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Email Address
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="example@email.com"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    onBlur={field.handleBlur}
                    autoComplete="email"
                    aria-invalid={isInvalid}
                  />

                  {isInvalid && (
                    <FieldError
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor={field.name}>
                      Password
                    </FieldLabel>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      onBlur={field.handleBlur}
                      autoComplete="current-password"
                      aria-invalid={isInvalid}
                      className="pr-11"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {isInvalid && (
                    <FieldError
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loginPending}
            className="h-11 w-full font-semibold"
          >
            {loginPending ? (
              <>
                <Spinner />
                Signing in...
              </>
            ) : (
              `Sign in as ${roles.find(
                (role) => role.id === selectedRole
              )?.title}`
            )}
          </Button>
        </FieldGroup>
      </form>

      {/* Google Login */}
      <FieldSeparator>Or continue with</FieldSeparator>

      <GoogleLoginComponent />

      {/* Register */}
      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-muted-foreground">
        By continuing, you agree to our Terms of Service
        and Privacy Policy.
      </p>
    </div>
  );
}
