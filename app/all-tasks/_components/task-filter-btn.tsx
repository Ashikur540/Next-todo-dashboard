"use client";

import * as React from "react";

import { FilterIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

export function TaskFilterBtn() {
  const selectedValues = new Set(["LOW"]);
  const options = [
    { label: "Low", value: "LOW" },
    { label: "Medium", value: "MEDIUM" },
    { label: "High", value: "HIGH" },
  ];
  const form = useForm<string[]>({});
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="text-[#0055FF]">
          <FilterIcon />
          Filter
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="outline"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="outline"
                    className="rounded-sm px-1 font-normal bg-white"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="outline"
                        key={option.value}
                        className="rounded-sm px-1 font-normal bg-white"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2 " align="start">
        <Form {...form}>
          {options.map((item, id) => (
            <FormField
              key={id}
              control={form.control}
              name={item.label}
              render={({ field }) => {
                return (
                  <FormItem
                    key={id}
                    className="flex flex-row items-start space-x-3 space-y-0 px-1.5 py-2 rounded hover:bg-primary-foreground"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.value)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.value])
                            : field.onChange(
                                field.value?.filter(
                                  (value: string) => value !== item.value
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{item.label}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
        </Form>
        {/* <div className="flex items-center space-x-2 px-1.5 py-2 rounded hover:bg-primary-foreground">
          <Checkbox id="ee" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Medium
          </label>
        </div>
        <div className="flex items-center space-x-2 px-1.5 py-2 rounded hover:bg-primary-foreground">
          <Checkbox id="dd" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            High
          </label>
        </div> */}
        {/* https://github.com/shadcn-ui/ui/blob/main/apps/www/app/(app)/examples/tasks/components/data-table-faceted-filter.tsx */}
      </PopoverContent>
    </Popover>
  );
}
