export const calculateRange = (data:Object[], rowsPerPage:number) => {
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    return range;
  };

  export const sliceData = (data:Object[], page:number, rowsPerPage:number) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  };