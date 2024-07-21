"use client";
import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Lead, columns, DataTable } from "./table";

export default function Page() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 5; // Items per page

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/leads?page=${page}&limit=${limit}`);
      const result = await response.json();
      setData(result.data);
      setCurrentPage(result.currentPage);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPagination = () => {
    const pages = [];
    if (totalPages <= 3) {
      // If total pages are less than or equal to 3, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Dynamic pagination display
      let startPage = currentPage - 1;
      let endPage = currentPage + 1;

      if (currentPage === 1) {
        startPage = 1;
        endPage = 3;
      } else if (currentPage === totalPages) {
        startPage = totalPages - 2;
        endPage = totalPages;
      }

      if (startPage > 1) {
        pages.push(
          <PaginationItem key={1}>
            <PaginationLink
              isActive={false}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(1);
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>
        );
        if (startPage > 2) {
          pages.push(<PaginationEllipsis key="start-ellipsis" />);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push(<PaginationEllipsis key="end-ellipsis" />);
        }
        pages.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              isActive={false}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(totalPages);
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return pages;
  };

  return (
    <div>
      Dashboard
      <DataTable columns={columns} data={data} />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePrevious();
              }}
              isActive={!(currentPage === 1)}
            />
          </PaginationItem>
          {renderPagination()}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNext();
              }}
              isActive={!(currentPage === totalPages)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
