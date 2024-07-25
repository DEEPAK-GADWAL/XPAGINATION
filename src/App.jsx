import React, { useEffect, useState } from "react";
import styles from "./App.module.css";

const ENDPOINT =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(ENDPOINT);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
        alert("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage + 1;
        console.log("Navigating to next page:", newPage);
        return newPage;
      });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage - 1;
        console.log("Navigating to previous page:", newPage);
        return newPage;
      });
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = data.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1 className={styles.topHead}>Employee Data Table</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {itemsToDisplay.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.pagination}>
          <button
            className={styles.previous}
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className={styles.pageNumber}>{currentPage}</span>
          <button
            className={styles.next}
            onClick={handleNext}
            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
