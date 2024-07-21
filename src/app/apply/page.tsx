"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
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
import Image from "next/image";

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
      firstName: "",
      lastName: "",
      email: "",
      linkedin: "",
      visas: [],
      resume: new File([], ""), // Set resume to an empty File object
      country: "",
      help: "",
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
    <div>
      <header className="position relative lg:h-[380px]  xl:h-[490px] bg-[#D9DEA5] -z-20">
        <img
          className="-z-10 h-full bg-[#D9DEA5] w-full object-cover object-left absolute top-0 -left-20 sm:left-0"
          src="/alma-header-bg-img.jpg"
          alt=""
        />
        <div className="ml-20 sm:ml-40 md:ml-56 lg:ml-80 xl:ml-[325px] flex flex-col justify-center pt-8 lg:pt-14 xl:pt-24 mr-8">
          <h1>
            <img src="/logo.svg" alt="Alma" />
            <span className="sr-only">Alma</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl xl:text-[56px] font-extrabold mt-4 lg:mt-10 mb-8">
            Get an assessment
            <br />
            of your immigration case
          </h2>
        </div>
      </header>
      <div className="flex items-center justify-center m-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-1/3"
          >
            <div className="flex items-center justify-center">
              <img src="/file-info.png" alt="" />
            </div>
            <h3 className="text-center text-2xl font-bold">
              Want to understand your visa options?
            </h3>
            <p className="text-center text-lg">
              Submit the form below and our team of experienced attorneys will
              review your information and send a preliminary assessment of your
              case based on your goals.
            </p>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
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
                  <FormControl>
                    <Input placeholder="LinkedIn URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUploadDropzone
                      onChange={(file) => field.onChange(file)}
                      name={field.name}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-center">
              <img src="/assessment-dice.png" alt="" />
            </div>
            <h3 className="text-center text-2xl font-bold">
              Visa categories of interest?
            </h3>
            <FormItem>
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

            {/* <FormField
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
            /> */}

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
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

            <div className="flex items-center justify-center">
              <img src="/assessment-heart.png" alt="" />
            </div>
            <h3 className="text-center text-2xl font-bold">
              How can we help you?
            </h3>

            <FormField
              control={form.control}
              name="help"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="h-28"
                      placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residencyor short-term employment visa or both? Are there any timeline considerations?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

const FileUploadDropzone = ({
  onChange,
  name,
}: {
  onChange: (file: File) => void;
  name: string;
}) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        onChange(acceptedFiles[0]);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`p-6 mt-2 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <input {...getInputProps()} name={name} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the file here...</p>
        ) : (
          <p className="text-gray-500">
            Drag and drop a file here, or click to select a file
          </p>
        )}
      </div>
      {file && (
        <div className="mt-2 text-sm text-gray-600">
          Selected file: {file.name}
        </div>
      )}
    </div>
  );
};
