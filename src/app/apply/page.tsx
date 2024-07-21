"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const visaOptions = ["O1", "EB-1A", "EB-2 NIW", "I don't know"];
const countryOptions = ["USA", "Canada", "India", "Australia", "UK", "Others"]; // Add more countries as needed

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email({ message: "Invalid email address" }),
  linkedin: z.string().url({ message: "Invalid LinkedIn URL" }),
  visas: z
    .array(z.string())
    .min(1, { message: "At least one visa must be selected" }),
  resume: z.any().refine((file) => file instanceof File, {
    message: "Resume/CV is required",
  }),
  country: z.string().min(1, "Country of citizenship is required"),
  help: z.string().min(1, "This field is required"),
});

export default function LeadForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "Tejasva",
      lastName: "Jaitly",
      email: "neiljaitly@gmail.com",
      linkedin: "https://www.linkedin.com/in/tejasvajaitly/",
      visas: ["O1"],
      resume: new File([], ""), // Set resume to an empty File object
      country: "USA",
      help: "please help",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("data", data);

    const res = await fetch("/api/lead", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const json = await res.json();

    console.log("json", json);
    const route = "http://localhost:3000/apply/success";
    console.log("push to success page", "with route", route);

    if (json.data) {
      console.log("inside if");
      router.push(route);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn URL</FormLabel>
              <FormControl>
                <Input placeholder="LinkedIn URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Visas of Interest</FormLabel>
          <div className="space-y-2">
            {visaOptions.map((visa) => (
              <FormField
                key={visa}
                control={form.control}
                name="visas"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value.includes(visa)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...field.value, visa]);
                          } else {
                            field.onChange(
                              field.value.filter((value) => value !== visa)
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormLabel>{visa}</FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
          {form.formState.errors.visas && (
            <p className="text-red-600">
              {form.formState.errors.visas.message}
            </p>
          )}
        </FormItem>

        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume/CV</FormLabel>
              <FormControl>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country of Citizenship</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryOptions.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="help"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How can we help?</FormLabel>
              <FormControl>
                <Textarea placeholder="How can we help?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
