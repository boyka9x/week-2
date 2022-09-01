const logFakeData = [
  { id: 100, name: 'TV', action: 'Turn On', createdAt: '1234567' },
  { id: 101, name: 'TV', action: 'Turn Off', createdAt: '1234567' },
  { id: 102, name: 'Washer', action: 'Turn On', createdAt: '1234567' },
  { id: 103, name: 'Selling Fan', action: 'Sleep', createdAt: '1234567' },
  { id: 104, name: 'TV', action: 'Turn On', createdAt: '1234567' },
  { id: 105, name: 'Washer', action: 'Sleep', createdAt: '1234567' },
  { id: 106, name: 'Selling Fan', action: 'Turn On', createdAt: '1234567' },
  { id: 107, name: 'TV', action: 'Turn On', createdAt: '1234567' },
  { id: 108, name: 'Selling Fan', action: 'Turn Off', createdAt: '1234567' },
  { id: 109, name: 'TV', action: 'Turn On', createdAt: '1234567' },
  { id: 110, name: 'Selling Fan', action: 'Sleep', createdAt: '1234567' },
  { id: 111, name: 'TV', action: 'Turn On', createdAt: '1234567' },
  { id: 112, name: 'Washer', action: 'Turn Off', createdAt: '1234567' },
  { id: 113, name: 'Washer', action: 'Turn On', createdAt: '1234567' },
  { id: 114, name: 'TV', action: 'Sleep', createdAt: '1234567' },
  { id: 115, name: 'Washer', action: 'Turn On', createdAt: '1234567' },
  { id: 116, name: 'TV', action: 'Turn Off', createdAt: '1234567' },
  { id: 117, name: 'Selling Fan', action: 'Turn On', createdAt: '1234567' },
  { id: 118, name: 'TV', action: 'Turn Off', createdAt: '1234567' },
  { id: 119, name: 'Washer', action: 'Turn On', createdAt: '1234567' },
  { id: 120, name: 'TV', action: 'Turn Off', createdAt: '1234567' },
  { id: 121, name: 'Washer', action: 'Sleep', createdAt: '1234567' },
  { id: 122, name: 'Selling Fan', action: 'Turn On', createdAt: '1234567' },
];

/**
 * Filter
 * {
 *      name: string
 *      page: number
 *      limit: number
 *      totalRecords: number
 * }
 */
document.addEventListener('DOMContentLoaded', (e) => {
  var filter = getFilter();
  var devices = [];

  if (!filter) {
    setFilter({ name: '', page: 1, limit: 5, totalRecords: 10 });
    filter = getFilter();
  }

  // Get record by filter
  devices = getDeviceByFilter(filter);
  createLogTable(devices);
  createPagination(filter);
});

// Other
const createLogTable = (devices) => {
  const result = devices
    .map((device) => {
      return `<tr>
                <td align="left">${device.id}</td>
                <td align="right">${device.name}</td>
                <td align="right">${device.action}</td>
                <td align="right">${device.createdAt}</td>
        </tr>`;
    })
    .join('');

  const tbodyLog = document.querySelector('#tbody-log');
  tbodyLog.innerHTML = result;
};

const createPagination = (filter) => {
  const { page, limit, totalRecords } = filter;
  const totalPages = Math.ceil(totalRecords / limit);
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  let active = '';
  let beforePage = page - 1;
  let afterPage = page + 1;

  if (page > 2) {
    pagination.innerHTML += setPaginationItem(1, active);
  }

  if (page > 3) {
    pagination.innerHTML += setPaginationDot();
  }

  if (page == totalPages) {
    beforePage = beforePage - 1;
  }

  if (page == 1) {
    afterPage = afterPage + 1;
  }

  for (var i = beforePage; i <= afterPage; i++) {
    if (i > totalPages) {
      continue;
    }
    if (i == 0) {
      i = i + 1;
    }
    if (page == i) {
      active = 'active';
    } else {
      active = '';
    }

    pagination.innerHTML += setPaginationItem(i, active);
  }

  if (page < totalPages - 2) {
    pagination.innerHTML += setPaginationDot();
  }

  if (page < totalPages - 1) {
    pagination.innerHTML += setPaginationItem(totalPages, active);
  }

  // Add click event to the pagination item
  pagination.querySelectorAll('.pagination-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      const page = parseInt(e.target.getAttribute('value'));

      filter = { ...filter, page };
      setFilter(filter);
      devices = getDeviceByFilter(filter);
      createLogTable(devices);
      createPagination(filter);
    });
  });
};

const setPaginationItem = (page, active) => {
  return `<div class="pagination-item ${active}" value="${page}">${page}</div>`;
};

const setPaginationDot = () => {
  return '<div class="pagination-dot">...</div>';
};

const getDeviceByFilter = (filter) => {
  var { name, page, limit, totalRecords } = filter;
  if (page <= 0) page = 1;
  if (limit <= 0) limit = 5;

  let list = [];
  let prevPage = (page - 1) * limit;
  let currentPage = page * limit;

  if (name) {
    const filterByName = logFakeData.filter((item) => {
      return item.name.includes(name);
    });

    totalRecords = filterByName.length;

    for (let i = prevPage; i < currentPage; i++) {
      if (filterByName[i]) {
        list.push(filterByName[i]);
      }
    }
  } else {
    for (let i = prevPage; i < currentPage; i++) {
      if (logFakeData[i]) {
        list.push(logFakeData[i]);
      }
    }

    totalRecords = logFakeData.length;
  }

  setFilter({ name, page, limit, totalRecords });
  return list;
};

const setDevice = (device) => {
  return localStorage.setItem('log-device', JSON.stringify(device));
};

const getDevice = () => {
  return JSON.parse(localStorage.getItem('log-device'));
};

const setFilter = (filter) => {
  return localStorage.setItem('log-filter', JSON.stringify(filter));
};

const getFilter = () => {
  return JSON.parse(localStorage.getItem('log-filter'));
};
