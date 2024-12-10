"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LoaderCircleIcon } from "lucide-react";
import api from "@/lib/api";
import bcrypt from "bcrypt";

const registrationSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const RegistrationPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      setLoading(true);
      const hashedPassword = await bcrypt.hash(data?.password, 10);

      const payload = {
        email: data?.email,
        password: hashedPassword,
      };

      const response = await api.post("/api/auth/register", payload);

      if (response?.data?.success) {
        toast.success("Registration successful! Please verify your email.");
      } else {
        toast.error(response?.data?.message || "Registration failed. Please try again.");
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input {...register("email")} placeholder="Enter your email" />
          {errors?.email && <p className="text-red-500 text-sm">{errors?.email?.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input {...register("password")} type="password" placeholder="Enter your password" />
          {errors?.password && <p className="text-red-500 text-sm">{errors?.password?.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <LoaderCircleIcon className="animate-spin" /> : "Sign up"}
        </Button>
      </form>
    </div>
  );
};

export default RegistrationPage;