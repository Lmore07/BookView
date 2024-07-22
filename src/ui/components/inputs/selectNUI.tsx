"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputForm,
} from "@/ui/shadcn/ui/form";
import { Input } from "@/ui/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/shadcn/ui/select";
import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

const SelectNUI = ({
  label,
  name,
  icon,
  placeholder,
  form,
  className = "",
  options,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  placeholder: string;
  form: UseFormReturn<any>;
  icon?: React.ReactNode;
  className?: string;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState, formState }) => (
        <FormItem>
          <FormLabel className="block font-custom text-sm font-bold ">
            {label}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl className="w-full">
              <SelectTrigger
                error={fieldState.error}
                isTouched={fieldState.isTouched}
                className={`w-full font-custom bg-bgInputText px-3 py-2 border-0 text-sm font-normal hover:placeholder:text-secondary-400 text-secondary-400 rounded-md outline-none hover:text-secondary-400 hover:border hover:border-black ${
                  fieldState.error &&
                  "border-red-700 border-2 focus:ring-2 focus:ring-red-700 hover:border-red-700 hover:border-2"
                } ${
                  fieldState.error == undefined &&
                  fieldState.isTouched &&
                  "border-green-600 focus:ring-2 focus:ring-green-600 hover:border-2 hover:border-green-600 border-2"
                }`}
              >
                <SelectValue placeholder={placeholder}></SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectNUI;
