"use client";
import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { toast } from "sonner";

import { useQuery, useMutation } from "@tanstack/react-query";

export type Lead = {
  id?: string;
  firstName: string;
  lastName: string;
  submittedOn: string;
  status: "Pending" | "Reached Out";
  country: string;
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface UpdateStatusData {
  id: string;
  status: string;
}

export const updateLeadStatus = async (
  data: UpdateStatusData
): Promise<any> => {
  const response = await fetch("/api/lead", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const fetchResume = async (resumeName: string) => {
  const response = await fetch(`/api/resume?resume=${resumeName}`);

  if (!response) {
    throw new Error("Network response was not ok");
  }
  return response.blob();
};

function ResumeStatusSelect({ id, value }) {
  const { isPending, submittedAt, variables, mutate, isError } = useMutation({
    mutationFn: (data: UpdateStatusData) => updateLeadStatus(data),
    onError: (error) => {
      toast.error("Error updating status");
    },
    onSuccess: () => {
      toast.success("Status updated successfully");
    },
  });

  return (
    <Select
      onValueChange={(v) => {
        mutate({ id: id, status: v });
      }}
      defaultValue={value}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue
          className={`${
            value === "Pending" ? "text-red-600" : "text-green-600"
          }`}
          placeholder="update status"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>select status</SelectLabel>
          <SelectItem className="text-red-600" value="Pending">
            Pending
          </SelectItem>
          <SelectItem className="text-green-600" value="Reached Out">
            Reached Out
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function ResumeDownloadButton({ resumeName }: { resumeName: string }) {
  const {
    data: resume,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["resume", resumeName],
    queryFn: () => fetchResume(resumeName),
    enabled: false,
  });

  const handleDownload = async () => {
    const { data } = await refetch();
    if (!data) {
      console.error("Failed to fetch resume data");
      return;
    }

    const blob = new Blob([data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${resumeName}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleDownload}
      disabled={isLoading}
    >
      {isLoading ? "..." : <Download />}
    </Button>
  );
}

export const columns: ColumnDef<Lead>[] = [
  {
    id: "name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "submittedOn",
    accessorKey: "submittedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Submitted On
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row, getValue }) => {
      const value = getValue() as string;
      const id = row.original.id;
      return <ResumeStatusSelect id={id} value={value} />;
    },
  },
  {
    id: "country",
    accessorKey: "country",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Country
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "resume",
    accessorKey: "resume",
    cell: ({ getValue }) => {
      const resumeName = getValue() as string;
      return <ResumeDownloadButton resumeName={resumeName} />;
    },
  },
];

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [searchColumn, setSearchColumn] = useState<string>("name");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4 flex-row gap-4">
        <Input
          placeholder={`Filter ${searchColumn}`}
          value={
            (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchColumn)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Select onValueChange={setSearchColumn} defaultValue={searchColumn}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a column name" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Column name</SelectLabel>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="submittedOn">Submitted On</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="country">Country</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, i) => (
                    <TableCell className="truncate max-w-2" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
