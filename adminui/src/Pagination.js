import React from "react";
import 'bootstrap/dist/css/bootstrap.css';


const Pagination = ({
    currentPage,
    pages,
    firstPage,
    prevPage,
    changePage,
    nextPage,
    lastPage,
}) => {
    const numbers = [...Array(pages+1).keys()].slice(1);

    return (
        <div className="pagination-container">
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${currentPage===1 ? 'disabled' : ''}`}>
                        <a href="#" className="page-link" onClick={firstPage}>{'<<'}
                        </a>
                    </li>
                    <li className={`page-item ${currentPage===1 ? 'disabled' : ''}`}>
                        <a href="#" className="page-link" onClick={prevPage}>{'<'}
                        </a>
                    </li>
                    {numbers.map((n,i)=>(
                        <li
                        className={`page-item ${currentPage === n ? 'active' : ''}`}
                        key={i}>
                            <a href="#" className="page-link" onClick={()=> changePage(n)}>{n}</a>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage===pages ? 'disabled' : ''}`}>
                        <a href="#" className="page-link" onClick={nextPage}>{'>'}
                        </a>
                    </li>
                    <li className={`page-item ${currentPage===pages ? 'disabled' : ''}`}>
                        <a href="#" className="page-link" onClick={lastPage}>{'>>'}
                        </a>
                    </li>

                </ul>
            </nav>
        </div>
    );
};

export default Pagination;