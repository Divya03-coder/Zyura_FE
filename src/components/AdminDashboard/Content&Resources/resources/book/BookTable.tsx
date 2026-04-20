import AlertDialogBox from "@/common/custom/AlertDialogBox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteResourceBooksMutation } from "@/store/features/adminDashboard/ContentResources/resourceLibery/resourceLibery";
import { BookType } from "@/store/features/adminDashboard/ContentResources/resourceLibery/types/books";
import React from "react";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";

const tableHeaders = [
  { label: "Book", align: "text-center " },
  { label: "Author", align: "text-center md:table-cell hidden" },
  { label: "Category", align: "text-center xl:table-cell hidden" },
  { label: "Language", align: "text-center xl:table-cell hidden" },
  { label: "Status", align: "text-center xl:table-cell hidden" },
  { label: "Action", align: "text-center" },
];

const tableDesign = {
  header:
    "text-lg font-geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12",
  cellHeader: "border border-border px-4 ",
  bodyRow: "text-[#2C2C2C] font-inter text-sm font-normal md:h-12 bg-white",
  cell: "border border-border px-4 text-center",
};

interface Props {
  data: BookType[];
  handleViewAll: () => void;
  handleEdit: (book: BookType) => void;
}

const BookTable: React.FC<Props> = ({ data, handleViewAll, handleEdit }) => {
  const [deleteResource, { isLoading }] = useDeleteResourceBooksMutation();

  const handleDelete = async (id: string) => {
    await deleteResource(id);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Book Library</h1>
        <button
          onClick={handleViewAll}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
        >
          View All
        </button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className={tableDesign.header}>
            {tableHeaders.map((header) => (
              <TableHead
                key={header.label}
                className={`${tableDesign.cellHeader} ${header.align}`}
              >
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((p) => (
            <TableRow key={p._id} className={tableDesign.bodyRow}>
              <TableCell className={` ${tableDesign.cell}`}>
                <div>{p.title}</div>
              </TableCell>

              <TableCell className={`md:table-cell hidden ${tableDesign.cell}`}>
                <div>{p.author}</div>
              </TableCell>

              <TableCell className={`xl:table-cell hidden ${tableDesign.cell}`}>
                <div>{p.tags.map((tag) => tag).join(", ")}</div>
              </TableCell>

              <TableCell className={`xl:table-cell hidden ${tableDesign.cell}`}>
                <div>{p.language}</div>
              </TableCell>

              <TableCell className={`xl:table-cell hidden ${tableDesign.cell}`}>
                <div>{p.createdAt ? "Published" : "Unpublished"}</div>
              </TableCell>

              <TableCell className={`${tableDesign.cell}`}>
                <div className="flex justify-center gap-3  ">
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleEdit(p)}
                  >
                    <BiSolidEdit size={24} />
                  </span>
                  <AlertDialogBox
                    action={() => handleDelete(p._id)}
                    isLoading={isLoading}
                    trigger={
                      <button className="text-[#B91C1C] cursor-pointer">
                        <RiDeleteBinLine size={24} />
                      </button>
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookTable;
