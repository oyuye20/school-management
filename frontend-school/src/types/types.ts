export interface StudentData {
  id: number;
  first_name: string;
  last_name: string;
  student_id: string;
  email: string;
  role: string;
}

export interface Students {
  data: StudentData[];
  links: {
    first: string;
    last: string;
    next: string;
    prev: string;
  };

  last_page: number;

}

export interface PaginationProps {
  currentPage: number;
  totalPages1: number;
  onPageChange: (page: number) => void,
  isFetching: boolean
}